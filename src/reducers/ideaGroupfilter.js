import { setLocalStorageKey } from '../common/utils';
import _ from 'lodash';
import * as utils from '../common/utils';
import update from 'immutability-helper';
import { PROJECT_CHANGE } from '../actions/actionTypes';

const updateViewFilters = (state, action, entireState) => {
    const view = action.view;
    switch (view) {
        case 1:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        defaultView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        defaultView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaDefaultView', action.payload);
                    setLocalStorageKey('isShowInactiveIdeaCustomView', action.payload);
                    setLocalStorageKey('isShowInactiveIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowInactiveIdea: { $set: action.payload } },
                        customView: { isShowInactiveIdea: { $set: action.payload } },
                        ideaGenrationView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaDefaultView', action.payload);
                    setLocalStorageKey('isShowHighlightedIdeaCustomView', action.payload);
                    setLocalStorageKey('isShowHighlightedIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: {
                            isShowHighlightedIdea: { $set: action.payload },
                            ideasOnCurrentPage: { $set: action.ideasOnCurrentPage }
                        },
                        customView: { isShowHighlightedIdea: { $set: action.payload } },
                        ideaGenrationView: { isShowHighlightedIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionDefaultView', action.payload);
                    setLocalStorageKey('isShowRiskDistributionCustomView', action.payload);
                    setLocalStorageKey('isShowRiskDistributionIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowRiskDistribution: { $set: action.payload } },
                        customView: { isShowRiskDistribution: { $set: action.payload } },
                        ideaGenrationView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            defaultView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            defaultView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageDefaultView1', action.payload);
                    return update(state, {
                        defaultView: {
                            perPageIdeaCount: { $set: action.payload },
                            currentPage: { $set: 1 }
                        }
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        defaultView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        defaultView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.defaultView.checkedIdeas + state.defaultView.ideasOnCurrentPage :
                                        state.defaultView.checkedIdeas - state.defaultView.ideasOnCurrentPage
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.defaultView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        defaultView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: { $set: 0 },
                            checkedIdeasOnCurrentPage: { $set: 0 }
                        },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        defaultView:
                        {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.defaultView.checkedIdeas + 1 : state.defaultView.checkedIdeas - 1
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.defaultView.checkedIdeasOnCurrentPage + 1 : state.defaultView.checkedIdeasOnCurrentPage - 1
                                )
                            },
                            isSelected: {
                                $set:
                                    ((state.defaultView.ideasOnCurrentPage === state.defaultView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedDefault }).length;
                    return update(state, {
                        defaultView: {
                            ideasOnCurrentPage: { $set: totalFilteredIdeas },
                            checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas },
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 2://Custom View
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        customView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        customView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaDefaultView', action.payload);
                    setLocalStorageKey('isShowInactiveIdeaCustomView', action.payload);
                    setLocalStorageKey('isShowInactiveIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowInactiveIdea: { $set: action.payload } },
                        customView: { isShowInactiveIdea: { $set: action.payload } },
                        ideaGenrationView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaDefaultView', action.payload);
                    setLocalStorageKey('isShowHighlightedIdeaCustomView', action.payload);
                    setLocalStorageKey('isShowHighlightedIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowHighlightedIdea: { $set: action.payload } },
                        customView: {
                            isShowHighlightedIdea: { $set: action.payload },
                            ideasOnCurrentPage: { $set: action.ideasOnCurrentPage }
                        },
                        ideaGenrationView: { isShowHighlightedIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionDefaultView', action.payload);
                    setLocalStorageKey('isShowRiskDistributionCustomView', action.payload);
                    setLocalStorageKey('isShowRiskDistributionIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowRiskDistribution: { $set: action.payload } },
                        customView: { isShowRiskDistribution: { $set: action.payload } },
                        ideaGenrationView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            customView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            customView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageCustomView1', action.payload);
                    return update(state, {
                        customView: {
                            perPageIdeaCount: { $set: action.payload },
                            currentPage: { $set: 1 }
                        },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        customView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        customView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.customView.checkedIdeas + state.customView.ideasOnCurrentPage :
                                        state.customView.checkedIdeas - state.customView.ideasOnCurrentPage
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.customView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        customView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: { $set: 0 },
                            checkedIdeasOnCurrentPage: { $set: 0 }
                        },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        customView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.customView.checkedIdeas + 1 : state.customView.checkedIdeas - 1
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.customView.checkedIdeasOnCurrentPage + 1 : state.customView.checkedIdeasOnCurrentPage - 1
                                )
                            },
                            isSelected: {
                                $set:
                                    ((state.customView.ideasOnCurrentPage === state.customView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedCustom }).length;
                    return update(state, {
                        customView: {
                            ideasOnCurrentPage: { $set: totalFilteredIdeas },
                            checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas },
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 3://Simplified View
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        ideaGenrationView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        ideaGenrationView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaDefaultView', action.payload);
                    setLocalStorageKey('isShowInactiveIdeaCustomView', action.payload);
                    setLocalStorageKey('isShowInactiveIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowInactiveIdea: { $set: action.payload } },
                        customView: { isShowInactiveIdea: { $set: action.payload } },
                        ideaGenrationView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaDefaultView', action.payload);
                    setLocalStorageKey('isShowHighlightedIdeaCustomView', action.payload);
                    setLocalStorageKey('isShowHighlightedIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowHighlightedIdea: { $set: action.payload } },
                        customView: { isShowHighlightedIdea: { $set: action.payload } },
                        ideaGenrationView: {
                            isShowHighlightedIdea: { $set: action.payload },
                            ideasOnCurrentPage: { $set: action.ideasOnCurrentPage }
                        },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionDefaultView', action.payload);
                    setLocalStorageKey('isShowRiskDistributionCustomView', action.payload);
                    setLocalStorageKey('isShowRiskDistributionIdeaIdeaGenrationView', action.payload);
                    return update(state, {
                        defaultView: { isShowRiskDistribution: { $set: action.payload } },
                        customView: { isShowRiskDistribution: { $set: action.payload } },
                        ideaGenrationView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            ideaGenrationView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            ideaGenrationView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageIdeaGenrationView1', action.payload);
                    return update(state, {
                        ideaGenrationView: {
                            perPageIdeaCount: { $set: action.payload },
                            currentPage: { $set: 1 }
                        },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        ideaGenrationView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        ideaGenrationView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.ideaGenrationView.checkedIdeas + state.ideaGenrationView.ideasOnCurrentPage :
                                        state.ideaGenrationView.checkedIdeas - state.ideaGenrationView.ideasOnCurrentPage
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.ideaGenrationView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        ideaGenrationView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: { $set: 0 },
                            checkedIdeasOnCurrentPage: { $set: 0 }
                        },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        ideaGenrationView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.ideaGenrationView.checkedIdeas + 1 : state.ideaGenrationView.checkedIdeas - 1
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.ideaGenrationView.checkedIdeasOnCurrentPage + 1 : state.ideaGenrationView.checkedIdeasOnCurrentPage - 1
                                )
                            },
                            isSelected: {
                                $set:
                                    ((state.ideaGenrationView.ideasOnCurrentPage === state.ideaGenrationView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedSimplified }).length;
                    return update(state, {
                        ideaGenrationView: {
                            ideasOnCurrentPage: { $set: totalFilteredIdeas },
                            checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas },
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 4:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        archiveView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        archiveView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaArchiveView', action.payload);
                    return update(state, {
                        archiveView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaArchiveView', action.payload);
                    return update(state, {
                        archiveView: {
                            isShowHighlightedIdea: { $set: action.payload },
                            ideasOnCurrentPage: { $set: action.ideasOnCurrentPage }
                        },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionArchiveView', action.payload);
                    return update(state, {
                        archiveView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            archiveView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            archiveView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPagearchiveView1', action.payload);
                    return update(state, {
                        archiveView: {
                            perPageIdeaCount: { $set: action.payload },
                            currentPage: { $set: 1 }
                        },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        archiveView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        archiveView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.archiveView.checkedIdeas + state.archiveView.ideasOnCurrentPage :
                                        state.archiveView.checkedIdeas - state.archiveView.ideasOnCurrentPage
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.archiveView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        archiveView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: { $set: 0 },
                            checkedIdeasOnCurrentPage: { $set: 0 }
                        },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        archiveView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.archiveView.checkedIdeas + 1 : state.archiveView.checkedIdeas - 1
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.archiveView.checkedIdeasOnCurrentPage + 1 : state.archiveView.checkedIdeasOnCurrentPage - 1
                                )
                            },
                            isSelected: {
                                $set:
                                    ((state.archiveView.ideasOnCurrentPage === state.archiveView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedArchive }).length;
                    return update(state, {
                        archiveView: {
                            ideasOnCurrentPage: { $set: totalFilteredIdeas },
                            checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas },
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 5:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        archivePendingView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        archivePendingView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaArchivePendingView', action.payload);
                    return update(state, {
                        archivePendingView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaArchivePendingView', action.payload);
                    return update(state, {
                        archivePendingView: {
                            isShowHighlightedIdea: { $set: action.payload },
                            ideasOnCurrentPage: { $set: action.ideasOnCurrentPage }
                        },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionArchivePendingView', action.payload);
                    return update(state, {
                        archivePendingView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            archivePendingView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            archivePendingView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPagearchivePendingView1', action.payload);
                    return update(state, {
                        archivePendingView: {
                            perPageIdeaCount: { $set: action.payload },
                            currentPage: { $set: 1 }
                        },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        archivePendingView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        archivePendingView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.archivePendingView.checkedIdeas + state.archivePendingView.ideasOnCurrentPage :
                                        state.archivePendingView.checkedIdeas - state.archivePendingView.ideasOnCurrentPage
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.archivePendingView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        archivePendingView: {
                            isSelected: { $set: action.payload },
                            checkedIdeas: { $set: 0 },
                            checkedIdeasOnCurrentPage: { $set: 0 }
                        },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        archivePendingView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.archivePendingView.checkedIdeas + 1 : state.archivePendingView.checkedIdeas - 1
                                )
                            },
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.archivePendingView.checkedIdeasOnCurrentPage + 1 : state.archivePendingView.checkedIdeasOnCurrentPage - 1
                                )
                            },
                            isSelected: {
                                $set:
                                    ((state.archivePendingView.ideasOnCurrentPage === state.archivePendingView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedArchivePending }).length;
                    return update(state, {
                        archivePendingView: {
                            ideasOnCurrentPage: { $set: totalFilteredIdeas },
                            checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas },
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 6:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        ideasForAcceptanceView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        ideasForAcceptanceView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaIdeasForAcceptanceView', action.payload);
                    return update(state, {
                        ideasForAcceptanceView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaIdeasForAcceptanceView', action.payload);
                    return update(state, {
                        ideasForAcceptanceView: {
                            isShowHighlightedIdea: { $set: action.payload },
                            ideasOnCurrentPage: { $set: action.ideasOnCurrentPage }
                        },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionIdeasForAcceptanceView', action.payload);
                    return update(state, {
                        ideasForAcceptanceView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            ideasForAcceptanceView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            ideasForAcceptanceView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageideasForAcceptanceView1', action.payload);
                    return update(state, {
                        ideasForAcceptanceView: { perPageIdeaCount: { $set: action.payload } },
                        ideasForAcceptanceView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        ideasForAcceptanceView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        ideasForAcceptanceView: { isSelected: { $set: action.payload } },
                        ideasForAcceptanceView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.ideasForAcceptanceView.checkedIdeas + state.ideasForAcceptanceView.ideasOnCurrentPage :
                                        state.ideasForAcceptanceView.checkedIdeas - state.ideasForAcceptanceView.ideasOnCurrentPage
                                )
                            }
                        },
                        ideasForAcceptanceView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.ideasForAcceptanceView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        ideasForAcceptanceView: { isSelected: { $set: action.payload } },
                        ideasForAcceptanceView: { checkedIdeas: { $set: 0 } },
                        ideasForAcceptanceView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        ideasForAcceptanceView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.ideasForAcceptanceView.checkedIdeas + 1 : state.ideasForAcceptanceView.checkedIdeas - 1
                                )
                            }
                        },
                        ideasForAcceptanceView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.ideasForAcceptanceView.checkedIdeasOnCurrentPage + 1 : state.ideasForAcceptanceView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        ideasForAcceptanceView: {
                            isSelected: {
                                $set:
                                    ((state.ideasForAcceptanceView.ideasOnCurrentPage === state.ideasForAcceptanceView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedIdeasForAcceptance }).length;
                    return update(state, {
                        ideasForAcceptanceView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        ideasForAcceptanceView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        ideasForAcceptanceView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 7:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        planningView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        planningView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaPlanningView', action.payload);
                    return update(state, {
                        planningView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaPlanningView', action.payload);
                    return update(state, {
                        planningView: { isShowHighlightedIdea: { $set: action.payload } },
                        planningView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionPlanningView', action.payload);
                    return update(state, {
                        planningView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            planningView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            planningView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageplanningView1', action.payload);
                    return update(state, {
                        planningView: { perPageIdeaCount: { $set: action.payload } },
                        planningView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        planningView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        planningView: { isSelected: { $set: action.payload } },
                        planningView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.planningView.checkedIdeas + state.planningView.ideasOnCurrentPage :
                                        state.planningView.checkedIdeas - state.planningView.ideasOnCurrentPage
                                )
                            }
                        },
                        planningView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.planningView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        planningView: { isSelected: { $set: action.payload } },
                        planningView: { checkedIdeas: { $set: 0 } },
                        planningView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        planningView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.planningView.checkedIdeas + 1 : state.planningView.checkedIdeas - 1
                                )
                            }
                        },
                        planningView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.planningView.checkedIdeasOnCurrentPage + 1 : state.planningView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        planningView: {
                            isSelected: {
                                $set:
                                    ((state.planningView.ideasOnCurrentPage === state.planningView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedPlanning }).length;
                    return update(state, {
                        planningView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        planningView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        planningView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 8:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        trackingView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        trackingView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaTrackingView', action.payload);
                    return update(state, {
                        trackingView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaTrackingView', action.payload);
                    return update(state, {
                        trackingView: { isShowHighlightedIdea: { $set: action.payload } },
                        trackingView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionTrackingView', action.payload);
                    return update(state, {
                        trackingView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            trackingView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            trackingView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPagetrackingView1', action.payload);
                    return update(state, {
                        trackingView: { perPageIdeaCount: { $set: action.payload } },
                        trackingView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        trackingView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        trackingView: { isSelected: { $set: action.payload } },
                        trackingView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.trackingView.checkedIdeas + state.trackingView.ideasOnCurrentPage :
                                        state.trackingView.checkedIdeas - state.trackingView.ideasOnCurrentPage
                                )
                            }
                        },
                        trackingView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.trackingView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        trackingView: { isSelected: { $set: action.payload } },
                        trackingView: { checkedIdeas: { $set: 0 } },
                        trackingView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        trackingView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.trackingView.checkedIdeas + 1 : state.trackingView.checkedIdeas - 1
                                )
                            }
                        },
                        trackingView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.trackingView.checkedIdeasOnCurrentPage + 1 : state.trackingView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        trackingView: {
                            isSelected: {
                                $set:
                                    ((state.trackingView.ideasOnCurrentPage === state.trackingView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedTracking }).length;
                    return update(state, {
                        trackingView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        trackingView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        trackingView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 9:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        implementationCustomView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        implementationCustomView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaImplementationCustomView', action.payload);
                    return update(state, {
                        implementationCustomView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaImplementationCustomView', action.payload);
                    return update(state, {
                        implementationCustomView: { isShowHighlightedIdea: { $set: action.payload } },
                        implementationCustomView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionImplementationCustomView', action.payload);
                    return update(state, {
                        implementationCustomView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            implementationCustomView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            implementationCustomView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageimplementationCustomView1', action.payload);
                    return update(state, {
                        implementationCustomView: { perPageIdeaCount: { $set: action.payload } },
                        implementationCustomView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        implementationCustomView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        implementationCustomView: { isSelected: { $set: action.payload } },
                        implementationCustomView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.implementationCustomView.checkedIdeas + state.implementationCustomView.ideasOnCurrentPage :
                                        state.implementationCustomView.checkedIdeas - state.implementationCustomView.ideasOnCurrentPage
                                )
                            }
                        },
                        implementationCustomView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.implementationCustomView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        implementationCustomView: { isSelected: { $set: action.payload } },
                        implementationCustomView: { checkedIdeas: { $set: 0 } },
                        implementationCustomView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        implementationCustomView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.implementationCustomView.checkedIdeas + 1 : state.implementationCustomView.checkedIdeas - 1
                                )
                            }
                        },
                        implementationCustomView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.implementationCustomView.checkedIdeasOnCurrentPage + 1 : state.implementationCustomView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        implementationCustomView: {
                            isSelected: {
                                $set:
                                    ((state.implementationCustomView.ideasOnCurrentPage === state.implementationCustomView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedImplementationCustom }).length;
                    return update(state, {
                        implementationCustomView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        implementationCustomView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        implementationCustomView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 10:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        shareView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        shareView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaShareView', action.payload);
                    return update(state, {
                        shareView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaShareView', action.payload);
                    return update(state, {
                        shareView: { isShowHighlightedIdea: { $set: action.payload } },
                        shareView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionShareView', action.payload);
                    return update(state, {
                        shareView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            shareView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            shareView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageshareView1', action.payload);
                    return update(state, {
                        shareView: { perPageIdeaCount: { $set: action.payload } },
                        shareView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        shareView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        shareView: { isSelected: { $set: action.payload } },
                        shareView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.shareView.checkedIdeas + state.shareView.ideasOnCurrentPage :
                                        state.shareView.checkedIdeas - state.shareView.ideasOnCurrentPage
                                )
                            }
                        },
                        shareView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.shareView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        shareView: { isSelected: { $set: action.payload } },
                        shareView: { checkedIdeas: { $set: 0 } },
                        shareView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        shareView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.shareView.checkedIdeas + 1 : state.shareView.checkedIdeas - 1
                                )
                            }
                        },
                        shareView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.shareView.checkedIdeasOnCurrentPage + 1 : state.shareView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        shareView: {
                            isSelected: {
                                $set:
                                    ((state.shareView.ideasOnCurrentPage === state.shareView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedShare }).length;
                    return update(state, {
                        shareView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        shareView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        shareView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 11:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        transferView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        transferView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaTransferView', action.payload);
                    return update(state, {
                        transferView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaTransferView', action.payload);
                    return update(state, {
                        transferView: { isShowHighlightedIdea: { $set: action.payload } },
                        transferView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionTransferView', action.payload);
                    return update(state, {
                        transferView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            transferView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            transferView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPagetransferView1', action.payload);
                    return update(state, {
                        transferView: { perPageIdeaCount: { $set: action.payload } },
                        transferView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        transferView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        transferView: { isSelected: { $set: action.payload } },
                        transferView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.transferView.checkedIdeas + state.transferView.ideasOnCurrentPage :
                                        state.transferView.checkedIdeas - state.transferView.ideasOnCurrentPage
                                )
                            }
                        },
                        transferView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.transferView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        transferView: { isSelected: { $set: action.payload } },
                        transferView: { checkedIdeas: { $set: 0 } },
                        transferView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        transferView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.transferView.checkedIdeas + 1 : state.transferView.checkedIdeas - 1
                                )
                            }
                        },
                        transferView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.transferView.checkedIdeasOnCurrentPage + 1 : state.transferView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        transferView: {
                            isSelected: {
                                $set:
                                    ((state.transferView.ideasOnCurrentPage === state.transferView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedTransfer }).length;
                    return update(state, {
                        transferView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        transferView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        transferView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 12:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        ideasSentForAcceptanceView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        ideasSentForAcceptanceView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaIdeasSentForAcceptanceView', action.payload);
                    return update(state, {
                        ideasSentForAcceptanceView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaIdeasSentForAcceptanceView', action.payload);
                    return update(state, {
                        ideasSentForAcceptanceView: { isShowHighlightedIdea: { $set: action.payload } },
                        ideasSentForAcceptanceView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionIdeasSentForAcceptanceView', action.payload);
                    return update(state, {
                        ideasSentForAcceptanceView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            ideasSentForAcceptanceView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            ideasSentForAcceptanceView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPageideasSentForAcceptanceView1', action.payload);
                    return update(state, {
                        ideasSentForAcceptanceView: { perPageIdeaCount: { $set: action.payload } },
                        ideasSentForAcceptanceView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        ideasSentForAcceptanceView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        ideasSentForAcceptanceView: { isSelected: { $set: action.payload } },
                        ideasSentForAcceptanceView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.ideasSentForAcceptanceView.checkedIdeas + state.ideasSentForAcceptanceView.ideasOnCurrentPage :
                                        state.ideasSentForAcceptanceView.checkedIdeas - state.ideasSentForAcceptanceView.ideasOnCurrentPage
                                )
                            }
                        },
                        ideasSentForAcceptanceView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.ideasSentForAcceptanceView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        ideasSentForAcceptanceView: { isSelected: { $set: action.payload } },
                        ideasSentForAcceptanceView: { checkedIdeas: { $set: 0 } },
                        ideasSentForAcceptanceView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        ideasSentForAcceptanceView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.ideasSentForAcceptanceView.checkedIdeas + 1 : state.ideasSentForAcceptanceView.checkedIdeas - 1
                                )
                            }
                        },
                        ideasSentForAcceptanceView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage + 1 : state.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        ideasSentForAcceptanceView: {
                            isSelected: {
                                $set:
                                    ((state.ideasSentForAcceptanceView.ideasOnCurrentPage === state.ideasSentForAcceptanceView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedIdeasSentForAcceptance }).length;
                    return update(state, {
                        ideasSentForAcceptanceView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        ideasSentForAcceptanceView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        ideasSentForAcceptanceView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 13:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        sentForShareView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        sentForShareView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaSentForShareView', action.payload);
                    return update(state, {
                        sentForShareView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaSentForShareView', action.payload);
                    return update(state, {
                        sentForShareView: { isShowHighlightedIdea: { $set: action.payload } },
                        sentForShareView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionSentForShareView', action.payload);
                    return update(state, {
                        sentForShareView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            sentForShareView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            sentForShareView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPagesentForShareView1', action.payload);
                    return update(state, {
                        sentForShareView: { perPageIdeaCount: { $set: action.payload } },
                        sentForShareView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        sentForShareView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        sentForShareView: { isSelected: { $set: action.payload } },
                        sentForShareView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.sentForShareView.checkedIdeas + state.sentForShareView.ideasOnCurrentPage :
                                        state.sentForShareView.checkedIdeas - state.sentForShareView.ideasOnCurrentPage
                                )
                            }
                        },
                        sentForShareView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.sentForShareView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        sentForShareView: { isSelected: { $set: action.payload } },
                        sentForShareView: { checkedIdeas: { $set: 0 } },
                        sentForShareView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        sentForShareView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.sentForShareView.checkedIdeas + 1 : state.sentForShareView.checkedIdeas - 1
                                )
                            }
                        },
                        sentForShareView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.sentForShareView.checkedIdeasOnCurrentPage + 1 : state.sentForShareView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        sentForShareView: {
                            isSelected: {
                                $set:
                                    ((state.sentForShareView.ideasOnCurrentPage === state.sentForShareView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedsentForShare }).length;
                    return update(state, {
                        sentForShareView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        sentForShareView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        sentForShareView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        case 14:
            switch (action.type) {
                case 'IDEA_SELECT':
                    return update(state, {
                        sentForTransferView: { selectedIdea: { $set: action.payload } },
                    });
                case 'IDEA_COUNT':
                case 'IDEAGROUP_COUNT':
                    return update(state, {
                        sentForTransferView: { ideaCount: { $set: action.payload } },
                    });

                case 'IS_SHOW_INACTIVE_IDEA':
                    setLocalStorageKey('isShowInactiveIdeaSentForTransferView', action.payload);
                    return update(state, {
                        sentForTransferView: { isShowInactiveIdea: { $set: action.payload } },
                    });

                case 'IS_SHOW_HIGHLIGHTED_IDEA':
                    setLocalStorageKey('isShowHighlightedIdeaSentForTransferView', action.payload);
                    return update(state, {
                        sentForTransferView: { isShowHighlightedIdea: { $set: action.payload } },
                        sentForTransferView: { ideasOnCurrentPage: { $set: action.ideasOnCurrentPage } },
                    });

                case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
                    setLocalStorageKey('isShowRiskDistributionSentForTransferView', action.payload);
                    return update(state, {
                        sentForTransferView: { isShowRiskDistribution: { $set: action.payload } },
                    });
                case 'PAGE_CHANGE':
                case 'PAGE_CHANGE_IDEAGROUPS':
                case 'RESET_PAGING':
                case 'RESET_PAGING_IDEAGROUPS':
                    if (action.type === 'RESET_PAGING' || action.type === 'RESET_PAGING_IDEAGROUPS') {
                        return update(state, {
                            sentForTransferView: { currentPage: { $set: 1 } },
                        });
                    }
                    if (action.type === 'PAGE_CHANGE' || action.type === 'PAGE_CHANGE_IDEAGROUPS') {
                        return update(state, {
                            sentForTransferView: { currentPage: { $set: action.payload } },
                        });
                    }
                case 'PERPAGE_IDEACOUNT_CHANGE':
                    utils.setLocalStorageKey('recordsPerPagesentForTransferView1', action.payload);
                    return update(state, {
                        sentForTransferView: { perPageIdeaCount: { $set: action.payload } },
                        sentForTransferView: { currentPage: { $set: 1 } },
                    });
                case 'SET_IDEA_COUNTONPAGE':
                    return update(state, {
                        sentForTransferView: { ideasOnCurrentPage: { $set: action.payload } },
                    });
                case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
                    return update(state, {
                        sentForTransferView: { isSelected: { $set: action.payload } },
                        sentForTransferView: {
                            checkedIdeas: {
                                $set: (
                                    action.payload ? state.sentForTransferView.checkedIdeas + state.sentForTransferView.ideasOnCurrentPage :
                                        state.sentForTransferView.checkedIdeas - state.sentForTransferView.ideasOnCurrentPage
                                )
                            }
                        },
                        sentForTransferView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.payload ? state.sentForTransferView.ideasOnCurrentPage : 0
                                )
                            }
                        },
                    });

                case 'UNCHECK_ALL_IDEAS':
                    return update(state, {
                        sentForTransferView: { isSelected: { $set: action.payload } },
                        sentForTransferView: { checkedIdeas: { $set: 0 } },
                        sentForTransferView: { checkedIdeasOnCurrentPage: { $set: 0 } },
                    });

                case 'CHECK_IDEA':
                    return update(state, {
                        sentForTransferView: {
                            checkedIdeas: {
                                $set: (
                                    action.checked ? state.sentForTransferView.checkedIdeas + 1 : state.sentForTransferView.checkedIdeas - 1
                                )
                            }
                        },
                        sentForTransferView: {
                            checkedIdeasOnCurrentPage: {
                                $set: (
                                    action.checked ? state.sentForTransferView.checkedIdeasOnCurrentPage + 1 : state.sentForTransferView.checkedIdeasOnCurrentPage - 1
                                )
                            }
                        },
                        sentForTransferView: {
                            isSelected: {
                                $set:
                                    ((state.sentForTransferView.ideasOnCurrentPage === state.sentForTransferView.checkedIdeasOnCurrentPage) ? true : false)
                            }
                        },
                    });
                case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
                    const ideaState = entireState.ideas.ideas;
                    const filteredIdeas = _.filter(ideaState, { 'IsCurrentlyShowing': true });
                    const totalFilteredIdeas = filteredIdeas.length;
                    const totalCheckedIdeas = filteredIdeas.filter(function (el) { return el.isIdeaCheckedsentForTransfer }).length;
                    return update(state, {
                        sentForTransferView: { ideasOnCurrentPage: { $set: totalFilteredIdeas } },
                        sentForTransferView: { checkedIdeasOnCurrentPage: { $set: totalCheckedIdeas } },
                        sentForTransferView: {
                            isSelected: {
                                $set:
                                    ((totalFilteredIdeas === totalCheckedIdeas) && totalFilteredIdeas !== 0 && totalCheckedIdeas !== 0) ? true : false
                            }
                        },
                    });
                default:
                    return state;
            }
        default:
            return state;
    }
}

const filterReducer = (state = [], action, entireState) => {
    switch (action.type) {
        case 'IDEA_COUNT':
        case 'IDEAGROUP_COUNT':
        case 'IS_SHOW_INACTIVE_IDEA':
        case 'IS_SHOW_HIGHLIGHTED_IDEA':
        case 'PAGE_CHANGE':
        case 'PAGE_CHANGE_IDEAGROUPS':
        case 'PERPAGE_IDEACOUNT_CHANGE':
        case 'SET_IDEA_COUNTONPAGE':
        case 'CHECK_ALL_IDEAS_FROM_ONE_PAGE':
        case 'UNCHECK_ALL_IDEAS':
        case 'CHECK_IDEA':
        case 'IDEA_SELECT':
        case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
        case 'RESET_PAGING':
        case 'RESET_PAGING_IDEAGROUPS':
        case 'SET_IDEA_STATES_ON_SELECTED_PAGE':
        case 'SET_IDEADATA_COUNTONPAGE':
        case 'SET_IDEADATA_SORTING_ONVIEWCHANGE':
            return updateViewFilters(state, action, entireState)
        case 'CREATE_IDEA':
            if (action.payload.data.Idea === null) return state;
            const configData = JSON.parse(action.payload.config.data);
            const action1 = { payload: action.payload.data.Idea.IdeaId, type: 'IDEA_SELECT', view: configData.view }
            const updatedState = updateViewFilters(state, action1, entireState);
            updatedState.shouldCreatedNewIdea = false;
            return update(state, { $set: updatedState });
        case 'GROUP_FILTER':
            return update(state, {
                defaultView: { currentPage: { $set: 1 } },
                customView: { currentPage: { $set: 1 } },
                ideaGenrationView: { currentPage: { $set: 1 } },
                archiveView: { currentPage: { $set: 1 } },
                archivePendingView: { currentPage: { $set: 1 } },
                ideasForAcceptanceView: { currentPage: { $set: 1 } },
                planningView: { currentPage: { $set: 1 } },
                trackingView: { currentPage: { $set: 1 } },
                implementationCustomView: { currentPage: { $set: 1 } },
                shareView: { currentPage: { $set: 1 } },
                transferView: { currentPage: { $set: 1 } },
                ideasSentForAcceptanceView: { currentPage: { $set: 1 } },
                sentForShareView: { currentPage: { $set: 1 } },
                sentForTransferView: { currentPage: { $set: 1 } },
                groupId: { $set: action.payload },
                isGroupChanged: { $set: ((entireState.selectedIdea !== null) ? true : false) },
                ideaView: {
                    $set:
                        ((action.payload === null || action.payload === '00000000-0000-0000-0000-000000000000') ? 'CompanyView' : 'Ideas')
                },
                isIdeaReadOnly: {
                    $set:
                        ((action.payload === null || action.payload === '00000000-0000-0000-0000-000000000000') ? true : false)
                },
            });
        case 'REMOVE_ISGROUP_CHANGE':
            return update(state, {
                isGroupChanged: { $set: false },
            });
        case 'ADD_ISGROUP_CHANGE':
            return update(state, {
                isGroupChanged: { $set: ((entireState.selectedIdea !== null) ? true : false) },
            });
        case 'UPDATE_VIEW':
            const groupId = action.payload;
            return update(state, {
                ideaView: { $set: ((groupId === null || groupId === '00000000-0000-0000-0000-000000000000') ? 'CompanyView' : 'Ideas') },
                isIdeaReadOnly: { $set: ((groupId === null || groupId === '00000000-0000-0000-0000-000000000000') ? true : false) },
                groupId: { $set: action.payload },
            });
        case 'UPDATE_GROUPID':
            return update(state, {
                isGroupChanged: { $set: ((entireState.selectedIdea !== null) ? true : false) },
                groupId: { $set: action.payload },
            });
        case PROJECT_CHANGE:
            return update(state, {
                projectId: { $set: action.payload },
                groupId: { $set: null },
            });
        case 'UPDATE_DEVICETYPE':
            return update(state, {
                deviceType: { $set: action.payload },
            });
        case 'TOGGLE_TRANSFER_MODAL':
            return update(state, {
                isTransferModalOpen: { $set: action.payload },
            });
        case 'TOGGLE_MULTIGROUP_IDEAS_MODAL':
            return update(state, {
                isMultiGroupIdeasModalOpen: { $set: action.payload },
            });
        case 'CREATE_EMPTY_IDEA':
            const indexNewIdeaItem = utils.findItemIndex(entireState.ideas.ideas, 'IsNewIdea', true)
            return update(state, {
                shouldCreatedNewIdea: { $set: ((indexNewIdeaItem > -1) ? true : false) },
            });
        case 'CUSTOMIZE_IMPLEMENTATION_LINEITEM_VIEW':
            setLocalStorageKey('implementationLineItemViewCustomizationView', action.cutomizationView);
            return update(state, {
                implementationLineItemViewCustomizationView: { $set: action.cutomizationView },
            });
        case 'TOGGLE_SINGLE_ROW_FOR_MULTIGROUP_IDEA':
            setLocalStorageKey('singleRowForMultigroupIdea', action.payload);
            return update(state, {
                singleRowForMultigroupIdea: { $set: action.payload },
            });
        case 'TOGGLE_SHOW_COMPLETE_IMPLEMENTATION_IDEAS':
            setLocalStorageKey('showCompletedImplementationIdeas', action.payload);
            return update(state, {
                showCompletedImplementationIdeas: { $set: action.payload },
            });
        case 'ADD_OPENED_IDEA_NOTE':
            return update(state, {
                relativeOpenedIdeaToNote: { $set: action.payload },
            });
        case 'REMOVE_OPENED_IDEA_NOTE':
            return update(state, {
                relativeOpenedIdeaToNote: { $set: null },
            });
        default:
            return state;
    }
}

export default filterReducer;
