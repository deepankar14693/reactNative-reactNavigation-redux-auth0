import update from 'immutability-helper';
import { setLocalStorageKey } from '../common/utils';

const updateSortingFilters = (state, action) => {
    switch (action.type) {
        case 'SESSION_IDEAS_LIST_SORT':
            setLocalStorageKey('sessionIdeasSortColumn', action.payload.column);
            setLocalStorageKey('sessionIdeasSortAscending', action.payload.direction);
            setLocalStorageKey('sessionIdeasSortingOn', action.payload.sortingOn);
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
        case 'SESSION_IDEAS_LIST_SORT':
            const updatedState = updateSortingFilters(state, action);
            return updatedState;
        case 'IS_SHOW_ALL_SESSION_IDEAS':
            setLocalStorageKey('isShowingAllSessionIdeas', action.payload);
            return update(state, {
                isShowingAllIdeas: { $set: action.payload }
            });
        default:
            return state;
    }
}

export default sortingReducer;
