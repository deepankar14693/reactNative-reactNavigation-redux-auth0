import * as actionTypes from '../actions/actionTypes';
import { getLastProjectId, getMomentTimeStamp } from '../common/utils';
import { getAxios } from './axiosActions';
import { hideNotification2 } from './notification';


export const getTimingScenarioData = () => {
    let timeStamp = getMomentTimeStamp(); //getMomentTimeStamp(timeStamps.PermissionMaster)
    let params = { callTime: new Date() };
    const projectId = getLastProjectId();

    const url = 'TimingScenario/GetData/' + projectId + '-' + timeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_TIMING_SCENARIOS,
        payload: request
    }
};

export const getTimingScenarioSessionProformaData = (timingScenarioId) => {
    let params = { timingScenarioId: timingScenarioId };
    const url = 'TimingScenario/GetTimingScenarioProformaData?timingScenarioId=' + timingScenarioId;
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_TIMING_SCENARIO_SESSION_PROFORMA_DATA,
        payload: request
    },
    (dispatch) => {
        dispatch(hideNotification2());
    }]
};

export const changePage = (pageNo) => {
    return {
        type: actionTypes.TIMING_SCENARIO_SESSION_PROFORMA_PAGE_CHANGE,
        payload: pageNo
    }

};

export const resetPage = () => {
    return {
        type: actionTypes.TIMING_SCENARIO_SESSION_PROFORMA_RESET_PAGE,
    }
};

export const sessionProformaToggleExpand = (itemId, isExpanded) => {
    return {
        type: actionTypes.TIMING_SCENARIO_SESSION_TOGGLE_EXPAND,
        payload: itemId,
        isExpanded: isExpanded
    }
};

export const sessionProformaToggleCheck = (itemId, parentId, isChecked) => {
    return {
        type: actionTypes.TIMING_SCENARIO_SESSION_TOGGLE_CHECKBOX,
        payload: itemId,
        isChecked: isChecked,
        parentId: parentId
    }
};

export const setDraggedAxisTimingScenarioSummary = (draggedAxis) => {
    return {
        type: actionTypes.TIMING_SCENARIO_SUMMARY_SET_DRAGGED_AXIS,
        payload: draggedAxis,
    }
};

