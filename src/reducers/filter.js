import { setLocalStorageKey } from '../common/utils';
import _ from 'lodash';
import * as utils from '../common/utils';

const updateViewFilters = (state, action, entireState) => {
    const view = action.view;
    const stateObj = state;
    switch (view) {
        case 1: //DefaultView
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.defaultView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.defaultView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaDefaultView', action.payload);
                    stateObj.defaultView.isShowInactiveIdea = action.payload;
                    setLocalStorageKey('isShowInactiveIdeaCustomView', action.payload);
                    stateObj.customView.isShowInactiveIdea = action.payload;
                    setLocalStorageKey('isShowInactiveIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaDefaultView', action.payload);
                    stateObj.defaultView.isShowHighlightedIdea = action.payload;
                    setLocalStorageKey('isShowHighlightedIdeaCustomView', action.payload);
                    stateObj.customView.isShowHighlightedIdea = action.payload;
                    setLocalStorageKey('isShowHighlightedIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowHighlightedIdea = action.payload;

                    stateObj.defaultView.ideasOnCurrentPage = action.ideasOnCurrentPage;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionDefaultView', action.payload);
                    stateObj.defaultView.isShowRiskDistribution = action.payload;
                    setLocalStorageKey('isShowRiskDistributionCustomView', action.payload);
                    stateObj.customView.isShowRiskDistribution = action.payload;
                    setLocalStorageKey('isShowRiskDistributionIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'RESET_PAGING') {
                        stateObj.defaultView.currentPage = 1;
                    }
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.defaultView.currentPage = action.payload;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.defaultView.perPageIdeaCount = action.payload;
                    stateObj.defaultView.currentPage = 1;
                    utils.setLocalStorageKey('recordsPerPageDefaultView1', action.payload);
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.defaultView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.defaultView.isSelected = action.payload;
                    stateObj.defaultView.checkedIdeas = action.payload ? stateObj.defaultView.checkedIdeas + stateObj.defaultView.ideasOnCurrentPage :
                        stateObj.defaultView.checkedIdeas - stateObj.defaultView.ideasOnCurrentPage;
                    stateObj.defaultView.checkedIdeasOnCurrentPage = action.payload ? stateObj.defaultView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.defaultView.isSelected = action.payload;
                    stateObj.defaultView.checkedIdeas = 0;
                    stateObj.defaultView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.defaultView.checkedIdeas = action.checked ? stateObj.defaultView.checkedIdeas + 1 : stateObj.defaultView.checkedIdeas - 1;
                    stateObj.defaultView.checkedIdeasOnCurrentPage = action.checked ? stateObj.defaultView.checkedIdeasOnCurrentPage + 1 : stateObj.defaultView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.defaultView.ideasOnCurrentPage === stateObj.defaultView.checkedIdeasOnCurrentPage) {
                        stateObj.defaultView.isSelected = true;
                    } else {
                        stateObj.defaultView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedDefault }).length;
                    stateObj.defaultView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.defaultView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.defaultView.isSelected = true;
                    } else {
                        stateObj.defaultView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 2://Custom View
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.customView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.customView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaDefaultView', action.payload);
                    stateObj.defaultView.isShowInactiveIdea = action.payload;
                    setLocalStorageKey('isShowInactiveIdeaCustomView', action.payload);
                    stateObj.customView.isShowInactiveIdea = action.payload;
                    setLocalStorageKey('isShowInactiveIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaDefaultView', action.payload);
                    stateObj.defaultView.isShowHighlightedIdea = action.payload;
                    setLocalStorageKey('isShowHighlightedIdeaCustomView', action.payload);
                    stateObj.customView.isShowHighlightedIdea = action.payload;
                    setLocalStorageKey('isShowHighlightedIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowHighlightedIdea = action.payload;

                    stateObj.customView.ideasOnCurrentPage = action.ideasOnCurrentPage;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionDefaultView', action.payload);
                    stateObj.defaultView.isShowRiskDistribution = action.payload;
                    setLocalStorageKey('isShowRiskDistributionCustomView', action.payload);
                    stateObj.customView.isShowRiskDistribution = action.payload;
                    setLocalStorageKey('isShowRiskDistributionIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.customView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.customView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.customView.perPageIdeaCount = action.payload;
                    stateObj.customView.currentPage = 1;
                    utils.setLocalStorageKey('recordsPerPageCustomView1', action.payload);
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.customView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.customView.isSelected = action.payload;
                    stateObj.customView.checkedIdeas = action.payload ? stateObj.customView.checkedIdeas + stateObj.customView.ideasOnCurrentPage :
                        stateObj.customView.checkedIdeas - stateObj.customView.ideasOnCurrentPage;
                    stateObj.customView.checkedIdeasOnCurrentPage = action.payload ? stateObj.customView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.customView.isSelected = action.payload;
                    stateObj.customView.checkedIdeas = 0;
                    stateObj.customView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.customView.checkedIdeas = action.checked ? stateObj.customView.checkedIdeas + 1 : stateObj.customView.checkedIdeas - 1;
                    stateObj.customView.checkedIdeasOnCurrentPage = action.checked ? stateObj.customView.checkedIdeasOnCurrentPage + 1 : stateObj.customView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.customView.ideasOnCurrentPage === stateObj.customView.checkedIdeasOnCurrentPage) {
                        stateObj.customView.isSelected = true;
                    } else {
                        stateObj.customView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedCustom }).length;
                    stateObj.customView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.customView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.customView.isSelected = true;
                    } else {
                        stateObj.customView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 3://Simplified View
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.ideaGenrationView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.ideaGenrationView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaDefaultView', action.payload);
                    stateObj.defaultView.isShowInactiveIdea = action.payload;
                    setLocalStorageKey('isShowInactiveIdeaCustomView', action.payload);
                    stateObj.customView.isShowInactiveIdea = action.payload;
                    setLocalStorageKey('isShowInactiveIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaDefaultView', action.payload);
                    stateObj.defaultView.isShowHighlightedIdea = action.payload;
                    setLocalStorageKey('isShowHighlightedIdeaCustomView', action.payload);
                    stateObj.customView.isShowHighlightedIdea = action.payload;
                    setLocalStorageKey('isShowHighlightedIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowHighlightedIdea = action.payload;

                    stateObj.ideaGenrationView.ideasOnCurrentPage = action.ideasOnCurrentPage;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionDefaultView', action.payload);
                    stateObj.defaultView.isShowRiskDistribution = action.payload;
                    setLocalStorageKey('isShowRiskDistributionCustomView', action.payload);
                    stateObj.customView.isShowRiskDistribution = action.payload;
                    setLocalStorageKey('isShowRiskDistributionIdeaIdeaGenrationView', action.payload);
                    stateObj.ideaGenrationView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.ideaGenrationView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.ideaGenrationView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.ideaGenrationView.perPageIdeaCount = action.payload;
                    stateObj.ideaGenrationView.currentPage = 1;
                    utils.setLocalStorageKey('recordsPerPageIdeaGenrationView1', action.payload);
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.ideaGenrationView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.ideaGenrationView.isSelected = action.payload;
                    stateObj.ideaGenrationView.checkedIdeas = action.payload ? stateObj.ideaGenrationView.checkedIdeas + stateObj.ideaGenrationView.ideasOnCurrentPage :
                        stateObj.ideaGenrationView.checkedIdeas - stateObj.ideaGenrationView.ideasOnCurrentPage;
                    stateObj.ideaGenrationView.checkedIdeasOnCurrentPage = action.payload ? stateObj.ideaGenrationView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.ideaGenrationView.isSelected = action.payload;
                    stateObj.ideaGenrationView.checkedIdeas = 0;
                    stateObj.ideaGenrationView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.ideaGenrationView.checkedIdeas = action.checked ? stateObj.ideaGenrationView.checkedIdeas + 1 : stateObj.ideaGenrationView.checkedIdeas - 1;
                    stateObj.ideaGenrationView.checkedIdeasOnCurrentPage = action.checked ? stateObj.ideaGenrationView.checkedIdeasOnCurrentPage + 1 : stateObj.ideaGenrationView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.ideaGenrationView.ideasOnCurrentPage === stateObj.ideaGenrationView.checkedIdeasOnCurrentPage) {
                        stateObj.ideaGenrationView.isSelected = true;
                    } else {
                        stateObj.ideaGenrationView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedSimplified }).length;
                    stateObj.ideaGenrationView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.ideaGenrationView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.ideaGenrationView.isSelected = true;
                    } else {
                        stateObj.ideaGenrationView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 4:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.archiveView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.archiveView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaArchiveView', action.payload);
                    stateObj.archiveView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaArchiveView', action.payload);
                    stateObj.archiveView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionArchiveView', action.payload);
                    stateObj.archiveView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.archiveView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.archiveView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.archiveView.perPageIdeaCount = action.payload;
                    stateObj.archiveView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.archiveView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.archiveView.isSelected = action.payload;
                    stateObj.archiveView.checkedIdeas = action.payload ? stateObj.archiveView.checkedIdeas + stateObj.archiveView.ideasOnCurrentPage :
                        stateObj.archiveView.checkedIdeas - stateObj.archiveView.ideasOnCurrentPage;
                    stateObj.archiveView.checkedIdeasOnCurrentPage = action.payload ? stateObj.archiveView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.archiveView.isSelected = action.payload;
                    stateObj.archiveView.checkedIdeas = 0;
                    stateObj.archiveView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.archiveView.checkedIdeas = action.checked ? stateObj.archiveView.checkedIdeas + 1 : stateObj.archiveView.checkedIdeas - 1;
                    stateObj.archiveView.checkedIdeasOnCurrentPage = action.checked ? stateObj.archiveView.checkedIdeasOnCurrentPage + 1 : stateObj.archiveView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.archiveView.ideasOnCurrentPage === stateObj.archiveView.checkedIdeasOnCurrentPage) {
                        stateObj.archiveView.isSelected = true;
                    } else {
                        stateObj.archiveView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedArchive }).length;
                    stateObj.archiveView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.archiveView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.archiveView.isSelected = true;
                    } else {
                        stateObj.archiveView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 5:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.archivePendingView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.archivePendingView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaArchivePendingView', action.payload);
                    stateObj.archivePendingView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaArchivePendingView', action.payload);
                    stateObj.archivePendingView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionArchivePendingView', action.payload);
                    stateObj.archivePendingView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.archivePendingView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.archivePendingView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.archivePendingView.perPageIdeaCount = action.payload;
                    stateObj.archivePendingView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.archivePendingView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.archivePendingView.isSelected = action.payload;
                    stateObj.archivePendingView.checkedIdeas = action.payload ? stateObj.archivePendingView.checkedIdeas + stateObj.archivePendingView.ideasOnCurrentPage :
                        stateObj.archivePendingView.checkedIdeas - stateObj.archivePendingView.ideasOnCurrentPage;
                    stateObj.archivePendingView.checkedIdeasOnCurrentPage = action.payload ? stateObj.archivePendingView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.archivePendingView.isSelected = action.payload;
                    stateObj.archivePendingView.checkedIdeas = 0;
                    stateObj.archivePendingView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.archivePendingView.checkedIdeas = action.checked ? stateObj.archivePendingView.checkedIdeas + 1 : stateObj.archivePendingView.checkedIdeas - 1;
                    stateObj.archivePendingView.checkedIdeasOnCurrentPage = action.checked ? stateObj.archivePendingView.checkedIdeasOnCurrentPage + 1 : stateObj.archivePendingView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.archivePendingView.ideasOnCurrentPage === stateObj.archivePendingView.checkedIdeasOnCurrentPage) {
                        stateObj.archivePendingView.isSelected = true;
                    } else {
                        stateObj.archivePendingView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedArchivePending }).length;
                    stateObj.archivePendingView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.archivePendingView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.archivePendingView.isSelected = true;
                    } else {
                        stateObj.archivePendingView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 6:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.ideasForAcceptanceView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.ideasForAcceptanceView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaIdeasForAcceptanceView', action.payload);
                    stateObj.ideasForAcceptanceView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaIdeasForAcceptanceView', action.payload);
                    stateObj.ideasForAcceptanceView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionIdeasForAcceptanceView', action.payload);
                    stateObj.ideasForAcceptanceView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.ideasForAcceptanceView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.ideasForAcceptanceView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.ideasForAcceptanceView.perPageIdeaCount = action.payload;
                    stateObj.ideasForAcceptanceView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.ideasForAcceptanceView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.ideasForAcceptanceView.isSelected = action.payload;
                    stateObj.ideasForAcceptanceView.checkedIdeas = action.payload ? stateObj.ideasForAcceptanceView.checkedIdeas + stateObj.ideasForAcceptanceView.ideasOnCurrentPage :
                        stateObj.ideasForAcceptanceView.checkedIdeas - stateObj.ideasForAcceptanceView.ideasOnCurrentPage;
                    stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage = action.payload ? stateObj.ideasForAcceptanceView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.ideasForAcceptanceView.isSelected = action.payload;
                    stateObj.ideasForAcceptanceView.checkedIdeas = 0;
                    stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.ideasForAcceptanceView.checkedIdeas = action.checked ? stateObj.ideasForAcceptanceView.checkedIdeas + 1 : stateObj.ideasForAcceptanceView.checkedIdeas - 1;
                    stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage = action.checked ? stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage + 1 : stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.ideasForAcceptanceView.ideasOnCurrentPage === stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage) {
                        stateObj.ideasForAcceptanceView.isSelected = true;
                    } else {
                        stateObj.ideasForAcceptanceView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedIdeasForAcceptance }).length;
                    stateObj.ideasForAcceptanceView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.ideasForAcceptanceView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.ideasForAcceptanceView.isSelected = true;
                    } else {
                        stateObj.ideasForAcceptanceView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 7:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.planningView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.planningView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaPlanningView', action.payload);
                    stateObj.planningView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaPlanningView', action.payload);
                    stateObj.planningView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionPlanningView', action.payload);
                    stateObj.planningView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.planningView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.planningView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.planningView.perPageIdeaCount = action.payload;
                    stateObj.planningView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.planningView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.planningView.isSelected = action.payload;
                    stateObj.planningView.checkedIdeas = action.payload ? stateObj.planningView.checkedIdeas + stateObj.planningView.ideasOnCurrentPage :
                        stateObj.planningView.checkedIdeas - stateObj.planningView.ideasOnCurrentPage;
                    stateObj.planningView.checkedIdeasOnCurrentPage = action.payload ? stateObj.planningView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.planningView.isSelected = action.payload;
                    stateObj.planningView.checkedIdeas = 0;
                    stateObj.planningView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.planningView.checkedIdeas = action.checked ? stateObj.planningView.checkedIdeas + 1 : stateObj.planningView.checkedIdeas - 1;
                    stateObj.planningView.checkedIdeasOnCurrentPage = action.checked ? stateObj.planningView.checkedIdeasOnCurrentPage + 1 : stateObj.planningView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.planningView.ideasOnCurrentPage === stateObj.planningView.checkedIdeasOnCurrentPage) {
                        stateObj.planningView.isSelected = true;
                    } else {
                        stateObj.planningView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedPlanning }).length;
                    stateObj.planningView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.planningView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.planningView.isSelected = true;
                    } else {
                        stateObj.planningView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 8:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.trackingView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.trackingView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaTrackingView', action.payload);
                    stateObj.trackingView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaTrackingView', action.payload);
                    stateObj.trackingView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionTrackingView', action.payload);
                    stateObj.trackingView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.trackingView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.trackingView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.trackingView.perPageIdeaCount = action.payload;
                    stateObj.trackingView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.trackingView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.trackingView.isSelected = action.payload;
                    stateObj.trackingView.checkedIdeas = action.payload ? stateObj.trackingView.checkedIdeas + stateObj.trackingView.ideasOnCurrentPage :
                        stateObj.trackingView.checkedIdeas - stateObj.trackingView.ideasOnCurrentPage;
                    stateObj.trackingView.checkedIdeasOnCurrentPage = action.payload ? stateObj.trackingView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.trackingView.isSelected = action.payload;
                    stateObj.trackingView.checkedIdeas = 0;
                    stateObj.trackingView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.trackingView.checkedIdeas = action.checked ? stateObj.trackingView.checkedIdeas + 1 : stateObj.trackingView.checkedIdeas - 1;
                    stateObj.trackingView.checkedIdeasOnCurrentPage = action.checked ? stateObj.trackingView.checkedIdeasOnCurrentPage + 1 : stateObj.trackingView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.trackingView.ideasOnCurrentPage === stateObj.trackingView.checkedIdeasOnCurrentPage) {
                        stateObj.trackingView.isSelected = true;
                    } else {
                        stateObj.trackingView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedTracking }).length;
                    stateObj.trackingView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.trackingView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.trackingView.isSelected = true;
                    } else {
                        stateObj.trackingView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 9:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.implementationCustomView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.implementationCustomView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaImplementationCustomView', action.payload);
                    stateObj.implementationCustomView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaImplementationCustomView', action.payload);
                    stateObj.implementationCustomView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionImplementationCustomView', action.payload);
                    stateObj.implementationCustomView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.implementationCustomView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.implementationCustomView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.implementationCustomView.perPageIdeaCount = action.payload;
                    stateObj.implementationCustomView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.implementationCustomView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.implementationCustomView.isSelected = action.payload;
                    stateObj.implementationCustomView.checkedIdeas = action.payload ? stateObj.implementationCustomView.checkedIdeas + stateObj.implementationCustomView.ideasOnCurrentPage :
                        stateObj.implementationCustomView.checkedIdeas - stateObj.implementationCustomView.ideasOnCurrentPage;
                    stateObj.implementationCustomView.checkedIdeasOnCurrentPage = action.payload ? stateObj.implementationCustomView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.implementationCustomView.isSelected = action.payload;
                    stateObj.implementationCustomView.checkedIdeas = 0;
                    stateObj.implementationCustomView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.implementationCustomView.checkedIdeas = action.checked ? stateObj.implementationCustomView.checkedIdeas + 1 : stateObj.implementationCustomView.checkedIdeas - 1;
                    stateObj.implementationCustomView.checkedIdeasOnCurrentPage = action.checked ? stateObj.implementationCustomView.checkedIdeasOnCurrentPage + 1 : stateObj.implementationCustomView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.implementationCustomView.ideasOnCurrentPage === stateObj.implementationCustomView.checkedIdeasOnCurrentPage) {
                        stateObj.implementationCustomView.isSelected = true;
                    } else {
                        stateObj.implementationCustomView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedImplementationCustom }).length;
                    stateObj.archiveView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.archiveView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.archiveView.isSelected = true;
                    } else {
                        stateObj.archiveView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 10:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.shareView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.shareView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaShareView', action.payload);
                    stateObj.shareView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaShareView', action.payload);
                    stateObj.shareView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionShareView', action.payload);
                    stateObj.shareView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.shareView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.shareView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.shareView.perPageIdeaCount = action.payload;
                    stateObj.shareView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.shareView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.shareView.isSelected = action.payload;
                    stateObj.shareView.checkedIdeas = action.payload ? stateObj.shareView.checkedIdeas +
                        stateObj.shareView.ideasOnCurrentPage :
                        stateObj.shareView.checkedIdeas - stateObj.shareView.ideasOnCurrentPage;
                    stateObj.shareView.checkedIdeasOnCurrentPage = action.payload ?
                        stateObj.shareView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.shareView.isSelected = action.payload;
                    stateObj.shareView.checkedIdeas = 0;
                    stateObj.shareView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.shareView.checkedIdeas = action.checked ? stateObj.shareView.checkedIdeas + 1 :
                        stateObj.shareView.checkedIdeas - 1;
                    stateObj.shareView.checkedIdeasOnCurrentPage = action.checked ?
                        stateObj.shareView.checkedIdeasOnCurrentPage + 1 :
                        stateObj.shareView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.shareView.ideasOnCurrentPage === stateObj.shareView.checkedIdeasOnCurrentPage) {
                        stateObj.shareView.isSelected = true;
                    } else {
                        stateObj.shareView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedShare }).length;
                    stateObj.shareView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.shareView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.shareView.isSelected = true;
                    } else {
                        stateObj.shareView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 11:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.transferView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.transferView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaTransferView', action.payload);
                    stateObj.transferView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaTransferView', action.payload);
                    stateObj.transferView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionTransferView', action.payload);
                    stateObj.transferView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.transferView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.transferView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.transferView.perPageIdeaCount = action.payload;
                    stateObj.transferView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.transferView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.transferView.isSelected = action.payload;
                    stateObj.transferView.checkedIdeas = action.payload ?
                        stateObj.transferView.checkedIdeas + stateObj.transferView.ideasOnCurrentPage :
                        stateObj.transferView.checkedIdeas - stateObj.transferView.ideasOnCurrentPage;
                    stateObj.transferView.checkedIdeasOnCurrentPage = action.payload ?
                        stateObj.transferView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.transferView.isSelected = action.payload;
                    stateObj.transferView.checkedIdeas = 0;
                    stateObj.transferView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.transferView.checkedIdeas = action.checked ?
                        stateObj.transferView.checkedIdeas + 1 : stateObj.transferView.checkedIdeas - 1;
                    stateObj.transferView.checkedIdeasOnCurrentPage = action.checked ?
                        stateObj.transferView.checkedIdeasOnCurrentPage + 1 :
                        stateObj.transferView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.transferView.ideasOnCurrentPage === stateObj.transferView.checkedIdeasOnCurrentPage) {
                        stateObj.transferView.isSelected = true;
                    } else {
                        stateObj.transferView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedTransfer }).length;
                    stateObj.transferView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.transferView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.transferView.isSelected = true;
                    } else {
                        stateObj.transferView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 12:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.ideasSentForAcceptanceView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.ideasSentForAcceptanceView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaIdeasSentForAcceptanceView', action.payload);
                    stateObj.ideasSentForAcceptanceView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaIdeasSentForAcceptanceView', action.payload);
                    stateObj.ideasSentForAcceptanceView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionIdeasSentForAcceptanceView', action.payload);
                    stateObj.ideasSentForAcceptanceView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.ideasSentForAcceptanceView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.ideasSentForAcceptanceView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.ideasSentForAcceptanceView.perPageIdeaCount = action.payload;
                    stateObj.ideasSentForAcceptanceView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.ideasSentForAcceptanceView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.ideasSentForAcceptanceView.isSelected = action.payload;
                    stateObj.ideasSentForAcceptanceView.checkedIdeas = action.payload ? stateObj.ideasSentForAcceptanceView.checkedIdeas + stateObj.ideasSentForAcceptanceView.ideasOnCurrentPage :
                        stateObj.ideasSentForAcceptanceView.checkedIdeas - stateObj.ideasSentForAcceptanceView.ideasOnCurrentPage;
                    stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage = action.payload ? stateObj.ideasSentForAcceptanceView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.ideasSentForAcceptanceView.isSelected = action.payload;
                    stateObj.ideasSentForAcceptanceView.checkedIdeas = 0;
                    stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.ideasSentForAcceptanceView.checkedIdeas = action.checked ? stateObj.ideasSentForAcceptanceView.checkedIdeas + 1 : stateObj.ideasSentForAcceptanceView.checkedIdeas - 1;
                    stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage = action.checked ? stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage + 1 : stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.ideasSentForAcceptanceView.ideasOnCurrentPage === stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage) {
                        stateObj.ideasSentForAcceptanceView.isSelected = true;
                    } else {
                        stateObj.ideasSentForAcceptanceView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedIdeasSentForAcceptance }).length;
                    stateObj.ideasSentForAcceptanceView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.ideasSentForAcceptanceView.isSelected = true;
                    } else {
                        stateObj.ideasSentForAcceptanceView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 13:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.sentForShareView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.sentForShareView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeasentForShareView', action.payload);
                    stateObj.sentForShareView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeasentForShareView', action.payload);
                    stateObj.sentForShareView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionsentForShareView', action.payload);
                    stateObj.sentForShareView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.sentForShareView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.sentForShareView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.sentForShareView.perPageIdeaCount = action.payload;
                    stateObj.sentForShareView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.sentForShareView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.sentForShareView.isSelected = action.payload;
                    stateObj.sentForShareView.checkedIdeas = action.payload ? stateObj.sentForShareView.checkedIdeas +
                        stateObj.sentForShareView.ideasOnCurrentPage :
                        stateObj.sentForShareView.checkedIdeas - stateObj.sentForShareView.ideasOnCurrentPage;
                    stateObj.sentForShareView.checkedIdeasOnCurrentPage = action.payload ?
                        stateObj.sentForShareView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.sentForShareView.isSelected = action.payload;
                    stateObj.sentForShareView.checkedIdeas = 0;
                    stateObj.sentForShareView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.sentForShareView.checkedIdeas = action.checked ? stateObj.sentForShareView.checkedIdeas + 1 :
                        stateObj.sentForShareView.checkedIdeas - 1;
                    stateObj.sentForShareView.checkedIdeasOnCurrentPage = action.checked ?
                        stateObj.sentForShareView.checkedIdeasOnCurrentPage + 1 :
                        stateObj.sentForShareView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.sentForShareView.ideasOnCurrentPage === stateObj.sentForShareView.checkedIdeasOnCurrentPage) {
                        stateObj.sentForShareView.isSelected = true;
                    } else {
                        stateObj.sentForShareView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedsentForShare }).length;
                    stateObj.sentForShareView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.sentForShareView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.sentForShareView.isSelected = true;
                    } else {
                        stateObj.sentForShareView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        case 14:
            switch (action.type) {
                case 'IDEA_SELECT':
                    stateObj.sentForTransferView.selectedIdea = action.payload;
                    return stateObj;
                case 'IDEA_COUNT':
                    stateObj.sentForTransferView.ideaCount = action.payload;
                    return stateObj;
                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeasentForTransferView', action.payload);
                    stateObj.sentForTransferView.isShowInactiveIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeasentForTransferView', action.payload);
                    stateObj.sentForTransferView.isShowHighlightedIdea = action.payload;
                    return stateObj;
                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionsentForTransferView', action.payload);
                    stateObj.sentForTransferView.isShowRiskDistribution = action.payload;
                    return stateObj;
                case 'PAGE_CHANGE':
                case 'RESET_PAGING':
                    if (action.type === 'PAGE_CHANGE') {
                        stateObj.sentForTransferView.currentPage = action.payload;
                    }
                    if (action.type === 'RESET_PAGING') {
                        stateObj.sentForTransferView.currentPage = 1;
                    }
                    return stateObj;
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    stateObj.sentForTransferView.perPageIdeaCount = action.payload;
                    stateObj.sentForTransferView.currentPage = 1;
                    return stateObj;
                case 'SET_IDEA_COUNTONPAGE':
                    stateObj.sentForTransferView.ideasOnCurrentPage = action.payload;
                    return stateObj;
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    stateObj.sentForTransferView.isSelected = action.payload;
                    stateObj.sentForTransferView.checkedIdeas = action.payload ?
                        stateObj.sentForTransferView.checkedIdeas + stateObj.sentForTransferView.ideasOnCurrentPage :
                        stateObj.sentForTransferView.checkedIdeas - stateObj.sentForTransferView.ideasOnCurrentPage;
                    stateObj.sentForTransferView.checkedIdeasOnCurrentPage = action.payload ?
                        stateObj.sentForTransferView.ideasOnCurrentPage : 0;
                    return stateObj;
                case 'UNCHECK_ALL_IDEAS':
                    stateObj.sentForTransferView.isSelected = action.payload;
                    stateObj.sentForTransferView.checkedIdeas = 0;
                    stateObj.sentForTransferView.checkedIdeasOnCurrentPage = 0;
                    return stateObj;
                case 'CHECK_IDEA':
                    stateObj.sentForTransferView.checkedIdeas = action.checked ?
                        stateObj.sentForTransferView.checkedIdeas + 1 : stateObj.sentForTransferView.checkedIdeas - 1;
                    stateObj.sentForTransferView.checkedIdeasOnCurrentPage = action.checked ?
                        stateObj.sentForTransferView.checkedIdeasOnCurrentPage + 1 :
                        stateObj.sentForTransferView.checkedIdeasOnCurrentPage - 1;;
                    if (stateObj.sentForTransferView.ideasOnCurrentPage === stateObj.sentForTransferView.checkedIdeasOnCurrentPage) {
                        stateObj.sentForTransferView.isSelected = true;
                    } else {
                        stateObj.sentForTransferView.isSelected = false;
                    }
                    return stateObj;
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedsentForTransfer }).length;
                    stateObj.sentForTransferView.ideasOnCurrentPage = totalFilteredIdeas;
                    stateObj.sentForTransferView.checkedIdeasOnCurrentPage = totalCheckedIdeas;
                    if ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) {
                        stateObj.sentForTransferView.isSelected = true;
                    } else {
                        stateObj.sentForTransferView.isSelected = false;
                    }
                    return stateObj;
                default:
                    return state;
            }
        default:
            return state;
    }
}

const filterReducer = (state = [], action, entireState) => {
    const stateObj = { ...state };
    switch (action.type) {
        case 'IDEA_COUNT':
        case 'IS_SHOW_INACTIVE_IDEA':
        case 'IS_SHOW_HIGHLIGHTED_IDEA':
        case 'PAGE_CHANGE':
        case 'PERPAGE_IDEACOUNT_CHANGE':
        case 'SET_IDEA_COUNTONPAGE':
        case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
        case 'UNCHECK_ALL_IDEAS':
        case 'CHECK_IDEA':
        case 'IDEA_SELECT':
        case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
        case 'RESET_PAGING':
        case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
        case 'SET_IDEADATA_COUNTONPAGE':
        case 'SET_IDEADATA_SORTING_ONVIEWCHANGE':
            return updateViewFilters(stateObj, action, entireState)
        case 'CREATE_IDEA':
            if (action.payload.data.Idea === null) return state;
            const configData = JSON.parse(action.payload.config.data);
            const action1 = { payload: action.payload.data.Idea.IdeaId, type: 'IDEA_SELECT', view: configData.view }
            const updatedState = updateViewFilters(stateObj, action1, entireState);
            updatedState.shouldCreatedNewIdea = false;
            return updatedState;
        case 'GROUP_FILTER':
            stateObj.defaultView.currentPage = 1;
            stateObj.customView.currentPage = 1;
            stateObj.ideaGenrationView.currentPage = 1;
            stateObj.archiveView.currentPage = 1;
            stateObj.archivePendingView.currentPage = 1;
            stateObj.ideasForAcceptanceView.currentPage = 1;
            stateObj.planningView.currentPage = 1;
            stateObj.trackingView.currentPage = 1;
            stateObj.implementationCustomView.currentPage = 1;
            stateObj.shareView.currentPage = 1;
            stateObj.transferView.currentPage = 1;
            stateObj.ideasSentForAcceptanceView.currentPage = 1;
            stateObj.sentForShareView.currentPage = 1;
            stateObj.sentForTransferView.currentPage = 1;
            stateObj.groupId = action.payload;
            if (entireState.selectedIdea !== null) {
                stateObj.isGroupChanged = true;
            } else {
                stateObj.isGroupChanged = false;
            }
            if (action.payload === null || action.payload === '00000000-0000-0000-0000-000000000000') {
                stateObj.ideaView = 'CompanyView';
                stateObj.isIdeaReadOnly = true;
            } else {
                stateObj.ideaView = 'Ideas';
                stateObj.isIdeaReadOnly = false;
            }
            return stateObj;
        case 'REMOVE_ISGROUP_CHANGE':
            stateObj.isGroupChanged = false;
            return stateObj;
        case 'ADD_ISGROUP_CHANGE':
            if (entireState.selectedIdea !== null) {
                stateObj.isGroupChanged = true;
            } else {
                stateObj.isGroupChanged = false;
            }
            return stateObj;
        case 'UPDATE_VIEW':
            if (action.payload === null || action.payload === '00000000-0000-0000-0000-000000000000') {
                stateObj.ideaView = 'CompanyView';
                stateObj.isIdeaReadOnly = true;
                stateObj.groupId = action.payload;
            } else {
                stateObj.ideaView = 'Ideas';
                stateObj.isIdeaReadOnly = false;
                stateObj.groupId = action.payload;
            }
            return stateObj;
        case 'UPDATE_GROUPID':
            if (entireState.selectedIdea !== null) {
                stateObj.isGroupChanged = true;
                stateObj.groupId = action.payload;
            } else {
                stateObj.isGroupChanged = false;
                stateObj.groupId = action.payload;
            }
            return stateObj;
        case 'UPDATE_DEVICETYPE':
            stateObj.deviceType = action.payload;
            return stateObj;
        case 'TOGGLE_TRANSFER_MODAL':
            stateObj.isTransferModalOpen = action.payload;
            return stateObj;
        case 'TOGGLE_MULTIGROUP_IDEAS_MODAL':
            stateObj.isMultiGroupIdeasModalOpen = action.payload;
            return stateObj;
        case 'CREATE_EMPTY_IDEA':
            const indexNewIdeaItem = utils.findItemIndex(entireState.ideas.ideas, 'IsNewIdea', true)
            if (indexNewIdeaItem > -1) {
                stateObj.shouldCreatedNewIdea = true;
            } else {
                stateObj.shouldCreatedNewIdea = false;
            }
            return stateObj;
        case 'CUSTOMIZE_IMPLEMENTATION_LINEITEM_VIEW':
            setLocalStorageKey('implementationLineItemViewCustomizationView', action.cutomizationView);
            stateObj.implementationLineItemViewCustomizationView = action.cutomizationView;
            return stateObj;
        case 'TOGGLE_SINGLE_ROW_FOR_MULTIGROUP_IDEA':
            stateObj.singleRowForMultigroupIdea = action.payload;
            return stateObj;
        default:
            return state;
    }
}

export default filterReducer;
