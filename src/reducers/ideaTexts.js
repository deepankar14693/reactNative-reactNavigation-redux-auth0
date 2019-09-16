import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import { getEntityPayload, getLastProjectId, prepareObjectFromArray } from '../common/utils';

function getIdeaTextsArray(data) {
    return [{
        IdeaId: data.IdeaId,
        Scratchpad: data.Scratchpad,
        CurrentState: data.CurrentState,
        RecommendedApproach: data.RecommendedApproach,
        ValuationSummary: data.ValuationSummary,
        RiskSummary: data.RiskSummary,
        MetricsAndMilestones: data.MetricsAndMilestones,
        ImplementationUpdates: data.ImplementationUpdates ? data.ImplementationUpdates : ''
    }]
}

const updateIdeaTexts = (state, fieldName, configData) => { // ideaId, fieldName, fieldText
    const stateObj = { ...state };
    switch (fieldName) {
        case 'Scratchpad':
            stateObj[configData.entityId].Scratchpad = configData.fieldValue;
            return stateObj;
        case 'CurrentState':
            stateObj[configData.entityId].CurrentState = configData.fieldValue;
            return stateObj;
        case 'RecommendedApproach':
            stateObj[configData.entityId].RecommendedApproach = configData.fieldValue;
            return stateObj;
        case 'ValuationSummary':
            stateObj[configData.entityId].ValuationSummary = configData.fieldValue;
            return stateObj;
        case 'RiskSummary':
            stateObj[configData.entityId].RiskSummary = configData.fieldValue;
            return stateObj;
        case 'MetricsAndMilestones':
            stateObj[configData.entityId].MetricsAndMilestones = configData.fieldValue;
            return stateObj;
        case 'ImplementationUpdates':
            stateObj[configData.entityId].ImplementationUpdates = configData.fieldValue;
            return stateObj;
        default:
            return state;
    }
};


const updateIdeaTextData = (state, ideaTextData) => {
    let newState = Object.assign([], state);

    ideaTextData.forEach(item => {
        if (newState[item.IdeaId]) {
            newState = _.merge({}, state, prepareObjectFromArray(getIdeaTextsArray(item), ['IdeaId']));
        }
    });

    return update(state, { $set: newState });
};

const updateEntitiesList = (state, payloadData) => {
    let newState = Object.assign([], state);
    let ideaTextPushedData = [];

    if (payloadData.length > 0) {
        _.forEach(payloadData, (item) => {
            ideaTextPushedData = getEntityPayload(item.Data, 'IdeaText');
            if (ideaTextPushedData[0].length > 0) {
                newState = updateIdeaTextData(state, ideaTextPushedData[0])
            }
        });
        return newState;
    } else {
        return state;
    }
};

const updatePushData = (state, action, entireState) => {
    if (!action.payload) return state;
    var parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });


    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData);
};

const ideaTextsReducer = (state = [], action, entireState) => {
    let parsedData;
    switch (action.type) {
        case actionTypes.GET_IDEA_DETAIL_DATA:
            if (!action.payload) return state;
            return _.merge({}, state, prepareObjectFromArray(getIdeaTextsArray(action.payload.data.TextData), ['IdeaId']));
        case 'GET_IDEA_DETAILS':
            if (!action.payload) return state;
            parsedData = JSON.parse(action.payload.data).TextData;
            return _.merge({}, state, prepareObjectFromArray(getIdeaTextsArray(parsedData), ['IdeaId']));
        case 'GET_IDEATEXTDATA':
            if (!action.payload) return state;
            parsedData = action.payload.data;
            return _.merge({}, state, prepareObjectFromArray(getIdeaTextsArray(parsedData), ['IdeaId']));
        case 'GET_IDEASTEXTDATA':
            if (!action.payload) return state;
            parsedData = action.payload.data;
            const ideaTetxts = prepareObjectFromArray(parsedData, ['IdeaId']);
            return _.merge({}, state, ideaTetxts);
        case 'UPDATE_IDEATEXTS_DATA':
        case 'UPDATE_IDEATEXTS':
            if (!action.payload.data) return state;
            const configData = JSON.parse(action.payload.config.data);
            const fieldName = configData.fieldName;
            return { ...state, ideaTexts: updateIdeaTexts(state, fieldName, configData) };

        case actionTypes.PUSH_DATA:
            if (!action.payload) return state;
            return updatePushData(state, action, entireState);

        default:
            return state;
    }
};

export default ideaTextsReducer;
