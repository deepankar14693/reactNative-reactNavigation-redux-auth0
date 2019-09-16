import _ from 'lodash';
import { getLastProjectId } from '../common/utils';

const updateEntities = (state, data) => {
    var stateObj;
    stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        var newData = data[0];
        if (newData[0] && Object.keys(newData[0]).length > 0) {
            //stateObj = _.unionBy(data[0], stateObj, 'EntityId');
            var summaryData = newData[0];
            if (summaryData && summaryData.HeaderData && summaryData.HeaderData.length > 0) {
                var groupId = summaryData.HeaderData[0].GroupId;
                stateObj[groupId] = summaryData;
            }
        }
    }
    return Object.assign({}, ...state, stateObj);
}

const getEntityPayload = (payload, entityType) => {
    var arrayList = [];
    var arrayListDeleted = [];
    var arr = [];
    if (payload.length > 0) {
        payload.map((p) => {
            if (p.EntityType === entityType) {
                if (p.IsDelete) {
                    arrayListDeleted.push(p.EntityId);
                } else {
                    arrayList.push(p.SnapshotData);
                }

            }
            return null;
        });
    } else {
        if (payload.EntityType === entityType) {
            if (payload.IsDelete) {
                arrayListDeleted.push(payload.EntityId);
            } else {
                arrayList.push(payload.SnapshotData);
            }
        }
    }
    arr.push(arrayList);
    arr.push(arrayListDeleted);
    return arr;
};

const updateEntitiesList = (state, payloadData) => {
    var newStateObject = Object.assign([], state);
    var newData = [];
    var newState = [];

    _.forEach(payloadData, (item) => {
        newData = getEntityPayload(item.Data, "GroupSummary");
        newState = Object.assign([], updateEntities(newStateObject, newData));
        newStateObject = Object.assign([], newState);
    });
    return newStateObject;
};

const updateGroupSummaryData = (state, action, entireState) => {
    if (!action.payload) return state;
    var parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });

    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData);
};

const SummaryTextReducer = (state = [], action, entireState) => {
    var parsedData;
    switch (action.type) {
        case 'GET_SUMMARY_TEXT':
            parsedData = action.payload.data;
            var summaryData = Object.assign([], parsedData);
            var stateObj = Object.assign([], state);

            if (entireState.filter.ideaView === 'Ideas') {
                if (summaryData && summaryData.HeaderData && summaryData.HeaderData.length > 0) {
                    var groupId = summaryData.HeaderData[0].GroupId;
                    stateObj[groupId] = summaryData;
                }
            } else {
                stateObj = summaryData;
            }
            return stateObj;
        case 'PUSH_DATA':
            if (!action.payload) return state;
            return updateGroupSummaryData(state, action, entireState);
        default:
            return state;
    }
};

export default SummaryTextReducer;
