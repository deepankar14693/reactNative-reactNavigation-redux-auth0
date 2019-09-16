
import axios from 'axios';
import AppConfig from '../appConfig';
import * as loghelper from '../common/loghelper';
import { getCurrentCulture, getExportDetailsFields, getMomentTimeStamp, getPersonnelCols, getLocalStorageKey, isEmpty2, getLastPageCookie } from '../common/utils';
import * as privateSettings from '../privateSettings';
import { IsUpdateDashboardData } from '../store/ideas2/updaters/pushEvents';
import * as actionType from './actionTypes';
import { getDashboardOtherData, getPlanningDashboard, getTrackingDashboard } from './dashboardActions';
//import { setupCache } from 'axios-cache-adapter'
import { hideNotification2, showNotification2, showMultiNotification, hideMultiNotification } from './notification';
import { sortUserNote } from './userNotesActions';
import { MajorMenu } from '../common/menuTypes';
import { getNotifyItem } from '../common/notifyConstants';
//import { getLocalStorageKey } from '../common/utils';

const isITCostingGroup = (masterData, groupId) => {
    if (Object.keys(masterData.groups).length > 0) {
        var groupInfo = masterData.groups[groupId];
        if (groupInfo) {
            return groupInfo.IsITCosting;
        } else {
            return false;
        }
    }
}

export const getIdeasOtherData = () => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_TIMESTAMPS',
        payload: request
    },
    (dispatch, getState) => {
        var timeStamps = getState().timeStamps;

        //dispatch(getMasterData(timeStamps));
        dispatch(getStarIdeas(timeStamps));
        //dispatch(getPermissionsMasterData(timeStamps));
        dispatch(getFunctionalTitles(timeStamps));
        //dispatch(getPersonnel(timeStamps));
        // //load task data
        // dispatch(getTaskCategoryData(timeStamps)).then(() => dispatch(getTaskData(timeStamps)));
        // //dispatch(getTaskData(timeStamps));
        // dispatch(getTaskAttachments(timeStamps));
    }]
};

export const showLoadingNotificationGroupChange = (groupId, view) => {
    return [{
        type: 'SHOW_LOADING_NOTIFICATION',
    },
    (dispatch, getState) => {
        dispatch(filterGroup(groupId, view))
    }]
};

export const showLoadingNotificationCompanyView = (view) => {
    return [{
        type: 'SHOW_LOADING_NOTIFICATION',
    },
    (dispatch, getState) => {
        dispatch(getIdeasCompanyView(view))
    }]
};

export const showPreparingNotificationCompanyView = (url) => {
    return [{
        type: 'SHOW_PREPARING_NOTIFICATION',
    },
    (dispatch, getState) => {
        dispatch(print(url))
    }]
};

export const showPreparingNotification = () => {
    return {
        type: 'SHOW_PREPARING_NOTIFICATION',
    }
};

export const hidePreparingNotification = () => {
    return {
        type: 'HIDE_PRINT_NOTIFICATION',
    }
};

export const updateView = (groupId) => {
    return {
        type: 'UPDATE_VIEW',
        payload: groupId
    }
};

export const getIdeas = (groupId, timeStamp, view) => {
    let params = { callTime: new Date(), view: view };
    let url = '';

    let timeStamps = window.parent.timeStamps ? window.parent.timeStamps : '';
    let userId = getLocalStorageKey('userId') ? getLocalStorageKey('userId').toLowerCase() : AppConfig.env('userId').toLowerCase();
    let permissionTimeStamp = getMomentTimeStamp(timeStamps.PermissionMaster);// ? moment(timeStamps.PermissionMaster).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    if (AppConfig.callGroupWiseData) {
        url = 'Ideas/GetIdeas/' + groupId + '-' + timeStamp + '-' + userId + '-' + permissionTimeStamp;
    } else {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);// ? moment(timeStamps.OrganizationIdeas).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

        url = 'Ideas/GetIdeas/' + organizationId + '-' + timeStamp + '-' + userId + '-' + permissionTimeStamp;;
    }

    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_IDEAS',
        payload: request
    },
    (dispatch, getState) => {
        dispatch(getIdeaEx2Data(groupId, timeStamp, view))
    }]
};

export const getLineItemMonthlyValue = (groupId, timeStamps) => {
    let params = { callTime: new Date() };
    const currentTimeStamp = getMomentTimeStamp(new Date());
    let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    let url = '';
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        let orgTimeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);
        url = 'LineItems/GetMonthlyValues/' + organizationId + '-' + orgTimeStamp;
    }
    else {
        const ideasTimeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
        url = 'LineItems/GetMonthlyValues/' + groupId + '-' + ideasTimeStamp;
    }
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_LINEITEM_MONTHLYVALUE',
        payload: request
    }
};

export const getArchivedIdeas = (groupId, view, ideaView) => {
    let params = { callTime: new Date(), view: view };
    let url = '';
    if (ideaView !== "CompanyView") {
        url = 'Ideas/GetArchivedIdeas/' + groupId;
    } else {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        url = 'Ideas/GetArchivedIdeas/' + organizationId;
    }

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_ARCHIVED_IDEAS',
        payload: request
    }
};

export const getSharedAndTransferedIdeas = (groupId, view, ideaView) => {
    let params = { callTime: new Date(), view: view };
    let url = '';
    if (ideaView !== "CompanyView") {
        url = 'Ideas/GetTransferIdeas/' + groupId;
    } else {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        url = 'Ideas/GetTransferIdeas/' + organizationId;
    }

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_SHAREDANDTRANSFERED_IDEAS',
        payload: request
    }
};

export const restoreSortingOnModalChange = (view) => {
    return {
        type: 'RESTORE_SORTING_ON_MODAL_OPEN_CLOSE',
        payload: view
    }
};



export const getIdeaEx2Data = (groupId, timeStamp, view) => {
    let params = { callTime: new Date(), view: view };

    const url = 'Ideas/IdeaDataEx2/' + groupId + '-' + timeStamp;

    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_IDEAEX2_DATA',
        payload: request
    },
    (dispatch, getState) => {
        dispatch(ideaStatesSetOnSelectePage(view))
    }]
};

export const getIdeasCompanyView = (view) => {
    let params = { callTime: new Date(), view: view };
    let timeStamps = window.parent.timeStamps ? window.parent.timeStamps : '';

    let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
    let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);// ? moment(timeStamps.OrganizationIdeas).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    let userId = getLocalStorageKey('userId') ? getLocalStorageKey('userId').toLowerCase() : AppConfig.env('userId').toLowerCase();
    let permissionTimeStamp = getMomentTimeStamp(timeStamps.PermissionMaster);// ? moment(timeStamps.PermissionMaster).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    const url = 'Ideas/GetIdeas/' + organizationId + '-' + timeStamp + '-' + userId + '-' + permissionTimeStamp;;

    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_IDEAS',
        payload: request
    },
    (dispatch, getState) => {
        dispatch(getIdeaEx2Data(organizationId, timeStamp, view))
    }]
};

export const print = (url) => {
    if (window.parent.printReport) {
        window.parent.printReport(AppConfig.baseUrl + url);
    }
    return {
        type: 'PRINT_REPORT',
    }
}

export const getIdeaDetails = (ideaId, specialEventTimeStamp) => {
    let params = { callTime: new Date() };
    let timeStamp = getMomentTimeStamp(specialEventTimeStamp);//? moment(specialEventTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    const url = 'Ideas/GetIdeaDetails/' + ideaId + '-' + timeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_IDEA_DETAILS',
        payload: request
    }
};

export const getSpecialEventData = (ideaId, specialEventTimeStamp) => {
    let params = { callTime: new Date() };
    let timeStamp = getMomentTimeStamp(specialEventTimeStamp);//? moment(specialEventTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    const url = 'CachedData/SpecialEventData/' + ideaId + '-' + timeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_SPECIAL_EVENTS',
        payload: request
    }
};

export const getIdeaTextData = (ideaId, specialEventTimeStamp) => {
    let params = { callTime: new Date() };
    let timeStamp = getMomentTimeStamp(specialEventTimeStamp);// ? moment(specialEventTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    const url = 'Ideas/IdeaTextData/' + ideaId + '-' + timeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_IDEATEXTDATA',
        payload: request
    }
};

export const getIdeasTextData = (ideaIds) => {
    let params = { ids: ideaIds };
    const url = 'Ideas/IdeasTextData';
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_IDEASTEXTDATA',
        payload: request
    }
};
export const getIdeaGroupScratchpad = (ideaGroupId, specialEventTimeStamp) => {
    let params = { callTime: new Date() };
    let timeStamp = getMomentTimeStamp(specialEventTimeStamp);// ? moment(specialEventTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    const url = 'IdeaGroups/GetScratchpad/' + ideaGroupId + '-' + timeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_IDEAGROUP_SCRATCHPAD',
        payload: request
    }
};

export const getIdeaAttachments = (ideaId, specialEventTimeStamp) => {
    let params = { callTime: new Date() };
    let timeStamp = getMomentTimeStamp(specialEventTimeStamp);// ? moment(specialEventTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');

    const url = 'Ideas/IdeaAttachments/' + ideaId + '-' + timeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_IDEAATTACHMENT',
        payload: request
    }
};

export const getStarIdeas = (timeStamps, projectId) => {
    let userPreferenceTimeStamp = getMomentTimeStamp(timeStamps.UserPreference);// ? moment(timeStamps.UserPreference).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    let params = { callTime: new Date() };
    //let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    const url = 'Ideas/getStarIdeas/' + projectId + '-' + userPreferenceTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_STAR_IDEAS',
        payload: request
    }
};

export const getPersonnel = (timeStamps, projectId) => {
    let params = { callTime: new Date() };
    let personnelTimeStamp = getMomentTimeStamp(timeStamps.Personnel);// ? moment(timeStamps.Personnel).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    //let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    const url = 'Baseline/GetPersonnel/' + projectId + '-' + personnelTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_PERSONNEL',
        payload: request
    }
};

export const getFunctionalTitles = (timeStamps, projectId) => {
    let ftTimeStamp = getMomentTimeStamp(timeStamps.FunctionalTitles);// ? moment(timeStamps.FunctionalTitles).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    let params = { callTime: new Date() };
    //let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    const url = 'CachedData/FunctionalTitles/' + projectId + '-' + ftTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_FUNCTIONALTITLES',
        payload: request
    }
};

export const onCreateIdea = (ideaId, description, scratchpad, focusAreaId, roughValue, roughRisk, groupId, view, glRisk, title) => {
    let params = {
        ideaId: ideaId,
        description: description, scratchpad: scratchpad, focusAreaId: focusAreaId.FocusAreaId, roughValue: roughValue, roughRiskRatingType: roughRisk.RiskTypeId, groupId: groupId,
        view: view, glRiskRatingType: glRisk ? glRisk.RiskTypeId : null, title
    };
    const url = 'Ideas/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA',
        payload: request
    }
};

const getActiveTabMinorMenu = (activeTabName) => {
    let dashboardPhase = 1;
    if (activeTabName === 'planning/dashboard' || activeTabName === 'planning') {
        dashboardPhase = 4;
    }
    if (activeTabName === 'tracking/dashboard' || activeTabName === 'tracking') {
        dashboardPhase = 5;
    }
    return dashboardPhase;
}

export const pushEventData = (eventData) => {
    return [
        (dispatch, getState) => {
            const selectedProjectId = getState().ideaGroupFilter.projectId;
            const selectedGroupId = getState().ideaGroupFilter.groupId;
            let refreshData = false;
            const activeTabName = getLocalStorageKey('ActiveTabName');
            const selectedPhase = getActiveTabMinorMenu(activeTabName);

            if ((selectedPhase === 4 || selectedPhase === 5)) {
                refreshData = IsUpdateDashboardData(eventData, selectedGroupId, selectedPhase, selectedProjectId);
            }
            dispatch(pushEventData2(eventData, selectedGroupId, refreshData, selectedPhase));
        }]
};

export const pushEventData2 = (eventData, selectedGroupId, refreshData, selectedPhase) => {
    return [{
        type: 'PUSH_DATA',
        payload: eventData
    },
    (dispatch) => {
        if (refreshData) {
            if (selectedPhase === 4) {
                dispatch(getPlanningDashboard(selectedGroupId))
            } else if (selectedPhase === 5) {
                dispatch(getTrackingDashboard(selectedGroupId))
            }
        }
    }]
};

export const pushOpenIdeas = (eventData) => {
    return {
        type: 'PUSH_OPEN_IDEAS',
        payload: eventData
    }
};

export const createEmptyIdea = (groupId, view) => {
    return {
        type: 'CREATE_EMPTY_IDEA',
        groupId: groupId,
        view: view
    }
}

export const removeEmptyIdea = () => {
    return {
        type: 'REMOVE_EMPTY_IDEA'
    }
}

export const resetPaging = (view) => {
    return [{
        type: 'RESET_PAGING',
        view: view
    },
    (dispatch, getState) => {
        dispatch(ideaStatesSetOnSelectePage(view))
    }]
}




export const onCreateLinkedGroup = (ideaId, groupId, roughValue, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, roughValue: roughValue, notes: notes, scratchpad: '' };
    const url = 'IdeaGroups/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_LINKEDGROUP',
        payload: request
    }
};

export const onCreateITLinkedGroup = (ideaId, groupId, roughValue, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, roughValue: roughValue, notes: notes, scratchpad: '' };
    const url = 'IdeaGroups/CreateITLinkedGroup';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_ITLINKEDGROUP',
        payload: request
    }
};

export const onCreateLinkedGroupWithDocument = (groupId, roughValue, notes, attachmentId, files, entityId, entityType, category, description) => {
    let data = new FormData();

    data.append('groupId', groupId);
    data.append('roughValue', roughValue);
    data.append('notes', notes);
    data.append('scratchpad', '');

    data.append('attachmentId', attachmentId);
    data.append('file', files[0]);
    data.append('name', files[0].name);
    data.append('entityId', entityId);
    data.append('entityType', entityType);
    data.append('category', category);
    data.append('description', description);

    const url = 'IdeaGroups/CreateWithDocument';

    const request = postAxios(url, { params: data });
    return {
        type: 'CREATE_LINKEDGROUP',
        payload: request
    }
};

export const onAddITCostingGroup = (ideaId, roughValue, notes) => {
    let params = { IdeaId: ideaId, ITRoughValue: roughValue, ITNotes: notes, ITStatus: 1 };
    const url = 'Ideas/AddITCosting';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_ITCOSTINGGROUP',
        payload: request
    }
};

export const onAddITCostingGroupWithDocument = (roughValue, notes, attachmentId, files, entityId, entityType, category, description) => {
    let data = new FormData();

    data.append('itStatus', 1);
    data.append('roughValue', roughValue);
    data.append('notes', notes);

    data.append('attachmentId', attachmentId);
    data.append('file', files[0]);
    data.append('name', files[0].name);
    data.append('entityId', entityId);
    data.append('entityType', entityType);
    data.append('category', category);
    data.append('description', description);

    const url = 'Ideas/AddITCostingWithDocument';
    const request = postAxios(url, { params: data });
    return {
        type: 'CREATE_ITCOSTINGGROUP',
        payload: request
    }
};

export const onRemoveITCosting = (ideaId) => {
    let params = { ideaId: ideaId };
    const url = 'Ideas/RemoveITCosting';
    const request = postAxios(url, { params: params });
    return {
        type: 'REMOVE_ITCOSTINGGROUP',
        payload: request
    }
};

export const onUpdateIdea = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onUpdateIdeaGroupImplementationStatus = (ideaGroupId, fieldName, fieldValue) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue };
    var url = 'IdeaGroups/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onImplementationStatusOverride = (ideaGroupId, fieldName, fieldValue) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue };
    var url = 'IdeaGroups/ImplementationStatusOverridden';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onImplementationStatusOverrideRemoved = (ideaGroupId, fieldName, fieldValue) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'IdeaGroups/ImplementationStatusOverrideRemoved';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP',
        payload: request
    }
};


export const onUpdateIdeaImplementationStatus = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    var url = 'Ideas/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onIdeaImplementationStatusOverride = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    var url = 'Ideas/ImplementationStatusOverridden';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onIdeaImplementationStatusOverrideRemoved = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/ImplementationStatusOverrideRemoved';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onUpdateIdeaGroupPlanLock = (ideaId, fieldName, fieldValue) => {
    let params = { ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    var url = 'IdeaGroups/LockPlan';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onSendIdeaNotification = (ideaId, fieldName, fieldValue, notes, ITRoughValue) => {
    let params = { entityId: ideaId, Status: fieldValue, Notes: notes, ITRoughValue: ITRoughValue };
    const url = 'Ideas/UpdateITStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_ITSTATUS',
        payload: request
    }
};



export const onAddIdeaLeaders = (ideaId, ideaLeaderIDs) => {
    let params = { IdeaId: ideaId, IdeaLeaderIDs: ideaLeaderIDs, fieldName: 'IdeaLeaderIDs', entityId: ideaId };
    const url = 'Ideas/CreateMultipleIdeaLeaders';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};


export const onAddIdeaICs = (ideaId, ideaICIDs) => {
    let params = { IdeaId: ideaId, IdeaLeaderIDs: ideaICIDs, fieldName: 'IdeaICIDs', entityId: ideaId };
    const url = 'Ideas/CreateMultipleIdeaICs';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const updateExpectedImpacts = (ideaId, expectedPEImpacts, expectedNPEImpacts, expectedRevenueImpacts, mayRequireLinkedGroups) => {
    let params = {
        IdeaId: ideaId,
        ExpectedNPEImpacts: expectedNPEImpacts,
        ExpectedPEImpacts: expectedPEImpacts,
        ExpectedRevenueImpacts: expectedRevenueImpacts,
        MayRequireLinkedGroups: mayRequireLinkedGroups
    };

    const url = 'Ideas/UpdateExpectedImpacts';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_EXPECTED_IMPACTS',
        payload: request
    }
};

export const onChangeSCMReviewNotRequired = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/ChangeSCMReviewNotRequired';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onStarIdea = (ideaId) => {
    let params = { ideaId: ideaId, fieldName: 'Star_Idea', fieldValue: true };
    const url = 'Ideas/Star';
    const request = postAxios(url, { params: params });
    return {
        type: 'STAR_UNSTAR_IDEA',
        payload: request
    }
};

export const onUnStarIdea = (ideaId) => {
    let params = { ideaId: ideaId, fieldName: 'Unstar_Idea', fieldValue: false };
    const url = 'Ideas/Unstar';
    const request = postAxios(url, { params: params });
    return {
        type: 'STAR_UNSTAR_IDEA',
        payload: request
    }
};


export const onChangeRoughRiskRatingType = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };

    const url = 'Ideas/ChangeRoughRiskRatingType';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onChangeRoughValue = (ideaGroupId, fieldName, fieldValue, isCurrentGroup, ideaId) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue, isCurrentGroup: isCurrentGroup, ideaId: ideaId };
    const url = 'IdeaGroups/ChangeRoughValue';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onChangeITRoughValue = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/ChangeITRoughValue';

    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onSetValueStatus = (ideaGroupId, fieldName, fieldValue, isIT, isCurrentGroup, ideaId) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue, isCurrentGroup: isCurrentGroup, ideaId: ideaId };
    let url;
    if (isIT) {
        url = 'Ideas/SetITValueStatus';
    } else {
        url = 'IdeaGroups/SetValueStatus';
    }
    const request = postAxios(url, { params: params });
    return {
        type: isIT ? 'UPDATE_IDEA' : 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onRemoveValueStatus = (ideaGroupId, fieldName, fieldValue, isIT, isCurrentGroup, ideaId) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue, isCurrentGroup: isCurrentGroup, ideaId: ideaId };
    let url;
    if (isIT) {
        url = 'Ideas/RemoveITValueStatus';
    } else {
        url = 'IdeaGroups/RemoveValueStatus';
    }
    const request = postAxios(url, { params: params });
    return {
        type: isIT ? 'UPDATE_IDEA' : 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onUpdateIdeaTexts = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };

    const url = 'Ideas/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEATEXTS',
        payload: request
    }
};

export const getIdeaHistory = (ideaNumber) => {
    let params = { callTime: new Date() };
    const url = 'EventStore/GetIdeaHistory/' + ideaNumber + '?d=' + new Date().getTime();;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_IDEA_HISTORY',
        payload: request
    }
};

export const clearIdeaHistory = () => {
    return {
        type: 'CLEAR_IDEA_HISTORY'
    }
};

export const onUpdateIdeaGroup = (ideaId, ideaGroupId, isPrimary, fieldName, fieldValue, isCurrentGroup) => {
    let params = { entityId: ideaGroupId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue, isPrimary: isPrimary, isCurrentGroup: isCurrentGroup };
    const url = 'IdeaGroups/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP',
        payload: request
    }
};

export const onSendIdeaGroupNotification = (ideaId, ideaGroupId, isPrimary, fieldName, fieldValue, isCurrentGroup, notes, roughValue) => {
    let params = { entityId: ideaGroupId, Status: fieldValue, Notes: notes, RoughValue: roughValue };
    const url = 'IdeaGroups/UpdateLinkedGroupStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_LINKEDGROUPSTATUS',
        payload: request
    }
};

export const onUpdateIdeaGroupScratchpad = (ideaGroupId, ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaGroupId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };

    const url = 'IdeaGroups/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_SCRATCHPAD',
        payload: request
    }
};

export const onRequestArchive = (ideaId, isArchivePending, ArchiveRequestNote, fieldName) => {
    let params = { ideaId: ideaId, isArchivePending: isArchivePending, ArchiveRequestNote: ArchiveRequestNote, fieldName: fieldName };

    const url = 'Ideas/RequestArchive';
    const request = postAxios(url, { params: params });
    return {
        type: 'REQUEST_ARCHIVE_IDEA',
        payload: request
    }
};

export const onAddRiskRating = (riskRater, riskRatingType) => {
    //(riskRatingId, ideaId, groupId, roleType, riskRatingType)
    let params = { ideaId: riskRater.IdeaId, groupId: riskRater.GroupId, roleType: riskRater.RoleType, userId: riskRater.UserId, riskRatingType: riskRatingType };
    const url = 'RiskRatings/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_RISKRATING',
        payload: request
    }
};

export const onAddRiskRaters = (ideaId, riskRaters, isSecondaryRating) => {
    //(riskRatingId, ideaId, groupId, roleType, riskRatingType)
    //var riskRaters = [{ userId: AppConfig.userId, roleType: 1 }, { userId: AppConfig.userId, roleType: 2 }];
    //let params = { 'riskRaters': riskRaters};
    let params = { ideaId: ideaId, riskRaters: { 'riskRaterList': riskRaters }, isSecondaryRating: isSecondaryRating };
    const url = 'RiskRatings/CreateMultiple';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_RISKRATERS',
        payload: request
    }
};

export const onUpdateRiskRating = (entityId, ideaId, fieldName, fieldValue, roleType, isPrimaryGL) => {
    let params = { entityId: entityId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue, roleType: roleType, isPrimaryGL: isPrimaryGL };
    //let params = { riskRatingId: riskRatingId, riskRatingType: riskRatingType };

    const url = 'RiskRatings/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_RISKRATING',
        payload: request
    }
};

export const onChangeRiskStatus = (entityId, fieldName, fieldValue) => {
    let params = { entityId: entityId, fieldName: fieldName, fieldValue: fieldValue };

    const url = 'Ideas/ChangeRiskStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA',
        payload: request
    }
};

export const onAddPersonnelLineItemImpl = (lineItem, ideaGroupId, isCurrentGroup) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Creating line item...'))
    }, (dispatch, getState) => {
        dispatch(onAddPersonnelLineItem(lineItem, ideaGroupId, isCurrentGroup))
    }]
};

export const onAddPersonnelLineItem = (lineItem, ideaGroupId, isCurrentGroup) => {
    let params = {
        ideaGroupId: ideaGroupId,
        ideaId: lineItem.IdeaId, groupId: lineItem.GroupId, isIT: lineItem.IsIT,
        directionType: lineItem.DirectionType, functionalTitleId: lineItem.FunctionalTitleId,
        personnelCount: lineItem.PersonnelCount, salaryRange: lineItem.SalaryRange,
        averageSalary: lineItem.AverageSalary, timing: lineItem.Timing,
        isCurrentGroup: isCurrentGroup,
        IsImplementation: Object.keys(lineItem).indexOf('IsImplementation') > -1 ? lineItem.IsImplementation : false
    };
    const url = 'PersonnelLineItems/Create';
    const request = postAxios(url, { params: params });
    return {
        type: !params.IsImplementation ? 'CREATE_PERSONNEL_LINEITEM' : 'CREATE_PERSONNEL_LINEITEM_IMPLEMENTATION',
        payload: request
    }
};

export const onAddLineItemValueRamp = (entityId, rampType, rampMonths, rampvalues, lineItemType) => {
    let params = {
        LineItemId: entityId,
        RampType: rampType,
        RampMonths: rampMonths,
        RampValues: rampvalues
    };
    var url = '';
    switch (lineItemType) {
        case 'npeplan': url = 'NonPersonnelLineItems/UpdatePlanRampValues'; break;
        case 'npeactual': url = 'NonPersonnelLineItems/UpdateActualRampValues'; break;
        case 'revenueplan': url = 'RevenueLineItems/UpdatePlanRampValues'; break;
        case 'revenueactual': url = 'RevenueLineItems/UpdateActualRampValues'; break;
        default: url = (lineItemType === 'npe') ? 'NonPersonnelLineItems/UpdateRampValues' : 'RevenueLineItems/UpdateRampValues';
            break;
    }

    const request = postAxios(url, { params: params });
    return {
        type: 'ADD_LINEITEM_VALUE_RAMP',
        payload: request
    }
};

export const onUpdatePersonnelLineItem = (entityId, ideaGroupId, ideaId, groupId, fieldName, fieldValue, isITLineItem, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue,
        isITLineItem: isITLineItem, isCurrentGroup: isCurrentGroup
    };
    const url = 'PersonnelLineItems/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_PERSONNEL_LINEITEM',
        payload: request
    }
};


export const arrangeLineItems = (lineItemIDs, lineItemType, isIT) => {
    let params = { lineItemIDs: lineItemIDs, lineItemType: lineItemType };
    let url;
    if (lineItemType === 'personnel') {
        if (isIT) {
            url = 'PersonnelLineItems/RearrangeITLineItems';
        } else {
            url = 'PersonnelLineItems/RearrangeLineItems';
        }
    } else if (lineItemType === 'nonPersonnel') {
        if (isIT) {
            url = 'NonPersonnelLineItems/RearrangeITLineItems';
        } else {
            url = 'NonPersonnelLineItems/RearrangeLineItems';
        }
    } else {
        url = 'RevenueLineItems/RearrangeLineItems';
    }
    const request = postAxios(url, { params: params });
    return {
        type: 'ARRANGE_LINEITEMS',
        payload: request
    }
}

export const arrangeImplLineItems = (lineItemIDs, lineItemType, isIT) => {
    let params = { lineItemIDs: lineItemIDs, lineItemType: lineItemType };
    let url;
    if (lineItemType === 'personnel') {
        if (isIT) {
            url = 'PersonnelLineItems/RearrangeImplementationITLineItems';
        } else {
            url = 'PersonnelLineItems/RearrangeImplementationLineItems';
        }
    } else if (lineItemType === 'nonPersonnel') {
        if (isIT) {
            url = 'NonPersonnelLineItems/RearrangeImplementationITLineItems';
        } else {
            url = 'NonPersonnelLineItems/RearrangeImplementationLineItems';
        }
    } else {
        url = 'RevenueLineItems/RearrangeImplementationLineItems';
    }
    const request = postAxios(url, { params: params });
    return {
        type: 'ARRANGE_IMPLEMENTATION_LINEITEMS',
        payload: request
    }
}

export const onAddNonPersonnelLineItemImpl = (lineItem, ideaGroupId, isCurrentGroup) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Creating line item...'))
    }, (dispatch, getState) => {
        dispatch(onAddNonPersonnelLineItem(lineItem, ideaGroupId, isCurrentGroup))
    }]
};

export const onAddNonPersonnelLineItem = (lineItem, ideaGroupId, isCurrentGroup) => {
    let params = {
        ideaGroupId: ideaGroupId,
        ideaId: lineItem.IdeaId, groupId: lineItem.GroupId, isIT: lineItem.IsIT,
        directionType: lineItem.DirectionType, category: lineItem.Category, isRecurring: lineItem.IsRecurring,
        amount: lineItem.Amount, AmortizationPeriod: lineItem.AmortizationPeriod,
        timing: lineItem.Timing,
        isCurrentGroup: isCurrentGroup,
        IsImplementation: Object.keys(lineItem).indexOf('IsImplementation') > -1 ? lineItem.IsImplementation : false
    };
    const url = 'NonPersonnelLineItems/Create';
    const request = postAxios(url, { params: params });
    return {
        type: !params.IsImplementation ? 'CREATE_NONPERSONNEL_LINEITEM' : 'CREATE_NONPERSONNEL_LINEITEM_IMPLEMENTATION',
        payload: request
    }
};

export const onUpdateNonPersonnelLineItem = (entityId, ideaGroupId, ideaId, groupId, fieldName, fieldValue, isITLineItem, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue,
        isITLineItem: isITLineItem, isCurrentGroup: isCurrentGroup
    };
    const url = 'NonPersonnelLineItems/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_NONPERSONNEL_LINEITEM',
        payload: request
    }
};

export const onAddRevenueLineItemImpl = (lineItem, ideaGroupId, isCurrentGroup) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Creating line item...'))
    }, (dispatch, getState) => {
        dispatch(onAddRevenueLineItem(lineItem, ideaGroupId, isCurrentGroup))
    }]
};

export const onAddRevenueLineItem = (lineItem, ideaGroupId, isCurrentGroup) => {
    let params = {
        ideaGroupId: ideaGroupId,
        ideaId: lineItem.IdeaId, groupId: lineItem.GroupId,
        directionType: lineItem.DirectionType, category: lineItem.Category, isRecurring: lineItem.IsRecurring,
        revenueChange: lineItem.RevenueChange, marginChange: lineItem.MarginChange, AmortizationPeriod: lineItem.AmortizationPeriod,
        timing: lineItem.Timing, isCurrentGroup: isCurrentGroup,
        IsImplementation: Object.keys(lineItem).indexOf('IsImplementation') > -1 ? lineItem.IsImplementation : false
    };
    const url = 'RevenueLineItems/Create';
    const request = postAxios(url, { params: params });
    return {
        type: !params.IsImplementation ? 'CREATE_REVENUE_LINEITEM' : 'CREATE_REVENUE_LINEITEM_IMPLEMENTATION',
        payload: request
    }
};

export const onUpdateRevenueLineItem = (entityId, ideaGroupId, ideaId, groupId, fieldName, fieldValue, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName,
        fieldValue: fieldValue, isCurrentGroup: isCurrentGroup
    };
    const url = 'RevenueLineItems/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_REVENUE_LINEITEM',
        payload: request
    }
};

export const onUpdatePESalaryRange = (entityId, ideaGroupId, ideaId, groupId, fieldName, salaryRange, averageSalary, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, salaryRange: salaryRange,
        averageSalary: averageSalary, isCurrentGroup: isCurrentGroup
    };

    const url = 'PersonnelLineItems/ChangeSalaryRange';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_PERSONNEL_LINEITEM',
        payload: request
    }
};

export const onUpdateNPEIsRecurring = (entityId, ideaGroupId, ideaId, groupId, fieldName, isRecurring, amortizationPeriod, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, isRecurring: isRecurring,
        amortizationPeriod: amortizationPeriod, isCurrentGroup: isCurrentGroup
    };

    const url = 'NonPersonnelLineItems/ChangeIsRecurring';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_NONPERSONNEL_LINEITEM',
        payload: request
    }
};

export const onUpdateRevenueIsRecurring = (entityId, ideaGroupId, ideaId, groupId, fieldName, isRecurring, amortizationPeriod, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, isRecurring: isRecurring,
        amortizationPeriod: amortizationPeriod, isCurrentGroup: isCurrentGroup
    };

    const url = 'RevenueLineItems/ChangeIsRecurring';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_REVENUE_LINEITEM',
        payload: request
    }
};

export const onCreateIdeaCustomField = (ideaId, fieldType, fieldNumber, fieldName, fieldValue, ideaFieldName, ideaFieldLabel) => {
    if (fieldType === 1 || (fieldType === 3 && fieldValue === ' ')) fieldValue = fieldValue ? fieldValue.trim() : '';
    let params = { ideaId: ideaId, fieldType: fieldType, fieldNumber: fieldNumber, fieldName: fieldName, fieldValue: fieldValue, ideaFieldName: ideaFieldName, ideaFieldLabel: ideaFieldLabel };
    const url = 'IdeaCustomField/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEACUSTOMFIELD',
        payload: request
    }
};

export const onUpdateIdeaCustomField = (ideaId, fieldType, fieldNumber, fieldName, fieldValue, ideaFieldName, ideaFieldLabel) => {
    if (fieldType === 1 || (fieldType === 3 && fieldValue === ' ')) fieldValue = fieldValue ? fieldValue.trim() : '';
    let params = { ideaId: ideaId, fieldType: fieldType, fieldNumber: fieldNumber, fieldName: fieldName, fieldValue: fieldValue, ideaFieldName: ideaFieldName, ideaFieldLabel: ideaFieldLabel };
    const url = 'IdeaCustomField/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEACUSTOMFIELD',
        payload: request
    }
};

export const onUpdateIdeaGroupCustomField = (ideaId, fieldType, fieldNumber, fieldName, fieldValue, ideaFieldName, ideaFieldLabel, currentGroupId) => {
    if (fieldType === 1 || (fieldType === 3 && fieldValue === ' ')) fieldValue = fieldValue ? fieldValue.trim() : '';
    let params = { ideaId: ideaId, groupId: currentGroupId, fieldType: fieldType, fieldNumber: fieldNumber, fieldName: fieldName, fieldValue: fieldValue, ideaFieldName: ideaFieldName, ideaFieldLabel: ideaFieldLabel };
    const url = 'IdeaGroups/UpdateCustomField';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_CUSTOMFIELD',
        payload: request
    }
};



export const onAddIdeaSCDecision = (ideaId, decisionType, notes, userId) => {
    let params = { ideaId: ideaId, decisionType: decisionType, notes: notes, userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId') };
    const url = 'SCDecisions/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA_SCDECISION',
        payload: request
    }
};

export const onUpdateIdeaSCDecision = (entityId, ideaId, fieldName, fieldValue) => {
    let params = { entityId: entityId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'SCDecisions/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_SCDECISION',
        payload: request
    }
};

export const onAddIdeaRecommendation = (ideaId, groupId, roleType, userId, recommendationType, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, roleType: roleType, userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId'), recommendationType: recommendationType, notes: notes };
    const url = 'Recommendations/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA_RECOMMENDATION',
        payload: request
    }
};

export const onUpdateIdeaRecommendation = (entityId, ideaId, groupId, fieldName, fieldValue) => {
    let params = { entityId: entityId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Recommendations/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_RECOMMENDATION',
        payload: request
    }
};

export const onAddIdeaSCMReview = (ideaId, groupId, userId, isReviewed, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, notes: notes, userId: userId ? userId : null, isReviewed: isReviewed };
    const url = 'SCMReviews/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA_SCMREVIEW',
        payload: request
    }
};

export const onUpdateIdeaSCMReview = (entityId, ideaId, groupId, fieldName, fieldValue, SCMReviewId) => {
    let params = { entityId: entityId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'SCMReviews/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_SCMREVIEW',
        payload: request
    }
};

export const changeSCMReviewNotRequired = (entityId, ideaId, groupId, fieldName, fieldValue, SCMReviewId) => {
    let params = { entityId: entityId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue, SCMReviewId: SCMReviewId };
    const url = 'IdeaGroups/ChangeSCMReviewNotRequired';
    const request = postAxios(url, { params: params });
    return {
        type: 'CHANGE_SCMREVIEWNOTREQUIRED',
        payload: request
    }
};


export const onUploadAttachment = (attachmentId, files, entityId, entityType, category, description) => {
    let data = new FormData();
    data.append('attachmentId', attachmentId);
    data.append('file', files[0]);
    data.append('name', files[0].name);
    data.append('entityId', entityId);
    data.append('entityType', entityType);
    data.append('category', category);
    data.append('description', description);

    const url = 'Attachments/Upload';

    const request = postAxios(url, { params: data });
    return {
        type: (attachmentId === '' ? 'UPLOAD_ATTACHMENT' : 'REPLACE_ATTACHMENT'),
        payload: request
    }
};

export const onUploadSCRReport = (attachmentId, files, entityId, groupId, scrNumber) => {
    let data = new FormData();
    data.append('attachmentId', isEmpty2(attachmentId) ? '' : attachmentId);
    data.append('file', files[0]);
    data.append('name', files[0].name);
    data.append('entityId', isEmpty2(entityId) ? '' : entityId);
    data.append('entityType', '202');
    data.append('groupId', groupId);
    data.append('scrNumber', scrNumber);

    const url = 'GroupAdmin/SCRReportUpload';

    const request = postAxios(url, { params: data });
    return {
        //type: (attachmentId === '' ? actionType.UPLOAD_SCR_REPORT : actionType.REPLACE_SCR_REPORT),
        type: actionType.UPLOAD_SCR_REPORT,
        payload: request
    }
};

export const onDeleteAttachment = (attachmentId) => {
    var params = { attachmentId: attachmentId, entityType: 101 }
    const url = 'Attachments/Delete';
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_ATTACHMENT',
        payload: request
    }
};


export const onDeleteLinkedGroup = (ideaGroupId, ideaId, groupId) => {
    var params = { IdeaGroupId: ideaGroupId, IdeaId: ideaId, GroupId: groupId }
    const url = 'IdeaGroups/Delete/' + ideaGroupId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_IDEAGROUP',
        payload: request
    }
};

export const onDeleteAcceptedLinkedGroup = (ideaGroupId, ideaId, groupId) => {
    var params = { IdeaGroupId: ideaGroupId, IdeaId: ideaId, GroupId: groupId }
    const url = 'IdeaGroups/Delete/' + ideaGroupId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_ACCEPTED_IDEAGROUP',
        payload: request
    }
};



export const onDeletePersonnelLineItem = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'PersonnelLineItems/Delete/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_PERSONNEL_LINEITEM',
        payload: request
    }
};

export const onDeleteNonPersonnelLineItem = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'NonPersonnelLineItems/Delete/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_NONPERSONNEL_LINEITEM',
        payload: request
    }
};



export const onDeleteRevenueLineItem = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'RevenueLineItems/Delete/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_REVENUE_LINEITEM',
        payload: request
    }
};

export const onCopyPersonnelLineItem = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'PersonnelLineItems/Copy/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_PERSONNEL_LINEITEM',
        payload: request
    }
};

export const onCopyNonPersonnelLineItem = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'NonPersonnelLineItems/Copy/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_NONPERSONNEL_LINEITEM',
        payload: request
    }
};



export const onCopyRevenueLineItem = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'RevenueLineItems/Copy/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_REVENUE_LINEITEM',
        payload: request
    }
};

export const onDownloadAttachment = (attachmentId) => {
    var params = { attachmentId: attachmentId }
    const url = 'Attachments/Download';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_ATTACHMENT',
        payload: request
    }
};

export const onExportToExcel = (controller, exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields()
    var name = window.parent.name;
    var params = { exportData: exportedData, exportedFields: exportedFields, exportType: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName }
    var url = controller + '/Export';
    if (controller === 'LineItems') { url = 'Ideas/LineItemExport'; }
    // var params = { exportData: exportData, exportedFields: exportedFields, exportType: exportType }
    const request = postAxios(url, { params: params });
    return {
        type: 'EXPORT_EXCEL',
        payload: request
    }
};
export const onExportComprehensiveExcel = (groupId, exportTypes, exportName, isDetailed) => {
    var params = { groupId: groupId, ExportTypes: exportTypes, exportName: exportName, language: getCurrentCulture(), isDetailed: isDetailed };
    var url = 'Reports/ComprehensiveExcelExport';
    const request = postAxios(url, { params: params });
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('ComprehensiveExport')));
    },
    {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }, (dispatch, getState) => {
        dispatch(hideMultiNotification('ComprehensiveExport'))
    }]
}
export const onExportMilestones = (groupId, exportTypes, exportName, isDetailed) => {
    var params = { groupId: groupId, ExportTypes: exportTypes, exportName: exportName, language: getCurrentCulture(), isDetailed: isDetailed };
    var url = 'Reports/MilestoneExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
}
export const onExportMetrics = (groupId, exportTypes, exportName, isDetailed) => {
    var params = { groupId: groupId, ExportTypes: exportTypes, exportName: exportName, language: getCurrentCulture(), isDetailed: isDetailed };
    var url = 'Reports/MetricsExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
}
export const onUpdateHighlights = (ideaIDs, groupId, isHighlighted) => {
    let params = {
        IdeaIDs: ideaIDs,
        GroupId: groupId,
        HighlightFlag: isHighlighted
    }
    const url = 'IdeaGroups/UpdateHighlights';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_HIGHLIGHTS',
        payload: request
    }
};


export const onBulkIdeaStatusUpdate = (ideaIDs, status) => {
    let params = { entityIds: ideaIDs, fieldName: 'Status', fieldValue: status }
    const url = 'Ideas/BulkUpdate';
    const request = postAxios(url, { params: params });
    return {
        type: 'BULK_UPDATE',
        payload: request
    }
};

export const onBulkIdeaTransfer = (ideaIDs, status, groupId) => {
    let params = { IdeaIds: ideaIDs, GroupId: groupId, Status: status }
    const url = 'Ideas/ChangeTransferIdeasStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'BULK_TRANSFER',
        payload: request
    }
};


export const onBulkLinkedGroupStatusUpdate = (ideaIDs, status, currentGroup) => {
    let params = {
        entityIDs: [currentGroup],
        ideaIDs: ideaIDs,
        fieldName: 'LinkedGroupStatus',
        fieldValue: status,
    }
    const url = 'IdeaGroups/BulkUpdate';
    const request = postAxios(url, { params: params });
    return {
        type: 'BULK_UPDATE_IDEAGROUPS',
        payload: request
    }
};



export const onBulkIdeaArchive = (ideaIDs, status, requestNote) => {
    let params = { ideaIDs: ideaIDs, isArchivePending: 1, ArchiveRequestNote: requestNote, fieldName: 'ArchiveRequestNote' };
    const url = 'Ideas/BulkRequestArchive';
    const request = postAxios(url, { params: params });
    return {
        type: 'REQUEST_BULK_ARCHIVE_IDEA',
        payload: request
    }
};

export const onShareIdeas = (originalGroupId, newGroupIds, originalIdeaIds, note) => {
    //let params = { sharedIdeas: sharedIdeas, requestNote: requestNote, OriginalGroupId: originalGroupId };
    let params = {
        OriginalGroupId: originalGroupId,
        NewGroupIds: newGroupIds,
        OriginalIdeaIds: originalIdeaIds,
        Note: note
    }
    const url = 'Ideas/Share';
    const request = postAxios(url, { params: params });
    return {
        type: 'REQUEST_BULK_SHARE_IDEA',
        payload: request
    }
};

export const onTransferIdeas = (originalGroupId, targetGroupId, originalIdeaIds, note) => {
    //let params = { sharedIdeas: sharedIdeas, requestNote: requestNote, OriginalGroupId: originalGroupId };
    let params = {
        OriginalGroupId: originalGroupId,
        NewGroupId: targetGroupId,
        OriginalIdeaIds: originalIdeaIds,
        Note: note
    }
    const url = 'Ideas/Transfer';
    const request = postAxios(url, { params: params });
    return {
        type: 'REQUEST_BULK_TRANSFER_IDEA',
        payload: request
    }
};





export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
};

export const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message: message
    }
};
export const showReportNotification = (message) => {
    return {
        type: 'SHOW_REPORT_NOTIFICATION',
        message: message
    }
}

export const onIdeaSelect = (ideaId, view) => {
    return {
        type: 'IDEA_SELECT',
        payload: ideaId,
        view: view
    }
};


export const showLongNotification = (message) => {
    return {
        type: 'SHOW_LONG_NOTIFICATION',
        message: message
    }
};

export const showBulkActionNotification = (message) => {
    return {
        type: 'SHOW_BULKACTION_NOTIFICATION',
        message: message
    }
};

export const selectIdea = (idea) => {
    return {
        type: 'IDEA_SELECTED',
        payload: idea
    }
};


export const filterIdea = (filterType) => {
    return {
        type: filterType
    }
};

export const filterGroup = (groupId, view, isGroupChange) => {
    return [{
        type: 'GROUP_FILTER',
        payload: groupId,
        view: view
    },
    (dispatch) => {
        if (isGroupChange) {
            dispatch(sortUserNote());
        }
    }]

};


export const updateFilterGroup = (groupId) => {
    return {
        type: 'UPDATE_GROUPID',
        payload: groupId
    }
};

export const updateDeviceType = (deviceType) => {
    return {
        type: 'UPDATE_DEVICETYPE',
        payload: deviceType
    }
};

export const dashboardFilter = (filterArray) => {
    //var payload = { name: name, ideaNumbers: ideaNumbers };
    return {
        type: 'DASHBOARD_FILTER',
        payload: { filterArray: filterArray }
    }
};

export const toggleTransferModal = (isOpen) => {
    return {
        type: 'TOGGLE_TRANSFER_MODAL',
        payload: isOpen
    }
}

export const toggleMultiGroupIdeasModal = (isOpen) => {
    return {
        type: 'TOGGLE_MULTIGROUP_IDEAS_MODAL',
        payload: isOpen
    }
}

export const clearDashboardFilter = (filterArray) => {
    //var payload = { name: name, ideaNumbers: ideaNumbers };
    return {
        type: 'CLEAR_DASHBOARD_FILTER',
        payload: { filterArray: filterArray }
    }
};

export const dashboardPhaseChange = (phaseNumber) => {
    return {
        type: 'DASHBOARD_PHASE_CHANGE',
        payload: { phaseNumber: phaseNumber }
    }
};

export const taskWeekNumberChange = (currentTaskWeekNumber) => {
    return {
        type: 'TASKWEEK_NUMBER_CHANGE',
        payload: { currentTaskWeekNumber: currentTaskWeekNumber }
    }
};

export const customizeImplementationLineItemView = (cutomizationView) => {
    return {
        type: 'CUSTOMIZE_IMPLEMENTATION_LINEITEM_VIEW',
        cutomizationView: cutomizationView
    }
};

export const showInactiveIdeas = (value, view) => {
    return {
        type: 'IS_SHOW_INACTIVE_IDEA',
        payload: value,
        view: view
    }
};

export const showHighlightedIdeas = (value, view) => {
    return {
        type: 'IS_SHOW_HIGHLIGHTED_IDEA',
        payload: value,
        view: view
    }
};

export const showIdeaRiskDistribution = (value, view) => {
    return {
        type: 'IS_SHOW_IDEA_RISK_DISTRIBUTION',
        payload: value,
        view: view
    }
};

export const setDashboardPersists = (selectedPhase, selectedDashboardMenu, selectedDashboardSubmenu) => {
    return {
        type: 'SET_DASHBOARD_PERSISTS',
        selectedPhase: selectedPhase,
        selectedDashboardMenu: selectedDashboardMenu,
        selectedDashboardSubmenu: selectedDashboardSubmenu
    }
};



export const setIdeaViewPersists = (selectedView) => {
    return {
        type: 'SET_IDEAVIEW_PERSISTS',
        selectedView: selectedView,
    }
};

export const setIdeasOnPageCount = (value, view) => {
    return {
        type: 'SET_IDEA_COUNTONPAGE',
        payload: value,
        view: view
    }
};

export const setSortingOnViewChange = (view) => {
    return {
        type: 'SET_SORTING_ONVIEWCHANGE',
        payload: view
    }
};

export const ideaTabOnChange = (ideaId, tabType, isRowSelected, isCompanyView) => {
    if (!isCompanyView) {
        let params = { Page: 'Ideas', IdeaId: ideaId, TabName: tabType, IsRowExpand: isRowSelected }
        const url = 'Ideas/TabClick';
        const request = postAxiosToApplication(url, { params: params });
    }
    var selectedIdeaId = null;
    if (isRowSelected) {
        selectedIdeaId = ideaId;
    }
    return {
        type: 'IDEA_TABCHANGE',
        payload: selectedIdeaId,
    }
};

export const showEditingNotification = (showEditingNotification, editingMessage, ) => {
    return {
        type: 'EDITING_NOTIFICATION',
        showEditingNotification: showEditingNotification,
        editingMessage: editingMessage,
    }
};

export const checkIdea = (ideaId, checked, view) => {
    return {
        type: 'CHECK_IDEA',
        payload: ideaId,
        checked: checked,
        view: view
    }
};

export const unCheckAllIdeas = (view) => {
    return {
        type: 'UNCHECK_ALL_IDEAS',
        payload: false,
        view: view
    }
};

export const removeIsGroupChanged = () => {
    return {
        type: 'REMOVE_ISGROUP_CHANGE',
    }
};

export const addIsGroupChanged = () => {
    return {
        type: 'ADD_ISGROUP_CHANGE',
    }
};



export const checkAllIdeasFromOnePage = (checked, currentPage, groupId, view, filteredIdeaIds) => {
    return {
        type: 'CHECK_ALL_IDEAS_FROM_ONE_PAGE',
        payload: checked,
        currentPage: currentPage,
        groupId: groupId,
        view: view,
        filteredIdeaIds: filteredIdeaIds
    }
};

export const toggleIdeaAction = (ideaId, clickedOutSide) => {
    return {
        type: 'TOGGLE_IDEA_ACTION',
        payload: ideaId,
        clickedOutSide: clickedOutSide
    }
};

export const ideaStatesSetOnSelectePage = (view) => {
    return {
        type: 'SET_IDEA_STATES_ON_SELECTED_PAGE',
        view: view
    }
};

export const pageClick = (pageNo, view) => {
    return [{
        type: 'PAGE_CHANGE',
        payload: pageNo,
        view: view
    },
    (dispatch, getState) => {
        dispatch(ideaStatesSetOnSelectePage(view))
    },
    (dispatch, getState) => {
        dispatch(removeEmptyIdea())
    }
    ]
};

export const perPageIdeaCountChange = (perPageIdeaCount, view) => {
    return {
        type: 'PERPAGE_IDEACOUNT_CHANGE',
        payload: perPageIdeaCount,
        view: view
    }
};

export const changeText = (fieldText, fieldName, ideaId) => {
    return {
        type: 'TEXT_CHANGE',
        payload: fieldText,
        fieldName: fieldName,
        ideaId: ideaId
    }
};

export const sortIdeaList = (columnName, direction, sortingOn, view) => {
    return [{
        type: 'IDEA_LIST_SORT',
        payload: { column: columnName, direction: direction, sortingOn: sortingOn },
        view: view
    },
    (dispatch, getState) => {
        dispatch(ideaStatesSetOnSelectePage(view))
    }]
};

export const sortImplementaionIdeas = (column, direction) => {
    return {
        type: 'SORT_IMPLEMENTATION_IDEAS',
        payload: { column: column, direction: direction },
    }
};

export const sortImplementaionLineitem = (column, direction) => {
    return {
        type: 'SORT_IMPLEMENTATION_LINEITEMS',
        payload: { column: column, direction: direction },
    }
};

export const sortImplementaionMetric = (column, direction) => {
    return {
        type: 'SORT_IMPLEMENTATION_METRICS',
        payload: { column: column, direction: direction },
    }
};

export const sortImplementaionMilestone = (column, direction) => {
    return {
        type: 'SORT_IMPLEMENTATION_MILESTONES',
        payload: { column: column, direction: direction },
    }
};



export const sortOutGoingViews = (columnName, direction, sortingOn, view) => {
    return [{
        type: 'SORT_OUTGOING_VIEWS',
        payload: { column: columnName, direction: direction, sortingOn: sortingOn },
        view: view
    },
    (dispatch, getState) => {
        dispatch(ideaStatesSetOnSelectePage(view))
    }]
};

export const sortIdeaListSCR = (value, view) => {
    return [{
        type: 'SCR_SORT',
        payload: value,
        view: view
    },
    (dispatch, getState) => {
        dispatch(ideaStatesSetOnSelectePage(view))
    }]
};

export const updateIdeaCount = (value, view) => {
    return {
        type: 'IDEA_COUNT',
        payload: value,
        view: view
    }
};


export const dropDownOnChange = (lineitemId, category) => {
    //const url = 'LineItems/UpdateLineitemCategory?lineitemId=' + lineitemId + '&category=' + category;
    // const request= getAxios(
    //     url
    // );


    return {
        type: 'DropDown_OnChange',
        payload: 'request'
    }
};

export const descriptionOnChange = (description, ideaId) => {
    return {
        type: 'Description_OnChange',
        //payload: request
    }
};

export const getRiskRatersReport = (groupId, specialEventTimeStamp) => {
    var params = { id: groupId }
    let timeStamp = getMomentTimeStamp(specialEventTimeStamp);// ? moment(specialEventTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    const url = 'RiskRatings/GetRiskRatersReport/' + groupId + '-' + timeStamp;
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_RISK_RATERS_REPORT',
        payload: request
    }
};

export const onExportRiskRaters = (exportedData, exportType, exportDetailSheetName, groupId, language) => {
    var exportDetailsFields = getExportDetailsFields()
    var name = window.parent.name;

    var params = { multiSheetData: exportedData, exportName: exportType, groupId: groupId, createdBy: name, exportDetailSheetName: exportDetailSheetName, exportDetailsFields: exportDetailsFields, language: language }
    const url = 'RiskRatings/RiskRatersExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_RISK_RATERS_EXPORT',
        payload: request
    }
};
export const onExportFTEReport = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId,
        createdBy: name, exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture(), exportDetailsFields: exportDetailsFields
    }
    const url = 'Reports/FTEDetailsExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_RISK_RATERS_EXPORT',
        payload: request
    }
};

export const onExortRiskRating = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName
        , language: getCurrentCulture()
    }
    const url = 'Reports/RiskRatingExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};

export const onExportPersonnel = (groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportedFields: getPersonnelCols(), exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName
        , language: getCurrentCulture()
    }
    const url = 'Reports/PersonnelExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};

export const onExportMultiGroupsIdea = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportedData: exportedData, exportedFields: exportedFields, exportType: exportType, groupId: groupId, language: getCurrentCulture(),
        createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName
    }
    const url = 'Reports/MultiGroupsIdeaExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_MULTI_GROUP_IDEAS_EXPORT',
        payload: request
    }
};
export const onExortLineItems = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, language: getCurrentCulture(),
        createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName, controllerName: 'ReportsLineItemsExport',
    }
    const url = 'Reports/LineItemsExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};
export const onExortIdeaList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields,
        exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture()
    }
    const url = 'Reports/IdeaListExport';
    const request = postAxios(url, { params: params });
    return [{
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification()) }]
};

export const onExportSessionIdeaList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields,
        exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture()
    }
    const url = 'Reports/SessionIdeaListExport';
    const request = postAxios(url, { params: params });
    return [{
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification()) }]
};
export const onExportUserNoteList = (exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportedFields: exportedFields, exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields,
        controllerName: 'MyNotes', exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture()
    }
    const url = 'Reports/UserNotesExport';
    const request = postAxios(url, { params: params });
    return [(dispatch, getState) => {
        dispatch(showMultiNotification(getNotifyItem('ComprehensiveExport')));
    },
    {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }, (dispatch, getState) => {
        dispatch(hideMultiNotification('ComprehensiveExport'))
    }]
};
export const onExportMilestoneList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = { exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName }
    const url = 'Reports/ImplementationMilestoneExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};
export const onExportGroupProfroma = (proformaType, groupId, language) => {
    var params = { proformaType: proformaType, groupId: groupId, language: language }
    const url = 'Proforma/GroupProformaExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
}
export const onExportProforma = (proformaType, ProformaValueType, ProformaIdeaType, groupId, language, isImplementationPhase) => {
    var params = { proformaType: proformaType, ProformaValueType: ProformaValueType, ProformaIdeaType: ProformaIdeaType, groupId: groupId, language: language, isImplementationPhase: isImplementationPhase }
    const url = 'Proforma/Export';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
}
export const onExportPositionsProforma = (proformaType, ProformaValueType, ProformaIdeaType, groupId, language) => {
    var params = { proformaType: proformaType, ProformaValueType: ProformaValueType, ProformaIdeaType: ProformaIdeaType, groupId: groupId, language: language }
    const url = 'Proforma/PoistionProformaExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
}

export const onExportIdeasList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var name = window.parent.name ? window.parent.name : '';
    var exportDetailsFields = getExportDetailsFields();
    var params = { exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName }
    const url = 'Reports/IdeasExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};
export const onExportMetricsList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var name = window.parent.name ? window.parent.name : '';
    var exportDetailsFields = getExportDetailsFields();
    var params = {
        exportData: exportedData, controllerName: 'MetricListExport', exportedFields: exportedFields,
        exportName: exportType, groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName
    }
    const url = 'Reports/ImplementationMetricsExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};
export const onExportILineItemsExportList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var name = window.parent.name ? window.parent.name : '';
    var exportDetailsFields = getExportDetailsFields();
    var params = {
        exportData: exportedData, controllerName: "ILineItemsExport", exportedFields: exportedFields, exportName: exportType,
        groupId: groupId, createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture()
    }
    const url = 'Reports/ImplementationLineItemsExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};
export const getGroupSummaryText = (timeStamps, groupId) => {
    let params = { callTime: new Date() };
    let groupSummaryTimeStamp = timeStamps.GroupSummaryTimeStamp && timeStamps.GroupSummaryTimeStamp[groupId] ? getMomentTimeStamp(timeStamps.GroupSummaryTimeStamp[groupId.toLowerCase()]) : getMomentTimeStamp(new Date());

    var url = '';
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        url = 'GroupAdmin/GetGroupSummaryTextForCompany/' + groupId + '-' + groupSummaryTimeStamp;
    } else {
        url = 'GroupAdmin/GetGroupSummaryText/' + groupId + '-' + groupSummaryTimeStamp;
    }
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_SUMMARY_TEXT',
        payload: request
    }
};


/************ Update Line Items ****************/
export const onUpdateLineItem = (entityId, fieldName, fieldValue, ideaId, groupId, lineItemType) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'))
    }, (dispatch, getState) => {
        dispatch(onUpdateLineItemData(entityId, fieldName, fieldValue, ideaId, groupId, lineItemType))
    }]
};

const onUpdateLineItemData = (entityId, fieldName, fieldValue, ideaId, groupId, lineItemType) => {
    let params = { entityId: entityId, fieldName: fieldName, fieldValue: fieldValue, ideaId: ideaId, groupId: groupId };
    let url = '';
    let actionType = '';
    switch (lineItemType) {
        case 1: url = 'RevenueLineItems/Update'; actionType = 'UPDATE_REVENUE_LINEITEM'; break;
        case 2: url = 'PersonnelLineItems/Update'; actionType = 'UPDATE_PERSONNEL_LINEITEM'; break;
        case 3: url = 'NonPersonnelLineItems/Update'; actionType = 'UPDATE_NONPERSONNEL_LINEITEM'; break;
    }
    const request = postAxios(url, { params: params });
    return [{
        type: actionType,//'UPDATE_LINEITEM',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onExportCompletionTracker = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName, selectedIdeaNumber, tableView) => {
    var userName = window.parent.name ? window.parent.name : '';
    var exportDetailsFields = getExportDetailsFields();
    if (selectedIdeaNumber) {
        exportDetailsFields.push({ Value: 'Idea #', Text: selectedIdeaNumber });
    }

    var params = { exportData: exportedData, exportedFields: exportedFields, language: getCurrentCulture(), tableView: tableView, exportName: exportType, groupId: groupId, createdBy: userName, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName }
    const url = 'Implementation/ExportCompletionTracker';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};

/******************Milestone**********************************/
export const onCreateMilestone = (ideaId, groupId, title, description) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Creating Milestone...'))
    }, (dispatch, getState) => {
        dispatch(onCreateMilestoneData(ideaId, groupId, title, description))
    }]
};

export const onCreateMilestoneData = (ideaId, groupId, title, description) => {
    let params = {
        IdeaId: ideaId,
        GroupId: groupId,
        Title: title ? title : '',
        Description: description ? description : '',
        PlanTiming: null
    };
    const url = 'Milestone/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_MILESTONE',
        payload: request
    }
};

export const onUpdateMilestone = (entityId, fieldName, fieldValue) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'))
    }, (dispatch, getState) => {
        dispatch(onUpdateMilestoneData(entityId, fieldName, fieldValue))
    }]
};

export const onUpdateMilestoneData = (entityId, fieldName, fieldValue) => {
    let params = { entityId: entityId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Milestone/Update';
    const request = postAxios(url, { params: params });
    return [{
        type: 'UPDATE_MILESTONE',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onCreateUpdateMultiplePartiesMilestone = (entityId, responsibleParty) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'))
    }, (dispatch, getState) => {
        dispatch(onCreateUpdateMultiplePartiesMilestoneData(entityId, responsibleParty))
    }]
};

export const onCreateUpdateMultiplePartiesMilestoneData = (entityId, responsibleParty) => {
    let params = { EntityId: entityId, LeaderIds: responsibleParty };
    const url = 'Milestone/CreateUpdateMultipleParties';
    const request = postAxios(url, { params: params });
    return [{
        type: 'UPDATE_MILESTONE_RESPONSIBLE_PARTY',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteMultipleMilestones = (milestoneIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'))
    }, (dispatch, getState) => {
        dispatch(onDeleteMultipleMilestonesData(milestoneIds))
    }]
};

export const onDeleteMultipleMilestonesData = (milestoneIds) => {
    let params = { id: milestoneIds };
    const url = 'Milestone/DeleteMultiple/' + milestoneIds;;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_MULTIPLE_MILESTONE',
        payload: request
    }
};

export const onDeleteMilestone = (entityId) => {
    var params = { id: entityId }
    const url = 'Milestone/Delete/' + entityId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_MILESTONE',
        payload: request
    }
};

export const onCopyMilestone = (milestoneId) => {
    var params = { EntityId: milestoneId }
    const url = 'Milestone/Copy/' + milestoneId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_MILESTONE',
        payload: request
    }
};

export const arrangeMilestones = (milestoneIDs) => {
    let params = { milestoneIDs: milestoneIDs };
    const url = 'Milestone/RearrangeMilestones';
    const request = postAxios(url, { params: params });
    return {
        type: 'ARRANGE_MILESTONES',
        payload: request
    }
}

/******************Metric**********************************/
export const onCreateMetric = (ideaId, groupId, title, description) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Creating Metric...'))
    }, (dispatch, getState) => {
        dispatch(onCreateMetricData(ideaId, groupId, title, description))
    }]
};

export const onCreateMetricData = (ideaId, groupId, title, description) => {
    let params = {
        IdeaId: ideaId,
        GroupId: groupId,
        Title: title,
        Description: description
    };
    const url = 'Metric/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_METRIC',
        payload: request
    }
};

export const onUpdateMetric = (entityId, ideaId, fieldName, fieldValue) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'))
    }, (dispatch, getState) => {
        dispatch(onUpdateMetricData(entityId, ideaId, fieldName, fieldValue))
    }]
};

export const onUpdateMetricData = (entityId, ideaId, fieldName, fieldValue) => {
    let params = { entityId: entityId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Metric/Update';
    const request = postAxios(url, { params: params });
    return [{
        type: 'UPDATE_METRIC',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onCreateUpdateMultiplePartiesMetric = (entityId, responsibleParty) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'))
    }, (dispatch, getState) => {
        dispatch(onCreateUpdateMultiplePartiesMetricData(entityId, responsibleParty))
    }]
};

export const onCreateUpdateMultiplePartiesMetricData = (entityId, responsibleParty) => {
    let params = { EntityId: entityId, LeaderIds: responsibleParty };
    const url = 'Metric/CreateUpdateMultipleParties';
    const request = postAxios(url, { params: params });
    return [{
        type: 'UPDATE_METRIC_RESPONSIBLE_PARTY',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteMetric = (entityId) => {
    var params = { id: entityId }
    const url = 'Metric/Delete/' + entityId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_METRIC',
        payload: request
    }
};

export const onDeleteMultipleMetrices = (metricIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'))
    }, (dispatch, getState) => {
        dispatch(onDeleteMultipleMetricesData(metricIds))
    }]
};

export const onDeleteMultipleMetricesData = (metricIds) => {
    let params = { id: metricIds };
    const url = 'Metric/DeleteMultiple/' + metricIds;;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_MULTIPLE_METRIC',
        payload: request
    }
};

export const onCopyMetric = (metricId) => {
    var params = { EntityId: metricId }
    const url = 'Metric/Copy/' + metricId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_METRIC',
        payload: request
    }
};

export const arrangeMetrics = (metricIDs) => {
    let params = { metricIDs: metricIDs };
    const url = 'Metric/RearrangeMetrics';
    const request = postAxios(url, { params: params });
    return {
        type: 'ARRANGE_METRICS',
        payload: request
    }
}

export const getCostCenters = (timeStamps) => {
    let params = { callTime: new Date() };
    let costCenterTimeStamp = getMomentTimeStamp(timeStamps.Center);
    let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    const url = 'CachedData/GetCostCenters/' + organizationId + '-' + costCenterTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_CENTERS',
        payload: request
    }
};

export const onUpdateEntitiesPlanTiming = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'))
    }, (dispatch, getState) => {
        dispatch(onUpdateEntitiesPlanTimingData(data))
    }]
};

export const onUpdateEntitiesPlanTimingData = (data) => {
    let params = { EntitiesTiming: data };
    let url = 'IdeaGroups/UpdateEntitiesPlanTiming';

    const request = postAxios(url, { params: params });
    return [{
        type: 'UPDATE_ENTITIES_PLAN_TIMING',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};



export const onPersonnelSearch = (searchText) => {
    let params = { callTime: new Date() };

    const url = 'Personnel/Search?searchText=' + searchText;
    const request = getAxios(url, { params: params });
    return {
        type: actionType.GET_PERSONNEL_SEARCH,
        payload: request
    }
};

export const clearPersonnelSearch = () => {
    return {
        type: actionType.CLEAR_PERSONNEL_SEARCH,
        payload: false,
    }
};

export const onUserSearch = (searchText) => {
    let params = { callTime: new Date() };

    const url = 'Participant/Search?searchText=' + searchText;
    const request = getAxios(url, { params: params });
    return {
        type: actionType.GET_USER_SEARCH,
        payload: request
    }
};

export const clearUserSearch = () => {
    return {
        type: actionType.CLEAR_USER_SEARCH,
        payload: false,
    }
};



axios.interceptors.request.use(request => {
    if (AppConfig.axiosLogger) {
        loghelper.consoleTime('ajax ' + request.method + ' ' + loghelper.formatUrl(request.url), 0, 3);
    }
    return request;
});

axios.interceptors.response.use(response => {
    if (AppConfig.axiosLogger) {
        loghelper.consoleTimeEnd('ajax ' + response.config.method + ' ' + loghelper.formatUrl(response.config.url), 0, 3);
    }
    return response;
});

function getAxios(url, axiosRequestConfig) {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') || AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') || AppConfig.env('userId'),
        connectionId: getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken),
        projectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId') || '',
        BrowserSessionId: ''/*getCookies('BrowserSessionId')*/,
        'JsMessageId': guid(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0'
    };
    url = AppConfig.env('url') + url;
    var resp = axios({
        method: 'get',
        url: url,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
        view: axiosRequestConfig.params.view ? axiosRequestConfig.params.view : null
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};
function postAxios(url, axiosRequestConfig) {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') || AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') || AppConfig.env('userId'),
        connectionId: getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken),
        projectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId') || '',
        BrowserSessionId: ''/*getCookies('BrowserSessionId')*/,
        'JsMessageId': guid(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0'
    };
    url = AppConfig.env('url') + url;
    var resp = axios({
        method: 'post',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

function postAxiosToApplication(url, axiosRequestConfig) {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') || AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') || AppConfig.env('userId'),
        connectionId: getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken)
    };
    url = AppConfig.baseUrl + url;
    var resp = axios({
        method: 'post',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

export const postAxiosToMVCApp = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') || AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') || AppConfig.env('userId'),
        connectionId: getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken)
    };
    url = AppConfig.baseUrl + url;
    var resp = axios({
        method: 'get',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var getUtcDate = function () {
    var dt = new Date();
    return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
};

/* function getCookies(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
} */
