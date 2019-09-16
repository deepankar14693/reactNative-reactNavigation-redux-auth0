import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import sequenceAction from 'redux-sequence-action';
import thunk from 'redux-thunk';
import { getOrganizationMasterData } from '../actions/masterDataActions';
import AppConfig from '../appConfig';
import { ideaData, masterData, organizationMasterData, permissionsData, dashboardFilter,dahboardData } from './configureStoreData';
import allReducers from './reducers';
import { getIdeaGroupDashboardData, getDashboardOtherDataList } from '../actions/dashboardActions';
import { getMasterData } from '../actions/masterDataActions';

const persistedState = {
    organizationMasterData: organizationMasterData,
    ideaData: ideaData,
    masterData: masterData,
    dashboardFilter: dashboardFilter(),
    dashboardData: dahboardData,
}

const logger = createLogger({

});

const configureStore = () => {
    var applyMiddlewareObj;
    if (AppConfig.reduxLogger) {
        applyMiddlewareObj = applyMiddleware(thunk, promise, logger, sequenceAction);
    }
    else {
        applyMiddlewareObj = applyMiddleware(thunk, promise, sequenceAction);
    }

    const store = createStore(allReducers, persistedState, applyMiddlewareObj);

    
    store.dispatch(getOrganizationMasterData());
    store.dispatch(getMasterData());
    store.dispatch(getIdeaGroupDashboardData());
    store.dispatch(getDashboardOtherDataList());

    return store;
}

export default configureStore;
