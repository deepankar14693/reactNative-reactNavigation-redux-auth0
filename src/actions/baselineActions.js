import * as actionTypes from './actionTypes';
import { getAxios, postAxios } from './axiosActions';
import { hideNotification2, showNotification2 } from './notification';

export const groupChanged = () => {
    return {
        type: actionTypes.BL_GROUP_CHANGE
    }
};

export const getBaselineSummary = (groupId, projectId) => {
    let params = { callTime: new Date() };
    const url = 'Baseline/GetBaselineSummary?groupId=' + groupId + '&projectId=' + projectId;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_BASELINESUMMARY,
        payload: request
    }
};

export const getFunctionalTitleMapData = (groupId, projectId) => {
    let params = { callTime: new Date() };
    const url = 'Baseline/GetFunctionalTitleMapData?groupId=' + groupId + '&projectId=' + projectId;
    const request = getAxios(url, { params: params });

    return [{
        type: actionTypes.GET_FUNCTIONALTITLEMAP_DATA,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onChangeJobTitleFT = (groupId, functionalTitleMapId, jobTitle, functionalTitleId, prevFunctionalTitleId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(changeJobTitleFT(groupId, functionalTitleMapId, jobTitle, functionalTitleId, prevFunctionalTitleId))
    }]
};

const changeJobTitleFT = (groupId, functionalTitleMapId, jobTitle, functionalTitleId, prevFunctionalTitleId) => {
    let params = { groupId, functionalTitleMapId, jobTitle, functionalTitleId, prevFunctionalTitleId };
    const url = 'Baseline/MapFunctionalTitle';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.MAP_JOBTITLE_FT,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onAssignPersonnelFT = (groupId, personnelIds, positionIds, functionalTitleId, prevFunctionalTitleIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(assignPersonnelFT(groupId, personnelIds, positionIds, functionalTitleId, prevFunctionalTitleIds))
    }]
};

const assignPersonnelFT = (groupId, personnelIds, positionIds, functionalTitleId, prevFunctionalTitleIds) => {
    let params = { groupId, personnelIds, pIds: positionIds, functionalTitleId, prevFunctionalTitleIds };
    const url = 'Baseline/AssignFunctionalTitle';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.ASSIGN_PERSONNEL_FT,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onResetPersonnelFTs = (groupId, personnelIds, positionIds, prevFunctionalTitleIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(resetPersonnelFTs(groupId, personnelIds, positionIds, prevFunctionalTitleIds))
    }]
};

const resetPersonnelFTs = (groupId, personnelIds, positionIds, prevFunctionalTitleIds) => {
    let params = { groupId, personnelIds, pIds: positionIds, prevFunctionalTitleIds };
    const url = 'Baseline/ResetFunctionalTitle';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.RESET_PERSONNEL_FT,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onSaveFunctionalTitle = (groupId, functionalTitleId, name, fte) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(saveFunctionalTitle(groupId, functionalTitleId, name, fte))
    }]
};

const saveFunctionalTitle = (groupId, functionalTitleId, name, fte) => {
    let params = { groupId, functionalTitleId, name, fte };
    const url = 'Baseline/SaveFunctionalTitle';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.SAVE_FUNCTIONALTITLE,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteFunctionalTitle = (groupId, functionalTitleId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deleteFunctionalTitle(groupId, functionalTitleId))
    }]
};

const deleteFunctionalTitle = (groupId, functionalTitleId) => {
    let params = { groupId, functionalTitleId };
    const url = 'Baseline/DeleteFunctionalTitle';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.DELETE_FUNCTIONALTITLE,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
