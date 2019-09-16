import * as actionTypes from '../actions/actionTypes';
import AppConfig from '../appConfig';
import { getMomentTimeStamp, fireAndForget, setLocalStorageKey, getLastProjectId, getLocalStorageKey } from '../common/utils';
import { getAxios, postAxios } from './axiosActions';

export const getUserNoteData = () => {
    let params = { callTime: new Date() };
    const url = 'UserNotes/TimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.USERNOTES_TIMESTAMP,
        payload: request
    },
    (dispatch, getState) => {
        var timeStamp = getState().notesData.timeStamp;
        dispatch(getUserNotes(timeStamp));
    }]
}

const getUserNotes = (userNoteTimeStamp) => {
    userNoteTimeStamp = getMomentTimeStamp(userNoteTimeStamp);
    let params = { callTime: new Date() };
    let userId = getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId');
    let projectId = getLastProjectId();
    const url = 'UserNotes/GetData/' + userId + '-' + projectId + '-' + userNoteTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_USER_NOTES',
        payload: request
    }
};

export const sortUserNoteOnRenderIdeaList = (ideaNumbers) => {
    return [{
        type: actionTypes.ON_RENDER_IDEALIST,
        ideaNumbers: ideaNumbers
    }, (dispatch) => {
        dispatch(sortUserNote());
    }]
};

export const currentGroupTabClick = (groupName) => {
    return {
        type: actionTypes.CURRENT_GROUP_TAB_CLICK,
        currentGroupTab: groupName
    }
};

export const sortUserNote = () => {
    return {
        type: actionTypes.SORT_USER_NOTE
    }
};

export const sortUserNoteOnExpendIdea = (ideaId, ideaNumber, currentTab) => {
    const expendedIdea = { ideaId: ideaId, ideaNumber: ideaNumber, currentTab: currentTab }
    return {
        type: actionTypes.SORT_USERNOTE_ON_EXPEND_IDEA,
        expendedIdea: expendedIdea
    }
};

export const onCollapseExpandedIdea = () => {
    return {
        type: actionTypes.COLLAPSE_EXPEND_IDEA,
    }
}

export const sortUserNoteOnImplementationViews = (ideaNumbers, view) => {
    return [{
        type: actionTypes.ON_RENDER_IDEALIST,
        ideaNumbers: ideaNumbers
    }, (dispatch) => {
        dispatch(onSortUserNoteOnImplementationViews(view));
    }]
};

export const onSortUserNoteOnImplementationViews = (view) => {
    return {
        type: actionTypes.SORT_USERNOTE_ON_IMPLEMENTATION_VIEWS,
        view: view
    }
};

export const onCreateUserNote = (groupId, referenceItem, notes) => {
    let params = {
        GroupId: groupId,
        ReferenceItem: referenceItem,
        Notes: notes,
    };
    const url = 'UserNotes/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_USER_NOTE',
        payload: request
    }
};

export const onUpdateUserNote = (entityId, fieldName, fieldValue) => {
    let params = {
        EntityId: entityId,
        FieldName: fieldName,
        FieldValue: fieldValue,
    };
    const url = 'UserNotes/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_USER_NOTE',
        payload: request
    }
};

export const onUpdateUserNoteReferenceItem = (entityId, referenceType, referenceNumber) => {
    let params = {
        EntityId: entityId,
        ReferenceType: referenceType,
        ReferenceNumber: referenceNumber,
    };
    const url = 'UserNotes/UpdateReferenceItem';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_USER_NOTE',
        payload: request
    }
};


export const onDeleteUserNote = (entityId) => {
    let params = {
        EntityId: entityId,
    };
    const url = 'UserNotes/Delete/' + entityId;
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_USER_NOTE',
        payload: request
    }
};

export const onRemoveReferenceItem = (entityId) => {
    let params = {
        EntityId: entityId,
    };
    const url = 'UserNotes/RemoveReferenceItem/' + entityId;
    const request = postAxios(url, { params: params });
    return {
        type: 'REMOVE_USER_REFERENCE_ITEM',
        payload: request
    }
};


export const hideNoteNotification = () => {
    return {
        type: 'HIDE_NOTE_NOTIFICATION'
    }
};

export const showNoteNotification = (alertType, message) => {
    return {
        type: 'SHOW_NOTE_NOTIFICATION',
        alertType: alertType,
        message: message
    }
};

export const sortNotes = (columnName, direction, sortingOn, view) => {
    return {
        type: 'SORT_NOTES',
        payload: { column: columnName, direction: direction, sortingOn: sortingOn, view: view },
    }
};

export const setDraggedAxis = (draggedAxis) => {
    return {
        type: 'SET_DRAGGED_AXIS',
        payload: draggedAxis,
    }
};

export const toggleMyNotes = (isShowingMyNotes, groupId) => {
    fireAndForget(AppConfig.baseUrl + 'Ideas/GroupChanged?connectionId=' + getLocalStorageKey('tabId') + '&groupId=' + groupId + '&myNotes=' + isShowingMyNotes);
    setLocalStorageKey('isShowingMyNotes', isShowingMyNotes);
    if (isShowingMyNotes) {
        return [{
            type: 'TOGGLE_MY_NOTES',
            payload: isShowingMyNotes,
        }, (dispatch) => {
            dispatch(getUserNoteData());
        }]
    } else {
        return {
            type: 'TOGGLE_MY_NOTES',
            payload: isShowingMyNotes,
        }
    }

};
