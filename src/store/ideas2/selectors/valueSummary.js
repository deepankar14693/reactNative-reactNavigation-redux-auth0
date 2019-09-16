import _ from 'lodash';
import { getCFandPLYearlyValues } from '../../dashboard/selectors/dashboardPhase2';
import { getFiscalYear, prepareObjectFromArray, getUTCTimingLabel } from '../../../common/utils';
import { getYearsCountArray } from '../../../common/constants';

export const getIdeaGroupValueSummary = (ideaGroups) => {
    ideaGroups = _.map(ideaGroups, (item) => {
        item.NPERecurring = item.ValueComponents ? _.sum([item.ValueComponents[12], item.ValueComponents[13]]) : 0;
        item.PERecurring = item.ValueComponents ? _.sum([item.ValueComponents[3], item.ValueComponents[4]]) : 0;
        item.RecurringMargin = item.ValueComponents ? _.sum([item.ValueComponents[21], item.ValueComponents[22]]) : 0;
        item.ITOneTime = item.ValueComponents ? item.ValueComponents[8] : 0;
        item.NpeOneTime = item.ValueComponents ? _.subtract(_.sum([item.ValueComponents[6], item.ValueComponents[7], item.ValueComponents[15], item.ValueComponents[16]]), item.ValueComponents[8]) : 0;
        item.OneTimeMargin = item.ValueComponents ? _.sum([item.ValueComponents[17], item.ValueComponents[18]]) : 0;
        item.MultiGroupAdjValue = item.ValueComponents ? _.subtract(item.Value, _.sum([item.TotalBenefit, (item.TotalCost * -1)])) : 0
        return item;
    });
    return ideaGroups;
};
export const getImpactsByYear = (ideaGroups, npeLineItems, revenueLineItems, timings, fiscalYearStartingMonth, fiscalTimings) => {
    const years = _.uniqBy(_.map(fiscalTimings, 'year'));

    const yearlyDetails = getCFandPLYearlyValues(ideaGroups, years);
    const oneTimeDetails = getYearlyOneTimeDetail(ideaGroups, npeLineItems, revenueLineItems, timings, fiscalYearStartingMonth, fiscalTimings);
    return { yearlyDetails: yearlyDetails, oneTimeDetails: oneTimeDetails }
};

export const getYearlyOneTimeDetail = (ideaGroups, npeLineItems, revenueLineItems, timings, fiscalYearStartingMonth, fiscalTimings) => {
    const years = _.uniqBy(_.map(fiscalTimings, 'year'));

    let pl = { ITCost: getYearsCountArray(years), NPECost: getYearsCountArray(years), NPESaving: getYearsCountArray(years), NetWC: getYearsCountArray(years), MarginGain: getYearsCountArray(years), MarginLoss: getYearsCountArray(years) };
    let cf = { ITCost: getYearsCountArray(years), NPECost: getYearsCountArray(years), NPESaving: getYearsCountArray(years), NetWC: getYearsCountArray(years), MarginGain: getYearsCountArray(years), MarginLoss: [getYearsCountArray(years)] };

    var dictionaryIdeaGroups = prepareObjectFromArray(ideaGroups, ['IdeaId', 'GroupId']);
    npeLineItems = _.filter(npeLineItems, (item) => {
        return (
            dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId] &&
            1 === (
                (
                    dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].Idea.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].Idea.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });
    var lastTimingOption = fiscalTimings[timings.length - 2];
    var lastYear = 0;
    if (lastTimingOption) {
        lastYear = lastTimingOption.year;
    }
    revenueLineItems = _.filter(revenueLineItems, (item) => {
        return (
            dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId] &&
            1 === (
                (
                    dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].Idea.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].Idea.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });
    npeLineItems = npeLineItems.map((lineItem) => {
        lineItem.Year = lineItem.Timing ? getFiscalYear(fiscalYearStartingMonth, lineItem.Timing) : lastYear;
        return lineItem;
    });
    revenueLineItems = revenueLineItems.map((lineItem) => {
        lineItem.Year = lineItem.Timing ? getFiscalYear(fiscalYearStartingMonth, lineItem.Timing) : lastYear;
        return lineItem;
    });

    //npe LineItems
    _(npeLineItems).groupBy('Year')
        .map((items, key) => {
            pl.ITCost[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === -1 && item.IsIT === true && item.IsRecurring === false) }), 'Value');
            pl.NPECost[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, { 'DirectionType': -1, 'IsIT': false, 'IsRecurring': false }), 'Value');
            pl.NPESaving[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === 1 && item.IsIT === false && item.IsWorkingCapital === false && item.IsRecurring === false) }), 'Value');
            pl.NetWC[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, { 'IsWorkingCapital': true, 'IsRecurring': false }), 'Value');

            cf.ITCost[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === -1 && item.IsIT === true && item.IsRecurring === false) }), i => { return i.Amount * i.DirectionType });
            cf.NPECost[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, { 'DirectionType': -1, 'IsIT': false, 'IsRecurring': false, 'CostLineItemId': null }), i => { return i.Amount * i.DirectionType });
            cf.NPESaving[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === 1 && item.IsIT === false && item.IsWorkingCapital === false && item.IsRecurring === false) }), i => { return i.Amount * i.DirectionType });
            cf.NetWC[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, { 'IsWorkingCapital': true, 'IsIT': false, 'CostLineItemId': null }), i => { return i.Amount * i.DirectionType });
        }).value();

    //revenue LineItems
    _(revenueLineItems).groupBy('Year')
        .map((items, key) => {

            pl.MarginGain[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === -1 && item.IsRecurring === false) }), 'Value');
            pl.MarginLoss[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, { 'DirectionType': 1, 'IsRecurring': false }), 'Value');
            cf.MarginGain[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === -1 && item.IsRecurring === false) }), i => { return i.MarginChange * i.DirectionType });
            cf.MarginLoss[years.indexOf(parseInt(key))] = _.sumBy(_.filter(items, { 'DirectionType': 1, 'IsRecurring': false }), i => { return i.MarginChange * i.DirectionType });
        }).value();

    return { PL: pl, CF: cf };
};

const getProjectYears = (years) => {
    var projectYears = {};
    _.map(years, (item) => {
        projectYears[item] = 0
    })
    return projectYears;
};

export const getPEDetailByYear = (ideaGroups, ideaPersonnelLineItems, timings, fiscalYearStartingMonth, fiscalTimings) => {

    var dictionaryIdeaGroups = prepareObjectFromArray(ideaGroups, ['IdeaId', 'GroupId']);

    ideaPersonnelLineItems = _.filter(ideaPersonnelLineItems, (item) => {
        return (
            dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId] &&
            1 === (
                (
                    dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].Idea.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId].Idea.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });
    var lastTimingOption = fiscalTimings[timings.length - 2];
    var lastYear = 0;
    var years = _.uniqBy(_.map(timings, 'year'));

    var peAdd = getProjectYears(years);
    var peReduce = getProjectYears(years);
    var fteAdd = getProjectYears(years);
    var fteReduce = getProjectYears(years);
    if (lastTimingOption) {
        lastYear = lastTimingOption.year;
    }
    ideaPersonnelLineItems = ideaPersonnelLineItems.map((lineItem) => {
        lineItem.Year = lineItem.Timing ? getFiscalYear(fiscalYearStartingMonth, lineItem.Timing) : lastYear;
        return lineItem;
    });
    ideaPersonnelLineItems = _.sortBy(ideaPersonnelLineItems, 'Year');

    var peDetail = { PEAdd: peAdd, PEReduce: peReduce, FTEAdd: fteAdd, FTEReduce: fteReduce };

    _(ideaPersonnelLineItems).groupBy('Year')
        .map((items, key) => {
            //key = RiskRatingType
            peDetail.PEAdd[key] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === -1) }), 'Value');
            peDetail.PEReduce[key] = _.sumBy(_.filter(items, { 'DirectionType': 1 }), 'Value');
            peDetail.FTEAdd[key] = _.sumBy(_.filter(items, (item) => { return (item.DirectionType === -1) }), 'PersonnelCount') * -1;
            peDetail.FTEReduce[key] = _.sumBy(_.filter(items, { 'DirectionType': 1 }), 'PersonnelCount');
        }).value();
    return peDetail;
};
