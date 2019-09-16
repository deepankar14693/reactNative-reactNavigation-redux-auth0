import _ from 'lodash';
import moment from 'moment';
import { filterByValues, prepareObjectFromArray } from '../../../common/utils';
import getArrayFromObject from 'object.values';
import numeral from 'numeral';

export const getSumOfArray = (arrayValues) => {
    return arrayValues.reduce(function (r, a) {
        a.forEach(function (b, i) {
            r[i] = (r[i] || 0) + b;
        });
        return r;
    }, []);
};

export const emptyArrayValues = (lineItemMonthlyValues, fieldName) => {
    return (_.map(lineItemMonthlyValues, fieldName)).reduce(function (r, a) {
        a.forEach(function (b, i) {
            r[i] = '';
        });
        return r;
    }, []);
};

export const plValues = (lineItemMonthlyValues, fieldName) => {
    return (_.map(lineItemMonthlyValues, fieldName)).reduce(function (r, a) {
        a.forEach(function (b, i) {
            r[i] = (r[i] || 0) + b;
        });
        return r;
    }, []);
};

export const cfValues = (otherLineItemCashFlow, personnelLineItemCashFlow, valueType, isYearlyValue) => {
    var cfMonthlyValues = [];
    var fieldName1 = '';
    var fieldName2 = '';

    switch (valueType) {
        case 1:
            if (isYearlyValue) {
                fieldName1 = 'CFYearlyValues'; fieldName2 = 'PLYearlyValues'; break;
            } else {
                fieldName1 = 'CFMonthlyValues'; fieldName2 = 'PLMonthlyValues'; break;
            }
        case 2:
            if (isYearlyValue) {
                fieldName1 = 'PlanCFYearlyValues'; fieldName2 = 'PlanPLYearlyValues'; break;
            } else {
                fieldName1 = 'PlanCFMonthlyValues'; fieldName2 = 'PlanPLMonthlyValues'; break;
            }
        case 3:
            if (isYearlyValue) {
                fieldName1 = 'ActualCFYearlyValues'; fieldName2 = 'ActualPLYearlyValues'; break;
            } else {
                fieldName1 = 'ActualCFMonthlyValues'; fieldName2 = 'ActualPLMonthlyValues'; break;
            }
    }

    if (otherLineItemCashFlow && otherLineItemCashFlow.length > 0) {
        cfMonthlyValues.push((_.map(otherLineItemCashFlow, fieldName1)).reduce(function (r, a) {
            a.forEach(function (b, i) {
                r[i] = (r[i] || 0) + b;
            });
            return r;
        }, []));
    }

    if (personnelLineItemCashFlow && personnelLineItemCashFlow.length > 0) {
        cfMonthlyValues.push((_.map(personnelLineItemCashFlow, fieldName2)).reduce(function (r, a) {
            a.forEach(function (b, i) {
                r[i] = (r[i] || 0) + b;
            });
            return r;
        }, []));
    }
    if (cfMonthlyValues.length > 0) {
        return cfMonthlyValues.reduce(function (r, a) {
            a.forEach(function (b, i) {
                r[i] = (r[i] || 0) + b;
            });
            return r;
        }, []);
    }
    return [];
};

export const varianceDollar = (array1, array2, inPeriod) => {
    return array1.map(function (item, index) {
        // In this case item correspond to currentValue of array a, 
        // using index to get value from array b
        if ((!item || item === 0) && (!array2[index] || array2[index] === 0)) return null;
        // else if (inPeriod && (!item || item === 0) && (!array2[index] || array2[index] === 0)) {
        //     return null;
        // }
        else {
            return _.subtract(numeral(item).format('0.0000000000'), numeral(array2[index]).format('0.0000000000'));
        }
    });
};

export const getCumulativeValues = (arrayValues) => {
    var cumulativeValues = [];
    arrayValues.reduce(function (a, b, i) { return cumulativeValues[i] = a + b; }, 0);
    return cumulativeValues;
};

export const variancePercentage = (array1, array2) => {
    return array1.map(function (item, index) {
        // In this case item correspond to currentValue of array a, 
        // using index to get value from array b
        if ((!item || item === 0) && (!array2[index] || array2[index] === 0)) return null;
        else {
            return item ? (_.divide(item, array2[index] ? Math.abs(array2[index]) : 1)) : 0;
        }
    });
};

export const dollarImpactAnnualized = (lineItemMonthlyValues, timings) => {
    var annualizedSummary = [
        {
            Target: { monthlyValues: [], yearlyValues: [], inPeriodMonthlyValues: [], inPeriodYearlyValues: [] }
        }, {
            Plan: { monthlyValues: [], yearlyValues: [], inPeriodMonthlyValues: [], inPeriodYearlyValues: [] }
        }, {
            Actual: { monthlyValues: [], yearlyValues: [], inPeriodMonthlyValues: [], inPeriodYearlyValues: [] }
        }
    ];

    var timingArray = _.map(timings, 'value');
    var _lineItemMonthlyValues = _.cloneDeep(lineItemMonthlyValues);
    _.map(_lineItemMonthlyValues, (item) => {
        item.LineItemTiming = item.Timing ? moment.utc(item.Timing).format('YYYYMM') : timingArray[timingArray.length - 1]
        item.LineItemPlanTiming = item.PlanTiming ? moment.utc(item.PlanTiming).format('YYYYMM') : timingArray[timingArray.length - 1]
        item.LineItemActualTiming = item.ActualTiming ? moment.utc(item.ActualTiming).format('YYYYMM') : timingArray[timingArray.length - 1]
    });

    var timingData = _.cloneDeep(timings);
    _.map(timingData, (item) => {
        item.MonthlyTargetValues = 0;
        item.YearlyTargetValues = 0;
        item.InPeriodYearlyTargetValues = 0;

        item.MonthlyPlanValues = 0;
        item.YearlyPlanValues = 0;
        item.InPeriodYearlyPlanValues = 0;

        item.MonthlyActualValues = 0;
        item.YearlyActualValues = 0;
        item.InPeriodYearlyActualValues = 0;
    });

    var yearlyData = _.map(timingData, _.partialRight(_.pick, ['fiscalYear', 'YearlyTargetValues', 'YearlyPlanValues', 'YearlyActualValues']));
    var yearlyTrackingValues = _.uniqBy(yearlyData, 'fiscalYear');

    var timingMonthDictionary = prepareObjectFromArray(timingData, ['value']);
    var timingYearDictionary = prepareObjectFromArray(yearlyTrackingValues, ['fiscalYear']);

    //Target Values
    var groupedLineItemMonthlyValues = _(_lineItemMonthlyValues).groupBy('LineItemTiming')
        .map((items, key) => {
            if (timingMonthDictionary[key]) {
                timingMonthDictionary[key].MonthlyTargetValues = _.sumBy(items, 'Value');
            }
        }).value();

    //Plan Values
    var groupedLineItemMonthlyValues = _(_lineItemMonthlyValues).groupBy('LineItemPlanTiming')
        .map((items, key) => {
            if (timingMonthDictionary[key]) {
                timingMonthDictionary[key].MonthlyPlanValues = _.sumBy(items, 'PlanValue');
            }
        }).value();

    //actual Values
    var groupedLineItemMonthlyValues = _(_lineItemMonthlyValues).groupBy('LineItemActualTiming')
        .map((items, key) => {
            if (timingMonthDictionary[key]) {
                timingMonthDictionary[key].MonthlyActualValues = _.sumBy(items, 'ActualValue');
            }
        }).value();

    var arrayTimingValues = getArrayFromObject(timingMonthDictionary);
    var targetMonthlyValues = _.map(arrayTimingValues, 'MonthlyTargetValues');
    var planMonthlyValues = _.map(arrayTimingValues, 'MonthlyPlanValues');
    var actualMonthlyValues = _.map(arrayTimingValues, 'MonthlyActualValues');

    var cumulativeTargetValues = getCumulativeValues(targetMonthlyValues);
    var cumulativePlanValues = getCumulativeValues(planMonthlyValues);
    var cumulativeActualValues = getCumulativeValues(actualMonthlyValues);

    var groupedLineItemYearlyValues = _(arrayTimingValues).groupBy('fiscalYear')
        .map((items, key) => {
            if (timingYearDictionary[key]) {
                var index = _.findIndex(arrayTimingValues, ['value', items[items.length - 1].value]);
                timingYearDictionary[key].YearlyTargetValues = cumulativeTargetValues[index];
                timingYearDictionary[key].YearlyPlanValues = cumulativePlanValues[index];
                timingYearDictionary[key].YearlyActualValues = cumulativeActualValues[index];

                timingYearDictionary[key].InPeriodYearlyTargetValues = _.sumBy(items, 'MonthlyTargetValues');
                timingYearDictionary[key].InPeriodYearlyPlanValues = _.sumBy(items, 'MonthlyPlanValues');
                timingYearDictionary[key].InPeriodYearlyActualValues = _.sumBy(items, 'MonthlyActualValues');

            }
        }).value();


    var monthlyValues = [];
    var yearlyTargetValues = _.map(timingYearDictionary, 'YearlyTargetValues');
    var yearlyPlanValues = _.map(timingYearDictionary, 'YearlyPlanValues');
    var yearlyActualValues = _.map(timingYearDictionary, 'YearlyActualValues');

    var inPeriodYearlyTargetValues = _.map(timingYearDictionary, 'InPeriodYearlyTargetValues');
    var inPeriodYearlyPlanValues = _.map(timingYearDictionary, 'InPeriodYearlyPlanValues');
    var inPeriodYearlyActualValues = _.map(timingYearDictionary, 'InPeriodYearlyActualValues');

    annualizedSummary[0].Target.monthlyValues = cumulativeTargetValues;
    annualizedSummary[0].Target.yearlyValues = yearlyTargetValues;
    annualizedSummary[0].Target.inPeriodMonthlyValues = targetMonthlyValues;
    annualizedSummary[0].Target.inPeriodYearlyValues = inPeriodYearlyTargetValues;

    annualizedSummary[1].Plan.monthlyValues = cumulativePlanValues;
    annualizedSummary[1].Plan.yearlyValues = yearlyPlanValues;
    annualizedSummary[1].Plan.inPeriodMonthlyValues = planMonthlyValues;
    annualizedSummary[1].Plan.inPeriodYearlyValues = inPeriodYearlyPlanValues;

    annualizedSummary[2].Actual.monthlyValues = cumulativeActualValues;
    annualizedSummary[2].Actual.yearlyValues = yearlyActualValues;
    annualizedSummary[2].Actual.inPeriodMonthlyValues = actualMonthlyValues;
    annualizedSummary[2].Actual.inPeriodYearlyValues = inPeriodYearlyActualValues;

    return annualizedSummary;
};

export const completionTrackerList = (lineItemMonthlyValues, timings) => {
    var personnelLineItemCashFlow = _.filter(lineItemMonthlyValues, (item) => {
        return item.LineItemType === 2
    });

    var otherLineItemCashFlow = _.filter(lineItemMonthlyValues, (item) => {
        return (item.LineItemType === 1 || item.LineItemType === 3)
    });

    var trackingValues = {
        empty: { MonthlyValues: [], YearlyValues: [] },
        target: {
            AnnualizedMonthlyValues: [],
            AnnualizedYearlyValues: [],
            AnnualizedInPeriodMonthlyValues: [],
            AnnualizedInPeriodYearlyValues: [],
            PLMonthlyValues: [],
            PLYearlyValues: [],
            CFMonthlyValues: [],
            CFYearlyValues: [],
            PLCumulativeMonthlyValues: [],
            PLCumulativeYearlyValues: [],
            CFCumulativeMonthlyValues: [],
            CFCumulativeYearlyValues: [],
        },
        plan: [
            {
                AnnualizedMonthlyValues: [],
                AnnualizedYearlyValues: [],
                AnnualizedInPeriodMonthlyValues: [],
                AnnualizedInPeriodYearlyValues: [],
                PLMonthlyValues: [],
                PLYearlyValues: [],
                CFMonthlyValues: [],
                CFYearlyValues: [],
                PLCumulativeMonthlyValues: [],
                PLCumulativeYearlyValues: [],
                CFCumulativeMonthlyValues: [],
                CFCumulativeYearlyValues: [],
            }
        ],
        actual: [
            {
                AnnualizedMonthlyValues: [],
                AnnualizedYearlyValues: [],
                AnnualizedInPeriodMonthlyValues: [],
                AnnualizedInPeriodYearlyValues: [],
                PLMonthlyValues: [],
                PLYearlyValues: [],
                CFMonthlyValues: [],
                CFYearlyValues: [],
                PLCumulativeMonthlyValues: [],
                PLCumulativeYearlyValues: [],
                CFCumulativeMonthlyValues: [],
                CFCumulativeYearlyValues: [],
            }
        ],
        targetPlanMonthlyVariance: [
            {
                AnnualizedVariance: [],
                AnnualizedPercentage: [],
                AnnualizedInPeriodVariance: [],
                AnnualizedInPeriodPercentage: [],
                PLVariance: [],
                PLPercentage: [],
                CFVariance: [],
                CFPercentage: [],
                PLCumulativeVariance: [],
                PLCumulativePercentage: [],
                CFCumulativeVariance: [],
                CFCumulativePercentage: [],
            }
        ],
        targetPlanYearlyVariance: [
            {
                AnnualizedVariance: [],
                AnnualizedPercentage: [],
                AnnualizedInPeriodVariance: [],
                AnnualizedInPeriodPercentage: [],
                PLVariance: [],
                PLPercentage: [],
                CFVariance: [],
                CFPercentage: [],
                PLCumulativeVariance: [],
                PLCumulativePercentage: [],
                CFCumulativeVariance: [],
                CFCumulativePercentage: [],
            }
        ],
        planActualMonthlyVariance: [
            {
                AnnualizedVariance: [],
                AnnualizedPercentage: [],
                AnnualizedInPeriodVariance: [],
                AnnualizedInPeriodPercentage: [],
                PLVariance: [],
                PLPercentage: [],
                CFVariance: [],
                CFPercentage: [],
                PLCumulativeVariance: [],
                PLCumulativePercentage: [],
                CFCumulativeVariance: [],
                CFCumulativePercentage: [],
            }
        ],
        planActualYearlyVariance: [
            {
                AnnualizedVariance: [],
                AnnualizedPercentage: [],
                AnnualizedInPeriodVariance: [],
                AnnualizedInPeriodPercentage: [],
                PLVariance: [],
                PLPercentage: [],
                CFVariance: [],
                CFPercentage: [],
                PLCumulativeVariance: [],
                PLCumulativePercentage: [],
                CFCumulativeVariance: [],
                CFCumulativePercentage: [],
            }
        ],
        targetActualMonthlyVariance: [
            {
                AnnualizedVariance: [],
                AnnualizedPercentage: [],
                AnnualizedInPeriodVariance: [],
                AnnualizedInPeriodPercentage: [],
                PLVariance: [],
                PLPercentage: [],
                CFVariance: [],
                CFPercentage: [],
                PLCumulativeVariance: [],
                PLCumulativePercentage: [],
                CFCumulativeVariance: [],
                CFCumulativePercentage: [],
            }
        ],
        targetActualYearlyVariance: [
            {
                AnnualizedVariance: [],
                AnnualizedPercentage: [],
                AnnualizedInPeriodVariance: [],
                AnnualizedInPeriodPercentage: [],
                PLVariance: [],
                PLPercentage: [],
                CFVariance: [],
                CFPercentage: [],
                PLCumulativeVariance: [],
                PLCumulativePercentage: [],
                CFCumulativeVariance: [],
                CFCumulativePercentage: [],
            }
        ]
    };

    trackingValues.empty.MonthlyValues = emptyArrayValues(lineItemMonthlyValues, 'PLMonthlyValues');
    trackingValues.empty.YearlyValues = emptyArrayValues(lineItemMonthlyValues, 'PLYearlyValues');

    //#region  P&L Values
    //In-Period
    trackingValues.target.PLMonthlyValues = plValues(lineItemMonthlyValues, 'PLMonthlyValues');
    trackingValues.target.PLYearlyValues = plValues(lineItemMonthlyValues, 'PLYearlyValues');
    trackingValues.plan.PLMonthlyValues = plValues(lineItemMonthlyValues, 'PlanPLMonthlyValues');
    trackingValues.plan.PLYearlyValues = plValues(lineItemMonthlyValues, 'PlanPLYearlyValues');
    trackingValues.actual.PLMonthlyValues = plValues(lineItemMonthlyValues, 'ActualPLMonthlyValues');
    trackingValues.actual.PLYearlyValues = plValues(lineItemMonthlyValues, 'ActualPLYearlyValues');
    //Cumulative
    trackingValues.target.PLCumulativeMonthlyValues = getCumulativeValues(trackingValues.target.PLMonthlyValues);
    trackingValues.target.PLCumulativeYearlyValues = getCumulativeValues(trackingValues.target.PLYearlyValues);
    trackingValues.plan.PLCumulativeMonthlyValues = getCumulativeValues(trackingValues.plan.PLMonthlyValues);
    trackingValues.plan.PLCumulativeYearlyValues = getCumulativeValues(trackingValues.plan.PLYearlyValues);
    trackingValues.actual.PLCumulativeMonthlyValues = getCumulativeValues(trackingValues.actual.PLMonthlyValues);
    trackingValues.actual.PLCumulativeYearlyValues = getCumulativeValues(trackingValues.actual.PLYearlyValues);
    //#endregion

    //#region  Cash Flow Values
    //In-Period
    trackingValues.target.CFMonthlyValues = cfValues(otherLineItemCashFlow, personnelLineItemCashFlow, 1, false);
    trackingValues.target.CFYearlyValues = cfValues(otherLineItemCashFlow, personnelLineItemCashFlow, 1, true);
    trackingValues.plan.CFMonthlyValues = cfValues(otherLineItemCashFlow, personnelLineItemCashFlow, 2, false);
    trackingValues.plan.CFYearlyValues = cfValues(otherLineItemCashFlow, personnelLineItemCashFlow, 2, true);
    trackingValues.actual.CFMonthlyValues = cfValues(otherLineItemCashFlow, personnelLineItemCashFlow, 3, false);
    trackingValues.actual.CFYearlyValues = cfValues(otherLineItemCashFlow, personnelLineItemCashFlow, 3, true);
    //Cumulative
    trackingValues.target.CFCumulativeMonthlyValues = getCumulativeValues(trackingValues.target.CFMonthlyValues);
    trackingValues.target.CFCumulativeYearlyValues = getCumulativeValues(trackingValues.target.CFYearlyValues);
    trackingValues.plan.CFCumulativeMonthlyValues = getCumulativeValues(trackingValues.plan.CFMonthlyValues);
    trackingValues.plan.CFCumulativeYearlyValues = getCumulativeValues(trackingValues.plan.CFYearlyValues);
    trackingValues.actual.CFCumulativeMonthlyValues = getCumulativeValues(trackingValues.actual.CFMonthlyValues);
    trackingValues.actual.CFCumulativeYearlyValues = getCumulativeValues(trackingValues.actual.CFYearlyValues);
    //#endregion

    //#region Anualized Values
    var annualizedSummary = dollarImpactAnnualized(lineItemMonthlyValues, timings);
    //Cumulative
    trackingValues.target.AnnualizedMonthlyValues = annualizedSummary[0].Target.monthlyValues;
    trackingValues.target.AnnualizedYearlyValues = annualizedSummary[0].Target.yearlyValues;
    //In-Period
    trackingValues.target.AnnualizedInPeriodMonthlyValues = annualizedSummary[0].Target.inPeriodMonthlyValues;
    trackingValues.target.AnnualizedInPeriodYearlyValues = annualizedSummary[0].Target.inPeriodYearlyValues;

    //Cumulative
    trackingValues.plan.AnnualizedMonthlyValues = annualizedSummary[1].Plan.monthlyValues;
    trackingValues.plan.AnnualizedYearlyValues = annualizedSummary[1].Plan.yearlyValues;
    //In-Period
    trackingValues.plan.AnnualizedInPeriodMonthlyValues = annualizedSummary[1].Plan.inPeriodMonthlyValues;
    trackingValues.plan.AnnualizedInPeriodYearlyValues = annualizedSummary[1].Plan.inPeriodYearlyValues;

    //Actual
    //Cumulative
    trackingValues.actual.AnnualizedMonthlyValues = annualizedSummary[2].Actual.monthlyValues;
    trackingValues.actual.AnnualizedYearlyValues = annualizedSummary[2].Actual.yearlyValues;
    //In-Period
    trackingValues.actual.AnnualizedInPeriodMonthlyValues = annualizedSummary[2].Actual.inPeriodMonthlyValues;
    trackingValues.actual.AnnualizedInPeriodYearlyValues = annualizedSummary[2].Actual.inPeriodYearlyValues;
    //#endregion

    //#region Variance Target v/s Plan
    //$ Variance
    trackingValues.targetPlanMonthlyVariance.AnnualizedVariance = varianceDollar(trackingValues.plan.AnnualizedMonthlyValues, trackingValues.target.AnnualizedMonthlyValues);
    trackingValues.targetPlanYearlyVariance.AnnualizedVariance = varianceDollar(trackingValues.plan.AnnualizedYearlyValues, trackingValues.target.AnnualizedYearlyValues);

    trackingValues.targetPlanMonthlyVariance.AnnualizedInPeriodVariance = varianceDollar(trackingValues.plan.AnnualizedInPeriodMonthlyValues, trackingValues.target.AnnualizedInPeriodMonthlyValues, true);
    trackingValues.targetPlanYearlyVariance.AnnualizedInPeriodVariance = varianceDollar(trackingValues.plan.AnnualizedInPeriodYearlyValues, trackingValues.target.AnnualizedInPeriodYearlyValues, true);

    trackingValues.targetPlanMonthlyVariance.PLVariance = varianceDollar(trackingValues.plan.PLMonthlyValues, trackingValues.target.PLMonthlyValues);
    trackingValues.targetPlanYearlyVariance.PLVariance = varianceDollar(trackingValues.plan.PLYearlyValues, trackingValues.target.PLYearlyValues);

    trackingValues.targetPlanMonthlyVariance.PLCumulativeVariance = varianceDollar(trackingValues.plan.PLCumulativeMonthlyValues, trackingValues.target.PLCumulativeMonthlyValues);
    trackingValues.targetPlanYearlyVariance.PLCumulativeVariance = varianceDollar(trackingValues.plan.PLCumulativeYearlyValues, trackingValues.target.PLCumulativeYearlyValues);

    trackingValues.targetPlanMonthlyVariance.CFVariance = varianceDollar(trackingValues.plan.CFMonthlyValues, trackingValues.target.CFMonthlyValues);
    trackingValues.targetPlanYearlyVariance.CFVariance = varianceDollar(trackingValues.plan.CFYearlyValues, trackingValues.target.CFYearlyValues);

    trackingValues.targetPlanMonthlyVariance.CFCumulativeVariance = varianceDollar(trackingValues.plan.CFCumulativeMonthlyValues, trackingValues.target.CFCumulativeMonthlyValues);
    trackingValues.targetPlanYearlyVariance.CFCumulativeVariance = varianceDollar(trackingValues.plan.CFCumulativeYearlyValues, trackingValues.target.CFCumulativeYearlyValues);

    //% Variance
    trackingValues.targetPlanMonthlyVariance.AnnualizedPercentage = variancePercentage(trackingValues.targetPlanMonthlyVariance.AnnualizedVariance, trackingValues.target.AnnualizedMonthlyValues);
    trackingValues.targetPlanYearlyVariance.AnnualizedPercentage = variancePercentage(trackingValues.targetPlanYearlyVariance.AnnualizedVariance, trackingValues.target.AnnualizedYearlyValues);

    trackingValues.targetPlanMonthlyVariance.AnnualizedInPeriodPercentage = variancePercentage(trackingValues.targetPlanMonthlyVariance.AnnualizedInPeriodVariance, trackingValues.target.AnnualizedInPeriodMonthlyValues);
    trackingValues.targetPlanYearlyVariance.AnnualizedInPeriodPercentage = variancePercentage(trackingValues.targetPlanYearlyVariance.AnnualizedInPeriodVariance, trackingValues.target.AnnualizedInPeriodYearlyValues);

    trackingValues.targetPlanMonthlyVariance.PLPercentage = variancePercentage(trackingValues.targetPlanMonthlyVariance.PLVariance, trackingValues.target.PLMonthlyValues);
    trackingValues.targetPlanYearlyVariance.PLPercentage = variancePercentage(trackingValues.targetPlanYearlyVariance.PLVariance, trackingValues.target.PLYearlyValues);

    trackingValues.targetPlanMonthlyVariance.PLCumulativePercentage = variancePercentage(trackingValues.targetPlanMonthlyVariance.PLCumulativeVariance, trackingValues.target.PLCumulativeMonthlyValues);
    trackingValues.targetPlanYearlyVariance.PLCumulativePercentage = variancePercentage(trackingValues.targetPlanYearlyVariance.PLCumulativeVariance, trackingValues.target.PLCumulativeYearlyValues);

    trackingValues.targetPlanMonthlyVariance.CFPercentage = variancePercentage(trackingValues.targetPlanMonthlyVariance.CFVariance, trackingValues.target.CFMonthlyValues);
    trackingValues.targetPlanYearlyVariance.CFPercentage = variancePercentage(trackingValues.targetPlanYearlyVariance.CFVariance, trackingValues.target.CFYearlyValues);

    trackingValues.targetPlanMonthlyVariance.CFCumulativePercentage = variancePercentage(trackingValues.targetPlanMonthlyVariance.CFCumulativeVariance, trackingValues.target.CFCumulativeMonthlyValues);
    trackingValues.targetPlanYearlyVariance.CFCumulativePercentage = variancePercentage(trackingValues.targetPlanYearlyVariance.CFCumulativeVariance, trackingValues.target.CFCumulativeYearlyValues);
    //#endregion

    //#region Variance Plan v/s Actual
    //$ Variance
    trackingValues.planActualMonthlyVariance.AnnualizedVariance = varianceDollar(trackingValues.actual.AnnualizedMonthlyValues, trackingValues.plan.AnnualizedMonthlyValues);
    trackingValues.planActualYearlyVariance.AnnualizedVariance = varianceDollar(trackingValues.actual.AnnualizedYearlyValues, trackingValues.plan.AnnualizedYearlyValues);

    trackingValues.planActualMonthlyVariance.AnnualizedInPeriodVariance = varianceDollar(trackingValues.actual.AnnualizedInPeriodMonthlyValues, trackingValues.plan.AnnualizedInPeriodMonthlyValues, true);
    trackingValues.planActualYearlyVariance.AnnualizedInPeriodVariance = varianceDollar(trackingValues.actual.AnnualizedInPeriodYearlyValues, trackingValues.plan.AnnualizedInPeriodYearlyValues, true);

    trackingValues.planActualMonthlyVariance.PLVariance = varianceDollar(trackingValues.actual.PLMonthlyValues, trackingValues.plan.PLMonthlyValues);
    trackingValues.planActualYearlyVariance.PLVariance = varianceDollar(trackingValues.actual.PLYearlyValues, trackingValues.plan.PLYearlyValues);

    trackingValues.planActualMonthlyVariance.PLCumulativeVariance = varianceDollar(trackingValues.actual.PLCumulativeMonthlyValues, trackingValues.plan.PLCumulativeMonthlyValues);
    trackingValues.planActualYearlyVariance.PLCumulativeVariance = varianceDollar(trackingValues.actual.PLCumulativeYearlyValues, trackingValues.plan.PLCumulativeYearlyValues);

    trackingValues.planActualMonthlyVariance.CFVariance = varianceDollar(trackingValues.actual.CFMonthlyValues, trackingValues.plan.CFMonthlyValues);
    trackingValues.planActualYearlyVariance.CFVariance = varianceDollar(trackingValues.actual.CFYearlyValues, trackingValues.plan.CFYearlyValues);

    trackingValues.planActualMonthlyVariance.CFCumulativeVariance = varianceDollar(trackingValues.actual.CFCumulativeMonthlyValues, trackingValues.plan.CFCumulativeMonthlyValues);
    trackingValues.planActualYearlyVariance.CFCumulativeVariance = varianceDollar(trackingValues.actual.CFCumulativeYearlyValues, trackingValues.plan.CFCumulativeYearlyValues);

    //% Variance
    trackingValues.planActualMonthlyVariance.AnnualizedPercentage = variancePercentage(trackingValues.planActualMonthlyVariance.AnnualizedVariance, trackingValues.plan.AnnualizedMonthlyValues);
    trackingValues.planActualYearlyVariance.AnnualizedPercentage = variancePercentage(trackingValues.planActualYearlyVariance.AnnualizedVariance, trackingValues.plan.AnnualizedYearlyValues);

    trackingValues.planActualMonthlyVariance.AnnualizedInPeriodPercentage = variancePercentage(trackingValues.planActualMonthlyVariance.AnnualizedInPeriodVariance, trackingValues.plan.AnnualizedInPeriodMonthlyValues);
    trackingValues.planActualYearlyVariance.AnnualizedInPeriodPercentage = variancePercentage(trackingValues.planActualYearlyVariance.AnnualizedInPeriodVariance, trackingValues.plan.AnnualizedInPeriodYearlyValues);

    trackingValues.planActualMonthlyVariance.PLPercentage = variancePercentage(trackingValues.planActualMonthlyVariance.PLVariance, trackingValues.plan.PLMonthlyValues);
    trackingValues.planActualYearlyVariance.PLPercentage = variancePercentage(trackingValues.planActualYearlyVariance.PLVariance, trackingValues.plan.PLYearlyValues);

    trackingValues.planActualMonthlyVariance.PLCumulativePercentage = variancePercentage(trackingValues.planActualMonthlyVariance.PLCumulativeVariance, trackingValues.plan.PLCumulativeMonthlyValues);
    trackingValues.planActualYearlyVariance.PLCumulativePercentage = variancePercentage(trackingValues.planActualYearlyVariance.PLCumulativeVariance, trackingValues.plan.PLCumulativeYearlyValues);

    trackingValues.planActualMonthlyVariance.CFPercentage = variancePercentage(trackingValues.planActualMonthlyVariance.CFVariance, trackingValues.plan.CFMonthlyValues);
    trackingValues.planActualYearlyVariance.CFPercentage = variancePercentage(trackingValues.planActualYearlyVariance.CFVariance, trackingValues.plan.CFYearlyValues);

    trackingValues.planActualMonthlyVariance.CFCumulativePercentage = variancePercentage(trackingValues.planActualMonthlyVariance.CFCumulativeVariance, trackingValues.plan.CFCumulativeMonthlyValues);
    trackingValues.planActualYearlyVariance.CFCumulativePercentage = variancePercentage(trackingValues.planActualYearlyVariance.CFCumulativeVariance, trackingValues.plan.CFCumulativeYearlyValues);
    //#endregion

    //#region Variance Target v/s Actual
    //$ Variance
    trackingValues.targetActualMonthlyVariance.AnnualizedVariance = varianceDollar(trackingValues.actual.AnnualizedMonthlyValues, trackingValues.target.AnnualizedMonthlyValues);
    trackingValues.targetActualYearlyVariance.AnnualizedVariance = varianceDollar(trackingValues.actual.AnnualizedYearlyValues, trackingValues.target.AnnualizedYearlyValues);

    trackingValues.targetActualMonthlyVariance.AnnualizedInPeriodVariance = varianceDollar(trackingValues.actual.AnnualizedInPeriodMonthlyValues, trackingValues.target.AnnualizedInPeriodMonthlyValues, true);
    trackingValues.targetActualYearlyVariance.AnnualizedInPeriodVariance = varianceDollar(trackingValues.actual.AnnualizedInPeriodYearlyValues, trackingValues.target.AnnualizedInPeriodYearlyValues, true);

    trackingValues.targetActualMonthlyVariance.PLVariance = varianceDollar(trackingValues.actual.PLMonthlyValues, trackingValues.target.PLMonthlyValues);
    trackingValues.targetActualYearlyVariance.PLVariance = varianceDollar(trackingValues.actual.PLYearlyValues, trackingValues.target.PLYearlyValues);

    trackingValues.targetActualMonthlyVariance.PLCumulativeVariance = varianceDollar(trackingValues.actual.PLCumulativeMonthlyValues, trackingValues.target.PLCumulativeMonthlyValues);
    trackingValues.targetActualYearlyVariance.PLCumulativeVariance = varianceDollar(trackingValues.actual.PLCumulativeYearlyValues, trackingValues.target.PLCumulativeYearlyValues);

    trackingValues.targetActualMonthlyVariance.CFVariance = varianceDollar(trackingValues.actual.CFMonthlyValues, trackingValues.target.CFMonthlyValues);
    trackingValues.targetActualYearlyVariance.CFVariance = varianceDollar(trackingValues.actual.CFYearlyValues, trackingValues.target.CFYearlyValues);

    trackingValues.targetActualMonthlyVariance.CFCumulativeVariance = varianceDollar(trackingValues.actual.CFCumulativeMonthlyValues, trackingValues.target.CFCumulativeMonthlyValues);
    trackingValues.targetActualYearlyVariance.CFCumulativeVariance = varianceDollar(trackingValues.actual.CFCumulativeYearlyValues, trackingValues.target.CFCumulativeYearlyValues);

    //% Variance
    trackingValues.targetActualMonthlyVariance.AnnualizedPercentage = variancePercentage(trackingValues.targetActualMonthlyVariance.AnnualizedVariance, trackingValues.target.AnnualizedMonthlyValues);
    trackingValues.targetActualYearlyVariance.AnnualizedPercentage = variancePercentage(trackingValues.targetActualYearlyVariance.AnnualizedVariance, trackingValues.target.AnnualizedYearlyValues);

    trackingValues.targetActualMonthlyVariance.AnnualizedInPeriodPercentage = variancePercentage(trackingValues.targetActualMonthlyVariance.AnnualizedInPeriodVariance, trackingValues.target.AnnualizedInPeriodMonthlyValues);
    trackingValues.targetActualYearlyVariance.AnnualizedInPeriodPercentage = variancePercentage(trackingValues.targetActualYearlyVariance.AnnualizedInPeriodVariance, trackingValues.target.AnnualizedInPeriodYearlyValues);

    trackingValues.targetActualMonthlyVariance.PLPercentage = variancePercentage(trackingValues.targetActualMonthlyVariance.PLVariance, trackingValues.target.PLMonthlyValues);
    trackingValues.targetActualYearlyVariance.PLPercentage = variancePercentage(trackingValues.targetActualYearlyVariance.PLVariance, trackingValues.target.PLYearlyValues);

    trackingValues.targetActualMonthlyVariance.PLCumulativePercentage = variancePercentage(trackingValues.targetActualMonthlyVariance.PLCumulativeVariance, trackingValues.target.PLCumulativeMonthlyValues);
    trackingValues.targetActualYearlyVariance.PLCumulativePercentage = variancePercentage(trackingValues.targetActualYearlyVariance.PLCumulativeVariance, trackingValues.target.PLCumulativeYearlyValues);

    trackingValues.targetActualMonthlyVariance.CFPercentage = variancePercentage(trackingValues.targetActualMonthlyVariance.CFVariance, trackingValues.target.CFMonthlyValues);
    trackingValues.targetActualYearlyVariance.CFPercentage = variancePercentage(trackingValues.targetActualYearlyVariance.CFVariance, trackingValues.target.CFYearlyValues);

    trackingValues.targetActualMonthlyVariance.CFCumulativePercentage = variancePercentage(trackingValues.targetActualMonthlyVariance.CFCumulativeVariance, trackingValues.target.CFCumulativeMonthlyValues);
    trackingValues.targetActualYearlyVariance.CFCumulativePercentage = variancePercentage(trackingValues.targetActualYearlyVariance.CFCumulativeVariance, trackingValues.target.CFCumulativeYearlyValues);
    //#endregion

    return trackingValues;
};


export const getCompletionTrackerList = (timings, lineItemList, trackerScopeType, selectedIdeaId) => {
    var trackingData = [];
    var lineItems = [];
    if (lineItemList.length > 0) {
        lineItems = lineItemList;
        if (trackerScopeType === 2) {
            if (selectedIdeaId !== null) {
                lineItems = _.filter(lineItems, { 'IdeaId': selectedIdeaId });
            } else {
                lineItems = []
            }
        }
        trackingData = completionTrackerList(lineItems, timings);
    }
    return trackingData;
};

