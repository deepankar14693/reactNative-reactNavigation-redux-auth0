import { PROJECT_CHANGE, GET_USER_PROJECTS, GET_PERMISSION_MASTER_DATA } from '../actions/actionTypes';
import update from 'immutability-helper';
import { permissionsData } from '../store/configureStoreData';
import { prepareObjectFromArray } from '../common/utils';

const permissionMasterDataReducer = (state = [], action) => {
    //const permissions = { ...state };
    switch (action.type) {
        case PROJECT_CHANGE:
            return update(state, { $set: permissionsData() });
        case GET_USER_PROJECTS:
            let tmpUserProjects = {};
            const userProjects = action.payload && action.payload.data ? action.payload.data : [];
            userProjects.map((p) => { tmpUserProjects[p] = p; });
            return update(state, { userProjects: { $set: tmpUserProjects } });
        case GET_PERMISSION_MASTER_DATA:
            let permissions = permissionsData();
            if (action.payload.data && action.payload.data.RolePermissions) {
                action.payload.data.RolePermissions.map((p) => {
                    permissions.rolePermissions[p.RoleId] = (p.PermissionIds.length > 0 ? ',' + p.PermissionIds + ',' : '');
                    return null;
                });
            }
            if (action.payload.data && action.payload.data.UserPermissions) {
                action.payload.data.UserPermissions.map((p) => {
                    permissions.userPermissions[p.EntityId] = p.RoleId;
                    return null;
                });
            }
            if (action.payload.data && action.payload.data.UserGroups) {
                action.payload.data.UserGroups.map((p) => {
                    permissions.userGroups[p.GroupId] = p.GroupId;
                    return null;
                });
            }
            if (action.payload.data && action.payload.data.UserProjects) {
                let tmpUserProjects = {};
                const userProjects = action.payload.data && action.payload.data.UserProjects ? action.payload.data.UserProjects : {};
                userProjects.map((p) => { tmpUserProjects[p] = p; });
                permissions.userProjects = tmpUserProjects;
            }
            if (action.payload.data && action.payload.data.IsCompanyPermission) {
                permissions.isCompanyPermission = action.payload.data.IsCompanyPermission;
                permissions.companyPermissionType = action.payload.data.CompanyPermissionType;
            }
            permissions.isLoading = false;
            return update(state, { $set: permissions });;
        default:
            return state;
    }
}

export default permissionMasterDataReducer;
