import update from 'immutability-helper';
import _ from 'lodash';
import { createSelector } from 'reselect';
import AppConfig from '../../../appConfig';

const prepareFilteredSessions = (state, filteredGroupId, isGroupAdmin, permissions, showArchivedSessions) => {
    let stateObj = state;
    const groupId = filteredGroupId ? filteredGroupId : AppConfig.env('groupId');
    let showArchived = showArchivedSessions ? showArchivedSessions : false;
    if (_.size(stateObj) === 0) { return null }
    if (groupId === null) {
        return null;
    } else {
        const userPermissions = Object.keys(Object.assign({}, permissions.userPermissions));
        if (groupId === '00000000-0000-0000-0000-000000000000') {
            stateObj = _.filter(stateObj, (item) => {
                return (showArchived || item.Status !== 4)
                    && (userPermissions.indexOf(item.GroupId.toLowerCase()) > -1)
                    || ((userPermissions.indexOf(item.SessionId.toLowerCase()) > -1));
            });
            return update(state, { $set: stateObj });
        } else {
            stateObj = _.filter(stateObj, (item) => {
                return item.GroupId === groupId && (showArchived || item.Status !== 4)
                    && ((isGroupAdmin && userPermissions.indexOf(item.GroupId.toLowerCase()) > -1)
                        || (!isGroupAdmin && (userPermissions.indexOf(item.GroupId.toLowerCase()) > -1 || userPermissions.indexOf(item.SessionId.toLowerCase()) > -1)));
            });
            return update(state, { $set: stateObj });
        }
    }
};


export const getFilteredSessions = () => createSelector(
    prepareFilteredSessions,
    (filteredSessions) => ({
        filteredSessions
    })
);



const chachedState = (state) => {
    return update(state, { $set: state });
};

export const getChachedState = () => createSelector(
    chachedState,
    (chachedState) => ({
        chachedState
    })
);
