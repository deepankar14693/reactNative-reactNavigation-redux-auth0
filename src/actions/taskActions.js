import axios from 'axios';
import AppConfig from '../appConfig';
import { getMomentTimeStamp, getExportDetailsFields, getCurrentCulture, getLocalStorageKey } from '../common/utils';
import * as loghelper from '../common/loghelper';
import { setupCache } from 'axios-cache-adapter'
import * as privateSettings from '../privateSettings';
// export const getTaskTimeStamps = () => {
//     let params = { callTime: new Date() };
//     const url = 'CachedData/GetCachedTimeStamp';
//     const request = getAxios(url, { params: params });
//     return [{
//         type: 'GET_TIMESTAMPS',
//         payload: request
//     },
//     (dispatch, getState) => {
//         var timeStamps = getState().timeStamps;
//         dispatch(getTaskCategoryData(timeStamps));
//         dispatch(getTaskData(timeStamps));
//         dispatch(getTaskAttachments(timeStamps));
//     }]
// };

export const getTaskCategoryData = (timeStamps) => {
    let taskTimeStamp = getMomentTimeStamp(timeStamps ? timeStamps.TaskTimeStamp : new Date());// ? moment(timeStamps.TaskTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    //let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
    let projectId = getLocalStorageKey('projectId') || getLocalStorageKey('projectId');

    let params = { category: 1, groupedPhase: 0, callTime: new Date() };
    const url = 'Tasks/GetWeeklyCategory/' + projectId + '-' + taskTimeStamp;

    const request = getAxios(url, { params: params });
    return [{
        type: 'GET_TASK_CATEGORYDATA',
        payload: request
    },
    (dispatch, getState) => {
        var timeStamps = getState().timeStamps;
        dispatch(getTaskData(timeStamps));
        dispatch(getTaskAttachments(timeStamps));
    }]
};


// export const getTaskCategoryData = (timeStamps) => {
//     let taskTimeStamp = getMomentTimeStamp(timeStamps.TaskTimeStamp);// ? moment(timeStamps.TaskTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
//     let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

//     let params = { category: 1, groupedPhase: 0, callTime: new Date() };
//     const url = 'Tasks/GetWeeklyCategory/' + organizationId + '-' + taskTimeStamp;

//     const request = getAxios(url, { params: params });
//     return {
//         type: 'GET_TASK_CATEGORYDATA',
//         payload: request
//     }
// };

export const getTaskData = (timeStamps) => {
    let taskTimeStamp = getMomentTimeStamp(timeStamps.TaskTimeStamp);// ? moment(timeStamps.TaskTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    let params = { callTime: new Date() };
    //let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
    let projectId = getLocalStorageKey('projectId') || getLocalStorageKey('projectId');

    const url = 'Tasks/GetTasks/' + projectId + '-' + taskTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: 'GET_TASKDATA',
        payload: request
    }
};

export const getTaskAttachments = (timeStamps) => {
    let taskTimeStamp = getMomentTimeStamp(timeStamps.TaskTimeStamp);// ? moment(timeStamps.TaskTimeStamp).format('YYMMDDHHmmssms') : moment(new Date()).format('YYMMDDHHmmssms');
    //let organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
    let projectId = getLocalStorageKey('projectId') || getLocalStorageKey('projectId');
    let params = { callTime: new Date() };

    const url = 'Tasks/TaskAttachments/' + projectId + '-' + taskTimeStamp;

    const request = getAxios(url, { params: params });
    return {
        type: 'GET_TASK_ATTACHMENTS',
        payload: request
    }
};

export const showHideTasks = (taskId) => {
    let params = { taskId: taskId };
    return {
        type: 'SHOWHIDETASK',
        payload: params
    }
};

export const showHideTasksWeeks = (taskId) => {
    let params = { taskId: taskId };
    return {
        type: 'SHOWHIDETASK_WEEKS',
        payload: params
    }
};


export const onCategoryChange = () => {
    let params = {};
    return {
        type: 'CATEGORY_CHANGE',
        payload: params
    }
};

export const onCategoryChangeForView = () => {
    let params = {};
    return {
        type: 'CATEGORY_CHANGE_VIEW',
        payload: params
    }
};

export const onSelectRow = (taskId) => {
    let params = { taskId: taskId };
    return {
        type: 'ROW_SELECT',
        payload: params
    }
};

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
};

export const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message: message
    }
};

export const showLongNotification = (message) => {
    return {
        type: 'SHOW_LONG_NOTIFICATION',
        message: message
    }
};

export const onCreateTask = (task) => {
    let params = {
        category: parseInt(getLocalStorageKey("categoryId")), parentTaskId: task.ParentTaskId, taskNumber: task.TaskNumber, phase: task.Phase, name: task.Name, description: task.Description, notes: task.DeliverableNotes,
        role: task.Role, startWeek: task.StartWeek, endWeek: task.EndWeek, dropWeek: task.DropWeek, dueDay: task.DueDay, reportingType: task.ReportingType, isParent: task.IsParent
    };
    const url = 'Tasks/Create';
    const request = postAxios(url, { params: params });
    return {
        type: 'CREATE_TASK',
        payload: request
    }
};

export const onUpdateTask = (updatedTasks) => {
    let params = { 'tasks': updatedTasks };
    const url = 'Tasks/Update';
    const request = postAxios(url, { params: params });
    return {
        type: 'UPDATE_TASK',
        payload: request
    }
};

export const onDeleteTask = (taskId) => {
    let params = { 'taskId': taskId };
    const url = 'Tasks/Delete';
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_TASK',
        payload: request
    }
};

export const onUploadTaskAttachment = (attachmentId, files, entityId, entityType, category, description) => {
    let data = new FormData();
    data.append('attachmentId', attachmentId);
    data.append('file', files[0]);
    data.append('name', files[0].name);
    data.append('entityId', entityId);
    data.append('entityType', entityType);
    data.append('category', category);
    data.append('description', description);

    const url = 'Attachments/Upload';

    const request = postAxios(url, { params: data });
    return {
        type: (attachmentId === '' ? 'UPLOAD_TASK_ATTACHMENT' : 'REPLACE_TASK_ATTACHMENT'),
        payload: request
    }
};

export const onDeleteTaskAttachment = (attachmentId) => {
    var params = { attachmentId: attachmentId, entityType: 201 }
    const url = 'Attachments/Delete';
    const request = postAxios(url, { params: params });
    return {
        type: 'DELETE_TASK_ATTACHMENT',
        payload: request
    }
};

export const onDownloadTaskAttachment = (attachmentId) => {
    var params = { attachmentId: attachmentId }
    const url = 'Attachments/Download';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_TASK_ATTACHMENT',
        payload: request
    }
};

export const onExortTaskList = (exportedData, exportedFields, groupId, exportType, exportDetailSheetName) => {
    var name = window.parent.name;
    var params = { exportedData: exportedData, exportedFields: exportedFields, exportType: exportType, groupId: groupId, createdBy: name, 
        exportDetailsFields: getExportDetailsFields(), exportDetailSheetName: exportDetailSheetName, language: getCurrentCulture() }
    const url = 'Tasks/Export';
    const request = postAxios(url, { params: params });
    return {
        type: 'DOWNLOAD_EXPORT',
        payload: request
    }
};

const cache = setupCache({
    maxAge: 15 * 60 * 60 * 1000
});

const api = axios.create({
    adapter: cache.adapter
});

api.interceptors.request.use(request => {
    if (AppConfig.axiosLogger) {
        loghelper.consoleTime('ajax ' + request.method + ' ' + loghelper.formatUrl(request.url), 0, 3);
    }
    return request;
});

api.interceptors.response.use(response => {
    if (AppConfig.axiosLogger) {
        loghelper.consoleTimeEnd('ajax ' + response.config.method + ' ' + loghelper.formatUrl(response.config.url), 0, 3);
    }
    return response;
});

function getAxios(url, axiosRequestConfig) {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId'): (privateSettings && privateSettings.AuthenticationToken),
        projectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId') || '',
    };
    url = AppConfig.env('url') + url;
    var resp = api({
        method: 'get',
        url: url,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime

    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

function postAxios(url, axiosRequestConfig) {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId'): (privateSettings && privateSettings.AuthenticationToken),
        projectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId') || '',
    };
    url = AppConfig.env('url') + url;
    var resp = axios({
        method: 'post',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};
