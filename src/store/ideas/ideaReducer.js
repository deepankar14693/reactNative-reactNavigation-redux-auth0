import * as actionTypes from "../../actions/actionTypes";
import update from 'immutability-helper';

const ideaReducer = (state = [], action) => {
    try {
        switch (action.type) {
            case actionTypes.GET_IDEA_DATA:
                if (action.payload && action.payload.data) {
                    return update(state, {
                        ideaList: {
                            $set: (
                                action.payload.data ? action.payload.data : []
                            )
                        }
                    })
                }
                else {
                    return state;
                }

            default:
                return state
        }
    }
    catch (err) {
        console.log(err);
    }
}

export default ideaReducer;
