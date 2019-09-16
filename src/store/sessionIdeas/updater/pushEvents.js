import update from 'immutability-helper';
import _ from 'lodash';
import { getEntityPayload, getLastProjectId } from '../../../common/utils';

const updateEntities = (state, data) => {
    let stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        stateObj = _.unionBy(data[0], stateObj, 'EntityId');
    }
    return Object.assign([], ...state, stateObj);
};

const updateEntitiesList = (state, payloadData, entireState) => {
    let sessionIds = _.map(entireState.sessionsData.sessions, 'SessionId');

    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        let relevantPushData = [];
        let newState = [];
        let newStateObject = Object.assign([], state['sessionIdeas']);
        _.forEach(payloadData, (payloadDataItem) => {
            const sessionIdeaPushedData = getEntityPayload(payloadDataItem.Data, 'SessionIdea');
            if (sessionIdeaPushedData[0].length > 0) {
                relevantPushData = _.filter(sessionIdeaPushedData[0], (item) => _.includes(sessionIds, item.SessionId));
                if (relevantPushData.length > 0) {
                    isPushRelevantChange = true;
                }
            }

            if (!isPushRelevantChange && sessionIdeaPushedData[1].length > 0) {
                relevantPushData = _.filter(state.sessionIdeas, (item) => _.includes(sessionIdeaPushedData[1], item.SessionIdeaId));
                if (relevantPushData.length > 0) {
                    isPushRelevantChange = true;
                }
            }

            if (isPushRelevantChange) {
                newState = Object.assign([], updateEntities(newStateObject, sessionIdeaPushedData));
                newStateObject = Object.assign([], newState);
            } else {
                newState = Object.assign([], newStateObject);
            }
        });

        return update(state, {
            sessionIdeas: { $set: newState },
            isLoading: { $set: false }
        });

    } else {
        return state;
    }
};

const PushEvents = (state, action, entireState) => {
    if (!action.payload) return state;
    const parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });

    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData, entireState);
}

export default PushEvents;
