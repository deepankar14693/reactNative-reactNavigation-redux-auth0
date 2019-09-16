import _ from 'lodash';
import { filterByValues, filterFunctionalTitles, prepareObjectFromArray, getLineTypeLabel, getDirectionTypeLabel } from '../../../common/utils';
import { implementationStatusLabels, getImplementationStatusLabel } from '../../../common/constants';

export const getGoIdeaLineItems = (goIdeas, state) => {
    var filteredGroupId = state.ideaGroupFilter.groupId;
    var ideas = _.groupBy(goIdeas, 'IdeaId');
    var goIdeaIds = _.map(goIdeas, 'IdeaId');
    var allIdeas = _.groupBy(state.ideas.ideas, 'IdeaId');
    var implementationStatus = _.groupBy(implementationStatusLabels, 'value');
    var isCompanyView = false;

    if (filteredGroupId === '00000000-0000-0000-0000-000000000000') {
        isCompanyView = true;
    }

    var goIdeaLineItems = filterByValues(state.lineItemMonthlyValueData.lineItemMonthlyValues, 'IdeaId', goIdeaIds);

    if (isCompanyView) {
        goIdeaLineItems = _.cloneDeep(_.filter(goIdeaLineItems,
            (item) => { return !item.IsRough && item.CostLineItemId === null && item.IsComplete === true && item.LineItemType > 0 }));
    } else {
        goIdeaLineItems = _.cloneDeep(_.filter(goIdeaLineItems,
            (item) => { return item.GroupId === filteredGroupId && !item.IsRough && item.CostLineItemId === null && item.IsComplete === true && item.LineItemType > 0 }));
    }

    var goIdeasNPELineItems = filterByValues(state.ideas.ideaNonPersonnelLineItems, 'IdeaId', goIdeaIds);
    var goIdeasPELineItems = filterByValues(state.ideas.ideaPersonnelLineItems, 'IdeaId', goIdeaIds);
    var goIdeasRevenueLineItems = filterByValues(state.ideas.ideaRevenueLineItems, 'IdeaId', goIdeaIds);

    if (!isCompanyView) {
        goIdeasNPELineItems = _.filter(goIdeasNPELineItems, { 'GroupId': filteredGroupId });
        goIdeasPELineItems = _.filter(goIdeasPELineItems, { 'GroupId': filteredGroupId });
        goIdeasRevenueLineItems = _.filter(goIdeasRevenueLineItems, { 'GroupId': filteredGroupId });
    }
    var npeLineItems = _.groupBy(goIdeasNPELineItems, 'EntityId');
    var peLineItems = _.groupBy(goIdeasPELineItems, 'EntityId');
    var revenueLineItems = _.groupBy(goIdeasRevenueLineItems, 'EntityId');

    var functionalTitles = prepareObjectFromArray(filterFunctionalTitles(state.functionalTitles), ['FunctionalTitleId', 'GroupId']);

    _.map(goIdeaLineItems, (item) => {
        var idea = ideas[item.IdeaId] ? ideas[item.IdeaId][0] : null;
        if (idea) {
            item.IdeaNumber = idea.IdeaNumber;
            item.GroupName = state.masterData.groups[item.GroupId] ? state.masterData.groups[item.GroupId].Name : '';
            item.Title = idea.Title;
            item.Description = idea.Description;
            item.IdeaGroupId = idea.IdeaGroupId;
            item.FocusAreaId = allIdeas[item.IdeaId].length > 0 ? allIdeas[item.IdeaId][0].FocusAreaId : '';
            item.FocusArea = allIdeas[item.IdeaId].length > 0 ? allIdeas[item.IdeaId][0].FocusArea : '';
            item.PlanLockedException = idea.PlanLockedException;
        }
        if (item.LineItemType === 3) {
            var npeLineItem = npeLineItems[item.EntityId] ? npeLineItems[item.EntityId][0] : null;
            if (npeLineItem) {
                item.LineNumber = npeLineItem.LineNumber;
                item.LineType = getLineTypeLabel(item.LineItemType, item.LineItemSubType);
                item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, false);
                item.IT = item.IsIT ? 'Y' : '';
                item.ImplementationStatus = npeLineItem.ImplementationStatus;
                item.StatusName = getImplementationStatusLabel(npeLineItem.ImplementationStatus, true);
                item.LineItemAmount = npeLineItem.Amount;
                item.Category = npeLineItem.Category ? npeLineItem.Category : '';
                item.Notes = npeLineItem.Notes;
                item.Center = npeLineItem.Center;

                item.LineItemPlanAmount = npeLineItem.PlanAmount;
                item.LineItemPlanValue = npeLineItem.PlanValue;
                item.PlanNotes = npeLineItem.PlanNotes;
                item.PlanRampType = npeLineItem.PlanRampType;
                item.PlanRampMonths = npeLineItem.PlanRampMonths;
                item.PlanRampValues = npeLineItem.PlanRampValues;

                item.LineItemActualAmount = npeLineItem.ActualAmount;
                item.LineItemActualValue = npeLineItem.ActualValue;
                item.ActualNotes = npeLineItem.ActualNotes;
                item.ActualRampType = npeLineItem.ActualRampType;
                item.ActualRampMonths = npeLineItem.ActualRampMonths;
                item.ActualRampValues = npeLineItem.ActualRampValues;
                switch (item.LineItemSubType) {
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 41:
                        item.PlanAmortizationPeriod = npeLineItem.PlanAmortizationPeriod; break;
                    default:
                        item.AmortizationPeriod = '';
                        item.PlanAmortizationPeriod = '';
                        break;
                }
            }
        }
        else if (item.LineItemType === 2) {
            var peLineItem = peLineItems[item.EntityId] ? peLineItems[item.EntityId][0] : null;
            if (peLineItem) {
                item.LineNumber = peLineItem.LineNumber;
                item.LineType = getLineTypeLabel(item.LineItemType, item.LineItemSubType);
                item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, false);
                item.IT = item.IsIT ? 'Y' : '';
                item.ImplementationStatus = peLineItem.ImplementationStatus;
                item.StatusName = getImplementationStatusLabel(peLineItem.ImplementationStatus, true);
                item.AmortizationPeriod = '';
                item.LineItemAmount = peLineItem.PersonnelCount;
                item.CompRange = peLineItem.SalaryRange;
                item.Category = functionalTitles[peLineItem.FunctionalTitleId + '-' + peLineItem.GroupId] ? functionalTitles[peLineItem.FunctionalTitleId + '-' + peLineItem.GroupId].Name : '';
                item.Notes = peLineItem.Notes;
                item.AverageSalary = peLineItem.AverageSalary;
                item.Center = peLineItem.Center;

                item.LineItemPlanAmount = peLineItem.PlanPersonnelCount;
                item.LineItemPlanValue = peLineItem.PlanValue;
                item.PlanAmortizationPeriod = '';
                item.PlanNotes = peLineItem.PlanNotes;
                item.PlanRampType = null;
                item.PlanRampMonths = null;
                item.PlanRampValues = null;

                item.LineItemActualAmount = peLineItem.ActualPersonnelCount;
                item.LineItemActualValue = peLineItem.ActualValue;
                item.ActualNotes = peLineItem.ActualNotes;
                item.ActualRampType = null;
                item.ActualRampMonths = null;
                item.ActualRampValues = null;
            }
        }
        else if (item.LineItemType === 1) {
            var revenueLineItem = revenueLineItems[item.EntityId] ? revenueLineItems[item.EntityId][0] : null;
            if (revenueLineItem) {
                item.LineNumber = revenueLineItem.LineNumber;
                item.LineType = getLineTypeLabel(item.LineItemType, item.LineItemSubType);
                item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, true);
                item.IT = item.IsIT ? 'Y' : '';
                item.ImplementationStatus = revenueLineItem.ImplementationStatus;
                item.StatusName = getImplementationStatusLabel(revenueLineItem.ImplementationStatus, true);
                item.LineItemAmount = revenueLineItem.MarginChange;
                item.Category = revenueLineItem.Category ? revenueLineItem.Category : '';
                item.Notes = revenueLineItem.Notes;
                item.Center = revenueLineItem.Center;

                item.LineItemPlanAmount = revenueLineItem.PlanMarginChange;
                item.LineItemPlanValue = revenueLineItem.PlanValue;
                item.PlanNotes = revenueLineItem.PlanNotes;
                item.PlanRampType = revenueLineItem.PlanRampType;
                item.PlanRampMonths = revenueLineItem.PlanRampMonths;
                item.PlanRampValues = revenueLineItem.PlanRampValues;

                item.LineItemActualAmount = revenueLineItem.ActualMarginChange;
                item.LineItemActualValue = revenueLineItem.ActualValue;
                item.ActualNotes = revenueLineItem.ActualNotes;
                item.ActualRampType = revenueLineItem.ActualRampType;
                item.ActualRampMonths = revenueLineItem.ActualRampMonths;
                item.ActualRampValues = revenueLineItem.ActualRampValues;
                switch (item.LineItemSubType) {
                    case 13:
                    case 14:
                        item.PlanAmortizationPeriod = revenueLineItem.PlanAmortizationPeriod; break;
                    default:
                        item.AmortizationPeriod = '';
                        item.PlanAmortizationPeriod = '';
                        break;
                }
            }
        }
    });

    var sortedGoIdeaLineItems = _.orderBy(goIdeaLineItems, ['CreatedOn', 'IdeaNumber', 'GroupName'], ['asc', 'asc', 'asc']);
    return sortedGoIdeaLineItems;
};

export const getLineItemsByIdeaGroups = (goIdeaGroups, ideaPersonnelLineItems, ideaNonPersonnelLineItems, ideaRevenueLineItems, filteredGroupId, masterDataFunctionalTitles) => {
    const goIdeaIds = _.uniq(_.map(goIdeaGroups, 'IdeaId'));
    let isCompanyView = false;
    if (filteredGroupId === '00000000-0000-0000-0000-000000000000') {
        isCompanyView = true;
    }

    let goIdeasNPELineItems = [];
    let goIdeasPELineItems = [];
    let goIdeasRevenueLineItems = [];

    if (isCompanyView) {
        goIdeasNPELineItems = _.filter(filterByValues(ideaNonPersonnelLineItems, 'IdeaId', goIdeaIds), (item) => { return !item.IsRough && item.CostLineItemId === null && item.IsComplete === true });
        goIdeasPELineItems = _.filter(filterByValues(ideaPersonnelLineItems, 'IdeaId', goIdeaIds), (item) => { return !item.IsRough && item.CostLineItemId === null && item.IsComplete === true });
        goIdeasRevenueLineItems = _.filter(filterByValues(ideaRevenueLineItems, 'IdeaId', goIdeaIds), (item) => { return !item.IsRough && item.CostLineItemId === null && item.IsComplete === true });
    } else {
        goIdeasNPELineItems = _.filter(filterByValues(ideaNonPersonnelLineItems, 'IdeaId', goIdeaIds), (item) => { return item.GroupId === filteredGroupId && !item.IsRough && item.CostLineItemId === null && item.IsComplete === true });
        goIdeasPELineItems = _.filter(filterByValues(ideaPersonnelLineItems, 'IdeaId', goIdeaIds), (item) => { return item.GroupId === filteredGroupId && !item.IsRough && item.CostLineItemId === null && item.IsComplete === true });
        goIdeasRevenueLineItems = _.filter(filterByValues(ideaRevenueLineItems, 'IdeaId', goIdeaIds), (item) => { return item.GroupId === filteredGroupId && !item.IsRough && item.CostLineItemId === null && item.IsComplete === true });
    }

    const functionalTitles = prepareObjectFromArray(filterFunctionalTitles(masterDataFunctionalTitles), ['FunctionalTitleId', 'GroupId']);

    _.map(goIdeasNPELineItems, (item) => {
        const ideaGroupArray = _.filter(goIdeaGroups, { 'IdeaId': item.IdeaId, 'GroupId': item.GroupId });
        const ideaGroup = ideaGroupArray.length > 0 ? ideaGroupArray[0] : null;
        if (ideaGroup) {
            item.IdeaNumber = ideaGroup.Idea.IdeaNumber;
            item.GroupName = ideaGroup.Idea.PrimaryGroupName;
            item.PrimaryGroupName = ideaGroup.Idea.PrimaryGroupName;
            item.CurrentGroupName = ideaGroup.GroupName;
            item.Title = ideaGroup.Idea.Title;
            item.Description = ideaGroup.Idea.Description;
            item.IdeaGroupId = ideaGroup.IdeaGroupId;
            item.FocusAreaId = ideaGroup.FocusAreaId;
            item.FocusArea = ideaGroup.FocusAreaName;
            item.PlanLockedException = ideaGroup.Idea.PlanLockedException;
        }
        item.LineItemType = 3;
        item.LineType = getLineTypeLabel(3, item.LineItemSubType);
        item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, false);
        item.IT = item.IsIT ? 'Y' : '';
        item.StatusName = getImplementationStatusLabel(item.ImplementationStatus, true);
        item.LineItemAmount = item.Amount;
        item.LineItemPlanAmount = item.PlanAmount;
        item.LineItemPlanValue = item.PlanValue;
        item.LineItemActualAmount = item.ActualAmount;
        item.LineItemActualValue = item.ActualValue;
        switch (item.LineItemSubType) {
            case 33:
            case 34:
            case 35:
            case 36:
            case 41:
                item.PlanAmortizationPeriod = item.PlanAmortizationPeriod; break;
            default:
                item.AmortizationPeriod = '';
                item.PlanAmortizationPeriod = '';
                break;
        }
    });

    _.map(goIdeasPELineItems, (item) => {
        const ideaGroupArray = _.filter(goIdeaGroups, { 'IdeaId': item.IdeaId, 'GroupId': item.GroupId });
        const ideaGroup = ideaGroupArray.length > 0 ? ideaGroupArray[0] : null;
        if (ideaGroup) {
            item.IdeaNumber = ideaGroup.Idea.IdeaNumber;
            item.GroupName = ideaGroup.Idea.PrimaryGroupName;
            item.PrimaryGroupName = ideaGroup.Idea.PrimaryGroupName;
            item.Title = ideaGroup.Idea.Title;
            item.Description = ideaGroup.Idea.Description;
            item.CurrentGroupName = ideaGroup.GroupName;
            item.IdeaGroupId = ideaGroup.IdeaGroupId;
            item.FocusAreaId = ideaGroup.FocusAreaId;
            item.FocusArea = ideaGroup.FocusAreaName;
            item.PlanLockedException = ideaGroup.Idea.PlanLockedException;
        }
        item.LineItemType = 2;
        item.LineType = getLineTypeLabel(2, item.LineItemSubType);
        item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, false);
        item.IT = item.IsIT ? 'Y' : '';
        item.StatusName = getImplementationStatusLabel(item.ImplementationStatus, true);
        item.AmortizationPeriod = '';
        item.LineItemAmount = item.PersonnelCount;
        item.CompRange = item.SalaryRange;
        item.Category = functionalTitles[item.FunctionalTitleId + '-' + item.GroupId] ? functionalTitles[item.FunctionalTitleId + '-' + item.GroupId].Name : '';
        item.LineItemPlanAmount = item.PlanPersonnelCount;
        item.LineItemPlanValue = item.PlanValue;
        item.PlanAmortizationPeriod = '';
        item.PlanRampType = null;
        item.PlanRampMonths = null;
        item.PlanRampValues = null;
        item.LineItemActualAmount = item.ActualPersonnelCount;
        item.LineItemActualValue = item.ActualValue;
        item.ActualRampType = null;
        item.ActualRampMonths = null;
        item.ActualRampValues = null;
    });

    _.map(goIdeasRevenueLineItems, (item) => {
        const ideaGroupArray = _.filter(goIdeaGroups, { 'IdeaId': item.IdeaId, 'GroupId': item.GroupId });
        const ideaGroup = ideaGroupArray.length > 0 ? ideaGroupArray[0] : null;
        if (ideaGroup) {
            item.IdeaNumber = ideaGroup.Idea.IdeaNumber;
            item.GroupName = ideaGroup.Idea.PrimaryGroupName;
            item.PrimaryGroupName = ideaGroup.Idea.PrimaryGroupName;
            item.Title = ideaGroup.Idea.Title;
            item.Description = ideaGroup.Idea.Description;
            item.CurrentGroupName = ideaGroup.GroupName;
            item.IdeaGroupId = ideaGroup.IdeaGroupId;
            item.FocusAreaId = ideaGroup.FocusAreaId;
            item.FocusArea = ideaGroup.FocusAreaName;
            item.PlanLockedException = ideaGroup.Idea.PlanLockedException;
        }
        item.LineItemType = 1;
        item.LineType = getLineTypeLabel(1, item.LineItemSubType);
        item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, true);
        item.IT = item.IsIT ? 'Y' : '';
        item.StatusName = getImplementationStatusLabel(item.ImplementationStatus, true);
        item.LineItemAmount = item.MarginChange;
        item.Category = item.Category ? item.Category : '';
        item.LineItemPlanAmount = item.PlanMarginChange;
        item.LineItemPlanValue = item.PlanValue;
        item.LineItemActualAmount = item.ActualMarginChange;
        item.LineItemActualValue = item.ActualValue;
        switch (item.LineItemSubType) {
            case 13:
            case 14:
                item.PlanAmortizationPeriod = item.PlanAmortizationPeriod; break;
            default:
                item.AmortizationPeriod = '';
                item.PlanAmortizationPeriod = '';
                break;
        }
    });

    const lineItemMonthlyValues = _.concat(goIdeasNPELineItems, goIdeasPELineItems, goIdeasRevenueLineItems);
    const sortedGoIdeaLineItems = _.orderBy(lineItemMonthlyValues, ['CreatedOn', 'IdeaNumber', 'GroupName'], ['asc', 'asc', 'asc']);
    return sortedGoIdeaLineItems;
};

export const getNPELineItemSubType = (IsRecurring, DirectionType, IsIT, IsWorkingCapital) => {
    let lineItemSubType = 0;
    switch (IsRecurring) {
        case false:
            if (DirectionType === 1) {
                lineItemSubType = 33; //OneTime Saving (Decrease)
            }
            else {
                if (IsIT === false) {
                    lineItemSubType = 34; //OneTime Cost (Increase)
                }
                else if (IsIT === true) {
                    lineItemSubType = 41; //IT One Time Cost (Increase)
                }
            }
            break;
        case true:
            if (!IsWorkingCapital) {
                if (DirectionType === 1) {
                    lineItemSubType = 31; //Recurring Saving (Decrease)
                }
                else if (DirectionType === -1) {
                    if (IsIT === false) {
                        lineItemSubType = 32; //Recurring Cost (Increase)
                    }
                    else if (IsIT === true) {
                        lineItemSubType = 42; //IT Recurring Cost (Increase)
                    }
                }
            }
            else if (IsWorkingCapital === true) {
                if (DirectionType === 1) {
                    lineItemSubType = 35; //Working Capital Saving (Decrease)
                }
                else {
                    if (IsIT === false) {
                        lineItemSubType = 36; //Working Capital Cost (Increase)
                    }
                    else if (IsIT === true) {
                        lineItemSubType = 41; //IT One Time Cost (Increase)
                    }
                }
            }
            break;
        default: break;
    }
    return lineItemSubType;
}

export const getPELineItemSubType = (DirectionType, IsIT) => {
    let lineItemSubType = 0;
    switch (DirectionType) {
        case 1:
            lineItemSubType = 22;//Personnel Reduce (Savings/Decrease)
            break;
        case -1:
            if (!IsIT) {
                lineItemSubType = 21; //Personnel Add (Cost/Increase)
            }
            else if (IsIT === true) {
                lineItemSubType = 25; //IT Personnel Add (Cost/Increase)
            }
            break;
        default: break;
    }
    return lineItemSubType;
}

export const getRevenueLineItemSubType = (DirectionType, IsRecurring) => {
    let lineItemSubType = 0;
    switch (IsRecurring) {
        case true:
            if (DirectionType === 1) {
                lineItemSubType = 11;//Recurring Margin Saving
            }
            else if (DirectionType === -1) {
                lineItemSubType = 12;//Recurring Margin Cost
            }
            break;
        case false:
            if (DirectionType === 1) {
                lineItemSubType = 13;//OneTime Margin Saving
            }
            else if (DirectionType === -1) {
                lineItemSubType = 14;//OneTime Margin Cost
            }
            break;
        default: break;
    }
    return lineItemSubType;
}

const getIdeaGroupInfo = (ideaGroups, groupId, ideaId) => {
    const filteredIdeaGroup = _.filter(ideaGroups, (e) => { return e.IdeaId === ideaId && e.groupId === groupId })
    if (filteredIdeaGroup.length > 0) {
        return filteredIdeaGroup[0];
    } else {
        return null;
    }
}

export const getGoIdeaGroupsLineItems = (goIdeaGroups, filteredGroupId, lineItemMonthlyValues, ideaNonPersonnelLineItems, ideaPersonnelLineItems, ideaRevenueLineItems, masterDataFunctionalTitles) => {
    const goIdeaIds = _.uniq(_.map(goIdeaGroups, 'IdeaId'));
    let isCompanyView = false;

    if (filteredGroupId === '00000000-0000-0000-0000-000000000000') {
        isCompanyView = true;
    }

    let goIdeaLineItems = filterByValues(lineItemMonthlyValues, 'IdeaId', goIdeaIds);

    if (isCompanyView) {
        goIdeaLineItems = _.cloneDeep(_.filter(goIdeaLineItems,
            (item) => { return !item.IsRough && item.CostLineItemId === null && item.IsComplete === true && item.LineItemType > 0 }));
    } else {
        goIdeaLineItems = _.cloneDeep(_.filter(goIdeaLineItems,
            (item) => { return item.GroupId === filteredGroupId && !item.IsRough && item.CostLineItemId === null && item.IsComplete === true && item.LineItemType > 0 }));
    }

    let goIdeasNPELineItems = filterByValues(ideaNonPersonnelLineItems, 'IdeaId', goIdeaIds);
    let goIdeasPELineItems = filterByValues(ideaPersonnelLineItems, 'IdeaId', goIdeaIds);
    let goIdeasRevenueLineItems = filterByValues(ideaRevenueLineItems, 'IdeaId', goIdeaIds);

    if (!isCompanyView) {
        goIdeasNPELineItems = _.filter(goIdeasNPELineItems, { 'GroupId': filteredGroupId });
        goIdeasPELineItems = _.filter(goIdeasPELineItems, { 'GroupId': filteredGroupId });
        goIdeasRevenueLineItems = _.filter(goIdeasRevenueLineItems, { 'GroupId': filteredGroupId });
    }
    const npeLineItems = _.groupBy(goIdeasNPELineItems, 'EntityId');
    const peLineItems = _.groupBy(goIdeasPELineItems, 'EntityId');
    const revenueLineItems = _.groupBy(goIdeasRevenueLineItems, 'EntityId');
    const functionalTitles = prepareObjectFromArray(filterFunctionalTitles(masterDataFunctionalTitles), ['FunctionalTitleId', 'GroupId']);

    _.map(goIdeaLineItems, (item) => {
        const ideaGroupInfo = getIdeaGroupInfo(goIdeaGroups, item.GroupId, item.IdeaId);
        if (ideaGroupInfo) {
            item.IdeaNumber = ideaGroupInfo.Idea.IdeaNumber;
            item.GroupName = ideaGroupInfo.GroupName;
            item.Title = ideaGroupInfo.Idea.Title;
            item.Description = ideaGroupInfo.Idea.Description;
            item.IdeaGroupId = ideaGroupInfo.IdeaGroupId;
            item.FocusAreaId = ideaGroupInfo.FocusAreaId;
            item.FocusArea = ideaGroupInfo.FocusAreaName;
            item.PlanLockedException = ideaGroupInfo.PlanLockedException;
        }
        if (item.LineItemType === 3) {
            const npeLineItem = npeLineItems[item.EntityId] ? npeLineItems[item.EntityId][0] : null;
            if (npeLineItem) {
                item.LineNumber = npeLineItem.LineNumber;
                item.LineType = getLineTypeLabel(item.LineItemType, item.LineItemSubType);
                item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, false);
                item.IT = item.IsIT ? 'Y' : '';
                item.ImplementationStatus = npeLineItem.ImplementationStatus;
                item.StatusName = getImplementationStatusLabel(npeLineItem.ImplementationStatus, true);
                item.LineItemAmount = npeLineItem.Amount;
                item.Category = npeLineItem.Category ? npeLineItem.Category : '';
                item.Notes = npeLineItem.Notes;
                item.Center = npeLineItem.Center;
                item.LineItemPlanAmount = npeLineItem.PlanAmount;
                item.LineItemPlanValue = npeLineItem.PlanValue;
                item.PlanNotes = npeLineItem.PlanNotes;
                item.PlanRampType = npeLineItem.PlanRampType;
                item.PlanRampMonths = npeLineItem.PlanRampMonths;
                item.PlanRampValues = npeLineItem.PlanRampValues;
                item.LineItemActualAmount = npeLineItem.ActualAmount;
                item.LineItemActualValue = npeLineItem.ActualValue;
                item.ActualNotes = npeLineItem.ActualNotes;
                item.ActualRampType = npeLineItem.ActualRampType;
                item.ActualRampMonths = npeLineItem.ActualRampMonths;
                item.ActualRampValues = npeLineItem.ActualRampValues;
                switch (item.LineItemSubType) {
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 41:
                        item.PlanAmortizationPeriod = npeLineItem.PlanAmortizationPeriod; break;
                    default:
                        item.AmortizationPeriod = '';
                        item.PlanAmortizationPeriod = '';
                        break;
                }
            }
        }
        else if (item.LineItemType === 2) {
            const peLineItem = peLineItems[item.EntityId] ? peLineItems[item.EntityId][0] : null;
            if (peLineItem) {
                item.LineNumber = peLineItem.LineNumber;
                item.LineType = getLineTypeLabel(item.LineItemType, item.LineItemSubType);
                item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, false);
                item.IT = item.IsIT ? 'Y' : '';
                item.ImplementationStatus = peLineItem.ImplementationStatus;
                item.StatusName = getImplementationStatusLabel(peLineItem.ImplementationStatus, true);
                item.AmortizationPeriod = '';
                item.LineItemAmount = peLineItem.PersonnelCount;
                item.CompRange = peLineItem.SalaryRange;
                item.Category = functionalTitles[peLineItem.FunctionalTitleId + '-' + peLineItem.GroupId] ? functionalTitles[peLineItem.FunctionalTitleId + '-' + peLineItem.GroupId].Name : '';
                item.Notes = peLineItem.Notes;
                item.AverageSalary = peLineItem.AverageSalary;
                item.Center = peLineItem.Center;

                item.LineItemPlanAmount = peLineItem.PlanPersonnelCount;
                item.LineItemPlanValue = peLineItem.PlanValue;
                item.PlanAmortizationPeriod = '';
                item.PlanNotes = peLineItem.PlanNotes;
                item.PlanRampType = null;
                item.PlanRampMonths = null;
                item.PlanRampValues = null;

                item.LineItemActualAmount = peLineItem.ActualPersonnelCount;
                item.LineItemActualValue = peLineItem.ActualValue;
                item.ActualNotes = peLineItem.ActualNotes;
                item.ActualRampType = null;
                item.ActualRampMonths = null;
                item.ActualRampValues = null;
            }
        }
        else if (item.LineItemType === 1) {
            const revenueLineItem = revenueLineItems[item.EntityId] ? revenueLineItems[item.EntityId][0] : null;
            if (revenueLineItem) {
                item.LineNumber = revenueLineItem.LineNumber;
                item.LineType = getLineTypeLabel(item.LineItemType, item.LineItemSubType);
                item.DirectionLabel = getDirectionTypeLabel(item.DirectionType, true);
                item.IT = item.IsIT ? 'Y' : '';
                item.ImplementationStatus = revenueLineItem.ImplementationStatus;
                item.StatusName = getImplementationStatusLabel(revenueLineItem.ImplementationStatus, true);
                item.LineItemAmount = revenueLineItem.MarginChange;
                item.Category = revenueLineItem.Category ? revenueLineItem.Category : '';
                item.Notes = revenueLineItem.Notes;
                item.Center = revenueLineItem.Center;

                item.LineItemPlanAmount = revenueLineItem.PlanMarginChange;
                item.LineItemPlanValue = revenueLineItem.PlanValue;
                item.PlanNotes = revenueLineItem.PlanNotes;
                item.PlanRampType = revenueLineItem.PlanRampType;
                item.PlanRampMonths = revenueLineItem.PlanRampMonths;
                item.PlanRampValues = revenueLineItem.PlanRampValues;

                item.LineItemActualAmount = revenueLineItem.ActualMarginChange;
                item.LineItemActualValue = revenueLineItem.ActualValue;
                item.ActualNotes = revenueLineItem.ActualNotes;
                item.ActualRampType = revenueLineItem.ActualRampType;
                item.ActualRampMonths = revenueLineItem.ActualRampMonths;
                item.ActualRampValues = revenueLineItem.ActualRampValues;
                switch (item.LineItemSubType) {
                    case 13:
                    case 14:
                        item.PlanAmortizationPeriod = revenueLineItem.PlanAmortizationPeriod; break;
                    default:
                        item.AmortizationPeriod = '';
                        item.PlanAmortizationPeriod = '';
                        break;
                }
            }
        }
    });

    const sortedGoIdeaLineItems = _.orderBy(goIdeaLineItems, ['CreatedOn', 'IdeaNumber', 'GroupName'], ['asc', 'asc', 'asc']);
    return sortedGoIdeaLineItems;
};
