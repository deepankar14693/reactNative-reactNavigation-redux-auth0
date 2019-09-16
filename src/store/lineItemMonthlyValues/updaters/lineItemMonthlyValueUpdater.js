import update from 'immutability-helper';
import _ from 'lodash';
import { getLastProjectId } from '../../../common/utils';

const updateEntities = (state, data) => {
    let stateObj;
    stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        stateObj = _.unionBy(data[0], stateObj, 'EntityId');
    }
    return Object.assign([], ...state, stateObj);
};

const getEntityPayload = (payload, entityType) => {
    let arrayList = [];
    let arrayListDeleted = [];
    let arr = [];
    if (payload.length > 0) {
        payload.map((p) => {
            if (p.EntityType === entityType) {
                if (p.IsDelete) {
                    arrayListDeleted.push(p.EntityId);
                } else {
                    arrayList.push(p.SnapshotData);
                }

            }
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
    let newStateObject = Object.assign([], state.lineItemMonthlyValues);
    let newData = [];
    let newState = [];

    _.forEach(payloadData, (item) => {
        newData = getEntityPayload(item.Data, "LineItemMonthlyValue");
        newState = Object.assign([], updateEntities(newStateObject, newData));
        newStateObject = Object.assign([], newState);
    });

    return update(state, {
        lineItemMonthlyValues: { $set: newStateObject }
    });
};

const updateLineItemValueData = (state, action, entireState) => {
    if (!action.payload) return state;
    let parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });


    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData);
};

export default updateLineItemValueData;
