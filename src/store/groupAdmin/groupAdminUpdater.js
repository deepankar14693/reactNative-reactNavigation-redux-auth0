import { isEmpty2 } from '../../common/utils';
import update from 'immutability-helper';
import _ from 'lodash';

export const updateGroupPermission = (groupLeadership, configData) => {
    const gLeaders = _.filter(Object.assign([], groupLeadership), { 'UserId': configData.selectedUserId });
    _.map(gLeaders, (leader, index) => {
        if (!isEmpty2(leader.UserId)) {
            const userRowIndex = _.findIndex(groupLeadership, { 'UserId': configData.selectedUserId, 'LeadershipType': leader.LeadershipType });
            if (userRowIndex !== -1) {
                groupLeadership = update(groupLeadership, { [userRowIndex]: { RoleId: { $set: configData.roleId } } });
            }
        }
    });
    return groupLeadership;
};

export const updateFocusAreaPermission = (faLeadership, configData) => {
    const userRowIndex = _.findIndex(faLeadership, { 'UserId': configData.selectedUserId, 'ElementId': configData.entityId });
    if (userRowIndex !== -1) {
        faLeadership = update(faLeadership, { [userRowIndex]: { RoleId: { $set: configData.roleId } } });
    }
    return faLeadership;
};

export const updateIdeaPermission = (ideaLeadership, configData, roles) => {
    const iLeaders = _.filter(Object.assign([], ideaLeadership), { 'UserId': configData.selectedUserId, 'ElementId': configData.entityId });
    _.map(iLeaders, (leader, index) => {
        if (!isEmpty2(leader.UserId)) {
            const userRowIndex = _.findIndex(ideaLeadership, { 'UserId': leader.UserId, 'ElementId': leader.ElementId, 'LeaderType': leader.LeaderType });
            if (userRowIndex !== -1) {
                ideaLeadership = update(ideaLeadership, { [userRowIndex]: { RoleId: { $set: configData.roleId }, RoleName: { $set: getRoleName(roles, configData.roleId) } } });
            }
        }
    });
    return ideaLeadership;
};

const getRoleName = (roles, roleId) => {
    const role = _.filter(roles, { 'RoleId': roleId });
    return role && role.length > 0 ? role[0].Name : '';
};
