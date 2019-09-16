import * as actionTypes from './actionTypes';

export const showLoadingNotification2 = (message) => {
    return {
        type: 'SHOW_LOADING_NOTIFICATION2',
        message: message
    }
};

export const hideLoadingNotification2 = () => {
    return {
        type: 'HIDE_LOADING_NOTIFICATION2'
    }
};

export const showGroupChnageNotification = (message) => {
    return {
        type: 'SHOW_GROUPCHANGE_NOTIFICATION',
        message: message
    }
};

export const hideGroupChnageNotification = () => {
    return {
        type: 'HIDE_GROUPCHANGE_NOTIFICATION'
    }
};

export const hideDashboardNotification = () => {
    return {
        type: 'HIDE_DASHBOARD_NOTIFICATION'
    }
};

export const showNotification2 = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message: message
    }
};

export const hideNotification2 = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
};

export const showPdfNotification = (message, id) => {
    return {
        type: 'SHOW_PDF_NOTIFICATION',
        message: message,
        id: id
    }
};

export const hidePdfNotification = (id) => {
    return {
        type: 'HIDE_PDF_NOTIFICATION',
        id: id
    }
};
export const changeMessagePdfNotification = (message, id) => {
    return {
        type: 'CHANGE_MESSAGE_PDF_NOTIFICATION',
        reportMessage: message,
        id: id,
    }
};

export const showCreateNewItemNotification = (message) => {
    return {
        type: actionTypes.SHOW_CREATE_NEW_ITEM_NOTIFICATION,
        message: message
    }
};

export const showMultiNotification = (notifyItem) => {
    return {
        type: actionTypes.SHOW_MULTI_NOTIFY,
        payload: notifyItem
    }
};

export const hideMultiNotification = (id) => {
    return {
        type: actionTypes.HIDE_MULTI_NOTIFY,
        id: id
    }
};