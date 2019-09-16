import * as actionTypes from '../../actions/actionTypes';
import { dahboardData } from '../configureStoreData';
import update from 'immutability-helper';

const dashboardReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
            return dahboardData;

        // case actionTypes.GET_DASHBOARD_OTHER_DATA:
        //     if (action.payload.data) {
        //         return { ...state, data: action.payload.data }
        //     } else {
        //         return state;
        //     }
        case actionTypes.GET_DASHBOARD_OTHER_DATA:
            if (action.payload.data) {
                return { ...state, data: action.payload.data }
            } else {
                return state;
            }

        case 'GET_DASHBOARD_BASELINE_DATA':
            if (action.payload.data) {
                return update(state, { baselineData: { $set: action.payload.data } })
            } else {
                return state;
            }
        case 'GET_DASHBOARD_IDEAS_BY_PROFORMA_DATA':
            if (action.payload.data) {
                return { ...state, proformaDetails: action.payload.data }
            } else {
                return state;
            }
        case 'GET_DASHBOARD_IDEAS_BY_VALUE_COMPONENTS_DATA':
            if (action.payload.data) {
                return { ...state, valueComponentDetails: action.payload.data }
            } else {
                return state;
            }
        case 'GET_DASHBOARD_MULTIGROUP_IDEAS_DATA':
            if (action.payload.data) {
                return { ...state, multiGroupIdeasDetails: action.payload.data }
            } else {
                return state;
            }
        case 'GET_DASHBOARD_FTE_DETAILS_DATA':
            if (action.payload.data) {
                return { ...state, fteDetails: action.payload.data }
            } else {
                return state;
            }
        case 'IDEAS_WITH_VARIANCE':
            if (action.payload.data) {
                return { ...state, ideasWithVarianceData: action.payload.data }
            } else {
                return state;
            }
        case 'EMPTY_FTE_DETAIL_DATA':
            return { ...state, fteDetails: [] }
        case 'EMPTY_MULTIGROUP_IDEAS_DETAIL_DATA':
            return { ...state, multiGroupIdeasDetails: [] }
        case 'EMPTY_VALUE_COMPONENT_DETAIL_DATA':
            return { ...state, valueComponentDetails: [] }
        case 'EMPTY_PROFORMA_DETAIL_DATA':
            return { ...state, proformaDetails: [] }
        case 'EMPTY_DASHBOARD_DETAIL_DATA':
            return { ...state, details: [], details2: [] }
        case 'EMPTY_DASHBOARD_BASLINE_DATA':
            return { ...state, baselineData: [] }
        default:
            return state;
    }
}

export default dashboardReducer;
