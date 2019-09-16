import update from 'immutability-helper';
import _ from 'lodash';
import * as loghelper from '../../../common/loghelper';
import { getLastProjectId } from '../../../common/utils';
import { ideaGroupView } from './ideaGroupUpdater';

export const IsUpdateDashboardData = (eventData, selectedGroupId, selectedPhase, selectedProjectId) => {
    let isLineItemUpdate = false;
    const parsedData = JSON.parse(eventData);
    const projectId = selectedProjectId ? selectedProjectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });

    if (payloadData.length <= 0) {
        return false;
    }

    let lineItemData = [];
    let ideaPushedData = [];
    if (payloadData.length > 0) {
        _.forEach(payloadData, (item) => {
            if (isLineItemUpdate === true) {
                isLineItemUpdate = true;
                return true;
            }
            ideaPushedData = getEntityPayload(item.Data, 'Idea');

            if (selectedGroupId !== '00000000-0000-0000-0000-000000000000' && ideaPushedData[0].length === 1) {
                if (_.map(ideaPushedData[0][0].Groups, 'GroupId').indexOf(selectedGroupId) !== -1) {
                    if (selectedPhase === 5) {
                        isLineItemUpdate = true;
                        return true;
                    }

                    lineItemData = getEntityPayload(item.Data, 'NonPersonnelLineItem');
                    if (lineItemData[0].length > 0 || lineItemData[1].length > 0) {
                        isLineItemUpdate = true;
                        return true;
                    } else {
                        lineItemData = getEntityPayload(item.Data, 'PersonnelLineItem');
                        if (lineItemData[0].length > 0 || lineItemData[1].length > 0) {
                            isLineItemUpdate = true;
                            return true;
                        } else {
                            lineItemData = getEntityPayload(item.Data, 'RevenueLineItem');
                            if (lineItemData[0].length > 0 || lineItemData[1].length > 0) {
                                isLineItemUpdate = true;
                                return true;
                            }
                        }
                    }

                }
            }
        });

    } else {
        return false;
    }

    return isLineItemUpdate
};

const updateEntities = (state, data) => {
    let stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        stateObj = _.unionBy(data[0], stateObj, 'EntityId');
    }
    return Object.assign([], ...state, stateObj);
};

const updateIdeaGroupEntities = (state, data) => {
    let stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        data[0].forEach(item => {
            const index = stateObj.findIndex(op => op.EntityId === item.EntityId);
            if (index === -1) {
                stateObj = update(stateObj, { $splice: [[0, 0, item]] });
            } else {
                stateObj = update(stateObj, { [index]: { $set: item } });
            }
        });
    }
    return Object.assign([], ...state, stateObj);
};

export const getEntityPayload = (payload, entityType) => {
    let arrayList = [];
    let arrayListDeleted = [];
    let arr = [];
    if (payload.length > 0) {
        payload.map((p) => {
            if (p.EntityType === entityType) {
                if (p.IsDelete) {
                    arrayListDeleted.push(p.EntityId);
                } else if (p.SnapshotData) {
                    arrayList.push(p.SnapshotData);
                }

            }
            return null;
        });
    } else {
        if (payload.EntityType === entityType) {
            if (payload.IsDelete) {
                arrayListDeleted.push(payload.EntityId);
            } else if (payload.SnapshotData) {
                arrayList.push(payload.SnapshotData);
            }
        }
    }
    arr.push(arrayList);
    arr.push(arrayListDeleted);
    return arr;
};

const updateIdeaGroupData = (state, ideaGroupList, ideaList, entireState) => {
    let newState = Object.assign([], state);
    const ideas = _.groupBy(ideaList, 'IdeaId');

    if (ideaGroupList && ideaGroupList.length > 0) {
        ideaGroupList.forEach(item => {
            const idea = ideas[item.IdeaId] ? ideas[item.IdeaId][0] : null
            const index = newState.findIndex(op => op.EntityId === item.EntityId);
            if (index === -1) {
                newState = update(newState, { $splice: [[0, 0, ideaGroupView(item, idea, entireState)]] });
            } else {
                newState = update(newState, { [index]: { $set: ideaGroupView(item, idea, entireState) } });
            }
        });

        return update(state, { $set: newState });
    } else {
        return state;
    }
};

const updateIdeaEntities = (state, payloadData, entireState, ideaStateData) => {
    let newState = Object.assign([], updateIdeaTabEntities(state, payloadData));
    const idea = getEntityPayload(payloadData, 'Idea');
    if (idea[0].length > 0) {
        _.forEach(idea[0], (item) => {
            const ideaGroups = _.filter(newState["ideaGroups"], { 'IdeaId': item.IdeaId });
            newState = update(newState, {
                ideaGroups: { $set: updateIdeaGroupData(newState["ideaGroups"], ideaGroups, [item], entireState) }
            });
        });
        return newState;
    } else {
        if (ideaStateData) {
            _.forEach(ideaStateData, (item) => {
                const ideaGroups = _.filter(newState["ideaGroups"], { 'IdeaId': item.IdeaId });
                newState = update(newState, {
                    ideaGroups: { $set: updateIdeaGroupData(newState["ideaGroups"], ideaGroups, [item], entireState) }
                });
            });
        } else {
            return newState;
        }
    }
};

const updateIdeaTabEntities = (state, payloadData) => {
    return update(state, {
        ideas: { $set: updateEntities(state["ideas"], getEntityPayload(payloadData, 'Idea'), 'Idea') },
        ideaGroups: { $set: updateIdeaGroupEntities(state["ideaGroups"], getEntityPayload(payloadData, 'IdeaGroup'), 'IdeaGroup') },
        ideaPersonnelLineItems: { $set: updateEntities(state["ideaPersonnelLineItems"], getEntityPayload(payloadData, 'PersonnelLineItem'), 'PE') },
        ideaNonPersonnelLineItems: { $set: updateEntities(state["ideaNonPersonnelLineItems"], getEntityPayload(payloadData, 'NonPersonnelLineItem'), 'NPE') },
        ideaRevenueLineItems: { $set: updateEntities(state["ideaRevenueLineItems"], getEntityPayload(payloadData, 'RevenueLineItem'), 'Revenue') },
        ideaRiskRatings: { $set: updateEntities(state["ideaRiskRatings"], getEntityPayload(payloadData, 'RiskRating'), 'RiskRating') },
        ideaRecommendations: { $set: updateEntities(state["ideaRecommendations"], getEntityPayload(payloadData, 'Recommendation'), 'Recommendation') },
        ideaSCDecisions: { $set: updateEntities(state["ideaSCDecisions"], getEntityPayload(payloadData, 'SCDecision'), 'SCDecision') },
        ideaSCMReviews: { $set: updateEntities(state["ideaSCMReviews"], getEntityPayload(payloadData, 'SCMReview'), 'SCMReview') },
        ideaCustomFields: { $set: updateEntities(state["ideaCustomFields"], getEntityPayload(payloadData, 'IdeaCustomField'), 'CustomField') },
        tranferredIdeas: { $set: updateEntities(state["tranferredIdeas"], getEntityPayload(payloadData, 'TransferIdea'), 'TransferIdea') },
        milestones: { $set: updateEntities(state["milestones"], getEntityPayload(payloadData, 'Milestone'), 'Milestone') },
        metrics: { $set: updateEntities(state["metrics"], getEntityPayload(payloadData, 'Metric'), 'Metric') },
        isLoading: { $set: false }
    })
};

const updateIdeaEntitiesList = (state, payloadData, entireState) => {
    const selectedGroupId = entireState.filter.groupId;
    let newStateObject = Object.assign([], state);
    let newState = [];
    let ideaPushedData = [];
    let processedIdea = 0;
    let isProcessData = false;
    if (payloadData.length > 0) {
        _.forEach(payloadData, (item) => {
            isProcessData = false;
            ideaPushedData = getEntityPayload(item.Data, 'Idea');
            if (ideaPushedData[0].length > 0) {
                if (selectedGroupId !== '00000000-0000-0000-0000-000000000000') {
                    _.forEach(ideaPushedData[0], (idea) => {
                        if (_.map(idea.Groups, 'GroupId').indexOf(selectedGroupId) !== -1) {
                            isProcessData = true;
                        }
                    });

                    if (isProcessData) {
                        processedIdea = processedIdea + 1;
                        newState = Object.assign([], updateIdeaEntities(newStateObject, item.Data, entireState));
                        newStateObject = Object.assign([], newState);
                    }
                    else {
                        const ideaIds = _.map(ideaPushedData[0], 'IdeaId');
                        const ideaStateData = _.filter(newStateObject["ideas"], (item) => _.includes(ideaIds, item.IdeaId));
                        _.forEach(ideaStateData, (idea) => {
                            if (_.map(idea.Groups, 'GroupId').indexOf(selectedGroupId) !== -1) {
                                isProcessData = true;
                            }
                        });
                        // if (!isProcessData) {
                        // const ideaGroupStateData = _.filter(newStateObject["ideaGroups"], (item) => _.includes(ideaIds, item.IdeaId));
                        //     if (ideaGroupStateData.length > 0) {
                        //         isProcessData = true;
                        //     }
                        // }

                        if (isProcessData) {
                            processedIdea = processedIdea + 1;
                            newState = Object.assign([], updateIdeaEntities(newStateObject, item.Data, entireState, ideaStateData));
                            newStateObject = Object.assign([], newState);
                        } else {
                            const transferIdeaPushedData = getEntityPayload(item.Data, 'TransferIdea');
                            if (newStateObject['tranferredIdeas'].length > 0 & transferIdeaPushedData[0].length > 0) {
                                processedIdea = processedIdea + 1;
                                newState = Object.assign([], updateIdeaEntities(newStateObject, item.Data, entireState, ideaStateData));
                                newStateObject = Object.assign([], newState);
                            } else {
                                newState = Object.assign([], newStateObject);
                            }
                        }
                    }
                } else {
                    processedIdea = processedIdea + ideaPushedData[0].length;
                    newState = Object.assign([], updateIdeaEntities(newStateObject, item.Data, entireState));
                    newStateObject = Object.assign([], newState);
                }
            } else {
                newState = Object.assign([], newStateObject);
            }
        });
        loghelper.consoleLogMsg("Push data processed (" + processedIdea + ")", 6);
        return { ...newStateObject, newState };
    }
    else {
        return state;
    }
};

const PushEvents = (state, action, entireState) => {
    if (!action.payload) return state;
    const parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();

    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });

    if (payloadData.length <= 0) {
        return state;
    }
    loghelper.consoleLogMsg("Push data received (" + payloadData.length + ")", 6);

    return updateIdeaEntitiesList(state, payloadData, entireState);
}

export default PushEvents;
