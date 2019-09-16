
import { postAxiosToMVCApp } from '../actions/index';
import { getNotifyItem } from '../common/notifyConstants';
import { getMomentTimeStamp, isEmpty2, newGuid } from '../common/utils';
import * as actionTypes from './actionTypes';
import { getAxios, postAxios, postAxiosToAuth0Api } from './axiosActions';
import { hideNotification2, showMultiNotification, showNotification2 } from './notification';
import { inviteUsers } from './userAdminActions';
//import { getOrganizationId, getMomentTimeStamp } from '../common/utils';
import { getLocalStorageKey } from '../common/utils';

export const onCreateGroupSummary = (groupId, groupSummaryId, fieldName, fieldValue) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(createGroupSummary(groupId, groupSummaryId, fieldName, fieldValue))
    }]
};

export const createGroupSummary = (groupId, groupSummaryId, fieldName, fieldValue) => {
    let params = { groupId: groupId, groupSummaryId: groupSummaryId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'GroupAdmin/CreateGroupSummary';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_GROUPSUMMARYTEXT,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateGroupSummary = (groupId, groupSummaryId, fieldName, fieldValue) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(updateGroupSummary(groupId, groupSummaryId, fieldName, fieldValue))
    }]
};

export const updateGroupSummary = (groupId, groupSummaryId, fieldName, fieldValue) => {
    let params = { groupId: groupId, groupSummaryId: groupSummaryId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'GroupAdmin/UpdateGroupSummaryText';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_GROUPSUMMARYTEXT,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteGroupSummary = (groupId, groupSummaryId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    }, (dispatch, getState) => {
        dispatch(deleteGroupSummary(groupId, groupSummaryId))
    }]
};

export const deleteGroupSummary = (groupId, groupSummaryId) => {
    let params = { groupId: groupId, groupSummaryId: groupSummaryId };
    const url = 'GroupAdmin/DeleteGroupSummary';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.DELETE_GROUPSUMMARYTEXT,
        payload: request
    }
};

export const arrangeSummaryTable = (groupId, summaryTableRows) => {
    let params = { groupId: groupId, summaryTableRows: summaryTableRows };

    let url = 'GroupAdmin/RearrangeSummaryTable';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.ARRANGE_GROUPSUMMARY,
        payload: request
    }
};

export const onSaveFocusArea = (focusArea) => {
    let params = focusArea;
    const url = 'GroupAdmin/SaveFocusArea';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SAVE_FOCUSAREA,
        payload: request
    }
};

export const GetFocusAreaUsageCount = (focusAreaId) => {
    const currentTimeStamp = getMomentTimeStamp();
    let params = { focusAreaId: focusAreaId, callTime: new Date() };
    const url = 'GroupAdmin/GetFocusAreaUsageCount/' + focusAreaId + '-' + currentTimeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_FOCUSAREA_USAGECOUNT,
        payload: request
    }
};

export const resetFocusAreaUsageCount = () => {
    return {
        type: actionTypes.RESET_FOCUSAREA_USAGECOUNT,
    }
};

export const onDeleteFocusArea = (groupId, focusAreaId) => {
    var params = { groupId: groupId, focusAreaId: focusAreaId }
    const url = 'GroupAdmin/DeleteFocusArea';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.DELETE_FOCUSAREA,
        payload: request
    }
};

export const arrangeFocusAreas = (groupId, focusAreas) => {
    let params = { groupId: groupId, focusAreas: focusAreas };

    let url = 'GroupAdmin/RearrangeFocusAreas';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.ARRANGE_FOCUSAREAS,
        payload: request
    }
};


export const onAddFocusAreaLeaders = (groupId, focusAreaId, focusAreaLeaderIDs) => {
    let params = { GroupId: groupId, FocusAreaId: focusAreaId, FocusAreaLeaderIDs: focusAreaLeaderIDs };
    const url = 'GroupAdmin/SaveFocusAreaLeaders';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SAVE_FOCUSAREA_LEADERS,
        payload: request
    }
};

export const onUpdateGroupIdeaTiming = (groupId, ideaTimingException) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(updateGroupIdeaTiming(groupId, ideaTimingException))
    }]
};

export const updateGroupIdeaTiming = (groupId, ideaTimingException) => {
    let params = { groupId: groupId, ideaTimingException: ideaTimingException };
    const url = 'GroupAdmin/UpdateIdeaTimingEnable';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_GROUP_PLANLOCK,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateGroupPlanLock = (groupId, planLockedException) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(updateGroupPlanLock(groupId, planLockedException))
    }]
};

export const updateGroupPlanLock = (groupId, planLockedException) => {
    let params = { groupId: groupId, planLockedException: planLockedException };
    const url = 'GroupAdmin/UpdatePlanLock';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_GROUP_PLANLOCK,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getGroupAdminLeaderships = (groupId) => {
    const currentTimeStamp = getMomentTimeStamp();
    let params = { groupId: groupId, callTime: new Date() };
    const url = 'GroupAdmin/GetGroupAdminLeaderships/' + groupId + '-' + currentTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_GROUPADMIN_LEADERSHIP,
        payload: request
    }
};

export const onSaveCustomField = (customField) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(saveCustomField(customField))
    }]
};

export const saveCustomField = (customField) => {
    const url = 'GroupAdmin/SaveCustomField';
    const request = postAxios(url, { params: customField });

    return [{
        type: actionTypes.SAVE_CUSTOMFIELD,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteCustomField = (customField) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    }, (dispatch, getState) => {
        dispatch(deleteCustomField(customField))
    }]
};

export const deleteCustomField = (customField) => {
    const url = 'GroupAdmin/DeleteCustomField';
    const request = postAxios(url, { params: customField });

    return [{
        type: actionTypes.DELETE_CUSTOMFIELD,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onChangeRolePermission = (groupId, selectedUserId, entityId, roleId, entityType, param2) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(changeRolePermission(groupId, selectedUserId, entityId, roleId, entityType, param2))
    }]
};

const changeRolePermission = (groupId, selectedUserId, entityId, roleId, entityType, param2) => {
    let params = { groupId, selectedUserId, entityId: entityId, roleId, entityType, param2 };
    let url = '';
    let actionType = '';

    if (!isEmpty2(roleId)) {
        params = { groupId, selectedUserId, entityId, roleId, entityType, param2 };
        url = 'UserAdmin/SaveUserPermission';;
        actionType = actionTypes.SAVE_LEADERSHIP_ROLE_PERMISSION;
    } else {
        params = { groupId, userId: selectedUserId, entityId, entityType, param2 };
        url = 'UserAdmin/RemoveUserPermission';
        actionType = actionTypes.REMOVE_LEADERSHIP_ROLE_PERMISSION;
    }

    const request = postAxios(url, { params: params });
    return [{
        type: actionType,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onGetSCRReports = (groupId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading...'));
    },
    (dispatch, getState) => {
        dispatch(getSCRReportsData(groupId))
    }]
};

const getSCRReportsData = (groupId) => {
    const curProjectId = getLocalStorageKey('projectId') || getLocalStorageKey('projectId') || '';
    groupId = isEmpty2(groupId) ? curProjectId : groupId;
    let params = { groupId };
    let url = 'GroupAdmin/GetSCRReports?groupId=' + groupId;
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_SCR_REPORTS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteSCRReport = (attachmentId, scrReportId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    }, (dispatch, getState) => {
        dispatch(deleteSCRReport(attachmentId, scrReportId))
    }]
};

export const deleteSCRReport = (attachmentId, scrReportId) => {
    const url = 'GroupAdmin/SCRReportDelete';
    let params = { attachmentId: attachmentId, entityId: scrReportId, entityType: 202 }
    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.SCR_REPORT_DELETE,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onSCRReportCTMApproval = (scrReportId) => {
    const url = 'GroupAdmin/SCRReportCTMApproval';
    let params = { scrReportId: scrReportId }
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SCR_REPORT_CTM_APPROVAL,
        payload: request
    }
};

export const onSCRReportRemoveCTMApproval = (scrReportId) => {
    const url = 'GroupAdmin/SCRReportRemoveCTMApproval';
    let params = { scrReportId: scrReportId }
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SCR_REPORT_REMOVE_CTM_APPROVAL,
        payload: request
    }
};

export const onSCRReportPPApproval = (scrReportId) => {
    const url = 'GroupAdmin/SCRReportPPApproval';
    let params = { scrReportId: scrReportId }
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SCR_REPORT_PP_APPROVAL,
        payload: request
    }
};

export const onSCRReportRemovePPApproval = (scrReportId) => {
    const url = 'GroupAdmin/SCRReportRemovePPApproval';
    let params = { scrReportId: scrReportId }
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SCR_REPORT_REMOVE_PP_APPROVAL,
        payload: request
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
    (dispatch, getState) => {
        const groupId = getState().filter.groupId;
        dispatch(showMultiNotification(getNotifyItem('LoadingGroupAdminLeadership')));
        dispatch(getGroupAdminLeaderships(groupId));
        //dispatch(manageOrgnizationUsers()) 
    }
    ]
};

const manageOrgnizationUsers = () => {
    let params = { callTime: new Date() };
    const url = 'ViciAdmin/ManageOrganizationUsers';
    const request = postAxiosToMVCApp(url, { params: params });
    return [
        (dispatch, getState) => {
            const groupId = getState().filter.groupId;
            dispatch(showMultiNotification(getNotifyItem('LoadingGroupAdminLeadership')));
            dispatch(getGroupAdminLeaderships(groupId));
        }
    ]
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
            dispatch(manageOrgnizationUsers());
        },
    ]
};

export const onUpdateGroupLeadership = (groupId, leadershipType, userIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(updateGroupLeadership(groupId, leadershipType, userIds))
    }]
};

export const updateGroupLeadership = (groupId, leadershipType, userIds) => {
    let params = { groupId: groupId, leadershipType: leadershipType, userIds: userIds };
    const url = 'Groups/SaveLeadership';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_GROUP_LEADERSHIP,
        payload: request
    }, (dispatch, getState) => {
            dispatch(hideNotification2());
            dispatch(showMultiNotification(getNotifyItem('LoadingGroupAdminLeadership')));
            dispatch(getGroupAdminLeaderships(groupId));
        }
    ]
};
