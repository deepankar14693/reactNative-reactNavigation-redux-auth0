import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';


const prepareSpecialEventsObject = (array) => {
    if (array == null) return {};
    let nodes = {};
    for (let i = 0, len = array.length; i < len; ++i) {
        const item = array[i];
        const uniqueKey = item["EntityId"] + "-" + item["EventType"];
        nodes[uniqueKey] = array[i];
    }
    return nodes;
};

const getEventName = (fieldName) => {
    switch (fieldName) {
        case 'Scratchpad': return 'IdeaGroupScratchpadChangedEvent';
        case 'CurrentState': return 'IdeaCurrentStateChangedEvent';
        case 'RecommendedApproach': return 'IdeaRecommendedApproachChangedEvent';
        case 'ValuationSummary': return 'IdeaValuationSummaryChangedEvent';
        case 'RiskSummary': return 'IdeaRiskSummaryChangedEvent';
        case 'MetricsAndMilestones': return 'IdeaMetricsAndMilestonesChangedEvent';
        case 'RoughRiskRatingType': return 'IdeaRoughRiskRatingTypeChangedEvent';
        case 'RoughRiskRatingNote': return 'IdeaRoughRiskRatingNoteChangedEvent';
        case 'RiskRatingType': return 'RiskRatingRiskRatingTypeChangedEvent';
        case 'Notes': return 'RiskRatingNotesChangedEvent';
        default: return '';
    }
};

const getSpecialEventName = (entityName, fieldName) => {
    return entityName + fieldName + 'ChangedEvent';
};

const updateSpecialEvents = (state, action) => { // ideaId, fieldName, fieldText
    let payload;
    let configData;
    let eventType;
    let entityId;
    let key;
    let stateObj;
    let fieldName;
    switch (action.type) {
        case 'UPDATE_IDEAGROUP_SCRATCHPAD':
        case 'UPDATE_IDEATEXTS':
        case 'UPDATE_IDEAGROUP_SCRATCHPAD_DATA':
        case 'UPDATE_IDEATEXTS_DATA':
            payload = action.payload.data;
            configData = JSON.parse(action.payload.config.data);
            eventType = getEventName(configData.fieldName);
            entityId = configData.entityId;
            key = entityId + '-' + eventType;
            payload['EventType'] = eventType;
            payload['EntityId'] = entityId;
            stateObj = Object.assign({}, state);
            stateObj[key] = payload;
            return stateObj;
        case 'UPDATE_IDEA_SCDECISION':
        case 'UPDATE_IDEA_RECOMMENDATION':
        case 'UPDATE_IDEA_SCMREVIEW':
        case 'UPDATE_NONPERSONNEL_LINEITEM':
        case 'UPDATE_REVENUE_LINEITEM':
        case 'UPDATE_PERSONNEL_LINEITEM':
        case 'UPDATE_IDEA_SCDECISION_DATA':
        case 'UPDATE_IDEA_RECOMMENDATION_DATA':
        case 'UPDATE_IDEA_SCMREVIEW_DATA':
        case 'UPDATE_NONPERSONNEL_LINEITEM_DATA':
        case 'UPDATE_REVENUE_LINEITEM_DATA':
        case 'UPDATE_PERSONNEL_LINEITEM_DATA':
            payload = action.payload.data;
            configData = JSON.parse(action.payload.config.data);
            fieldName = configData.fieldName;
            if (fieldName === 'RecommendationType' || fieldName === 'Notes' || fieldName === 'DecisionType' || fieldName === 'IsReviewed') {
                switch (action.type) {
                    case 'UPDATE_IDEA_SCDECISION':
                    case 'UPDATE_IDEA_SCDECISION_DATA':
                        delete payload.DecisionType;
                        delete payload.DecisionStatus;
                        eventType = getSpecialEventName('SCDecision', fieldName); break;
                    case 'UPDATE_IDEA_RECOMMENDATION':
                    case 'UPDATE_IDEA_RECOMMENDATION_DATA':
                        delete payload.Status;
                        delete payload.IdeaGroupId;
                        eventType = getSpecialEventName('Recommendation', fieldName); break;
                    case 'UPDATE_IDEA_SCMREVIEW':
                    case 'UPDATE_IDEA_SCMREVIEW_DATA':
                        delete payload.Status;
                        delete payload.IdeaGroupId;
                        eventType = getSpecialEventName('SCMReview', fieldName); break;
                    case 'UPDATE_PERSONNEL_LINEITEM':
                    case 'UPDATE_PERSONNEL_LINEITEM_DATA':
                        delete payload.Value;
                        eventType = getSpecialEventName('PersonnelLineItem', fieldName); break;
                    case 'UPDATE_NONPERSONNEL_LINEITEM':
                    case 'UPDATE_NONPERSONNEL_LINEITEM_DATA':
                        delete payload.Value;
                        eventType = getSpecialEventName('NonPersonnelLineItem', fieldName); break;
                    case 'UPDATE_REVENUE_LINEITEM':
                    case 'UPDATE_REVENUE_LINEITEM_DATA':
                        delete payload.Value;
                        eventType = getSpecialEventName('RevenueLineItem', fieldName); break;
                    default: break;
                }
                entityId = configData.entityId;
                key = entityId + '-' + eventType;
                payload['EventType'] = eventType;
                payload['EntityId'] = entityId;
                stateObj = Object.assign({}, state);
                stateObj[key] = payload;
                return stateObj;
            }
            return state;
        case 'REQUEST_ARCHIVE_IDEA':
        case 'REQUEST_ARCHIVE_IDEA_DATA':
            payload = action.payload.data;
            configData = JSON.parse(action.payload.config.data);
            eventType = 'IdeaArchiveRequestedEvent';
            entityId = configData.ideaId;
            key = entityId + '-' + eventType;
            payload['EventType'] = eventType;
            payload['EntityId'] = entityId;
            stateObj = Object.assign({}, state);
            stateObj[key] = payload;
            return stateObj;
        case 'UPDATE_IDEA':
        case 'UPDATE_IDEA_DATA':
            payload = action.payload.data;
            configData = JSON.parse(action.payload.config.data);
            fieldName = configData.fieldName;
            if (fieldName === 'RoughRiskRatingType' || fieldName === 'RoughRiskRatingNote') {
                eventType = getEventName(configData.fieldName);
                entityId = configData.entityId;
                key = entityId + '-' + eventType;
                payload['EventType'] = eventType;
                payload['EntityId'] = entityId;
                stateObj = Object.assign({}, state);
                stateObj[key] = payload;
                return stateObj;
            }
            return state;
        case 'CREATE_RISKRATING':
        case 'UPDATE_RISKRATING':
        case 'CREATE_RISKRATING_DATA':
        case 'UPDATE_RISKRATING_DATA':
            payload = action.payload.data;
            configData = JSON.parse(action.payload.config.data);
            fieldName = configData.fieldName;
            eventType = getEventName(configData.fieldName);
            entityId = configData.entityId;
            key = entityId + '-' + eventType;
            payload['EventType'] = eventType;
            payload['EntityId'] = entityId;
            stateObj = Object.assign({}, state);
            stateObj[key] = payload;
            return stateObj;
        default:
            return state;
    }
};

const events = (state = [], action) => {
    let data = {};
    let parsedData;
    switch (action.type) {
        case actionTypes.GET_IDEA_DETAIL_DATA:
            if (!action.payload.data) return state;
            data.specialEvents = _.merge({}, state.specialEvents, prepareSpecialEventsObject(action.payload.data.SpecialEvent.SpecialEventList.List));
            data.specialEventsTimestamp = action.payload.data.SpecialEvent.SpecialEventList.TimeStamp;
            return data;
        case 'GET_IDEA_DETAILS':
        case 'GET_IDEA_DETAILS_DATA':
            if (!action.payload.data) return state;
            parsedData = JSON.parse(action.payload.data).SpecialEvent;
            data.specialEvents = _.merge({}, state.specialEvents, prepareSpecialEventsObject(parsedData.SpecialEventList.List));
            data.specialEventsTimestamp = parsedData.SpecialEventList.TimeStamp;
            return data;
        case 'GET_SPECIAL_EVENTS':
        case 'GET_SPECIAL_EVENTS_DATA':
            parsedData = action.payload.data;
            if (!parsedData) return state;
            data.specialEvents = _.merge({}, state.specialEvents, prepareSpecialEventsObject(parsedData.SpecialEventList.List));
            data.specialEventsTimestamp = parsedData.SpecialEventList.TimeStamp;
            return data;
        case 'UPDATE_IDEAGROUP_SCRATCHPAD':
        case 'UPDATE_IDEA_SCDECISION':
        case 'UPDATE_IDEA_RECOMMENDATION':
        case 'UPDATE_IDEA_SCMREVIEW':
        case 'REQUEST_ARCHIVE_IDEA':
        case 'UPDATE_IDEATEXTS':
        case 'UPDATE_IDEA':
        case 'CREATE_RISKRATING':
        case 'UPDATE_RISKRATING':
        case 'UPDATE_PERSONNEL_LINEITEM':
        case 'UPDATE_NONPERSONNEL_LINEITEM':
        case 'UPDATE_REVENUE_LINEITEM':
        case 'UPDATE_IDEAGROUP_SCRATCHPAD_DATA':
        case 'UPDATE_IDEA_SCDECISION_DATA':
        case 'UPDATE_IDEA_RECOMMENDATION_DATA':
        case 'UPDATE_IDEA_SCMREVIEW_DATA':
        case 'REQUEST_ARCHIVE_IDEA_DATA':
        case 'UPDATE_IDEATEXTS_DATA':
        case 'UPDATE_IDEA_DATA':
        case 'CREATE_RISKRATING_DATA':
        case 'UPDATE_RISKRATING_DATA':
        case 'UPDATE_PERSONNEL_LINEITEM_DATA':
        case 'UPDATE_NONPERSONNEL_LINEITEM_DATA':
        case 'UPDATE_REVENUE_LINEITEM_DATA':
            if (!action.payload.data) return state;
            return { ...state, specialEvents: updateSpecialEvents(state.specialEvents, action) };
        default:
            return state;
    }
}

export default events;
