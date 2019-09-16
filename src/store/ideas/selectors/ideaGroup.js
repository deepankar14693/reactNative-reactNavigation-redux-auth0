import _ from 'lodash';
import { prepareObjectFromArray, getRiskSortId, filterByValues } from '../../../common/utils';
import { getIdeaList } from './ideaList';
import getArrayFromObject from 'object.values';

const getFocusAreaDetail = (focusAreas, focusAreaId) => {
    var focusArea = { focusAreaName: 'Unassigned', focusAreaNumber: '' }
    if (focusAreas[focusAreaId]) {
        focusArea.focusAreaName = focusAreas[focusAreaId].Name;
        focusArea.focusAreaNumber = focusAreas[focusAreaId].FocusAreaNumber;
    }
    return focusArea;
};

const getGroupDetail = (groups, groupId) => {
    var group = { Name: '', GroupNumber: '' }
    if (groups[groupId]) {
        group.Name = groups[groupId].Name;
        group.GroupNumber = groups[groupId].GroupNumber;
    }
    return group;
};

const getGLRiskRating = (ideaRiskRatings, leaderShip, ideaId, groupId) => {
    var GLRiskRatingType = 0;
    if (ideaRiskRatings) {
        var currentGroupPrimaryGL = [];
        var currentGroupGLRiskRating = ideaRiskRatings.filter(function (el) {
            return (el.IdeaId === ideaId && el.GroupId === groupId && el.RoleType === 1)
        });
        if (currentGroupGLRiskRating && currentGroupGLRiskRating.length > 0) {
            if (currentGroupGLRiskRating.length > 1) {
                var glRatings = [];
                var secondRiskRating = _.filter(currentGroupGLRiskRating, { 'RiskRatingNumber': 2 });
                if (secondRiskRating.length > 0) {
                    if (secondRiskRating[0].RiskRatingType !== null && secondRiskRating[0].RiskRatingType !== '' && secondRiskRating[0].RiskRatingType !== 0 && secondRiskRating[0].RiskRatingType !== ' ') {
                        glRatings = secondRiskRating;
                    } else {
                        var eligibleRiskRating = _.filter(currentGroupGLRiskRating, { RiskRatingNumber: null });
                        glRatings = eligibleRiskRating;
                    }
                } else {
                    glRatings = currentGroupGLRiskRating;
                }
                for (var i = 0; i < glRatings.length; i++) {
                    var leadership = leaderShip ? leaderShip[glRatings[i].GroupId + '-' + glRatings[i].UserId] : null;
                    if (leadership) {
                        if (leadership.Sequence === 1) {
                            currentGroupPrimaryGL.push(glRatings[i]);
                        }
                    }
                }
            } else {
                currentGroupPrimaryGL.push(currentGroupGLRiskRating[0]);
            }
        }
        if (currentGroupPrimaryGL.length > 0) {
            var currentGroupPrimaryGLRR = currentGroupPrimaryGL[0].RiskRatingType;
            GLRiskRatingType = currentGroupPrimaryGLRR;
        }
    }
    return GLRiskRatingType;
};

const getAllGLRecommendation = (ideaRecommendations, ideaId) => {
    return _.filter(ideaRecommendations, (item) => {
        return item.IdeaId === ideaId && (item.RecommendationType !== null || item.RecommendationType !== 0)
    });
};

export const getIFAllGLAgreed = (ideaRecommendations, ideaId) => {
    var glRecommendations = getAllGLRecommendation(ideaRecommendations, ideaId);
    if (glRecommendations.length > 1) {
        var uniqueRecommendations = _.assign([], _.uniq(_.map(glRecommendations, 'RecommendationType')));
        var filteredRecommendations = uniqueRecommendations.filter((i) => i);
        return filteredRecommendations.length > 1 ? false : true;
    } else {
        return true;
    }
};

const getIdeaValueComponents = (_lineitemMonthlyValues, ideaId, groupId, itValueStatus, valueStatus) => {

    var ideaLineitemMonthlyValues = _.filter(_lineitemMonthlyValues, (item) => {
        return groupId === null ?
            (item.IdeaId === ideaId) : (item.GroupId === groupId
                && item.IdeaId === ideaId)
    });

    var lineitemMonthlyValues = _.filter(ideaLineitemMonthlyValues, (item) => {
        return (
            1 === (
                (
                    valueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (valueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    itValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (itValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });

    // lineitemMonthlyValues = _.filter(lineitemMonthlyValues, (item) => {
    //     return groupId === null ?
    //         (item.IdeaId === ideaId) : (item.GroupId === groupId
    //             && item.IdeaId === ideaId)
    //         && 1 === ((valueStatus === 1 || itValueStatus < 2) ? (item.IsRough === true ? 1 : 0) : ((item.IsRough === false || item.IsRough === null) ? 1 : 0))
    // });

    var nonAllocatedLineItems = _.filter(lineitemMonthlyValues, (item) => { return item.CostLineItemId === null });
    var valueComponents = { npeRec: 0, peRec: 0, netOneTime: 0, netOneTimeUnAmortized: 0, recMargin: 0, oneTimeMargin: 0, oneTimeMarginUnAmortized: 0, itOneTime: 0, itOneTimeUnAmortized: 0, npeOneTime: 0, npeOneTimeUnAmortized: 0 };
    if (itValueStatus > 1) {
        valueComponents.npeRec = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [31, 32, 42]), 'Value');
        valueComponents.peRec = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [21, 22, 25]), 'Value');

        valueComponents.itOneTimeUnAmortized = _.sumBy(_.filter(nonAllocatedLineItems, { 'LineItemSubType': 41 }), (item) => { return (item.DirectionType * item.Amount) });
        valueComponents.netOneTime = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [33, 34, 41, 35, 36, 13, 14]), 'Value');
        valueComponents.netOneTimeUnAmortized = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [33, 34, 41, 35, 36, 13, 14]), (item) => { return (item.DirectionType * item.Amount) });
    } else {

        if (itValueStatus > 0) {
            valueComponents.npeRec = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [31, 32, 42]), 'Value');
        } else {
            valueComponents.npeRec = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [31, 32]), 'Value');
        }
        valueComponents.peRec = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [21, 22]), 'Value');
        valueComponents.netOneTime = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [33, 34, 35, 36, 13, 14]), 'Value');
        valueComponents.netOneTimeUnAmortized = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [33, 34, 35, 36, 13, 14]), (item) => { return (item.DirectionType * item.Amount) });
    }
    valueComponents.npeOneTime = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [33, 34, 35, 36]), 'Value');
    valueComponents.npeOneTimeUnAmortized = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [33, 34, 35, 36]), (item) => { return (item.DirectionType * item.Amount) });
    valueComponents.itOneTime = _.sumBy(_.filter(nonAllocatedLineItems, { 'LineItemSubType': 41 }), 'Value');
    valueComponents.itRec = _.sumBy(_.filter(nonAllocatedLineItems, { 'LineItemSubType': 42 }), 'Value');
    valueComponents.itPERec = _.sumBy(_.filter(nonAllocatedLineItems, { 'LineItemSubType': 25 }), 'Value');
    valueComponents.recMargin = _.sumBy(_.filter(nonAllocatedLineItems, (item) => { return (item.LineItemSubType === 11 || item.LineItemSubType === 12) }), 'Value');
    valueComponents.oneTimeMargin = _.sumBy(_.filter(nonAllocatedLineItems, (item) => { return (item.LineItemSubType === 13 || item.LineItemSubType === 14) }), 'Value');
    valueComponents.oneTimeMarginUnAmortized = _.sumBy(_.filter(nonAllocatedLineItems, (item) => { return (item.LineItemSubType === 13 || item.LineItemSubType === 14) }), (item) => { return (item.DirectionType * item.Amount) });
    valueComponents.itOneTime = _.sumBy(_.filter(nonAllocatedLineItems, { 'LineItemSubType': 41 }), 'Value');
    valueComponents.fteNumber = _.sumBy(nonAllocatedLineItems, 'FTE');
    valueComponents.workingCapital = _.sumBy(filterByValues(nonAllocatedLineItems, 'LineItemSubType', [35, 36]), 'Value');
    //valueComponents.lineItemCount= nonAllocatedLineItems.length;
    valueComponents.lineItemCount = _.filter(nonAllocatedLineItems, function (l) { return !l.IsRough && l.CostLineItemId === null }).length;
    return valueComponents;
};

const getMultiGroupAdjValue = (ideaTotalBenefit, ideaTotalCost, totalBenefit, totalCost) => {
    var value = 0;
    var percentageOfBenefit = 0;
    if (ideaTotalBenefit > 0) {
        percentageOfBenefit = _.divide(totalBenefit, ideaTotalBenefit);
        value = totalCost - (percentageOfBenefit * ideaTotalCost)
    }

    return value;
};

export const mergeIdeaAndIdeaGroupProps = (state, ideaId) => {
    var ideaList = getIdeaList(state.ideas, state.permissions, state.ideaGroupFilter, 1, true, state.lineItemMonthlyValueData.lineItemMonthlyValues);
    var ideas = _.groupBy(ideaList, 'IdeaId');

    var ideaRecommendations = _.map(_.filter(state.ideas.ideaRecommendations, { 'RoleType': 1 }), _.partialRight(_.pick, ['IdeaId', 'GroupId', 'RecommendationType', 'RoleType']));
    var dictionaryIdeaRecommendations = prepareObjectFromArray(ideaRecommendations, ['IdeaId', 'GroupId']);

    var ideaSCMReviews = _.map(state.ideas.ideaSCMReviews, _.partialRight(_.pick, ['IdeaId', 'GroupId', 'IsReviewed']));
    var dictionaryIdeaSCMReviews = prepareObjectFromArray(ideaSCMReviews, ['IdeaId', 'GroupId']);
    // if (!isAcceptedIdeas) {
    //     var ideaGroups = _.filter(state.ideas.ideaGroups, { 'LinkedGroupStatus': 3 });
    // }

    var ideaGroups = state.ideas.ideaGroups;
    if (ideaId && ideaId !== null) {
        ideaGroups = _.filter(ideaGroups, { 'IdeaId': ideaId });
    }

    _.map(ideaGroups, (item) => {
        var idea = ideas[item.IdeaId] ? ideas[item.IdeaId][0] : null;
        if (idea) {
            item.IdeaNumber = idea.IdeaNumber;
            item.Title = idea.Title;
            item.Description = idea.Description;
            item.IdeaStatus = idea.Status;
            item.DecRecRRSort = idea.DecRecRRSort;
            //item.Status = idea.Status;
            item.DecisionType = idea.DecisionType;
            item.SCDecision = idea.SCDecision;
            item.CompanyValue = _.subtract(idea.TotalBenefit, idea.TotalCost);
            item.GroupNumber = idea.Value;
            item.LinkedGroupsCount = idea.LinkedGroupsCount;
            item.PrimaryGroupName = getGroupDetail(state.masterData.groups, idea.GroupId).Name;
            item.MayRequireLinkedGroups = idea.MayRequireLinkedGroups;
            item.RiskStatus = idea.RiskStatus;
            item.IsArchivePending = idea.IsArchivePending;
            item.ExpectedNPEImpacts = idea.ExpectedNPEImpacts;
            item.ExpectedPEImpacts = idea.ExpectedPEImpacts;
            item.ExpectedRevenueImpacts = idea.ExpectedRevenueImpacts;
            item.GroupName = (state.masterData.groups[item.GroupId] ? state.masterData.groups[item.GroupId].Name : '');

            item.PrimaryGLRiskRatingType = idea.GLRiskRatingType ? idea.GLRiskRatingType : 0;
            item.PrimaryRiskRatingType = idea.GLRiskRatingType ? idea.GLRiskRatingType : idea.RoughRiskRatingType;
            item.PrimaryValueStatus = idea.ValueStatus ? idea.ValueStatus : 0;

            if (item.IsPrimary) {
                var roughRiskRatingType = idea.RoughRiskRatingType ? idea.RoughRiskRatingType : 0;
                item.RoughRiskRatingType = roughRiskRatingType;
                item.GLRiskRatingType = idea.GLRiskRatingType ? idea.GLRiskRatingType : 0;
                item.RiskRatingType = idea.GLRiskRatingType ? idea.GLRiskRatingType : roughRiskRatingType;
                item.RiskStatus = idea.PrimaryRiskStatus;
            } else {
                var glRating = getGLRiskRating(state.ideas.ideaRiskRatings, state.masterData.leaderShip, item.IdeaId, item.GroupId);
                item.RoughRiskRatingType = 0;
                item.GLRiskRatingType = glRating ? glRating : 0;
                item.RiskRatingType = glRating ? glRating : 0;
                item.RiskStatus = (idea.PrimaryRiskStatus > 2) ? idea.PrimaryRiskStatus : idea.RiskStatus;

            }
            item.PrimaryRisk = idea.PrimaryRisk;
            item.ProjectCustomField1 = idea.ProjectCustomField1;
            item.ProjectCustomField2 = idea.ProjectCustomField2;
            item.ProjectCustomField3 = idea.ProjectCustomField3;
            //IT related fields
            item.ITStatus = idea.ITStatus;
            item.ITValueStatus = idea.ITValueStatus;
            item.ITRoughValue = idea.ITRoughValue;
            item.ITNotes = idea.ITNotes;
            item.IdeaTotalBenefit = idea.TotalBenefit;
            item.IdeaTotalCost = idea.TotalCost;
            item.MultiGroupAdjValue = getMultiGroupAdjValue(idea.TotalBenefit, idea.TotalCost, item.TotalBenefit, item.TotalCost);
            item.RiskSort = item.IsPrimary ? idea.RiskSort : getRiskSortId(item.GLRiskRatingType);
            item.DetailedValue = item.ValueStatus > 1 ? item.Value : item.RoughValue;
            item.FocusAreaId = item.FocusAreaId ? item.FocusAreaId : '00000000-0000-0000-0000-000000000000';
            var focusArea = getFocusAreaDetail(state.masterData.focusAreas, item.FocusAreaId);
            item.FocusAreaNumber = focusArea.focusAreaNumber;
            item.FocusAreaName = focusArea.focusAreaName;
            //item.GroupUnAdjustedValue = _.subtract(item.TotalBenefit, item.TotalCost);

            var ideaRecommendation = dictionaryIdeaRecommendations[item.IdeaId + '-' + item.GroupId];
            var recommendationType = 0;
            if (ideaRecommendation) {
                recommendationType = ideaRecommendation.RecommendationType ? ideaRecommendation.RecommendationType : 0;
                item.RecommendationType = recommendationType;
            } else {
                item.RecommendationType = recommendationType;
            }

            var ideaSCMReview = dictionaryIdeaSCMReviews[item.IdeaId + '-' + item.GroupId];
            if (ideaSCMReview) {
                item.IsReviewed = ideaSCMReview.IsReviewed ? ideaSCMReview.IsReviewed : 0;
            } else {
                item.IsReviewed = 0;
            }
            item.GLsDisagreeOnRecommendation = false;
            var glDisAgree = getIFAllGLAgreed(state.ideas.ideaRecommendations, item.IdeaId);
            if (!glDisAgree) {
                item.GLsDisagreeOnRecommendation = true;
            }

            item.CompanyImpactNPERecurring = idea.CompanyImpactNPERecurring;
            item.CompanyImpactPERecurring = idea.CompanyImpactPERecurring;
            item.CompanyImpactNetOneTime = idea.CompanyImpactNetOneTime;
            item.CompanyImpactOneTimeMargin = idea.CompanyImpactOneTimeMargin;
            item.CompanyImpactITOneTime = idea.CompanyImpactITOneTime;
            item.CompanyImpactNpeOneTime = idea.CompanyImpactNpeOneTime;
            item.CompanyImpactRecurringMargin = idea.CompanyImpactRecurringMargin;

            if (item.ValueStatus > 0 || (item.IsPrimary === true && idea.ITValueStatus > 0)) {
                var valueComponents = getIdeaValueComponents(state.lineItemMonthlyValueData.lineItemMonthlyValues, item.IdeaId, item.GroupId, idea.ITValueStatus, item.ValueStatus);
                //var valueComponentsCompanyImpact = getIdeaValueComponents(state.lineItemMonthlyValues, item.IdeaId, null, idea.ITValueStatus, item.ValueStatus);
                item.NPERecurring = valueComponents.npeRec;
                //item.CompanyImpactNPERecurring = valueComponentsCompanyImpact.npeRec;
                item.PERecurring = valueComponents.peRec;
                //item.CompanyImpactPERecurring = valueComponentsCompanyImpact.peRec;
                item.RecurringMargin = valueComponents.recMargin;

                //item.CompanyImpactRecurringMargin = valueComponentsCompanyImpact.recMargin;
                item.NetOneTime = valueComponents.netOneTime;
                //item.CompanyImpactNetOneTime = valueComponentsCompanyImpact.netOneTime;
                item.OneTimeMargin = valueComponents.oneTimeMargin;
                //item.CompanyImpactOneTimeMargin = valueComponentsCompanyImpact.oneTimeMargin;
                item.ITOneTime = valueComponents.itOneTime;
                item.ITRec = valueComponents.itRec;
                item.ITPERec = valueComponents.itPERec;
                //item.CompanyImpactITOneTime = valueComponentsCompanyImpact.itOneTime;
                item.NpeOneTime = valueComponents.npeOneTime;
                item.GroupFTENumber = valueComponents.fteNumber;
                item.LineItemCount = valueComponents.lineItemCount
                //item.CompanyImpactNpeOneTime = valueComponentsCompanyImpact.npeOneTime;
                //UnAmortized
                item.WorkingCapital = valueComponents.workingCapital;
                item.NetOneTimeUnAmortized = valueComponents.netOneTimeUnAmortized;
                item.OneTimeMarginUnAmortized = valueComponents.oneTimeMarginUnAmortized;
                item.ITOneTimeUnAmortized = valueComponents.itOneTimeUnAmortized;
                item.NpeOneTimeUnAmortized = valueComponents.npeOneTimeUnAmortized;
            } else {
                // var valueComponentsCompanyImpact = getIdeaValueComponents(state.lineItemMonthlyValues, item.IdeaId, null, idea.ITValueStatus, item.ValueStatus);
                // item.CompanyImpactNPERecurring = valueComponentsCompanyImpact.npeRec;
                // item.CompanyImpactPERecurring = valueComponentsCompanyImpact.peRec;
                // item.CompanyImpactNetOneTime = valueComponentsCompanyImpact.netOneTime;
                // item.CompanyImpactOneTimeMargin = valueComponentsCompanyImpact.oneTimeMargin;
                // item.CompanyImpactITOneTime = valueComponentsCompanyImpact.itOneTime;
                // item.CompanyImpactNpeOneTime = valueComponentsCompanyImpact.npeOneTime;
                item.NPERecurring = 0;
                item.PERecurring = 0;
                item.NetOneTime = 0;
                item.RecurringMargin = 0;
                item.OneTimeMargin = 0;
                item.ITOneTime = 0;
                item.OneTimeMargin = 0;
                item.NpeOneTime = 0;
                //UnAmortized
                item.NetOneTimeUnAmortized = 0;
                item.OneTimeMarginUnAmortized = 0;
                item.ITOneTimeUnAmortized = 0;
                item.NpeOneTimeUnAmortized = 0;
                item.CompanyImpactITOneTime = 0;
                item.CompanyImpactITRec = 0;
                item.CompanyImpactITPERec = 0;
            }
        }
        else {
            item.IdeaStatus = 3;
        }
    });

    ideaGroups = ideaGroups.filter(function (item) {
        return (item.IdeaStatus !== 3 && (item.IdeaStatus !== 2 || !item.IsArchivePending))
    });

    return ideaGroups;
};
