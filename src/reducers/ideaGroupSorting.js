import { setLocalStorageKey } from '../common/utils';
import update from 'immutability-helper';

const updateSortingFilters = (state, action) => {
    const view = action.view;
    switch (view) {
        case 1:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('defaultSortColumn', '');
                    setLocalStorageKey('defaultSortAscending', undefined);
                    setLocalStorageKey('defaultSortingOn', '');
                    setLocalStorageKey('defaultScr', action.payload);
                    setLocalStorageKey('ideaGenrationSortColumn', '');
                    setLocalStorageKey('ideaGenrationSortAscending', undefined);
                    setLocalStorageKey('ideaGenrationSortingOn', '');
                    setLocalStorageKey('ideaGenrationScr', action.payload);
                    setLocalStorageKey('archiveSortColumn', '');
                    setLocalStorageKey('archiveSortAscending', undefined);
                    setLocalStorageKey('archiveSortingOn', '');
                    setLocalStorageKey('archiveScr', action.payload);
                    setLocalStorageKey('archivePendingSortColumn', '');
                    setLocalStorageKey('archivePendingSortAscending', undefined);
                    setLocalStorageKey('archivePendingSortingOn', '');
                    setLocalStorageKey('archivePendingScr', action.payload);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasForAcceptanceScr', action.payload);
                    setLocalStorageKey('shareSortColumn', '');
                    setLocalStorageKey('shareSortAscending', undefined);
                    setLocalStorageKey('shareSortingOn', '');
                    setLocalStorageKey('shareScr', action.payload);
                    setLocalStorageKey('transferSortColumn', '');
                    setLocalStorageKey('transferSortAscending', undefined);
                    setLocalStorageKey('transferSortingOn', '');
                    setLocalStorageKey('transferScr', action.payload);
                    return update(state, {
                        defaultView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                        ideaGenrationView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        archiveView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        archivePendingView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        ideasForAcceptanceView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        shareView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        transferView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    return update(state, {
                        defaultView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archiveView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        archivePendingView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        ideasForAcceptanceView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        shareView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        transferView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                    });
                default:
                    return state;
            }
        case 2:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('customSortColumn', '');
                    setLocalStorageKey('customSortAscending', undefined);
                    setLocalStorageKey('customSortingOn', '');
                    setLocalStorageKey('customScr', action.payload);
                    return update(state, {
                        customView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('customSortColumn', action.payload.column);
                    setLocalStorageKey('customSortAscending', action.payload.direction);
                    setLocalStorageKey('customSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('customScr', false);
                    return update(state, {
                        customView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                    });
                default:
                    return state;
            }
        case 3:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('defaultSortColumn', '');
                    setLocalStorageKey('defaultSortAscending', undefined);
                    setLocalStorageKey('defaultSortingOn', '');
                    setLocalStorageKey('defaultScr', action.payload);
                    setLocalStorageKey('ideaGenrationSortColumn', '');
                    setLocalStorageKey('ideaGenrationSortAscending', undefined);
                    setLocalStorageKey('ideaGenrationSortingOn', '');
                    setLocalStorageKey('ideaGenrationScr', action.payload);
                    setLocalStorageKey('archiveSortColumn', '');
                    setLocalStorageKey('archiveSortAscending', undefined);
                    setLocalStorageKey('archiveSortingOn', '');
                    setLocalStorageKey('archiveScr', action.payload);
                    setLocalStorageKey('archivePendingSortColumn', '');
                    setLocalStorageKey('archivePendingSortAscending', undefined);
                    setLocalStorageKey('archivePendingSortingOn', '');
                    setLocalStorageKey('archivePendingScr', action.payload);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasForAcceptanceScr', action.payload);
                    setLocalStorageKey('shareSortColumn', '');
                    setLocalStorageKey('shareSortAscending', undefined);
                    setLocalStorageKey('shareSortingOn', '');
                    setLocalStorageKey('shareScr', action.payload);
                    setLocalStorageKey('transferSortColumn', '');
                    setLocalStorageKey('transferSortAscending', undefined);
                    setLocalStorageKey('transferSortingOn', '');
                    setLocalStorageKey('transferScr', action.payload);
                    return update(state, {
                        defaultView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                        ideaGenrationView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        archiveView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        archivePendingView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        ideasForAcceptanceView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        shareView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                        transferView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('ideaGenrationSortColumn', action.payload.column);
                    setLocalStorageKey('ideaGenrationSortAscending', action.payload.direction);
                    setLocalStorageKey('ideaGenrationSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideaGenrationScr', false);
                    return update(state, {
                        ideaGenrationView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                    });
                default:
                    return state;
            }
        case 4:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('archiveSortColumn', '');
                    setLocalStorageKey('archiveSortAscending', undefined);
                    setLocalStorageKey('archiveSortingOn', '');
                    setLocalStorageKey('archiveScr', action.payload);
                    return update(state, {
                        archiveView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    return update(state, {
                        defaultView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archiveView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        archivePendingView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        ideasForAcceptanceView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        shareView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        transferView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                    });
                default:
                    return state;
            }
        case 5:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('archivePendingSortColumn', '');
                    setLocalStorageKey('archivePendingSortAscending', undefined);
                    setLocalStorageKey('archivePendingSortingOn', '');
                    setLocalStorageKey('archivePendingScr', action.payload);
                    return update(state, {
                        archivePendingView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    return update(state, {
                        defaultView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archiveView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        archivePendingView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        ideasForAcceptanceView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        shareView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        transferView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                    });
                default:
                    return state;
            }
        case 6:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('ideasForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasForAcceptanceScr', action.payload);
                    return update(state, {
                        ideasForAcceptanceView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' },
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    return update(state, {
                        defaultView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archiveView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        archivePendingView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        ideasForAcceptanceView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        shareView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                        transferView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn },
                        },
                    });
                default:
                    return state;
            }
        case 7:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('planningSortColumn', '');
                    setLocalStorageKey('planningSortAscending', undefined);
                    setLocalStorageKey('planningSortingOn', '');
                    setLocalStorageKey('planningScr', action.payload);
                    return update(state, {
                        planningView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('planningSortColumn', action.payload.column);
                    setLocalStorageKey('planningSortAscending', action.payload.direction);
                    setLocalStorageKey('planningSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('planningScr', false);
                    return update(state, {
                        planningView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 8:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('trackingSortColumn', '');
                    setLocalStorageKey('trackingSortAscending', undefined);
                    setLocalStorageKey('trackingSortingOn', '');
                    setLocalStorageKey('trackingScr', action.payload);
                    return update(state, {
                        trackingView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('trackingSortColumn', action.payload.column);
                    setLocalStorageKey('trackingSortAscending', action.payload.direction);
                    setLocalStorageKey('trackingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('trackingScr', false);
                    return update(state, {
                        trackingView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 9:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('implementationCustomSortColumn', '');
                    setLocalStorageKey('implementationCustomSortAscending', undefined);
                    setLocalStorageKey('implementationCustomSortingOn', '');
                    setLocalStorageKey('implementationCustomScr', action.payload);
                    return update(state, {
                        implementationCustomView:
                        {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('implementationCustomSortColumn', action.payload.column);
                    setLocalStorageKey('implementationCustomSortAscending', action.payload.direction);
                    setLocalStorageKey('implementationCustomSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('implementationCustomScr', false);
                    return update(state, {
                        implementationCustomView:
                        {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 10:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('shareSortColumn', '');
                    setLocalStorageKey('shareSortAscending', undefined);
                    setLocalStorageKey('shareSortingOn', '');
                    setLocalStorageKey('shareScr', action.payload);
                    return update(state, {
                        shareView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    return update(state, {
                        defaultView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archiveView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archivePendingView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        ideasForAcceptanceView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        shareView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        transferView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 11:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('transferSortColumn', '');
                    setLocalStorageKey('transferSortAscending', undefined);
                    setLocalStorageKey('transferSortingOn', '');
                    setLocalStorageKey('transferScr', action.payload);
                    return update(state, {
                        transferView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    return update(state, {
                        defaultView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archiveView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        archivePendingView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        ideasForAcceptanceView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        shareView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                        transferView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 12:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('ideasSentForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasSentForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasSentForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasSentForAcceptanceScr', action.payload);
                    return update(state, {
                        ideasSentForAcceptanceView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('ideasSentForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasSentForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasSentForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasSentForAcceptanceScr', false);
                    return update(state, {
                        ideasSentForAcceptanceView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 13:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('sentForShareSortColumn', '');
                    setLocalStorageKey('sentForShareSortAscending', undefined);
                    setLocalStorageKey('sentForShareSortingOn', '');
                    setLocalStorageKey('sentForShareScr', action.payload);
                    return update(state, {
                        sentForShareView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('sentForShareSortColumn', action.payload.column);
                    setLocalStorageKey('sentForShareSortAscending', action.payload.direction);
                    setLocalStorageKey('sentForShareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('sentForShareScr', false);
                    return update(state, {
                        sentForShareView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        case 14:
            switch (action.type) {
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('sentForTransferSortColumn', '');
                    setLocalStorageKey('sentForTransferSortAscending', undefined);
                    setLocalStorageKey('sentForTransferSortingOn', '');
                    setLocalStorageKey('sentForTransferScr', action.payload);
                    return update(state, {
                        sentForTransferView: {
                            scr: { $set: action.payload },
                            sortColumn: { $set: '' },
                            sortAscending: { $set: undefined },
                            sortingOn: { $set: '' }
                        },
                    });
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('sentForTransferSortColumn', action.payload.column);
                    setLocalStorageKey('sentForTransferSortAscending', action.payload.direction);
                    setLocalStorageKey('sentForTransferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('sentForTransferScr', false);
                    return update(state, {
                        sentForTransferView: {
                            scr: { $set: false },
                            sortColumn: { $set: action.payload.column },
                            sortAscending: { $set: action.payload.direction },
                            sortingOn: { $set: action.payload.sortingOn }
                        },
                    });
                default:
                    return state;
            }
        default:
            return state;
    }
}

const sortingReducer = (state = [], action) => {
    switch (action.type) {
        case 'IDEAGROUP_LIST_SORT':
        case 'SORT_OUTGOING_VIEWS':
        case 'SCR_SORT_IDEAGROUP':
            const updatedState = updateSortingFilters(state, action);
            return updatedState;
        case 'SORT_IMPLEMENTATION_IDEAS':
        case 'SORT_IMPLEMENTATION_IDEA_GROUPS':
            setLocalStorageKey('implementationIdeaSortColumn', action.payload.column);
            setLocalStorageKey('implementationIdeaSortAscending', action.payload.direction);
            return update(state, {
                implementationIdeaView: { sortAscending: { $set: action.payload.direction }, sortColumn: { $set: action.payload.column } },
            });
        case 'SORT_IMPLEMENTATION_LINEITEMS':
            setLocalStorageKey('implementationLineItemSortColumn', action.payload.column);
            setLocalStorageKey('implementationLineItemSortAscending', action.payload.direction);
            return update(state, {
                implementationLineItemView: { sortAscending: { $set: action.payload.direction }, sortColumn: { $set: action.payload.column } },
            });
        case 'SORT_IMPLEMENTATION_METRICS':
            setLocalStorageKey('implementationMetricSortColumn', action.payload.column);
            setLocalStorageKey('implementationMetricSortAscending', action.payload.direction);
            return update(state, {
                implementationMetricView: { sortAscending: { $set: action.payload.direction }, sortColumn: { $set: action.payload.column } },
            });

        case 'SORT_IMPLEMENTATION_MILESTONES':
            setLocalStorageKey('implementationMileStoneSortColumn', action.payload.column);
            setLocalStorageKey('implementationMileStoneSortAscending', action.payload.direction);
            return update(state, {
                implementationMileStoneView: { sortAscending: { $set: action.payload.direction }, sortColumn: { $set: action.payload.column } },
            });
        case 'TOGGLE_COMPLETION_TRACKER_LINEITEMS':
            setLocalStorageKey('showCompletionTrackingLineItems', action.isOpen);
            return update(state, {
                implementationLineItemView: { showCompletionTracking: { $set: action.isOpen } },
            });
        case 'TOGGLE_COMPLETION_TRACKER_IDEAS':
            setLocalStorageKey('showCompletionTrackingIdeas', action.isOpen);
            return update(state, {
                implementationIdeaView: { showCompletionTracking: { $set: action.isOpen } },
            });
        default:
            return state;
    }
}

export default sortingReducer;
