import _ from 'lodash';
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

const Attachments = (state = [], action, entireState) => {
    var parsedData;

    switch (action.type) {
        case 'UPLOAD_TASK_ATTACHMENT':
            var payload = action.payload.data;
            if (action.payload.data === null) return state;
            action.payload.data["EntityId"] = action.payload.data.AttachmentId;
            return [...state, action.payload.data];
        case 'GET_TASK_ATTACHMENTS':
            parsedData = action.payload.data;
            var stateObj = Object.assign([], parsedData.Attachments);
            return stateObj;
        case 'DELETE_TASK_ATTACHMENT':
            if (!action.payload || action.payload.data == '' || action.payload.statusText !== "OK") return state;
            var stateObj = Object.assign([], state);
            var deletedAttachmentId = action.payload.data;
            var deletedAttachment = stateObj.filter((t) => t.AttachmentId === deletedAttachmentId);
            if (deletedAttachment.length > 0) {
                var index = stateObj.indexOf(deletedAttachment[0])
                stateObj.splice(index, 1);
            }
            return stateObj;
        case 'DOWNLOAD_TASK_ATTACHMENT':
            var payload = action.payload.data;
            if (payload.FileContent !== null) {
                var dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            } return state;
        case 'REPLACE_TASK_ATTACHMENT':
            var payload = action.payload.data;
            if (action.payload.data === null) return state;
            return Object.assign([], ...state, state.map(post => updateAttachmentFields(post, payload)));
        case 'DOWNLOAD_EXPORT':
            var payload = action.payload.data;
            if (payload.FileContent !== null) {
                var dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            } return state;
        case 'GET_RISK_RATERS_EXPORT':
            var payload = action.payload.data;
            if (payload.FileContent !== null) {
                var dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            } return state;
        case 'GET_MULTI_GROUP_IDEAS_EXPORT':
            var payload = action.payload.data;
            if (payload.FileContent !== null) {
                var dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            } return state;
        default: return state;
        
    }
}

export default Attachments;
