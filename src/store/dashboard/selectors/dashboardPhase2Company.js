import _ from 'lodash';
import { getIdeaGroupsByValueType } from './dashboardCommon';
import { getYearsCountArray } from '../../../common/constants';

const getCFandPLYearlyValues = (years, items, groupedIdeaGroups) => {
    let pLValues = getYearsCountArray(years);
    let cFValues = getYearsCountArray(years);

    for (let index = 0; index < years.length; index++) {
        pLValues[index] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.PLYearlyValues ? obj.PLYearlyValues[index] : 0));
        cFValues[index] =_.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.CFYearlyValues ? obj.CFYearlyValues[index] : 0));
    }
    // pLValues[0] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.PLYearlyValues ? obj.PLYearlyValues[0] : 0));
    // pLValues[1] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.PLYearlyValues ? obj.PLYearlyValues[1] : 0));
    // pLValues[2] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.PLYearlyValues ? obj.PLYearlyValues[2] : 0));
    // pLValues[3] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.PLYearlyValues ? obj.PLYearlyValues[3] : 0));
    // pLValues[4] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.PLYearlyValues ? obj.PLYearlyValues[4] : 0));

    // cFValues[0] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.CFYearlyValues ? obj.CFYearlyValues[0] : 0));
    // cFValues[1] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.CFYearlyValues ? obj.CFYearlyValues[1] : 0));
    // cFValues[2] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.CFYearlyValues ? obj.CFYearlyValues[2] : 0));
    // cFValues[3] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.CFYearlyValues ? obj.CFYearlyValues[3] : 0));
    // cFValues[4] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.CFYearlyValues ? obj.CFYearlyValues[4] : 0));

    return { PL: pLValues, CF: cFValues };
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
    valueComponent.PersonnelFTESavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[0] ? item.IdeaValueComponents[0] : 0);
    valueComponent.PersonnelFTECost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[1] ? item.IdeaValueComponents[1] : 0);
    valueComponent.PersonnelFTEITCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[2] ? item.IdeaValueComponents[2] : 0);

    valueComponent.PersonnelPESavings = _.sumBy(items, (item) => item.IdeaValueComponents[3] ? item.IdeaValueComponents[3] : 0);
    valueComponent.PersonnelPECost = _.sumBy(items, (item) => item.IdeaValueComponents[4] ? item.IdeaValueComponents[4] : 0);
    valueComponent.PersonnelPEITCost = _.sumBy(items, (item) => item.IdeaValueComponents[5] ? item.IdeaValueComponents[5] : 0);

    valueComponent.NPEOneTimeAmrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[6] ? item.IdeaValueComponents[6] : 0);
    valueComponent.NPEOneTimeAmrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[7] ? item.IdeaValueComponents[7] : 0);
    valueComponent.NPEOneTimeAmrtITCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[8] ? item.IdeaValueComponents[8] : 0);

    valueComponent.NPEOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[9] ? item.IdeaValueComponents[9] : 0);
    valueComponent.NPEOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[10] ? item.IdeaValueComponents[10] : 0);
    valueComponent.NPEOneTimeUnamrtITCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[11] ? item.IdeaValueComponents[11] : 0);

    valueComponent.NPERecurringSavings = _.sumBy(items, (item) => item.IdeaValueComponents[12] ? item.IdeaValueComponents[12] : 0);
    valueComponent.NPERecurringCost = _.sumBy(items, (item) => item.IdeaValueComponents[13] ? item.IdeaValueComponents[13] : 0);
    valueComponent.NPERecurringITCost = _.sumBy(items, (item) => item.IdeaValueComponents[14] ? item.IdeaValueComponents[14] : 0);

    valueComponent.NPEWCUnamrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[23] ? item.IdeaValueComponents[23] : 0);
    valueComponent.NPEWCUnamrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[24] ? item.IdeaValueComponents[24] : 0);

    valueComponent.NPEWCAmrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[15] ? item.IdeaValueComponents[15] : 0);
    valueComponent.NPEWCAmrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[16] ? item.IdeaValueComponents[16] : 0);

    valueComponent.RevOneTimeAmrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[17] ? item.IdeaValueComponents[17] : 0);
    valueComponent.RevOneTimeAmrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[18] ? item.IdeaValueComponents[18] : 0);

    valueComponent.RevOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[19] ? item.IdeaValueComponents[19] : 0);
    valueComponent.RevOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[20] ? item.IdeaValueComponents[20] : 0);

    valueComponent.RevRecurringSavings = _.sumBy(items, (item) => item.IdeaValueComponents[21] ? item.IdeaValueComponents[21] : 0);
    valueComponent.RevRecurringCost = _.sumBy(items, (item) => item.IdeaValueComponents[22] ? item.IdeaValueComponents[22] : 0);

    valueComponent.IdeaNPEOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[9] ? item.IdeaValueComponents[9] : 0);
    valueComponent.IdeaNPEOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[10] ? item.IdeaValueComponents[10] : 0);
    valueComponent.IdeaNPEOneTimeUnamrtITCost = _.sumBy(detailedItems, (item) => item.IdeaValueComponents[11] ? item.IdeaValueComponents[11] : 0);

    valueComponent.IdeaNPERecurringSavings = _.sumBy(items, (item) => item.IdeaValueComponents[12] ? item.IdeaValueComponents[12] : 0);
    valueComponent.IdeaNPERecurringCost = _.sumBy(items, (item) => item.IdeaValueComponents[13] ? item.IdeaValueComponents[13] : 0);
    valueComponent.IdeaNPERecurringITCost = _.sumBy(items, (item) => item.IdeaValueComponents[14] ? item.IdeaValueComponents[14] : 0);

    return valueComponent;
};

const geValueComponentWithAdjDetails = (items, groupedIdeaGroups) => {
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
    valueComponent.PersonnelFTECost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[1] ? obj.AdjValueComponents[1] : 0));
    valueComponent.NPEOneTimeAmrtCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[7] ? obj.AdjValueComponents[7] : 0));
    valueComponent.NPEOneTimeAmrtITCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[8] ? obj.AdjValueComponents[8] : 0));

    valueComponent.NPEOneTimeUnamrtCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[10] ? obj.AdjValueComponents[10] : 0));
    valueComponent.NPEOneTimeUnamrtITCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[11] ? obj.AdjValueComponents[11] : 0));

    valueComponent.NPEWCAmrtCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[16] ? obj.AdjValueComponents[16] : 0));

    valueComponent.NPEWCUnamrtCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[24] ? obj.AdjValueComponents[24] : 0));

    valueComponent.RevOneTimeAmrtCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[18] ? obj.AdjValueComponents[18] : 0));

    valueComponent.RevOneTimeUnamrtCost = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], (obj) => obj.AdjValueComponents[20] ? obj.AdjValueComponents[20] : 0));
    return valueComponent;

};

export const getRiskWiseOneTimeDetail = (items) => {
    var oneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var unamortizedOneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };

    oneTimeDetail.ITCost = _.sumBy(items, (item) => item.IdeaValueComponents[8] ? item.IdeaValueComponents[8] : 0);
    oneTimeDetail.NPECost = _.sumBy(items, (item) => item.IdeaValueComponents[7] ? item.IdeaValueComponents[7] - item.IdeaValueComponents[8] : 0);
    oneTimeDetail.NPESaving = _.sumBy(items, (item) => item.IdeaValueComponents[6] ? item.IdeaValueComponents[6] : 0);
    oneTimeDetail.NetWC = _.sumBy(items, (item) => item.IdeaValueComponents[15] ? item.IdeaValueComponents[15] : 0) + _.sumBy(items, (item) => item.IdeaValueComponents[16] ? item.IdeaValueComponents[16] : 0);
    oneTimeDetail.MarginGain = _.sumBy(items, (item) => item.IdeaValueComponents[17] ? item.IdeaValueComponents[17] : 0);
    oneTimeDetail.MarginLoss = _.sumBy(items, (item) => item.IdeaValueComponents[18] ? item.IdeaValueComponents[18] : 0);

    unamortizedOneTimeDetail.ITCost = _.sumBy(items, (item) => item.IdeaValueComponents[11] ? item.IdeaValueComponents[11] : 0);
    unamortizedOneTimeDetail.NPECost = _.sumBy(items, (item) => item.IdeaValueComponents[10] ? item.IdeaValueComponents[10] - item.IdeaValueComponents[11] : 0);
    unamortizedOneTimeDetail.NPESaving = _.sumBy(items, (item) => item.IdeaValueComponents[9] ? item.IdeaValueComponents[9] : 0);
    unamortizedOneTimeDetail.NetWC = _.sumBy(items, (item) => item.IdeaValueComponents[23] ? item.IdeaValueComponents[23] : 0) + _.sumBy(items, (item) => item.IdeaValueComponents[24] ? item.IdeaValueComponents[24] : 0)
    unamortizedOneTimeDetail.MarginGain = _.sumBy(items, (item) => item.IdeaValueComponents[19] ? item.IdeaValueComponents[19] : 0);
    unamortizedOneTimeDetail.MarginLoss = _.sumBy(items, (item) => item.IdeaValueComponents[20] ? item.IdeaValueComponents[20] : 0);

    return { oneTimeDetail: oneTimeDetail, unamortizedOneTimeDetail: unamortizedOneTimeDetail };
};

export const getRiskSummaryCompany = (ideaGroups, sumByColumn, selectedPhase, valueType, recommType, decisionType, years) => {
    const groupedIdeaGroups = _.groupBy(ideaGroups, 'IdeaId');
    const primaryIdeaGroups = _.filter(ideaGroups, { 'IsPrimary': true });

    const ideaGroupsByValueType = getIdeaGroupsByValueType(primaryIdeaGroups, selectedPhase, valueType, recommType, decisionType);

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
    _(ideaGroupsByValueType).groupBy('GLRiskRatingType')
        .map((items, key) => {
            //key = RiskRatingType
            if (sumByColumn === 'Value') {
                riskSummary.ideas[key] = _.map(items, 'IdeaId');
            }
            riskSummary.RiskCount[key] = items.length;
            riskSummary.RiskValue[key] = _.sumBy(items, (item) => _.sumBy(groupedIdeaGroups[item.IdeaId], sumByColumn));

            //P&L, Cash Flow Yearly Values
            const cfandPLYearlyValues = getCFandPLYearlyValues(years, items, groupedIdeaGroups)
            riskSummary.PL[key] = cfandPLYearlyValues.PL;
            riskSummary.CF[key] = cfandPLYearlyValues.CF;
            //Value Component Details
            const valueComponent = geValueComponentDetails(items);

            const valueComponentWithAdj = geValueComponentWithAdjDetails(items, groupedIdeaGroups);

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


export const dashboardPhase2Company = (years, activeIdeaGroups, selectedPhase, valueType, recommType, decisionType) => {
    const summary = {
        riskSummary: [], roughRiskSummary: [], detailedRiskSummary: [], ideaGroupValueSummary: [],
        detailedIdeaGroupValueSummary: [], focusAreaSummary: [],
        baselineImpactSummary: { FT: [], CompRange: [], Category: [] }
    };
    summary.riskSummary = getRiskSummaryCompany(activeIdeaGroups, 'Value', selectedPhase, valueType, recommType, decisionType, years);
    return summary;
};
