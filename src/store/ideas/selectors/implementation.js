import _ from 'lodash';
import * as utils from '../../../common/utils';
import * as constants from '../../../common/constants';
import AppConfig from '../../../appConfig';

export const getGroupMilestones = (ideaId, groupId, ideaMilestones) => {
    const groupMilestones = ideaMilestones.filter(
        function (el) {
            return el.GroupId === groupId
                && el.IdeaId === ideaId
        });
    return groupMilestones;
}

export const getPersonnelLineItems = (ideaId, groupId, ideaPersonnelLineItems) => {
    const personnelLineItems = ideaPersonnelLineItems.filter(
        function (el) {
            return el.GroupId === groupId && el.IdeaId === ideaId
                && !el.CostLineItemId && !el.IsRough && el.IsComplete === true
        });
    return personnelLineItems;
}

export const getNonPersonnelLineItems = (ideaId, groupId, ideaNonPersonnelLineItems) => {
    const nonPersonnelLineItems = ideaNonPersonnelLineItems.filter(
        function (el) {
            return el.GroupId === groupId && el.IdeaId === ideaId &&
                !el.CostLineItemId && !el.IsRough && el.IsComplete === true
        });
    return nonPersonnelLineItems;
}

export const getRevenueLineItems = (ideaId, groupId, ideaRevenueLineItems) => {
    const revenueLineItems = ideaRevenueLineItems.filter(
        function (el) {
            return el.GroupId === groupId && el.IdeaId === ideaId &&
                !el.CostLineItemId && !el.IsRough && el.IsComplete === true
        });
    return revenueLineItems;
}

const getGoIdeas = (ideas, permissions, ideaGroups, groupId, isCompanyView, showInactiveIdea, metricsArray, milestonesArray, ideaPersonnelLineItems, ideaNonPersonnelLineItems, ideaRevenueLineItems) => {

    var permissions = Object.keys(Object.assign({}, permissions.userPermissions));
    var acceptedIdeaGroupIdeaIds = [];
    if (isCompanyView) {
        acceptedIdeaGroupIdeaIds = _.map(_.filter(ideaGroups,
            { 'LinkedGroupStatus': 3 }
        ), 'IdeaId');
    } else {
        acceptedIdeaGroupIdeaIds = _.map(_.filter(ideaGroups,
            { 'LinkedGroupStatus': 3, 'GroupId': groupId.toLowerCase() }
        ), 'IdeaId');
    }

    var acceptedIdeas = utils.filterByValues(ideas, 'IdeaId', acceptedIdeaGroupIdeaIds);
    if (isCompanyView) {
        acceptedIdeas = _.filter(acceptedIdeas, function (idea) {
            var focusAreaId = (idea.FocusAreaId === '00000000-0000-0000-0000-000000000000' || idea.FocusAreaId == null ? '' : idea.FocusAreaId.toLowerCase());
            return (permissions.indexOf(idea.IdeaGroupId.toLowerCase()) > -1 || (focusAreaId !== '' && permissions.indexOf(focusAreaId) > -1) || (permissions.indexOf(idea.GroupId.toLowerCase()) > -1));
        });
    } else {
        if (permissions.indexOf(groupId) === -1) {
            acceptedIdeas = _.filter(acceptedIdeas, function (idea) {
                var focusAreaId = (idea.FocusAreaId === '00000000-0000-0000-0000-000000000000' || idea.FocusAreaId == null ? '' : idea.FocusAreaId.toLowerCase());
                return (permissions.indexOf(idea.IdeaGroupId.toLowerCase()) > -1 || (focusAreaId !== '' && permissions.indexOf(focusAreaId) > -1));
            });
        }
    }

    var goIdeas = [];
    if (!showInactiveIdea) {
        goIdeas = _.filter(acceptedIdeas, (el) => { return el.DecisionType === 1 && el.Status === 1 })
    } else {
        goIdeas = _.filter(acceptedIdeas, (el) => { return (el.DecisionType === 1 && el.Status !== 3 && ((el.Status !== 2 || !el.IsArchivePending) && !el.IsAcceptancePending)) })
    }

    if (isCompanyView) {
        _.map(goIdeas, (item) => {
            var ideaGroupId = getIdeaGroupId(ideaGroups, item.IdeaId, item.GroupId);
            item["IdeaGroupId"] = ideaGroupId;

            const milestones = getGroupMilestones(item.IdeaId, item.GroupId, milestonesArray);
            const metrics = getGroupMilestones(item.IdeaId, item.GroupId, metricsArray);

            const minActualTimingMilestone = _.minBy(_.filter(milestones, (el) => { return el.ActualTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'ActualTiming');
            const minPlanTimingMilestone = _.minBy(_.filter(milestones, (el) => { return el.PlanTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'PlanTiming');
            const minActualTimingMetric = _.minBy(_.filter(metrics, (el) => { return el.ActualTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'ActualTiming');
            const minPlanTimingMetric = _.minBy(_.filter(metrics, (el) => { return el.PlanTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'PlanTiming');

            const personnelLineItems = getPersonnelLineItems(item.IdeaId, item.GroupId, ideaPersonnelLineItems);
            const nonPersonnelLineItems = getNonPersonnelLineItems(item.IdeaId, item.GroupId, ideaNonPersonnelLineItems);
            const revenueLineItems = getRevenueLineItems(item.IdeaId, item.GroupId, ideaRevenueLineItems);

            const milestonesImplementationStatusArray = _.uniq(_.map(milestones, 'ImplementationStatus'));
            const personnelLineItemsImplementationStatusArray = _.uniq(_.map(personnelLineItems, 'ImplementationStatus'));
            const nonPersonnelLineItemsImplementationStatusArray = _.uniq(_.map(nonPersonnelLineItems, 'ImplementationStatus'));
            const revenueLineItemsImplementationStatusArray = _.uniq(_.map(revenueLineItems, 'ImplementationStatus'));

            const lineItemsImplementationStatusArray = _.concat(personnelLineItemsImplementationStatusArray,
                nonPersonnelLineItemsImplementationStatusArray, revenueLineItemsImplementationStatusArray)
            const incompleteLineItemsImplementationStatus = _.filter(lineItemsImplementationStatusArray, (el) => { return el && el < 900 });
            let maxLineItemsImplementationStatus = _.max(lineItemsImplementationStatusArray);
            const incompleteMilestonesImplementationStatus = _.filter(milestonesImplementationStatusArray, (el) => { return el && el < 900 });
            let maxMilestonesImplementationStatus = _.max(milestonesImplementationStatusArray);
            if (maxLineItemsImplementationStatus > 900 && incompleteLineItemsImplementationStatus.length > 0) {
                maxLineItemsImplementationStatus = _.max(incompleteLineItemsImplementationStatus);
                if (maxLineItemsImplementationStatus === null || maxLineItemsImplementationStatus === 110) {
                    //Set 'On Track' if items are both closed and incompleted
                    maxLineItemsImplementationStatus = 210;
                }
            }
            if (maxMilestonesImplementationStatus > 900 && incompleteMilestonesImplementationStatus.length > 0) {
                maxMilestonesImplementationStatus = _.max(incompleteMilestonesImplementationStatus);
                if (maxMilestonesImplementationStatus === null || maxMilestonesImplementationStatus === 110) {
                    //Set 'On Track' if items are both closed and incompleted
                    maxMilestonesImplementationStatus = 210;
                }
            }
            item['EffectiveImplementationStatusLineItems'] = maxLineItemsImplementationStatus;
            item['EffectiveImplementationStatusMilestones'] = maxMilestonesImplementationStatus;
            item['MetricPlanTiming'] = minPlanTimingMetric ? minPlanTimingMetric.PlanTiming : null;
            item['MetricActualTiming'] = minActualTimingMetric ? minActualTimingMetric.ActualTiming : null;
            item['MilestonePlanTiming'] = minPlanTimingMilestone ? minPlanTimingMilestone.PlanTiming : null;
            item['MilestoneActualTiming'] = minActualTimingMilestone ? minActualTimingMilestone.ActualTiming : null;
            return item;
        });
    } else {
        _.map(goIdeas, (item) => {
            var ideaGroupId = getIdeaGroupId(ideaGroups, item.IdeaId, groupId);
            item["IdeaGroupId"] = ideaGroupId;

            const milestones = getGroupMilestones(item.IdeaId, groupId, milestonesArray);
            const metrics = getGroupMilestones(item.IdeaId, groupId, metricsArray);
           
            const minActualTimingMilestone = _.minBy(_.filter(milestones, (el) => { return el.ActualTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'ActualTiming');
            const minPlanTimingMilestone = _.minBy(_.filter(milestones, (el) => { return el.PlanTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'PlanTiming');
            const minActualTimingMetric = _.minBy(_.filter(metrics, (el) => { return el.ActualTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'ActualTiming');
            const minPlanTimingMetric = _.minBy(_.filter(metrics, (el) => { return el.PlanTiming && el.ImplementationStatus && el.ImplementationStatus < 900 }), 'PlanTiming');

            const personnelLineItems = getPersonnelLineItems(item.IdeaId, groupId, ideaPersonnelLineItems);
            const nonPersonnelLineItems = getNonPersonnelLineItems(item.IdeaId, groupId, ideaNonPersonnelLineItems);
            const revenueLineItems = getRevenueLineItems(item.IdeaId, groupId, ideaRevenueLineItems);

            const milestonesImplementationStatusArray = _.uniq(_.map(milestones, 'ImplementationStatus'));
            const personnelLineItemsImplementationStatusArray = _.uniq(_.map(personnelLineItems, 'ImplementationStatus'));
            const nonPersonnelLineItemsImplementationStatusArray = _.uniq(_.map(nonPersonnelLineItems, 'ImplementationStatus'));
            const revenueLineItemsImplementationStatusArray = _.uniq(_.map(revenueLineItems, 'ImplementationStatus'));

            const lineItemsImplementationStatusArray = _.concat(personnelLineItemsImplementationStatusArray,
                nonPersonnelLineItemsImplementationStatusArray, revenueLineItemsImplementationStatusArray)
            const incompleteLineItemsImplementationStatus = _.filter(lineItemsImplementationStatusArray, (el) => { return el && el < 900 });
            let maxLineItemsImplementationStatus = _.max(lineItemsImplementationStatusArray);
            const incompleteMilestonesImplementationStatus = _.filter(milestonesImplementationStatusArray, (el) => { return el && el < 900 });
            let maxMilestonesImplementationStatus = _.max(milestonesImplementationStatusArray);
            if (maxLineItemsImplementationStatus > 900 && incompleteLineItemsImplementationStatus.length > 0) {
                maxLineItemsImplementationStatus = _.max(incompleteLineItemsImplementationStatus);
                if (maxLineItemsImplementationStatus === null || maxLineItemsImplementationStatus === 110) {
                    //Set 'On Track' if items are both closed and incompleted
                    maxLineItemsImplementationStatus = 210;
                }
            }
            if (maxMilestonesImplementationStatus > 900 && incompleteMilestonesImplementationStatus.length > 0) {
                maxMilestonesImplementationStatus = _.max(incompleteMilestonesImplementationStatus);
                if (maxMilestonesImplementationStatus === null || maxMilestonesImplementationStatus === 110) {
                    //Set 'On Track' if items are both closed and incompleted
                    maxMilestonesImplementationStatus = 210;
                }
            }
            item['EffectiveImplementationStatusLineItems'] = maxLineItemsImplementationStatus;
            item['EffectiveImplementationStatusMilestones'] = maxMilestonesImplementationStatus;
            item['MetricPlanTiming'] = minPlanTimingMetric ? minPlanTimingMetric.PlanTiming : null;
            item['MetricActualTiming'] = minActualTimingMetric ? minActualTimingMetric.ActualTiming : null;
            item['MilestonePlanTiming'] = minPlanTimingMilestone ? minPlanTimingMilestone.PlanTiming : null;
            item['MilestoneActualTiming'] = minActualTimingMilestone ? minActualTimingMilestone.ActualTiming : null;
            return item;
        });
    }

    return goIdeas;
};

export const getIdeaGroupId = (ideaGroupArray, ideaId, groupId) => {
    var ideaGroup = _.filter(ideaGroupArray, { 'IdeaId': ideaId, 'GroupId': groupId });
    if (ideaGroup.length > 0) {
        return ideaGroup[0].IdeaGroupId;
    } else {
        return null;
    }
}

export const getImplementationData = (filter, ideas, permissions, masterData, showInactiveIdea, metrics, milestones, ideaPersonnelLineItems, ideaNonPersonnelLineItems, ideaRevenueLineItems) => {
    var goIdeas = [];
    var isCompanyView = ((filter.ideaView === 'CompanyView') ? true : false);
    if (!ideas.ideas || ideas.ideas.length == 0) return goIdeas;
    if (!filter.groupId) {
        filter.groupId = AppConfig.env('groupId');
    }
    var groupId = filter.groupId;
    if (groupId === null) {
        goIdeas = [];
    } else {
        goIdeas = getGoIdeas(ideas.ideas, permissions, ideas.ideaGroups, groupId, isCompanyView, showInactiveIdea, metrics, milestones, ideaPersonnelLineItems, ideaNonPersonnelLineItems, ideaRevenueLineItems);

    }
    return goIdeas;
};
