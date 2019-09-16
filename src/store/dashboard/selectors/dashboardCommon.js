import _ from 'lodash';
import { dashboardPhase1 } from './dashboardPhase1';
import { dashboardPhase2 } from './dashboardPhase2';
import { dashboardPhase3 } from './dashboardPhase3';
import { dashboardPhase2Company } from './dashboardPhase2Company';
import { getResolveReviewList } from './resolveReview';
import getArrayFromObject from 'object.values';
import { filterByValues, convertArrayToDictionary } from '../../../common/utils';
import * as loghelper from '../../../common/loghelper';
import { createSelector } from 'reselect';
import AppConfig from '../../../appConfig';
export const getIdeaGroupsByValueType = (ideaGroups, selectedPhase, valueType, recommType, decisionType) => {
    let ideaGroupList = [];
    if (selectedPhase === 2 || selectedPhase === 3) {
        if (valueType === '2') {
            ideaGroupList = _.filter(ideaGroups, (item) => {
                return item.ValueStatus < 2
            });

        } else if (valueType === '3') {
            ideaGroupList = _.filter(ideaGroups, (item) => {
                return item.ValueStatus > 1
            });
        }
        else {
            ideaGroupList = ideaGroups;
        }
    } else {
        ideaGroupList = ideaGroups;
    }

    if (selectedPhase === 3) {
        //Filter Recommendation Type
        if (recommType === '2') {

            ideaGroupList = _.filter(ideaGroupList, (item) => {
                return item.GLRecommendationType === 1
            });

        } else if (recommType === '3') {

            ideaGroupList = _.filter(ideaGroupList, (item) => {
                return item.GLRecommendationType === 2
            });
        }
        else if (recommType === '4') {
            ideaGroupList = _.filter(ideaGroupList, (item) => {
                return (item.GLRecommendationType !== 1 && item.GLRecommendationType !== 2)
            });
        }

        //Filter Decision Type
        if (decisionType === '2') {

            ideaGroupList = _.filter(ideaGroupList, (item) => {
                return item.SCDecisionType === 1
            });
        } else if (decisionType === '3') {

            ideaGroupList = _.filter(ideaGroupList, (item) => {
                return item.SCDecisionType === 2
            });
        }
        else if (decisionType === '4') {
            ideaGroupList = _.filter(ideaGroupList, (item) => {
                return (item.SCDecisionType !== 1 && item.SCDecisionType !== 2)
            });

        }
    }

    return ideaGroupList;
};

export const getIdeaGroupsRiskWise = (ideaGroups, risk) => {
    ideaGroups = Object.assign([], _.filter(ideaGroups, function (o) {
        return o.IdeaStatus === 1
        //&& (!o.IsIT || (o.IsIT && o.ITValueStatus > 1))
    }));
    let filteredIdeasByRisk = [];

    switch (risk) {
        case "Low":
            filteredIdeasByRisk = Object.assign([], _.filter(ideaGroups, function (o) { return o.GLRiskRatingType === 1 }));
            break;
        case "Medium":
            filteredIdeasByRisk = Object.assign([], _.filter(ideaGroups, function (o) { return o.GLRiskRatingType === 2 }));
            break;
        case "High":
            filteredIdeasByRisk = Object.assign([], _.filter(ideaGroups, function (o) { return o.GLRiskRatingType === 3 }));
            break;
        case "SubTotal":
            filteredIdeasByRisk = Object.assign([], _.filter(ideaGroups, function (o) { return (o.GLRiskRatingType === 1 || o.GLRiskRatingType === 2) }));
            break;
        default:
            filteredIdeasByRisk = [];
    }
    filteredIdeasByRisk = _.orderBy(filteredIdeasByRisk, [(o) => { return o.Idea.IdeaNumber }], ['asc'])
    return filteredIdeasByRisk;
}

const getIdeaGroups = (isCompanyView, groupId, ideaGroups, ideas) => {
    const ideasDic = convertArrayToDictionary(ideas, 'IdeaId');
    if (isCompanyView) {
        return _.filter(ideaGroups, (item) => {
            if (ideasDic[item.IdeaId]) {
                item.Idea = ideasDic[item.IdeaId];
            }
            return item.LinkedGroupStatus === 3 && (item.Idea && !item.Idea.IsAcceptancePending && !item.Idea.IsArchivePending)
        });
    } else {
        return _.filter(ideaGroups, (item) => {
            if (ideasDic[item.IdeaId]) {
                item.Idea = ideasDic[item.IdeaId];
            }
            return item.GroupId === groupId && (item.LinkedGroupStatus === 3) && (item.Idea && !item.Idea.IsAcceptancePending && !item.Idea.IsArchivePending)
        });
    }
};

const dashBoardSummaryList = (masterData, permissions, dashboardFilter, filter, ideaGroups, othersDashboardData, baselineData, ideas, isLoading, isReportPage, scrType) => {
    const selectedPhase = (scrType ? scrType : dashboardFilter.phase);
    const valueType = dashboardFilter.valueType;
    const recommType = dashboardFilter.recommendationType;
    const decisionType = dashboardFilter.decisionType;

    const dashboardSummary = { resolveReview: {}, phase1: [], phase2: [], phase3: [], TotalBaseline: 0, groupSummaryList: [], isLoading: isLoading };

    let groups = Object.assign([], getArrayFromObject(masterData.groups));
    const isCompanyView = (filter.ideaView === 'CompanyView' || filter.groupId === '00000000-0000-0000-0000-000000000000') ? true : false;

    const groupId = AppConfig.env('groupId'); //filter.groupId;
    let groupType = 0;
    let ideaGroupListResolveReview = [];
    let activeIdeaGroupList = [];
    let pendingMultiGroupIdeas = [];
    if (!isCompanyView) {
        groups = _.filter(groups, (item) => {
            return item.GroupId === groupId //filter.groupId
        });
    }
    pendingMultiGroupIdeas = ideaGroups;
    ideaGroups = getIdeaGroups(isCompanyView, groupId /* filter.groupId */, ideaGroups, ideas);
    const groupIdsHavingPermission = _.map(groups, 'GroupId');
    const groupsHavePermission = filterByValues(groups, 'GroupId', groupIdsHavingPermission);
    if (groupsHavePermission && groupsHavePermission.length > 0) {
        groupType = groupsHavePermission[0].GroupType;
    }

    const years = _.uniqBy(_.map(masterData.fiscalTimings, 'year'));
    
    if (isCompanyView) {
        const singleRowForMultigroupIdea = filter.singleRowForMultigroupIdea;
        dashboardSummary.TotalBaseline = _.sumBy(groupsHavePermission, 'TotalBaseline');
        activeIdeaGroupList = _.filter(ideaGroups, function (item) { return item.IdeaStatus === 1 });
        const companyIdeaGroupList = getIdeaGroupsByValueType(activeIdeaGroupList, selectedPhase, valueType, recommType, decisionType);
        ideaGroupListResolveReview = companyIdeaGroupList;
        if (selectedPhase === 1) {
            dashboardSummary.phase1 = dashboardPhase1(companyIdeaGroupList, masterData, groupId, true, singleRowForMultigroupIdea);
        }
        if (selectedPhase === 2 || selectedPhase === 3) {
            if (singleRowForMultigroupIdea) {
                dashboardSummary.phase2 = dashboardPhase2Company(years, activeIdeaGroupList, selectedPhase, valueType, recommType, decisionType);
            } else {
                dashboardSummary.phase2 = dashboardPhase2(years, companyIdeaGroupList, selectedPhase, valueType, recommType, decisionType, true);
            }
        }
    }

    let groupIdeaSumaryList = [];
    //Group wise details
    let groupIdeaSumary = {};
    let ideaGroupList = [];
    let pendingMultiGroupIdeaList = [];
    _.map(groupsHavePermission, (group) => {
        groupIdeaSumary = {};
        groupIdeaSumary.GroupId = group.GroupId;
        groupIdeaSumary.Name = group.Name;
        groupIdeaSumary.Description = group.Description;
        groupIdeaSumary.GroupType = group.GroupType;
        groupIdeaSumary.GroupNumber = group.GroupNumber;
        groupIdeaSumary.IsProcurement = group.IsProcurement;
        groupIdeaSumary.RevenueBaseline = group.RevenueBaseline ? group.RevenueBaseline : 0;
        groupIdeaSumary.NPEBaseline = group.NPEBaseline ? group.NPEBaseline : 0;
        groupIdeaSumary.PEBaseline = group.PEBaseline ? group.PEBaseline : 0;
        groupIdeaSumary.TotalPosition = group.TotalPosition;
        groupIdeaSumary.FTEBaseline = group.FTEBaseline ? group.FTEBaseline : 0;
        groupIdeaSumary.TotalBaseline = group.TotalBaseline ? group.TotalBaseline : 0;

        ideaGroupList = getIdeaGroups(false, group.GroupId, ideaGroups, ideas);
        ideaGroupList = getIdeaGroupsByValueType(ideaGroupList, selectedPhase, valueType, recommType, decisionType);
        pendingMultiGroupIdeaList = _.filter(pendingMultiGroupIdeas, function (item) { return item.GroupId === group.GroupId && item.LinkedGroupStatus == 2 && (item.IdeaStatus === 1 || item.IdeaStatus === 2) });
        pendingMultiGroupIdeaList = getIdeaGroupsByValueType(pendingMultiGroupIdeaList, selectedPhase, valueType, recommType, decisionType);
        activeIdeaGroupList = _.filter(ideaGroupList, function (item) { return item.IdeaStatus === 1 });
        if (isReportPage || selectedPhase === 1) {
            groupIdeaSumary.phase1 = dashboardPhase1(activeIdeaGroupList, masterData, group.GroupId, false);
        }
        if (isReportPage || selectedPhase === 2 || selectedPhase === 3) {
            groupIdeaSumary.phase2 = dashboardPhase2(years, activeIdeaGroupList, masterData, baselineData, group.GroupId);
        }
        if (isReportPage || selectedPhase > 2) {
            groupIdeaSumary.phase3 = dashboardPhase3(years, activeIdeaGroupList, masterData, baselineData, group.GroupId);
        }
        groupIdeaSumary.ideaGroupList = ideaGroupList;
        groupIdeaSumary.pendingMultiGroupIdeaList = pendingMultiGroupIdeaList;
        groupIdeaSumaryList.push(groupIdeaSumary);
    });
    dashboardSummary.groupSummaryList = _.orderBy(groupIdeaSumaryList, ['GroupNumber']);
    ideaGroupListResolveReview = isCompanyView ? ideaGroupListResolveReview : dashboardSummary.groupSummaryList.length > 0 ? _.filter(dashboardSummary.groupSummaryList[0].ideaGroupList, function (item) { return item.IdeaStatus === 1 }) : [];
    dashboardSummary.resolveReview = _.values(getResolveReviewList(ideaGroupListResolveReview, othersDashboardData, pendingMultiGroupIdeaList, isCompanyView));
    dashboardSummary.isLoading = false;
    return dashboardSummary;
}; 

const prepareDashboardData = (state, props, isReportPage) => {
    if (/* state.masterData.isLoading === true || */ (state.ideaData && ((state.ideaData.ideaGroups && state.ideaData.ideaGroups.length <= 0) && state.ideaData.isLoading))) {
        return [];
    }
    isReportPage = isReportPage ? isReportPage : false;
    //loghelper.consoleTime('prepareDashboardData', 1, 3);
    const ideaGroups = state.ideaData && state.ideaData.ideaGroups ? state.ideaData.ideaGroups : [];
    const isLoading = true;
    // const ideaGroups = state.ideaData && state.ideaData.ideaGroups ? _.filter(state.ideaData.ideaGroups, { 'IdeaId': '85e81459-8a07-4fbf-97a7-10f0158e07e4' }) : [];
    const othersDashboardData = state.dashboardData ? state.dashboardData.data : [];
    const baselineData = state.dashboardData ? state.dashboardData.baselineData : [];
    const dashboardSummary = dashBoardSummaryList(state.masterData, state.permissions, state.dashboardFilter, state.ideaGroupFilter, ideaGroups, othersDashboardData, baselineData,
        state.ideaData.ideas, isLoading, isReportPage, props.selectedPhase);
    //loghelper.consoleTimeEnd('prepareDashboardData', 1, 3);
    //loghelper.consoleLogData('dashboardSummary:', dashboardSummary, 3);


    return {
        dashboardSummary: dashboardSummary
    };
};

export const getPreparedDashboardData = () => createSelector(
    prepareDashboardData,
    (dashboardSummary) => ({
        dashboardSummary
    })
);
