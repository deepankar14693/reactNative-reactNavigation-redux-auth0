import _ from 'lodash';
import getArrayFromObject from 'object.values';
import { prepareObjectFromArray } from '../../../common/utils';

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

const getCFandPLYearlyValues = (items) => {
    let pLValues = [0, 0, 0, 0, 0];
    let cFValues = [0, 0, 0, 0, 0];

    pLValues[0] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[0] : 0);
    pLValues[1] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[1] : 0);
    pLValues[2] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[2] : 0);
    pLValues[3] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[3] : 0);
    pLValues[4] = _.sumBy(items, (item) => item.PLYearlyValues ? item.PLYearlyValues[4] : 0);

    cFValues[0] = _.sumBy(items, (item) => item.CFYearlyValues ? item.PLYearlyValues[0] : 0);
    cFValues[1] = _.sumBy(items, (item) => item.CFYearlyValues ? item.PLYearlyValues[1] : 0);
    cFValues[2] = _.sumBy(items, (item) => item.CFYearlyValues ? item.PLYearlyValues[2] : 0);
    cFValues[3] = _.sumBy(items, (item) => item.CFYearlyValues ? item.PLYearlyValues[3] : 0);
    cFValues[4] = _.sumBy(items, (item) => item.CFYearlyValues ? item.PLYearlyValues[4] : 0);

    return { PL: pLValues, CF: cFValues };
};

const getIdeaGroupValueSummary = (ideaGroups) => {
    var multiGroupAdjValue = { RiskValue: [0, 0, 0, 0] };
    var groupValue = { RiskValue: [0, 0, 0, 0] };
    var adjGroupValue = { RiskValue: [0, 0, 0, 0] };
    var groupedRiskRating = _(ideaGroups).groupBy('GLRecommendationType')
        .map((items, key) => {
            key = key == "null" ? 0 : key;
            adjGroupValue.RiskValue[key] = _.sumBy(items, 'Value');// getMultiGroupAdjValue(items);
            groupValue.RiskValue[key] = _.sumBy(items, 'TotalBenefit') + (_.sumBy(items, 'TotalCost') * -1);
            multiGroupAdjValue.RiskValue[key] = adjGroupValue.RiskValue[key] - groupValue.RiskValue[key];

        }).value();

    var priorGoDecisionIdeaGroups = _.filter(ideaGroups, (item) => { return item.SCDecisionType === 1 });
    adjGroupValue.RiskValue[3] = _.sumBy(priorGoDecisionIdeaGroups, 'Value');// getMultiGroupAdjValue(items);
    groupValue.RiskValue[3] = _.sumBy(priorGoDecisionIdeaGroups, 'TotalBenefit') + (_.sumBy(priorGoDecisionIdeaGroups, 'TotalCost') * -1);
    multiGroupAdjValue.RiskValue[3] = adjGroupValue.RiskValue[3] - groupValue.RiskValue[3];
    return { multiGroupAdjValue: multiGroupAdjValue, adjGroupValue: adjGroupValue, groupValue: groupValue };
};

const geValueComponentDetails = (items) => {
    let valueComponent = {
        PersonnelFTESavings: 0, PersonnelFTECost: 0, PersonnelFTEITCost: 0,
        PersonnelPESavings: 0, PersonnelPECost: 0, PersonnelPEITCost: 0,
        NPEOneTimeAmrtCost: 0, NPEOneTimeAmrtSavings: 0, NPEOneTimeAmrtITCost: 0,
        NPEOneTimeUnamrtSavings: 0, NPEOneTimeUnamrtCost: 0, NPEOneTimeUnamrtITCost: 0,
        NPERecurringSavings: 0, NPERecurringCost: 0, NPERecurringITCost: 0,
        NPEWCAmrtSavings: 0,NPEWCAmrtCost: 0, NPEWCUnamrtSavings: 0, NPEWCUnamrtCost: 0,
        RevOneTimeAmrtSavings: 0, RevOneTimeAmrtCost: 0,
        RevOneTimeUnamrtSavings: 0, RevOneTimeUnamrtCost: 0,
        RevRecurringSavings: 0, RevRecurringCost: 0
    };
    let detailedItems=_.filter(items, (item)=>{return item.ValueStatus>1 || item.ITValueStatus>1})
    valueComponent.PersonnelFTESavings = _.sumBy(detailedItems, (item) => item.ValueComponents[0] ? item.ValueComponents[0] : 0);
    valueComponent.PersonnelFTECost = _.sumBy(detailedItems, (item) => item.ValueComponents[1] ? item.ValueComponents[1] : 0);
    valueComponent.PersonnelFTEITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[2] ? item.ValueComponents[2] : 0);
    
    valueComponent.PersonnelPESavings = _.sumBy(items, (item) => item.ValueComponents[3] ? item.ValueComponents[3] : 0);
    valueComponent.PersonnelPECost = _.sumBy(items, (item) => item.ValueComponents[4] ? item.ValueComponents[4] : 0);
    valueComponent.PersonnelPEITCost = _.sumBy(items, (item) => item.ValueComponents[5] ? item.ValueComponents[5] : 0);

    valueComponent.PersonnelPECost = _.sumBy(items, (item) => item.ValueComponents[4] ? item.ValueComponents[4] : 0);
    valueComponent.PersonnelPEITCost = _.sumBy(items, (item) => item.ValueComponents[5] ? item.ValueComponents[5] : 0);

    valueComponent.NPEOneTimeAmrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[6] ? item.ValueComponents[6] : 0);
    valueComponent.NPEOneTimeAmrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[7] ? item.ValueComponents[7] : 0);
    valueComponent.NPEOneTimeAmrtITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[8] ? item.ValueComponents[8] : 0);

    valueComponent.NPEOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[9] ? item.ValueComponents[9] : 0);
    valueComponent.NPEOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[10] ? item.ValueComponents[10] : 0);
    valueComponent.NPEOneTimeUnamrtITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[11] ? item.ValueComponents[11] : 0);

    valueComponent.NPERecurringSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[12] ? item.ValueComponents[12] : 0);
    valueComponent.NPERecurringCost = _.sumBy(detailedItems, (item) => item.ValueComponents[13] ? item.ValueComponents[13] : 0);
    valueComponent.NPERecurringITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[14] ? item.ValueComponents[14] : 0);

    valueComponent.NPEWCUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[23] ? item.ValueComponents[23] : 0);
    valueComponent.NPEWCUnamrtCost= _.sumBy(detailedItems, (item) => item.ValueComponents[24] ? item.ValueComponents[24] : 0);

    valueComponent.NPEWCAmrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[15] ? item.ValueComponents[15] : 0);
    valueComponent.NPEWCAmrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[16] ? item.ValueComponents[16] : 0);

    valueComponent.RevOneTimeAmrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[17] ? item.ValueComponents[17] : 0);
    valueComponent.RevOneTimeAmrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[18] ? item.ValueComponents[18] : 0);

    valueComponent.RevOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[19] ? item.ValueComponents[19] : 0);
    valueComponent.RevOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[20] ? item.ValueComponents[20] : 0);

    valueComponent.RevRecurringSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[21] ? item.ValueComponents[21] : 0);
    valueComponent.RevRecurringCost = _.sumBy(detailedItems, (item) => item.ValueComponents[22] ? item.ValueComponents[22] : 0);

    valueComponent.IdeaNPEOneTimeUnamrtSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[9] ? item.ValueComponents[9] : 0);
    valueComponent.IdeaNPEOneTimeUnamrtCost = _.sumBy(detailedItems, (item) => item.ValueComponents[10] ? item.ValueComponents[10] : 0);
    valueComponent.IdeaNPEOneTimeUnamrtITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[11] ? item.ValueComponents[11] : 0);

    valueComponent.IdeaNPERecurringSavings = _.sumBy(detailedItems, (item) => item.ValueComponents[12] ? item.ValueComponents[12] : 0);
    valueComponent.IdeaNPERecurringCost = _.sumBy(detailedItems, (item) => item.ValueComponents[13] ? item.ValueComponents[13] : 0);
    valueComponent.IdeaNPERecurringITCost = _.sumBy(detailedItems, (item) => item.ValueComponents[14] ? item.ValueComponents[14] : 0);

    return valueComponent;
};

const geValueComponentWithAdjDetails = (items) => {
    let valueComponent = {
        PersonnelFTECost:0,
        NPEOneTimeAmrtCost: 0,  NPEOneTimeAmrtITCost: 0,
        OneTimeAdjAmrtOther:0, OneTimeAdjAmrtIT:0,
        NPEOneTimeUnamrtCost: 0, NPEOneTimeUnamrtITCost: 0,
        NPERecurringSavings: 0, NPERecurringCost: 0, NPERecurringITCost: 0,
        NPEWCAmrtCost: 0,  NPEWCUnamrtCost:0,
        RevOneTimeAmrtSavings: 0, RevOneTimeAmrtCost: 0,
        RevOneTimeUnamrtSavings: 0, RevOneTimeUnamrtCost: 0,
        RevRecurringSavings: 0, RevRecurringCost: 0
    };
    items=_.filter(items, (item)=>{return item.ValueStatus>1})
    valueComponent.PersonnelFTECost =_.sumBy(items, (item) =>  item.AdjValueComponents[1] ?  item.AdjValueComponents[1]: 0);
    //valueComponent.PersonnelFTECost =_.sumBy(items, (item) =>  item.IdeaValueComponents[1] ? (item.BenefitPct===1) ?(item.ValueComponents[1]===0?item.ValueComponents[1]:item.IdeaValueComponents[1]) :(item.IdeaValueComponents[1] * item.BenefitPct): 0);
    valueComponent.NPEOneTimeAmrtCost = _.sumBy(items, (item) =>  item.AdjValueComponents[7]? item.AdjValueComponents[7]  : 0);
    valueComponent.NPEOneTimeAmrtITCost = _.sumBy(items, (item) =>  item.AdjValueComponents[8] ?item.AdjValueComponents[8]: 0);;

    valueComponent.NPEOneTimeUnamrtCost = _.sumBy(items, (item) =>  item.AdjValueComponents[10] ?item.AdjValueComponents[10]:0 );
    valueComponent.NPEOneTimeUnamrtITCost = _.sumBy(items, (item) =>  item.AdjValueComponents[11] ?item.AdjValueComponents[11] : 0);
   
    valueComponent.NPEWCAmrtCost = _.sumBy(items, (item) =>  item.AdjValueComponents[16] ?item.AdjValueComponents[16] : 0);

    valueComponent.NPEWCUnamrtCost = _.sumBy(items, (item) =>  item.AdjValueComponents[24] ?item.AdjValueComponents[24] : 0);

    valueComponent.RevOneTimeAmrtCost =_.sumBy(items, (item) =>  item.AdjValueComponents[18] ?item.AdjValueComponents[18] : 0);

    valueComponent.RevOneTimeUnamrtCost = _.sumBy(items, (item) =>  item.AdjValueComponents[20] ?item.AdjValueComponents[20] : 0);
    return valueComponent;
    
};

const setRiskSummary = (items, sumByColumn, riskSummary, key) => {

    if (sumByColumn === 'Value') {
        riskSummary.ideas[key] = _.map(items, 'IdeaId');
    }
    
    riskSummary.RiskCount[key] = items.length;
    
    if(sumByColumn==='DetailedValue'){
        riskSummary.RiskValue[key] =  _.sumBy(items , (item) => { return item.ValueStatus>1?item.Value:item.RoughValue });
    }
    else{
        riskSummary.RiskValue[key] = _.sumBy(items, sumByColumn);
    }
  

    //P&L, Cash Flow Yearly Values
    const cfandPLYearlyValues = getCFandPLYearlyValues(items)
    riskSummary.PL[key] = cfandPLYearlyValues.PL;
    riskSummary.CF[key] = cfandPLYearlyValues.CF;
    //Value Component Details
    const valueComponent = geValueComponentDetails(items);
    //AdjValue Component Details
    const valueComponentWithAdj=geValueComponentWithAdjDetails(items);

    riskSummary.PersonnelFTESavings[key] = valueComponent.PersonnelFTESavings;
    riskSummary.PersonnelFTECost[key] = valueComponent.PersonnelFTECost;
    riskSummary.PersonnelFTEITCost[key] = valueComponent.PersonnelFTEITCost;
    riskSummary.PersonnelPESavings[key] = valueComponent.PersonnelPESavings;
    riskSummary.PersonnelPECost[key] = valueComponent.PersonnelPECost;
    riskSummary.PersonnelPEITCost[key] = valueComponent.PersonnelPEITCost;

    riskSummary.NPEOneTimeAmrtCost[key] = valueComponent.NPEOneTimeAmrtCost;
    riskSummary.NPEOneTimeAmrtSavings[key] = valueComponent.NPEOneTimeAmrtSavings;
    riskSummary.NPEOneTimeAmrtITCost[key] = valueComponent.NPEOneTimeAmrtITCost+ valueComponentWithAdj.NPEOneTimeAmrtITCost;
    riskSummary.NPEOneTimeUnamrtSavings[key] = valueComponent.NPEOneTimeUnamrtSavings;
    riskSummary.NPEOneTimeUnamrtCost[key] = valueComponent.NPEOneTimeUnamrtCost;
    riskSummary.NPEOneTimeUnamrtITCost[key] = valueComponent.NPEOneTimeUnamrtITCost+ valueComponentWithAdj.NPEOneTimeUnamrtITCost;
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
    riskSummary.OneTimeAmrtOther[key] =_.sum([valueComponent.NPEOneTimeAmrtSavings, valueComponent.NPEOneTimeAmrtCost+ valueComponentWithAdj.NPEOneTimeAmrtCost, 
        valueComponent.RevOneTimeAmrtSavings, valueComponent.NPEWCAmrtSavings , valueComponent.NPEWCAmrtCost ,
        valueComponent.RevOneTimeAmrtCost+ valueComponentWithAdj.RevOneTimeAmrtCost, valueComponentWithAdj.NPEWCAmrtCost])-riskSummary.NPEOneTimeAmrtITCost[key];
    riskSummary.OneTimeUnamrtOther[key] =_.sum([valueComponent.NPEOneTimeUnamrtSavings, valueComponent.NPEOneTimeUnamrtCost+ valueComponentWithAdj.NPEOneTimeUnamrtCost, 
        valueComponent.RevOneTimeUnamrtSavings, valueComponent.NPEWCUnamrtSavings , valueComponent.NPEWCUnamrtCost ,
        valueComponent.RevOneTimeUnamrtCost+ valueComponentWithAdj.RevOneTimeUnamrtCost, valueComponentWithAdj.NPEWCUnamrtCost])-riskSummary.NPEOneTimeUnamrtITCost[key];
    riskSummary.NetFte[key] = valueComponent.PersonnelFTESavings+valueComponent.PersonnelFTECost+valueComponentWithAdj.PersonnelFTECost;
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
    return riskSummary;

}
const getRiskSummary = (ideaGroups, sumByColumn) => {
    let riskSummary = {
        RiskCount: [0, 0, 0, 0], RiskValue: [0, 0, 0, 0], ideas: [[], [], [], []],
        PL: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        CF: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],

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
    _(ideaGroups).groupBy('GLRecommendationType')
        .map((items, key) => {
            key = key == "null" ? 0 : key;
            setRiskSummary(items, sumByColumn, riskSummary, key);
        }).value();
    var priorGoDecisionIdeaGroups = _.filter(ideaGroups, (item) => { return item.SCDecisionType === 1 })
    riskSummary = setRiskSummary(priorGoDecisionIdeaGroups, sumByColumn, riskSummary, 3);
    return riskSummary;
};
export const getRiskWiseOneTimeDetail = (items) => {
    var oneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var unamortizedOneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };

    oneTimeDetail.ITCost = _.sumBy(items, (item) => item.ValueComponents[8] ? item.ValueComponents[8] : 0);
    oneTimeDetail.NPECost = _.sumBy(items, (item) => item.ValueComponents[7] ? item.ValueComponents[7] - item.ValueComponents[8] : 0);
    oneTimeDetail.NPESaving = _.sumBy(items, (item) => item.ValueComponents[6] ? item.ValueComponents[6] : 0);
    oneTimeDetail.NetWC = 0;
    oneTimeDetail.MarginGain = _.sumBy(items, (item) => item.ValueComponents[17] ? item.ValueComponents[17] : 0);
    oneTimeDetail.MarginLoss = _.sumBy(items, (item) => item.ValueComponents[18] ? item.ValueComponents[18] : 0);

    unamortizedOneTimeDetail.ITCost = _.sumBy(items, (item) => item.ValueComponents[11] ? item.ValueComponents[11] : 0);
    unamortizedOneTimeDetail.NPECost = _.sumBy(items, (item) => item.ValueComponents[10] ? item.ValueComponents[10] - item.ValueComponents[11] : 0);
    unamortizedOneTimeDetail.NPESaving = _.sumBy(items, (item) => item.ValueComponents[9] ? item.ValueComponents[9] : 0);
    unamortizedOneTimeDetail.NetWC = 0
    unamortizedOneTimeDetail.MarginGain = _.sumBy(items, (item) => item.ValueComponents[19] ? item.ValueComponents[19] : 0);
    unamortizedOneTimeDetail.MarginLoss = _.sumBy(items, (item) => item.ValueComponents[20] ? item.ValueComponents[20] : 0);

    return { oneTimeDetail: oneTimeDetail, unamortizedOneTimeDetail: unamortizedOneTimeDetail };
};

const getFocusAreaSummaryForPriorGoDecision = (ideaGroups, dictionaryGroupFocusAreas) => {
    var groupByFocusAreaAndRiskRating = _.groupByMulti(ideaGroups, ['FocusAreaId'], null);
    var mapFocusAreaSummary = _.map(groupByFocusAreaAndRiskRating, (item, keyFA) => {
        if (dictionaryGroupFocusAreas[keyFA]) {
            dictionaryGroupFocusAreas[keyFA].RiskCount[3] = _.filter(_.flatMapDepth(item), function (i) { return (i.SCDecisionType === 1) }).length;
            dictionaryGroupFocusAreas[keyFA].RiskValue[3] = _.sumBy(_.filter(_.flatMapDepth(item), function (i) { return i.SCDecisionType === 1 }), 'Value');
        }
    }
    );
    return dictionaryGroupFocusAreas;
}
const getFocusAreaSummary = (ideaGroups, dictionaryGroupFocusAreas) => {
    const groupByFocusAreaAndRiskRating = _.groupByMulti(ideaGroups, ['FocusAreaId', 'GLRecommendationType'], null);
    _.map(groupByFocusAreaAndRiskRating, (item, keyFA) => {
        //Total Value by FocusArea
        if (dictionaryGroupFocusAreas[keyFA]) {
            dictionaryGroupFocusAreas[keyFA].RiskCount[4] = _.flatMapDepth(item).length;
            dictionaryGroupFocusAreas[keyFA].RiskValue[4] = _.sumBy(_.flatMapDepth(item), 'Value');
        }
        _.map(item, (risks, keyRisk) => {
            keyRisk = keyRisk == "null" ? 0 : keyRisk;
            if (dictionaryGroupFocusAreas[keyFA]) {
                dictionaryGroupFocusAreas[keyFA].RiskCount[keyRisk] = risks.length;
                dictionaryGroupFocusAreas[keyFA].RiskValue[keyRisk] = _.sumBy(risks, 'Value');
            }
        });
    });
    dictionaryGroupFocusAreas = getFocusAreaSummaryForPriorGoDecision(ideaGroups, dictionaryGroupFocusAreas);

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

export const dashboardPhase3 = (years, activeIdeaGroups, masterData, baselineData, groupId) => {
    const summary = {
        riskSummary: [], roughRiskSummary: [], detailedRiskSummary: [], ideaGroupValueSummary: [],
        detailedIdeaGroupValueSummary: [], focusAreaSummary: [],
        baselineImpactSummary: { FT: [], CompRange: [], Category: [] }
    }
    summary.riskSummary = getRiskSummary(activeIdeaGroups, 'DetailedValue',years);
    const detailedIdeaGroups = _.filter(activeIdeaGroups, (ideaGroup) => { return ideaGroup.ValueStatus > 1 });
    summary.detailedRiskSummary = getRiskSummary(detailedIdeaGroups, 'Value',years);
    summary.roughRiskSummary = getRiskSummary(_.filter(activeIdeaGroups, (ideaGroup) => { return ideaGroup.ValueStatus < 2 }), 'RoughValue', years);
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
    return summary;
};


// import _ from 'lodash';
// import { getCFandPLYearlyValues, getValueSummary, getRiskWiseValueSummary, getRecommendationWiseValueSummary } from '../../lineItemMonthlyValues/selectors/lineItemMonthlyValue';
// import { filterByValues, getValue, prepareObjectFromArray } from '../../../common/utils';
// import getArrayFromObject from 'object.values';

// _.groupByMulti = function (obj, values, context) {
//     if (!values.length)
//         return obj;
//     var byFirst = _.groupBy(obj, values[0], context),
//         rest = values.slice(1);
//     for (var prop in byFirst) {
//         byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
//     }
//     return byFirst;
// };


// const getRiskSummary = (ideaGroups, sumByColumn) => {
//     var riskSummary = { RiskCount: [0, 0, 0, 0], RiskValue: [0, 0, 0, 0], ideas: [[], [], [], []] };
//     var groupedRiskRating = _(ideaGroups).groupBy('RecommendationType')
//         .map((items, key) => {
//             //key = RecommendationType
//             if (sumByColumn === 'Value') {
//                 riskSummary.ideas[key] = _.map(items, 'IdeaId');
//             }
//             riskSummary.RiskCount[key] = items.length;
//             riskSummary.RiskValue[key] = _.sumBy(items, sumByColumn);
//         }).value();
//     riskSummary.RiskCount[3] = _.filter(ideaGroups, (item) => { return item.DecisionType !== null && item.DecisionType !== 0 }).length
//     riskSummary.RiskValue[3] = _.sumBy(_.filter(ideaGroups, (item) => { return item.DecisionType !== null && item.DecisionType !== 0 }), sumByColumn);
//     riskSummary.ideas[3] = _.map(_.filter(ideaGroups, (item) => { return item.DecisionType !== null && item.DecisionType !== 0 }), 'IdeaId')
//     return riskSummary;
// };

// const getMultiGroupAdjValue = (items) => {
//     var ideaTotalBenefit = _.sumBy(items, 'IdeaTotalBenefit');
//     var ideaTotalCost = _.sumBy(items, 'IdeaTotalCost');
//     var totalBenefit = _.sumBy(items, 'TotalBenefit');
//     var totalCost = _.sumBy(items, 'TotalCost');
//     var value = 0;
//     var percentageOfBenefit = 0;
//     if (ideaTotalBenefit > 0) {
//         percentageOfBenefit = _.divide(totalBenefit, ideaTotalBenefit);
//     }
//     value = totalCost - (percentageOfBenefit * ideaTotalCost)

//     return value;
// };
// const getFocusAreaSummaryForPriorGoDecision = (ideaGroups, dictionaryGroupFocusAreas) => {
//     var groupByFocusAreaAndRiskRating = _.groupByMulti(ideaGroups, ['FocusAreaId', 'DecisionType'], null);
//     var mapFocusAreaSummary = _.map(groupByFocusAreaAndRiskRating, (item, keyFA) => {
//         if (dictionaryGroupFocusAreas[keyFA]) {
//             dictionaryGroupFocusAreas[keyFA].RiskCount[3] = _.filter(_.flatMapDepth(item), function (i) { return (i.DecisionType ===1) }).length;
//             dictionaryGroupFocusAreas[keyFA].RiskValue[3] = _.sumBy(_.filter(_.flatMapDepth(item), function (i) { return i.DecisionType ===1}), 'Value');
//         }
//     }
//     );
//     return dictionaryGroupFocusAreas;
// }
// const getFocusAreaSummary = (ideaGroups, dictionaryGroupFocusAreas) => {
//     var groupByFocusAreaAndRiskRating = _.groupByMulti(ideaGroups, ['FocusAreaId', 'RecommendationType'], null);
//     var mapFocusAreaSummary = _.map(groupByFocusAreaAndRiskRating, (item, keyFA) => {
//         //Total Value by FocusArea
//         if (dictionaryGroupFocusAreas[keyFA]) {
//             dictionaryGroupFocusAreas[keyFA].RiskCount[4] = _.flatMapDepth(item).length;
//             dictionaryGroupFocusAreas[keyFA].RiskValue[4] = _.sumBy(_.flatMapDepth(item), 'Value');
//         }
//         _.map(item, (risks, keyRisk) => {
//             if (dictionaryGroupFocusAreas[keyFA]) {
//                 dictionaryGroupFocusAreas[keyFA].RiskCount[keyRisk] = risks.length;
//                 dictionaryGroupFocusAreas[keyFA].RiskValue[keyRisk] = _.sumBy(risks, 'Value');
//             }
//         });
//     });
//     dictionaryGroupFocusAreas = getFocusAreaSummaryForPriorGoDecision(ideaGroups, dictionaryGroupFocusAreas);
//     return getArrayFromObject(dictionaryGroupFocusAreas)
// };

// const getIdeaGroupValueSummary = (ideaGroups) => {
//     var multiGroupAdjValue = { RiskValue: [0, 0, 0, 0] };
//     var groupValue = { RiskValue: [0, 0, 0, 0] };
//     var groupedRiskRating = _(ideaGroups).groupBy('RecommendationType')
//         .map((items, key) => {
//             multiGroupAdjValue.RiskValue[key] = _.sumBy(items, 'MultiGroupAdjValue');// getMultiGroupAdjValue(items);
//             groupValue.RiskValue[key] = _.sumBy(items, 'TotalBenefit') + (_.sumBy(items, 'TotalCost') * -1);

//         }).value();
//     return { multiGroupAdjValue: multiGroupAdjValue, groupValue: groupValue };
// };


// const getGroupedRiskValues = (items, groupId) => {
//     var riskValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//     var groupByIsPrimaryAndRiskRating = _.groupBy(items, 'RecommendationType');
//     var mapRiskSummary = _.map(groupByIsPrimaryAndRiskRating, (item, keyRiskRating) => {
//         riskValue.myGroup[keyRiskRating] = _.sumBy(_.filter(item, function (r) { return r.GroupId === groupId && r.CostLineItemId === null }), 'Value');
//         riskValue.otherGroup[keyRiskRating] = _.sumBy(_.filter(item, function (r) { return (((r.CostGroupId === groupId)) && r.CostLineItemId !== null) }), 'Value');
//     });
//     var priorGoDecision = _.filter(items, (item) => { return item.DecisionType ===1});
//     var groupByDecision = _.groupBy(priorGoDecision, 'DecisionType');
//     var mapDecisionSummary = _.map(groupByDecision, (item, keyRiskRating) => {
//         riskValue.myGroup[3] = _.sumBy(_.filter(item, function (r) { return r.GroupId === groupId && r.CostLineItemId === null }), 'Value');
//         riskValue.otherGroup[3] = _.sumBy(_.filter(item, function (r) { return (((r.CostGroupId === groupId)) && r.CostLineItemId !== null) }), 'Value');
//     });
//     return riskValue;
// };

// const getMultiGroupAdjValues = (items, groupId) => {
//     var multiAdjValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//     var groupByIsPrimaryAndRiskRating = _.groupBy(items, 'RecommendationType');
//     var mapRiskSummary = _.map(groupByIsPrimaryAndRiskRating, (item, keyRiskRating) => {
//         multiAdjValue.myGroup[keyRiskRating] = _.sumBy(_.filter(item, function (r) { return (r.CostGroupId === groupId && r.CostLineItemId === null) }), 'Value');
//         multiAdjValue.otherGroup[keyRiskRating] = _.sumBy(_.filter(item, function (r) { return (r.GroupId === groupId && r.CostLineItemId !== null) }), 'Value');
//      });
//      var priorGoDecision = _.filter(items, (item) => { return item.DecisionType ===1});
//      var groupByDecision = _.groupBy(priorGoDecision, 'DecisionType');
//      var mapDecisionSummary = _.map(groupByDecision, (item, keyRiskRating) => {
//         multiAdjValue.myGroup[3] = _.sumBy(_.filter(item, function (r) { return (r.CostGroupId === groupId && r.CostLineItemId === null) }), 'Value');
//         multiAdjValue.otherGroup[3] = _.sumBy(_.filter(item, function (r) { return (r.GroupId === groupId && r.CostLineItemId !== null) }), 'Value');
//      });
//     return multiAdjValue;
// };

// const getNPEBaselineSummary = (lineitemMonthlyValues, lineItems, npeBaseline, groupId) => {
//     var lineItems = _.groupBy(Object.assign(_.filter(lineItems, { 'GroupId': groupId })), 'NonPersonnelLineItemId');

//     var npeLineitemMonthlyValues = _.filter(lineitemMonthlyValues, { 'LineItemType': 3 });
//     npeLineitemMonthlyValues = _.map(npeLineitemMonthlyValues, (item) => {
//         var npeLineItem = lineItems[item.EntityId] ? lineItems[item.EntityId][0] : null;
//         if (npeLineItem) {
//             item.Category = npeLineItem.Category;
//         }
//         return item;
//     });

//     var npeBaselineSummary = Object.assign([], _.filter(npeBaseline, { 'GroupId': groupId }));
//     npeBaselineSummary.MultiGroupAdjValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//     npeBaselineSummary.map((item) => {
//         item.RiskValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//         return item;
//     });
//     var npeDictionary = prepareObjectFromArray(npeBaselineSummary, ['Category']);
//     var groupedRiskRating = _(lineitemMonthlyValues).groupBy('Category')
//         .map((items, key) => {
//             //key = Category
//             if (npeDictionary[key]) {
//                 npeDictionary[key].RiskValue = getGroupedRiskValues(items, groupId);
//             }
//         }).value();
//     var npeDictionaryArray = getArrayFromObject(npeDictionary);
//     var multiGroupAdjValue = getMultiGroupAdjValues(npeLineitemMonthlyValues, groupId);
//     return { npeBaselineSummary: npeDictionaryArray, multiGroupAdjValue: multiGroupAdjValue };
// };

// const getPEBaselineSummary = (lineitemMonthlyValues, lineItems, peBaseline, compRangeBaseline, groupId) => {
//     var lineItems = _.groupBy(Object.assign(_.filter(lineItems, { 'GroupId': groupId })), 'PersonnelLineItemId');

//     var peLineitemMonthlyValues = _.filter(lineitemMonthlyValues, { 'LineItemType': 2 });
//     peLineitemMonthlyValues = _.map(peLineitemMonthlyValues, (item) => {
//         var peLineItem = lineItems[item.EntityId] ? lineItems[item.EntityId][0] : null;
//         if (peLineItem) {
//             item.FunctionalTitleId = peLineItem.FunctionalTitleId;
//             item.SalaryRange = peLineItem.SalaryRange;
//         }
//         return item;
//     });

//     var peBaselineSummary = Object.assign([], _.filter(peBaseline, { 'GroupId': groupId }));
//     peBaselineSummary.map((item) => {
//         item.RiskValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//         return item;
//     });

//     var compRangeBaselineSummary = Object.assign([], _.filter(compRangeBaseline, { 'GroupId': groupId }));
//     compRangeBaselineSummary.map((item) => {
//         item.RiskValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//         return item;
//     });
//     var peDictionary = prepareObjectFromArray(peBaselineSummary, ['FunctionalTitleId']);
//     var compRangeDictionary = prepareObjectFromArray(compRangeBaselineSummary, ['SalaryRange']);

//     var grouped1RiskRating = _(peLineitemMonthlyValues).groupBy('FunctionalTitleId')
//         .map((items, key) => {
//             //key = Category
//             if (peDictionary[key]) {
//                 peDictionary[key].RiskValue = getGroupedRiskValues(items, groupId);
//             }
//         }).value();

//     var grouped2RiskRating = _(peLineitemMonthlyValues).groupBy('SalaryRange')
//         .map((items, key) => {
//             //key = Category
//             if (compRangeDictionary[key]) {
//                 compRangeDictionary[key].RiskValue = getGroupedRiskValues(items, groupId);
//             }
//         }).value();
//     var peFT = getArrayFromObject(peDictionary);
//     var peCompRange = getArrayFromObject(compRangeDictionary);
//     var multiGroupAdjValue = getMultiGroupAdjValues(peLineitemMonthlyValues, groupId);
//     return { peFT: peFT, peCompRange: peCompRange, multiGroupAdjValue: multiGroupAdjValue };
// };

// const getRevenueBaselineSummary = (lineitemMonthlyValues, lineItems, revenueBaseline, groupId) => {
//     var lineItems = _.groupBy(Object.assign(_.filter(lineItems, { 'GroupId': groupId })), 'RevenueLineItemId');
//     var revenueLineitemMonthlyValues = _.filter(lineitemMonthlyValues, { 'LineItemType': 1 });

//     revenueLineitemMonthlyValues = _.map(revenueLineitemMonthlyValues, (item) => {
//         var revenueLineItem = lineItems[item.EntityId] ? lineItems[item.EntityId][0] : null;
//         if (revenueLineItem) {
//             item.Category = revenueLineItem.Category;
//         }
//         return item;
//     });

//     var revenueBaselineSummary = Object.assign([], _.filter(revenueBaseline, { 'GroupId': groupId }));
//     revenueBaselineSummary.map((item) => {
//         item.RiskValue = { myGroup: [0, 0, 0, 0], otherGroup: [0, 0, 0, 0] };
//         return item;
//     });
//     var revenueDictionary = prepareObjectFromArray(revenueBaselineSummary, ['Category']);

//     var groupedRiskRating = _(revenueLineitemMonthlyValues).groupBy('Category')
//         .map((items, key) => {
//             //key = Category
//             if (revenueDictionary[key]) {
//                 revenueDictionary[key].RiskValue = getGroupedRiskValues(items, groupId);
//             }
//         }).value();
//     var revenueDictionaryArray = getArrayFromObject(revenueDictionary);
//     var multiGroupAdjValue = getMultiGroupAdjValues(revenueLineitemMonthlyValues, groupId);
//     return { revenueBaselineSummary: revenueDictionaryArray, multiGroupAdjValue: multiGroupAdjValue };
// };

// const getGroupFocusAreaDictionary = (focusAreas, groupId) => {
//     var groupFocusAreas = _.filter(focusAreas, (item) => {
//         return (item.GroupId === groupId)
//     });
//     groupFocusAreas.map((item) => {
//         item.RiskCount = [0, 0, 0, 0, 0];
//         item.RiskValue = [0, 0, 0, 0, 0];
//         return item;
//     });
//     groupFocusAreas.push(
//         {
//             FocusAreaId: '00000000-0000-0000-0000-000000000000', FocusAreaNumber: 99999, Name: 'Unassigned',
//             RiskCount: [0, 0, 0, 0, 0], RiskValue: [0, 0, 0, 0, 0]
//         }
//     );
//     return prepareObjectFromArray(groupFocusAreas, ['FocusAreaId']);
// };


// export const dashboardPhase3 = (ideaGroups, lineitemMonthlyValues, state, groupId, groupType) => {

//     var activeIdeaGroups = Object.assign([], _.filter(ideaGroups, { 'IdeaStatus': 1 }));
//     var detailedIdeaGroups = _.filter(activeIdeaGroups, (item) => { return item.ValueStatus > 1 });
//     var allRiskSummary = getRiskSummary(activeIdeaGroups, 'DetailedValue');
//     var roughRiskSummary = getRiskSummary(_.filter(activeIdeaGroups, (item) => { return item.ValueStatus < 2 }), 'RoughValue');
//     var detailedRiskSummary = getRiskSummary(detailedIdeaGroups, 'Value');
//     var riskSummary = { all: allRiskSummary, rough: roughRiskSummary, detailed: detailedRiskSummary };

//     var ideaGroupValueSummary = _.cloneDeep(getIdeaGroupValueSummary(detailedIdeaGroups));
//     var riskValueSummary = getRecommendationWiseValueSummary(lineitemMonthlyValues, state.ideas.ideaRevenueLineItems);

//     var detailedLineitemMonthlyValues = _.cloneDeep(_.filter(lineitemMonthlyValues, (l) => {
//         return l.IdeaGroupValueStatus > 1 ||
//             1 === ((l.IdeaGroupValueStatus > 1 && l.ITStatus < 2 && l.IsRough && l.IsIT) ? 1 : ((l.IdeaGroupValueStatus > 1 && l.ITStatus > 1 && l.IsIT) ? 1 : 0))
//     }));
//     var detailedRiskValueSummary = getRecommendationWiseValueSummary(detailedLineitemMonthlyValues, state.ideas.ideaRevenueLineItems);

//     var masterGroupFocusArea = _.cloneDeep(state.masterData.focusAreas);
//     var groupFocusAreaDictionary = Object.assign([], getGroupFocusAreaDictionary(masterGroupFocusArea, groupId));
//     var phase2FocusAreaSummary = getFocusAreaSummary(activeIdeaGroups, groupFocusAreaDictionary);
//     var npeBaselineSummary = [];
//     var npeBaselineSummaryObj = [];
//     var peBaselineSummary = [];
//     var revenueBaselineSummary = [];
//     var revenueBaselineSummaryObj = []
//     if (groupType === 2) {
//         npeBaselineSummaryObj = _.cloneDeep(getNPEBaselineSummary(detailedLineitemMonthlyValues, state.ideas.ideaNonPersonnelLineItems, state.baselineSummary.NPE, groupId));
//         peBaselineSummary = _.cloneDeep(getPEBaselineSummary(detailedLineitemMonthlyValues, state.ideas.ideaPersonnelLineItems, state.baselineSummary.FT, state.baselineSummary.CompRange, groupId));
//     }
//     if (groupType === 1) {
//         revenueBaselineSummaryObj = _.cloneDeep(getRevenueBaselineSummary(detailedLineitemMonthlyValues, state.ideas.ideaRevenueLineItems, state.baselineSummary.Revenue, groupId));
//     }
//     return {
//         riskSummary: riskSummary,
//         riskValueSummary: riskValueSummary,
//         detailedRiskValueSummary: detailedRiskValueSummary,
//         focusAreaSummary: phase2FocusAreaSummary,
//         groupValue: ideaGroupValueSummary.groupValue,
//         multiGroupAdjValue: ideaGroupValueSummary.multiGroupAdjValue,
//         baselineImpactSummary: { npe: npeBaselineSummaryObj.npeBaselineSummary, npeMultiGroupAdj: npeBaselineSummaryObj.multiGroupAdjValue, pe: peBaselineSummary, revenue: revenueBaselineSummaryObj.revenueBaselineSummary, revenueMultiGroupAdj: revenueBaselineSummaryObj.multiGroupAdjValue }
//     }
// };
