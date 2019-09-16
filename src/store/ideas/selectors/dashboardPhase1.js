import _ from 'lodash';
import {  isEmpty, filterByValues } from '../../../common/utils';

_.groupByMulti = function (obj, values, context) {
    if (!values.length)
        return obj;
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
};

const getActiveIdeaIds = (ideaGroups) => {
    return _.map(ideaGroups, 'IdeaId');
    //return _.map(_.filter(ideaGroups, (item) => { return item.ValueStatus > 1 }), 'IdeaId')
};


export const npeCategory = (ideaGroups, lineItems) => {
    var roughIdeaGroups = ideaGroups.filter((item) => {
        return (item.ValueStatus < 2 && !isEmpty(item.ExpectedNPEImpacts) && item.ExpectedNPEImpacts !== '')
    });

    var expectedImpacts = [].concat(...roughIdeaGroups.map(({ IdeaId, ExpectedNPEImpacts }) =>
        (ExpectedNPEImpacts.split(',')).
            map(Category => ({ IdeaId, Category }))
    ));
    var detailedLineItems = filterByValues(lineItems, 'IdeaId', _.map(_.filter(ideaGroups, (item) => { return item.ValueStatus > 1 }), 'IdeaId'));

    var detailedLineItems = _.map(detailedLineItems, _.partialRight(_.pick, ['IdeaId', 'Category']));
    var groupedCategory = _.groupBy(_.uniqWith(_.union(expectedImpacts, detailedLineItems), _.isEqual), 'Category');
    return groupedCategory;
};

export const getNPEBaselineSummary2 = (ideaGroups, lineItems, groupId, groupType, entityId) => {
    var ideaIds = [];
    var lineItems = Object.assign(_.filter(lineItems, { 'GroupId': groupId }));
    lineItems = filterByValues(lineItems, 'IdeaId', getActiveIdeaIds(ideaGroups));
    var categories = [];
    if (groupType === 1) {
        categories = revenueCategory(ideaGroups, lineItems);
    } else {
        categories = npeCategory(ideaGroups, lineItems);
    }
    if (categories[entityId]) {
        ideaIds = _.map(categories[entityId], 'IdeaId')
    }
    return ideaIds;
};

export const peFunctionalTitle = (ideaGroups, lineItems) => {
    var roughIdeaGroups = ideaGroups.filter((item) => {
        return (item.ValueStatus < 2 && !isEmpty(item.ExpectedPEImpacts) && item.ExpectedPEImpacts !== '')
    });

    var detailedLineItems = filterByValues(lineItems, 'IdeaId', _.map(_.filter(ideaGroups, (item) => { return item.ValueStatus > 1 }), 'IdeaId'));

    var expectedImpacts = [].concat(...roughIdeaGroups.map(({ IdeaId, ExpectedPEImpacts }) =>
        (ExpectedPEImpacts.split(',')).
            map(FunctionalTitleId => ({ IdeaId, FunctionalTitleId }))
    ));
    detailedLineItems = _.map(detailedLineItems, _.partialRight(_.pick, ['IdeaId', 'FunctionalTitleId']));
    var groupedFunctionalTitleId = _.groupBy(_.uniqWith(_.union(expectedImpacts, detailedLineItems), _.isEqual), 'FunctionalTitleId');
    return groupedFunctionalTitleId;
};



export const getPEBaselineSummary2 = (ideaGroups, lineItems, groupId, entityId) => {
    var ideaIds = [];
    var lineItems = Object.assign(_.filter(lineItems, { 'GroupId': groupId }));
    lineItems = filterByValues(lineItems, 'IdeaId', getActiveIdeaIds(ideaGroups));

    var peFunctionalTitles = peFunctionalTitle(ideaGroups, lineItems);

    if (peFunctionalTitles[entityId]) {
        ideaIds = _.map(peFunctionalTitles[entityId], 'IdeaId')
    }
    return ideaIds;
};

export const revenueCategory = (ideaGroups, lineItems) => {
    var roughIdeaGroups = ideaGroups.filter((item) => {
        return (item.ValueStatus < 2 && !isEmpty(item.ExpectedRevenueImpacts) && item.ExpectedRevenueImpacts !== '')
    });

    var expectedImpacts = [].concat(...roughIdeaGroups.map(({ IdeaId, ExpectedRevenueImpacts }) =>
        (ExpectedRevenueImpacts.split(',')).
            map(Category => ({ IdeaId, Category }))
    ));
    var detailedLineItems = filterByValues(lineItems, 'IdeaId', _.map(_.filter(ideaGroups, (item) => { return item.ValueStatus > 1 }), 'IdeaId'));
    var detailedLineItems = _.map(detailedLineItems, _.partialRight(_.pick, ['IdeaId', 'Category']));
    var groupedCategory = _.groupBy(_.uniqWith(_.union(expectedImpacts, detailedLineItems), _.isEqual), 'Category');
    return groupedCategory;
};


