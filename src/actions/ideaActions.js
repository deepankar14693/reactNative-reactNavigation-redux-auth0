import { getAxios } from "./axiosActions";
import * as actionTypes from "./actionTypes";
// import axios from './axiosActions';
// import axios from 'axios'

export const getIdeaData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/GetSalaryRange';
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_IDEA_DATA,
        payload: request
    }
};

/* import { showNotification2, hideNotification2, showCreateNewItemNotification } from './notification';
import { showLongNotification } from './index';
import { getAxios, postAxios } from './axiosActions';
import { isEmpty2, getMomentTimeStamp, setLocalStorageKey, getLocalStorageKey, fireAndForget } from '../common/utils';
import AppConfig from '../appConfig';
import { filterGroup } from './index';
import * as actionTypes from './actionTypes';
import { groupChanged } from './dashboardActions';
import { sortUserNote, sortUserNoteOnExpendIdea } from './userNotesActions';

export const getIdeasTabData2 = (groupId, isGroupChange, view, noteData) => {
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
        if (view) {
            dispatch(showNotification2('Loading'));
        }

        if (!isEmpty2(groupId)) {
            if (!view) {
                view = 1;
                if (getLocalStorageKey("selectedIdeaView") === null) {
                    setLocalStorageKey("selectedIdeaView", 1);
                    view = 1;
                } else {
                    view = parseInt(getLocalStorageKey("selectedIdeaView"));
                }
            }

            var timeStamps = getState().timeStamps;
            if (groupId === '00000000-0000-0000-0000-000000000000') {
                setLocalStorageKey('ideaView', 'CompanyView');
            } else {
                setLocalStorageKey('ideaView', 'Ideas');
            }
            dispatch(dispatchAllRequest(groupId, view, timeStamps, isGroupChange, noteData));
        }
    }]
};

const dispatchAllRequest = (groupId, view, timeStamps, isGroupChange, noteData) => {
    return (dispatch, getState) => {
        const projectId = getState().ideaGroupFilter.projectId;
        if (isGroupChange) {
            dispatch(filterGroup(groupId, view, isGroupChange));
        }
        dispatch(getIdeaData(groupId, timeStamps, view, noteData, projectId));
    }
};

export const onUpdateIdeaGroupData = (ideaId, ideaGroupId, isPrimary, fieldName, fieldValue, isCurrentGroup) => {
    let params = { entityId: ideaGroupId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue, isPrimary: isPrimary, isCurrentGroup: isCurrentGroup };
    const url = 'IdeaGroups/Update';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.UPDATE_IDEAGROUP_DATA,
        payload: request
    }
};

export const getIdeaData = (groupId, timeStamps, view, noteData, projectId) => {
    let params = { callTime: new Date(), view: view };
    let url = '';

    var currentTimeStamp = getMomentTimeStamp(new Date());
    let userId = getLocalStorageKey('userId') ? getLocalStorageKey('userId').toLowerCase() : AppConfig.env('userId').toLowerCase();
    let permissionTimeStamp = getMomentTimeStamp(timeStamps.PermissionMaster);

    if (groupId === '00000000-0000-0000-0000-000000000000') {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);

        url = 'Ideas/GetIdeaData/' + organizationId + '-' + timeStamp + '-' + userId + '-' + projectId + '-' + permissionTimeStamp;
    } else {
        let ideasTimeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
        url = 'Ideas/GetIdeaData/' + groupId + '-' + ideasTimeStamp + '-' + userId + '-' + permissionTimeStamp;
    }

    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_IDEA_DATA,
        payload: request
    }, (dispatch) => {
        (view === 7 || view === 8 || view === 9 || view === 10 || view === 11 || view === 12) ? dispatch(getImplementationData(groupId, timeStamps, view)) : dispatch(hideNotification2())
    },
    (dispatch) => {
        if (noteData) {
            dispatch(addRelativeOpenedIdeaToNote(noteData));
        }
    }
    ]
};

export const getImplementationData = (groupId, timeStamps, view) => {
    let params = { callTime: new Date(), view: view };
    let url = '';

    var currentTimeStamp = getMomentTimeStamp(new Date());
    let userId = getLocalStorageKey('userId') ? getLocalStorageKey('userId').toLowerCase() : AppConfig.env('userId').toLowerCase();
    let permissionTimeStamp = getMomentTimeStamp(timeStamps.PermissionMaster);

    if (groupId === '00000000-0000-0000-0000-000000000000') {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);

        url = 'Ideas/GetImplementationData/' + organizationId + '-' + timeStamp + '-' + userId + '-' + permissionTimeStamp;
    } else {
        let ideasTimeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
        url = 'Ideas/GetImplementationData/' + groupId + '-' + ideasTimeStamp + '-' + userId + '-' + permissionTimeStamp;
    }

    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_IMPLEMENTATION_DATA',
        payload: request
    }, (dispatch) => {
        dispatch(hideNotification2())
    }]
};

export const getIdeaCustomViewData = (groupId, timeStamps) => {
    let params = { callTime: new Date() };
    let url = '';
    var currentTimeStamp = getMomentTimeStamp(new Date());
    let userId = getLocalStorageKey('userId') ? getLocalStorageKey('userId').toLowerCase() : AppConfig.env('userId').toLowerCase();
    let permissionTimeStamp = getMomentTimeStamp(timeStamps.PermissionMaster);
    if (groupId === '00000000-0000-0000-0000-000000000000') {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        let timeStamp = getMomentTimeStamp(timeStamps.OrganizationIdeas);

        url = 'Ideas/GetIdeaCustomViewData/' + organizationId + '-' + timeStamp + '-' + userId + '-' + permissionTimeStamp;
    } else {
        let ideasTimeStamp = (timeStamps.Groups && timeStamps.Groups[groupId.toLowerCase()]) ? (getMomentTimeStamp(timeStamps.Groups[groupId.toLowerCase()].GroupIdeas)) : currentTimeStamp;
        url = 'Ideas/GetIdeaCustomViewData/' + groupId + '-' + ideasTimeStamp + '-' + userId + '-' + permissionTimeStamp;
    }
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_IDEA_CUSTOMVIEW_DATA',
        payload: request
    }, (dispatch) => {
        dispatch(hideNotification2())
    }]
};

export const getIdeaDetailData = (ideaId, isComprehensive, ideaNumber, tabType) => {
    let params = { callTime: new Date() };
    const url = 'Ideas/GetIdeaDetailData/' + ideaId + '-' + getMomentTimeStamp();
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_IDEA_DETAIL_DATA,
        payload: request
    }, ,
    (dispatch) => {
        if (isComprehensive === true) {
            dispatch(sortUserNoteOnExpendIdea(ideaId, ideaNumber, tabType));
        }
    }
    ]
};

export const getAnnualValues = (ideaId) => {
    let params = { callTime: new Date() };
    const url = 'LineItems/GetAnnualValues/' + ideaId + '-' + getMomentTimeStamp();
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_ANNUAL_VALUES,
        payload: request
    }
};
export const getIdeasDetailData = (ideaNumbers) => {
    let params = { ideaNumbers: ideaNumbers };
    const url = 'Ideas/GetIdeasDetailData';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.GET_IDEA_DETAIL_DATA,
        payload: request
    }
};

export const setIdeasOnPageCount = (value, view) => {
    return {
        type: 'SET_IDEA_COUNTONPAGE',
        payload: value,
        view: view
    }
};

export const updateIdeaCount = (value, view) => {
    return {
        type: 'IDEAGROUP_COUNT',
        payload: value,
        view: view
    }
};

export const addRelativeOpenedIdeaToNote = (relativeOpenedIdeaToNote) => {
    return {
        type: 'ADD_OPENED_IDEA_NOTE',
        payload: relativeOpenedIdeaToNote,
    }
};

export const removeRelativeOpenedIdeaToNote = () => {
    return {
        type: 'REMOVE_OPENED_IDEA_NOTE',
    }
};

export const setSortingOnViewChange = (view) => {
    return {
        type: 'SET_IDEAGROUP_SORTING_ONVIEWCHANGE',
        payload: view
    }
};

export const pageClick = (pageNo, view) => {
    return [{
        type: 'PAGE_CHANGE_IDEAGROUPS',
        payload: pageNo,
        view: view
    },
    (dispatch) => {
        dispatch(sortUserNote());
    }]
};

export const resetPaging = (view) => {
    return {
        type: 'RESET_PAGING_IDEAGROUPS',
        view: view
    }
}

export const sortIdeaGroupList = (columnName, direction, sortingOn, view, isCustonProperty) => {
    return {
        type: 'IDEAGROUP_LIST_SORT',
        payload: { column: columnName, direction: direction, sortingOn: sortingOn },
        view: view,
        isCustonProperty: isCustonProperty ? isCustonProperty : false
    }
};

export const sortImplementaionIdeaGroupsList = (column, direction) => {
    return {
        type: 'SORT_IMPLEMENTATION_IDEA_GROUPS',
        payload: { column: column, direction: direction },
    }
};

export const sortIdeaGroupListSCR = (value, view) => {
    return {
        type: 'SCR_SORT_IDEAGROUP',
        payload: value,
        view: view
    }
};

export const toggleCheckBoxIdeaGroup = (ideaGroupId, checked, view) => {
    return {
        type: 'TOGGLE_CHECKBOX_IDEAGROUP',
        payload: ideaGroupId,
        checked: checked,
        view: view
    }
};

export const toggleAllCheckBoxIdeaGroupOnePage = (ideaGroupIds, checked, view) => {
    return {
        type: 'TOGGLE_ALL_CHECKBOX_IDEAGROUP_ONEPAGE',
        ideaGroupIds: ideaGroupIds,
        checked: checked,
        view: view
    }
};

export const uncheckAllCheckBoxIdeaGroups = (view) => {
    return {
        type: 'UNCHECK_ALL_CHECKBOX_IDEAGROUP',
        view: view
    }
};

export const toggleSingleRowForMultigroupIdea = (value) => {
    return {
        type: 'TOGGLE_SINGLE_ROW_FOR_MULTIGROUP_IDEA',
        payload: value
    }
};

export const toggleShowCompletedImplementationIdeas = (value) => {
    return {
        type: 'TOGGLE_SHOW_COMPLETE_IMPLEMENTATION_IDEAS',
        payload: value
    }
};

export const getArchivedIdeaData = (groupId, ideaView) => {
    let params = { callTime: new Date() };
    let url = '';
    if (ideaView !== "CompanyView") {
        url = 'Ideas/GetArchivedIdeaData/' + groupId + '-' + getMomentTimeStamp();
    } else {
        let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
        url = 'Ideas/GetArchivedIdeaData/' + organizationId + '-' + getMomentTimeStamp();
    }

    const request = getAxios(url, { params: params });
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, {
        type: 'GET_ARCHIVED_IDEADATA',
        payload: request
    }]
};

export const getSharedAndTransferedIdeaData = (groupId) => {
    let params = { callTime: new Date() };

    const url = 'Ideas/GetTransferIdeaData/' + groupId + '-' + getMomentTimeStamp();

    const request = getAxios(url, { params: params });
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, {
        type: actionTypes.GET_SHAREDANDTRANSFERED_IDEA_DATA,
        payload: request
    }]
};

export const onCreateLinkedGroupData = (ideaId, groupId, roughValue, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, roughValue: roughValue, notes: notes, scratchpad: '' };
    const url = 'IdeaGroups/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_LINKEDGROUP_DATA',
        payload: request
    }
};

export const onCreateITLinkedGroupData = (ideaId, groupId, roughValue, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, roughValue: roughValue, notes: notes, scratchpad: '' };
    const url = 'IdeaGroups/CreateITLinkedGroup';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_ITLINKEDGROUP_DATA',
        payload: request
    }
};

export const onChangeRoughValueData = (ideaGroupId, fieldName, fieldValue, isCurrentGroup, ideaId) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue, isCurrentGroup: isCurrentGroup, ideaId: ideaId };
    const url = 'IdeaGroups/ChangeRoughValue';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_DATA',
        payload: request
    }
};

export const onSendIdeaGroupNotificationData = (ideaId, ideaGroupId, isPrimary, fieldName, fieldValue, isCurrentGroup, notes, roughValue) => {
    let params = { entityId: ideaGroupId, Status: fieldValue, Notes: notes, RoughValue: roughValue };
    const url = 'IdeaGroups/UpdateLinkedGroupStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_LINKEDGROUPSTATUS_DATA',
        payload: request
    }
};

export const onDeleteLinkedGroupData = (ideaGroupId, ideaId, groupId) => {
    var params = { IdeaGroupId: ideaGroupId, IdeaId: ideaId, GroupId: groupId }
    const url = 'IdeaGroups/Delete/' + ideaGroupId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_IDEAGROUP_DATA',
        payload: request
    }
};

export const onDeleteAcceptedLinkedGroupData = (ideaGroupId, ideaId, groupId) => {
    var params = { IdeaGroupId: ideaGroupId, IdeaId: ideaId, GroupId: groupId }
    const url = 'IdeaGroups/Delete/' + ideaGroupId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_ACCEPTED_IDEAGROUP_DATA',
        payload: request
    }
};

export const onAddITCostingGroupWithDocumentData = (roughValue, notes, attachmentId, files, entityId, entityType, category, description) => {
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
        type: 'CREATE_ITCOSTINGGROUP_DATA',
        payload: request
    }
};

export const onRemoveITCostingData = (ideaId) => {
    let params = { ideaId: ideaId };
    const url = 'Ideas/RemoveITCosting';
    const request = postAxios(url, { params: params });
    return {
        type: 'REMOVE_ITCOSTINGGROUP_DATA',
        payload: request
    }
};

export const onSendIdeaNotificationData = (ideaId, fieldName, fieldValue, notes, ITRoughValue) => {
    let params = { entityId: ideaId, Status: fieldValue, Notes: notes, ITRoughValue: ITRoughValue };
    const url = 'Ideas/UpdateITStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_ITSTATUS_DATA',
        payload: request
    }
};

export const onUpdateIdeaData = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_DATA',
        payload: request
    }
};

export const onChangeITRoughValueData = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/ChangeITRoughValue';

    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_DATA',
        payload: request
    }
};

export const onRequestArchiveData = (ideaId, isArchivePending, ArchiveRequestNote, fieldName) => {
    let params = { ideaId: ideaId, isArchivePending: isArchivePending, ArchiveRequestNote: ArchiveRequestNote, fieldName: fieldName };
    const url = 'Ideas/RequestArchive';
    const request = postAxios(url, { params: params });
    return {
        type: 'REQUEST_ARCHIVE_IDEA_DATA',
        payload: request
    }
};

export const getIdeaHistoryData = (ideaNumber) => {
    let params = { callTime: new Date() };
    const url = 'EventStore/GetIdeaHistory/' + ideaNumber + '?d=' + new Date().getTime();
    const request = getAxios(url, { params: params });
    return [
        (dispatch, getState) => { dispatch(showLongNotification('Loading')); },
        {
            type: 'GET_IDEA_HISTORY_DATA',
            payload: request
        },
        (dispatch, getState) => {
            dispatch(hideNotification2())
        }
    ]
};

export const clearIdeaHistoryData = () => {
    return {
        type: 'CLEAR_IDEA_HISTORY_DATA'
    }
};

export const onUpdateIdeaGroupPlanLockData = (ideaId, fieldName, fieldValue) => {
    let params = { ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    var url = 'IdeaGroups/LockPlan';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_DATA',
        payload: request
    }
};

export const onUpdateIdeaGroupScratchpadData = (ideaGroupId, ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaGroupId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'IdeaGroups/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_SCRATCHPAD_DATA',
        payload: request
    }
};

export const onUpdateIdeaTextsData = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Ideas/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEATEXTS_DATA',
        payload: request
    }
};

export const onCreateIdeaCustomFieldData = (ideaId, fieldType, fieldNumber, fieldName, fieldValue, ideaFieldName, ideaFieldLabel) => {
    if (fieldType === 1 || (fieldType === 3 && fieldValue === ' ')) fieldValue = fieldValue ? fieldValue.trim() : '';
    let params = { ideaId: ideaId, fieldType: fieldType, fieldNumber: fieldNumber, fieldName: fieldName, fieldValue: fieldValue, ideaFieldName: ideaFieldName, ideaFieldLabel: ideaFieldLabel };
    const url = 'IdeaCustomField/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEACUSTOMFIELD_DATA',
        payload: request
    }
};

export const onUpdateIdeaCustomFieldData = (ideaId, fieldType, fieldNumber, fieldName, fieldValue, ideaFieldName, ideaFieldLabel) => {
    if (fieldType === 1 || (fieldType === 3 && fieldValue === ' ')) fieldValue = fieldValue ? fieldValue.trim() : '';
    let params = { ideaId: ideaId, fieldType: fieldType, fieldNumber: fieldNumber, fieldName: fieldName, fieldValue: fieldValue, ideaFieldName: ideaFieldName, ideaFieldLabel: ideaFieldLabel };
    const url = 'IdeaCustomField/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEACUSTOMFIELD_DATA',
        payload: request
    }
};

export const onUpdateIdeaGroupCustomFieldData = (ideaId, fieldType, fieldNumber, fieldName, fieldValue, ideaFieldName, ideaFieldLabel, currentGroupId) => {
    if (fieldType === 1 || (fieldType === 3 && fieldValue === ' ')) fieldValue = fieldValue ? fieldValue.trim() : '';
    let params = { ideaId: ideaId, groupId: currentGroupId, fieldType: fieldType, fieldNumber: fieldNumber, fieldName: fieldName, fieldValue: fieldValue, ideaFieldName: ideaFieldName, ideaFieldLabel: ideaFieldLabel };
    const url = 'IdeaGroups/UpdateCustomField';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEAGROUP_CUSTOMFIELD_DATA',
        payload: request
    }
};

export const onChangeRoughRiskRatingTypeData = (ideaId, fieldName, fieldValue) => {
    let params = { entityId: ideaId, fieldName: fieldName, fieldValue: fieldValue };

    const url = 'Ideas/ChangeRoughRiskRatingType';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_DATA',
        payload: request
    }
};

export const onAddRiskRatingData = (riskRater, riskRatingType) => {
    //(riskRatingId, ideaId, groupId, roleType, riskRatingType)
    let params = { ideaId: riskRater.IdeaId, groupId: riskRater.GroupId, roleType: riskRater.RoleType, userId: riskRater.UserId, riskRatingType: riskRatingType };
    const url = 'RiskRatings/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_RISKRATING_DATA',
        payload: request
    }
};

export const onUpdateRiskRatingData = (entityId, ideaId, fieldName, fieldValue, roleType, isPrimaryGL) => {
    let params = { entityId: entityId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue, roleType: roleType, isPrimaryGL: isPrimaryGL };
    //let params = { riskRatingId: riskRatingId, riskRatingType: riskRatingType };

    const url = 'RiskRatings/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_RISKRATING_DATA',
        payload: request
    }
};

export const onChangeRiskStatusData = (entityId, fieldName, fieldValue) => {
    let params = { entityId: entityId, fieldName: fieldName, fieldValue: fieldValue };

    const url = 'Ideas/ChangeRiskStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_DATA',
        payload: request
    }
};

export const onAddRiskRatersData = (ideaId, riskRaters, isSecondaryRating) => {
    //(riskRatingId, ideaId, groupId, roleType, riskRatingType)
    //var riskRaters = [{ userId: AppConfig.userId, roleType: 1 }, { userId: AppConfig.userId, roleType: 2 }];
    //let params = { 'riskRaters': riskRaters};
    let params = { ideaId: ideaId, riskRaters: { 'riskRaterList': riskRaters }, isSecondaryRating: isSecondaryRating };
    const url = 'RiskRatings/CreateMultiple';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_RISKRATERS_DATA',
        payload: request
    }
};

export const getIdeaIdsByCategories = (groupId, category) => {
    let params = { callTime: new Date() };
    const url = 'Ideas/GetIdeaIdsByCategories/' + getMomentTimeStamp() + '?groupId=' + groupId + '&category=' + encodeURIComponent(category);
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_IDEAIDS_BY_CATEGORIES,
        payload: request
    }
};

export const getIdeaIdsByFunctionalTitles = (groupId, functionalTitleId) => {
    let params = { callTime: new Date() };
    const url = 'Ideas/GetIdeaIdsByFunctionalTitles/' + getMomentTimeStamp() + '?groupId=' + groupId + '&functionalTitleId=' + functionalTitleId;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_IDEAIDS_BY_FUNCTIONALTITLES,
        payload: request
    }
};

export const onAddIdeaRecommendationData = (ideaId, groupId, roleType, userId, recommendationType, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, roleType: roleType, userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId'), recommendationType: recommendationType, notes: notes };
    const url = 'Recommendations/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA_RECOMMENDATION_DATA',
        payload: request
    }
};

export const onUpdateIdeaRecommendationData = (entityId, ideaId, groupId, fieldName, fieldValue) => {
    let params = { entityId: entityId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'Recommendations/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_RECOMMENDATION_DATA',
        payload: request
    }
};

export const onAddIdeaSCDecisionData = (ideaId, decisionType, notes) => {
    let params = { ideaId: ideaId, decisionType: decisionType, notes: notes, userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId') };
    const url = 'SCDecisions/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA_SCDECISION_DATA',
        payload: request
    }
};

export const onUpdateIdeaSCDecisionData = (entityId, ideaId, fieldName, fieldValue) => {
    let params = { entityId: entityId, ideaId: ideaId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'SCDecisions/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_SCDECISION_DATA',
        payload: request
    }
};

export const onAddIdeaSCMReviewData = (ideaId, groupId, userId, isReviewed, notes) => {
    let params = { ideaId: ideaId, groupId: groupId, notes: notes, userId: userId ? userId : null, isReviewed: isReviewed };
    const url = 'SCMReviews/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_IDEA_SCMREVIEW_DATA',
        payload: request
    }
};

export const onUpdateIdeaSCMReviewData = (entityId, ideaId, groupId, fieldName, fieldValue, SCMReviewId) => {
    let params = { entityId: entityId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue };
    const url = 'SCMReviews/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_IDEA_SCMREVIEW_DATA',
        payload: request
    }
};

export const changeSCMReviewNotRequiredData = (entityId, ideaId, groupId, fieldName, fieldValue, SCMReviewId) => {
    let params = { entityId: entityId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue, SCMReviewId: SCMReviewId };
    const url = 'IdeaGroups/ChangeSCMReviewNotRequired';
    const request = postAxios(url, { params: params });
    return {
        type: 'CHANGE_SCMREVIEWNOTREQUIRED_DATA',
        payload: request
    }
};

export const onSetValueStatusData = (ideaGroupId, fieldName, fieldValue, isIT, isCurrentGroup, ideaId) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue, isCurrentGroup: isCurrentGroup, ideaId: ideaId };
    let url;
    if (isIT) {
        url = 'Ideas/SetITValueStatus';
    } else {
        url = 'IdeaGroups/SetValueStatus';
    }
    const request = postAxios(url, { params: params });
    return {
        type: isIT ? 'UPDATE_IDEA_DATA' : 'UPDATE_IDEAGROUP_DATA',
        payload: request
    }
};

export const onRemoveValueStatusData = (ideaGroupId, fieldName, fieldValue, isIT, isCurrentGroup, ideaId) => {
    let params = { entityId: ideaGroupId, fieldName: fieldName, fieldValue: fieldValue, isCurrentGroup: isCurrentGroup, ideaId: ideaId };
    let url;
    if (isIT) {
        url = 'Ideas/RemoveITValueStatus';
    } else {
        url = 'IdeaGroups/RemoveValueStatus';
    }
    const request = postAxios(url, { params: params });
    return {
        type: isIT ? 'UPDATE_IDEA_DATA' : 'UPDATE_IDEAGROUP_DATA',
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
    return [{
        type: 'UPDATE_EXPECTED_IMPACTS_DATA',
        payload: request
    },
    (dispatch) => {
        dispatch(hideNotification2());
    }]

}

export const bulkUpdateExpectedImpacts = (ideaIds, expectedPEImpacts, expectedNPEImpacts, expectedRevenueImpacts, assignBy, deletedImpacts) => {
    let params = {
        IdeaIds: ideaIds,
        ExpectedNPEImpacts: expectedNPEImpacts,
        ExpectedPEImpacts: expectedPEImpacts,
        ExpectedRevenueImpacts: expectedRevenueImpacts,
        AssignMode: assignBy,
        DeletedExpectedPEImpacts: deletedImpacts.deletedPE,
        DeletedExpectedNPEImpacts: deletedImpacts.deletedNPE,
        DeletedExpectedRevenueImpacts: deletedImpacts.deletedREV,
        DeletedIdeaIds: deletedImpacts.deletedIdeaIds
    };

    const url = 'Ideas/BulkUpdateExpectedImpacts';
    const request = postAxios(url, { params: params });
    return [{
        type: 'UPDATE_EXPECTED_IMPACTS_DATA',
        payload: request
    },
    (dispatch) => {
        dispatch(hideNotification2());
    }]
}

export const updateExpectedImpactsData = (ideaId, expectedPEImpacts, expectedNPEImpacts, expectedRevenueImpacts, mayRequireLinkedGroups) => {
    return [showNotification2('Saving...')
        , (dispatch) => {
            dispatch(updateExpectedImpacts(ideaId, expectedPEImpacts, expectedNPEImpacts, expectedRevenueImpacts, mayRequireLinkedGroups));
        }]
};

export const bulkUpdateExpectedImpactsData = (ideaIds, expectedPEImpacts, expectedNPEImpacts, expectedRevenueImpacts, assignBy, deletedImpacts) => {
    return [showNotification2('Saving...')
        , (dispatch) => {
            dispatch(bulkUpdateExpectedImpacts(ideaIds, expectedPEImpacts, expectedNPEImpacts, expectedRevenueImpacts, assignBy, deletedImpacts));
        }]
};

export const onAddLineItemValueRampData = (entityId, rampType, rampMonths, rampvalues, lineItemType) => {
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
        type: 'ADD_LINEITEM_VALUE_RAMP_DATA',
        payload: request
    }
};

export const onAddPersonnelLineItemData = (lineItem, ideaGroupId, isCurrentGroup) => {
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
        type: !params.IsImplementation ? 'CREATE_PERSONNEL_LINEITEM_DATA' : 'CREATE_PERSONNEL_LINEITEM_IMPLEMENTATION_DATA',
        payload: request
    }
};

export const onUpdatePersonnelLineItemData = (entityId, ideaGroupId, ideaId, groupId, fieldName, fieldValue, isITLineItem, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue,
        isITLineItem: isITLineItem, isCurrentGroup: isCurrentGroup
    };
    const url = 'PersonnelLineItems/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_PERSONNEL_LINEITEM_DATA',
        payload: request
    }
};


export const arrangeLineItemsData = (lineItemIDs, lineItemType, isIT) => {
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
        type: 'ARRANGE_LINEITEMS_DATA',
        payload: request
    }
}

export const onUpdatePESalaryRangeData = (entityId, ideaGroupId, ideaId, groupId, fieldName, salaryRange, averageSalary, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, salaryRange: salaryRange,
        averageSalary: averageSalary, isCurrentGroup: isCurrentGroup
    };

    const url = 'PersonnelLineItems/ChangeSalaryRange';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_PERSONNEL_LINEITEM_DATA',
        payload: request
    }
};

export const onAddNonPersonnelLineItemData = (lineItem, ideaGroupId, isCurrentGroup) => {
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
        type: !params.IsImplementation ? 'CREATE_NONPERSONNEL_LINEITEM_DATA' : 'CREATE_NONPERSONNEL_LINEITEM_IMPLEMENTATION_DATA',
        payload: request
    }
};

export const onUpdateNonPersonnelLineItemData = (entityId, ideaGroupId, ideaId, groupId, fieldName, fieldValue, isITLineItem, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, fieldValue: fieldValue,
        isITLineItem: isITLineItem, isCurrentGroup: isCurrentGroup
    };
    const url = 'NonPersonnelLineItems/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_NONPERSONNEL_LINEITEM_DATA',
        payload: request
    }
};

export const onUpdateNPEIsRecurringData = (entityId, ideaGroupId, ideaId, groupId, fieldName, isRecurring, amortizationPeriod, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, isRecurring: isRecurring,
        amortizationPeriod: amortizationPeriod, isCurrentGroup: isCurrentGroup
    };

    const url = 'NonPersonnelLineItems/ChangeIsRecurring';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_NONPERSONNEL_LINEITEM_DATA',
        payload: request
    }
};

export const onAddRevenueLineItemData = (lineItem, ideaGroupId, isCurrentGroup) => {
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
        type: !params.IsImplementation ? 'CREATE_REVENUE_LINEITEM_DATA' : 'CREATE_REVENUE_LINEITEM_IMPLEMENTATION_DATA',
        payload: request
    }
};

export const onUpdateRevenueLineItemData = (entityId, ideaGroupId, ideaId, groupId, fieldName, fieldValue, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName,
        fieldValue: fieldValue, isCurrentGroup: isCurrentGroup
    };
    const url = 'RevenueLineItems/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_REVENUE_LINEITEM_DATA',
        payload: request
    }
};

export const onUpdateRevenueIsRecurringData = (entityId, ideaGroupId, ideaId, groupId, fieldName, isRecurring, amortizationPeriod, isCurrentGroup) => {
    let params = {
        entityId: entityId, ideaGroupId: ideaGroupId, ideaId: ideaId, groupId: groupId, fieldName: fieldName, isRecurring: isRecurring,
        amortizationPeriod: amortizationPeriod, isCurrentGroup: isCurrentGroup
    };

    const url = 'RevenueLineItems/ChangeIsRecurring';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_REVENUE_LINEITEM_DATA',
        payload: request
    }
};

export const onDeletePersonnelLineItemData = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'PersonnelLineItems/Delete/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_PERSONNEL_LINEITEM_DATA',
        payload: request
    }
};

export const onDeleteNonPersonnelLineItemData = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'NonPersonnelLineItems/Delete/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_NONPERSONNEL_LINEITEM_DATA',
        payload: request
    }
};



export const onDeleteRevenueLineItemData = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'RevenueLineItems/Delete/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_REVENUE_LINEITEM_DATA',
        payload: request
    }
};

export const onCopyPersonnelLineItemData = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'PersonnelLineItems/Copy/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_PERSONNEL_LINEITEM_DATA',
        payload: request
    }
};

export const onCopyNonPersonnelLineItemData = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'NonPersonnelLineItems/Copy/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_NONPERSONNEL_LINEITEM_DATA',
        payload: request
    }
};

export const onCopyRevenueLineItemData = (lineItemId) => {
    var params = { EntityId: lineItemId }
    const url = 'RevenueLineItems/Copy/' + lineItemId;
    const request = postAxios(url, { params: params });
    return {
        type: 'COPY_REVENUE_LINEITEM_DATA',
        payload: request
    }
};

export const onUpdateHighlightsData = (ideaIDs, groupId, isHighlighted) => {
    let params = {
        IdeaIDs: ideaIDs,
        GroupId: groupId,
        HighlightFlag: isHighlighted
    }
    const url = 'IdeaGroups/UpdateHighlights';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_HIGHLIGHTS_DATA',
        payload: request
    }
};

export const onBulkIdeaArchiveData = (ideaIDs, status, requestNote) => {
    let params = { ideaIDs: ideaIDs, isArchivePending: 1, ArchiveRequestNote: requestNote, fieldName: 'ArchiveRequestNote' };
    const url = 'Ideas/BulkRequestArchive';
    const request = postAxios(url, { params: params });
    return {
        type: 'REQUEST_BULK_ARCHIVE_IDEA_DATA',
        payload: request
    }
};

export const onShareIdeasData = (originalGroupId, newGroupIds, originalIdeaIds, note) => {
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
        type: 'REQUEST_BULK_SHARE_IDEA_DATA',
        payload: request
    }
};

export const onTransferIdeasData = (originalGroupId, targetGroupId, originalIdeaIds, note) => {
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
        type: 'REQUEST_BULK_TRANSFER_IDEA_DATA',
        payload: request
    }
};

export const onBulkIdeaStatusUpdateData = (ideaIDs, status) => {
    let params = { entityIds: ideaIDs, fieldName: 'Status', fieldValue: status }
    const url = 'Ideas/BulkUpdate';
    const request = postAxios(url, { params: params });
    return {
        type: 'BULK_UPDATE_DATA',
        payload: request
    }
};

export const onCreateEmptyIdea = (groupId) => {
    return [(dispatch) => {
        dispatch(showCreateNewItemNotification('CreatingIdea'));
    }, (dispatch) => {
        dispatch(onCreateEmptyIdeaData(groupId))
    }]
};

const onCreateEmptyIdeaData = (groupId) => {
    let params = {
        groupId: groupId
    };
    const url = 'Ideas/Create';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.CREATE_IDEA_SIMPLIFIED_EMPTY_IDEA,
        payload: request
    }
};

export const onBulkIdeaTransferData = (ideaIDs, status, groupId, sourceGroupId) => {
    let params = { IdeaIds: ideaIDs, GroupId: groupId, SourceGroupId: sourceGroupId, Status: status }
    const url = 'Ideas/ChangeTransferIdeasStatus';
    const request = postAxios(url, { params: params });
    return {
        type: 'BULK_TRANSFER_DATA',
        payload: request
    }
};


export const onBulkLinkedGroupStatusUpdateData = (ideaIDs, status, currentGroup) => {
    let params = {
        entityIDs: [currentGroup],
        ideaIDs: ideaIDs,
        fieldName: 'LinkedGroupStatus',
        fieldValue: status,
    }
    const url = 'IdeaGroups/BulkUpdate';
    const request = postAxios(url, { params: params });
    return {
        type: 'BULK_UPDATE_IDEAGROUPS_DATA',
        payload: request
    }
};

export const clearNewIdeas = () => {
    return {
        type: actionTypes.CLEAR_NEW_IDEAS,
    }
}

export const toggleCompletionTrackerIdeas = (isOpen) => {
    return {
        type: 'TOGGLE_COMPLETION_TRACKER_IDEAS',
        isOpen: isOpen
    }
}

export const toggleCompletionTrackerLineItems = (isOpen) => {
    return {
        type: 'TOGGLE_COMPLETION_TRACKER_LINEITEMS',
        isOpen: isOpen
    }
}

// export const onUpdateLineItemFields = (entityId, fieldName, fieldValue, ideaId, groupId, lineItemType) => {
//     return [(dispatch, getState) => {
//         dispatch(showNotification2('Saving'))
//     }, (dispatch, getState) => {
//         dispatch(onUpdateLineItemData(entityId, fieldName, fieldValue, ideaId, groupId, lineItemType))
//     }]
// };

export const onUpdateLineItemFields = (entityId, fieldName, fieldValue, ideaId, groupId, lineItemType) => {
    let params = { entityId: entityId, fieldName: fieldName, fieldValue: fieldValue, ideaId: ideaId, groupId: groupId };
    let url = '';
    let actionType = '';
    switch (lineItemType) {
        case 1: url = 'RevenueLineItems/Update'; actionType = 'UPDATE_REVENUE_LINEITEM_DATA'; break;
        case 2: url = 'PersonnelLineItems/Update'; actionType = 'UPDATE_PERSONNEL_LINEITEM_DATA'; break;
        case 3: url = 'NonPersonnelLineItems/Update'; actionType = 'UPDATE_NONPERSONNEL_LINEITEM_DATA'; break;
    }
    const request = postAxios(url, { params: params });
    return {
        type: actionType,//'UPDATE_LINEITEM',
        payload: request
    }
};

export const getSingleIdeaData = (ideaId) => {
    let params = { callTime: new Date() };
    const url = 'Ideas/GetSingleIdeaData/' + ideaId;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_SINGLE_IDEA_DATA',
        payload: request
    }
};


//#region 
export const onChangePrimaryGroupOfIdea = (ideaId, newGroupId) => {
    let params = { ideaId: ideaId, newGroupId: newGroupId };
    const url = 'Ideas/ChangePrimaryGroup';
    const request = postAxios(url, { params: params });
    return {
        type: 'CHANGE_PRIMARY_GROUP_OF_IDEA',
        payload: request
    }
};
//#endregion

 */

