import _ from 'lodash';
import { filterByValues } from '../../../common/utils';

export const getCount = (isCompanyView, resolveReviewData, isPendingSharesTransfers) => {
    if (isCompanyView && !isPendingSharesTransfers && resolveReviewData) {
        return resolveReviewData.length > 0 ? _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" })[0].IdeaCount : 0;
    }
    else {
        if (isPendingSharesTransfers) {
            return _.sumBy(_.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" }), 'IdeaCount');
        }
        return _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title != "Total" && resolveReview.Title !== 'Unassigned' && resolveReview.IdeaCount === 0 }).length;
    }
}

const resolveReview = {
    PositionsWithoutFunctionalTitles: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    NoIdeaDescription: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    NoFocusArea: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    RiskNotStarted: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    NoGLRiskRating: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    NoRoughValue: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    NoExpectedImpacts: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    PendingSharesTransfers: { key: '', value: 0, count: 0, isResolve: true, phase: 1, ideaGroupList: [] },
    AllRiskRatersNotIdentified: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    RatingsNotEntered: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    IncompleteLineItems: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    NotReportingDetailedValue: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    RoughValueWithoutRoughTiming: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    PendingSubmissionsToOtherGroups: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    ITCostingNotDecided: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    PendingSubmissionsToIT: { key: '', value: 0, count: 0, isResolve: true, phase: 2, ideaGroupList: [] },
    AllRiskRatingsNotComplete: { key: '', value: 0, count: 0, isResolve: true, phase: 3, ideaGroupList: [] },
    DetailedValueNotComplete: { key: '', value: 0, count: 0, isResolve: true, phase: 3, ideaGroupList: [] },
    RequiredGLRecommendationMissing: { key: '', value: 0, count: 0, isResolve: true, phase: 3, ideaGroupList: [] },
    RequiredSCMReviewMissing: { key: '', value: 0, count: 0, isResolve: true, phase: 3, ideaGroupList: [] },
    RequiredSCDecisionMissing: { key: '', value: 0, count: 0, isResolve: true, phase: 3, ideaGroupList: [] },
    PendingMultiGroupAction: { key: '', value: 0, count: 0, isResolve: true, phase: 3, ideaGroupList: [] },
    RiskDisagreementCTMGL: { key: '', value: 0, count: 0, isResolve: false, phase: 1, ideaGroupList: [] },
    ExpectedMultiGroupIdeas: { key: '', value: 0, count: 0, isResolve: false, phase: 1, ideaGroupList: [] },
    MHRiskRatingsWithoutNotes: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    RequiredSecondRiskRatings: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    Only1LineItem: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    LargeValueWith2OrFewerLineItems: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    IdeasWithFractionalPositions: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    PendingAcceptanceFromOtherGroups: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    ExpectedMultiGroupIdeaWithNoOtherGroupsAdded: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    PendingITCostEstimates: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    IdeasWithITCosts: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    CategoriesWithoutAnyImpact: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    FunctionalTitlesWithoutAnyImpact: { key: '', value: 0, count: 0, isResolve: false, phase: 2, ideaGroupList: [] },
    RequiredFinanceValidationMissing: { key: '', value: 0, count: 0, isResolve: false, phase: 3, ideaGroupList: [] },
    GLsDisagreeOnRecommendation: { key: '', value: 0, count: 0, isResolve: false, phase: 3, ideaGroupList: [] }
};

const getResolveReviewByName = (key, resolveReviewIndex, ideaGroups, isResolve, phase) => {
    const rrIdeas = _.filter(ideaGroups, (item) => { return item.ResolveReview[resolveReviewIndex] === 1 });
    const value = _.sumBy(rrIdeas, (item) => { return item.Value });
    return { key: key, count: _.uniqBy(rrIdeas, 'IdeaId').length, value: value, isResolve: isResolve, phase: phase, ideaGroupList: rrIdeas }
};

const getRatingNotEnteredValue = (ideaGroups, ideaIds) => {
    var filterIdeaGroups = filterByValues(ideaGroups, 'IdeaId', ideaIds);
    return _.sumBy(filterIdeaGroups, (item) => { return item.Value });
}
export const getResolveReviewList = (ideaGroups, othersDashboardData, pendingMultiGroupIdeaList, isCompanyView) => {
    resolveReview.PositionsWithoutFunctionalTitles = { key: 'PositionsWithoutFunctionalTitles', count: (othersDashboardData && _.size(othersDashboardData) > 0 ? getCount(isCompanyView, othersDashboardData['PositionsWithoutFunctionalTitles'], true) : 0), value: 0, isResolve: true, phase: 1, ideaGroupList: [] };
    resolveReview.NoIdeaDescription = getResolveReviewByName('NoIdeaDescription', 0, ideaGroups, true, 1);
    resolveReview.NoFocusArea = getResolveReviewByName('NoFocusArea', 1, ideaGroups, true, 1);
    resolveReview.RiskNotStarted = getResolveReviewByName('RiskNotStarted', 2, ideaGroups, true, 1);
    resolveReview.NoGLRiskRating = getResolveReviewByName('NoGLRiskRating', 3, ideaGroups, true, 1);
    resolveReview.NoRoughValue = getResolveReviewByName('NoRoughValue', 4, ideaGroups, true, 1);
    resolveReview.NoExpectedImpacts = getResolveReviewByName('NoExpectedImpacts', 5, ideaGroups, true, 1);
    resolveReview.PendingSharesTransfers = { key: 'PendingSharesTransfers', count: (othersDashboardData && _.size(othersDashboardData) > 0 ? getCount(isCompanyView, othersDashboardData['PendingSharesTransfers'], true) : 0), value: 0, isResolve: true, phase: 1, ideaGroupList: [] };
    resolveReview.AllRiskRatersNotIdentified = getResolveReviewByName('AllRiskRatersNotIdentified', 6, ideaGroups, true, 2);
    resolveReview.RatingsNotEntered = getResolveReviewByName('RatingsNotEntered', 7, ideaGroups, true, 2);
    resolveReview.IncompleteLineItems = getResolveReviewByName('IncompleteLineItems', 8, ideaGroups, true, 2);
    resolveReview.NotReportingDetailedValue = getResolveReviewByName('NotReportingDetailedValue', 9, ideaGroups, true, 2);
    resolveReview.RoughValueWithoutRoughTiming = getResolveReviewByName('RoughValueWithoutRoughTiming', 10, ideaGroups, true, 2);
    resolveReview.PendingSubmissionsToOtherGroups = getResolveReviewByName('PendingSubmissionsToOtherGroups', 11, ideaGroups, true, 2);
    resolveReview.ITCostingNotDecided = getResolveReviewByName('ITCostingNotDecided', 12, ideaGroups, true, 2);
    resolveReview.PendingSubmissionsToIT = getResolveReviewByName('PendingSubmissionsToIT', 13, ideaGroups, true, 2);
    resolveReview.AllRiskRatingsNotComplete = getResolveReviewByName('AllRiskRatingsNotComplete', 14, ideaGroups, true, 3);
    resolveReview.DetailedValueNotComplete = getResolveReviewByName('DetailedValueNotComplete', 15, ideaGroups, true, 3);
    resolveReview.RequiredGLRecommendationMissing = getResolveReviewByName('RequiredGLRecommendationMissing', 16, ideaGroups, true, 3);
    resolveReview.RequiredSCMReviewMissing = getResolveReviewByName('RequiredSCMReviewMissing', 17, ideaGroups, true, 3);
    resolveReview.RequiredSCDecisionMissing = getResolveReviewByName('RequiredSCDecisionMissing', 18, ideaGroups, true, 3);
    resolveReview.PendingMultiGroupAction = getResolveReviewByName('PendingMultiGroupAction', 19, pendingMultiGroupIdeaList, true, 3);
    resolveReview.RiskDisagreementCTMGL = getResolveReviewByName('RiskDisagreementCTMGL', 20, ideaGroups, false, 1);
    resolveReview.ExpectedMultiGroupIdeas = getResolveReviewByName('ExpectedMultiGroupIdeas', 21, ideaGroups, false, 1);
    resolveReview.MHRiskRatingsWithoutNotes = getResolveReviewByName('MHRiskRatingsWithoutNotes', 22, ideaGroups, false, 2);
    resolveReview.RequiredSecondRiskRatings = getResolveReviewByName('RequiredSecondRiskRatings', 23, ideaGroups, false, 2);
    resolveReview.Only1LineItem = getResolveReviewByName('Only1LineItem', 24, ideaGroups, false, 2);
    resolveReview.LargeValueWith2OrFewerLineItems = getResolveReviewByName('LargeValueWith2OrFewerLineItems', 25, ideaGroups, false, 2);
    resolveReview.IdeasWithFractionalPositions = getResolveReviewByName('IdeasWithFractionalPositions', 26, ideaGroups, false, 2);
    resolveReview.PendingAcceptanceFromOtherGroups = getResolveReviewByName('PendingAcceptanceFromOtherGroups', 27, ideaGroups, false, 2);
    resolveReview.ExpectedMultiGroupIdeaWithNoOtherGroupsAdded = getResolveReviewByName('ExpectedMultiGroupIdeaWithNoOtherGroupsAdded', 21, _.filter(ideaGroups, (item) => { return item.IsPrimary }), false, 2);
    resolveReview.PendingITCostEstimates = getResolveReviewByName('PendingITCostEstimates', 28, ideaGroups, false, 2);
    resolveReview.IdeasWithITCosts = getResolveReviewByName('IdeasWithITCosts', 29, ideaGroups, false, 2);
    resolveReview.CategoriesWithoutAnyImpact = { key: 'CategoriesWithoutAnyImpact', count: (othersDashboardData && _.size(othersDashboardData) > 0 ? getCount(isCompanyView, othersDashboardData['CategoriesWithoutAnyImpact']) : 0), value: 0, isResolve: false, phase: 2, ideaGroupList: [] };
    resolveReview.FunctionalTitlesWithoutAnyImpact = { key: 'FunctionalTitlesWithoutAnyImpact', count: (othersDashboardData && _.size(othersDashboardData) > 0 ? getCount(isCompanyView, othersDashboardData['FunctionalTitlesWithoutAnyImpact']) : 0), value: 0, isResolve: false, phase: 2, ideaGroupList: [] };
    resolveReview.RequiredFinanceValidationMissing = getResolveReviewByName('RequiredFinanceValidationMissing', 30, ideaGroups, false, 3);
    resolveReview.GLsDisagreeOnRecommendation = getResolveReviewByName('GLsDisagreeOnRecommendation', 31, ideaGroups, false, 3);
    return resolveReview;
};
