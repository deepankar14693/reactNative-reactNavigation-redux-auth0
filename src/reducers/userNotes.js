import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import * as loghelper from '../common/loghelper';
import { getEntityPayload, getLastProjectId, isEmpty2, isNotesSortingRequired, setLocalStorageKey, sortNotesArrayByParams } from '../common/utils';

export const pushedUserNoteView = (item, oldUserNote) => {
    if (oldUserNote) {
        item.LineType = oldUserNote.LineType ? oldUserNote.LineType : null;
        item.ItemSequence = oldUserNote.ItemSequence ? oldUserNote.ItemSequence : null;
        item.CurrentGroupTab = oldUserNote.CurrentGroupTab ? oldUserNote.CurrentGroupTab : null;
        item.ExpendedIdea = oldUserNote.ExpendedIdea ? oldUserNote.ExpendedIdea : false;
        item.IdeaList = oldUserNote.IdeaList ? oldUserNote.IdeaList : false;
    } else {
        item.CurrentGroupTab = null;
        item.ExpendedIdea = false;
        item.IdeaList = 0;
        item.LineType = null;
        item.ItemSequence = null;
    }
    return item;
};


const updateUserNoteData = (state, pushDataList) => {
    let newState = Object.assign([], state);

    if (pushDataList && pushDataList.length > 0) {
        const oldUserNotesDictionary = _.groupBy(state, 'UserNoteId');
        pushDataList.forEach(item => {
            const oldUserNote = oldUserNotesDictionary[item.UserNoteId] ? oldUserNotesDictionary[item.UserNoteId][0] : null
            const index = newState.findIndex(op => op.UserNoteId === item.UserNoteId);
            if (index === -1) {
                newState = update(newState, { $splice: [[0, 0, pushedUserNoteView(item, oldUserNote)]] });
            } else {
                newState = update(newState, { [index]: { $set: pushedUserNoteView(item, oldUserNote) } });
            }
        });

        return update(state, { $set: newState });
    } else {
        return state;
    }
};

const updateEntities = (state, data) => {
    let stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.UserNoteId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        stateObj = updateUserNoteData(stateObj, data[0]);
        //stateObj = _.unionBy(data[0], stateObj, 'UserNoteId');
    }
    return Object.assign([], ...state, stateObj);
};

const updateEntitiesList = (state, payloadData, entireState) => {
    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        let newState = [];
        let newStateObject = Object.assign([], state['userNotes']);
        _.forEach(payloadData, (payloadDataItem) => {

            const userNotePushedData = getEntityPayload(payloadDataItem.Data, 'UserNote');
            if (userNotePushedData[0].length > 0 || userNotePushedData[1].length > 0) {
                isPushRelevantChange = true;
            }
            if (isPushRelevantChange) {
                newState = Object.assign([], updateEntities(newStateObject, userNotePushedData));
                newStateObject = Object.assign([], newState);
            } else {
                newState = Object.assign([], newStateObject);
            }
        });

        return update(state, {
            userNotes: { $set: newState },
            isLoading: { $set: false }
        });
    } else {
        return state;
    }
};

const updatePushData = (state, action, entireState) => {
    if (!action.payload) return state;
    var parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });

    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData, entireState);
};


export const userNoteView = (item, ideaList, expendedIdea, peIndex, npeIndex, revenueIndex, currentGroupTab, isUpdate, implementationView) => {
    if (isUpdate) {
        if (implementationView === 9 || implementationView === 10 || implementationView === 11 || implementationView === 12) {
            if (item.ItemType === 210 && implementationView === 9) {
                item.LineType = 50;
            }
            if ((item.ItemType === 212 || item.ItemType === 213 || item.ItemType === 214) && implementationView === 10) {
                if (item.ItemType === 212) {
                    item.LineType = 60;
                }
                if (item.ItemType === 213) {
                    item.LineType = 70;
                }
                if (item.ItemType === 214) {
                    item.LineType = 80;
                }
            }
            if (item.ItemType === 215 && implementationView === 11) {
                item.LineType = 90;
            }
            if (item.ItemType === 216 && implementationView === 12) {
                item.LineType = 100;
            }
        } else {
            if (expendedIdea && item.ItemType === 210 && expendedIdea.ideaNumber === item.IdeaNumber) {
                item.LineType = 99;
            }
            if (expendedIdea && expendedIdea.currentTab === 'RiskRating' && item.ItemType === 211 && expendedIdea.ideaNumber === item.IdeaNumber) {
                item.LineType = 10;
                item.ItemSequence = item.LineNumber
            }
            if (item.ItemType === 212 && peIndex !== -1) {
                item.ItemSequence = (peIndex + 1);
                item.LineType = 20;
                item.CurrentGroupTab = item.GroupName.toLowerCase() === currentGroupTab.toLowerCase() ? true : false;
            }
            if (item.ItemType === 213 && npeIndex !== -1) {
                item.ItemSequence = (npeIndex + 1);
                item.LineType = 30;
                item.CurrentGroupTab = item.GroupName.toLowerCase() === currentGroupTab.toLowerCase() ? true : false;
            }
            if (item.ItemType === 214 && revenueIndex !== -1) {
                item.ItemSequence = (revenueIndex + 1);
                item.LineType = 40;
                item.CurrentGroupTab = item.GroupName.toLowerCase() === currentGroupTab.toLowerCase() ? true : false;
            }
        }
        item.IdeaList = ideaList;
        item.ExpendedIdea = (expendedIdea && item.IdeaNumber && item.IdeaNumber === expendedIdea.ideaNumber) ? true : false;
    }
    else {
        item.CurrentGroupTab = (item.ExpendedIdea && item.GroupName.toLowerCase() === currentGroupTab.toLowerCase()) ? true : false;
    }
    return item;
};

_.mixin({
    setProperty: function (arr, keys, val) {
        _.forEach(arr, function (obj) {
            _.each(keys, (key) => { return _.set(obj, key, val) })
            // _.set(obj, key, val);
        });
    }
});

const sortUserNotes = (userNotes, entireState, expendedIdea, currentGroupTab, implementationView, sortingObj) => {
    if (sortingObj) {
        if (sortingObj.sortColumn !== 'Context') {
            userNotes = sortNotesArrayByParams(userNotes, sortingObj.sortColumn, sortingObj.sortAscending);
            return userNotes;
        }
    } else {
        if (!isEmpty2(entireState.notesData.notes.sortColumn)) {
            if (entireState.notesData.notes.sortColumn !== 'Context') {
                userNotes = sortNotesArrayByParams(userNotes, entireState.notesData.notes.sortColumn, entireState.notesData.notes.sortAscending);
                return userNotes;
            }
        }
    }
    const isUpdate = (!currentGroupTab || currentGroupTab === '') ? true : false;
    if (isUpdate) {
        _.setProperty(userNotes, ['LineType', 'ItemSequence', 'IdeaList', 'ExpendedIdea', 'CurrentGroupTab'], null);
    } else {
        _.setProperty(userNotes, ['CurrentGroupTab'], null);
    }
    const renderedIdeaNumbers = entireState.notesData['renderedIdeaNumbers'];

    const fileredGroupId = entireState.ideaGroupFilter.groupId;
    const filteredGroupName = entireState.masterData['groups'][fileredGroupId] ? entireState.masterData['groups'][fileredGroupId].Name : '';
    if (isUpdate) {
        currentGroupTab = filteredGroupName;
    }
    //const ideaGroups = _.filter(entireState.ideaData['ideaGroups'], { 'LinkedGroupStatus': 3, 'GroupId': fileredGroupId });
    //const sortedIdeaGroups = _.map(ideaGroups, (item) => { return item.Idea.IdeaNumber });

    let peLineItems = [];
    let npeLineItems = [];
    let revenueLineItems = [];
    //const currentTab = expendedIdea ? expendedIdea.currentTab : 'DollarImpact';
    if (isUpdate && expendedIdea && expendedIdea.currentTab === 'DollarImpact') {
        if (expendedIdea && expendedIdea.ideaId) {
            peLineItems = _.map(_.sortBy(_.filter(entireState.ideaData['ideaPersonnelLineItems'], (item) => { return item.IdeaId == expendedIdea.ideaId && item.LineNumber > 0 }), ['Sequence']), 'LineNumber');
        }
        if (expendedIdea && expendedIdea.ideaId) {
            npeLineItems = _.map(_.sortBy(_.filter(entireState.ideaData['ideaNonPersonnelLineItems'], (item) => { return item.IdeaId == expendedIdea.ideaId && item.LineNumber > 0 }), ['Sequence']), 'LineNumber');
        }
        if (expendedIdea && expendedIdea.ideaId) {
            revenueLineItems = _.map(_.sortBy(_.filter(entireState.ideaData['ideaRevenueLineItems'], (item) => { return item.IdeaId == expendedIdea.ideaId && item.LineNumber > 0 }), ['Sequence']), 'LineNumber');
        }
    }


    //const currentPage = entireState.ideaGroupFilter.defaultView.currentPage;
    //const perPageIdeaCount = entireState.ideaGroupFilter.defaultView.perPageIdeaCount;

    userNotes = _.map(userNotes, (item) => {
        const ideaNumberIndex = _.indexOf(renderedIdeaNumbers, item.IdeaNumber);
        //const isCurrentPage = ideaNumberIndex >= ((currentPage - 1) * perPageIdeaCount) && ideaNumberIndex < (currentPage * perPageIdeaCount) ? true : false;
        const ideaList = ideaNumberIndex !== -1 ? (ideaNumberIndex + 1) : 9999;

        const peIndex = isUpdate && item.ItemType === 212 ? _.indexOf(peLineItems, item.ItemNumber) : -1;
        const npeIndex = isUpdate && item.ItemType === 213 ? _.indexOf(npeLineItems, item.ItemNumber) : -1;
        const revenueIndex = isUpdate && item.ItemType === 214 ? _.indexOf(revenueLineItems, item.ItemNumber) : -1;

        return userNoteView(item, ideaList, expendedIdea, peIndex, npeIndex, revenueIndex, currentGroupTab, isUpdate, implementationView)
    });

    userNotes = sortMyNotes(userNotes);
    return userNotes;
}

const sortMyNotes = (userNotes) => {
    return _.orderBy(userNotes,
        [
            (o) => { return o.CurrentGroupTab || false },
            (o) => { return o.ExpendedIdea || false },
            (o) => { return (o.LineType || 99999) },
            (o) => { return (o.ItemSequence || 99999) },
            //(o) => { return o.CurrentPage || false },
            //(o) => { return o.GroupName.toLowerCase() === filteredGroupName.toLowerCase() ? 1 : 9999 },
            (o) => { return o.IdeaList || 99999 },
            (o) => { return o.ItemNumber || 99999 },
            //(o) => { return o.ItemType > 210 ? o.ItemType : 99999 },
        ],
        ['desc', 'desc', 'asc', 'asc', 'asc']);
};

const userNotesReducer = (state = [], action, entireState) => {
    if (action.type === 'GET_USER_NOTES') {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        let sortedUserNotes = [];
        switch (action.type) {
            case actionTypes.PROJECT_CHANGE:
                return update(state, {
                    isLoading: { $set: true },
                    userNotes: { $set: [] },
                    renderedIdeaNumbers: { $set: [] },
                    expandedIdeaNumber: { $set: null },
                });

            case actionTypes.USERNOTES_TIMESTAMP:
                if (!action.payload) return state;
                return update(state, {
                    timeStamp: { $set: action.payload.data }
                });

            case 'GET_USER_NOTES':
                let parsedData = action.payload.data;
                parsedData = _.map(parsedData, o => _.extend({
                    CurrentGroupTab: null,
                    ExpendedIdea: false,
                    IdeaList: 0,
                    LineType: null,
                    ItemSequence: null,
                }, o));
                return update(state, {
                    userNotes: { $set: sortUserNotes(parsedData, entireState) },
                    isLoading: { $set: false }
                });
            case actionTypes.CURRENT_GROUP_TAB_CLICK:
                if (!action.currentGroupTab) return state;
                if (isNotesSortingRequired(state.notes)) {
                    sortedUserNotes = sortUserNotes(state.userNotes, entireState, null, action.currentGroupTab);
                    return update(state, {
                        userNotes: { $set: sortedUserNotes },
                        isLoading: { $set: false }
                    });
                }
                return state;
            case actionTypes.ON_RENDER_IDEALIST:
                if (!action.ideaNumbers) return state;
                if (isNotesSortingRequired(state.notes)) {
                    return update(state, {
                        renderedIdeaNumbers: { $set: action.ideaNumbers },
                        isLoading: { $set: true }
                    });
                }
                return state;
            case actionTypes.SORT_USER_NOTE:
                if (isNotesSortingRequired(state.notes)) {
                    sortedUserNotes = sortUserNotes(state.userNotes, entireState);
                    return update(state, {
                        userNotes: { $set: sortedUserNotes },
                        isLoading: { $set: false }
                    });
                }
                return state;
            case actionTypes.SORT_USERNOTE_ON_EXPEND_IDEA:
                let expendedIdea = action.expendedIdea;
                if (isNotesSortingRequired(state.notes)) {
                    sortedUserNotes = sortUserNotes(state.userNotes, entireState, expendedIdea);
                    return update(state, {
                        userNotes: { $set: sortedUserNotes },
                        expandedIdeaNumber: { $set: expendedIdea.ideaNumber },
                        isLoading: { $set: false }
                    });
                } else {
                    return update(state, {
                        expandedIdeaNumber: { $set: expendedIdea.ideaNumber },
                    });
                }
            case actionTypes.COLLAPSE_EXPEND_IDEA:
                return update(state, {
                    expandedIdeaNumber: { $set: null },
                });
            case actionTypes.SORT_USERNOTE_ON_IMPLEMENTATION_VIEWS:
                if (isNotesSortingRequired(state.notes)) {
                    sortedUserNotes = sortUserNotes(state.userNotes, entireState, null, null, action.view);
                    return update(state, {
                        userNotes: { $set: sortedUserNotes },
                        isLoading: { $set: false }
                    });
                }
                return state;
            case 'SORT_NOTES':
                setLocalStorageKey('notesSortColumn', action.payload.column);
                setLocalStorageKey('notesSortAscending', action.payload.direction);
                setLocalStorageKey('notesSortingOn', action.payload.sortingOn);
                sortedUserNotes = sortUserNotes(state.userNotes, entireState, null, null, null, { sortAscending: action.payload.direction, sortColumn: action.payload.column });
                return update(state, {
                    userNotes: { $set: sortedUserNotes },
                    notes: { sortAscending: { $set: action.payload.direction }, sortColumn: { $set: action.payload.column }, sortingOn: { $set: action.payload.sortingOn } },
                });
            case 'SET_DRAGGED_AXIS': {
                return update(state, {
                    draggedAxis: { $set: action.payload }
                });
            }
            case 'TOGGLE_MY_NOTES': {
                return update(state, {
                    isShowingMyNotes: { $set: action.payload }
                });
            }
            case 'PUSH_DATA':
                if (!action.payload) return state;
                return updatePushData(state, action, entireState);
            default:
                return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === 'GET_USER_NOTES') {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
}

export default userNotesReducer;
