import { getMomentTimeStamp, isEmpty2 } from '../common/utils';
import * as actionTypes from './actionTypes';
import { getAxios, postAxios } from './axiosActions';
import { showCreateNewItemNotification, hideNotification2 } from './notification';

export const getSessionIdeas = (sessionId) => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_TIMESTAMPS',
        payload: request
    },
    (dispatch) => {
        dispatch(getSessionIdeaData(sessionId));
    }]
};

const getSessionIdeaData = (sessionId) => {
    let params = { callTime: new Date() };
    let url = '';
    var currentTimeStamp = getMomentTimeStamp(new Date());
    url = 'SessionIdeas/GetData/' + sessionId + '-' + currentTimeStamp;
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_SESSION_IDEA_DATA,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }]
};

export const onCreateSessionIdea = (sessionId, topic, description, scratchpad, roughRiskRatingType, roughValue) => {
    return [(dispatch) => {
        dispatch(showCreateNewItemNotification('CreatingIdea'));
    }, (dispatch) => {
        dispatch(onCreateEmptySessionIdea(sessionId, topic, description, scratchpad, roughRiskRatingType, roughValue))
    }]
};

export const onCreateEmptySessionIdea = (sessionId, topic, description, scratchpad, roughRiskRatingType, roughValue) => {
    let params = {
        SessionId: sessionId,
        Topic: topic,
        Description: description,
        Scratchpad: scratchpad,
        RoughRiskRatingType: roughRiskRatingType,
        RoughValue: roughValue
    };
    const url = 'SessionIdeas/Create';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.CREATE_SESSION_IDEA,
        payload: request
    }
};

export const sortSessionIdeaList = (columnName, direction, sortingOn) => {
    return {
        type: 'SESSION_IDEAS_LIST_SORT',
        payload: { column: columnName, direction: direction, sortingOn: sortingOn },
    }
};


export const onUpdateSessionIdea = (sessionIdeaId, fieldName, fieldValue, focusAreaId) => {
    let params = {
        EntityId: sessionIdeaId,
        FieldName: fieldName,
        FieldValue: fieldValue,
        FocusAreaId: !isEmpty2(focusAreaId) ? focusAreaId : null
    };
    const url = 'SessionIdeas/Update';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.UPDATE_SESSION_IDEA,
        payload: request
    }
};

export const showAllSessionIdeas = (value, view) => {
    return {
        type: 'IS_SHOW_ALL_SESSION_IDEAS',
        payload: value,
        view: view
    }
};

export const onBulkUpdateSessionIdea = (sessionIdeaIds, fieldName, fieldValue) => {
    let params = {
        EntityIDs: sessionIdeaIds,
        FieldName: fieldName,
        FieldValue: fieldValue
    };
    const url = 'SessionIdeas/BulkUpdate';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.BULK_UPDATE_SESSION_IDEA,
        payload: request
    }
};

export const onBulkMoveToIdeaList = (sessionIdeaIds, focusAreaId) => {
    let params = {
        entityIds: sessionIdeaIds,
        focusAreaId: !isEmpty2(focusAreaId) ? focusAreaId : null
    };

    const url = 'SessionIdeas/BulkMoveToIdeaList';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.MOVE_BULK_SESSION_IDEAS,
        payload: request
    }
};

export const onBulkDeleteIdeaList = (sessionIdeaIds) => {
    let params = {
        entityIds: sessionIdeaIds,
    };

    const url = 'SessionIdeas/BulkDelete';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.DELETE_BULK_SESSION_IDEAS,
        payload: request
    }
};

export const onDeleteSessionIdea = (sessionIdeaId) => {
    return [(dispatch) => {
        dispatch(showCreateNewItemNotification('DeletingIdea'));
    }, (dispatch) => {
        dispatch(onDeleteSessionIdeaConfirm(sessionIdeaId))
    }]
};

export const onDeleteSessionIdeaConfirm = (sessionIdeaId) => {
    var params = { EntityId: sessionIdeaId }
    const url = 'SessionIdeas/Delete/' + sessionIdeaId;
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.DELETE_SESSION_IDEA,
        payload: request
    }
};
