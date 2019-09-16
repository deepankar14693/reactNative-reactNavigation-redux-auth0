import * as actionTypes from '../actions/actionTypes';
import { getAxios, postAxios } from './axiosActions';
import AppConfig from '../appConfig';
import { getMomentTimeStamp, getLocalStorageKey } from '../common/utils';


export const getSessionData = () => {
    let timeStamp = getMomentTimeStamp(); //getMomentTimeStamp(timeStamps.PermissionMaster)
    let params = { callTime: new Date() };
    let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    const url = 'Sessions/GetData/' + organizationId + '-' + timeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_SESSIONS,
        payload: request
    }
};

export const onCreateSession = (groupId, sessionDate, title, description, participants) => {
    let params = {
        GroupId: groupId,
        Title: title,
        Description: description,
        SessionDate: sessionDate,
        SessionUserIds: participants,
    };
    const url = 'Sessions/Save';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.CREATE_SESSION,
        payload: request
    }
};

export const sortSessionList = (columnName, direction, sortingOn) => {
    return {
        type: actionTypes.SESSION_LIST_SORT,
        payload: { column: columnName, direction: direction, sortingOn: sortingOn },
    }
};

export const onSaveSessionUsers = (groupId, participants, sessionId) => {
    let params = {
        GroupId: groupId,
        SessionUserIds: participants,
        SessionId: sessionId
    };
    const url = 'Sessions/SaveSessionUsers';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.SAVE_PARTICIPANTS,
        payload: request
    }
};

export const onUpdateSession = (groupId, sessionDate, title, description, participants, sessionId, status) => {
    let params = {
        GroupId: groupId,
        Title: title,
        Description: description,
        SessionDate: sessionDate,
        SessionUserIds: participants,
        SessionId: sessionId,
        Status: status ? status : 1
    };
    const url = 'Sessions/Save';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.UPDATE_SESSION,
        payload: request
    }
};

export const showArchivedSessions = (value) => {
    return {
        type: actionTypes.IS_SHOW_ARCHIVED_SESSIONS,
        payload: value
    }
};