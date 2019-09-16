import _ from 'lodash';
import moment from 'moment';

import { prepareObjectFromArray, getValue, filterByValues, getFiscalYear } from '../../../common/utils';


export const getCFandPLYearlyValues = (ideaLineitemMonthlyValues) => {
    var lineItemMonthlyValues = _.filter(ideaLineitemMonthlyValues, (item) => {
        return (
            1 === (
                (
                    item.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (item.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    item.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (item.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });

    // var lineItemMonthlyValues = _.filter(ideaLineitemMonthlyValues, (item) => {
    //     return (item.CostLineItemId === null &&
    //         (
    //             item.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (item.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
    //         )
    //         ||
    //         (
    //             item.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (item.ITValueStatus > 1 && item.IsIT ? 1 : 0)
    //         )

    //     )
    // });

    // var lineItemMonthlyValues = _.filter(ideaLineitemMonthlyValues, (item) => {
    //     return (1 === (
    //         (
    //             ((item.ValueStatus > 1 && !item.IsRough && !item.IsIT) ? 1 : 0) || ((item.ValueStatus < 2 && !item.IsIT && item.IsRough) ? 1 : 0)
    //             || ((item.ITValueStatus > 1 && !item.IsRough && item.IsIT) ? 1 : 0) || ((item.ITValueStatus < 2 && item.IsIT && item.IsRough) ? 1 : 0)
    //         )
    //     ))
    // });


    var pLValues = [0, 0, 0, 0, 0];
    var cFValues = [0, 0, 0, 0, 0];

    var pLIdeas = [[], [], [], [], []];
    var cFIdeas = [[], [], [], [], []];
    pLIdeas[0] = _.map(_.uniqBy(_.filter(lineItemMonthlyValues, (item) => { return item.PLY1 != 0 }), 'IdeaId'), 'IdeaId');
    pLIdeas[1] = _.map(_.uniqBy(_.filter(lineItemMonthlyValues, (item) => { return item.PLY2 != 0 }), 'IdeaId'), 'IdeaId');
    pLIdeas[2] = _.map(_.uniqBy(_.filter(lineItemMonthlyValues, (item) => { return item.PLY3 != 0 }), 'IdeaId'), 'IdeaId');
    pLIdeas[3] = _.map(_.uniqBy(_.filter(lineItemMonthlyValues, (item) => { return item.PLY4 != 0 }), 'IdeaId'), 'IdeaId');
    pLIdeas[4] = _.map(_.uniqBy(_.filter(lineItemMonthlyValues, (item) => { return item.PLY5 != 0 }), 'IdeaId'), 'IdeaId');


    pLValues[0] = _.sumBy(lineItemMonthlyValues, 'PLY1');
    pLValues[1] = _.sumBy(lineItemMonthlyValues, 'PLY2');
    pLValues[2] = _.sumBy(lineItemMonthlyValues, 'PLY3');
    pLValues[3] = _.sumBy(lineItemMonthlyValues, 'PLY4');
    pLValues[4] = _.sumBy(lineItemMonthlyValues, 'PLY5');

    var cFIdeasByPLY1 = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemType === 2 && item.PLY1 != 0 });
    var cFIdeasByCFY1 = _.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) && item.CFY1 != 0 });
    cFIdeas[0] = _.map(_.uniqBy(_.concat(cFIdeasByPLY1, cFIdeasByCFY1), 'IdeaId'), 'IdeaId');

    var cFIdeasByPLY2 = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemType === 2 && item.PLY2 != 0 });
    var cFIdeasByCFY2 = _.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) && item.CFY2 != 0 });
    cFIdeas[1] = _.map(_.uniqBy(_.concat(cFIdeasByPLY2, cFIdeasByCFY2), 'IdeaId'), 'IdeaId');

    var cFIdeasByPLY3 = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemType === 2 && item.PLY3 != 0 });
    var cFIdeasByCFY3 = _.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 3 || item.LineItemType === 3) && item.CFY3 != 0 });
    cFIdeas[2] = _.map(_.uniqBy(_.concat(cFIdeasByPLY3, cFIdeasByCFY3), 'IdeaId'), 'IdeaId');

    var cFIdeasByPLY4 = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemType === 2 && item.PLY4 != 0 });
    var cFIdeasByCFY4 = _.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) && item.CFY4 != 0 });
    cFIdeas[3] = _.map(_.uniqBy(_.concat(cFIdeasByPLY4, cFIdeasByCFY4), 'IdeaId'), 'IdeaId');

    var cFIdeasByPLY5 = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemType === 2 && item.PLY5 != 0 });
    var cFIdeasByCFY5 = _.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) && item.CFY5 != 0 });
    cFIdeas[4] = _.map(_.uniqBy(_.concat(cFIdeasByPLY5, cFIdeasByCFY5), 'IdeaId'), 'IdeaId');


    cFValues[0] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) }), 'CFY1') + _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2 }), 'PLY1');
    cFValues[1] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) }), 'CFY2') + _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2 }), 'PLY2');
    cFValues[2] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) }), 'CFY3') + _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2 }), 'PLY3');
    cFValues[3] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) }), 'CFY4') + _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2 }), 'PLY4');
    cFValues[4] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 1 || item.LineItemType === 3) }), 'CFY5') + _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2 }), 'PLY5');

    return { PL: pLValues, CF: cFValues, PLIdeas: pLIdeas, CFIdeas: cFIdeas };
};

export const getYearlyPersonnelDetail = (ideaLineitemMonthlyValues) => {
    var lineItemMonthlyValues = _.filter(ideaLineitemMonthlyValues, (item) => {
        return (
            1 === (
                (
                    item.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (item.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    item.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (item.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });

    var peDetail = { PEAdd: [0, 0, 0, 0, 0], PEReduce: [0, 0, 0, 0, 0], FTEAdd: [0, 0, 0, 0, 0], FTEReduce: [0, 0, 0, 0, 0] };

    peDetail.PEAdd[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'PLY1');
    peDetail.PEAdd[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'PLY2');
    peDetail.PEAdd[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'PLY3');
    peDetail.PEAdd[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'PLY4');
    peDetail.PEAdd[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'PLY5');

    peDetail.PEReduce[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'PLY1');
    peDetail.PEReduce[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'PLY2');
    peDetail.PEReduce[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'PLY3');
    peDetail.PEReduce[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'PLY4');
    peDetail.PEReduce[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'PLY5');

    peDetail.FTEAdd[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'CFY1');
    peDetail.FTEAdd[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'CFY2');
    peDetail.FTEAdd[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'CFY3');
    peDetail.FTEAdd[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'CFY4');
    peDetail.FTEAdd[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 21 }), 'CFY5');

    peDetail.FTEReduce[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'CFY1');
    peDetail.FTEReduce[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'CFY2');
    peDetail.FTEReduce[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'CFY3');
    peDetail.FTEReduce[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'CFY4');
    peDetail.FTEReduce[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemType': 2, 'LineItemSubType': 22 }), 'CFY5');

    return peDetail;
};

export const getYearlyOneTimeDetail = (ideaLineitemMonthlyValues) => {
    var lineItemMonthlyValues = _.filter(ideaLineitemMonthlyValues, (item) => {
        return (
            1 === (
                (
                    item.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (item.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    item.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (item.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });

    var pl = { ITCost: [0, 0, 0, 0, 0], NPECost: [0, 0, 0, 0, 0], NPESaving: [0, 0, 0, 0, 0], NetWC: [0, 0, 0, 0, 0], MarginGain: [0, 0, 0, 0, 0], MarginLoss: [0, 0, 0, 0, 0] };
    var cf = { ITCost: [0, 0, 0, 0, 0], NPECost: [0, 0, 0, 0, 0], NPESaving: [0, 0, 0, 0, 0], NetWC: [0, 0, 0, 0, 0], MarginGain: [0, 0, 0, 0, 0], MarginLoss: [0, 0, 0, 0, 0] };

    //41 => One time IT cost
    pl.ITCost[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'PLY1');
    pl.ITCost[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'PLY2');
    pl.ITCost[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'PLY3');
    pl.ITCost[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'PLY4');
    pl.ITCost[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'PLY5');

    cf.ITCost[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'CFY1');
    cf.ITCost[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'CFY2');
    cf.ITCost[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'CFY3');
    cf.ITCost[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'CFY4');
    cf.ITCost[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'CFY5');

    //34 => One time NPE cost
    pl.NPECost[0] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'PLY1');
    pl.NPECost[1] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'PLY2');
    pl.NPECost[2] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'PLY3');
    pl.NPECost[3] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'PLY4');
    pl.NPECost[4] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'PLY5');

    cf.NPECost[0] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'CFY1');
    cf.NPECost[1] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'CFY2');
    cf.NPECost[2] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'CFY3');
    cf.NPECost[3] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'CFY4');
    cf.NPECost[4] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'CFY5');

    //33 => One time NPE saving
    pl.NPESaving[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'PLY1');
    pl.NPESaving[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'PLY2');
    pl.NPESaving[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'PLY3');
    pl.NPESaving[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'PLY4');
    pl.NPESaving[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'PLY5');

    cf.NPESaving[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'CFY1');
    cf.NPESaving[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'CFY2');
    cf.NPESaving[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'CFY3');
    cf.NPESaving[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'CFY4');
    cf.NPESaving[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'CFY5');

    //35,36 => One time Net Working Capital
    pl.NetWC[0] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'PLY1');
    pl.NetWC[1] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'PLY2');
    pl.NetWC[2] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'PLY3');
    pl.NetWC[3] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'PLY4');
    pl.NetWC[4] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'PLY5');

    cf.NetWC[0] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'CFY1');
    cf.NetWC[1] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'CFY2');
    cf.NetWC[2] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'CFY3');
    cf.NetWC[3] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'CFY4');
    cf.NetWC[4] = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 }), 'CFY5');

    //13 => One time Margin Gain
    pl.MarginGain[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'PLY1');
    pl.MarginGain[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'PLY2');
    pl.MarginGain[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'PLY3');
    pl.MarginGain[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'PLY4');
    pl.MarginGain[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'PLY5');

    cf.MarginGain[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'CFY1');
    cf.MarginGain[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'CFY2');
    cf.MarginGain[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'CFY3');
    cf.MarginGain[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'CFY4');
    cf.MarginGain[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'CFY5');

    //14 => One time Margin Loss
    pl.MarginLoss[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'PLY1');
    pl.MarginLoss[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'PLY2');
    pl.MarginLoss[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'PLY3');
    pl.MarginLoss[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'PLY4');
    pl.MarginLoss[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'PLY5');

    cf.MarginLoss[0] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'CFY1');
    cf.MarginLoss[1] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'CFY2');
    cf.MarginLoss[2] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'CFY3');
    cf.MarginLoss[3] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'CFY4');
    cf.MarginLoss[4] = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'CFY5');

    return { PL: pl, CF: cf };
};

export const getImpactsByYear = (lineItemMonthlyValues) => {
    var yearlyDetails = getCFandPLYearlyValues(lineItemMonthlyValues);
    var peDetails = getYearlyPersonnelDetail(lineItemMonthlyValues);
    var oneTimeDetails = getYearlyOneTimeDetail(lineItemMonthlyValues);
    return { yearlyDetails: yearlyDetails, oneTimeDetails: oneTimeDetails, peDetails: peDetails }
};

const getProjectYears = (years) => {
    var projectYears = {};
    _.map(years, (item) => {
        projectYears[item] = 0
    })
    return projectYears;
};

export const getPEDetailByYear = (_lineItemMonthlyValues, ideaPersonnelLineItems, timings, fiscalYearStartingMonth, fiscalTimings) => {

    var lineItemMonthlyValues = _.filter(_lineItemMonthlyValues, (item) => {
        return (
            1 === (
                (
                    item.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (item.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)
                )
                ||
                (
                    item.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (item.ITValueStatus > 1 && item.IsIT ? 1 : 0)
                )
            )
        )
    });
    // lineItemMonthlyValues = _.filter(lineItemMonthlyValues, (item) => {
    //     return (!item.IsIT || (item.IsIT && item.ITValueStatus > 1))
    // });
    //var peLineItems = ideaPersonnelLineItems;


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
    //var keyBasedLineItemMonthlyValues = _.groupBy(lineItemMonthlyValues, 'EntityId');
    lineItemMonthlyValues = lineItemMonthlyValues.map((lineItem) => {
        // var peMonthlyValue = keyBasedLineItemMonthlyValues[lineItem.EntityId.toLowerCase()] ? keyBasedLineItemMonthlyValues[lineItem.EntityId.toLowerCase()][0] : null;
        // if (peMonthlyValue) {
        //     lineItem.FTE = peMonthlyValue.FTE;
        //     lineItem.Value = peMonthlyValue.Value;
        //     lineItem.LineItemSubType = peMonthlyValue.LineItemSubType;
        // }
        //lineItem.Year = lineItem.Timing ? moment.utc(lineItem.Timing).year() : lastYear;
        lineItem.Year = lineItem.Timing ? getFiscalYear(fiscalYearStartingMonth, lineItem.Timing) : lastYear;
        return lineItem;
    });
    lineItemMonthlyValues = _.sortBy(lineItemMonthlyValues, 'Year');

    var peDetail = { PEAdd: peAdd, PEReduce: peReduce, FTEAdd: fteAdd, FTEReduce: fteReduce };

    var groupedRiskRating = _(lineItemMonthlyValues).groupBy('Year')
        .map((items, key) => {
            //key = RiskRatingType
            peDetail.PEAdd[key] = _.sumBy(_.filter(items, (item) => { return (item.LineItemSubType === 21 || item.LineItemSubType === 25) }), 'Value');
            peDetail.PEReduce[key] = _.sumBy(_.filter(items, { 'LineItemSubType': 22 }), 'Value');
            peDetail.FTEAdd[key] = _.sumBy(_.filter(items, (item) => { return (item.LineItemSubType === 21 || item.LineItemSubType === 25) }), 'FTE');
            peDetail.FTEReduce[key] = _.sumBy(_.filter(items, { 'LineItemSubType': 22 }), 'FTE');
        }).value();
    return peDetail;
};

//#region Phase2

export const getRiskWiseOneTimeDetail = (lineItemMonthlyValues) => {
    var oneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var unamortizedOneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var cfOneTimeDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var cfOneTimeAmortizedDetail = { ITCost: 0, NPECost: 0, NPESaving: 0, NetWC: 0, MarginGain: 0, MarginLoss: 0 };
    var wcLineItmeMonthlyValues = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemSubType === 35 || item.LineItemSubType === 36 });
    var filterLineItemMonthlyValues = _.filter(lineItemMonthlyValues, function (item) { return item.CostLineItemId === null });
    var filterWCLineItmeMonthlyValues = _.filter(wcLineItmeMonthlyValues, function (item) { return item.CostLineItemId === null });

    oneTimeDetail.ITCost = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'Value');
    oneTimeDetail.NPECost = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'Value');
    oneTimeDetail.NPESaving = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'Value');
    oneTimeDetail.NetWC = _.sumBy(wcLineItmeMonthlyValues, 'Value');
    oneTimeDetail.MarginGain = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'Value');
    oneTimeDetail.MarginLoss = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'Value');

    unamortizedOneTimeDetail.ITCost = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 }), 'Amount');
    unamortizedOneTimeDetail.NPECost = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'Amount');
    unamortizedOneTimeDetail.NPESaving = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 33 }), 'Amount');
    unamortizedOneTimeDetail.NetWC = _.sumBy(wcLineItmeMonthlyValues, (item) => { return (item.DirectionType * item.Amount) });
    unamortizedOneTimeDetail.MarginGain = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 13 }), 'Amount');
    unamortizedOneTimeDetail.MarginLoss = _.sumBy(_.filter(lineItemMonthlyValues, { 'LineItemSubType': 14 }), 'Amount');

    cfOneTimeDetail.ITCost = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 41 }), 'Amount');
    cfOneTimeDetail.NPECost = _.sumBy(_.filter(filterLineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'Amount');
    cfOneTimeDetail.NPESaving = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 33 }), 'Amount');
    cfOneTimeDetail.NetWC = _.sumBy(filterWCLineItmeMonthlyValues, (item) => { return (item.DirectionType * item.Amount) });
    cfOneTimeDetail.MarginGain = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 13 }), 'Amount');
    cfOneTimeDetail.MarginLoss = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 14 }), 'Amount');

    cfOneTimeAmortizedDetail.ITCost = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 41 }), 'Value');
    cfOneTimeAmortizedDetail.NPECost = _.sumBy(_.filter(filterLineItemMonthlyValues, (item) => { return (item.LineItemSubType === 34) }), 'Value');
    cfOneTimeAmortizedDetail.NPESaving = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 33 }), 'Value');
    cfOneTimeAmortizedDetail.NetWC = _.sumBy(filterWCLineItmeMonthlyValues, 'Value');
    cfOneTimeAmortizedDetail.MarginGain = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 13 }), 'Value');
    cfOneTimeAmortizedDetail.MarginLoss = _.sumBy(_.filter(filterLineItemMonthlyValues, { 'LineItemSubType': 14 }), 'Value');

    return { oneTimeDetail: oneTimeDetail, unamortizedOneTimeDetail: unamortizedOneTimeDetail, cfOneTimeDetail: cfOneTimeDetail, cfOneTimeAmortizedDetail: cfOneTimeAmortizedDetail };
};

export const getNonPersonnelValueSummary = (lineItemMonthlyValues) => {
    var npeRecurringLineItems = _.filter(lineItemMonthlyValues, (item) => {
        return item.LineItemType === 3 && item.CostLineItemId === null //((!item.IsIT || (item.IsIT && item.ITValueStatus > 1)) && 
    });
    var recurringNonPersonnelExpenses = _.sumBy(filterByValues(npeRecurringLineItems, 'LineItemSubType', [31, 32, 42]), 'Value');
    var recurringPersonnelExpenses = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemType === 2 && item.CostLineItemId === null && (item.LineItemSubType === 21 || item.LineItemSubType === 22 || item.LineItemSubType === 25)) }), 'Value');
    var oneTimeAdditions = _.sumBy(filterByValues(npeRecurringLineItems, 'LineItemSubType', [34, 36, 41]), 'Value');
    var oneTimeReductions = _.sumBy(filterByValues(npeRecurringLineItems, 'LineItemSubType', [33, 35]), 'Value');


    var oneTimeOtherLineItems = filterByValues(lineItemMonthlyValues, 'LineItemSubType', [13, 14, 33, 34, 35, 36]);
    var oneTimeITLineItems = _.filter(lineItemMonthlyValues, { 'LineItemSubType': 41 });

    var amortizedOtherOneTime = _.sumBy(oneTimeOtherLineItems, 'Value');
    var amortizedITOneTime = _.sumBy(oneTimeITLineItems, 'Value');
    var otherOneTimeIdeas = _.map(_.uniqBy(oneTimeOtherLineItems, 'IdeaId'), 'IdeaId');
    var itOneTimeIdeas = _.map(_.uniqBy(oneTimeITLineItems, 'IdeaId'), 'IdeaId');

    var unAmortizedOtherOneTime = _.sumBy(oneTimeOtherLineItems, (item) => { return (item.DirectionType * item.Amount) });
    var unAmortizedITOneTime = _.sumBy(oneTimeITLineItems, (item) => { return (item.DirectionType * item.Amount) });

    return {
        recurringNonPersonnelExpenses: recurringNonPersonnelExpenses,
        recurringPersonnelExpenses: recurringPersonnelExpenses,
        oneTimeAdditions: oneTimeAdditions,
        oneTimeReductions: oneTimeReductions,
        amortizedOtherOneTime: amortizedOtherOneTime,
        amortizedOtherOneTimeIdeas: otherOneTimeIdeas,
        amortizedITOneTime: amortizedITOneTime,
        amortizedITOneTimeIdeas: itOneTimeIdeas,
        unAmortizedOtherOneTime: unAmortizedOtherOneTime,
        unAmortizedOtherOneTimeIdeas: otherOneTimeIdeas,
        unAmortizedITOneTime: unAmortizedITOneTime,
        unAmortizedITOneTimeIdeas: itOneTimeIdeas
    }
};

export const getRevenueValueSummary = (lineItemMonthlyValues, ideaRevenueLineItems) => {
    var recurringLineItems = _.filter(lineItemMonthlyValues, (item) => {
        return (item.LineItemType === 1 && (item.LineItemSubType === 11 || item.LineItemSubType === 12))
    });
    var oneTimeLineItems = _.filter(lineItemMonthlyValues, (item) => {
        return (item.LineItemType === 1 && (item.LineItemSubType === 13 || item.LineItemSubType === 14))
    });

    var recurringRevenueLineItems = filterByValues(ideaRevenueLineItems, 'RevenueLineItemId', _.map(recurringLineItems, 'EntityId'));
    var oneTimeRevenueLineItems = filterByValues(ideaRevenueLineItems, 'RevenueLineItemId', _.map(oneTimeLineItems, 'EntityId'));

    var recurringMargin = _.sumBy(recurringLineItems, 'Value');
    var oneTimeMargin = _.sumBy(oneTimeLineItems, 'Value');
    var recurringRevenue = _.sumBy(_.filter(recurringRevenueLineItems, { 'DirectionType': 1 }), 'RevenueChange') - _.sumBy(_.filter(recurringRevenueLineItems, { 'DirectionType': -1 }), 'RevenueChange');
    var oneTimeRevenue = _.sumBy(_.filter(oneTimeRevenueLineItems, { 'DirectionType': 1 }), 'RevenueChange') - _.sumBy(_.filter(oneTimeRevenueLineItems, { 'DirectionType': -1 }), 'RevenueChange');

    return {
        recurringMargin: recurringMargin,
        oneTimeMargin: oneTimeMargin,
        recurringRevenue: recurringRevenue,
        oneTimeRevenue: oneTimeRevenue
    }
}

export const getPersonnelFTEDetail = (lineItemMonthlyValues) => {
    lineItemMonthlyValues = _.filter(lineItemMonthlyValues, (item) => { return item.LineItemType === 2 && (!item.IsIT || (item.IsIT && item.ITValueStatus > 1)) });
    var peDetail = { fteAdd: 0, fteReduce: 0, netFte: 0, multiGroupAdjustment: 0 };
    peDetail.netFte = _.sumBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 21 || item.LineItemSubType === 22 || item.LineItemSubType === 25) }), 'FTE');
    peDetail.netFteIdeas = _.map(_.uniqBy(_.filter(lineItemMonthlyValues, (item) => { return (item.LineItemSubType === 21 || item.LineItemSubType === 22 || item.LineItemSubType === 25) && item.FTE != 0 }), 'IdeaId'), 'IdeaId');

    var peLineItems = _.filter(lineItemMonthlyValues, (item) => { return item.CostLineItemId === null && item.LineItemType === 2 });
    peDetail.fteAdd = _.sumBy(_.filter(peLineItems, (item) => { return (item.LineItemSubType === 21 || item.LineItemSubType === 25) }), 'FTE');
    peDetail.fteReduce = _.sumBy(_.filter(peLineItems, { 'LineItemSubType': 22 }), 'FTE');

    var peAllocatedLineItems = _.filter(lineItemMonthlyValues, (item) => { return item.CostLineItemId !== null && item.LineItemType === 2 });
    peDetail.multiGroupAdjustment = _.sumBy(peAllocatedLineItems, 'FTE');

    return peDetail;
};

export const getRiskWiseValueSummary = (lineItemMonthlyValues, ideaRevenueLineItems) => {
    var riskSummary = {
        PL: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        CF: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        PLIdeas: [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]],
        CFIdeas: [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]],
        FteAdd: [0, 0, 0, 0],
        FteReduce: [0, 0, 0, 0],
        FteMultiGroupAdjustment: [0, 0, 0, 0],
        NetFTE: [0, 0, 0, 0],
        NetFTEIdeas: [[], [], [], []],
        RecurringNonPersonnelExpenses: [0, 0, 0, 0],
        RecurringPersonnelExpenses: [0, 0, 0, 0],
        OneTimeAdditions: [0, 0, 0, 0],
        OneTimeReductions: [0, 0, 0, 0],
        AmortizedOtherOneTime: [0, 0, 0, 0],
        AmortizedOtherOneTimeIdeas: [[], [], [], []],
        AmortizedITOneTime: [0, 0, 0, 0],
        AmortizedITOneTimeIdeas: [[], [], [], []],
        UnAmortizedOtherOneTime: [0, 0, 0, 0],
        UnAmortizedOtherOneTimeIdeas: [[], [], [], []],
        UnAmortizedITOneTime: [0, 0, 0, 0],
        UnAmortizedITOneTimeIdeas: [[], [], [], []],
        RecurringMargin: [0, 0, 0, 0],
        OneTimeMargin: [0, 0, 0, 0],
        RecurringRevenue: [0, 0, 0, 0],
        OneTimeRevenue: [0, 0, 0, 0],
        IdeaCount: [[], [], [], []],

        oneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        unamortizedOneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        cfOneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        cfOneTimeAmortizedDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        }
    };
    var groupedRiskRating = _(lineItemMonthlyValues).groupBy('GLRiskRatingType')
        .map((items, key) => {
            //key = GLRiskRatingType
            riskSummary.IdeaCount[key] = ((_.uniqBy(items, 'IdeaId').length) > 0 ? _.uniqBy(items, 'IdeaId') : []);
            var cfandPLYearlyValues = getCFandPLYearlyValues(items)
            riskSummary.PL[key] = cfandPLYearlyValues.PL;
            riskSummary.CF[key] = cfandPLYearlyValues.CF;
            riskSummary.PLIdeas[key] = cfandPLYearlyValues.PLIdeas;
            riskSummary.CFIdeas[key] = cfandPLYearlyValues.CFIdeas;

            var npeValueSummary = getNonPersonnelValueSummary(items);
            riskSummary.RecurringNonPersonnelExpenses[key] = npeValueSummary.recurringNonPersonnelExpenses;
            riskSummary.RecurringPersonnelExpenses[key] = npeValueSummary.recurringPersonnelExpenses;
            riskSummary.OneTimeAdditions[key] = npeValueSummary.oneTimeAdditions;
            riskSummary.OneTimeReductions[key] = npeValueSummary.oneTimeReductions;
            riskSummary.AmortizedOtherOneTime[key] = npeValueSummary.amortizedOtherOneTime;
            riskSummary.AmortizedOtherOneTimeIdeas[key] = npeValueSummary.amortizedOtherOneTimeIdeas;
            riskSummary.AmortizedITOneTime[key] = npeValueSummary.amortizedITOneTime;
            riskSummary.AmortizedITOneTimeIdeas[key] = npeValueSummary.amortizedITOneTimeIdeas;

            riskSummary.UnAmortizedOtherOneTime[key] = npeValueSummary.unAmortizedOtherOneTime;
            riskSummary.UnAmortizedOtherOneTimeIdeas[key] = npeValueSummary.unAmortizedOtherOneTimeIdeas;
            riskSummary.UnAmortizedITOneTime[key] = npeValueSummary.unAmortizedITOneTime;
            riskSummary.UnAmortizedITOneTimeIdeas[key] = npeValueSummary.unAmortizedITOneTimeIdeas;

            var revenueValueSummary = getRevenueValueSummary(items, ideaRevenueLineItems);
            riskSummary.RecurringMargin[key] = revenueValueSummary.recurringMargin;
            riskSummary.OneTimeMargin[key] = revenueValueSummary.oneTimeMargin;
            riskSummary.RecurringRevenue[key] = revenueValueSummary.recurringRevenue;
            riskSummary.OneTimeRevenue[key] = revenueValueSummary.oneTimeRevenue;

            var detailedLineitems = _.filter(items, (l) => {
                return l.IdeaGroupValueStatus > 1 ||
                    1 === ((l.IdeaGroupValueStatus > 1 && l.ITStatus < 2 && l.IsRough && l.IsIT) ? 1 : ((l.IdeaGroupValueStatus > 1 && l.ITStatus > 1 && l.IsIT) ? 1 : 0))
            });

            var fteDetail = getPersonnelFTEDetail(detailedLineitems);
            riskSummary.FteAdd[key] = fteDetail.fteAdd;
            riskSummary.FteReduce[key] = fteDetail.fteReduce;
            riskSummary.NetFTE[key] = fteDetail.netFte;
            riskSummary.NetFTEIdeas[key] = fteDetail.netFteIdeas;
            riskSummary.FteMultiGroupAdjustment[key] = fteDetail.multiGroupAdjustment;

            var oneTimeValues = getRiskWiseOneTimeDetail(detailedLineitems);
            var oneTimeDetail = oneTimeValues.oneTimeDetail;
            riskSummary.oneTimeDetail.ITCost[key] = oneTimeDetail.ITCost;
            riskSummary.oneTimeDetail.NPECost[key] = oneTimeDetail.NPECost;
            riskSummary.oneTimeDetail.NPESaving[key] = oneTimeDetail.NPESaving;
            riskSummary.oneTimeDetail.NetWC[key] = oneTimeDetail.NetWC;
            riskSummary.oneTimeDetail.MarginGain[key] = oneTimeDetail.MarginGain;
            riskSummary.oneTimeDetail.MarginLoss[key] = oneTimeDetail.MarginLoss;

            var unamortizedOneTimeDetail = oneTimeValues.unamortizedOneTimeDetail;
            riskSummary.unamortizedOneTimeDetail.ITCost[key] = unamortizedOneTimeDetail.ITCost;
            riskSummary.unamortizedOneTimeDetail.NPECost[key] = unamortizedOneTimeDetail.NPECost;
            riskSummary.unamortizedOneTimeDetail.NPESaving[key] = unamortizedOneTimeDetail.NPESaving;
            riskSummary.unamortizedOneTimeDetail.NetWC[key] = unamortizedOneTimeDetail.NetWC;
            riskSummary.unamortizedOneTimeDetail.MarginGain[key] = unamortizedOneTimeDetail.MarginGain;
            riskSummary.unamortizedOneTimeDetail.MarginLoss[key] = unamortizedOneTimeDetail.MarginLoss;

            var cfOneTimeDetail = oneTimeValues.cfOneTimeDetail;
            riskSummary.cfOneTimeDetail.ITCost[key] = cfOneTimeDetail.ITCost;
            riskSummary.cfOneTimeDetail.NPECost[key] = cfOneTimeDetail.NPECost;
            riskSummary.cfOneTimeDetail.NPESaving[key] = cfOneTimeDetail.NPESaving;
            riskSummary.cfOneTimeDetail.NetWC[key] = cfOneTimeDetail.NetWC;
            riskSummary.cfOneTimeDetail.MarginGain[key] = cfOneTimeDetail.MarginGain;
            riskSummary.cfOneTimeDetail.MarginLoss[key] = cfOneTimeDetail.MarginLoss;


            var cfOneTimeAmortizedDetail = oneTimeValues.cfOneTimeAmortizedDetail;
            riskSummary.cfOneTimeAmortizedDetail.ITCost[key] = cfOneTimeAmortizedDetail.ITCost;
            riskSummary.cfOneTimeAmortizedDetail.NPECost[key] = cfOneTimeAmortizedDetail.NPECost;
            riskSummary.cfOneTimeAmortizedDetail.NPESaving[key] = cfOneTimeAmortizedDetail.NPESaving;
            riskSummary.cfOneTimeAmortizedDetail.NetWC[key] = cfOneTimeAmortizedDetail.NetWC;
            riskSummary.cfOneTimeAmortizedDetail.MarginGain[key] = cfOneTimeAmortizedDetail.MarginGain;
            riskSummary.cfOneTimeAmortizedDetail.MarginLoss[key] = cfOneTimeAmortizedDetail.MarginLoss;
        }).value();
    return riskSummary;
};

export const getRecommendationWiseValueSummary = (lineItemMonthlyValues, ideaRevenueLineItems) => {
    var riskSummary = {
        PL: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        CF: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        PLIdeas: [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]],
        CFIdeas: [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]],
        FteAdd: [0, 0, 0, 0],
        FteReduce: [0, 0, 0, 0],
        FteMultiGroupAdjustment: [0, 0, 0, 0],
        NetFTE: [0, 0, 0, 0],
        NetFTEIdeas: [[], [], [], []],
        RecurringNonPersonnelExpenses: [0, 0, 0, 0],
        RecurringPersonnelExpenses: [0, 0, 0, 0],
        OneTimeAdditions: [0, 0, 0, 0],
        OneTimeReductions: [0, 0, 0, 0],
        AmortizedOtherOneTime: [0, 0, 0, 0],
        AmortizedOtherOneTimeIdeas: [[], [], [], []],
        AmortizedITOneTime: [0, 0, 0, 0],
        AmortizedITOneTimeIdeas: [[], [], [], []],
        UnAmortizedOtherOneTime: [0, 0, 0, 0],
        UnAmortizedOtherOneTimeIdeas: [[], [], [], []],
        UnAmortizedITOneTime: [0, 0, 0, 0],
        UnAmortizedITOneTimeIdeas: [[], [], [], []],
        RecurringMargin: [0, 0, 0, 0],
        OneTimeMargin: [0, 0, 0, 0],
        RecurringRevenue: [0, 0, 0, 0],
        OneTimeRevenue: [0, 0, 0, 0],
        IdeaCount: [[], [], [], []],

        oneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        unamortizedOneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        cfOneTimeDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        },
        cfOneTimeAmortizedDetail: {
            ITCost: [0, 0, 0, 0],
            NPECost: [0, 0, 0, 0],
            NPESaving: [0, 0, 0, 0],
            NetWC: [0, 0, 0, 0],
            MarginGain: [0, 0, 0, 0],
            MarginLoss: [0, 0, 0, 0]
        }
    };
    var groupedRiskRating = _(lineItemMonthlyValues).groupBy('RecommendationType')
        .map((items, key) => {
            //key = RecommendationType
            riskSummary.IdeaCount[key] = ((_.uniqBy(items, 'IdeaId').length) > 0 ? _.uniqBy(items, 'IdeaId') : []);
            var cfandPLYearlyValues = getCFandPLYearlyValues(items)
            riskSummary.PL[key] = cfandPLYearlyValues.PL;
            riskSummary.CF[key] = cfandPLYearlyValues.CF;
            riskSummary.PLIdeas[key] = cfandPLYearlyValues.PLIdeas;
            riskSummary.CFIdeas[key] = cfandPLYearlyValues.CFIdeas;

            var fteDetail = getPersonnelFTEDetail(items);
            riskSummary.FteAdd[key] = fteDetail.fteAdd;
            riskSummary.FteReduce[key] = fteDetail.fteReduce;
            riskSummary.NetFTE[key] = fteDetail.netFte;
            riskSummary.NetFTEIdeas[key] = fteDetail.netFteIdeas;
            riskSummary.FteMultiGroupAdjustment[key] = fteDetail.multiGroupAdjustment;

            var npeValueSummary = getNonPersonnelValueSummary(items);
            riskSummary.RecurringNonPersonnelExpenses[key] = npeValueSummary.recurringNonPersonnelExpenses;
            riskSummary.RecurringPersonnelExpenses[key] = npeValueSummary.recurringPersonnelExpenses;
            riskSummary.OneTimeAdditions[key] = npeValueSummary.oneTimeAdditions;
            riskSummary.OneTimeReductions[key] = npeValueSummary.oneTimeReductions;
            riskSummary.AmortizedOtherOneTime[key] = npeValueSummary.amortizedOtherOneTime;
            riskSummary.AmortizedOtherOneTimeIdeas[key] = npeValueSummary.amortizedOtherOneTimeIdeas;
            riskSummary.AmortizedITOneTime[key] = npeValueSummary.amortizedITOneTime;
            riskSummary.AmortizedITOneTimeIdeas[key] = npeValueSummary.amortizedITOneTimeIdeas;

            riskSummary.UnAmortizedOtherOneTime[key] = npeValueSummary.unAmortizedOtherOneTime;
            riskSummary.UnAmortizedOtherOneTimeIdeas[key] = npeValueSummary.unAmortizedOtherOneTimeIdeas;
            riskSummary.UnAmortizedITOneTime[key] = npeValueSummary.unAmortizedITOneTime;
            riskSummary.UnAmortizedITOneTimeIdeas[key] = npeValueSummary.unAmortizedITOneTimeIdeas;

            var revenueValueSummary = getRevenueValueSummary(items, ideaRevenueLineItems);
            riskSummary.RecurringMargin[key] = revenueValueSummary.recurringMargin;
            riskSummary.OneTimeMargin[key] = revenueValueSummary.oneTimeMargin;
            riskSummary.RecurringRevenue[key] = revenueValueSummary.recurringRevenue;
            riskSummary.OneTimeRevenue[key] = revenueValueSummary.oneTimeRevenue;

            var oneTimeValues = getRiskWiseOneTimeDetail(items);
            var oneTimeDetail = oneTimeValues.oneTimeDetail;
            riskSummary.oneTimeDetail.ITCost[key] = oneTimeDetail.ITCost;
            riskSummary.oneTimeDetail.NPECost[key] = oneTimeDetail.NPECost;
            riskSummary.oneTimeDetail.NPESaving[key] = oneTimeDetail.NPESaving;
            riskSummary.oneTimeDetail.NetWC[key] = oneTimeDetail.NetWC;
            riskSummary.oneTimeDetail.MarginGain[key] = oneTimeDetail.MarginGain;
            riskSummary.oneTimeDetail.MarginLoss[key] = oneTimeDetail.MarginLoss;

            var unamortizedOneTimeDetail = oneTimeValues.unamortizedOneTimeDetail;
            riskSummary.unamortizedOneTimeDetail.ITCost[key] = unamortizedOneTimeDetail.ITCost;
            riskSummary.unamortizedOneTimeDetail.NPECost[key] = unamortizedOneTimeDetail.NPECost;
            riskSummary.unamortizedOneTimeDetail.NPESaving[key] = unamortizedOneTimeDetail.NPESaving;
            riskSummary.unamortizedOneTimeDetail.NetWC[key] = unamortizedOneTimeDetail.NetWC;
            riskSummary.unamortizedOneTimeDetail.MarginGain[key] = unamortizedOneTimeDetail.MarginGain;
            riskSummary.unamortizedOneTimeDetail.MarginLoss[key] = unamortizedOneTimeDetail.MarginLoss;

            var cfOneTimeDetail = oneTimeValues.cfOneTimeDetail;
            riskSummary.cfOneTimeDetail.ITCost[key] = cfOneTimeDetail.ITCost;
            riskSummary.cfOneTimeDetail.NPECost[key] = cfOneTimeDetail.NPECost;
            riskSummary.cfOneTimeDetail.NPESaving[key] = cfOneTimeDetail.NPESaving;
            riskSummary.cfOneTimeDetail.NetWC[key] = cfOneTimeDetail.NetWC;
            riskSummary.cfOneTimeDetail.MarginGain[key] = cfOneTimeDetail.MarginGain;
            riskSummary.cfOneTimeDetail.MarginLoss[key] = cfOneTimeDetail.MarginLoss;

        }).value();
    var priorGoDecision = _.filter(lineItemMonthlyValues, (item) => { return item.DecisionType === 1 });
    riskSummary.IdeaCount[3] = ((_.uniqBy(priorGoDecision, 'IdeaId').length) > 0 ? _.uniqBy(priorGoDecision, 'IdeaId') : []);
    var cfandPLYearlyValues = getCFandPLYearlyValues(priorGoDecision)
    riskSummary.PL[3] = cfandPLYearlyValues.PL;
    riskSummary.CF[3] = cfandPLYearlyValues.CF;
    riskSummary.PLIdeas[3] = cfandPLYearlyValues.PLIdeas;
    riskSummary.CFIdeas[3] = cfandPLYearlyValues.CFIdeas;

    var fteDetail = getPersonnelFTEDetail(priorGoDecision);
    riskSummary.FteAdd[3] = fteDetail.fteAdd;
    riskSummary.FteReduce[3] = fteDetail.fteReduce;
    riskSummary.NetFTE[3] = fteDetail.netFte;
    riskSummary.NetFTEIdeas[3] = fteDetail.netFteIdeas;
    riskSummary.FteMultiGroupAdjustment[3] = fteDetail.multiGroupAdjustment;

    var npeValueSummary = getNonPersonnelValueSummary(priorGoDecision);
    riskSummary.RecurringNonPersonnelExpenses[3] = npeValueSummary.recurringNonPersonnelExpenses;
    riskSummary.RecurringPersonnelExpenses[3] = npeValueSummary.recurringPersonnelExpenses;
    riskSummary.OneTimeAdditions[3] = npeValueSummary.oneTimeAdditions;
    riskSummary.OneTimeReductions[3] = npeValueSummary.oneTimeReductions;
    riskSummary.AmortizedOtherOneTime[3] = npeValueSummary.amortizedOtherOneTime;
    riskSummary.AmortizedOtherOneTimeIdeas[3] = npeValueSummary.amortizedOtherOneTimeIdeas;
    riskSummary.AmortizedITOneTime[3] = npeValueSummary.amortizedITOneTime;
    riskSummary.AmortizedITOneTimeIdeas[3] = npeValueSummary.amortizedITOneTimeIdeas;

    riskSummary.UnAmortizedOtherOneTime[3] = npeValueSummary.unAmortizedOtherOneTime;
    riskSummary.UnAmortizedOtherOneTimeIdeas[3] = npeValueSummary.unAmortizedOtherOneTimeIdeas;
    riskSummary.UnAmortizedITOneTime[3] = npeValueSummary.unAmortizedITOneTime;
    riskSummary.UnAmortizedITOneTimeIdeas[3] = npeValueSummary.unAmortizedITOneTimeIdeas;

    var revenueValueSummary = getRevenueValueSummary(priorGoDecision, ideaRevenueLineItems);
    riskSummary.RecurringMargin[3] = revenueValueSummary.recurringMargin;
    riskSummary.OneTimeMargin[3] = revenueValueSummary.oneTimeMargin;
    riskSummary.RecurringRevenue[3] = revenueValueSummary.recurringRevenue;
    riskSummary.OneTimeRevenue[3] = revenueValueSummary.oneTimeRevenue;

    var oneTimeValues = getRiskWiseOneTimeDetail(priorGoDecision);
    var oneTimeDetail = oneTimeValues.oneTimeDetail;
    riskSummary.oneTimeDetail.ITCost[3] = oneTimeDetail.ITCost;
    riskSummary.oneTimeDetail.NPECost[3] = oneTimeDetail.NPECost;
    riskSummary.oneTimeDetail.NPESaving[3] = oneTimeDetail.NPESaving;
    riskSummary.oneTimeDetail.NetWC[3] = oneTimeDetail.NetWC;
    riskSummary.oneTimeDetail.MarginGain[3] = oneTimeDetail.MarginGain;
    riskSummary.oneTimeDetail.MarginLoss[3] = oneTimeDetail.MarginLoss;

    var unamortizedOneTimeDetail = oneTimeValues.unamortizedOneTimeDetail;
    riskSummary.unamortizedOneTimeDetail.ITCost[3] = unamortizedOneTimeDetail.ITCost;
    riskSummary.unamortizedOneTimeDetail.NPECost[3] = unamortizedOneTimeDetail.NPECost;
    riskSummary.unamortizedOneTimeDetail.NPESaving[3] = unamortizedOneTimeDetail.NPESaving;
    riskSummary.unamortizedOneTimeDetail.NetWC[3] = unamortizedOneTimeDetail.NetWC;
    riskSummary.unamortizedOneTimeDetail.MarginGain[3] = unamortizedOneTimeDetail.MarginGain;
    riskSummary.unamortizedOneTimeDetail.MarginLoss[3] = unamortizedOneTimeDetail.MarginLoss;

    var cfOneTimeDetail = oneTimeValues.cfOneTimeDetail;
    riskSummary.cfOneTimeDetail.ITCost[3] = cfOneTimeDetail.ITCost;
    riskSummary.cfOneTimeDetail.NPECost[3] = cfOneTimeDetail.NPECost;
    riskSummary.cfOneTimeDetail.NPESaving[3] = cfOneTimeDetail.NPESaving;
    riskSummary.cfOneTimeDetail.NetWC[3] = cfOneTimeDetail.NetWC;
    riskSummary.cfOneTimeDetail.MarginGain[3] = cfOneTimeDetail.MarginGain;
    riskSummary.cfOneTimeDetail.MarginLoss[3] = cfOneTimeDetail.MarginLoss;
    return riskSummary;
};
//#endregion

export const getLineitemMonthlyValues = (lineItemMonthlyValues, ideaGroups) => {
    var lineItemMonthlyValues = Object.assign([], lineItemMonthlyValues);

    var ideaGroupsDictionary = prepareObjectFromArray(ideaGroups, ['IdeaId', 'GroupId']);
    var ideaGroupCost = null;

    _.map(lineItemMonthlyValues, (item) => {

        var ideaGroup = ideaGroupsDictionary[item.IdeaId.toLowerCase() + '-' + item.GroupId.toLowerCase()] ? ideaGroupsDictionary[item.IdeaId.toLowerCase() + '-' + item.GroupId.toLowerCase()] : null;
        if (ideaGroup) {
            item.ValueStatus = ideaGroup.ValueStatus;
            item.IdeaStatus = ideaGroup.IdeaStatus;
            item.ITValueStatus = ideaGroup.ITValueStatus;
            item.GLRiskRatingType = ideaGroup.GLRiskRatingType;
            item.PrimaryGLRiskRatingType = ideaGroup.PrimaryGLRiskRatingType;
            item.IsPrimaryGroup = ideaGroup.IsPrimary ? 1 : 0;
            item.PrimaryValueStatus = ideaGroup.PrimaryValueStatus
            item.RecommendationType = ideaGroup.RecommendationType;
            item.DecisionType = ideaGroup.DecisionType;
            item.IdeaGroupValueStatus = ideaGroup.ValueStatus;

            if (item.CostLineItemId !== null && item.CostGroupId !== null) {
                var ideaGroupCost = ideaGroupsDictionary[item.IdeaId.toLowerCase() + '-' + item.CostGroupId.toLowerCase()] ? ideaGroupsDictionary[item.IdeaId.toLowerCase() + '-' + item.CostGroupId.toLowerCase()] : null;
                if (ideaGroupCost) {
                    item.ValueStatus = ideaGroupCost.ValueStatus;
                }
            } else {
                item.ValueStatus = ideaGroup.ValueStatus;
            }
            // if (ideaGroup.ValueStatus == 1) {
            //     item.ValueStatus = (item.CostLineItemId === null) ? (item.IsRough ? 1 : 0) : 1;
            // } else if (ideaGroup.ValueStatus > 1) {
            //     item.ValueStatus = ideaGroup.ValueStatus;
            // }
        }
    }
    );
    lineItemMonthlyValues = _.filter(lineItemMonthlyValues, (item) => {
        return ((item.ValueStatus > 0 && !item.IsIT) || (item.IsIT && item.ITValueStatus >= 0))
    });

    return lineItemMonthlyValues;
};

