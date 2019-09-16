import AppConfig from '../appConfig';
import * as loghelper from '../common/loghelper';
import { fireAndForget, getCurrentCulture, getExportDetailsFields, getMomentTimeStamp, getLastProjectId } from '../common/utils';
import i18n from '../i18n';
import * as actionTypes from './actionTypes';
import { getAxios, postAxios } from './axiosActions';
import { getGroupSummaryText } from './index';
import { hideNotification2, showNotification2 } from './notification';
import { getLocalStorageKey } from '../common/utils';

export const groupChanged = () => {
    return {
        type: 'GROUP_CHANGE',
    }
};

export const getDashboardData = async (e) => (groupId, isGroupChange) => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_TIMESTAMPS',
        payload: request
    },
    (dispatch, getState) => {
        if (isGroupChange) {
            fireAndForget(AppConfig.baseUrl + 'Ideas/GroupChanged?connectionId=' + getLocalStorageKey('tabId') + '&groupId=' + groupId + '&myNotes=' + getLocalStorageKey('isShowingMyNotes'));
            dispatch(groupChanged());
        }
        const timeStamps = getState().timeStamps;
        dispatch(getIdeaGroupDashboardData(groupId, timeStamps));
        const currentTimeStamp = getMomentTimeStamp(new Date());
        let summaryTextTimeStamp = timeStamps.GroupSummaryTimeStamp && timeStamps.GroupSummaryTimeStamp[groupId] ? getMomentTimeStamp(timeStamps.GroupSummaryTimeStamp[groupId.toLowerCase()]) : currentTimeStamp;
        dispatch(getGroupSummaryText(summaryTextTimeStamp, groupId));
    }];
};

export const getIdeaGroupDashboardData = () => {
    let params = { callTime: new Date() };
    let url = '';
    const groupId = AppConfig.env('groupId');
    const currentTimeStamp = getMomentTimeStamp(new Date());
    let userId = AppConfig.env('userId') ; /* getLocalStorageKey('userId') ? getLocalStorageKey('userId').toLowerCase() : AppConfig.env('userId').toLowerCase()*/
    let permissionTimeStamp = getMomentTimeStamp(new Date()); //getMomentTimeStamp(timeStamps.PermissionMaster);
    const projectId = AppConfig.env('projectId');
    let timeStamp = getMomentTimeStamp(new Date()); //getMomentTimeStamp(timeStamps.OrganizationIdeas);
    let organizationId = AppConfig.env('organizationId');
    /* if (groupId === '00000000-0000-0000-0000-000000000000') {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);

        url = 'Dashboard/GetDashboardData/' + organizationId + '-' + timeStamp + '-' + userId + '-' + permissionTimeStamp;
    } else {
        let ideasTimeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
        url = 'Dashboard/GetDashboardData/' + groupId + '-' + ideasTimeStamp + '-' + userId + '-' + permissionTimeStamp;
    } */
    //let ideasTimeStamp = currentTimeStamp;
    //url = 'Dashboard/GetDashboardData/' + groupId + '-' + ideasTimeStamp + '-' + userId + '-' + permissionTimeStamp;
    url = 'Ideas/GetIdeaData/' + groupId + '-' + timeStamp + '-' + userId + '-' + projectId + '-' + permissionTimeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_IDEA_DATA,
        payload: request
    }
};

export const dashboardPhaseChange = (phaseNumber) => {
    return {
        type: actionTypes.DASHBOARD_PHASE_CHANGE,
        payload: { phaseNumber: phaseNumber }
    }
};

export const dashboardValueTypeChange = (value) => {
    return {
        type: actionTypes.DASHBOARD_VALUE_TYPE_CHANGE,
        payload: value
    }
};

export const dashboardRecommendationTypeChange = (value) => {
    return {
        type: actionTypes.DASHBOARD_RECOMMENDATION_TYPE_CHANGE,
        payload: value
    }
};

export const dashboardDecisionTypeChange = (value) => {
    return {
        type: actionTypes.DASHBOARD_DECISION_TYPE_CHANGE,
        payload: value
    }
};

export const getDashboardBaselineData = (groupId, selectedPhase, recommendationType, decisionType) => {
    return [{
        type: 'EMPTY_DASHBOARD_BASLINE_DATA',
    }, (dispatch, getState) => {
        dispatch(showNotification2('Loading'));
        dispatch(getDashboardBaselineDetailsData(groupId, selectedPhase,
            recommendationType, decisionType));
        //dispatch(getDashboardOtherData(groupId, true));
    }]
};

export const getDashboardBaselineDetailsData = (groupId, selectedPhase, recommendationType, decisionType) => {
    let params = { callTime: new Date(), GroupId: groupId, Phase: selectedPhase, RecommendationType: recommendationType, DecisionType: decisionType };
    const url = 'Dashboard/GetDashboardBaselineData?groupId=' + groupId + '&phase=' + selectedPhase + '&recommendationType=' + recommendationType + '&decisionType=' + decisionType;
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_DASHBOARD_BASELINE_DATA',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};


export const getMultiGroupIdeasDetail = (groupId, valueType, recommendationType, decisionType) => {
    let params = { callTime: new Date(), GroupId: groupId, ValueType: valueType, RecommendationType: recommendationType, DecisionType: decisionType };
    const url = 'Dashboard/GetMultiGroupIdeasDetail?groupId=' + groupId +
        '&valueType=' + valueType + '&recommendationType=' + recommendationType + '&decisionType=' + decisionType;
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_DASHBOARD_MULTIGROUP_IDEAS_DATA',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
export const getFTESummaryDetail = (groupId, valueType, recommendationType, decisionType) => {
    let params = { callTime: new Date(), GroupId: groupId, ValueType: valueType, RecommendationType: recommendationType, DecisionType: decisionType };
    const url = 'Dashboard/GetFTESummaryDetail?groupId=' + groupId +
        '&valueType=' + valueType + '&recommendationType=' + recommendationType + '&decisionType=' + decisionType;
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_DASHBOARD_FTE_DETAILS_DATA',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onExportMultiGroupsIdeaV1 = (groupId, valueType, recommendationType, decisionType, language, exportedFields, exportType, exportDetailSheetName, ) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;

    var params = {
        groupId: groupId, valueType: valueType, recommendationType: recommendationType,
        decisionType: decisionType, language: language, exportedFields: exportedFields, exportName: exportType,
        createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName
    }
    const url = 'Reports/MultiGroupsIdeaExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_MULTI_GROUP_IDEAS_EXPORT',
        payload: request
    }
};

export const onExportGroupSummaryTracker = (exportedData, groupId, exportType, exportDetailSheetName, tableView) => {
    var userName = window.parent.name ? window.parent.name : '';
    var exportDetailsFields = getExportDetailsFields();;

    var params = { multiSheetData: exportedData, language: getCurrentCulture(), tableView: tableView, exportName: exportType, groupId: groupId, createdBy: userName, exportDetailsFields: exportDetailsFields, exportDetailSheetName: exportDetailSheetName }
    const url = 'Implementation/ExportGroupSummaryTracker';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};
export const emptyValueComponentDetails = () => {
    return {
        type: 'EMPTY_VALUE_COMPONENT_DETAIL_DATA'
    }

};
export const emptyProformaDetails = () => {
    return {
        type: 'EMPTY_PROFORMA_DETAIL_DATA'
    }

};
export const emptyFTEDetails = () => {
    return {
        type: 'EMPTY_FTE_DETAIL_DATA'
    }

};
export const emptyMultiGroupIdeaDetails = () => {
    return {
        type: 'EMPTY_MULTIGROUP_IDEAS_DETAIL_DATA'
    }

};
export const emptyDashboardSummaryDetails = () => {
    return {
        type: 'EMPTY_DASHBOARD_DETAIL_DATA'
    }

};
export const emptyDashboardBaselineDetails = () => {
    return {
        type: 'EMPTY_DASHBOARD_BASLINE_DATA'
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

export const dashboardFilter = (filterArray) => {
    //var payload = { name: name, ideaNumbers: ideaNumbers };
    return {
        type: 'DASHBOARD_FILTER',
        payload: { filterArray: filterArray }
    }
};


export const getDashboardOtherData = (groupId, isShowGroupSummary) => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_TIMESTAMPS',
        payload: request
    },
    (dispatch, getState) => {
        const timeStamps = getState().timeStamps;
        const projectId = getState().ideaGroupFilter.projectId;
        // if (isShowGroupSummary) {
        //     const currentTimeStamp = getMomentTimeStamp(new Date());
        //     let summaryTextTimeStamp = timeStamps.GroupSummaryTimeStamp && timeStamps.GroupSummaryTimeStamp[groupId] ? getMomentTimeStamp(timeStamps.GroupSummaryTimeStamp[groupId.toLowerCase()]) : currentTimeStamp;
        //     dispatch(getGroupSummaryText(summaryTextTimeStamp, groupId));
        // }
        dispatch(getDashboardOtherDataList(projectId, groupId, timeStamps));
    }];
};

export const getDashboardOtherDataList = () => {
    let params = { callTime: new Date() };
    let url = '';
    const groupId = AppConfig.env('groupId');
    const currentTimeStamp = getMomentTimeStamp(new Date());
    const projectId = AppConfig.env('projectId');
    let permissionTimeStamp = getMomentTimeStamp(new Date()); 
    let timeStamp = getMomentTimeStamp(new Date()); 
    let organizationId = AppConfig.env('organizationId');
    let userId = AppConfig.env('userId') ;
   
    if (groupId === '00000000-0000-0000-0000-000000000000') {
      //  let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
      //  let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);

        url = 'Dashboard/GetDashboardOtherData/' + organizationId + '-' + timeStamp + '-' + userId + '-' + projectId + '-' + permissionTimeStamp;
    } else {
        let ideasTimeStamp = /* (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : */ currentTimeStamp;
        url = 'Dashboard/GetDashboardOtherData/' + groupId + '-' + ideasTimeStamp + '-' + userId + '-' + permissionTimeStamp;
    }

    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_DASHBOARD_OTHER_DATA,
        payload: request
    }
};



/******************Implementation Dashbaord**********************************/
export const emptyTrackingDashboard = () => {
    return {
        type: 'EMPTY_TRACKING_DASHBOARD'
    }
};

export const emptyPlanningDashboard = () => {
    return {
        type: 'EMPTY_PLANNING_DASHBOARD'
    }
};

export const getPlanningDashboard = (groupId, isGroupChange) => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });

    return [{
        type: 'GET_TIMESTAMPS',
        payload: request
    },
    (dispatch, getState) => {
        if (isGroupChange) {
            dispatch(emptyPlanningDashboard());
        }
        const timeStamps = getState().timeStamps;
        let projectId = '';
        if (groupId === '00000000-0000-0000-0000-000000000000') {
            projectId = '-' + (getState().ideaGroupFilter.projectId || getLastProjectId());
        }

        dispatch(getPlanningDashboardData(projectId, groupId, timeStamps))
        dispatch(getPlanningDashboardVariance(projectId, groupId, timeStamps));
    }]
};

const getPlanningDashboardData = (projectId, groupId, timeStamps) => {
    let params = { callTime: new Date() };
    const currentTimeStamp = getMomentTimeStamp(new Date());
    let timeStamp;
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);
    } else {
        timeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
    }

    const url = 'Implementation/GetPlanningDashboard/' + groupId + projectId + '-' + timeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_PLANNING_DASHBOARD',
        payload: request
    }
};
const getPlanningDashboardVariance = (projectId, groupId, timeStamps) => {
    let params = { callTime: new Date() };
    const currentTimeStamp = getMomentTimeStamp(new Date());
    let timeStamp;
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);
    } else {
        timeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
    }
    loghelper.consoleTime('getPlanningDashboardVariance', 1, 3);
    const url = 'Implementation/GetPlanningDashboardVariance/' + groupId + projectId + '-' + timeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_PLANNING_DASHBOARD_VARIANCE',
        payload: request
    }
};
export const getTrackingDashboard = (groupId, isGroupChange, singleRowForMultigroupIdea) => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });

    return [{
        type: 'GET_TIMESTAMPS',
        payload: request
    }, (dispatch, getState) => {
        if (isGroupChange) {
            dispatch(emptyTrackingDashboard());
        }
        const timeStamps = getState().timeStamps;
        let projectId = '';
        if (groupId === '00000000-0000-0000-0000-000000000000') {
            projectId = '-' + (getState().ideaGroupFilter.projectId || getLastProjectId());
        }
        dispatch(getTrackingDashboardData(projectId, groupId, timeStamps, singleRowForMultigroupIdea))
        dispatch(getTrackingDashboardVariance(projectId, groupId, timeStamps));
    }]
};

const getTrackingDashboardData = (projectId, groupId, timeStamps, singleRowForMultigroupIdea) => {
    let params = { callTime: new Date() };
    const currentTimeStamp = getMomentTimeStamp(new Date());
    let timeStamp;
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);
    } else {
        singleRowForMultigroupIdea = false;
        timeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
    }

    const url = 'Implementation/GetTrackingDashboard/' + groupId + projectId + '-' + timeStamp + '?singleRowForMultigroupIdea=' + singleRowForMultigroupIdea;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_TRACKING_DASHBOARD',
        payload: request
    }
};

export const exportPlanningDashboard = (groupId, language, exportType, selectedPhase, proformaValueType1, proformaValueType2, proformaColumnType) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')))
    }, (dispatch, getState) => {
        dispatch(exportPlanningDashboardData(groupId, language, exportType, selectedPhase, proformaValueType1, proformaValueType2, proformaColumnType))
    }]
};

export const exportPlanningDashboardData = (groupId, language, exportType, selectedPhase, proformaValueType1, proformaValueType2, proformaColumnType) => {
    var userName = window.parent.name ? window.parent.name : '';
    var exportDetailsFields = getExportDetailsFields();;
    var params = { groupId: groupId, exportName: exportType, language: language, phase: selectedPhase, proformaValueType1: proformaValueType1, proformaValueType2: proformaValueType2, proformaColumnType: proformaColumnType, createdBy: userName, exportDetailSheetName: "Export Details", exportDetailsFields: exportDetailsFields }
    const url = 'Implementation/ExportPlanningDashboard';
    const request = postAxios(url, { params: params });
    return [{
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
export const onExportIdeasWithVariance = (exportedData, exportedFields, groupId, exportType, varianceType, exportDetailSheetName) => {
    var exportDetailsFields = getExportDetailsFields();
    var name = window.parent.name;
    var params = {
        exportData: exportedData, exportedFields: exportedFields, exportName: exportType, groupId: groupId, varianceType: varianceType,
        createdBy: name, exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture(), exportDetailsFields: exportDetailsFields,
        controllerName: 'IdeasWithVariance',
    }
    const url = 'Reports/IdeasWithVarianceExport';
    const request = postAxios(url, { params: params });
    return {
        type: 'GET_RISK_RATERS_EXPORT',
        payload: request
    }
};
const getTrackingDashboardVariance = (projectId, groupId, timeStamps, singleRowForMultigroupIdea) => {
    let params = { callTime: new Date() };
    const currentTimeStamp = getMomentTimeStamp(new Date());
    let timeStamp;
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);
    } else {
        singleRowForMultigroupIdea = false;
        timeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
    }
    loghelper.consoleTime('getTrackingDashboardVariance', 1, 3);
    const url = 'Implementation/GetTrackingDashboardVariance/' + groupId + projectId + '-' + timeStamp + '?singleRowForMultigroupIdea=' + singleRowForMultigroupIdea;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_TRACKING_DASHBOARD_VARIANCE',
        payload: request
    }
};

export const getIdeasWithVariance = (groupId, valueType, totalType, period, isTracking) => {
    var params = {
        groupId: groupId, valueType: valueType, totalType: totalType, period: period, isTracking: isTracking
    }
    const url = 'Implementation/GetIdeasWithVariance';
    const request = postAxios(url, { params: params });
    return [{
        type: 'IDEAS_WITH_VARIANCE',
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
