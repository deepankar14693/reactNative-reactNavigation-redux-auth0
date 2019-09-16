import update from 'immutability-helper';
import _ from 'lodash';
import { GET_SESSIONS, PROJECT_CHANGE, PUSH_DATA } from '../actions/actionTypes';
import * as loghelper from '../common/loghelper';
import { getEntityPayload, getLastProjectId } from '../common/utils';
import { sessionsData } from '../store/configureStoreData';

const udpateSessions = (sessions, updatedSession) => {
    const updatedSessionIndex = _.findIndex(sessions, { 'SessionId': updatedSession.SessionId });
    if (updatedSessionIndex !== -1) {
        sessions = update(sessions, {
            [updatedSessionIndex]: {
                CreatedBy: { $set: updatedSession.CreatedBy },
                CreatedOn: { $set: updatedSession.CreatedOn },
                Description: { $set: updatedSession.Description },
                EntityId: { $set: updatedSession.EntityId },
                GroupId: { $set: updatedSession.GroupId },
                IdeaCount: { $set: updatedSession.IdeaCount },
                ModifiedBy: { $set: updatedSession.ModifiedBy },
                ModifiedOn: { $set: updatedSession.ModifiedOn },
                Revision: { $set: updatedSession.Revision },
                SessionDate: { $set: updatedSession.SessionDate },
                SessionId: { $set: updatedSession.SessionId },
                SessionNumber: { $set: updatedSession.SessionNumber },
                SessionUserIds: { $set: updatedSession.SessionUserIds },
                SessionUsers: { $set: updatedSession.SessionUsers },
                Title: { $set: updatedSession.Title },
                Status: { $set: updatedSession.Status },
            }
        });
    } else {
        sessions = update(sessions, { $splice: [[0, 0, updatedSession]] });
    }
    return sessions;
};

const updateSessionEntities = (state, data) => {
    var stateObj = Object.assign([], state.sessions);
    if (data[0] && data[0].length > 0) {
        const newData = data[0];
        if (newData && newData.length > 0) {
            const updatedSession = newData[0];
            stateObj = udpateSessions(stateObj, updatedSession);
            return update(state, { sessions: { $set: stateObj } });
        }
    }
    return update(state, { sessions: { $set: stateObj } });
};


const updateEntitiesList = (state, payloadData) => {
    let newStateObject = Object.assign([], state);
    let newData = [];
    let newState = [];

    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        _.forEach(payloadData, (item) => {
            const entityType = item.Data && item.Data.length > 0 ? item.Data[0].EntityType : '';
            newData = getEntityPayload(item.Data, entityType);
            switch (entityType) {
                case 'Session':
                    newState = Object.assign([], updateSessionEntities(newStateObject, newData));
                    newStateObject = Object.assign([], newState);
                    isPushRelevantChange = true;
            }
        });
        if (isPushRelevantChange) {
            return { ...newStateObject, newState };
        } else {
            return state;
        }
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

const sessionsDataReducer = (state = [], action, entireState) => {
    if (action.type === GET_SESSIONS) {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        switch (action.type) {
            case PROJECT_CHANGE:
                return sessionsData;

            case GET_SESSIONS:
                if (!action.payload) return state;
                return update(state, {
                    sessions: { $set: action.payload.data.List }
                });

            case PUSH_DATA:
                if (!action.payload) return state;
                return updatePushData(state, action, entireState);

            default:
                return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === GET_SESSIONS) {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
}

export default sessionsDataReducer;