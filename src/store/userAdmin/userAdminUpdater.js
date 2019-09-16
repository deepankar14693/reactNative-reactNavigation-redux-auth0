import { isEmpty2 } from '../../common/utils';
import update from 'immutability-helper';
import _ from 'lodash';

export const getOrgElementsTreeData = (orgElements, orgElementsPrevTreeData, permissionView, permissionType, isFirstTimeOnly) => {
    orgElements = manageAssignRoleCount(orgElements);

    //Filter org elements as per permission view
    if (permissionType === 1) {
        switch (permissionView) {
            case 1:
                orgElements = orgElements.filter(function (i) {
                    return (i.AssignedRoleCount > 0);
                }); break;
            case 2:
                orgElements = orgElements.filter(function (i) {
                    return (i.AssignedRoleCount > 0 || (i.AssignedRoleCount === 0 && i.IsDerived === 1));
                }); break;
            default:
                break;
        }
    }

    let orgElementsTreeData = {};
    let item;
    //Preparing org elements tree data
    orgElementsTreeData["root"] = { ElementId: 'root', data: {}, children: [] };
    for (let i = 0; i < orgElements.length; i++) {
        item = orgElements[i];

        orgElementsTreeData[item.ElementId] = { ElementId: item.ElementId, data: item, children: [] };
        if (isFirstTimeOnly) {
            orgElementsTreeData[item.ElementId]["IsExpanded"] = false;
            orgElementsTreeData[item.ElementId]["IsSelected"] = false;
        } else if (!isFirstTimeOnly && orgElementsPrevTreeData[item.ElementId]) {
            orgElementsTreeData[item.ElementId]["IsExpanded"] = orgElementsPrevTreeData[item.ElementId].IsExpanded;
            orgElementsTreeData[item.ElementId]["IsSelected"] = orgElementsPrevTreeData[item.ElementId].IsSelected;
        }
        if (permissionType === 2) {
            orgElementsTreeData[item.ElementId].data.RoleId = '';
        } else {
            orgElementsTreeData[item.ElementId]["IsSelected"] = false;
        }
    }
    return orgElementsTreeData;
};

export const getUsers = (users, permissionType) => {
    if (permissionType !== 2) return users;
    _.map(users, (user) => {
        user.RoleId = null;
        user.IsDerived = 1;
    });
    return users;
};

const getAssignedRoleCount = (orgElements, elementId) => {
    const assignedChild = _.filter(orgElements, function (i) { return (!isEmpty2(i.ParentId) && i.ParentId.toUpperCase() === elementId.toUpperCase()) && i.IsDerived === 0 && !isEmpty2(i.RoleId) });
    return assignedChild.length;
};

const manageAssignRoleCount = (orgElements) => {
    _.map(orgElements, (item) => {
        //Managing AssignedRoleCount
        switch (item.EntityType) {
            case 9:
                item.AssignedRoleCount = (!isEmpty2(item.RoleId) ? 1 : 0);
                break;
            case 8:
                item.AssignedRoleCount = 1;
                break;
            case 3:
                item.AssignedRoleCount = (((!isEmpty2(item.RoleId)) && item.IsDerived == 0) ? 1 : 0);
                break;
            case 2:
                let faAssignedRoleCount = (((!isEmpty2(item.RoleId)) && item.IsDerived == 0) ? 1 : 0);
                if (faAssignedRoleCount === 0) {
                    faAssignedRoleCount = getAssignedRoleCount(orgElements, item.ElementId);
                }
                item.AssignedRoleCount = faAssignedRoleCount;
                break;
            case 1:
                let groupAssignedRoleCount = (((!isEmpty2(item.RoleId)) && item.IsDerived == 0) ? 1 : 0);
                if (groupAssignedRoleCount === 0) {
                    groupAssignedRoleCount = getAssignedRoleCount(orgElements, item.ElementId);
                    if (groupAssignedRoleCount === 0) {
                        _.map(_.filter(orgElements, { 'ParentId': item.ElementId }), (faElement, index) => {
                            groupAssignedRoleCount += getAssignedRoleCount(orgElements, faElement.ElementId);
                        });
                    }
                }
                item.AssignedRoleCount = groupAssignedRoleCount;
                break;
        }
    });
    return orgElements;
};

export const findUpdateChildRole = (orgElements, elementId, roleId) => {
    const childElements = _.filter(Object.assign([], orgElements), { 'ParentId': elementId });
    _.map(childElements, (childElement, index) => {
        if (isEmpty2(childElement.RoleId) || childElement.IsDerived === 1) {
            const orgElementIndex = _.findIndex(orgElements, { 'ElementId': childElement.ElementId });
            if (orgElementIndex !== -1) {
                orgElements = update(orgElements, { [orgElementIndex]: { RoleId: { $set: roleId }, IsDerived: { $set: isEmpty2(roleId) ? 0 : 1 }, } });
            }
            orgElements = findUpdateChildRole(orgElements, childElement.ElementId, roleId);
        }
    });
    return orgElements;
};

export const autoAdjustCompanyPermission = (orgElements) => {
    const orgElementData = Object.assign([], orgElements);

    const haveAnyGroupAssigned = _.filter(orgElementData, (i) => {
        return (i.EntityType === 1 && i.IsDerived === 0 && !isEmpty2(i.RoleId));
    }).length > 0;

    const companyRowIndex = _.findIndex(orgElements, { 'EntityType': 9 });
    if (companyRowIndex !== -1) {
        //Auto add/remove company/my group permission based on assigned group permission
        orgElements = update(orgElements, { [companyRowIndex]: { RoleId: { $set: (haveAnyGroupAssigned ? '51496d15-9457-448a-89ca-61d3f2ceb76f' : null) }, IsDerived: { $set: 0 }, } });
    }
    return orgElements;
};
