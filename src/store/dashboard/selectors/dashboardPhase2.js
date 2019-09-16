import _ from 'lodash';
import getArrayFromObject from 'object.values';
import { prepareObjectFromArray } from '../../../common/utils';
import { getYearsCountArray } from '../../../common/constants';

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

export const getCFandPLYearlyValues = (items, years) => {
    let pLValues = [years.length];
    let cFValues = [years.length];
    for (let index = 0; index < years.length; index++) {
        pLValues[index] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[index] : 0);
        cFValues[index] = _.sumBy(items, (item) => item.CFYearlyValues ? item.CFYearlyValues[index] : 0);
    }

    // pLValues[0] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[0] : 0);
    // pLValues[1] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[1] : 0);
    // pLValues[2] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[2] : 0);
    // pLValues[3] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[3] : 0);
    // pLValues[4] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[4] : 0);

    // cFValues[0] = _.sumBy(items, (item) => item.CFYearlyValues ? item.CFYearlyValues[0] : 0);
    // cFValues[1] = _.sumBy(items, (item) => item.CFYearlyValues ? item.CFYearlyValues[1] : 0);
    // cFValues[2] = _.sumBy(items, (item) => item.CFYearlyValues ? item.CFYearlyValues[2] : 0);
    // cFValues[3] = _.sumBy(items, (item) => item.CFYearlyValues ? item.CFYearlyValues[3] : 0);
    // cFValues[4] = _.sumBy(items, (item) => item.CFYearlyValues ? item.CFYearlyValues[4] : 0);

    return { PL: pLValues, CF: cFValues };
};

const getIdeaGroupValueSummary = (ideaGroups) => {
    var multiGroupAdjValue = { RiskValue: [0, 0, 0, 0] };
    var groupValue = { RiskValue: [0, 0, 0, 0] };
    var adjGroupValue = { RiskValue: [0, 0, 0, 0] };
    var groupedRiskRating = _(ideaGroups).groupBy('GLRiskRatingType')
        .map((items, key) => {
            adjGroupValue.RiskValue[key] = _.sumBy(items, 'Value');// getMultiGroupAdjValue(items);
            groupValue.RiskValue[key] = _.sumBy(items, 'TotalBenefit') + (_.sumBy(items, 'TotalCost') * -1);
            multiGroupAdjValue.RiskValue[key] = adjGroupValue.RiskValue[key] - groupValue.RiskValue[key];

        }).value();
    return { multiGroupAdjValue: multiGroupAdjValue, adjGroupValue: adjGroupValue, groupValue: groupValue };
};

const geValueComponentDetails = (items) => {
    let valueComponent = {
        PersonnelFTESavings: 0, PersonnelFTECost: 0, PersonnelFTEITCost: 0,
        PersonnelPESavings: 0, PersonnelPECost: 0, PersonnelPEITCost: 0,
        NPEOneTimeAmrtCost: 0, NPEOneTimeAmrtSavings: 0, NPEOneTimeAmrtITCost: 0,
        NPEOneTimeUnamrtSavings: 0, NPEOneTimeUnamrtCost: 0, NPEOneTimeUnamrtITCost: 0,
        NPERecurringSavings: 0, NPERecurringCost: 0, NPERecurringITCost: 0,
        NPEWCAmrtSavings: 0, NPEWCAmrtCost: 0, NPEWCUnamrtSavings: 0, NPEWCUnamrtCost: 0,
        RevOneTimeAmrtSavings: 0, RevOneTimeAmrtCost: 0,
        RevOneTimeUnamrtSavings: 0, RevOneTimeUnamrtCost: 0,
        RevRecurringSavings: 0, RevRecurringCost: 0
    };
    let detailedItems = _.filter(items, (item) => { return item.ValueStatus > 1 || item.ITValueStatus > 1 })
    valueComponent.PersonnelFTESavings = _.sumBy(detailedItems, (item) => item.ValueComponents[0] ? item.ValueComponents[0] : 0);
    valueComponent.PersonnelFTECost = _.sumBy(detailedItems, (item) => item.ValueComponents[1] ? item.ValueComponents[1] : 0);
    valueComponent.PersonnelFTEITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[2] ? item.ValueComponents[2] : 0);

    valueComponent.PersonnelPESavings = _.sumBy(items, (item) => item.ValueComponents[3] ? item.ValueComponents[3] : 0);
    valueComponent.PersonnelPECost = _.sumBy(items, (item) => item.ValueComponents[4] ? item.ValueComponents[4] : 0);
    valueComponent.PersonnelPEITCost = _.sumBy(items, (item) => item.ValueComponents[5] ? item.ValueComponents[5] : 0);

    valueComponent.NPEOneTimeAmrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[6] ? item.ValueComponents[6] : 0);
    valueComponent.NPEOneTimeAmrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[7] ? item.ValueComponents[7] : 0);
    valueComponent.NPEOneTimeAmrtITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[8] ? item.ValueComponents[8] : 0);

    valueComponent.NPEOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[9] ? item.ValueComponents[9] : 0);
    valueComponent.NPEOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[10] ? item.ValueComponents[10] : 0);
    valueComponent.NPEOneTimeUnamrtITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[11] ? item.ValueComponents[11] : 0);

    valueComponent.NPERecurringSavings = _.sumBy(items, (item) => item.ValueComponents[12] ? item.ValueComponents[12] : 0);
    valueComponent.NPERecurringCost = _.sumBy(items, (item) => item.ValueComponents[13] ? item.ValueComponents[13] : 0);
    valueComponent.NPERecurringITCost = _.sumBy(items, (item) => item.ValueComponents[14] ? item.ValueComponents[14] : 0);

    valueComponent.NPEWCUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[23] ? item.ValueComponents[23] : 0);
    valueComponent.NPEWCUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[24] ? item.ValueComponents[24] : 0);

    valueComponent.NPEWCAmrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[15] ? item.ValueComponents[15] : 0);
    valueComponent.NPEWCAmrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[16] ? item.ValueComponents[16] : 0);

    valueComponent.RevOneTimeAmrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[17] ? item.ValueComponents[17] : 0);
    valueComponent.RevOneTimeAmrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[18] ? item.ValueComponents[18] : 0);

    valueComponent.RevOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[19] ? item.ValueComponents[19] : 0);
    valueComponent.RevOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[20] ? item.ValueComponents[20] : 0);

    valueComponent.RevRecurringSavings = _.sumBy(items, (item) => item.ValueComponents[21] ? item.ValueComponents[21] : 0);
    valueComponent.RevRecurringCost = _.sumBy(items, (item) => item.ValueComponents[22] ? item.ValueComponents[22] : 0);

    valueComponent.IdeaNPEOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[9] ? item.ValueComponents[9] : 0);
    valueComponent.IdeaNPEOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[10] ? item.ValueComponents[10] : 0);
    valueComponent.IdeaNPEOneTimeUnamrtITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[11] ? item.ValueComponents[11] : 0);

    valueComponent.IdeaNPERecurringSavings = _.sumBy(items, (item) => item.ValueComponents[12] ? item.ValueComponents[12] : 0);
    valueComponent.IdeaNPERecurringCost = _.sumBy(items, (item) => item.ValueComponents[13] ? item.ValueComponents[13] : 0);
    valueComponent.IdeaNPERecurringITCost = _.sumBy(items, (item) => item.ValueComponents[14] ? item.ValueComponents[14] : 0);

    return valueComponent;
};

const geValueComponentWithAdjDetails = (items) => {
    let valueComponent = {
        PersonnelFTECost: 0,
        NPEOneTimeAmrtCost: 0, NPEOneTimeAmrtITCost: 0,
        OneTimeAdjAmrtOther: 0, OneTimeAdjAmrtIT: 0,
        NPEOneTimeUnamrtCost: 0, NPEOneTimeUnamrtITCost: 0,
        NPERecurringSavings: 0, NPERecurringCost: 0, NPERecurringITCost: 0,
        NPEWCAmrtCost: 0, NPEWCUnamrtCost: 0,
        RevOneTimeAmrtSavings: 0, RevOneTimeAmrtCost: 0,
        RevOneTimeUnamrtSavings: 0, RevOneTimeUnamrtCost: 0,
        RevRecurringSavings: 0, RevRecurringCost: 0
    };
    items = _.filter(items, (item) => { return item.ValueStatus > 1 })
    valueComponent.PersonnelFTECost = _.sumBy(items, (item) => item.AdjValueComponents[1] ? item.AdjValueComponents[1] : 0);
    //valueComponent.PersonnelFTECost =_.sumBy(items, (item) =>  item.IdeaValueComponents[1] ? (item.BenefitPct===1) ?(item.ValueComponents[1]===0?item.ValueComponents[1]:item.IdeaValueComponents[1]) :(item.IdeaValueComponents[1] * item.BenefitPct): 0);
    valueComponent.NPEOneTimeAmrtCost = _.sumBy(items, (item) => item.AdjValueComponents[7] ? item.AdjValueComponents[7] : 0);
    valueComponent.NPEOneTimeAmrtITCost = _.sumBy(items, (item) => item.AdjValueComponents[8] ? item.AdjValueComponents[8] : 0);;

    valueComponent.NPEOneTimeUnamrtCost = _.sumBy(items, (item) => item.AdjValueComponents[10] ? item.AdjValueComponents[10] : 0);
    valueComponent.NPEOneTimeUnamrtITCost = _.sumBy(items, (item) => item.AdjValueComponents[11] ? item.AdjValueComponents[11] : 0);

    valueComponent.NPEWCAmrtCost = _.sumBy(items, (item) => item.AdjValueComponents[16] ? item.AdjValueComponents[16] : 0);

    valueComponent.NPEWCUnamrtCost = _.sumBy(items, (item) => item.AdjValueComponents[24] ? item.AdjValueComponents[24] : 0);

    valueComponent.RevOneTimeAmrtCost = _.sumBy(items, (item) => item.AdjValueComponents[18] ? item.AdjValueComponents[18] : 0);

    valueComponent.RevOneTimeUnamrtCost = _.sumBy(items, (item) => item.AdjValueComponents[20] ? item.AdjValueComponents[20] : 0);
    return valueComponent;

};

const getRiskSummary = (ideaGroups, sumByColumn, years) => {
    let riskSummary = {
        RiskCount: [0, 0, 0, 0], RiskValue: [0, 0, 0, 0], ideas: [[], [], [], []],
        PL: [getYearsCountArray(years), getYearsCountArray(years), getYearsCountArray(years), getYearsCountArray(years)],
        CF: [getYearsCountArray(years), getYearsCountArray(years), getYearsCountArray(years), getYearsCountArray(years)],

        PersonnelFTESavings: [0, 0, 0, 0], PersonnelFTECost: [0, 0, 0, 0], PersonnelFTEITCost: [0, 0, 0, 0],
        PersonnelPESavings: [0, 0, 0, 0], PersonnelPECost: [0, 0, 0, 0], PersonnelPEITCost: [0, 0, 0, 0],
        NPEOneTimeAmrtCost: [0, 0, 0, 0], NPEOneTimeAmrtSavings: [0, 0, 0, 0], NPEOneTimeAmrtITCost: [0, 0, 0, 0],
        NPEOneTimeUnamrtSavings: [0, 0, 0, 0], NPEOneTimeUnamrtCost: [0, 0, 0, 0], NPEOneTimeUnamrtITCost: [0, 0, 0, 0],
        NPERecurringSavings: [0, 0, 0, 0], NPERecurringCost: [0, 0, 0, 0], NPERecurringITCost: [0, 0, 0, 0],
        NPEWCSavings: [0, 0, 0, 0], NPEWCCost: [0, 0, 0, 0],
        RevOneTimeAmrtSavings: [0, 0, 0, 0], RevOneTimeAmrtCost: [0, 0, 0, 0],
        RevOneTimeUnamrtSavings: [0, 0, 0, 0], RevOneTimeUnamrtCost: [0, 0, 0, 0],
        RevRecurringSavings: [0, 0, 0, 0], RevRecurringCost: [0, 0, 0, 0],

        OneTimeAmrtOther: [0, 0, 0, 0],
        OneTimeUnamrtOther: [0, 0, 0, 0],
        NetFte: [0, 0, 0, 0],
        FteMultiGroupAdjustment: [0, 0, 0, 0],

        RecurringNonPersonnelExpenses: [0, 0, 0, 0],
        RecurringPersonnelExpenses: [0, 0, 0, 0],
        OneTimeAdditions: [0, 0, 0, 0],
        OneTimeReductions: [0, 0, 0, 0],
        RecurringMargin: [0, 0, 0, 0],
        OneTimeMargin: [0, 0, 0, 0],

        AmrtOneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        UnamortizedOneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        }

    };
    _(ideaGroups).groupBy('GLRiskRatingType')
        .map((items, key) => {
            //key = RiskRatingType
            if (sumByColumn === 'Value') {
                riskSummary.ideas[key] = _.map(items, 'IdeaId');
            }
            riskSummary.RiskCount[key] = items.length;
            riskSummary.RiskValue[key] = _.sumBy(items, sumByColumn);

            //P&L, Cash Flow Yearly Values
            const cfandPLYearlyValues = getCFandPLYearlyValues(items, years)
            riskSummary.PL[key] = cfandPLYearlyValues.PL;
            riskSummary.CF[key] = cfandPLYearlyValues.CF;
            //Value Component Details
            const valueComponent = geValueComponentDetails(items);

            const valueComponentWithAdj = geValueComponentWithAdjDetails(items);

            riskSummary.PersonnelFTESavings[key] = valueComponent.PersonnelFTESavings;
            riskSummary.PersonnelFTECost[key] = valueComponent.PersonnelFTECost;
            riskSummary.PersonnelFTEITCost[key] = valueComponent.PersonnelFTEITCost;
            riskSummary.PersonnelPESavings[key] = valueComponent.PersonnelPESavings;
            riskSummary.PersonnelPECost[key] = valueComponent.PersonnelPECost;
            riskSummary.PersonnelPEITCost[key] = valueComponent.PersonnelPEITCost;

            riskSummary.NPEOneTimeAmrtCost[key] = valueComponent.NPEOneTimeAmrtCost;
            riskSummary.NPEOneTimeAmrtSavings[key] = valueComponent.NPEOneTimeAmrtSavings;
            riskSummary.NPEOneTimeAmrtITCost[key] = valueComponent.NPEOneTimeAmrtITCost + valueComponentWithAdj.NPEOneTimeAmrtITCost;
            riskSummary.NPEOneTimeUnamrtSavings[key] = valueComponent.NPEOneTimeUnamrtSavings;
            riskSummary.NPEOneTimeUnamrtCost[key] = valueComponent.NPEOneTimeUnamrtCost;
            riskSummary.NPEOneTimeUnamrtITCost[key] = valueComponent.NPEOneTimeUnamrtITCost + valueComponentWithAdj.NPEOneTimeUnamrtITCost;
            riskSummary.NPERecurringSavings[key] = valueComponent.NPERecurringSavings;
            riskSummary.NPERecurringCost[key] = valueComponent.NPERecurringCost;
            riskSummary.NPERecurringITCost[key] = valueComponent.NPERecurringITCost;

            riskSummary.NPEWCSavings[key] = valueComponent.NPEWCAmrtSavings;
            riskSummary.NPEWCCost[key] = valueComponent.NPEWCAmrtCost;

            riskSummary.RevOneTimeAmrtSavings[key] = valueComponent.RevOneTimeAmrtSavings;
            riskSummary.RevOneTimeAmrtCost[key] = valueComponent.RevOneTimeAmrtCost;
            riskSummary.RevOneTimeUnamrtSavings[key] = valueComponent.RevOneTimeUnamrtSavings;
            riskSummary.RevOneTimeUnamrtCost[key] = valueComponent.RevOneTimeUnamrtCost;
            riskSummary.RevRecurringSavings[key] = valueComponent.RevRecurringSavings;
            riskSummary.RevRecurringCost[key] = valueComponent.RevRecurringCost;

            riskSummary.OneTimeAmrtOther[key] = _.sum([valueComponent.NPEOneTimeAmrtSavings, valueComponent.NPEOneTimeAmrtCost + valueComponentWithAdj.NPEOneTimeAmrtCost,
            valueComponent.RevOneTimeAmrtSavings, valueComponent.NPEWCAmrtSavings, valueComponent.NPEWCAmrtCost,
            valueComponent.RevOneTimeAmrtCost + valueComponentWithAdj.RevOneTimeAmrtCost, valueComponentWithAdj.NPEWCAmrtCost]) - riskSummary.NPEOneTimeAmrtITCost[key];

            riskSummary.OneTimeUnamrtOther[key] = _.sum([valueComponent.NPEOneTimeUnamrtSavings, valueComponent.NPEOneTimeUnamrtCost + valueComponentWithAdj.NPEOneTimeUnamrtCost,
            valueComponent.RevOneTimeUnamrtSavings, valueComponent.NPEWCUnamrtSavings, valueComponent.NPEWCUnamrtCost,
            valueComponent.RevOneTimeUnamrtCost + valueComponentWithAdj.RevOneTimeUnamrtCost, valueComponentWithAdj.NPEWCUnamrtCost]) - riskSummary.NPEOneTimeUnamrtITCost[key];

            riskSummary.NetFte[key] = valueComponent.PersonnelFTESavings + valueComponent.PersonnelFTECost + valueComponentWithAdj.PersonnelFTECost;
            riskSummary.FteMultiGroupAdjustment[key] = valueComponentWithAdj.PersonnelFTECost;
            riskSummary.RecurringNonPersonnelExpenses[key] = valueComponent.NPERecurringSavings + valueComponent.NPERecurringCost;
            riskSummary.RecurringPersonnelExpenses[key] = valueComponent.PersonnelPESavings + valueComponent.PersonnelPECost;

            riskSummary.OneTimeAdditions[key] = valueComponent.NPEOneTimeAmrtCost;
            riskSummary.OneTimeReductions[key] = valueComponent.NPEOneTimeAmrtSavings;

            riskSummary.RecurringMargin[key] = valueComponent.RevRecurringSavings + valueComponent.RevRecurringCost;
            riskSummary.OneTimeMargin[key] = valueComponent.RevOneTimeAmrtSavings + valueComponent.RevOneTimeAmrtCost;

            const oneTimeDetail = getRiskWiseOneTimeDetail(items);
            riskSummary.AmrtOneTimeDetail.ITCost[key] = oneTimeDetail.oneTimeDetail.ITCost;
            riskSummary.AmrtOneTimeDetail.NPECost[key] = oneTimeDetail.oneTimeDetail.NPECost;
            riskSummary.AmrtOneTimeDetail.NPESaving[key] = oneTimeDetail.oneTimeDetail.NPESaving;
            riskSummary.AmrtOneTimeDetail.NetWC[key] = oneTimeDetail.oneTimeDetail.NetWC;
            riskSummary.AmrtOneTimeDetail.MarginGain[key] = oneTimeDetail.oneTimeDetail.MarginGain;
            riskSummary.AmrtOneTimeDetail.MarginLoss[key] = oneTimeDetail.oneTimeDetail.MarginLoss;

            riskSummary.UnamortizedOneTimeDetail.ITCost[key] = oneTimeDetail.unamortizedOneTimeDetail.ITCost;
            riskSummary.UnamortizedOneTimeDetail.NPECost[key] = oneTimeDetail.unamortizedOneTimeDetail.NPECost;
            riskSummary.UnamortizedOneTimeDetail.NPESaving[key] = oneTimeDetail.unamortizedOneTimeDetail.NPESaving;
            riskSummary.UnamortizedOneTimeDetail.NetWC[key] = oneTimeDetail.unamortizedOneTimeDetail.NetWC;
            riskSummary.UnamortizedOneTimeDetail.MarginGain[key] = oneTimeDetail.unamortizedOneTimeDetail.MarginGain;
            riskSummary.UnamortizedOneTimeDetail.MarginLoss[key] = oneTimeDetail.unamortizedOneTimeDetail.MarginLoss;

        }).value();
    return riskSummary;
};

export const getRiskWiseOneTimeDetail = (items) => {
    var oneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var unamortizedOneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };

    oneTimeDetail.ITCost = _.sumBy(items, (item) => item.ValueComponents[8] ? item.ValueComponents[8] : 0);
    oneTimeDetail.NPECost = _.sumBy(items, (item) => item.ValueComponents[7] ? item.ValueComponents[7] - item.ValueComponents[8] : 0);
    oneTimeDetail.NPESaving = _.sumBy(items, (item) => item.ValueComponents[6] ? item.ValueComponents[6] : 0);
    oneTimeDetail.NetWC = _.sumBy(items, (item) => item.ValueComponents[15] ? item.ValueComponents[15] : 0) + _.sumBy(items, (item) => item.ValueComponents[16] ? item.ValueComponents[16] : 0);
    oneTimeDetail.MarginGain = _.sumBy(items, (item) => item.ValueComponents[17] ? item.ValueComponents[17] : 0);
    oneTimeDetail.MarginLoss = _.sumBy(items, (item) => item.ValueComponents[18] ? item.ValueComponents[18] : 0);

    unamortizedOneTimeDetail.ITCost = _.sumBy(items, (item) => item.ValueComponents[11] ? item.ValueComponents[11] : 0);
    unamortizedOneTimeDetail.NPECost = _.sumBy(items, (item) => item.ValueComponents[10] ? item.ValueComponents[10] - item.ValueComponents[11] : 0);
    unamortizedOneTimeDetail.NPESaving = _.sumBy(items, (item) => item.ValueComponents[9] ? item.ValueComponents[9] : 0);
    unamortizedOneTimeDetail.NetWC = _.sumBy(items, (item) => item.ValueComponents[23] ? item.ValueComponents[23] : 0) + _.sumBy(items, (item) => item.ValueComponents[24] ? item.ValueComponents[24] : 0)
    unamortizedOneTimeDetail.MarginGain = _.sumBy(items, (item) => item.ValueComponents[19] ? item.ValueComponents[19] : 0);
    unamortizedOneTimeDetail.MarginLoss = _.sumBy(items, (item) => item.ValueComponents[20] ? item.ValueComponents[20] : 0);

    return { oneTimeDetail: oneTimeDetail, unamortizedOneTimeDetail: unamortizedOneTimeDetail };
};

const getFocusAreaSummary = (ideaGroups, dictionaryGroupFocusAreas) => {
    const groupByFocusAreaAndRiskRating = _.groupByMulti(ideaGroups, ['FocusAreaId', 'GLRiskRatingType'], null);
    _.map(groupByFocusAreaAndRiskRating, (item, keyFA) => {
        //Total Value by FocusArea
        if (dictionaryGroupFocusAreas[keyFA]) {
            dictionaryGroupFocusAreas[keyFA].RiskCount[4] = _.flatMapDepth(item).length;
            dictionaryGroupFocusAreas[keyFA].RiskValue[4] = _.sumBy(_.flatMapDepth(item), 'Value');
        }
        _.map(item, (risks, keyRisk) => {
            if (dictionaryGroupFocusAreas[keyFA]) {
                dictionaryGroupFocusAreas[keyFA].RiskCount[keyRisk] = risks.length;
                dictionaryGroupFocusAreas[keyFA].RiskValue[keyRisk] = _.sumBy(risks, 'Value');
            }
        })
    }
    );

    return getArrayFromObject(dictionaryGroupFocusAreas)
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

export const dashboardPhase2 = (years, activeIdeaGroups, masterData, baselineData, groupId, calculateCompanyDetails) => {
    const summary = {
        riskSummary: [], roughRiskSummary: [], detailedRiskSummary: [], ideaGroupValueSummary: [],
        detailedIdeaGroupValueSummary: [], focusAreaSummary: [],
        baselineImpactSummary: { FT: [], CompRange: [], Category: [] }
    };
    if (calculateCompanyDetails) {
        summary.riskSummary = getRiskSummary(activeIdeaGroups, 'Value', years);
    } else {
        summary.riskSummary = getRiskSummary(activeIdeaGroups, 'Value', years);
        const detailedIdeaGroups = _.filter(activeIdeaGroups, (ideaGroup) => { return ideaGroup.ValueStatus > 1 });
        summary.detailedRiskSummary = getRiskSummary(_.filter(activeIdeaGroups, (ideaGroup) => { return ideaGroup.ValueStatus > 1 }), 'Value', years);
        summary.roughRiskSummary = getRiskSummary(_.filter(activeIdeaGroups, (ideaGroup) => { return ideaGroup.ValueStatus < 2 }), 'Value', years);
        summary.ideaGroupValueSummary = _.cloneDeep(getIdeaGroupValueSummary(activeIdeaGroups));
        summary.detailedIdeaGroupValueSummary = _.cloneDeep(getIdeaGroupValueSummary(detailedIdeaGroups));
        if (masterData) {
            const masterGroupFocusArea = _.cloneDeep(masterData.focusAreas);
            const groupFocusAreaDictionary = getGroupFocusAreaDictionary(masterGroupFocusArea, groupId);
            summary.focusAreaSummary = getFocusAreaSummary(activeIdeaGroups, groupFocusAreaDictionary);
        }
        if (baselineData && _.size(baselineData) > 0 && baselineData[groupId]) {
            summary.baselineImpactSummary.FT = baselineData[groupId].BaselineFT;
            summary.baselineImpactSummary.CompRange = baselineData[groupId].BaselineCompRange;
            summary.baselineImpactSummary.Category = baselineData[groupId].BaselineCategory;
        }
    }
    return summary;
};
