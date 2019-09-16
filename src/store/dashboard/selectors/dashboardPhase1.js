import _ from 'lodash';
import { prepareObjectFromArray } from '../../../common/utils';
import getArrayFromObject from 'object.values';

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

const getGroupFocusAreaDictionary = (focusAreas, groupId) => {
    let groupFocusAreas = _.filter(focusAreas, (item) => {
        return (item.GroupId === groupId)
    });
    groupFocusAreas.map((item) => {
        item.RiskCount = [0, 0, 0, 0, 0];
        item.RiskValue = [0, 0, 0, 0, 0];
        return item;
    });
    groupFocusAreas.push(
        {
            FocusAreaId: '00000000-0000-0000-0000-000000000000', FocusAreaNumber: 99999, Name: 'Unassigned',
            RiskCount: [0, 0, 0, 0, 0], RiskValue: [0, 0, 0, 0, 0]
        }
    );
    return prepareObjectFromArray(groupFocusAreas, ['FocusAreaId']);
};

const getRiskSummary = (ideaGroups) => {
    
    var riskSummary = { RiskCount: [0, 0, 0, 0], RiskValue: [0, 0, 0, 0] };
    _(ideaGroups).groupBy('RiskRatingType')
        .map((items, key) => {
            key = key == "null" || key===null ? 0 : key;
            //key = RiskRatingType
            riskSummary.RiskCount[key] += items.length;
            riskSummary.RiskValue[key] += _.sumBy(items, (item) => item.Value);
        }).value();
    return riskSummary;
};

const getRiskSummaryCompany = (ideaGroups) => {
    const groupedIdeaGroups = _.groupBy(ideaGroups, 'IdeaId');
    const primaryIdeaGroups = _.filter(ideaGroups, { 'IsPrimary': true });
    var riskSummary = { RiskCount: [0, 0, 0, 0], RiskValue: [0, 0, 0, 0] };

    _(primaryIdeaGroups).groupBy('RiskRatingType')
        .map((items, key) => {
            //key = RiskRatingType
            riskSummary.RiskCount[key] = _.filter(items, { 'IsPrimary': true }).length;
            riskSummary.RiskValue[key] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], 'Value'));
        }).value();
    return riskSummary;
};

const getFocusAreaSummary = (ideaGroups, dictionaryGroupFocusAreas) => {
    const groupByFocusAreaAndRiskRating = _.groupByMulti(ideaGroups, ['FocusAreaId', 'RiskRatingType'], null);
    _.map(groupByFocusAreaAndRiskRating, (item, keyFA) => {
        //Total Value by FocusArea
        if (dictionaryGroupFocusAreas[keyFA]) {
            dictionaryGroupFocusAreas[keyFA].RiskCount[4] = _.flatMapDepth(item).length;
            dictionaryGroupFocusAreas[keyFA].RiskValue[4] = _.sumBy(_.flatMapDepth(item), (item) => item.Value);
        }
        _.map(item, (risks, keyRisk) => {
            if (dictionaryGroupFocusAreas[keyFA]) {
                dictionaryGroupFocusAreas[keyFA].RiskCount[keyRisk] = risks.length;
                dictionaryGroupFocusAreas[keyFA].RiskValue[keyRisk] = _.sumBy(risks, (item) => item.Value);
            }
        })
    }
    );

    return getArrayFromObject(dictionaryGroupFocusAreas)
};

export const dashboardPhase1 = (activeIdeaGroups, masterData, groupId, calculateCompanyDetails, singleRowForMultigroupIdea) => {
    let riskSummary = [];
    let focusAreaSummary = [];

    if (calculateCompanyDetails) {
        if (singleRowForMultigroupIdea) {
            riskSummary = getRiskSummaryCompany(activeIdeaGroups);
        } else {
            riskSummary = getRiskSummary(activeIdeaGroups);
        }
    }
    else {
        riskSummary = getRiskSummary(activeIdeaGroups);
        const masterGroupFocusArea = _.cloneDeep(masterData.focusAreas);
        const groupFocusAreaDictionary = getGroupFocusAreaDictionary(masterGroupFocusArea, groupId);
        focusAreaSummary = getFocusAreaSummary(activeIdeaGroups, groupFocusAreaDictionary);
    }
    return {
        riskSummary: riskSummary, focusAreaSummary: focusAreaSummary
    }
};


