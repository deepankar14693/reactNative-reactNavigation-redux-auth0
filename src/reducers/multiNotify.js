import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';
import _ from 'lodash';
import { isEmpty2 } from '../common/utils';
import { getNotifyItem } from '../common/notifyConstants';

const getDefaultNotify = () => {
    return {
        id: '',
        type: 1,
        message: 'Loading',
        isTranslate: true,
        alertType: 1,
        hideType: 'auto'
    };
};

const getCurrentNotifyData = (payloadData) => {
    let currNotification = getDefaultNotify();
    currNotification.id = payloadData.id;
    if (!isEmpty2(payloadData.hideId)) {
        currNotification.hideId = payloadData.hideId;
    }
    if (!isEmpty2(payloadData.message)) {
        currNotification.message = payloadData.message;
    }
    if (!isEmpty2(payloadData.hideType)) {
        currNotification.hideType = payloadData.hideType;
    }
    if (!isEmpty2(payloadData.alertType)) {
        currNotification.alertType = payloadData.alertType;
    }
    if (!isEmpty2(payloadData.type)) {
        currNotification.type = payloadData.type;
    }
    if (!isEmpty2(payloadData.isTranslate)) {
        currNotification.isTranslate = payloadData.isTranslate;
    }
    return currNotification;
};

const showMultiNotify = (state, payload) => {
    if (!payload) return state;
    let multiNotify = _.cloneDeep(state);
    let currNotification = getCurrentNotifyData(payload);
    if (!isEmpty2(currNotification.hideId)) {
        multiNotify = hideMultiNotify(multiNotify, { 'id': currNotification.hideId });
    }
    const index = _.findIndex(multiNotify, { 'id': currNotification.id });
    if (index === -1) {
        multiNotify = update(multiNotify, { $splice: [[0, 0, currNotification]] });
    }
    return multiNotify;
};

const hideMultiNotify = (state, action) => {
    let hideMultiNotify = _.cloneDeep(state);
    const deletedIndex = _.findIndex(hideMultiNotify, { 'id': action.id });
    if (deletedIndex !== -1) {
        hideMultiNotify = update(hideMultiNotify, { $splice: [[deletedIndex, 1]] });
    }
    return hideMultiNotify;
};

const MultiNotifyReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SHOW_MULTI_NOTIFY:
            if (!action.payload) return state;
            return update(state, { $set: showMultiNotify(state, action.payload) });
        case actionTypes.HIDE_MULTI_NOTIFY:
            return update(state, { $set: hideMultiNotify(state, action) });
        case actionTypes.CREATE_AUTH0_USER:
            let createAuth0Notify = _.cloneDeep(state);
            if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
                createAuth0Notify = showMultiNotify(createAuth0Notify, getNotifyItem('CreateAuth0UserSuccess'));
            } else {
                createAuth0Notify = showMultiNotify(createAuth0Notify, getNotifyItem('CreateAuth0UserFail'));
            }
            return update(state, { $set: createAuth0Notify });
            break;
        case actionTypes.INVITE_AUTH0_USER:
            let inviteNotify = _.cloneDeep(state);
            if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
                inviteNotify = showMultiNotify(inviteNotify, getNotifyItem('InviteSuccess'));
            } else {
                inviteNotify = showMultiNotify(inviteNotify, getNotifyItem('InviteFail'));
            }
            return update(state, { $set: inviteNotify });
        case actionTypes.CREATE_PERSONNEL_FROM_USERS:
            let personnelNotify = _.cloneDeep(state);
            if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
                personnelNotify = showMultiNotify(personnelNotify, getNotifyItem('CreatePersonnelSuccess'));
            } else {
                personnelNotify = showMultiNotify(personnelNotify, getNotifyItem('CreatePersonnelFail'));
            }
            return update(state, { $set: personnelNotify });
        case actionTypes.GET_GROUPADMIN_LEADERSHIP:
            return update(state, { $set: hideMultiNotify(state, { id: 'LoadingGroupAdminLeadership' }) });
        case actionTypes.CHANGE_AUTH0_USER_MFA:
            return update(state, { $set: hideMultiNotify(state, { id: 'ChangeMFA' }) });
        case actionTypes.RESET_AUTH0_USER_MFA:
            return update(state, { $set: hideMultiNotify(state, { id: 'ResetMFA' }) });
        default:
            return state;
    }
};

export default MultiNotifyReducer;
