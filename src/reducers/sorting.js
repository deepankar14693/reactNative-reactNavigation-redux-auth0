import { setLocalStorageKey } from '../common/utils';
const updateSortingFilters = (state, action) => {
    const view = action.view;
    const stateObj = state;
    switch (view) {
        case 1:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('defaultSortColumn', '');
                    setLocalStorageKey('defaultSortAscending', undefined);
                    setLocalStorageKey('defaultSortingOn', '');
                    setLocalStorageKey('defaultScr', action.payload);
                    stateObj.defaultView.scr = action.payload;
                    stateObj.defaultView.sortColumn = '';
                    stateObj.defaultView.sortAscending = undefined;
                    stateObj.defaultView.sortingOn = '';

                    setLocalStorageKey('ideaGenrationSortColumn', '');
                    setLocalStorageKey('ideaGenrationSortAscending', undefined);
                    setLocalStorageKey('ideaGenrationSortingOn', '');
                    setLocalStorageKey('ideaGenrationScr', action.payload);
                    stateObj.ideaGenrationView.scr = action.payload;
                    stateObj.ideaGenrationView.sortColumn = '';
                    stateObj.ideaGenrationView.sortAscending = undefined;
                    stateObj.ideaGenrationView.sortingOn = '';

                    setLocalStorageKey('archiveSortColumn', '');
                    setLocalStorageKey('archiveSortAscending', undefined);
                    setLocalStorageKey('archiveSortingOn', '');
                    setLocalStorageKey('archiveScr', action.payload);
                    stateObj.archiveView.scr = action.payload;
                    stateObj.archiveView.sortColumn = '';
                    stateObj.archiveView.sortAscending = undefined;
                    stateObj.archiveView.sortingOn = '';

                    setLocalStorageKey('archivePendingSortColumn', '');
                    setLocalStorageKey('archivePendingSortAscending', undefined);
                    setLocalStorageKey('archivePendingSortingOn', '');
                    setLocalStorageKey('archivePendingScr', action.payload);
                    stateObj.archivePendingView.scr = action.payload;
                    stateObj.archivePendingView.sortColumn = '';
                    stateObj.archivePendingView.sortAscending = undefined;
                    stateObj.archivePendingView.sortingOn = '';

                    setLocalStorageKey('ideasForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasForAcceptanceScr', action.payload);
                    stateObj.ideasForAcceptanceView.scr = action.payload;
                    stateObj.ideasForAcceptanceView.sortColumn = '';
                    stateObj.ideasForAcceptanceView.sortAscending = undefined;
                    stateObj.ideasForAcceptanceView.sortingOn = '';

                    setLocalStorageKey('shareSortColumn', '');
                    setLocalStorageKey('shareSortAscending', undefined);
                    setLocalStorageKey('shareSortingOn', '');
                    setLocalStorageKey('shareScr', action.payload);
                    stateObj.shareView.scr = action.payload;
                    stateObj.shareView.sortColumn = '';
                    stateObj.shareView.sortAscending = undefined;
                    stateObj.shareView.sortingOn = '';

                    setLocalStorageKey('transferSortColumn', '');
                    setLocalStorageKey('transferSortAscending', undefined);
                    setLocalStorageKey('transferSortingOn', '');
                    setLocalStorageKey('transferScr', action.payload);
                    stateObj.transferView.scr = action.payload;
                    stateObj.transferView.sortColumn = '';
                    stateObj.transferView.sortAscending = undefined;
                    stateObj.transferView.sortingOn = '';

                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    stateObj.defaultView.scr = false;
                    stateObj.defaultView.sortColumn = action.payload.column;
                    stateObj.defaultView.sortAscending = action.payload.direction;
                    stateObj.defaultView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    stateObj.archiveView.scr = false;
                    stateObj.archiveView.sortColumn = action.payload.column;
                    stateObj.archiveView.sortAscending = action.payload.direction;
                    stateObj.archiveView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    stateObj.archivePendingView.scr = false;
                    stateObj.archivePendingView.sortColumn = action.payload.column;
                    stateObj.archivePendingView.sortAscending = action.payload.direction;
                    stateObj.archivePendingView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    stateObj.ideasForAcceptanceView.scr = false;
                    stateObj.ideasForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasForAcceptanceView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    stateObj.shareView.scr = false;
                    stateObj.shareView.sortColumn = action.payload.column;
                    stateObj.shareView.sortAscending = action.payload.direction;
                    stateObj.shareView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    stateObj.transferView.scr = false;
                    stateObj.transferView.sortColumn = action.payload.column;
                    stateObj.transferView.sortAscending = action.payload.direction;
                    stateObj.transferView.sortingOn = action.payload.sortingOn;

                    return stateObj;
                default:
                    return state;
            }
        case 2:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('customSortColumn', '');
                    setLocalStorageKey('customSortAscending', undefined);
                    setLocalStorageKey('customSortingOn', '');
                    setLocalStorageKey('customScr', action.payload);
                    stateObj.customView.scr = action.payload;
                    stateObj.customView.sortColumn = '';
                    stateObj.customView.sortAscending = undefined;
                    stateObj.customView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('customSortColumn', action.payload.column);
                    setLocalStorageKey('customSortAscending', action.payload.direction);
                    setLocalStorageKey('customSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('customScr', false);
                    stateObj.customView.scr = false;
                    stateObj.customView.sortColumn = action.payload.column;
                    stateObj.customView.sortAscending = action.payload.direction;
                    stateObj.customView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 3:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('defaultSortColumn', '');
                    setLocalStorageKey('defaultSortAscending', undefined);
                    setLocalStorageKey('defaultSortingOn', '');
                    setLocalStorageKey('defaultScr', action.payload);
                    stateObj.defaultView.scr = action.payload;
                    stateObj.defaultView.sortColumn = '';
                    stateObj.defaultView.sortAscending = undefined;
                    stateObj.defaultView.sortingOn = '';

                    setLocalStorageKey('ideaGenrationSortColumn', '');
                    setLocalStorageKey('ideaGenrationSortAscending', undefined);
                    setLocalStorageKey('ideaGenrationSortingOn', '');
                    setLocalStorageKey('ideaGenrationScr', action.payload);
                    stateObj.ideaGenrationView.scr = action.payload;
                    stateObj.ideaGenrationView.sortColumn = '';
                    stateObj.ideaGenrationView.sortAscending = undefined;
                    stateObj.ideaGenrationView.sortingOn = '';

                    setLocalStorageKey('archiveSortColumn', '');
                    setLocalStorageKey('archiveSortAscending', undefined);
                    setLocalStorageKey('archiveSortingOn', '');
                    setLocalStorageKey('archiveScr', action.payload);
                    stateObj.archiveView.scr = action.payload;
                    stateObj.archiveView.sortColumn = '';
                    stateObj.archiveView.sortAscending = undefined;
                    stateObj.archiveView.sortingOn = '';

                    setLocalStorageKey('archivePendingSortColumn', '');
                    setLocalStorageKey('archivePendingSortAscending', undefined);
                    setLocalStorageKey('archivePendingSortingOn', '');
                    setLocalStorageKey('archivePendingScr', action.payload);
                    stateObj.archivePendingView.scr = action.payload;
                    stateObj.archivePendingView.sortColumn = '';
                    stateObj.archivePendingView.sortAscending = undefined;
                    stateObj.archivePendingView.sortingOn = '';

                    setLocalStorageKey('ideasForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasForAcceptanceScr', action.payload);
                    stateObj.ideasForAcceptanceView.scr = action.payload;
                    stateObj.ideasForAcceptanceView.sortColumn = '';
                    stateObj.ideasForAcceptanceView.sortAscending = undefined;
                    stateObj.ideasForAcceptanceView.sortingOn = '';

                    setLocalStorageKey('shareSortColumn', '');
                    setLocalStorageKey('shareSortAscending', undefined);
                    setLocalStorageKey('shareSortingOn', '');
                    setLocalStorageKey('shareScr', action.payload);
                    stateObj.shareView.scr = action.payload;
                    stateObj.shareView.sortColumn = '';
                    stateObj.shareView.sortAscending = undefined;
                    stateObj.shareView.sortingOn = '';

                    setLocalStorageKey('transferSortColumn', '');
                    setLocalStorageKey('transferSortAscending', undefined);
                    setLocalStorageKey('transferSortingOn', '');
                    setLocalStorageKey('transferScr', action.payload);
                    stateObj.transferView.scr = action.payload;
                    stateObj.transferView.sortColumn = '';
                    stateObj.transferView.sortAscending = undefined;
                    stateObj.transferView.sortingOn = '';

                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('ideaGenrationSortColumn', action.payload.column);
                    setLocalStorageKey('ideaGenrationSortAscending', action.payload.direction);
                    setLocalStorageKey('ideaGenrationSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideaGenrationScr', false);
                    stateObj.ideaGenrationView.scr = false;
                    stateObj.ideaGenrationView.sortColumn = action.payload.column;
                    stateObj.ideaGenrationView.sortAscending = action.payload.direction;
                    stateObj.ideaGenrationView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 4:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('archiveSortColumn', '');
                    setLocalStorageKey('archiveSortAscending', undefined);
                    setLocalStorageKey('archiveSortingOn', '');
                    setLocalStorageKey('archiveScr', action.payload);
                    stateObj.archiveView.scr = action.payload;
                    stateObj.archiveView.sortColumn = '';
                    stateObj.archiveView.sortAscending = undefined;
                    stateObj.archiveView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    stateObj.defaultView.scr = false;
                    stateObj.defaultView.sortColumn = action.payload.column;
                    stateObj.defaultView.sortAscending = action.payload.direction;
                    stateObj.defaultView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    stateObj.archiveView.scr = false;
                    stateObj.archiveView.sortColumn = action.payload.column;
                    stateObj.archiveView.sortAscending = action.payload.direction;
                    stateObj.archiveView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    stateObj.archivePendingView.scr = false;
                    stateObj.archivePendingView.sortColumn = action.payload.column;
                    stateObj.archivePendingView.sortAscending = action.payload.direction;
                    stateObj.archivePendingView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    stateObj.ideasForAcceptanceView.scr = false;
                    stateObj.ideasForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasForAcceptanceView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    stateObj.shareView.scr = false;
                    stateObj.shareView.sortColumn = action.payload.column;
                    stateObj.shareView.sortAscending = action.payload.direction;
                    stateObj.shareView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    stateObj.transferView.scr = false;
                    stateObj.transferView.sortColumn = action.payload.column;
                    stateObj.transferView.sortAscending = action.payload.direction;
                    stateObj.transferView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 5:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('archivePendingSortColumn', '');
                    setLocalStorageKey('archivePendingSortAscending', undefined);
                    setLocalStorageKey('archivePendingSortingOn', '');
                    setLocalStorageKey('archivePendingScr', action.payload);
                    stateObj.archivePendingView.scr = action.payload;
                    stateObj.archivePendingView.sortColumn = '';
                    stateObj.archivePendingView.sortAscending = undefined;
                    stateObj.archivePendingView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    stateObj.defaultView.scr = false;
                    stateObj.defaultView.sortColumn = action.payload.column;
                    stateObj.defaultView.sortAscending = action.payload.direction;
                    stateObj.defaultView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    stateObj.archiveView.scr = false;
                    stateObj.archiveView.sortColumn = action.payload.column;
                    stateObj.archiveView.sortAscending = action.payload.direction;
                    stateObj.archiveView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    stateObj.archivePendingView.scr = false;
                    stateObj.archivePendingView.sortColumn = action.payload.column;
                    stateObj.archivePendingView.sortAscending = action.payload.direction;
                    stateObj.archivePendingView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    stateObj.ideasForAcceptanceView.scr = false;
                    stateObj.ideasForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasForAcceptanceView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    stateObj.shareView.scr = false;
                    stateObj.shareView.sortColumn = action.payload.column;
                    stateObj.shareView.sortAscending = action.payload.direction;
                    stateObj.shareView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    stateObj.transferView.scr = false;
                    stateObj.transferView.sortColumn = action.payload.column;
                    stateObj.transferView.sortAscending = action.payload.direction;
                    stateObj.transferView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 6:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('ideasForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasForAcceptanceScr', action.payload);
                    stateObj.ideasForAcceptanceView.scr = action.payload;
                    stateObj.ideasForAcceptanceView.sortColumn = '';
                    stateObj.ideasForAcceptanceView.sortAscending = undefined;
                    stateObj.ideasForAcceptanceView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    stateObj.defaultView.scr = false;
                    stateObj.defaultView.sortColumn = action.payload.column;
                    stateObj.defaultView.sortAscending = action.payload.direction;
                    stateObj.defaultView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    stateObj.archiveView.scr = false;
                    stateObj.archiveView.sortColumn = action.payload.column;
                    stateObj.archiveView.sortAscending = action.payload.direction;
                    stateObj.archiveView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    stateObj.archivePendingView.scr = false;
                    stateObj.archivePendingView.sortColumn = action.payload.column;
                    stateObj.archivePendingView.sortAscending = action.payload.direction;
                    stateObj.archivePendingView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    stateObj.ideasForAcceptanceView.scr = false;
                    stateObj.ideasForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasForAcceptanceView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    stateObj.shareView.scr = false;
                    stateObj.shareView.sortColumn = action.payload.column;
                    stateObj.shareView.sortAscending = action.payload.direction;
                    stateObj.shareView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    stateObj.transferView.scr = false;
                    stateObj.transferView.sortColumn = action.payload.column;
                    stateObj.transferView.sortAscending = action.payload.direction;
                    stateObj.transferView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 7:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('planningSortColumn', '');
                    setLocalStorageKey('planningSortAscending', undefined);
                    setLocalStorageKey('planningSortingOn', '');
                    setLocalStorageKey('planningScr', action.payload);
                    stateObj.planningView.scr = action.payload;
                    stateObj.planningView.sortColumn = '';
                    stateObj.planningView.sortAscending = undefined;
                    stateObj.planningView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('planningSortColumn', action.payload.column);
                    setLocalStorageKey('planningSortAscending', action.payload.direction);
                    setLocalStorageKey('planningSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('planningScr', false);
                    stateObj.planningView.scr = false;
                    stateObj.planningView.sortColumn = action.payload.column;
                    stateObj.planningView.sortAscending = action.payload.direction;
                    stateObj.planningView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 8:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('trackingSortColumn', '');
                    setLocalStorageKey('trackingSortAscending', undefined);
                    setLocalStorageKey('trackingSortingOn', '');
                    setLocalStorageKey('trackingScr', action.payload);
                    stateObj.trackingView.scr = action.payload;
                    stateObj.trackingView.sortColumn = '';
                    stateObj.trackingView.sortAscending = undefined;
                    stateObj.trackingView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('trackingSortColumn', action.payload.column);
                    setLocalStorageKey('trackingSortAscending', action.payload.direction);
                    setLocalStorageKey('trackingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('trackingScr', false);
                    stateObj.trackingView.scr = false;
                    stateObj.trackingView.sortColumn = action.payload.column;
                    stateObj.trackingView.sortAscending = action.payload.direction;
                    stateObj.trackingView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 9:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('implementationCustomSortColumn', '');
                    setLocalStorageKey('implementationCustomSortAscending', undefined);
                    setLocalStorageKey('implementationCustomSortingOn', '');
                    setLocalStorageKey('implementationCustomScr', action.payload);
                    stateObj.implementationCustomView.scr = action.payload;
                    stateObj.implementationCustomView.sortColumn = '';
                    stateObj.implementationCustomView.sortAscending = undefined;
                    stateObj.implementationCustomView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('implementationCustomSortColumn', action.payload.column);
                    setLocalStorageKey('implementationCustomSortAscending', action.payload.direction);
                    setLocalStorageKey('implementationCustomSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('implementationCustomScr', false);
                    stateObj.implementationCustomView.scr = false;
                    stateObj.implementationCustomView.sortColumn = action.payload.column;
                    stateObj.implementationCustomView.sortAscending = action.payload.direction;
                    stateObj.implementationCustomView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 10:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('shareSortColumn', '');
                    setLocalStorageKey('shareSortAscending', undefined);
                    setLocalStorageKey('shareSortingOn', '');
                    setLocalStorageKey('shareScr', action.payload);
                    stateObj.shareView.scr = action.payload;
                    stateObj.shareView.sortColumn = '';
                    stateObj.shareView.sortAscending = undefined;
                    stateObj.shareView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    stateObj.defaultView.scr = false;
                    stateObj.defaultView.sortColumn = action.payload.column;
                    stateObj.defaultView.sortAscending = action.payload.direction;
                    stateObj.defaultView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    stateObj.archiveView.scr = false;
                    stateObj.archiveView.sortColumn = action.payload.column;
                    stateObj.archiveView.sortAscending = action.payload.direction;
                    stateObj.archiveView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    stateObj.archivePendingView.scr = false;
                    stateObj.archivePendingView.sortColumn = action.payload.column;
                    stateObj.archivePendingView.sortAscending = action.payload.direction;
                    stateObj.archivePendingView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    stateObj.ideasForAcceptanceView.scr = false;
                    stateObj.ideasForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasForAcceptanceView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    stateObj.shareView.scr = false;
                    stateObj.shareView.sortColumn = action.payload.column;
                    stateObj.shareView.sortAscending = action.payload.direction;
                    stateObj.shareView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    stateObj.transferView.scr = false;
                    stateObj.transferView.sortColumn = action.payload.column;
                    stateObj.transferView.sortAscending = action.payload.direction;
                    stateObj.transferView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 11:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('transferSortColumn', '');
                    setLocalStorageKey('transferSortAscending', undefined);
                    setLocalStorageKey('transferSortingOn', '');
                    setLocalStorageKey('transferScr', action.payload);
                    stateObj.transferView.scr = action.payload;
                    stateObj.transferView.sortColumn = '';
                    stateObj.transferView.sortAscending = undefined;
                    stateObj.transferView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('defaultSortColumn', action.payload.column);
                    setLocalStorageKey('defaultSortAscending', action.payload.direction);
                    setLocalStorageKey('defaultSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('defaultScr', false);
                    stateObj.defaultView.scr = false;
                    stateObj.defaultView.sortColumn = action.payload.column;
                    stateObj.defaultView.sortAscending = action.payload.direction;
                    stateObj.defaultView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archiveSortColumn', action.payload.column);
                    setLocalStorageKey('archiveSortAscending', action.payload.direction);
                    setLocalStorageKey('archiveSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archiveScr', false);
                    stateObj.archiveView.scr = false;
                    stateObj.archiveView.sortColumn = action.payload.column;
                    stateObj.archiveView.sortAscending = action.payload.direction;
                    stateObj.archiveView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('archivePendingSortColumn', action.payload.column);
                    setLocalStorageKey('archivePendingSortAscending', action.payload.direction);
                    setLocalStorageKey('archivePendingSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('archivePendingScr', false);
                    stateObj.archivePendingView.scr = false;
                    stateObj.archivePendingView.sortColumn = action.payload.column;
                    stateObj.archivePendingView.sortAscending = action.payload.direction;
                    stateObj.archivePendingView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('ideasForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasForAcceptanceScr', false);
                    stateObj.ideasForAcceptanceView.scr = false;
                    stateObj.ideasForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasForAcceptanceView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('shareSortColumn', action.payload.column);
                    setLocalStorageKey('shareSortAscending', action.payload.direction);
                    setLocalStorageKey('shareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('shareScr', false);
                    stateObj.shareView.scr = false;
                    stateObj.shareView.sortColumn = action.payload.column;
                    stateObj.shareView.sortAscending = action.payload.direction;
                    stateObj.shareView.sortingOn = action.payload.sortingOn;

                    setLocalStorageKey('transferSortColumn', action.payload.column);
                    setLocalStorageKey('transferSortAscending', action.payload.direction);
                    setLocalStorageKey('transferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('transferScr', false);
                    stateObj.transferView.scr = false;
                    stateObj.transferView.sortColumn = action.payload.column;
                    stateObj.transferView.sortAscending = action.payload.direction;
                    stateObj.transferView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 12:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('ideasSentForAcceptanceSortColumn', '');
                    setLocalStorageKey('ideasSentForAcceptanceSortAscending', undefined);
                    setLocalStorageKey('ideasSentForAcceptanceSortingOn', '');
                    setLocalStorageKey('ideasSentForAcceptanceScr', action.payload);
                    stateObj.ideasSentForAcceptanceView.scr = action.payload;
                    stateObj.ideasSentForAcceptanceView.sortColumn = '';
                    stateObj.ideasSentForAcceptanceView.sortAscending = undefined;
                    stateObj.ideasSentForAcceptanceView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('ideasSentForAcceptanceSortColumn', action.payload.column);
                    setLocalStorageKey('ideasSentForAcceptanceSortAscending', action.payload.direction);
                    setLocalStorageKey('ideasSentForAcceptanceSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('ideasSentForAcceptanceScr', false);
                    stateObj.ideasSentForAcceptanceView.scr = false;
                    stateObj.ideasSentForAcceptanceView.sortColumn = action.payload.column;
                    stateObj.ideasSentForAcceptanceView.sortAscending = action.payload.direction;
                    stateObj.ideasSentForAcceptanceView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 13:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('sentForShareSortColumn', '');
                    setLocalStorageKey('sentForShareSortAscending', undefined);
                    setLocalStorageKey('sentForShareSortingOn', '');
                    setLocalStorageKey('sentForShareScr', action.payload);
                    stateObj.sentForShareView.scr = action.payload;
                    stateObj.sentForShareView.sortColumn = '';
                    stateObj.sentForShareView.sortAscending = undefined;
                    stateObj.sentForShareView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('sentForShareSortColumn', action.payload.column);
                    setLocalStorageKey('sentForShareSortAscending', action.payload.direction);
                    setLocalStorageKey('sentForShareSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('sentForShareScr', false);
                    stateObj.sentForShareView.scr = false;
                    stateObj.sentForShareView.sortColumn = action.payload.column;
                    stateObj.sentForShareView.sortAscending = action.payload.direction;
                    stateObj.sentForShareView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        case 14:
            switch (action.type) {
                case 'SCR_SORT':
                case 'SCR_SORT_IDEAGROUP':
                    setLocalStorageKey('sentForTransferSortColumn', '');
                    setLocalStorageKey('sentForTransferSortAscending', undefined);
                    setLocalStorageKey('sentForTransferSortingOn', '');
                    setLocalStorageKey('sentForTransferScr', action.payload);
                    stateObj.sentForTransferView.scr = action.payload;
                    stateObj.sentForTransferView.sortColumn = '';
                    stateObj.sentForTransferView.sortAscending = undefined;
                    stateObj.sentForTransferView.sortingOn = '';
                    return stateObj;
                case 'IDEA_LIST_SORT':
                case 'IDEAGROUP_LIST_SORT':
                case 'SORT_OUTGOING_VIEWS':
                    setLocalStorageKey('sentForTransferSortColumn', action.payload.column);
                    setLocalStorageKey('sentForTransferSortAscending', action.payload.direction);
                    setLocalStorageKey('sentForTransferSortingOn', action.payload.sortingOn);
                    setLocalStorageKey('sentForTransferScr', false);
                    stateObj.sentForTransferView.scr = false;
                    stateObj.sentForTransferView.sortColumn = action.payload.column;
                    stateObj.sentForTransferView.sortAscending = action.payload.direction;
                    stateObj.sentForTransferView.sortingOn = action.payload.sortingOn;
                    return stateObj;
                default:
                    return state;
            }
        default:
            return state;
    }
}

const sortingReducer = (state = [], action) => {
    const stateObj = { ...state };
    switch (action.type) {
        case 'IDEA_LIST_SORT':
        case 'IDEAGROUP_LIST_SORT':
        case 'SORT_OUTGOING_VIEWS':
        case 'SCR_SORT':
        case 'SCR_SORT_IDEAGROUP':
            return updateSortingFilters(stateObj, action);
        case 'SORT_IMPLEMENTATION_IDEAS':
            setLocalStorageKey('implementationIdeaSortColumn', action.payload.column);
            setLocalStorageKey('implementationIdeaSortAscending', action.payload.direction);
            stateObj.implementationIdeaView.sortColumn = action.payload.column;
            stateObj.implementationIdeaView.sortAscending = action.payload.direction;
            return stateObj;
        case 'SORT_IMPLEMENTATION_LINEITEMS':
            setLocalStorageKey('implementationLineItemSortColumn', action.payload.column);
            setLocalStorageKey('implementationLineItemSortAscending', action.payload.direction);
            stateObj.implementationLineItemView.sortColumn = action.payload.column;
            stateObj.implementationLineItemView.sortAscending = action.payload.direction;
            return stateObj;
        case 'SORT_IMPLEMENTATION_METRICS':
            setLocalStorageKey('implementationMetricSortColumn', action.payload.column);
            setLocalStorageKey('implementationMetricSortAscending', action.payload.direction);
            stateObj.implementationMetricView.sortColumn = action.payload.column;
            stateObj.implementationMetricView.sortAscending = action.payload.direction;
            return stateObj;
        case 'SORT_IMPLEMENTATION_MILESTONES':
            setLocalStorageKey('implementationMileStoneSortColumn', action.payload.column);
            setLocalStorageKey('implementationMileStoneSortAscending', action.payload.direction);
            stateObj.implementationMileStoneView.sortColumn = action.payload.column;
            stateObj.implementationMileStoneView.sortAscending = action.payload.direction;
            return stateObj;
        default:
            return state;
    }
}

export default sortingReducer;
