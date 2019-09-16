import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../../actions/actionTypes';
import { getEntityPayload, getLastProjectId, prepareObjectFromArray } from '../../common/utils';

function getObjectArray(data) {
    return [{
        IdeaGroupId: data.IdeaGroupId,
        Scratchpad: data.Scratchpad
    }]
}

const updateIdeaGroup = (state, fieldName, configData) => { // ideaId, fieldName, fieldText
    var stateObj;
    switch (fieldName) {
        case 'Scratchpad':
            stateObj = Object.assign({}, state);
            stateObj[configData.entityId].Scratchpad = configData.fieldValue;
            return stateObj;
        default:
            return state;
    }
};


const updatePushedData = (state, pushedData) => {
    let newState = Object.assign([], state);

    pushedData.forEach(item => {
        if (newState[item.IdeaGroupId]) {
            newState = _.merge({}, state, prepareObjectFromArray(getObjectArray(item), ['IdeaGroupId']));
        }
    });

    return update(state, { $set: newState });
};

const updateEntitiesList = (state, payloadData) => {
    let newState = Object.assign([], state);
    let pushedData = [];
    if (payloadData.length > 0) {
        _.forEach(payloadData, (item) => {
            pushedData = getEntityPayload(item.Data, 'IdeaGroupScratchpad');
            if (pushedData[0].length > 0) {
                newState = updatePushedData(state, pushedData[0])
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

const ideaGroupScratchpad = (state = [], action, entireState) => {
    let parsedData;
    switch (action.type) {
        case actionTypes.GET_IDEA_DETAIL_DATA:
            if (!action.payload.data) return state;
            return _.merge({}, state, prepareObjectFromArray(getObjectArray(action.payload.data.Scratchpad), ['IdeaGroupId']));

        case 'GET_IDEA_DETAILS':
            if (!action.payload.data) return state;
            parsedData = JSON.parse(action.payload.data).Scratchpad;
            return _.merge({}, state, prepareObjectFromArray(getObjectArray(parsedData), ['IdeaGroupId']));
        case 'GET_IDEAGROUP_SCRATCHPAD':
            if (!action.payload.data) return state;
            parsedData = action.payload.data;
            return _.merge({}, state, prepareObjectFromArray(getObjectArray(parsedData), ['IdeaGroupId']));
        // case 'UPDATE_IDEAGROUP_SCRATCHPAD_DATA':
        //     if (!action.payload.data) return state;
        //     const configData = JSON.parse(action.payload.config.data);
        //     const fieldName = configData.fieldName;
        //     return { ...state, ideaGroupScratchpads: updateIdeaGroup(state, fieldName, configData) };

        case actionTypes.PUSH_DATA:
            if (!action.payload) return state;
            return updatePushData(state, action, entireState);

        default:
            return state;
    }
};

export default ideaGroupScratchpad;
