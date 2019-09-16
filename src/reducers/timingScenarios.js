import update from 'immutability-helper';
import { GET_TIMING_SCENARIOS, PROJECT_CHANGE } from '../actions/actionTypes';
import * as loghelper from '../common/loghelper';
import { timingScenarioData } from '../store/configureStoreData';

const timingScenarioDataReducer = (state = [], action) => {
    if (action.type === GET_TIMING_SCENARIOS) {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        switch (action.type) {
            case PROJECT_CHANGE:
                return timingScenarioData;

            case GET_TIMING_SCENARIOS:
                if (!action.payload) return state;
                return update(state, {
                    timingScenarios: { $set: action.payload.data },
                    isLoading: { $set: false }
                });

            default:
                return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === GET_TIMING_SCENARIOS) {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
}

export default timingScenarioDataReducer;