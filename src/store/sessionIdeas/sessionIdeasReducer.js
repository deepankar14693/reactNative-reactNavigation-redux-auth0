import update from 'immutability-helper';
import * as actionTypes from '../../actions/actionTypes';
import PushEvents from './updater/pushEvents';
import { sessionIdeaData } from '../configureStoreData';

const sessionIdeasReducer = (state = [], action, entireState) => {
    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
                return sessionIdeaData;

        case actionTypes.GET_SESSION_IDEA_DATA:
            if (!action.payload.data) return update(state, {
                isLoading: { $set: false }
            });

            return update(state, {
                sessionIdeas: {
                    $set: (
                        action.payload.data.SessionIdeaList.List ? action.payload.data.SessionIdeaList.List : []
                    )
                },
                isLoading: { $set: false },
            });
        case actionTypes.PUSH_DATA:
            if (!action.payload) return state;
            return PushEvents(state, action, entireState);
        default:
            return state;
    }
}

export default sessionIdeasReducer;