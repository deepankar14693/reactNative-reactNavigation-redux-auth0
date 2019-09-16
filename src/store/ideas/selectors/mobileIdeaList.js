import _ from 'lodash';
import { filterByValues } from '../../../common/utils';

const getAcceptedIdeas = (ideaGroups,ideas, groupId) => {
    var acceptedIdeaGroupIdeaIds = _.map(_.filter(ideaGroups,
        { 'LinkedGroupStatus': 3, 'GroupId': groupId.toLowerCase() }
    ), 'IdeaId');
    var acceptedIdeas = filterByValues(ideas, 'IdeaId', acceptedIdeaGroupIdeaIds);
    return acceptedIdeas;
};

const getFilteredIdeas = (state) => {
    if (Object.keys(state.ideas).length === 0 || state.ideas["ideas"] === undefined) { return '' }
    var groupFilteredIdeas = [];

    var groupId = (state.ideaGroupFilter.ideaView === 'CompanyView' ? '00000000-0000-0000-0000-000000000000' : state.ideaGroupFilter.groupId);
    if (groupId === null) {
        groupFilteredIdeas = [];
    } else {
        if (groupId === '00000000-0000-0000-0000-000000000000') {
            groupFilteredIdeas = state.ideas.ideas;
        } else {
            groupFilteredIdeas = getAcceptedIdeas(state.ideas.ideaGroups, state.ideas.ideas, groupId);
        }
    }

    //Dashboard Filters        
    if (state.dashboardFilter.currentFilter.ideas.length > 0) {
        groupFilteredIdeas = filterByValues(groupFilteredIdeas, 'IdeaId', state.dashboardFilter.currentFilter.ideas);
    }

    return groupFilteredIdeas;
};

export const prepareIdeaListData = (state) => {
    return getFilteredIdeas(state);
};