import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import { getIndexBy, getLastProjectId, getLocalStorageKey } from '../common/utils';

var download = require("downloadjs");

const updateAttachmentFields = (attachment, payload) => {
    if (attachment.AttachmentId !== payload.AttachmentId) return attachment;
    if (attachment.AttachmentId === payload.AttachmentId) {
        return Object.assign({}, attachment,
            {
                FileName: payload.FileName == null || payload.FileName === '' ? attachment.FileName : payload.FileName,
                Description: payload.Description,
                ModifiedBy: payload.ModifiedBy, ModifiedOn: payload.ModifiedOn
            });
    }
};

const updateEntitiesList = (state, payloadData) => {
    let newStateObject = Object.assign([], state);
    let newData = [];
    let newState = [];
    _.forEach(payloadData, (item) => {
        newData = getEntityPayload(item.Data, "Attachment");
        newState = Object.assign([], updateEntities(newStateObject, newData));
        newStateObject = Object.assign([], newState);
    });

    return newStateObject;
};


const updatePushAttachment = (state, action, entireState) => {
    if (!action.payload) return state;
    const parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });


    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData);
    // var payloadData = JSON.parse(action.payload);
    // if (payloadData.OrganizationId.toLowerCase() !== getLocalStorageKey('organizationId').toLocaleLowerCase()) return state;

    // if (!payloadData.Data) return state;
    // let newData = getEntityPayload(payloadData.Data, "Attachment");
    // return updateEntities(state, newData, "Attachment");
};

const updateEntities = (state, data, entityType) => {
    let stateObj = Object.assign([], state);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }
    if (data[0] && data[0].length > 0) {
        stateObj = _.unionBy(data[0], stateObj, 'EntityId');
    }

    return Object.assign([], ...state, stateObj);
}

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

const Attachments = (state = [], action, entireState) => {
    let parsedData;
    let payload;
    switch (action.type) {
        case actionTypes.GET_IDEA_DETAIL_DATA:
            if (!action.payload) return state;
            if (action.payload.data.Attachments && action.payload.data.Attachments.length > 0) {
                return _.unionBy(action.payload.data.Attachments, state, 'AttachmentId');
            } else {
                return state;
            }
        case 'UPLOAD_ATTACHMENT':
            payload = action.payload.data;
            if (action.payload.data === null) return state;
            const index = getIndexBy(state, 'EntityId', action.payload.data.AttachmentId)
            if (index === -1) {
                if (action.payload.data === null) return state;
                action.payload.data["EntityId"] = action.payload.data.AttachmentId;
                return [...state, action.payload.data];
            }
            return state;
        case 'GET_IDEA_DETAILS':
            if (!action.payload) return state;
            parsedData = JSON.parse(action.payload.data).Attachments;
            return Object.assign([], ...state, parsedData);
        case 'GET_IDEAATTACHMENT':
            if (!action.payload) return state;
            parsedData = action.payload.data;
            return Object.assign([], ...state, parsedData);
        case 'DELETE_ATTACHMENT':
            if (!action.payload || action.payload.data == '' || action.payload.statusText !== "OK") return state;
            let deletedAttachmentId = action.payload.data;
            let deletedAttachment = state.filter((t) => t.AttachmentId === deletedAttachmentId);
            if (deletedAttachment.length > 0) {
                const index = state.indexOf(deletedAttachment[0])
                state.splice(index, 1);
            }
            return state;
        case 'DOWNLOAD_ATTACHMENT':
            payload = action.payload.data;
            if (payload.FileContent !== null) {
                const dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            } return state;
        case 'REPLACE_ATTACHMENT':
            payload = action.payload.data;
            if (action.payload.data === null) return state;
            return Object.assign([], ...state, state.map(post => updateAttachmentFields(post, payload)));
        case 'EXPORT_EXCEL':
            payload = action.payload.data;
            if (payload.FileContent !== null) {
                const dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            }
            return state;
        case 'PUSH_DATA':
            if (!action.payload) return state;
            return updatePushAttachment(state, action, entireState);
        default: return state;
    }
}

export default Attachments;
