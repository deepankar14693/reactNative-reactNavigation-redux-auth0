import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import { getEntityPayload, getLastProjectId } from '../common/utils';

const udpateSCRReports = (scrReports, updatedSCRReport) => {
    const updatedSCRIndex = _.findIndex(scrReports, { 'SCRReportId': updatedSCRReport.SCRReportId });
    if (updatedSCRIndex !== -1) {
        scrReports = update(scrReports, {
            [updatedSCRIndex]: {
                AttachmentId: { $set: updatedSCRReport.AttachmentId },
                GroupId: { $set: updatedSCRReport.GroupId }, GroupName: { $set: updatedSCRReport.GroupName },
                FileName: { $set: updatedSCRReport.FileName }, SCRNumber: { $set: updatedSCRReport.SCRNumber },
                UploadedBy: { $set: updatedSCRReport.UploadedBy }, UploadedByName: { $set: updatedSCRReport.UploadedByName }, UploadedOn: { $set: updatedSCRReport.UploadedOn },
                CTMApprovalBy: { $set: updatedSCRReport.CTMApprovalBy }, CTMApprovalByName: { $set: updatedSCRReport.CTMApprovalByName }, CTMApprovalOn: { $set: updatedSCRReport.CTMApprovalOn },
                PPApproval: { $set: updatedSCRReport.PPApproval }, PPApprovalByName: { $set: updatedSCRReport.PPApprovalByName }, PPApprovalOn: { $set: updatedSCRReport.PPApprovalOn },
                LockedBy: { $set: updatedSCRReport.LockedBy }, LockedByName: { $set: updatedSCRReport.LockedByName }, LockedOn: { $set: updatedSCRReport.LockedOn },
                Sequence: { $set: updatedSCRReport.Sequence },
            }
        });
    } else {
        scrReports = update(scrReports, { $splice: [[0, 0, updatedSCRReport]] });
    }
    return scrReports;
};

const updateSCRReportEntities = (state, data) => {
    var stateObj = Object.assign([], state);
    if (data[0] && data[0].length > 0) {
        const newData = data[0];
        if (newData && newData.length > 0) {
            const updatedSCRReport = newData[0];

            stateObj = udpateSCRReports(stateObj, updatedSCRReport);
            return update(state, { $set: stateObj });
        }
    }
    return update(state, { $set: stateObj });
};

const updateEntitiesList = (state, payloadData) => {
    let newStateObject = Object.assign([], state);
    let newData = [];

    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        const relevantEntityTypes = ['SCRReport'];
        _.forEach(payloadData, (payloadDataItem) => {
            const relevantPushData = _.filter(payloadDataItem.Data, function (o) { return relevantEntityTypes.indexOf(o.EntityType) > -1; });
            _.forEach(relevantPushData, (item) => {
                const entityType = item ? item.EntityType : '';
                newData = getEntityPayload(item, entityType);
                switch (entityType) {
                    case 'SCRReport':
                        newStateObject = Object.assign([], updateSCRReportEntities(newStateObject, newData));
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
const openInNewTab = (parsedData) => {
    var binary = atob(parsedData.FileContent);
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    var blob = new Blob([view], { type: parsedData.ContentType });
    var url = window.URL.createObjectURL(blob);
    
    var myWindow = window.open("", '_blank');
    var html = '<html><head><title>' + parsedData.FileName + '</title></head><body style="overflow:hidden"><iframe src="' + url + '"height="100%" width="100%"></iframe></body></html>';

    if (myWindow && myWindow.document) {
        myWindow.document.write(html);
        myWindow.document.close();
    }
}
const updatePushData = (state, action, entireState) => {
    if (!action.payload) return state;
    var parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });

    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData);
};

const scrReportsReducer = (state = [], action, entireState) => {
    var parsedData;
    switch (action.type) {
        case 'GET_SCR_REPORTS':
            if (action.payload.data) {
                parsedData = action.payload.data;
                // const newState = _.unionBy(state, action.payload.data, 'SCRReportId');
                // return Object.assign([], ...state, newState);
                return Object.assign([], ...state, parsedData);
            } else {
                return state;
            }
        case actionTypes.PRINT_SCR_REPORTS:
            if (action.payload.data) {
                parsedData = action.payload.data;
                if (parsedData && parsedData.FileContent && parsedData.FileContent !== null) {
                    openInNewTab(parsedData);
                }
            }
            return state;
        case actionTypes.PUSH_DATA:
            if (!action.payload) return state;
            return updatePushData(state, action, entireState);
        default:
            return state;
    }
};

export default scrReportsReducer;
