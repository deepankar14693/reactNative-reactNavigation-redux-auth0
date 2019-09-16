import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../../actions/actionTypes';
import { getLastProjectId } from '../../common/utils';
import * as ftMapperUpdater from './baselineUpdater';

const updateFunctionalTitleMap = (state, data) => {
    let functionalTitleMapperData = Object.assign({}, state.functionalTitleMapper.functionalTitleMapperData);

    if (data[0] && data[0].length > 0) {
        const newData = data[0];
        if (newData && newData.length > 0) {
            const updatedFunctionalTitleMap = newData[0].FunctionalTitleMap;
            const updatedPersonnel = newData[0].Personnel;

            functionalTitleMapperData.FunctionalTitleMap = ftMapperUpdater.updateJobTitle(functionalTitleMapperData.FunctionalTitleMap, updatedFunctionalTitleMap);
            updatedPersonnel.map((updatedPersonnelData, index) => {
                functionalTitleMapperData.Personnel = ftMapperUpdater.updatePersonnel(functionalTitleMapperData.Personnel, updatedPersonnelData);
            });
            return update(state, { functionalTitleMapper: { functionalTitleMapperData: { $set: functionalTitleMapperData }, isLoading: { $set: false } } });
        }
    }
    return state;
};

const updateAssignFunctionalTitle = (state, data) => {
    let functionalTitleMapperData = Object.assign({}, state.functionalTitleMapper.functionalTitleMapperData);

    if (data[0] && data[0].length > 0) {
        const newData = data[0];

        _.forEach(newData, (newDataItem) => {
            const updatedFunctionalTitleMap = newDataItem.FunctionalTitleMap;
            const updatedPersonnel = newDataItem.Personnel;

            functionalTitleMapperData.FunctionalTitleMap = ftMapperUpdater.updateJobTitle(functionalTitleMapperData.FunctionalTitleMap, updatedFunctionalTitleMap);
            //ManageAllJobTitle
            const allJobTitleFTIndex = _.findIndex(functionalTitleMapperData.FunctionalTitleMap, { 'JobTitle': 'AllJobTitles' });
            if (allJobTitleFTIndex !== -1) {
                const tempFunctionalTitleMap = _.filter(functionalTitleMapperData.FunctionalTitleMap, function (item) {
                    return item.JobTitle !== 'AllJobTitles';
                });
                functionalTitleMapperData.FunctionalTitleMap = update(functionalTitleMapperData.FunctionalTitleMap, {
                    [allJobTitleFTIndex]: {
                        ManualFTCount: { $set: _.sumBy(tempFunctionalTitleMap, 'ManualFTCount') }
                    }
                });
            }
            functionalTitleMapperData.Personnel = ftMapperUpdater.updatePersonnel(functionalTitleMapperData.Personnel, updatedPersonnel);
        });
        return update(state, { functionalTitleMapper: { functionalTitleMapperData: { $set: functionalTitleMapperData }, isLoading: { $set: false } } });
    }
    return state;
};

const updateFunctionalTitle = (state, data) => {
    let functionalTitleMapperData = Object.assign({}, state.functionalTitleMapper.functionalTitleMapperData);
    
    if (data[0] && data[0].length > 0) {
        const newData = data[0];
        if (newData && newData.length > 0) {
            const updatedFunctionalTitle = newData[0].FunctionalTitle;

            functionalTitleMapperData.FunctionalTitles = ftMapperUpdater.updateFunctionalTitleData(functionalTitleMapperData.FunctionalTitles, updatedFunctionalTitle);
            return update(state, { functionalTitleMapper: { functionalTitleMapperData: { $set: functionalTitleMapperData }, isLoading: { $set: false } } });
        }
    }
    if (data[1] && data[1].length > 0) {
        const deletedData = data[1];
        if (deletedData && deletedData.length > 0) {
            const deletedFunctionalTitleId = deletedData[0];

            functionalTitleMapperData.FunctionalTitles = ftMapperUpdater.deleteFunctionalTitleData(functionalTitleMapperData.FunctionalTitles, deletedFunctionalTitleId);
            return update(state, { functionalTitleMapper: { functionalTitleMapperData: { $set: functionalTitleMapperData }, isLoading: { $set: false } } });
        }
    }
    return state;
};

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

const updateEntitiesList = (state, payloadData, entireState) => {
    let newStateObject = Object.assign([], state);
    let newData = [];

    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        const relevantEntityTypes = ['FunctionalTitleMap', 'AssignFunctionalTitle', 'FunctionalTitle'];
        _.forEach(payloadData, (payloadDataItem) => {
            const relevantPushData = _.filter(payloadDataItem.Data, function (o) { return relevantEntityTypes.indexOf(o.EntityType) > -1; });
            _.forEach(relevantPushData, (item) => {
                const entityType = item ? item.EntityType : '';
                newData = getEntityPayload(item, entityType);
                switch (entityType) {
                    case 'FunctionalTitleMap':
                        newStateObject = Object.assign([], updateFunctionalTitleMap(newStateObject, newData));
                        isPushRelevantChange = true;
                        break;
                    case 'AssignFunctionalTitle':
                        newStateObject = Object.assign([], updateAssignFunctionalTitle(newStateObject, newData));
                        isPushRelevantChange = true;
                        break;
                    case 'FunctionalTitle':
                        newStateObject = Object.assign([], updateFunctionalTitle(newStateObject, newData));
                        isPushRelevantChange = true;
                        break;
                }
            });
        });
        if (isPushRelevantChange) {
            return update(state, { $set: newStateObject });
        } else {
            return state;
        }
    } else {
        return state;
    }
};

const updatePushData = (state, action, entireState) => {
    if (!action.payload) return state;
    var parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });


    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData, entireState);
};

const BaselineReducer = (state = [], action, entireState) => {
    switch (action.type) {
        case actionTypes.BL_GROUP_CHANGE:
            return update(state, { functionalTitleMapper: { isLoading: { $set: true } }});

        case actionTypes.GET_FUNCTIONALTITLEMAP_DATA:
            if(!action.payload.data) return state;
            
            let functionalTitleMapperData = {};
            functionalTitleMapperData = action.payload.data;
            const functionalTitleMap = _.orderBy(Object.assign([], functionalTitleMapperData.FunctionalTitleMap), ['GroupId', 'JobTitle'], ['asc', 'asc']);
            functionalTitleMap.unshift({ FunctionalTitleMapId: '', Type: 'ALLJOBTITLES', JobTitle: 'AllJobTitles', FunctionalTitleId: '', ManualFTCount: _.sumBy(functionalTitleMap, 'ManualFTCount') });
            functionalTitleMapperData.FunctionalTitleMap = functionalTitleMap;
            if (action.payload.data) {
                return { ...state, functionalTitleMapper: { isLoading: false, functionalTitleMapperData: functionalTitleMapperData } }
            } else {
                return state;
            }

        case actionTypes.PUSH_DATA:
            if (!action.payload) return state;
            //console.log('action.payload_baselineReducer', true);
            return updatePushData(state, action, entireState);

        default:
            return state;
    }
}

export default BaselineReducer;
