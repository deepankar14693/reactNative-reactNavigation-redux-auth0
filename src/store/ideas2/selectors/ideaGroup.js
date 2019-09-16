import _ from 'lodash';
import { createSelector } from 'reselect';
import AppConfig from '../../../appConfig';
import { isCheckBoxChecked, isEmpty2, getSortingOrFilterObject, sortArrOfObjectsByParamNew } from '../../../common/utils';
import { getIdeaGroupsApplyFilters } from '../../../store/ideas/selectors/filteredIdeas';
import { createFilter } from 'react-native-search-filter';
import update from 'immutability-helper';

const prepareFilteredIdeaGroups = (state, filteredGroupId, isShowInactiveIdea, permissionsObj, singleRowForMultigroupIdea, isImplementation, showCompletedImplementationIdeas) => {
    let stateObj = state;
    const groupId = filteredGroupId ? filteredGroupId : AppConfig.env('groupId');
    if (_.size(stateObj) === 0) { return null }
    if (groupId === null) {
        return null;
    } else {
        const userPermissions = _.keys(permissionsObj.userPermissions);
        stateObj = _.filter(stateObj, (el) => {
            return el.Idea && (el.Idea.Status !== 3 && (el.Idea.Status !== 2 || !el.Idea.IsArchivePending) && !el.Idea.IsAcceptancePending)
                && ((isShowInactiveIdea || isImplementation) ? true : el.Idea.Status === 1) && (isImplementation ? (el.Idea.DecisionType === 1) : (1 === 1))
        });

        // if (isImplementation) {
        //     stateObj = _.filter(stateObj, (el) => {
        //         return el.Idea.Status === 1;
        //     });
        // }

        if (groupId === '00000000-0000-0000-0000-000000000000') {
            if (singleRowForMultigroupIdea) {
                stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3, 'IsPrimary': true });
                if (!showCompletedImplementationIdeas) {
                    stateObj = _.filter(stateObj, (idea) => { return (idea.Idea.ImplementationStatusOverride ? idea.Idea.ImplementationStatusOverride : idea.Idea.ImplementationStatus) !== 910 });

                }
            } else {
                stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3 });
                if (!showCompletedImplementationIdeas) {
                    stateObj = _.filter(stateObj, (idea) => { return (idea.ImplementationStatusOverride ? idea.ImplementationStatusOverride : idea.ImplementationStatus) !== 910 });

                }
            }
            stateObj = _.filter(stateObj, (ideaGroup) => {
                const focusAreaId = (ideaGroup.FocusAreaId === '00000000-0000-0000-0000-000000000000' || ideaGroup.FocusAreaId == null ? '' : ideaGroup.FocusAreaId);
                return (userPermissions.indexOf(ideaGroup.IdeaGroupId) > -1 || (focusAreaId !== '' && userPermissions.indexOf(focusAreaId) > -1) ||
                    (userPermissions.indexOf(ideaGroup.GroupId) > -1));
            });



            return update(state, { $set: stateObj });
        } else {
            stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3, 'GroupId': groupId });
            if (!showCompletedImplementationIdeas) {
                stateObj = _.filter(stateObj, (idea) => { return (idea.ImplementationStatusOverride ? idea.ImplementationStatusOverride : idea.ImplementationStatus) !== 910 });

            }
            //Implemented permission for groups not having any role.
            if (userPermissions.indexOf(groupId) === -1) {
                stateObj = _.filter(stateObj, (ideaGroup) => {
                    const focusAreaId = (ideaGroup.FocusAreaId === '00000000-0000-0000-0000-000000000000' || ideaGroup.FocusAreaId == null ? '' : ideaGroup.FocusAreaId);
                    return (userPermissions.indexOf(ideaGroup.IdeaGroupId) > -1 || (focusAreaId !== '' && userPermissions.indexOf(focusAreaId) > -1));
                });
                return update(state, { $set: stateObj });
            } else {
                return update(state, { $set: stateObj });
            }
        }
    }
};

const getReceivedPendingIdeas = (ideaGroups, groupId) => {
    const receivedIdeaGroups = _.filter(ideaGroups, { 'LinkedGroupStatus': 2, 'GroupId': groupId });
    const filteredIdeaGroups = _.filter(receivedIdeaGroups, (el) => {
        return (el.Idea.Status !== 3 && (el.Idea.Status !== 2 || !el.Idea.IsArchivePending) && !el.Idea.IsAcceptancePending)
    });
    return filteredIdeaGroups;
};

const getSentIdeaGroups = (ideaGroups, groupId) => {
    const sentIdeaGroups = _.filter(ideaGroups, (el) => {
        return el.LinkedGroupStatus === 2 && el.GroupId !== groupId
            && el.Idea.GroupId === groupId;
    });
    return sentIdeaGroups;
};

const sortIdeaGroupsOnLoad = (ideaGroups, sortingObj) => {
    if (sortingObj.sortColumn !== '') {
        ideaGroups = sortArrOfObjectsByParamNew(ideaGroups, sortingObj.sortColumn, sortingObj.sortAscending);
    } else {
        ideaGroups = _.orderBy(ideaGroups, [(o) => { return (o && o.GroupName) || 99999 }, (o) => { return (o && o.Idea && o.Idea.IdeaNumber) || 99999 }], ['asc', 'desc']);
    }
    return ideaGroups;
}

const sortShareTransferIdeaGroupsOnLoad = (ideaGroups, sortingObj) => {
    if (sortingObj.sortColumn !== '') {
        const sortColumn = sortingObj.sortColumn === 'PrimaryGroupName' ? 'GroupName' : sortingObj.sortColumn;
        if (sortingObj.sortAscending) {
            ideaGroups = _.orderBy(ideaGroups, [(o) => { return (o && o[sortColumn]) }], ['asc']);
        } else {
            ideaGroups = _.orderBy(ideaGroups, [(o) => { return (o && o[sortColumn]) }], ['desc']);
        }
    } else {
        ideaGroups = _.orderBy(ideaGroups, [(o) => { return (o && o.GroupName) || 99999 }, (o) => { return (o && o.IdeaNumber) || 99999 }], ['asc', 'desc']);
    }
    return ideaGroups;
}

const prepareFilteredIdeaGroupsForModals = (state, filteredGroupId, selectedView, tranferredIdeas, masterDataGroups, sortingState) => {
    let stateObj = state;
    const sortingObj = getSortingOrFilterObject(selectedView, sortingState);
    const groupId = filteredGroupId ? filteredGroupId : AppConfig.env('groupId');
    if (selectedView === 13 || selectedView === 14) {
        if (_.size(tranferredIdeas) === 0) { return null }
        if (groupId === null) {
            return null;
        } else {
            if (groupId === '00000000-0000-0000-0000-000000000000') {
                return null;
            } else {
                if (selectedView === 13) {
                    stateObj = getSentShareTransferIdeaGroups(tranferredIdeas, groupId, true, masterDataGroups);
                    stateObj = sortShareTransferIdeaGroupsOnLoad(stateObj, sortingObj);
                    return update(state, { $set: stateObj });
                } else if (selectedView === 14) {
                    stateObj = getSentShareTransferIdeaGroups(tranferredIdeas, groupId, false, masterDataGroups);
                    stateObj = sortShareTransferIdeaGroupsOnLoad(stateObj, sortingObj);
                    return update(state, { $set: stateObj });
                } else {
                    return null;
                }
            }
        }
    } else {
        if (_.size(stateObj) === 0) { return null }
        if (groupId === null) {
            return null;
        } else {
            if (groupId === '00000000-0000-0000-0000-000000000000') {
                stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3, 'IsPrimary': true });
                if (selectedView === 4) {
                    stateObj = _.filter(stateObj, (el) => { return el.Idea.Status === 3 && el.IsPrimary });
                } else if (selectedView === 5) {
                    stateObj = _.filter(stateObj, (el) => { return el.Idea.Status === 2 && el.Idea.IsArchivePending && el.IsPrimary });
                } else if (selectedView === 6) {
                    stateObj = null;
                } else if (selectedView === 12) {
                    stateObj = null;
                } else if (selectedView === 10) {
                    stateObj = null;
                } else if (selectedView === 11) {
                    stateObj = null;
                }
                else {
                    stateObj = null
                }
                return update(state, { $set: stateObj });
            } else {
                if (selectedView === 4) {
                    stateObj = _.filter(stateObj, (el) => { return el.Idea.Status === 3 && el.GroupId === filteredGroupId && el.IsPrimary });
                } else if (selectedView === 5) {
                    stateObj = _.filter(stateObj, (el) => { return el.Idea.Status === 2 && el.IsPrimary && el.Idea.IsArchivePending && el.GroupId === filteredGroupId });
                } else if (selectedView === 6) {
                    stateObj = getReceivedPendingIdeas(stateObj, groupId);
                } else if (selectedView === 12) {
                    stateObj = getSentIdeaGroups(stateObj, groupId);
                    stateObj = sortIdeaGroupsOnLoad(stateObj, sortingObj);
                } else if (selectedView === 10) {
                    const sharedIdeas = _.filter(tranferredIdeas, (item) => { return item.NewGroupId === groupId && item.IsCopy === true && item.Status === 1 })

                    stateObj = _.filter(stateObj, (el) => { return (el.Idea && el.Idea.IsAcceptancePending) && el.GroupId === groupId && _.findIndex(sharedIdeas, ['NewIdeaId', el.IdeaId]) >= 0 });

                    //stateObj = _.filter(stateObj, (el) => { return el.Idea.IsAcceptancePending && el.Idea.IsCopy && el.GroupId === groupId });                    
                } else if (selectedView === 11) {
                    const transferedIdeas = _.filter(tranferredIdeas, (item) => { return item.NewGroupId === groupId && !item.IsCopy && item.Status === 1 })

                    stateObj = _.filter(stateObj, (el) => { return (el.Idea && el.Idea.IsAcceptancePending) && el.IsPrimary === true && _.findIndex(transferedIdeas, ['NewIdeaId', el.IdeaId]) >= 0 });

                    //stateObj = _.filter(stateObj, (el) => { return el.Idea.IsAcceptancePending && !el.Idea.IsCopy && el.GroupId === groupId });                   
                }
                else {
                    stateObj = null
                }
                return update(state, { $set: stateObj });
            }
        }
    }

};

const getSentShareTransferIdeaGroups = (tranferredIdeas, groupId, isShare, masterDataGroups) => {
    const myTransferredOrSharedIdeas = _.filter(tranferredIdeas, (item) => { return item.OriginalGroupId === groupId && item.IsCopy === isShare && item.Status !== 3 })
    let transferredOrSharedIdeasSorted = [];
    if (myTransferredOrSharedIdeas.length > 0) {
        _.map(myTransferredOrSharedIdeas, (el) => {
            el["GroupName"] = (masterDataGroups[el.NewGroupId] ? masterDataGroups[el.NewGroupId].Name : '');
            el["IdeaNumber"] = el.OriginalIdeaNumber;
            el["IdeaGroupId"] = el.EntityId;
            transferredOrSharedIdeasSorted.push(el);
        });
    }
    return transferredOrSharedIdeasSorted;
};

const prepareFilteredIdeaGroupsCountsForModals = (state, filteredGroupId, selectedViewName, tranferredIdeas, masterDataGroups, selectedView) => {
    let stateObj = state;
    const filteredIdeaGroupCount = { count1: 0, count2: 0, count3: 0, count4: 0 }
    const groupId = filteredGroupId ? filteredGroupId : AppConfig.env('groupId');
    if (selectedViewName === 'ShareAndTransfer') {
        if (_.size(stateObj) === 0) {
            filteredIdeaGroupCount.count1 = 0;
            filteredIdeaGroupCount.count2 = 0;

        }
        if (_.size(tranferredIdeas) === 0) {
            filteredIdeaGroupCount.count3 = 0;
            filteredIdeaGroupCount.count4 = 0;
        }
        if (groupId === null) {
            filteredIdeaGroupCount.count1 = 0;
            filteredIdeaGroupCount.count2 = 0;
            filteredIdeaGroupCount.count3 = 0;
            filteredIdeaGroupCount.count4 = 0;
        } else {
            if (groupId === '00000000-0000-0000-0000-000000000000') {
                filteredIdeaGroupCount.count1 = 0;
                filteredIdeaGroupCount.count2 = 0;
                filteredIdeaGroupCount.count3 = 0;
                filteredIdeaGroupCount.count4 = 0;
            }
            else {
                const sharedIdeas = _.filter(tranferredIdeas, (item) => { return item.NewGroupId === groupId && item.IsCopy === true && item.Status === 1 })
                const transferedIdeas = _.filter(tranferredIdeas, (item) => { return item.NewGroupId === groupId && !item.IsCopy && item.Status === 1 })

                filteredIdeaGroupCount.count2 = _.size(_.filter(stateObj, (el) => { return (el.Idea && el.Idea.IsAcceptancePending) && _.findIndex(sharedIdeas, ['NewIdeaId', el.IdeaId]) >= 0 && el.GroupId === groupId }));
                filteredIdeaGroupCount.count1 = _.size(_.filter(stateObj, (el) => { return (el.Idea && el.Idea.IsAcceptancePending) && el.IsPrimary === true && _.findIndex(transferedIdeas, ['NewIdeaId', el.IdeaId]) >= 0 }));
                filteredIdeaGroupCount.count4 = _.size(getSentShareTransferIdeaGroups(tranferredIdeas, groupId, true, masterDataGroups));
                filteredIdeaGroupCount.count3 = _.size(getSentShareTransferIdeaGroups(tranferredIdeas, groupId, false, masterDataGroups));
            }
        }
        return filteredIdeaGroupCount;
    } else {
        if (_.size(stateObj) === 0) { return filteredIdeaGroupCount }
        if (groupId === null) {
            return filteredIdeaGroupCount;
        } else {
            if (groupId === '00000000-0000-0000-0000-000000000000') {
                stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3, 'IsPrimary': true });
                if (selectedViewName === 'Archive') {
                    filteredIdeaGroupCount.count1 = _.filter(stateObj, (el) => { return el.Idea.Status === 2 && el.Idea.IsArchivePending && el.IsPrimary }).length;
                    filteredIdeaGroupCount.count2 = _.filter(stateObj, (el) => { return el.Idea.Status === 3 && el.IsPrimary }).length;
                } else if (selectedViewName === 'MultiGroup') {
                    filteredIdeaGroupCount.count1 = 0
                    filteredIdeaGroupCount.count2 = 0

                } else if (selectedViewName === 'ShareAndTransfer') {
                    filteredIdeaGroupCount.count1 = 0
                    filteredIdeaGroupCount.count2 = 0
                    filteredIdeaGroupCount.count3 = 0
                    filteredIdeaGroupCount.count4 = 0
                }
                return filteredIdeaGroupCount;
            } else {
                if (selectedViewName === 'Archive') {
                    filteredIdeaGroupCount.count1 = _.size(_.filter(stateObj, (el) => { return el.Idea.Status === 2 && el.IsPrimary && el.Idea.IsArchivePending && el.GroupId === filteredGroupId }));
                    filteredIdeaGroupCount.count2 = _.size(_.filter(stateObj, (el) => { return el.Idea.Status === 3 && el.GroupId === filteredGroupId && el.IsPrimary }));
                } else if (selectedViewName === 'MultiGroup') {
                    const receivedIdeaGroups = getReceivedPendingIdeas(stateObj, groupId);
                    const sentIdeaGroups = getSentIdeaGroups(stateObj, groupId);
                    filteredIdeaGroupCount.count1 = receivedIdeaGroups ? _.size(receivedIdeaGroups) : 0;
                    filteredIdeaGroupCount.count2 = sentIdeaGroups ? _.size(sentIdeaGroups) : 0;
                }
                return filteredIdeaGroupCount;
            }
        }
    }
};

export const getFilteredIdeaGroups = () => createSelector(
    prepareFilteredIdeaGroups,
    (filteredIdeaGroups) => ({
        filteredIdeaGroups
    })
);

export const getFilteredIdeaGroupsForModals = () => createSelector(
    prepareFilteredIdeaGroupsForModals,
    (filteredIdeaGroups) => ({
        filteredIdeaGroups
    })
);

export const getFilteredIdeaGroupsCountForModals = () => createSelector(
    prepareFilteredIdeaGroupsCountsForModals,
    (filteredIdeaGroups) => ({
        filteredIdeaGroups
    })
);



const ideaGroupData = (ideaGroups, ideaId) => {
    if (!ideaId) return null;
    return _.filter(ideaGroups, { 'IdeaId': ideaId });
};

export const getIdeaGroups = () => createSelector(
    ideaGroupData,
    (ideaGroups) => ({
        ideaGroups
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

const cachedPrimaryIdeaGroup = (ideaGroups, ideaId) => {
    if (ideaGroups.length > 0 && ideaId) {
        const primaryIdeaGroup = _.filter(ideaGroups, { IdeaId: ideaId, IsPrimary: true });
        if (primaryIdeaGroup.length > 0) {
            return primaryIdeaGroup[0];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

export const getPrimaryIdeaGroup = () => createSelector(
    cachedPrimaryIdeaGroup,
    (chachedState) => ({
        chachedState
    })
);

const getIdeaGroupsOnCurrentPage = (filteredIdeaGroups, comprehensiveFilter, selectedView) => {
    const data = { index: -1 };
    const currentPage = comprehensiveFilter.currentPage;
    const perPageIdeaCount = comprehensiveFilter.perPageIdeaCount;
    let isAllChecked = true;
    const filteredIdeaGroupsUpdated = filteredIdeaGroups.filter((filteredIdeaGroup) => {
        data.index += 1;
        if (data.index >= (currentPage - 1) * perPageIdeaCount && data.index < currentPage * perPageIdeaCount) {
            if (!(isCheckBoxChecked(selectedView, filteredIdeaGroup.IsChecked))) {
                isAllChecked = false;
            }
            return true;
        } else {
            return false
        }
    });
    return { filteredIdeaGroups: update(filteredIdeaGroups, { $set: filteredIdeaGroupsUpdated }), isAllChecked: (filteredIdeaGroupsUpdated.length > 0 ? isAllChecked : false) };
}

export const getCachedIdeaGroupsOnCurrentPage = () => createSelector(
    getIdeaGroupsOnCurrentPage,
    (ideaGroups) => ({
        ideaGroups
    })
);

const getFilteredAndSearchedIdeaGroups = (searchedText, filteredIdeaGroups, applyFilters, itGroupId, groupId) => {
    const KEYS_TO_FILTERS = ['Idea.IdeaNumber', 'Idea.PrimaryGroupName', 'Idea.Title', 'Idea.Description', 'FocusAreaName'];
    const filterKeys = createFilter(searchedText, KEYS_TO_FILTERS);
    let filteredIdeaGroupsUpdated = isEmpty2(searchedText) ? filteredIdeaGroups : filteredIdeaGroups.filter(filterKeys);
    filteredIdeaGroupsUpdated = applyFilters.length === 0 ? filteredIdeaGroupsUpdated : getIdeaGroupsApplyFilters(filteredIdeaGroupsUpdated, applyFilters, itGroupId, groupId);
    return update(filteredIdeaGroups, { $set: filteredIdeaGroupsUpdated });
}

export const getCachedFilteredAndSearchedIdeaGroups = () => createSelector(
    getFilteredAndSearchedIdeaGroups,
    (ideaGroups) => ({
        ideaGroups
    })
);

export const getIdeaGroupByGroupNameAndIdeaId = () => createSelector(
    cachedIdeaGroupByGroupNameAndIdeaId,
    (chachedState) => ({
        chachedState
    })
);

const cachedIdeaGroupByGroupNameAndIdeaId = (ideaGroups, masterGroupData, ideaId, GroupName) => {
    if (ideaGroups.length > 0 && ideaId) {
        let singleIdeaGroup = [];
        const groupInfo = _.filter(masterGroupData, { Name: GroupName });
        if (groupInfo.length > 0) {
            singleIdeaGroup = _.filter(ideaGroups, { IdeaId: ideaId, GroupId: groupInfo[0].GroupId });
        }
        if (singleIdeaGroup.length > 0) {
            return singleIdeaGroup;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
