import { showNotification2, hideNotification2, showMultiNotification, hideMultiNotification } from './notification';
import { getAxios, postAxios, postAxiosToAuth0Api, getAxiosFromAuth0Api } from './axiosActions';
import * as actionTypes from './actionTypes';
import { postAxiosToMVCApp, showBulkActionNotification } from '../actions/index';
import { showLongNotification } from './index';
import { isEmpty2, newGuid } from '../common/utils';
import { getNotifyItem } from '../common/notifyConstants';
import axios from 'axios';

export const getUsers = () => {
    let params = { callTime: new Date() };
    const url = 'UserAdmin/GetOrganizationUsers';
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_USERS,
        payload: request
    }
};

export const getAdminUsers = () => {
    let params = { callTime: new Date() };
    const url = 'UserAdmin/GetAdminUsers';
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_ADMIN_USERS,
        payload: request
    }
};

export const getUserPermissions = () => {
    let params = { callTime: new Date() };
    const url = 'UserAdmin/GetPermissionAllData';
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_USER_PERMISSIONS,
        payload: request
    }
};

export const togglePermissionExpandCollapse = (elementId) => {
    let params = { elementId: elementId };
    return {
        type: actionTypes.TOGGLE_PERMISSION_EXPAND_COLLAPSE,
        payload: params
    }
};


export const getSelectedElementPermission = (elementId) => {
    let params = { elementId: elementId, callTime: new Date() };
    const url = 'UserAdmin/GetUserPermissionsByOrgElement?selectedUserId=&elementId=' + elementId;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_SELECTED_ELEMENT_PERMISSION,
        payload: request
    }
};

export const changePermissionType = (permissionType) => {
    let params = { permissionType: permissionType.value };
    return {
        type: actionTypes.CHANGE_PERMISSION_TYPE,
        payload: params
    }
};

export const changePermissionView = (permissionView) => {
    let params = { permissionView: permissionView.value };
    return {
        type: actionTypes.CHANGE_PERMISSION_VIEW,
        payload: params
    }
};

export const getSelectedUserPermissions = (userId) => {
    let params = { callTime: new Date() };
    const url = 'UserAdmin/GetUserPermissions?selectedUserId=' + userId;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_SELECTED_USER_PERMISSIONS,
        payload: request
    }
};


export const onChangeRolePermission = (selectedUserId, entityId, roleId, entityType) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(changeRolePermission(selectedUserId, entityId, roleId, entityType))
    }]
};

const changeRolePermission = (selectedUserId, entityId, roleId, entityType) => {
    let params = { selectedUserId, entityId: entityId, roleId, entityType };
    let url = '';
    let actionType = '';

    if (!isEmpty2(roleId)) {
        params = { selectedUserId, entityId, roleId, entityType };
        url = 'UserAdmin/SaveUserPermission';;
        actionType = actionTypes.SAVE_ROLE_PERMISSION;
    } else {
        params = { userId: selectedUserId, entityId, entityType };
        url = 'UserAdmin/RemoveUserPermission';
        actionType = actionTypes.REMOVE_ROLE_PERMISSION;
    }

    const request = postAxios(url, { params: params });
    return [{
        type: actionType,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getConnections = (isAllConnections) => {
    let params = { callTime: new Date() };
    const url = 'UserAdmin/GetConnections?isAllConnections=' + isAllConnections;
    const request = postAxiosToMVCApp(url, { params: params });
    return {
        type: actionTypes.GET_CONNECTIONS,
        payload: request
    }
};

export const saveAdminUsers = (adminEntityId, adminUserIds, roleId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    }, (dispatch, getState) => {
        dispatch(saveAdminUsersData(adminEntityId, adminUserIds, roleId))
    }]
};

const saveAdminUsersData = (adminEntityId, adminUserIds, roleId) => {
    let params = { adminEntityId: adminEntityId, adminUserIds: adminUserIds, roleId: roleId };
    const url = 'UserAdmin/SaveAdminUsers';
    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.SAVE_ADMIN_USERS,
        payload: request
    },
    (dispatch, getState) => {
        dispatch(getAdminUsers());
    },
        //(dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const deleteAdminUsers = (adminUserIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    }, (dispatch, getState) => {
        dispatch(deleteAdminUsersData(adminUserIds))
    }]
};

const deleteAdminUsersData = (adminUserIds) => {
    let params = { 'userIds': adminUserIds };
    const url = 'UserAdmin/DeleteAdminUsers';
    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.DELETE_ADMIN_USERS,
        payload: request
    },
    (dispatch, getState) => {
        dispatch(getAdminUsers());
    },
        //(dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getUserHistory = (userId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading...'));
    },
    (dispatch, getState) => {
        dispatch(getUserHistoryData(userId))
    }]
};

const getUserHistoryData = (userId) => {
    let params = {};
    const url = 'EventStore/GetUserHistory?id=' + userId;
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_USER_HISTORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const clearUserHistory = () => {
    return {
        type: actionTypes.CLEAR_USER_HISTORY
    }
};

export const saveOrgUsers = (addedUsers) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    }, (dispatch, getState) => {
        dispatch(saveOrgUsersData(addedUsers))
    }]
};

const saveOrgUsersData = (addedUsers) => {
    let params = { 'addedUsers': addedUsers };
    const url = 'UserAdmin/SaveOrganizationUsers';
    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.ADD_USER,
        payload: request
    },
    // (dispatch, getState) => {
    //     dispatch(getUsers());
    // },
    (dispatch, getState) => { dispatch(manageOrgnizationUsers()) }
    ]
};

export const deleteOrgUsers = (userIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    }, (dispatch, getState) => {
        dispatch(deleteOrgUsersData(userIds))
    }]
};

const deleteOrgUsersData = (userIds) => {
    let params = { 'userIds': userIds };
    const url = 'UserAdmin/DeleteOrganizationUsers';
    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.REMOVE_USER,
        payload: request
    },
    // (dispatch, getState) => {
    //     dispatch(getUsers());
    // },
    (dispatch, getState) => { dispatch(manageOrgnizationUsers()) }
    ]
};

export const inviteUsers = (selectedUsers) => {
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('SendInvite')));
    }, (dispatch, getState) => {
        dispatch(sendInviteUsers(selectedUsers))
    }]
};

const sendInviteUsers = (selectedUsers) => {
    let params = { 'data': selectedUsers };
    const url = 'Auth0/InviteUsers';
    const request = postAxiosToAuth0Api(url, { params: params });
    return [
        {
            type: actionTypes.INVITE_AUTH0_USER,
            payload: request
        },
        (dispatch, getState) => {
            const invitedUsers = getState().userAdminData.auth0InvitedUsers;
            if (!isEmpty2(invitedUsers)) {
                dispatch(sendInvitationLog(invitedUsers));
            }
        }
    ]
};

const sendInvitationLog = (selectedUsers) => {
    let params = { userIds: selectedUsers.join(',') };
    const url = 'UserAdmin/SendInvitation';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.INVITE_USERS,
        payload: request
    };
};

export const changePassword = (selectedUsers, password) => {
    return [(dispatch, getState) => {
        dispatch(showLongNotification('Saving...'));
    }, (dispatch, getState) => {
        dispatch(changeUserPassword(selectedUsers, password))
    }]
};

const changeUserPassword = (selectedUserId, password) => {
    let params = { userid: selectedUserId, pwd: password };
    const url = 'Auth0/ChangeUserPassword';
    const request = postAxiosToAuth0Api(url, { params: params });

    return [
        {
            type: actionTypes.CHANGE_AUTH0_USER_PASSWORD,
            payload: request
        },
        (dispatch, getState) => {
            const auth0PasswordUser = getState().userAdminData.auth0PasswordUser;
            if (!isEmpty2(auth0PasswordUser)) {
                dispatch(changePasswordLog(selectedUserId));
            }
        }
    ]
};

const changePasswordLog = (selectedUserId) => {
    let params = { selectedUserId: selectedUserId };
    const url = 'UserAdmin/ChangePassword';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.CHANGE_PASSWORD,
        payload: request
    };
};

export const createVpUser = (user) => {
    let firstName = user.FirstName, lastName = user.LastName, email = user.Email, phone = user.Phone, type = user.type;
    const newUserId = newGuid();

    var roles = {};
    roles["roles"] = ['VPUser'];
    const phoneNumber = (phone === 0 ? '' : phone);
    let params = { firstName, lastName, email, phoneNumber, roles, type, newUserId };
    const url = 'Auth0/CreateVpUser';
    const request = postAxiosToAuth0Api(url, { params: params });

    return [
        {
            type: actionTypes.CREATE_AUTH0_USER,
            payload: request
        },
        (dispatch, getState) => {
            const tempState = getState();
            var auth0NewUser = tempState.userAdminData.auth0NewUser;
            if (!isEmpty2(auth0NewUser)) {
                dispatch(createUser(newUserId, user));
            }
        }
    ]
};

const createUser = (userId, user) => {
    let firstName = user.FirstName, lastName = user.LastName, email = user.Email, phone = user.Phone, type = user.type
    let params = { userId, firstName, lastName, email, phone, type };
    const url = 'UserAdmin/CreateUser';
    const request = postAxios(url, { params: params });
    return [
        {
            type: actionTypes.CREATE_USER,
            payload: request
        },
        (dispatch, getState) => {
            if (user.SendInvite) {
                const invitedUsers = [userId];
                dispatch(inviteUsers(invitedUsers));
            }
            dispatch(manageOrgnizationUsers(user.IsCreatePersonnel));
            if (user.IsCreatePersonnel) {
                dispatch(showMultiNotification(getNotifyItem('CreatePersonnel')));
                dispatch(createPersonnel(user.personnel));
            }
        },
    ]
};

const manageOrgnizationUsers = (isCreatePersonnel) => {
    let params = { callTime: new Date() };
    const url = 'ViciAdmin/ManageOrganizationUsers';
    const request = postAxiosToMVCApp(url, { params: params });
    return [
        (dispatch, getState) => {
            if (!isCreatePersonnel) {
                dispatch(enableGetUserIsLoading());
            }
        },
        (dispatch, getState) => {
            if (!isCreatePersonnel) {
                dispatch(getUsers());
            }
        }
    ]
}

export const onCreatePersonnel = (data) => {
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('CreatePersonnel')));
    },
    (dispatch, getState) => {
        dispatch(createPersonnel(data))
    }]
};

const createPersonnel = (data) => {
    data.EventType = 'Create';
    data.FTE = 1.0;
    data.Exclude = 'N';
    data.IsOpen = 'N';

    let params = data;
    const url = 'BaselineData/CreatePersonnel';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_PERSONNEL_FROM_USERS,
        payload: request
    },
    (dispatch, getState) => { dispatch(enableGetUserIsLoading()); },
    (dispatch, getState) => { dispatch(getUsers()) }
    ]
};

const enableGetUserIsLoading = () => {
    return {
        type: actionTypes.ENABLE_GETUSER_LOADING
    }
};

export const changeMfa = (userIds, mfaValue) => {
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('ChangeMFA')));
    }, (dispatch, getState) => {
        dispatch(changeUserMfa(userIds, mfaValue ? 'true' : 'false'))
    }]
};

const changeUserMfa = async (userIds, mfaValue) => {
    let params = { userIds: userIds, mfaValue: mfaValue };
    const url = 'Auth0/ChangeMfa';
    const request = await postAxiosToAuth0Api(url, { params: params });

    return [
        {
            type: actionTypes.CHANGE_AUTH0_USER_MFA,
            payload: request
        },
        (dispatch, getState) => {
            if (request && request.data && request.data === 1) {
                dispatch(changeUserMFALog(userIds[0], mfaValue));
            }
        },
        (dispatch, getState) => {
            if (userIds.length > 0) {
                dispatch(getUserMfaEnrollments(userIds[0]));
            }
        },
    ]
};

const changeUserMFALog = (userId, mfaValue) => {
    let params = { userId: userId, mfaValue: mfaValue };
    const url = 'UserAdmin/ChangeMfa';

    const request = postAxios(url, { params: params });
    return [
        {
            type: actionTypes.CHANGE_AUTH0_USER_MFA_LOG,
            payload: request
        },
    ]
};

export const resetMfa = (enrollmentId, userId) => {
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('ResetMFA')));
    }, (dispatch, getState) => {
        dispatch(resetUserMfa(enrollmentId, userId))
    }]
};

const resetUserMfa = async(enrollmentId, userId) => {
    let params = { enrollmentId: enrollmentId };
    const url = 'Auth0/ResetMFA';
    const request = await postAxiosToAuth0Api(url, { params: params });

    return [
        {
            type: actionTypes.RESET_AUTH0_USER_MFA,
            payload: request
        },
        (dispatch, getState) => {
            if (request && request.data && request.data === 1) {
                dispatch(resetUserMFALog(userId));
            }
        },
        (dispatch, getState) => {
            dispatch(getUserMfaEnrollments(userId));
        }
    ]
};

const resetUserMFALog = (userId) => {
    let params = { userId: userId };
    const url = 'UserAdmin/ResetMFA';

    const request = postAxios(url, { params: params });
    return [
        {
            type: actionTypes.RESET_AUTH0_USER_MFA_LOG,
            payload: request
        },
    ]
};

export const getUserMfaEnrollments = (userId) => {
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('LoadUserMFA')));
    }, (dispatch, getState) => {
        dispatch(getUserMfa(userId))
    }]
};

const getUserMfa = async (userId) => {
    let params = { callTime: new Date() };
    const url = 'Settings/GetAuth0Users?userId=' + userId;
    const request = await getAxiosFromAuth0Api(url, { params: params });

    return [
        {
            type: actionTypes.GET_USER_MFA_ENROLLMENTS,
            payload: request,
            userId: userId
        },
        (dispatch, getState) => {
            dispatch(hideMultiNotification('LoadUserMFA'));
        },
    ]
};