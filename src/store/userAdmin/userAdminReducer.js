import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../../actions/actionTypes';
import { isEmpty2, getMFATypeName, getMFASource } from '../../common/utils';
import * as userAdminUpdater from './userAdminUpdater';


const userAdminReducer = (state = [], action, entireState) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            if (action.payload.data) {
                return update(state, {
                    isLoading: { $set: false }, auth0NewUser: { $set: null },
                    auth0PasswordUser: { $set: '' }, auth0InvitedUsers: { $set: [] },
                    users: { $set: action.payload.data }
                });
            } else {
                return state;
            }
        case actionTypes.GET_USER_MFA_ENROLLMENTS:
            const userMFAData = JSON.parse(action.payload.data.Auth0UserMFAEnrollments);
            const userAuth0Data = JSON.parse(action.payload.data.GetAuth0Users);
            if (userAuth0Data) {
                let users = _.cloneDeep(state.users);
                const userMFASetupData = userMFAData && userMFAData.length > 0 ? userMFAData[0] : null;
                const useMFA = (userAuth0Data && userAuth0Data.user_metadata && userAuth0Data.user_metadata.use_mfa === true);
                const auth0UserIndex = _.findIndex(users.OrgUsers, { 'UserId': action.userId });
                if (auth0UserIndex !== -1) {
                    users.OrgUsers = update(users.OrgUsers, {
                        [auth0UserIndex]: {
                            Auth0Data: {
                                EnrollmentId: { $set: userMFASetupData ? userMFASetupData.id : '' },
                                Type: { $set: userMFASetupData ? getMFATypeName(userMFASetupData.type) : '' },
                                SourceDevice: { $set: userMFASetupData ? getMFASource(userMFASetupData) : '' },
                                UseMFA: { $set: useMFA },
                            }
                        }
                    });
                }
                return update(state, {
                    isLoading: { $set: false },
                    auth0NewUser: { $set: null },
                    auth0PasswordUser: { $set: '' }, auth0InvitedUsers: { $set: [] },
                    users: { $set: users }
                });
            } else {
                return state;
            }
        case actionTypes.GET_ADMIN_USERS:
            if (action.payload.data) {
                return update(state, { isLoading: { $set: false }, adminUsers: { $set: action.payload.data } });
            } else {
                return state;
            }
        case actionTypes.ENABLE_GETUSER_LOADING:
            return update(state, { isLoading: { $set: true } });

        case actionTypes.GET_USER_PERMISSIONS:
            if (action.payload.data) {
                let userPermissions = action.payload.data;
                userPermissions.permissionView = 1;
                userPermissions.permissionType = 1;
                userPermissions.OrgElementsTreeData = userAdminUpdater.getOrgElementsTreeData(userPermissions.OrgElements, {}, userPermissions.permissionView, userPermissions.permissionType, true);
                return update(state, { isLoading: { $set: false }, userPermissions: { $set: userPermissions } });
            } else {
                return state;
            }

        case actionTypes.CREATE_USER:
            return update(state, { auth0NewUser: { $set: null } });
        case actionTypes.CREATE_AUTH0_USER:
            if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
                return update(state, { auth0NewUser: { $set: action.payload.data } });
            } else {
                return update(state, { auth0NewUser: { $set: null } });
            }

        case actionTypes.CHANGE_PASSWORD:
            return update(state, { auth0PasswordUser: { $set: '' } });
        case actionTypes.CHANGE_AUTH0_USER_PASSWORD:
            if (action.payload && !isEmpty2(action.payload.data)) {
                return update(state, { auth0PasswordUser: { $set: action.payload.data } });
            } else {
                return update(state, { auth0PasswordUser: { $set: '' } });
            }

        case actionTypes.INVITE_USERS:
            return update(state, { auth0InvitedUsers: { $set: [] } });
        case actionTypes.INVITE_AUTH0_USER:
            if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
                return update(state, { auth0InvitedUsers: { $set: action.payload.data } });
            } else {
                return update(state, { auth0InvitedUsers: { $set: [] } });
            }

        case actionTypes.TOGGLE_PERMISSION_EXPAND_COLLAPSE:
            let toggleStateObj = _.cloneDeep(state.userPermissions.OrgElementsTreeData);
            toggleStateObj[action.payload.elementId].IsExpanded = !toggleStateObj[action.payload.elementId].IsExpanded;
            return update(state, { userPermissions: { OrgElementsTreeData: { $set: toggleStateObj } } });

        case actionTypes.GET_SELECTED_ELEMENT_PERMISSION:
            if (action.payload.data) {
                let loadElementUsersStateObj = Object.assign([], state.userPermissions.Users);
                let selectedElementPermissions = action.payload.data;

                for (let i = 0; i < loadElementUsersStateObj.length; i++) {
                    loadElementUsersStateObj[i].RoleId = null;
                    loadElementUsersStateObj[i].ParentRoleId = null;
                }

                selectedElementPermissions.UserPermissions.map((userData, index) => {
                    const userDataIndex = _.findIndex(loadElementUsersStateObj, { 'UserId': userData.UserId });
                    if (userDataIndex !== -1) {
                        loadElementUsersStateObj = update(loadElementUsersStateObj, {
                            [userDataIndex]: {
                                RoleId: { $set: userData.RoleId }, IsDerived: { $set: userData.IsDerived },
                                ParentRoleId: { $set: userData.ParentRoleId }
                            }
                        });
                    }
                    return null;
                });
                return update(state, {
                    isLoading: { $set: false },
                    userPermissions: { Users: { $set: loadElementUsersStateObj } },
                });
            } else {
                return state;
            }

        case actionTypes.GET_SELECTED_USER_PERMISSIONS:
            if (action.payload.data) {
                const permissionView = state.userPermissions.permissionView;
                const permissionType = state.userPermissions.permissionType;
                let loadUserPermissionStateObj = Object.assign([], state.userPermissions.OrgElements);
                const orgElementsTreeData = state.userPermissions.OrgElementsTreeData;

                let selectedUserPermissions = action.payload.data;
                for (let i = 0; i < loadUserPermissionStateObj.length; i++) {
                    loadUserPermissionStateObj[i].RoleId = '';
                    loadUserPermissionStateObj[i].AssignedRoleCount = 0;
                }

                selectedUserPermissions.UserPermissions.map((userData, index) => {
                    const elementId = (userData && userData.ElementId ? userData.ElementId.toUpperCase() : '');
                    const orgElementIndex = _.findIndex(loadUserPermissionStateObj, { 'ElementId': elementId });
                    if (orgElementIndex !== -1) {
                        loadUserPermissionStateObj = update(loadUserPermissionStateObj, {
                            [orgElementIndex]:
                            {
                                RoleId: { $set: userData.RoleId }, IsDerived: { $set: userData.IsDerived },
                                AssignedRoleCount: { $set: (userData.EntityType === 3 && (!isEmpty2(userData.RoleId)) && userData.IsDerived === 0) ? 1 : 0 },
                            }
                        });
                    }
                    return null;
                });

                return update(state, {
                    isLoading: { $set: false },
                    userPermissions: {
                        OrgElements: { $set: loadUserPermissionStateObj },
                        OrgElementsTreeData: { $set: userAdminUpdater.getOrgElementsTreeData(loadUserPermissionStateObj, orgElementsTreeData, permissionView, permissionType) }
                    }
                });
            } else {
                return state;
            }
        case actionTypes.CHANGE_PERMISSION_VIEW:
            if (action.payload && action.payload.permissionView) {
                let permissionView = action.payload.permissionView;
                let orgElements = Object.assign([], state.userPermissions.OrgElements);
                const orgElementsTreeData = state.userPermissions.OrgElementsTreeData;
                const permissionType = state.userPermissions.permissionType;

                return update(state, {
                    userPermissions: {
                        permissionView: { $set: permissionView },
                        OrgElementsTreeData: { $set: userAdminUpdater.getOrgElementsTreeData(orgElements, orgElementsTreeData, permissionView, permissionType) }
                    }
                });
            } else {
                return state;
            }
        case actionTypes.CHANGE_PERMISSION_TYPE:
            if (action.payload && action.payload.permissionType) {
                let permissionType = action.payload.permissionType;

                let orgElements = Object.assign([], state.userPermissions.OrgElements);
                const orgElementsTreeData = state.userPermissions.OrgElementsTreeData;
                const permissionView = state.userPermissions.permissionView;
                const userList = state.userPermissions.Users;

                return update(state, {
                    userPermissions: {
                        permissionType: { $set: permissionType },
                        Users: { $set: userAdminUpdater.getUsers(userList, permissionType) },
                        OrgElementsTreeData: { $set: userAdminUpdater.getOrgElementsTreeData(orgElements, orgElementsTreeData, permissionView, permissionType) }
                    }
                });
            } else {
                return state;
            }

        case actionTypes.SAVE_ROLE_PERMISSION:
            if (action.payload && action.payload.data !== 0) {
                const configData = JSON.parse(action.payload.config.data);
                const permissionView = state.userPermissions.permissionView;
                const permissionType = state.userPermissions.permissionType;
                if (permissionType === 1) {
                    let updatedOrgElements = Object.assign([], state.userPermissions.OrgElements);
                    const orgElementsTreeData = state.userPermissions.OrgElementsTreeData;

                    const orgElementIndex = _.findIndex(updatedOrgElements, { 'ElementId': configData.entityId });
                    if (orgElementIndex !== -1) {
                        updatedOrgElements = update(updatedOrgElements, { [orgElementIndex]: { RoleId: { $set: configData.roleId }, IsDerived: { $set: 0 }, } });
                    }
                    updatedOrgElements = userAdminUpdater.findUpdateChildRole(updatedOrgElements, configData.entityId, configData.roleId);
                    //Auto adjust company/my group permission
                    //orgElements = userAdminUpdater.autoAdjustCompanyPermission(orgElements);
                    return update(state, {
                        userPermissions: {
                            OrgElements: { $set: updatedOrgElements },
                            OrgElementsTreeData: { $set: userAdminUpdater.getOrgElementsTreeData(updatedOrgElements, orgElementsTreeData, permissionView, permissionType) }
                        }
                    });
                } else if (permissionType === 2) {
                    let userList = Object.assign(state.userPermissions.Users);

                    const userRowIndex = _.findIndex(userList, { 'UserId': configData.selectedUserId });
                    if (userRowIndex !== -1) {
                        userList = update(userList, { [userRowIndex]: { RoleId: { $set: configData.roleId }, IsDerived: { $set: 0 }, } });
                    }
                    return update(state, { userPermissions: { Users: { $set: userAdminUpdater.getUsers(userList, permissionView, permissionType) } } });
                }
                else {
                    return state;
                }
            } else {
                return state;
            }
        case actionTypes.REMOVE_ROLE_PERMISSION:
            if (action.payload && action.payload.data !== 0) {
                const configData = JSON.parse(action.payload.config.data);
                const permissionView = state.userPermissions.permissionView;
                const permissionType = state.userPermissions.permissionType;

                if (permissionType === 1) {
                    let orgElements = Object.assign(state.userPermissions.OrgElements);
                    const orgElementsTreeData = state.userPermissions.OrgElementsTreeData;

                    let isLeafNode = false;
                    let childElement = null;

                    const orgElementIndex = _.findIndex(orgElements, { 'ElementId': configData.entityId });
                    if (orgElementIndex !== -1) {
                        childElement = orgElementsTreeData[configData.entityId] ? orgElementsTreeData[configData.entityId] : null;
                        let parentElement = null;
                        if (childElement) {
                            isLeafNode = (orgElementsTreeData[childElement.data.ParentId] && orgElementsTreeData[childElement.data.ParentId].children && orgElementsTreeData[childElement.data.ParentId].children.length === 0);
                            parentElement = orgElementsTreeData[childElement.data.ParentId] ? orgElementsTreeData[childElement.data.ParentId] : null;
                            childElement.data.RoleId = parentElement && parentElement.data ? parentElement.data.RoleId : '';
                        }
                    }

                    orgElements = update(orgElements, {
                        [orgElementIndex]:
                        {
                            RoleId: { $set: childElement.data.RoleId },
                            IsDerived: { $set: childElement ? (isEmpty2(childElement.data.RoleId) ? 0 : 1) : 0 },
                        }
                    });
                    if (!isLeafNode) {
                        orgElements = userAdminUpdater.findUpdateChildRole(orgElements, configData.entityId, childElement.data.RoleId);
                    }

                    //Auto adjust company/my group permission
                    //orgElements = userAdminUpdater.autoAdjustCompanyPermission(orgElements);
                    return update(state, {
                        userPermissions: {
                            OrgElements: { $set: orgElements },
                            OrgElementsTreeData: { $set: userAdminUpdater.getOrgElementsTreeData(orgElements, orgElementsTreeData, permissionView, permissionType) }
                        }
                    });
                } else {
                    let userList = Object.assign(state.userPermissions.Users);
                    let parentRoleId = null;
                    const userPrevData = _.filter(userList, { 'UserId': configData.userId });
                    if (userPrevData && userPrevData.length > 0) {
                        parentRoleId = userPrevData[0].ParentRoleId;
                    }
                    const userRowIndex = _.findIndex(userList, { 'UserId': configData.userId });
                    if (userRowIndex !== -1) {
                        userList = update(userList, { [userRowIndex]: { RoleId: { $set: parentRoleId }, IsDerived: { $set: 1 }, } });
                    }
                    return update(state, { userPermissions: { Users: { $set: userAdminUpdater.getUsers(userList, permissionView, permissionType) } } });
                }
            } else {
                return state;
            }
        case actionTypes.GET_CONNECTIONS:
            if (action.payload.data) {
                return update(state, { isLoading: { $set: false }, connections: { $set: action.payload.data } });
            } else {
                return state;
            }
        case actionTypes.GET_USER_HISTORY:
            if (action.payload.data) {
                return { ...state, userHistory: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.CLEAR_USER_HISTORY:
            return { ...state, userHistory: [] };

        case actionTypes.SAVE_ADMIN_USERS:
            return state;

        case actionTypes.DELETE_ADMIN_USERS:
            return state;

        default:
            return state;
    }
}

export default userAdminReducer;
