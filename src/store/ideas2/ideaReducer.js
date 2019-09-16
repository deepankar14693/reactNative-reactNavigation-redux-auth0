import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../../actions/actionTypes';
import * as loghelper from '../../common/loghelper';
import { convertArrayToDictionary, getSortingOrFilterObject, sortArrOfObjectsByParamNew } from '../../common/utils';
import { ideaData } from '../configureStoreData';
import { updateIdeaDetailData } from './updaters/ideaDetailDataUpdater';
import * as ideaGroupUpdater from './updaters/ideaGroupUpdater';
import * as ideaUpdater from './updaters/ideaUpdater';
import PushEvents from './updaters/pushEvents';

const sortIdeaGroups = (ideaGroups, action, ideaView, isITPermission, isCustonProperty) => {
    if (action.type === 'SCR_SORT_IDEAGROUP' && action.payload) {
        if (ideaView === 'CompanyView') {
            ideaGroups = _.orderBy(ideaGroups, [(o) => { return o.Idea.PrimaryGroupName || 99999 }, (o) => { return o.FocusAreaNumber || 99999 }, (o) => { return o.IdeaStatus || 999 }, (o) => { return o.DecRecRRSort }, (o) => { return o.Value || 0 }, (o) => { return (o.Idea && o.Idea.IdeaNumber) || 0 }], ['asc', 'asc', 'asc', 'asc', 'desc', 'asc']);
        } else {
            ideaGroups = _.orderBy(ideaGroups, [(o) => { return o.FocusAreaNumber || 99999 }, (o) => { return o.IdeaStatus || 999 }, (o) => { return o.DecRecRRSort }, (o) => { return o.Value || 0 }, (o) => { return (o.Idea && o.Idea.IdeaNumber) || 0 }], ['asc', 'asc', 'asc', 'desc', 'asc']);
        }
    } else {
        if (action.payload.column !== '') {
            if (isCustonProperty) {
                const sortColumn = parseInt(action.payload.column);
                const isGroupCustom = sortColumn < 10 ? false : true;
                const sortDirection = action.payload.direction ? ['asc'] : ['desc'];
                if (isGroupCustom) {
                    const propetyIndexGroup = sortColumn - 11;
                    ideaGroups = _.orderBy(ideaGroups, [el => {
                        const label = el.CustomFields[propetyIndexGroup] && el.CustomFields[propetyIndexGroup].Label;
                        if (!_.isNaN(parseFloat(label))) {
                            return parseFloat(label) || 0;
                        } else {
                            return label || "";
                        }
                    }], sortDirection)
                } else {
                    const propetyIndexProject = sortColumn - 1;
                    ideaGroups = _.orderBy(ideaGroups, [el => {
                        const label = el.Idea.CustomFields[propetyIndexProject] && el.Idea.CustomFields[propetyIndexProject].Label;
                        if (!_.isNaN(parseFloat(label))) {
                            return parseFloat(label) || 0;
                        } else {
                            return label || "";
                        }
                    }], sortDirection)
                }

            }
            else {
                if (action.payload.column === 'CurrentGroupValue') {
                    ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'Value', action.payload.direction);
                } else if (action.payload.column === 'PlanValue') {
                    if (action.view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'PlanValue', action.payload.direction);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'ActualValue', action.payload.direction);
                    }
                } else if (action.payload.column === 'PlanTiming') {
                    if (action.view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'PlanTiming', action.payload.direction);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'ActualTiming', action.payload.direction);
                    }
                } else if (action.payload.column === 'MetricPlanTiming') {
                    if (action.view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MetricPlanTiming', action.payload.direction);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MetricActualTiming', action.payload.direction);
                    }
                } else if (action.payload.column === 'MilestonePlanTiming') {
                    if (action.view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MilestonePlanTiming', action.payload.direction);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MilestoneActualTiming', action.payload.direction);
                    }
                } else {
                    if (isITPermission) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, action.payload.column, action.payload.direction);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, action.payload.column, action.payload.direction);
                    }
                }
            }
        } else {
            if (ideaView === 'CompanyView') {
                ideaGroups = _.orderBy(ideaGroups, [(o) => { return o.Idea.PrimaryGroupName || 99999 }, (o) => { return (o.Idea && o.Idea.IdeaNumber) || 99999 }], ['asc', 'desc']);
            } else {
                ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'IdeaNumber', false);
            }
        }
    }
    return ideaGroups;
}

export const sortIdeaGroupsOnLoad = (ideaGroups, sortingObj, ideaView, isITPermission, view) => {
    if (sortingObj.scr) {
        if (ideaView === 'CompanyView') {
            ideaGroups = _.orderBy(ideaGroups, [(o) => { return (o.Idea && o.Idea.PrimaryGroupName) || 99999 }, (o) => { return o.FocusAreaNumber || 99999 }, (o) => { return o.IdeaStatus || 999 }, (o) => { return o.DecRecRRSort || 99 }, (o) => { return o.Value || 0 }, (o) => { return (o.Idea && o.Idea.IdeaNumber) || 0 }], ['asc', 'asc', 'asc', 'asc', 'desc', 'asc']);
        } else {
            ideaGroups = _.orderBy(ideaGroups, [(o) => { return o.FocusAreaNumber || 99999 }, (o) => { return o.IdeaStatus || 999 }, (o) => { return o.DecRecRRSort || 99 }, (o) => { return o.Value || 0 }, (o) => { return (o.Idea && o.Idea.IdeaNumber) || 0 }], ['asc', 'asc', 'asc', 'desc', 'asc']);
        }
    } else {
        if (sortingObj.sortColumn !== '') {
            if (!_.isNaN(parseInt(sortingObj.sortColumn))) {
                const sortColumnNew = parseInt(sortingObj.sortColumn);
                const isGroupCustomNew = sortColumnNew < 10 ? false : true;
                const sortDirectionNew = sortingObj.sortAscending ? ['asc'] : ['desc'];
                if (isGroupCustomNew) {
                    const propetyIndexGroupNew = sortColumnNew - 11;
                    ideaGroups = _.orderBy(ideaGroups, [el => {
                        const label = el.CustomFields[propetyIndexGroupNew] && el.CustomFields[propetyIndexGroupNew].Label;
                        if (!_.isNaN(parseFloat(label))) {
                            return parseFloat(label) || 0;
                        } else {
                            return label || "";
                        }
                    }], sortDirectionNew)
                } else {
                    const propetyIndexProjectNew = sortColumnNew - 1;
                    ideaGroups = _.orderBy(ideaGroups, [el => {
                        const label = el.Idea.CustomFields[propetyIndexProjectNew] && el.Idea.CustomFields[propetyIndexProjectNew].Label;
                        if (!_.isNaN(parseFloat(label))) {
                            return parseFloat(label) || 0;
                        } else {
                            return label || "";
                        }
                    }], sortDirectionNew)
                }
            } else {
                if (sortingObj.sortColumn === 'CurrentGroupValue') {
                    ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'Value', sortingObj.sortAscending);
                } else if (sortingObj.sortColumn === 'PlanValue') {
                    if (view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'PlanValue', sortingObj.sortAscending);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'ActualValue', sortingObj.sortAscending);
                    }
                } else if (sortingObj.sortColumn === 'PlanTiming') {
                    if (view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'PlanTiming', sortingObj.sortAscending);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'ActualTiming', sortingObj.sortAscending);
                    }
                } else if (sortingObj.sortColumn === 'MetricPlanTiming') {
                    if (view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MetricPlanTiming', sortingObj.sortAscending);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MetricActualTiming', sortingObj.sortAscending);
                    }
                } else if (sortingObj.sortColumn === 'MilestonePlanTiming') {
                    if (view === 7) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MilestonePlanTiming', sortingObj.sortAscending);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'MilestoneActualTiming', sortingObj.sortAscending);
                    }
                } else {
                    if (isITPermission) {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, sortingObj.sortColumn, sortingObj.sortAscending);
                    } else {
                        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, sortingObj.sortColumn, sortingObj.sortAscending);
                    }
                }
            }


        } else {
            if (ideaView === 'CompanyView') {
                ideaGroups = _.orderBy(ideaGroups, [(o) => { return (o.Idea && o.Idea.PrimaryGroupName) || 99999 }, (o) => { return (o.Idea && o.Idea.IdeaNumber) || 99999 }], ['asc', 'desc']);
            } else {
                ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, 'IdeaNumber', false);
            }
        }
    }
    return ideaGroups;
}

const ideaReducer2 = (state = [], action, entireState) => {
    if (action.type === actionTypes.GET_IDEA_DATA) {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        switch (action.type) {
            case actionTypes.PROJECT_CHANGE:
                return update(state, { $set: ideaData })

            case actionTypes.GROUP_CHANGE:
                return update(state, {
                    isLoading: { $set: true },
                    //isDashboardLoading: { $set: true }
                });
            case actionTypes.GET_IDEA_DATA:
                if (!action.payload.data) return update(state, {
                    isLoading: { $set: false }
                });

                // const isITPermission = (entireState.masterData.groups[entireState.filter.groupId] ? entireState.masterData.groups[entireState.filter.groupId].IsITCosting : false);
                // const sortingObj = getSortingOrFilterObject(action.payload.config.view, entireState.sorting);
                const ideaList = (action.payload.data.IdeaList.List ? action.payload.data.IdeaList.List : []);
                const ideaGroupList = (action.payload.data.IdeaGroupList.List ? action.payload.data.IdeaGroupList.List : []);
                // const ideaGroupsObj = ideaGroupUpdater.updateIdeaGroupData(state["ideaGroups"],
                //     ideaGroupList, ideaList, entireState);
                // const sortedIdeaGroups = sortIdeaGroupsOnLoad(ideaGroupsObj, sortingObj, entireState.filter.ideaView,
                //     isITPermission, action.payload.config.view);
                return update(state, {
                    ideas: { $set: ideaList },
                    ideaGroups: {
                        $set: ideaGroupList
                    },
                    isLoading: { $set: false }
                });
            case 'GET_SINGLE_IDEA_DATA':
                if (!action.payload.data) return state;
                const ideaListSingleIdea = (action.payload.data.IdeaList.List ? action.payload.data.IdeaList.List : []);
                const ideaGroupListSingleIdea = (action.payload.data.IdeaGroupList.List ? ideaGroupUpdater.updateIdeaGroupData(state["ideaGroups"],
                    action.payload.data.IdeaGroupList.List, ideaListSingleIdea, entireState) : []);
                return update(state, {
                    ideas: { $set: ideaListSingleIdea },
                    ideaGroups: { $set: ideaGroupListSingleIdea },
                    ideaNonPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaNonPersonnelLineItems"], action.payload.data.NonPersonnelLineItemList.List, 'ideaNonPersonnelLineItems') },
                    ideaPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaPersonnelLineItems"], action.payload.data.PersonnelLineItemList.List, 'ideaPersonnelLineItems') },
                    ideaRevenueLineItems: { $set: updateIdeaDetailData(state["ideaRevenueLineItems"], action.payload.data.RevenueLineItemList.List, 'ideaRevenueLineItems') },
                    ideaRiskRatings: { $set: updateIdeaDetailData(state["ideaRiskRatings"], action.payload.data.RiskRatingList.List, 'ideaRiskRatings') },
                    ideaRecommendations: { $set: updateIdeaDetailData(state["ideaRecommendations"], action.payload.data.RecommendationList.List, 'ideaRecommendations') },
                    ideaSCDecisions: { $set: updateIdeaDetailData(state["ideaSCDecisions"], action.payload.data.SCDecisionList.List, 'ideaSCDecisions') },
                    ideaSCMReviews: { $set: updateIdeaDetailData(state["ideaSCMReviews"], action.payload.data.SCMReviewList.List, 'ideaSCMReviews') },
                    ideaCustomFields: { $set: updateIdeaDetailData(state["ideaCustomFields"], action.payload.data.IdeaCustomFieldList.List, 'ideaCustomFields') },
                    //tranferredIdeas: { $set:updateIdeaDetailData(state["tranferredIdeas"], action.payload.data.IdeaGroupList.List, 'tranferredIdeas')},
                    metrics: { $set: updateIdeaDetailData(state["metrics"], action.payload.data.MetricList.List, 'metrics') },
                    milestones: { $set: updateIdeaDetailData(state["milestones"], action.payload.data.MilestoneList.List, 'milestones') },
                });
            case actionTypes.GET_DASHBOARD_DATA:
                if (!action.payload.data) return update(state, {
                    isDashboardLoading: { $set: false }
                });

                return update(state, {
                    ideas: {
                        $set: (
                            ideaUpdater.updateDashboardIdeaData(state["ideas"], (action.payload.data.IdeaList.List ? action.payload.data.IdeaList.List : []))
                        )
                    },
                    ideaGroups: {
                        $set: (
                            ideaGroupUpdater.updateDashboardIdeaGroupData(state["ideaGroups"], (action.payload.data.IdeaGroupList.List ? action.payload.data.IdeaGroupList.List : []))
                        )
                    },
                    isDashboardLoading: { $set: false },
                });
            case actionTypes.IDEAGROUP_LIST_SORT:
            case actionTypes.SCR_SORT_IDEAGROUP:
                const isITPermissionSort = (entireState.masterData.groups[entireState.filter.groupId] ? entireState.masterData.groups[entireState.filter.groupId].IsITCosting : false);
                if (action.view === 13 || action.view === 14) {
                    return state;
                } else {
                    return update(state, {
                        ideaGroups: {
                            $set: (
                                sortIdeaGroups(state["ideaGroups"], action, entireState.filter.ideaView, isITPermissionSort, action.isCustonProperty)
                            )
                        }
                    });
                }
            case actionTypes.TOGGLE_CHECKBOX_IDEAGROUP:
                const mapped1 = state.ideaGroups.map(post => ideaGroupUpdater.toggleIdeaGroupCheckUncheck(post, action.payload, action.checked, action.view));
                return update(state, {
                    ideaGroups: {
                        $set: (
                            mapped1
                        )
                    }
                });
            case actionTypes.TOGGLE_ALL_CHECKBOX_IDEAGROUP_ONEPAGE:
                const mapped2 = state.ideaGroups.map(post => ideaGroupUpdater.toggleAllIdeaGroupsCheckUncheckOnePage(post, action.ideaGroupIds, action.checked, action.view));
                return update(state, {
                    ideaGroups: {
                        $set: (
                            mapped2
                        )
                    }
                });
            case actionTypes.UNCHECK_ALL_CHECKBOX_IDEAGROUP:
                const mapped3 = state.ideaGroups.map(post => ideaGroupUpdater.allIdeaGroupsUncheck(post, action.view));
                return update(state, { ideaGroups: { $set: (mapped3) } });
            case actionTypes.GET_IDEA_DETAIL_DATA:
                if (!action.payload.data) return state;
                return update(state, {
                    ideaNonPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaNonPersonnelLineItems"], action.payload.data.NonPersonnelLineItemList.List, 'ideaNonPersonnelLineItems') },
                    ideaPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaPersonnelLineItems"], action.payload.data.PersonnelLineItemList.List, 'ideaPersonnelLineItems') },
                    ideaRevenueLineItems: { $set: updateIdeaDetailData(state["ideaRevenueLineItems"], action.payload.data.RevenueLineItemList.List, 'ideaRevenueLineItems') },
                    ideaRiskRatings: { $set: updateIdeaDetailData(state["ideaRiskRatings"], action.payload.data.RiskRatingList.List, 'ideaRiskRatings') },
                    ideaRecommendations: { $set: updateIdeaDetailData(state["ideaRecommendations"], action.payload.data.RecommendationList.List, 'ideaRecommendations') },
                    ideaSCDecisions: { $set: updateIdeaDetailData(state["ideaSCDecisions"], action.payload.data.SCDecisionList.List, 'ideaSCDecisions') },
                    ideaSCMReviews: { $set: updateIdeaDetailData(state["ideaSCMReviews"], action.payload.data.SCMReviewList.List, 'ideaSCMReviews') },
                    ideaCustomFields: { $set: updateIdeaDetailData(state["ideaCustomFields"], action.payload.data.IdeaCustomFieldList.List, 'ideaCustomFields') },
                    //tranferredIdeas: { $set:updateIdeaDetailData(state["tranferredIdeas"], action.payload.data.IdeaGroupList.List, 'tranferredIdeas')},
                    metrics: { $set: updateIdeaDetailData(state["metrics"], action.payload.data.MetricList.List, 'metrics') },
                    milestones: { $set: updateIdeaDetailData(state["milestones"], action.payload.data.MilestoneList.List, 'milestones') },
                });
            case 'GET_IMPLEMENTATION_DATA':
                if (!action.payload.data) return state;
                return update(state, {
                    ideaNonPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaNonPersonnelLineItems"], action.payload.data.NonPersonnelLineItemList.List, 'ideaNonPersonnelLineItems') },
                    ideaPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaPersonnelLineItems"], action.payload.data.PersonnelLineItemList.List, 'ideaPersonnelLineItems') },
                    ideaRevenueLineItems: { $set: updateIdeaDetailData(state["ideaRevenueLineItems"], action.payload.data.RevenueLineItemList.List, 'ideaRevenueLineItems') },
                    metrics: { $set: updateIdeaDetailData(state["metrics"], action.payload.data.MetricList.List, 'metrics') },
                    milestones: { $set: updateIdeaDetailData(state["milestones"], action.payload.data.MilestoneList.List, 'milestones') },
                    isImplementationDataLoading: { $set: false }
                });
            case actionTypes.SET_IDEAGROUP_SORTING_ONVIEWCHANGE:
                const isITPermission1 = (entireState.masterData.groups[entireState.filter.groupId] ? entireState.masterData.groups[entireState.filter.groupId].IsITCosting : false);
                const sortingObj1 = getSortingOrFilterObject(action.payload, entireState.sorting);
                const ideaGroups = sortIdeaGroupsOnLoad(state.ideaGroups, sortingObj1, entireState.filter.ideaView, isITPermission1, action.payload);
                return update(state, { ideaGroups: { $set: (ideaGroups) } });
            case 'PUSH_DATA':
                if (!action.payload) return state;
                return PushEvents(state, action, entireState);
            case 'GET_ARCHIVED_IDEADATA':
                const ideaObjArchive = ideaGroupUpdater.updateIdeaData(state["ideas"], action.payload.data.IdeaList.List);
                const ideaGroupsObjArchive = ideaGroupUpdater.updateIdeaGroupData(state["ideaGroups"],
                    action.payload.data.IdeaGroupList.List,
                    action.payload.data.IdeaList.List, entireState);
                return update(state, {
                    ideas: { $set: ideaObjArchive },
                    ideaGroups: { $set: ideaGroupsObjArchive },
                });
            case 'GET_IDEA_CUSTOMVIEW_DATA':
                const keyBasedIdeas = convertArrayToDictionary(action.payload.data.IdeaCustomView.List, 'EntityId');
                const keyBasedIdeaGroups = convertArrayToDictionary(action.payload.data.IdeaGroupCustomView.List, 'EntityId');
                const ideasWithNewProps = state["ideas"].map(function (Idea) {
                    if (keyBasedIdeas[Idea.IdeaId]) {
                        const newIdeaProperties = keyBasedIdeas[Idea.IdeaId];
                        return _.merge({}, Idea, newIdeaProperties);
                    } else {
                        return Idea;
                    }
                });
                const ideaGroupssWithNewProps = state["ideaGroups"].map(function (IdeaGroup) {
                    if (keyBasedIdeaGroups[IdeaGroup.IdeaGroupId]) {
                        const newIdeaGroupProperties = keyBasedIdeaGroups[IdeaGroup.IdeaGroupId];
                        return _.merge({}, IdeaGroup, newIdeaGroupProperties);
                    } else {
                        return IdeaGroup;
                    }
                });
                const ideaGroupsObjCustom = ideaGroupUpdater.updateIdeaGroupData(state["ideaGroups"], ideaGroupssWithNewProps, ideasWithNewProps, entireState);
                return update(state, {
                    ideas: { $set: ideasWithNewProps },
                    ideaGroups: { $set: ideaGroupsObjCustom },
                });

            case actionTypes.GET_SHAREDANDTRANSFERED_IDEA_DATA:
                if (!action.payload || !action.payload.data) return state;
                const sharedIdeaList = action.payload.data.IdeaList.List ? action.payload.data.IdeaList.List : [];
                const sharedIdeaGroupList = action.payload.data.IdeaGroupList.List ? action.payload.data.IdeaGroupList.List : [];

                if (sharedIdeaList.length > 0 && action.payload.data.TransferIdeaList.List.length > 0) {
                    sharedIdeaList.forEach(function (item) {
                        var isCopy = _.filter(action.payload.data.TransferIdeaList.List, { NewIdeaId: item.IdeaId });
                        if (isCopy.length > 0) {
                            item["IsCopy"] = isCopy[0].IsCopy;
                        } else {
                            item["IsCopy"] = false;
                        }
                    });
                }

                const shareAndTansferIdeaGroups = ideaGroupUpdater.updateIdeaGroupData(state["ideaGroups"],
                    action.payload.data.IdeaGroupList.List,
                    sharedIdeaList, entireState);

                return update(state, {
                    ideas: { $set: ideaUpdater.updateDashboardIdeaData(state["ideas"], sharedIdeaList) },
                    ideaGroups: { $set: shareAndTansferIdeaGroups },
                    tranferredIdeas: { $set: action.payload.data.TransferIdeaList.List ? action.payload.data.TransferIdeaList.List : [] }
                });

            case 'STAR_UNSTAR_IDEA':
                return update(state, {
                    ideaGroups: { $set: ideaGroupUpdater.updateIdeaGroupFavourite(state["ideaGroups"], action) }
                });

            default: return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === actionTypes.GET_IDEA_DATA) {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
};



export default ideaReducer2;
