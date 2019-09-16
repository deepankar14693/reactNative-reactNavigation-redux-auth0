import update from 'immutability-helper';
import * as actionTypes from '../actions/actionTypes';
import * as loghelper from '../common/loghelper';
import { completionTracker } from '../store/configureStoreData';

const CompletionTracker = (state = [], action) => {
    var parsedData;

    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
            return update(state, { $set: completionTracker });

        case 'EMPTY_PLANNING_DASHBOARD':
            return { isLoading: true, planningDashboard: [] };
        case 'GET_PLANNING_DASHBOARD':
            parsedData = action.payload.data;
            return update(state, {
                isLoading: { $set: false },
                planningDashboard: { $set: parsedData }
            });
        case 'GET_PLANNING_DASHBOARD_VARIANCE':
            loghelper.consoleTimeEnd('getPlanningDashboardVariance', 1, 3);
            parsedData = action.payload.data;
            return update(state, {
                isLoading: { $set: false },
                planningDashboardVariance: { $set: parsedData }
            });

        case 'EMPTY_TRACKING_DASHBOARD':
            return { isTrackingLoading: true, trackingDashboard: [] };
        case 'GET_TRACKING_DASHBOARD':
            parsedData = action.payload.data;
            return update(state, {
                isTrackingLoading: { $set: false },
                trackingDashboard: { $set: parsedData }
            });
        case 'GET_TRACKING_DASHBOARD_VARIANCE':
            loghelper.consoleTimeEnd('getTrackingDashboardVariance', 1, 3);
            parsedData = action.payload.data;
            return update(state, {
                isTrackingLoading: { $set: false },
                trackingDashboardVariance: { $set: parsedData }
            });


        case actionTypes.DASHBOARD_PHASE_CHANGE:
            if (action.payload.phaseNumber > 3) {
                return update(state, {
                    isLoading: { $set: true }
                });
            } else {
                return state;
            }
        default: return state;
    }
}

export default CompletionTracker;
