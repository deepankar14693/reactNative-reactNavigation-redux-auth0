import _ from 'lodash';

export const updateIdeaDetailData = (state, data, entityName) => {
    //const stateObj = { ...state };
    switch (entityName) {
        case 'ideaPersonnelLineItems':
            return _.unionBy(data, state, 'PersonnelLineItemId');
        case 'ideaNonPersonnelLineItems':
            return _.unionBy(data, state, 'NonPersonnelLineItemId');
        case 'ideaRevenueLineItems':
            return _.unionBy(data, state, 'RevenueLineItemId');
        case 'ideaRiskRatings':
            return _.unionBy(data, state, 'RiskRatingId');
        case 'ideaRecommendations':
            return _.unionBy(data, state, 'RecommendationId');
        case 'ideaSCDecisions':
            return _.unionBy(data, state, 'SCDecisionId');
        case 'ideaSCMReviews':
            return _.unionBy(data, state, 'SCMReviewId');
        case 'ideaCustomFields':
            return _.unionBy(data, state, 'IdeaId');
        case 'metrics':
            return _.unionBy(data, state, 'MetricId');
        case 'milestones':
            return _.unionBy(data, state, 'MilestoneId');
        default: return state;
    }
};