import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';
import update from 'immutability-helper';

const NewIdeaReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.CREATE_IDEA_SIMPLIFIED_EMPTY_IDEA:
            if (!action.payload.data) return state;
            if (action.payload.data.Idea === null) {
                return state;
            } else {
                const ideas = _.union(state, [action.payload.data.Idea.IdeaNumber]);
                //return Object.assign([], _.union(state, action.payload.data.Idea.IdeaNumber));
                return update(state,
                    { $set: ideas }
                );
            }
        case actionTypes.CLEAR_NEW_IDEAS:
            return [];
        default:
            return state;
    }
};

export default NewIdeaReducer;