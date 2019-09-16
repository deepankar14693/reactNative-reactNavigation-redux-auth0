import _ from 'lodash';
import { getDecisionGo, getDecisionNoGo, getRiskSortId, convertArrayToDictionary, isCheckBoxChecked } from '../../../common/utils';
import { resolveReviewListArray } from '../../../common/constants';
import update from 'immutability-helper';

export const updateFavouriteField = (state, ideaGroupList, isFavourite) => {
    let newState = Object.assign([], state);
    if (ideaGroupList && ideaGroupList.length > 0) {
        ideaGroupList.forEach(item => {
            const index = newState.findIndex(op => op.EntityId === item.EntityId);
            if (index !== -1) {
                newState = update(newState, { [index]: { Idea: { IsFavourite: { $set: isFavourite } } } });
            }
        });
        return update(state, { $set: newState });
    }
    else {
        return state;
    }
};


export const updateIdeaGroupFavourite = (state, action) => {
    var configData = JSON.parse(action.payload.config.data);
    const ideaGroups = _.filter(state, { 'IdeaId': configData.ideaId });

    switch (configData.fieldName) {
        case 'Star_Idea':
            return updateFavouriteField(state, ideaGroups, true);
        case 'Unstar_Idea':
            return updateFavouriteField(state, ideaGroups, false);
        default:
            return state;
    }
};


export const updateDashboardIdeaGroupData = (state, data) => {
    let stateObj = Object.assign([], state);
    let newState = _.unionBy(data, stateObj, 'IdeaGroupId');
    return Object.assign([], ...state, newState);
};

export const updateIdeaData = (state, ideaList) => {
    if (ideaList) {
        if (state.length > 0 && ideaList.length > 0) {
            const objIdeaArray = _.map(ideaList, (function (item) {
                return item;
            }));
            const newState = _.unionBy(objIdeaArray, state, 'IdeaId');
            return update(state, { $set: newState });
        } else if (ideaList != null && ideaList.length > 0) {
            return _.map(ideaList, (function (item) {
                return item;
            }));
        } else {
            return state;
        }
    } else return state;
};

export const updateIdeaGroupData = (state, ideaGroupList, ideaList, entireState) => {
    const ideas = _.groupBy(ideaList, 'IdeaId');
    if (ideaGroupList) {
        if (state.length > 0 && ideaGroupList.length > 0) {
            const objIdeaGroupsArray = _.map(ideaGroupList, (function (item) {
                const idea = ideas[item.IdeaId] ? ideas[item.IdeaId][0] : null
                return ideaGroupView(item, idea, entireState)
            }));
            const newState = _.unionBy(objIdeaGroupsArray, state, 'IdeaGroupId');
            return update(state, { $set: newState });
        } else if (ideaGroupList != null && ideaGroupList.length > 0) {
            return _.map(ideaGroupList, (function (item) {
                const idea = ideas[item.IdeaId] ? ideas[item.IdeaId][0] : null
                return ideaGroupView(item, idea, entireState)
            }));
        } else {
            return state;
        }
    } else return state;
};



export const ideaGroupView = (item, idea, entireState) => {
    if (item.ValueComponents) {
        item["GroupFTENumber"] = item.ValueComponents[0] + item.ValueComponents[1];
        item["GroupPEValue"] = item.ValueComponents[3] + item.ValueComponents[4];
        item["GroupOnetimeNPEValue"] = item.ValueComponents[6] + item.ValueComponents[7] + item.ValueComponents[15] + item.ValueComponents[16];
        item["GroupRecurringNPEValue"] = item.ValueComponents[12] + item.ValueComponents[13];
        item["GroupOneTimeITValue"] = item.ValueComponents[8];
        item["GroupRecurringITValue"] = item.ValueComponents[14];
        item["GroupOnetimeMarginChangeValue"] = item.ValueComponents[17] + item.ValueComponents[18];
        item["GroupRecurringMarginChangeValue"] = item.ValueComponents[21] + item.ValueComponents[22];
    }
    if (item.IdeaValueComponents) {
        item["IdeaFTENumber"] = item.IdeaValueComponents[0] + item.IdeaValueComponents[1];
        item["IdeaPEValue"] = item.IdeaValueComponents[3] + item.IdeaValueComponents[4];
        item["IdeaOnetimeNPEValue"] = item.IdeaValueComponents[6] + item.IdeaValueComponents[7] + item.IdeaValueComponents[15] + item.IdeaValueComponents[16];
        item["IdeaRecurringNPEValue"] = item.IdeaValueComponents[12] + item.IdeaValueComponents[13];
        item["IdeaOneTimeITValue"] = item.IdeaValueComponents[8];
        item["IdeaRecurringITValue"] = item.IdeaValueComponents[14];
        item["IdeaOnetimeMarginChangeValue"] = item.IdeaValueComponents[17] + item.IdeaValueComponents[18];
        item["IdeaRecurringMarginChangeValue"] = item.IdeaValueComponents[21] + item.IdeaValueComponents[22];
    }
    item["FocusAreaLeaderNames"] = entireState.masterData.focusAreas[item.FocusAreaId] ?
        _.map(entireState.masterData.focusAreas[item.FocusAreaId].FocusAreaLeaders, 'Name').join(', ') : '';
    item["IsFinanceValidated"] = item.ValueStatus === 4 ? 1 : 0;
    item["FinanceValidationRequired"] = item.IsValidationNotRequired ? 0 : 1;
    item["GroupName"] = entireState.masterData.groups[item.GroupId] ? entireState.masterData.groups[item.GroupId].Name : '';
    if (item.ResolveReview) {
        item["IsImpactsAssigned"] = (item.ResolveReview[5] === 1 ? 0 : 1);
    }
    if (idea) {
        const riskSort = getRiskSortId(item.RiskRatingType);
        let decRecRRSort = 90;
        if (item.SCDecisionType === 1 || item.SCDecisionType === 2) {
            decRecRRSort = item.SCDecisionType * 100;
        } else if (item.GLRecommendationType === 1 || item.GLRecommendationType === 2) {
            decRecRRSort = item.GLRecommendationType;
        } else if (riskSort === 1 || riskSort === 2 || riskSort === 3) {
            decRecRRSort = riskSort * 10;
        }
        let decisionStage = 0;
        if (item.SCDecisionType && item.SCDecisionType > 0) {
            decisionStage = 3;
        } else if ((item.IsReviewed && item.IsReviewed === true) || (item.SCMReviewNotRequired && item.SCMReviewNotRequired === true)) {
            decisionStage = 2;
        } else if (item.GLRecommendationType && item.GLRecommendationType > 0) {
            decisionStage = 1;
        }

        const groupUnAdjustedValue = idea.Value ? (idea.Value -
            (idea.TotalCost ? (idea.TotalCost - (idea.TotalCost * (
                item.BenefitPct ? item.BenefitPct : 1
            ))) : 0)) : 0;

        const groupGLs = entireState.masterData.groups[item.GroupId] ? entireState.masterData.groups[item.GroupId].GL : [];
        const isGLExists = groupGLs.length > 0 ? true : false;
        return update(item,
            {
                Idea: { $set: updateIdeaGroupView(idea, entireState) },
                DecisionGo: { $set: (getDecisionGo(item.SCDecisionType ? item.SCDecisionType : (item.GLRecommendationType ? item.GLRecommendationType : null))) },
                DecisionNoGo: { $set: (getDecisionNoGo(item.SCDecisionType ? item.SCDecisionType : (item.GLRecommendationType ? item.GLRecommendationType : null))) },
                DecRecRRSort: { $set: decRecRRSort },
                RiskSort: { $set: riskSort },
                IsChecked: { $set: (!item.IsChecked ? 0 : item.IsChecked) },
                DecisionStage: { $set: decisionStage },
                GroupUnAdjustedValue: { $set: groupUnAdjustedValue },
                IsGLExists: { $set: isGLExists },
                PrimaryGroupLeaderId: { $set: (groupGLs.length > 0 ? groupGLs[0].PersonnelId : null) }
            }
        );
    } else {
        return item;
    }
};

export const updateIdeaGroupView = (idea, entireState) => {
    let isFavourite = false;
    const starIdeas = entireState.starIdeas;
    if (starIdeas.length > 0) {
        for (var i = 0; i < starIdeas.length; i++) {
            if (starIdeas[i] === idea.IdeaId) {
                isFavourite = true;
                break;
            }
        }
    } else {
        isFavourite = false;
    }

    let linkedGroupsNameArray = [];
    if (idea.Groups) {
        if (idea.Groups.length > 0) {
            const linkedGroups = _.filter(idea.Groups, (item) => {
                return item.GroupId !== idea.GroupId;
            });
            _.map(linkedGroups, (el) => {
                if (entireState.masterData.groups[el.GroupId]) {
                    linkedGroupsNameArray.push(entireState.masterData.groups[el.GroupId].Name);
                }
            });
        }
    }
    const linkedGroupsName = linkedGroupsNameArray.join(', ');
    const ideaLeadersName = _.map(idea.IdeaLeaders, 'Name').join(', ');
    const ideaICsName = _.map(idea.IdeaICs, 'Name').join(', ');
    const modifiedByName = (idea.ModifiedBy && idea.ModifiedBy !== '00000000-0000-0000-0000-000000000000'
        && entireState.masterData.users[idea.ModifiedBy] ? entireState.masterData.users[idea.ModifiedBy].Name : '');
    return update(idea,
        {
            CompanyValue: { $set: idea.Value },
            IsFavourite: { $set: isFavourite },
            LinkedGroups: { $set: linkedGroupsName },
            IdeaLeadersName: { $set: ideaLeadersName },
            IdeaICsName: { $set: ideaICsName },
            ModifiedByName: { $set: modifiedByName },
            URiskCount: { $set: idea.RiskCounts ? idea.RiskCounts[0] : 0 },
            LRiskCount: { $set: idea.RiskCounts ? idea.RiskCounts[1] : 0 },
            MRiskCount: { $set: idea.RiskCounts ? idea.RiskCounts[2] : 0 },
            HRiskCount: { $set: idea.RiskCounts ? idea.RiskCounts[3] : 0 },
            RiskRatersCount: { $set: idea.RiskCounts ? (idea.RiskCounts[0] + idea.RiskCounts[1] + idea.RiskCounts[2] + idea.RiskCounts[3]) : 0 },
        });

};

export const toggleIdeaGroupCheckUncheck = (ideaGroup, ideaGroupId, isChecked, view) => {
    if (ideaGroup.IdeaGroupId !== ideaGroupId) return ideaGroup;
    if (ideaGroup.IdeaGroupId === ideaGroupId) {
        if (isChecked) {
            if (!isCheckBoxChecked(view, ideaGroup.IsChecked)) {
                return update(ideaGroup, { IsChecked: { $set: ideaGroup.IsChecked + view } })
            } else {
                return ideaGroup;
            }

        } else {
            if (isCheckBoxChecked(view, ideaGroup.IsChecked)) {
                return update(ideaGroup, { IsChecked: { $set: ideaGroup.IsChecked - view } })
            } else {
                return ideaGroup;
            }
        }
    } else {
        return ideaGroup;
    }
};

export const allIdeaGroupsUncheck = (ideaGroup, view) => {
    if (isCheckBoxChecked(view, ideaGroup.IsChecked)) {
        return update(ideaGroup, { IsChecked: { $set: ideaGroup.IsChecked - view } })
    } else {
        return ideaGroup;
    }
};

export const toggleAllIdeaGroupsCheckUncheckOnePage = (ideaGroup, ideaGroupIds, isChecked, view) => {
    const ideaGroupIdDic = convertArrayToDictionary(ideaGroupIds);
    if (!ideaGroupIdDic[ideaGroup.IdeaGroupId]) {
        return ideaGroup;
    }
    else {
        if (isChecked) {
            if (!isCheckBoxChecked(view, ideaGroup.IsChecked)) {
                return update(ideaGroup, { IsChecked: { $set: ideaGroup.IsChecked + view } })
            } else {
                return ideaGroup;
            }
        } else {
            if (!isCheckBoxChecked(view, ideaGroup.IsChecked)) {
                return ideaGroup;
            } else if (isCheckBoxChecked(view, ideaGroup.IsChecked)) {
                return update(ideaGroup, { IsChecked: { $set: ideaGroup.IsChecked - view } })
            } else {
                return ideaGroup;
            }
        }
    }
};

const resolveReview = {
    NoIdeaDescription: {},
    NoFocusArea: {},
    RiskNotStarted: {},
    NoGLRiskRating: {},
    NoRoughValue: {},
    NoExpectedImpacts: {},
    AllRiskRatersNotIdentified: {},
    RatingsNotEntered: {},
    IncompleteLineItems: {},
    NotReportingDetailedValue: {},
    RoughValueWithoutRoughTiming: {},
    PendingSubmissionsToOtherGroups: {},
    ITCostingNotDecided: {},
    PendingSubmissionsToIT: {},
    AllRiskRatingsNotComplete: {},
    DetailedValueNotComplete: {},
    RequiredGLRecommendationMissing: {},
    RequiredSCMReviewMissing: {},
    RequiredSCDecisionMissing: {},
    PendingMultiGroupAction: {},
    RiskDisagreementCTMGL: {},
    ExpectedMultiGroupIdeas: {},
    MHRiskRatingsWithoutNotes: {},
    RequiredSecondRiskRatings: {},
    Only1LineItem: {},
    LargeValueWith2OrFewerLineItems: {},
    IdeasWithFractionalPositions: {},
    PendingAcceptanceFromOtherGroups: {},
    PendingITCostEstimates: {},
    IdeasWithITCosts: {},
    RequiredFinanceValidationMissing: {},
    GLsDisagreeOnRecommendation: {}
};

const resolveReviewWithKey = {
    NoIdeaDescription: { key: 0 },
    NoFocusArea: { key: 1 },
    RiskNotStarted: { key: 2 },
    NoGLRiskRating: { key: 3 },
    NoRoughValue: { key: 4 },
    NoExpectedImpacts: { key: 5 },
    AllRiskRatersNotIdentified: { key: 6 },
    RatingsNotEntered: { key: 7 },
    IncompleteLineItems: { key: 8 },
    NotReportingDetailedValue: { key: 9 },
    RoughValueWithoutRoughTiming: { key: 10 },
    PendingSubmissionsToOtherGroups: { key: 11 },
    ITCostingNotDecided: { key: 12 },
    PendingSubmissionsToIT: { key: 13 },
    AllRiskRatingsNotComplete: { key: 14 },
    DetailedValueNotComplete: { key: 15 },
    RequiredGLRecommendationMissing: { key: 16 },
    RequiredSCMReviewMissing: { key: 17 },
    RequiredSCDecisionMissing: { key: 18 },
    PendingMultiGroupAction: { key: 19 },
    RiskDisagreementCTMGL: { key: 20 },
    ExpectedMultiGroupIdeas: { key: 21 },
    MHRiskRatingsWithoutNotes: { key: 22 },
    RequiredSecondRiskRatings: { key: 23 },
    Only1LineItem: { key: 24 },
    LargeValueWith2OrFewerLineItems: { key: 25 },
    IdeasWithFractionalPositions: { key: 26 },
    PendingAcceptanceFromOtherGroups: { key: 27 },
    PendingITCostEstimates: { key: 28 },
    IdeasWithITCosts: { key: 29 },
    RequiredFinanceValidationMissing: { key: 30 },
    GLsDisagreeOnRecommendation: { key: 31 }
};

export const getResolveReviewByName = (key, resolveReviewIndex, ideaGroups, isResolve, phase) => {
    const resolveReviewList = resolveReviewListArray();
    const rrIdeas = _.filter(ideaGroups, (item) => { return item.ResolveReview[resolveReviewIndex] === 1 });
    const value = _.sumBy(rrIdeas, 'Value');
    const rrItem = _.filter(resolveReviewList, { 'label': key })[0];
    rrItem.amount = value;
    rrItem.ideas = rrIdeas;
    return rrItem;
};

export const getResolveReviewList = (ideaGroups, showInactiveIdea) => {
    if (!showInactiveIdea) {
        ideaGroups = _.filter(ideaGroups, (item) => { return item.IdeaStatus === 1 });
    }
    let resolveReview = []
    resolveReview.push(getResolveReviewByName('NoIdeaDescription', 0, ideaGroups, true, 1));
    resolveReview.push(getResolveReviewByName('NoFocusArea', 1, ideaGroups, true, 1));
    resolveReview.push(getResolveReviewByName('RiskNotStarted', 2, ideaGroups, true, 1));
    resolveReview.push(getResolveReviewByName('NoGLRiskRating', 3, ideaGroups, true, 1));
    resolveReview.push(getResolveReviewByName('NoRoughValue', 4, ideaGroups, true, 1));
    resolveReview.push(getResolveReviewByName('NoExpectedImpacts', 5, ideaGroups, true, 1));
    resolveReview.push(getResolveReviewByName('AllRiskRatersNotIdentified', 6, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('RatingsNotEntered', 7, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('IncompleteLineItems', 8, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('NotReportingDetailedValue', 9, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('RoughValueWithoutRoughTiming', 10, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('PendingSubmissionsToOtherGroups', 11, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('ITCostingNotDecided', 12, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('PendingSubmissionsToIT', 13, ideaGroups, true, 2));
    resolveReview.push(getResolveReviewByName('AllRiskRatingsNotComplete', 14, ideaGroups, true, 3));
    resolveReview.push(getResolveReviewByName('DetailedValueNotComplete', 15, ideaGroups, true, 3));
    resolveReview.push(getResolveReviewByName('RequiredGLRecommendationMissing', 16, ideaGroups, true, 3));
    resolveReview.push(getResolveReviewByName('RequiredSCMReviewMissing', 17, ideaGroups, true, 3));
    resolveReview.push(getResolveReviewByName('RequiredSCDecisionMissing', 18, ideaGroups, true, 3));
    resolveReview.push(getResolveReviewByName('PendingMultiGroupAction', 19, ideaGroups, true, 3));
    resolveReview.push(getResolveReviewByName('RiskDisagreementCTMGL', 20, ideaGroups, false, 1));
    resolveReview.push(getResolveReviewByName('ExpectedMultiGroupIdeas', 21, ideaGroups, false, 1));
    resolveReview.push(getResolveReviewByName('MHRiskRatingsWithoutNotes', 22, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('RequiredSecondRiskRatings', 23, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('Only1LineItem', 24, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('LargeValueWith2OrFewerLineItems', 25, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('IdeasWithFractionalPositions', 26, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('PendingAcceptanceFromOtherGroups', 27, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('PendingITCostEstimates', 28, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('IdeasWithITCosts', 29, ideaGroups, false, 2));
    resolveReview.push(getResolveReviewByName('RequiredFinanceValidationMissing', 30, ideaGroups, false, 3));
    resolveReview.push(getResolveReviewByName('GLsDisagreeOnRecommendation', 31, ideaGroups, false, 3));
    return resolveReview;
};

export const getResolveReviewCountByName = (key, ideaGroups, isExcluded) => {
    if (key === 'ExpectedMultiGroupIdeaWithNoOtherGroupsAdded') {
        ideaGroups = _.filter(ideaGroups, (item) => { return item.IsPrimary });
        key = key === 'ExpectedMultiGroupIdeaWithNoOtherGroupsAdded' ? 'ExpectedMultiGroupIdeas' : key
    }
    const resolveReviewIndex = resolveReviewWithKey[key];
    if (resolveReviewIndex) {
        const rrIdeaGroups = _.filter(ideaGroups, (item) => { return item.ResolveReview[resolveReviewIndex.key] === (isExcluded ? 0 : 1) });
        return rrIdeaGroups;
    } else {
        return [];
    }

};

