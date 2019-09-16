import * as loghelper from '../../common/loghelper';
import updateLineItemValueData from './updaters/lineItemMonthlyValueUpdater';
import update from 'immutability-helper';
import { lineItemMonthlyValueData } from '../configureStoreData';
import { PROJECT_CHANGE } from '../../actions/actionTypes';

const lineItemMonthlyValueReducer = (state = [], action, entireState) => {
    if (action.type === 'GET_LINEITEM_MONTHLYVALUE') {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        switch (action.type) {
            case PROJECT_CHANGE:
                return lineItemMonthlyValueData;

            case 'GET_LINEITEM_MONTHLYVALUE':
                return update(state, {
                    lineItemMonthlyValues: { $set: action.payload.data },
                    isLoading: { $set: false }
                });
            case 'PUSH_DATA':
                if (!action.payload) return state;
                return updateLineItemValueData(state, action, entireState);
            default:
                return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === 'GET_LINEITEM_MONTHLYVALUE') {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
}

export default lineItemMonthlyValueReducer;
