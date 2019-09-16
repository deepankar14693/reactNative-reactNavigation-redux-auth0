import { intersectionWith, isEmpty, isEqual, map } from 'lodash';
import { ADMIN_USER_ENTITYID, CLIENT_ADMIN, CLIENT_ADMIN_ONLY, ROLE_CLIENTADMIN, ROLE_VICIADMIN, VICI_ADMIN } from './permissions';

export const checkRole = (permissions, groupId, focusAreaId, ideaGroupId, actionType) => {
    if (permissions) {
        if (Object.keys(permissions.userPermissions).length > 0) {
            if (ideaGroupId != null && !isEmpty(permissions.userPermissions[ideaGroupId])) {
                return checkPermission(permissions.rolePermissions, permissions.userPermissions[ideaGroupId], actionType);
            }
            else if (focusAreaId != null && !isEmpty(permissions.userPermissions[focusAreaId])) {
                return checkPermission(permissions.rolePermissions, permissions.userPermissions[focusAreaId], actionType);
            }
            else if (groupId != null && !isEmpty(permissions.userPermissions[groupId])) {
                return checkPermission(permissions.rolePermissions, permissions.userPermissions[groupId], actionType);
            } else if (groupId != null && (isEmpty(permissions.userPermissions[groupId]) && !isEmpty(permissions.userGroups[groupId]))) {
                return checkPermission(permissions.rolePermissions, '51496d15-9457-448a-89ca-61d3f2ceb76f', actionType);
            } else
                return false;
        } else {
            return false;
        }
    }
};

export const checkPermission = (rolePermissions, roleId, actionType) => {
    const permissionId = ',' + actionType + ',';
    return (!isEmpty(rolePermissions) && Object.keys(rolePermissions).length > 0 && rolePermissions[roleId].indexOf(permissionId) > -1);
};

export const checkCompanyRole = (permissions, organizationId, actionType) => {
    if (Object.keys(permissions.userPermissions).length > 0 && permissions.isCompanyPermission) {
        if (organizationId != null && !isEmpty(permissions.userPermissions[organizationId])) {
            return checkPermission(permissions.rolePermissions, permissions.userPermissions[organizationId], actionType);
        } else
            return false;
    } else {
        return false;
    }
};

export const isLessThanGroupAccess = function (permissions, groupId) {
    if (permissions) {
        if (Object.keys(permissions.userPermissions).length > 0 && permissions.userPermissions[groupId]) {
            return false;
        } else {
            return true;
        }
    }
};

export const getPermittedFocusAreas = function (permissions, groupFocusAreaIds, actionType) {
    var permittedFocusAreas = [];
    var assignedFocusAreas = [];
    var entityIds = Object.keys(Object.assign({}, permissions.userPermissions));
    var groupFocusAreasIds = Object.keys(Object.assign({}, groupFocusAreaIds));
    if (entityIds.length > 0) {
        assignedFocusAreas = intersectionWith(entityIds, groupFocusAreasIds, isEqual);
        map(assignedFocusAreas, (focusAreaId) => {
            if (checkPermission(permissions.rolePermissions, permissions.userPermissions[focusAreaId], actionType)) {
                permittedFocusAreas.push(focusAreaId);
            }
        });
    }
    return permittedFocusAreas;
};

export const isPOMGroup = function (permissions, groupId) {
    if (permissions) {
        if (Object.keys(permissions.userPermissions).length > 0 && permissions.userPermissions[groupId]
            && permissions.userPermissions[groupId] === 'f2c2dc15-278d-4e79-aa43-4bbefb088bb1') {
            return true;
        } else {
            return false;
        }
    } return false;
};

export const isSpecificRoleGroup = function (permissions, groupId, roleName) {
    if (permissions && Object.keys(permissions.userPermissions).length > 0 && permissions.userPermissions[groupId]) {
        switch (roleName) {
            case 'POM':
                return (permissions.userPermissions[groupId] === 'f2c2dc15-278d-4e79-aa43-4bbefb088bb1');
            case 'ViciPartner':
                return (permissions.userPermissions[groupId] === '9d74ffcf-126f-47f5-987b-14e4f91a10e0');
            case 'IT':
                return (permissions.userPermissions[groupId] === '5659374e-ad72-4638-a37f-9217dd4b32f5');
            default: break;
        }
    } else {
        return false;
    }
};

export const checkAdminRole = function (permissions, adminType) {
    if (Object.keys(permissions.userPermissions).length > 0) {
        switch (adminType) {
            case VICI_ADMIN:
                return (!isEmpty(permissions.userPermissions[ADMIN_USER_ENTITYID]) &&
                    permissions.userPermissions[ADMIN_USER_ENTITYID] === ROLE_VICIADMIN);
            case CLIENT_ADMIN:
                return (!isEmpty(permissions.userPermissions[ADMIN_USER_ENTITYID]) &&
                    (permissions.userPermissions[ADMIN_USER_ENTITYID] === ROLE_CLIENTADMIN ||
                        permissions.userPermissions[ADMIN_USER_ENTITYID] === ROLE_VICIADMIN));
            case CLIENT_ADMIN_ONLY:
                return (!isEmpty(permissions.userPermissions[ADMIN_USER_ENTITYID]) &&
                    permissions.userPermissions[ADMIN_USER_ENTITYID] === ROLE_CLIENTADMIN);
            default: break;
        }
    } else {
        return false;
    }
};
