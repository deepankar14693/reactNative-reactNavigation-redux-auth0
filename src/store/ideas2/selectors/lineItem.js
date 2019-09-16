import _ from 'lodash';
import { prepareObjectFromArray } from '../../../common/utils';

const revenueDetails = (lineItemDetailType, lineItems) => {
    switch (lineItemDetailType) {
        case 'RecurringSubTotal':
        case 'RecurringMargin':
            return _.filter(lineItems, (item) => _.includes([11, 12], item.LineItemSubType) && !item.CostLineItemId);
        case 'MarginOneTimeAmrt':
            return _.filter(lineItems, (item) => _.includes([13, 14], item.LineItemSubType) && !item.CostLineItemId);
        case 'OneTimeAmrtSubTotal':
            return _.filter(lineItems, (item) => _.includes([13, 14], item.LineItemSubType) && !item.CostLineItemId);
        case 'TotalGroupValue':
            return _.filter(lineItems, (item) => _.includes([11, 12, 13, 14], item.LineItemSubType) && !item.CostLineItemId);
        case 'MultiGroupAdjustment':
            return _.filter(lineItems, (item) => _.includes([11, 12, 13, 14], item.LineItemSubType) && item.CostLineItemId);
        case 'AdjustmentGroupValue':
            return _.filter(lineItems, (item) => _.includes([11, 12, 13, 14], item.LineItemSubType));
        case 'P&L':
        case 'CashFlow':
            return lineItems;
        case 'TargetValue':
        case 'PlanValue':
        case 'ActualValue':
        case 'PlanPL':
        case 'ActualPL':
        case 'VariancePL':
        case 'PlanCF':
        case 'ActualCF':
        case 'VarianceCF':
            return _.filter(lineItems, (item) => !item.CostLineItemId);
        case 'MarginGain':
            return _.filter(lineItems, (item) => _.includes([14], item.LineItemSubType));
        case 'MarginLoss':
            return _.filter(lineItems, (item) => _.includes([13], item.LineItemSubType));
        default: break;
    }
}

const peDetails = (lineItemDetailType, lineItems) => {
    switch (lineItemDetailType) {
        case 'RecurringSubTotal':
        case 'PERecurring':
        case 'TotalGroupValue':
            return _.filter(lineItems, (item) => _.includes([21, 22, 25], item.LineItemSubType) && !item.CostLineItemId);
        case 'MultiGroupAdjustment':
            return _.filter(lineItems, (item) => _.includes([21, 22, 25], item.LineItemSubType) && item.CostLineItemId);
        case 'AdjustmentGroupValue':
            return _.filter(lineItems, (item) => _.includes([21, 22, 25], item.LineItemSubType));
        case 'P&L':
        case 'CashFlow':
            return lineItems;
        case 'TargetValue':
        case 'PlanValue':
        case 'ActualValue':
        case 'PlanPL':
        case 'ActualPL':
        case 'VariancePL':
        case 'PlanCF':
        case 'ActualCF':
        case 'VarianceCF':
            return _.filter(lineItems, (item) => !item.CostLineItemId);
        case 'PEReduce':
        case 'ReductionsFTE':
            return _.filter(lineItems, (item) => _.includes([22, 25], item.LineItemSubType));
        case 'PEAdd':
        case 'AdditionsFTE':
            return _.filter(lineItems, (item) => _.includes([21, 25], item.LineItemSubType));
        case 'NetFTE':
        case 'Net$':
            return _.filter(lineItems, (item) => _.includes([21, 22, 25], item.LineItemSubType));

        default: break;
    }
}

const npeDetails = (lineItemDetailType, lineItems) => {
    switch (lineItemDetailType) {
        case 'RecurringSubTotal':
        case 'NPERecurring':
            return _.filter(lineItems, (item) => _.includes([31, 32, 42], item.LineItemSubType) && !item.CostLineItemId);
        case 'ITOneTimeAmrt':
            return _.filter(lineItems, (item) => _.includes([41], item.LineItemSubType) && !item.CostLineItemId);
        case 'NPEOneTimeAmrt':
            return _.filter(lineItems, (item) => _.includes([33, 34, 35, 36], item.LineItemSubType) && !item.CostLineItemId);
        case 'OneTimeAmrtSubTotal':
            return _.filter(lineItems, (item) => _.includes([33, 34, 35, 36, 41], item.LineItemSubType) && !item.CostLineItemId);
        case 'TotalGroupValue':
            return _.filter(lineItems, (item) => _.includes([31, 32, 33, 34, 35, 36, 41, 42], item.LineItemSubType) && !item.CostLineItemId);
        case 'MultiGroupAdjustment':
            return _.filter(lineItems, (item) => _.includes([31, 32, 33, 34, 35, 36, 41, 42], item.LineItemSubType) && item.CostLineItemId);
        case 'AdjustmentGroupValue':
            return _.filter(lineItems, (item) => _.includes([31, 32, 33, 34, 35, 36, 41, 42], item.LineItemSubType));
        case 'P&L':
        case 'CashFlow':
            return lineItems;
        case 'TargetValue':
        case 'PlanValue':
        case 'ActualValue':
        case 'PlanPL':
        case 'ActualPL':
        case 'VariancePL':
        case 'PlanCF':
        case 'ActualCF':
        case 'VarianceCF':
            return _.filter(lineItems, (item) => !item.CostLineItemId);
        case 'NPESaving':
            return _.filter(lineItems, (item) => _.includes([33], item.LineItemSubType) && !item.IsWorkingCapital && !item.IsRecurring);
        case 'NPESpend':
            return _.filter(lineItems, (item) => _.includes([34], item.LineItemSubType) && !item.IsWorkingCapital && !item.IsRecurring);
        case 'ITSpend':
            return _.filter(lineItems, (item) => _.includes([41], item.LineItemSubType) && item.IsIT && !item.IsWorkingCapital);
        case 'NetWC':
            return _.filter(lineItems, (item) => !item.IsIT && item.IsWorkingCapital);
        default: break;
    }
}
const getFromGroupInfo = (costLineItemId, lineItems, type) => {
    let costLineItem = [];
    switch (type) {
        case 2:
            costLineItem = lineItems.filter(function (el) { return el.PersonnelLineItemId === costLineItemId });
            break;
        case 3:
            costLineItem = lineItems.filter(function (el) { return el.NonPersonnelLineItemId === costLineItemId });
            break;
        case 1:
            costLineItem = lineItems.filter(function (el) { return el.RevenueLineItemId === costLineItemId });
            break;
    }

    if (costLineItem.length > 0) {
        return costLineItem[0].GroupId;

    } else {
        return null;
    }

}
export const calculationDetails = (ideaData, ideaId, groupId, lineType, lineItemDetailType, isCompanyValue) => {
    let lineItems = { npe: [], pe: [], revenue: [] };
    const ideaGroups = isCompanyValue ? _.filter(ideaData.ideaGroups, { IdeaId: ideaId }) : _.filter(ideaData.ideaGroups, { IdeaId: ideaId, GroupId: groupId });
    const dictionaryIdeaGroups = prepareObjectFromArray(ideaGroups, ['IdeaId', 'GroupId']);
    let ideaPersonnelLineItems = [];
    let ideaNonPersonnelLineItems = []
    let ideaRevenueLineItems = [];

    //#region Revenue
    if (lineType == 0 || lineType === 1) {
        const ideaREVLineItems = _.filter(ideaData.ideaRevenueLineItems, { IdeaId: ideaId });
        ideaRevenueLineItems = isCompanyValue ? _.filter(ideaData.ideaRevenueLineItems, { IdeaId: ideaId }) : _.filter(ideaData.ideaRevenueLineItems, { IdeaId: ideaId, GroupId: groupId });
        ideaRevenueLineItems = _.filter(ideaRevenueLineItems, (item) => {
            const ideaGroup = dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId];
            item['CostGroupId'] = getFromGroupInfo(item.CostLineItemId, ideaREVLineItems, 1);
            return (
                1 === (
                    (
                        ideaGroup ? (ideaGroup.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (ideaGroup.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)) : 1
                    )
                )
            )
        });
        ideaRevenueLineItems = revenueDetails(lineItemDetailType, ideaRevenueLineItems);
    }
    //#endregion

    //#region PE
    if (lineType == 0 || lineType === 2) {
        const ideaPELineItems = _.filter(ideaData.ideaPersonnelLineItems, { IdeaId: ideaId });
        ideaPersonnelLineItems = isCompanyValue ? _.filter(ideaData.ideaPersonnelLineItems, { IdeaId: ideaId }) : _.filter(ideaData.ideaPersonnelLineItems, { IdeaId: ideaId, GroupId: groupId });
        ideaPersonnelLineItems = _.filter(ideaPersonnelLineItems, (item) => {
            const ideaGroup = dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId];
            item['CostGroupId'] = getFromGroupInfo(item.CostLineItemId, ideaPELineItems, 2);
            return (
                1 === (
                    (
                        ideaGroup ? (ideaGroup.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (ideaGroup.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)) : 1
                    )
                    ||
                    (
                        (ideaGroup && ideaGroup.Idea) ? ideaGroup.Idea.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (ideaGroup.Idea.ITValueStatus > 1 && item.IsIT ? 1 : 0) : 1
                    )
                )
            )
        });
        ideaPersonnelLineItems = peDetails(lineItemDetailType, ideaPersonnelLineItems);
    }
    //#endregion

    //#region NPE
    if (lineType == 0 || lineType === 3) {
        const ideaNPELineItems = _.filter(ideaData.ideaNonPersonnelLineItems, { IdeaId: ideaId });
        ideaNonPersonnelLineItems = isCompanyValue ? _.filter(ideaData.ideaNonPersonnelLineItems, { IdeaId: ideaId }) : _.filter(ideaData.ideaNonPersonnelLineItems, { IdeaId: ideaId, GroupId: groupId });
        ideaNonPersonnelLineItems = _.filter(ideaNonPersonnelLineItems, (item) => {
            const ideaGroup = dictionaryIdeaGroups[item.IdeaId + '-' + item.GroupId];
            item['CostGroupId'] = getFromGroupInfo(item.CostLineItemId, ideaNPELineItems, 3);
            return (
                1 === (
                    (
                        ideaGroup ? (ideaGroup.ValueStatus === 1 ? (item.IsRough === true ? 1 : 0) : (ideaGroup.ValueStatus > 1 && !item.IsRough && !item.IsIT ? 1 : 0)) : 1
                    )
                    ||
                    (
                        (ideaGroup && ideaGroup.Idea) ? ideaGroup.Idea.ITValueStatus < 2 ? ((item.IsRough === true && item.IsIT === true) ? 1 : 0) : (ideaGroup.Idea.ITValueStatus > 1 && item.IsIT ? 1 : 0) : 1
                    )
                )
            )
        });

        ideaNonPersonnelLineItems = npeDetails(lineItemDetailType, ideaNonPersonnelLineItems);
    }
    //#endregion

    lineItems.npe = ideaNonPersonnelLineItems;
    lineItems.pe = ideaPersonnelLineItems;
    lineItems.revenue = ideaRevenueLineItems;
    return lineItems;
};

