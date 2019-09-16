import _ from 'lodash';
import { getImplementationStatusLabel } from '../../../common/constants';
import { filterByValues } from '../../../common/utils';

export const getMetrics = (goIdeas, state) => {
    var ideas = _.groupBy(goIdeas, 'IdeaId');
    var allIdeas = _.groupBy(state.ideas.ideas, 'IdeaId');
    var goIdeaIds = _.map(goIdeas, 'IdeaId');

    var goIdeasMetrics = filterByValues(state.ideas.metrics, 'IdeaId', goIdeaIds);

    _.map(goIdeasMetrics, (item) => {
        var idea = ideas[item.IdeaId] ? ideas[item.IdeaId][0] : null;
        if (idea) {
            item.IdeaNumber = idea.IdeaNumber;
            item.IdeaTitle = idea.Title;
            item.IdeaDescription = idea.Description;
            item.GroupName = state.masterData.groups[item.GroupId] ? state.masterData.groups[item.GroupId].Name : '';
            item.ResponsibleParty = item.ResponsibleParty ? item.ResponsibleParty : '';
            item.ResponsiblePartyName = item.ResponsibleParties ? _.uniq(_.map(item.ResponsibleParties, 'Name')).join(', ') : '';
            item.StatusName = getImplementationStatusLabel(item.ImplementationStatus, true);
            item.FocusAreaId = allIdeas[item.IdeaId].length > 0 ? allIdeas[item.IdeaId][0].FocusAreaId : '';
            item.FocusArea = allIdeas[item.IdeaId].length > 0 ? allIdeas[item.IdeaId][0].FocusArea : '';
            item.IdeaGroupId = idea.IdeaGroupId;
            item.PlanLockedException = idea.PlanLockedException;
        }
    });

    var sortedGoIdeasMetrics = _.orderBy(goIdeasMetrics, ['CreatedOn', 'IdeaNumber', 'GroupName'], ['asc', 'asc', 'asc']);
    return sortedGoIdeasMetrics;
};


export const getMetricsByIdeaGroups = (goIdeaGroups, metricsMasterData, groupsMasterData) => {
    const allGoIdeaGroups = _.groupBy(goIdeaGroups, 'IdeaId');
    _.map(metricsMasterData, (item) => {
        const ideaGroup = allGoIdeaGroups[item.IdeaId] ? allGoIdeaGroups[item.IdeaId][0] : null;
        if (ideaGroup) {
            item.IdeaNumber = ideaGroup.Idea.IdeaNumber;
            item.IdeaTitle = ideaGroup.Idea.Title;
            item.IdeaDescription = ideaGroup.Idea.Description;
            item.PrimaryGroupName = ideaGroup.Idea.PrimaryGroupName;
            item.GroupName = groupsMasterData[item.GroupId] ? groupsMasterData[item.GroupId].Name : '';
            item.ResponsibleParty = item.ResponsibleParty ? item.ResponsibleParty : '';
            item.ResponsiblePartyName = item.ResponsibleParties ? _.uniq(_.map(item.ResponsibleParties, 'Name')).join(', ') : '';
            item.StatusName = getImplementationStatusLabel(item.ImplementationStatus, true);
            item.FocusAreaId = ideaGroup.FocusAreaId;
            item.FocusArea = ideaGroup.FocusAreaName;
            item.IdeaGroupId = ideaGroup.IdeaGroupId;
            item.PlanLockedException = ideaGroup.Idea.PlanLockedException;
            item.ResponsibleParties = item.ResponsibleParties;
            item.PrimaryGroupId = ideaGroup.Idea.GroupId;
        }
    });

    var sortedGoIdeasMetrics = _.orderBy(metricsMasterData, ['CreatedOn', 'IdeaNumber', 'GroupName'], ['asc', 'asc', 'asc']);
    return sortedGoIdeasMetrics;
};
