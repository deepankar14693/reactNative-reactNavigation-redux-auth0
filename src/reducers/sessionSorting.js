import update from 'immutability-helper';
import { setLocalStorageKey } from '../common/utils';
import * as actionTypes from '../actions/actionTypes';

const updateSortingFilters = (state, action) => {
    switch (action.type) {
        case actionTypes.SESSION_LIST_SORT:
            setLocalStorageKey('sessionSortColumn', action.payload.column);
            setLocalStorageKey('sessionSortAscending', action.payload.direction);
            setLocalStorageKey('sessionSortingOn', action.payload.sortingOn);
            return update(state, {
                sortColumn: { $set: action.payload.column },
                sortAscending: { $set: action.payload.direction },
                sortingOn: { $set: action.payload.sortingOn }
            });
        default:
            return state;
    }

}

const sortingReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SESSION_LIST_SORT:
            const updatedState = updateSortingFilters(state, action);
            return updatedState;
        case actionTypes.IS_SHOW_ARCHIVED_SESSIONS:
            return update(state, { isShowingArchivedSessions: { $set: action.payload } });
        default:
            return state;
    }
}

export default sortingReducer;
