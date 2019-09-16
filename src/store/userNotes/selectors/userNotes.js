import update from 'immutability-helper';
import _ from 'lodash';
import moment from 'moment';
import { createFilter } from 'react-native-search-filter';
import { createSelector } from 'reselect';
import { isEmpty2, getReferenceText, getTextValue, } from '../../../common/utils';

const prepareFilteredUserNotes = (state, searchedText, selectedFiltersGroup, selectedFiltersIdeaNumber,
    selectedFiltersItemNumber, selectedFiltersNoteCreationType, selectedFiltersNoteCreatedTiming, selectedFiltersFromDate,
    selectedFiltersToDate, selectedFiltersNoteStatusType, isFilterApplied) => {
    let stateObj = _.filter(state, (item) => { return item.IdeaStatus !== 3 });
    let finalState = [];
    if (_.size(stateObj) === 0) { return null }
    if (isEmpty2(searchedText)) {
        finalState = stateObj;
    } else {
        const KEYS_TO_FILTERS = ['GroupName', 'IdeaNumber', 'ItemNumber', 'Notes'];
        const filterKeys = createFilter(searchedText, KEYS_TO_FILTERS);
        finalState = stateObj.filter(filterKeys);
    }
    if (isFilterApplied) {
        if (!isEmpty2(selectedFiltersGroup)) {
            finalState = _.filter(finalState, { 'GroupName': selectedFiltersGroup });
        }
        if (!isEmpty2(selectedFiltersIdeaNumber)) {
            finalState = _.filter(finalState, (el) => {
                let ideaNumber = el.IdeaNumber ? el.IdeaNumber.toString() : '';
                return _.includes(ideaNumber, selectedFiltersIdeaNumber)
            });
        }
        if (!isEmpty2(selectedFiltersItemNumber)) {
            finalState = _.filter(finalState, (el) => {
                let refType = getTextValue(getReferenceText(el.ItemType, el.ItemNumber));
                refType = refType ? refType : '';
                return _.includes(refType.toLowerCase(), selectedFiltersItemNumber.toLowerCase());
            });
        }

        if (!isEmpty2(selectedFiltersNoteCreatedTiming)) {
            const momentVar = moment;
            switch (selectedFiltersNoteCreatedTiming) {
                case 1:
                    const toDayDate = moment().format('L');
                    if (selectedFiltersNoteCreationType === 1) {
                        finalState = _.filter(finalState, (el) => {
                            return momentVar(el.CreatedOn).format('L') === toDayDate
                        }
                        );
                    } else {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.ModifiedOn).format('L') === toDayDate });
                    }
                    break;
                case 2:
                    const yesterDayDate = moment(moment().subtract(1, 'days')).format('L');
                    if (selectedFiltersNoteCreationType === 1) {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.CreatedOn).format('L') === yesterDayDate });
                    } else {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.ModifiedOn).format('L') === yesterDayDate });
                    }
                    break;
                case 3:
                    const startOfWeek = moment(moment().startOf('week').toDate()).format('L');
                    const endOfWeek = moment(moment().endOf('week').toDate()).format('L');
                    if (selectedFiltersNoteCreationType === 1) {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.CreatedOn).format('L') >= startOfWeek && momentVar(el.CreatedOn).format('L') <= endOfWeek });
                    } else {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.ModifiedOn).format('L') >= startOfWeek && momentVar(el.ModifiedOn).format('L') <= endOfWeek });
                    }
                    break;
                case 4:
                    const startOfLastWeek = moment(moment().startOf('week').subtract(7, 'days').toDate()).format('L');
                    const endOfLastWeek = moment(moment().endOf('week').subtract(7, 'days').toDate()).format('L');
                    if (selectedFiltersNoteCreationType === 1) {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.CreatedOn).format('L') >= startOfLastWeek && momentVar(el.CreatedOn).format('L') <= endOfLastWeek });
                    } else {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.ModifiedOn).format('L') >= startOfLastWeek && momentVar(el.ModifiedOn).format('L') <= endOfLastWeek });
                    }
                    break;
                case 5:
                    const startOfMonth = moment(moment().startOf('month').toDate()).format('L');
                    const endOfMonth = moment(moment().endOf('month').toDate()).format('L');
                    if (selectedFiltersNoteCreationType === 1) {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.CreatedOn).format('L') >= startOfMonth && momentVar(el.CreatedOn).format('L') <= endOfMonth });
                    } else {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.ModifiedOn).format('L') >= startOfMonth && momentVar(el.ModifiedOn).format('L') <= endOfMonth });
                    }
                    break;
                case 6:
                    const startOfLastMonth = moment(moment().subtract(1, 'months').startOf('month').toDate()).format('L');
                    const endOfLastMonth = moment(moment().subtract(1, 'months').endOf('month').toDate()).format('L');
                    if (selectedFiltersNoteCreationType === 1) {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.CreatedOn).format('L') >= startOfLastMonth && momentVar(el.CreatedOn).format('L') <= endOfLastMonth });
                    } else {
                        finalState = _.filter(finalState, (el) => { return momentVar(el.ModifiedOn).format('L') >= startOfLastMonth && momentVar(el.ModifiedOn).format('L') <= endOfLastMonth });
                    }
                    break;
                case 7:
                    const minDate = selectedFiltersFromDate;
                    const maxDate = selectedFiltersToDate;
                    const momentVar2 = moment;
                    if (selectedFiltersNoteCreationType === 1) {
                        if (minDate && maxDate) {
                            finalState = _.filter(finalState, function (el) {
                                return new Date(momentVar2(el.CreatedOn).format('L')) >= new Date(minDate) && new Date(momentVar2(el.CreatedOn).format('L')) <= new Date(maxDate);
                            });
                        } else if (minDate) {
                            finalState = _.filter(finalState, function (el) {
                                return new Date(momentVar2(el.CreatedOn).format('L')) >= new Date(minDate);
                            });
                        } else if (maxDate) {
                            finalState = _.filter(finalState, function (el) {
                                return new Date(momentVar2(el.CreatedOn).format('L')) <= new Date(maxDate);
                            });
                        }

                    } else {
                        if (minDate && maxDate) {
                            finalState = _.filter(finalState, function (el) {
                                return new Date(momentVar2(el.ModifiedOn).format('L')) >= new Date(minDate) && new Date(momentVar2(el.ModifiedOn).format('L')) <= new Date(maxDate);
                            });
                        } else if (minDate) {
                            finalState = _.filter(finalState, function (el) {
                                return new Date(momentVar2(el.ModifiedOn).format('L')) >= new Date(minDate);
                            });
                        } else if (maxDate) {
                            finalState = _.filter(finalState, function (el) {
                                return new Date(momentVar2(el.ModifiedOn).format('L')) <= new Date(maxDate);
                            });
                        }
                    }
                    break;
            }
        }

        if (!isEmpty2(selectedFiltersNoteStatusType)) {
            if (selectedFiltersNoteStatusType === 1) {
                finalState = _.filter(finalState, (el) => { return el.Status !== 4 })
            } else if (selectedFiltersNoteStatusType === 2) {
                finalState = _.filter(finalState, (el) => { return el.Status === 4 })
            }
        }

    } else {
        finalState = _.filter(finalState, (el) => { return el.Status !== 4 })
    }
    return update(state, { $set: finalState });
};


export const getFilteredUserNotes = () => createSelector(
    prepareFilteredUserNotes,
    (filteredUserNotes) => ({
        filteredUserNotes
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
