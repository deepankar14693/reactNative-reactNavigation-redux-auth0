import update from 'immutability-helper';
import _ from 'lodash';
import { createFilter } from 'react-native-search-filter';
import { createSelector } from 'reselect';
import { filterByValues, getSplitedArray, isEmpty2 } from '../../../common/utils';

const prepareFilteredSessionIdeas = (state, sessionId, searchedText, isShowingAllIdeas, activeFilters) => {
    let stateObj = state;
    let finalState = [];
    if (_.size(stateObj) === 0) { return null }
    if (isEmpty2(sessionId)) {
        return null;
    } else {
        //if (!isShowingAllIdeas) {
        stateObj = _.filter(stateObj, (item) => { return item.Status === 1 || item.Status === 2 });
        //}
        if (isEmpty2(searchedText)) {
            stateObj = _.filter(stateObj, { 'SessionId': sessionId });
            finalState = stateObj;
        } else {
            const KEYS_TO_FILTERS = ['FocusAreaName', 'Title', 'Description'];
            const filterKeys = createFilter(searchedText, KEYS_TO_FILTERS);
            stateObj = _.filter(stateObj, { 'SessionId': sessionId });
            finalState = stateObj.filter(filterKeys);
        }

        if (activeFilters.length > 0) {
            finalState = getSessionIdeasApplyFilters(finalState, activeFilters);
        }
        return update(state, { $set: finalState });

    }
};

export const getSessionIdeasApplyFilters = (filteredSessionIdea, applyFilters) => {
    applyFilters.map(function (el) {
        if (el.fieldName !== 'CurrentGroupValue' && el.fieldName !== 'Plan' && el.fieldName !== 'Target' && el.fieldName !== 'Actual') {
            switch (el.filterType) {
                case 'RoughRiskRating':
                    const arrayRiskRating = getSplitedArray(el.searchValue);
                    filteredSessionIdea = _.filter(filteredSessionIdea, (item) => _.includes(arrayRiskRating, item.RoughRiskRatingType));
                    break;
                case 'MovedToIdeasList':
                    const arrayMTID = getSplitedArray(el.searchValue);
                    filteredSessionIdea = filterByValues(filteredSessionIdea, 'Status', arrayMTID);
                    break;
                default:
                    const arrayDefault = getSplitedArray(el.searchValue);
                    filteredSessionIdea = filterByValues(filteredSessionIdea, el.fieldName, arrayDefault);
                    break;
            }
        }
    });
    const applyValueFilters = applyFilters.filter(function (el) { return el.fieldName === 'CurrentGroupValue' });
    if (applyValueFilters.length > 0) {
        let minValue;
        let maxValue;
        applyValueFilters.map(function (el) {
            if (el.value === 'MinValue_1') {
                minValue = parseInt(el.fieldValue);
            }
            if (el.value === 'MaxValue_2') {
                maxValue = parseInt(el.fieldValue);
            }
        });
        if (minValue > 0 && maxValue > 0) {
            filteredSessionIdea = _.filter(filteredSessionIdea, function (sessionIdea) {
                return sessionIdea.RoughValue >= minValue && sessionIdea.RoughValue <= maxValue;
            });
        } else if (minValue > 0) {
            filteredSessionIdea = _.filter(filteredSessionIdea, function (sessionIdea) {
                return sessionIdea.RoughValue >= minValue;
            });
        } else if (maxValue > 0) {
            filteredSessionIdea = _.filter(filteredSessionIdea, function (sessionIdea) {
                return sessionIdea.RoughValue <= maxValue;
            });
        }
    }
    return filteredSessionIdea;
};


export const getFilteredSessionIdeas = () => createSelector(
    prepareFilteredSessionIdeas,
    (filteredSessionIdeas) => ({
        filteredSessionIdeas
    })
);



const chachedState = (state) => {
    return update(state, { $set: state });
};

export const getChachedState = () => createSelector(
    chachedState,
    (chachedState) => ({
        chachedState
    })
);
