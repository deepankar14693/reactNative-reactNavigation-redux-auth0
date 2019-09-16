import update from 'immutability-helper';
import * as actionTypes from '../actions/actionTypes';
import AppConfig from '../appConfig';
import { prepareObjectFromArray } from '../common/utils';
import { dashboardFilter } from '../store/configureStoreData';

const dashboardFilterReducer = (state = [], action) => {
    const stateObj = { ...state };
    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
            return update(state, { $set: dashboardFilter() });

        case actionTypes.GET_MASTERDATA:
            let parsedData = action.payload.data;
            let configList = prepareObjectFromArray(parsedData.ProjectConfigList.List, ["Key"]);
            const defaultDashboardPhase = configList['ClientSetting_DefaultDashboardPhase'] ? configList['ClientSetting_DefaultDashboardPhase'].Value : AppConfig.defaultDashboardPhase;
            stateObj.phase = parseInt(defaultDashboardPhase);
            return stateObj;

        case 'DASHBOARD_FILTER':
            stateObj.currentFilter.filterArray = action.payload.filterArray;
            return stateObj;
        case 'CLEAR_DASHBOARD_FILTER':
            stateObj.currentFilter.filterArray = action.payload.filterArray;;
            return stateObj;
        case actionTypes.DASHBOARD_PHASE_CHANGE:
            stateObj.phase = action.payload.phaseNumber;
            return stateObj;
        case 'TASKWEEK_NUMBER_CHANGE':
            stateObj.currentTaskWeekNumber = action.payload.currentTaskWeekNumber;
            return stateObj;

        case actionTypes.DASHBOARD_VALUE_TYPE_CHANGE:
            stateObj.valueType = action.payload;
            return stateObj;

        case actionTypes.DASHBOARD_RECOMMENDATION_TYPE_CHANGE:
            stateObj.recommendationType = action.payload;
            return stateObj;

        case actionTypes.DASHBOARD_DECISION_TYPE_CHANGE:
            stateObj.decisionType = action.payload;
            return stateObj;

        case actionTypes.GET_IDEAIDS_BY_CATEGORIES:
        case actionTypes.GET_IDEAIDS_BY_FUNCTIONALTITLES:
            stateObj.currentFilter.ideaIds = action.payload.data;
            return stateObj;

        default:
            return state;
    }
}

export default dashboardFilterReducer;
