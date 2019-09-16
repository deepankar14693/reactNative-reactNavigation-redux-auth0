//import * as Cookies from 'js-cookie';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import getArrayFromObject from 'object.values';
import React from 'react';
////import ReactDOMServer from 'react-dom/server';
import AppConfig from '../appConfig';
import { checkRole, isLessThanGroupAccess } from '../common/permissionMaster';
import { COMPREHENSIVE_VIEW, COMPREHENSIVE_VIEW_IMPLEMENTATION, CUSTOM_VIEW, IDEA_GENERATION_VIEW, IDEA_SIMPLIFIED_VIEW, IDEA_VIEW, VIEW_LINE_ITEMS, VIEW_METRICS, VIEW_MILESTONES } from '../common/permissions';
 import i18n from '../i18n';
//import * as constants from './constants.js';
import { MajorMenu } from './menuTypes';
import { Events, Names, Path } from './uiActions';
//import MobileDetect from 'mobile-detect';
import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from 'react-native-cookies';

import { View, Text, Platform } from 'react-native';


const contains = require('lodash/includes'); // changed from contains

/**
 * @Returns true or false 
 * @Usage parseBool(null), parseBool('true'), parseBool(1)
 * @param {*} value 
 */
export const parseBool = function (value) {
    return !!(parseInt(value) || value === "true" || value === 'TRUE');
};

/**
 * @Returns true, false or undefined 
 * @Usage parseBoolOrUndefined(null), parseBoolOrUndefined('true'), parseBoolOrUndefined(1)
 * @param {*} value 
 */
export const parseBoolOrUndefined = function (value) {
    if (value === null || value === '' || value === undefined || value === 'undefined') return undefined;
    return !!(parseInt(value) || value === "true" || value === 'TRUE');
};

export const getIndexBy = function (arr, name, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][name] === value) {
            return i;
        }
    }
    return -1;
};

export const getTextValue = (text) => {
    return (text ? text : '');
};

export const getMomentTimeStamp = (dateTime) => {
    return (dateTime ? moment(new Date(dateTime), 'YYMMDDHHmmssms', 'en').format('YYMMDDHHmmssms') : moment(new Date(), 'YYMMDDHHmmssms', 'en').format('YYMMDDHHmmssms'));
};

export const isEmpty = (value) => {
    return _.isEmpty(value);
};

/**
 * Method to check string/object is null or undefined
 * @return {bool} true/false
 */
export const isEmpty2 = function (value, allowEmptyString) {
    return (value === ' ') || (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (isArray(value) && value.length === 0);
};
/**
* Method to check object is array or not
* @return {bool} true/false
*/
export const isArray = ('isArray' in Array) ? Array.isArray : function (value) {
    return toString.call(value) === '[object Array]';
};



export const newGuid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const isEmptyLineItemValue = (value) => {
    if (value === " ") {
        value = "";
    }
    if (value) {
        return false;
    } else {
        return true;
    }
};

export const checkNegatveValue = (value) => {
    if (value.formattedValue.indexOf('-') !== -1) { return true; }
    return false;
};

export const getTimingLabel = (value, formate) => {
    if (value === "" || value === " " || value === null) { return ''; }
    //return moment.utc(value).format(formate);
    return moment(value).format(formate);
}

export const getUTCTimingLabel = (value, formate) => {
    if (value === "" || value === " " || value === null) { return ''; }
    return moment.utc(value).format(formate);
}

export const isValidTimingOption = (rampMonths, timing, timingOptions) => {
    const newTiming = ((moment.utc(timing).local(true)).subtract(parseInt(parseInt(rampMonths)), 'months')).local(true);
    if (!newTiming) return false;
    const timeWithFormat = moment(newTiming).format('YYYYMM');
    const timingNew = timingOptions.filter(function (el) { return el.value === timeWithFormat });
    if (timingNew.length > 0) {
        return true;
    } else {
        return false;
    }
};

export const isValidAmountAccordingRamp = (rampValues, amount) => {
    amount = isEmpty(amount) ? 0 : amount;
    const newAnnualRate = _.divide(parseFloat(amount), 12);
    const rampValueArray = (rampValues.split(',')).map(Number);
    const maxRampValue = _.max(rampValueArray);
    if (maxRampValue > newAnnualRate) {
        return false;
    } else {
        return true;
    }
};

export const getMaxTiming = (timings, formate) => {
    const timingNew = _.values(_.pickBy(timings, _.identity));
    if (timingNew.length === 0) { return null; }
    let moments = timingNew.map(d => moment(d)),
        maxTiming = moment.max(moments);
    return getUTCTimingLabel(maxTiming._d, formate);
}

export const formattedDateTime = (value) => {
    return moment(value).format(AppConfig.modifiedOnDateFormat);
}
export const getRecentEditTiming = (value, format) => {
    if (isEmpty(value)) return '';
    if (format) {
        return moment(value).format(format);
    } else {
        return moment(value).format('LLL');
    }
};

export const prepareObjectFromArray = (array, keys) => {
    if (array == null) return {};
    var nodes = {};
    for (var i = 0, len = array.length; i < len; ++i) {
        var item = array[i];
        //var uniqueKey = item[key];
        var uniqueKey = '';
        keys.forEach(function (value) {
            uniqueKey += (uniqueKey === '') ? item[value] : '-' + item[value];
        })
        nodes[uniqueKey] = array[i];
    }
    return nodes;
};

export const filterFunctionalTitles = (fteArray) => {
    const fteFilteredArry = fteArray.filter(function (el) { return el.FunctionalTitleId !== "00000000-0000-0000-0000-000000000000" });
    return fteFilteredArry;
};


export const getRiskStage = (riskStatus) => {
    switch (riskStatus) {
        case 1:
            return i18n.t('RiskRoughStage');
        case 2:
            return i18n.t('RiskGLStage');
        case 3:
            return i18n.t('RiskAllRatersStage');
        case 4:
            return i18n.t('RiskCompleteStage');
        default:
            return i18n.t('NotStarted');
    }
}

export const getLeadership = (leadershipType) => {
    switch (leadershipType) {
        case 1:
            return i18n.t('GroupLeader');
        case 2:
            return i18n.t('AGL');
        case 3:
            return i18n.t('Ctm');
        case 4:
            return i18n.t('Scm');
        case 5:
            return i18n.t('IC');
        case 6:
            return i18n.t('ProjectPartner');
        default:
            return i18n.t('Others');
    }
}

export const getDecisionStage = (decisionStatus) => {
    switch (decisionStatus) {
        case 1:
            return i18n.t('DecisionGLRecStage');
        case 2:
            return i18n.t('DecisionSCReviewStage');
        case 3:
            return i18n.t('DecisionSCDecisionStage');
        default:
            return i18n.t('NotStarted');
    }
}

export const getValueStage = (valueStatus) => {
    switch (valueStatus) {
        case 1:
            return i18n.t('ValueRoughStage');
        case 2:
            return i18n.t('ValueDetailedStage');
        case 3:
            return i18n.t('ValueCompleteStage');
        case 4:
            return i18n.t('ValueValidatedStage');
        default:
            return i18n.t('NotStarted');
    }
}

export const getIdeaStatusLabel = (ideaStatus) => {
    var ideaStatusLabel = i18n.t('Select')
    switch (ideaStatus) {
        case 1:
            ideaStatusLabel = i18n.t('Active');
            break;
        case 2:
            ideaStatusLabel = i18n.t('Inactive');
            break;
        default:
            ideaStatusLabel = i18n.t('Select');
    }
    return ideaStatusLabel;
}

export const getRiskLabel = (riskType, isShowEmpty) => {
    var riskLabel = i18n.t('Select')
    switch (riskType) {
        case 1:
            riskLabel = i18n.t('Low');
            break;
        case 2:
            riskLabel = i18n.t('Medium');
            break;
        case 3:
            riskLabel = i18n.t('High');
            break;
        default:
            riskLabel = isShowEmpty ? '' : i18n.t('Select');
    }
    return riskLabel;
}

export const getStatusName = (value, showActiveAsEmpty) => {
    var name = '';
    switch (value) {
        case 1:
            name = showActiveAsEmpty ? '' : i18n.t('Active');
            break;
        case 2:
            name = i18n.t('Inactive');
            break;
        default:
            name = '';
    }
    return name;
};

export const getRiskName = (value) => {
    var name = '--';
    switch (value) {
        case 1:
            name = i18n.t('Low');
            break;
        case 2:
            name = i18n.t('Medium');
            break;
        case 3:
            name = i18n.t('High');
            break;
        default:
            name = '--';
    }
    return name;
};

export const getRiskSortId = (value) => {
    var riskSortId = 99;
    switch (value) {
        case 1:
            riskSortId = 1;
            break;
        case 2:
            riskSortId = 2;
            break;
        case 3:
            riskSortId = 3;
            break;
        default:
            riskSortId = 99;
    }
    return riskSortId;
}

export const getDecisionName = (value) => {
    var name = '--'
    switch (value) {
        case 1:
            name = i18n.t('Go');
            break;
        case 2:
            name = i18n.t('NoGo');
            break;
        // case 3:
        //     name = i18n.t('FurtherStudy');
        //     break;
        default:
            name = '--';
    }
    return name;
};

export const getFilteredGroup = (array, groupId) => {
    var result = [];

    array.forEach(function (a) {
        //var temp = [],
        var o = {},
            found = false;
        o = a;

        if (Array.isArray(a.Groups)) {
            a.Groups.forEach(function (g) {
                if (g.GroupId.toLowerCase() === groupId.toLowerCase()) {
                    found = true;
                }
            })
        }
        if (found) {
            result.push(o);
        }
    });
    return result;
};

export const getLastGroupDetail = (projectId) => {
    if (!projectId) {
        projectId = getLastProjectId();
    }
    let groupId = getLocalStorageKey('GroupId-' + projectId) ? getLocalStorageKey('GroupId-' + projectId) : getLocalStorageKey('GroupId-' + projectId);
    //groupId = (groupId !== null && groupId !== '' && groupId !== 'undefined' && groupId !== undefined) ? groupId : AppConfig.env('groupId');
    const groupType = getLocalStorageKey('GroupType-' + projectId) ? getLocalStorageKey('GroupType-' + projectId) : getLocalStorageKey('GroupType-' + projectId);
    const ideaView = (groupId === null || groupId === '00000000-0000-0000-0000-000000000000') ? 'CompanyView' : 'Ideas';
    return { groupId: groupId, groupType: groupType, ideaView: ideaView }
};

export const getLastProjectId = () => {
    let projectId = getLocalStorageKey('projectId') || getLocalStorageKey('projectId');
    return projectId;
};

export const getDefaultGroupId = (userGroups, projectId, filteredGroupId) => {
    let groupId = filteredGroupId ? filteredGroupId : null;
    if (!groupId) {
        let lastGroupDetail = getLastGroupDetail(projectId);
        if (lastGroupDetail.groupId) {
            groupId = lastGroupDetail.groupId;
        } else {
            groupId = userGroupsDefaultGroupId(userGroups);
        }
    }
    if (_.indexOf(Object.keys(userGroups), groupId) < 0 && groupId !== '00000000-0000-0000-0000-000000000000') {
        groupId = userGroupsDefaultGroupId(userGroups);
    }
    return groupId;
};

export const getDefaultProjectId = (projects, selectedProjectId) => {
    let projectId = selectedProjectId ? selectedProjectId : (getLocalStorageKey('projectId') || getLocalStorageKey('projectId'));
    if ((isEmpty2(projectId) || !projects[projectId]) && Object.keys(projects).length > 0) {
        const projectIds = Object.keys(projects);
        projectId = projects[projectIds[0]].ProjectId;
    }
    return (Object.keys(projects).length > 0 && projects[projectId] ? projectId : '');
};

const userGroupsDefaultGroupId = (userGroups) => {
    const groupIds = Object.keys(userGroups);
    return groupIds[0];
};

export const setLastGroupDetail = (groupId, groupType, projectId) => {
    groupType = groupId == '00000000-0000-0000-0000-000000000000' ? '0' : groupType;
    setLocalStorageKey('GroupId', groupId);
    setLocalStorageKey('GroupType', groupType);
    setLocalStorageKey('GroupId', groupId);
    setLocalStorageKey('GroupType', groupType);

    setLocalStorageKey('GroupId-' + projectId, groupId);
    setLocalStorageKey('GroupType-' + projectId, groupType);
    setLocalStorageKey('GroupId-' + projectId, groupId);
    setLocalStorageKey('GroupType-' + projectId, groupType);

};

/* export const setLocalStorageKey = (key, value) => {
    setLocalStorageKey(key, value);
}; */

export const setLocalStorageKey = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
};

/* export const getLocalStorageKey = (key) => {
    return getLocalStorageKey(key);
}; */

export const getLocalStorageKey = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
        return null;
    } catch (e) {
        // error reading value
    }
};


/* export const removeLocalStorageKey = (key) => {
    setLocalStorageKey(key);
};
 */

export const removeLocalStorageKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // remove error
    }
};


export const setgetLocalStorageKeyey = (key, value) => {
    setLocalStorageKey(key, value);
};

export const getgetLocalStorageKeyey = (key) => {
    return getLocalStorageKey(key);
};

export const removegetLocalStorageKeyey = (key) => {
    removeLocalStorageKey(key);
};

export const getOrganizationId = () => {
    return getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');
};

export const setActiveSortingIconDefaultTab = (sortColumnName, sortFilter) => {
    var sortingIcon = 'ion-arrow-down-c';
    var commonClass = 'column-header-icon icon v-gray-darkest ';
    var defaultIconClass = 'column-header-icon icon ion-chevron-down plus-color';
    if (!sortFilter.sortAscending) {
        sortingIcon = 'ion-arrow-up-c';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortFilter.sortColumn === 'FocusArea') {
                return commonClass + sortingIcon;
            }
            else if (sortFilter.sortColumn === 'FocusAreaNumber') {
                return commonClass + 'ion-stats-bars';
            }
            else {
                return defaultIconClass;
            }
        case 'Value':
            if (sortFilter.sortColumn === 'CurrentGroupValue' || sortFilter.sortColumn === 'ValueStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Risk':
            if (sortFilter.sortColumn === 'Risk' || sortFilter.sortColumn === 'RiskStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'PlanValue':
            if (sortFilter.sortColumn === 'PlanValue' || sortFilter.sortColumn === 'PlanValueStatus' || sortFilter.sortColumn === 'PlanAllocation' || sortFilter.sortColumn === 'PlanTiming') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Metrics':
            if (sortFilter.sortColumn === 'MetricCount' || sortFilter.sortColumn === 'MetricPlanTiming' || sortFilter.sortColumn === 'MetricStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Milestones':
            if (sortFilter.sortColumn === 'MilestoneCount' || sortFilter.sortColumn === 'MilestonePlanTiming' || sortFilter.sortColumn === 'MilestoneStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Decision':
            if (sortFilter.sortColumn === 'DecisionGo' || sortFilter.sortColumn === 'DecisionNoGo' || sortFilter.sortColumn === 'CurrentGroupDecisionStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Title':
            if (sortFilter.sortColumn === 'Title' || sortFilter.sortColumn === 'ImplementationStatus' || sortFilter.sortColumn === 'IdeaNumber') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'GroupName':
            if (sortFilter.sortColumn === 'GroupName') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'IsFavourite':
            if (sortFilter.sortColumn === 'IsFavourite') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        default:
            if (sortColumnName === sortFilter.sortColumn) {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
    }
}

export const setActiveSortingIconDefaultTabIdeas2 = (sortColumnName, sortColumn, sortAscending) => {
    var sortingIcon = 'ion-arrow-down-c';
    var commonClass = 'column-header-icon icon v-gray-darkest ';
    var defaultIconClass = 'column-header-icon icon ion-chevron-down plus-color';
    if (!sortAscending) {
        sortingIcon = 'ion-arrow-up-c';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortColumn === 'FocusArea') {
                return commonClass + sortingIcon;
            }
            else if (sortColumn === 'FocusAreaNumber') {
                return commonClass + 'ion-stats-bars';
            }
            else {
                return defaultIconClass;
            }
        case 'Value':
            if (sortColumn === 'CurrentGroupValue' || sortColumn === 'ValueStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Risk':
            if (sortColumn === 'Risk' || sortColumn === 'RiskStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'PlanValue':
            if (sortColumn === 'PlanValue' || sortColumn === 'PlanValueStatus' || sortColumn === 'PlanAllocation' || sortColumn === 'PlanTiming') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Metrics':
            if (sortColumn === 'MetricCount' || sortColumn === 'MetricPlanTiming' || sortColumn === 'MetricStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Milestones':
            if (sortColumn === 'MilestoneCount' || sortColumn === 'MilestonePlanTiming' || sortColumn === 'MilestoneStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Decision':
            if (sortColumn === 'DecisionGo' || sortColumn === 'DecisionNoGo' || sortColumn === 'CurrentGroupDecisionStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Title':
            if (sortColumn === 'Title' || sortColumn === 'IdeaNumber') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'GroupName':
            if (sortColumn === 'GroupName') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'IsFavourite':
            if (sortColumn === 'IsFavourite') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        default:
            if (sortColumnName === sortColumn) {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
    }
}

export const setActiveSortingIconAfterSortingDefaultTab = (sortColumnName, sortFilter) => {
    var sortingIcon = 'ion-arrow-down-c';
    var commonClass = 'column-header-icon icon v-gray-darkest ';
    var defaultIconClass = 'column-header-icon ion-minus-round size-12 v-gray-darkest  col-phone-hidden';
    if (!sortFilter.sortAscending) {
        sortingIcon = 'ion-arrow-up-c';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortFilter.sortColumn === 'FocusArea') {
                return commonClass + sortingIcon;
            }
            else if (sortFilter.sortColumn === 'FocusAreaNumber') {
                return commonClass + 'ion-stats-bars';
            }
            else {
                return defaultIconClass;
            }
        case 'Value':
            if (sortFilter.sortColumn === 'CurrentGroupValue' || sortFilter.sortColumn === 'ValueStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Risk':
            if (sortFilter.sortColumn === 'Risk' || sortFilter.sortColumn === 'RiskStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'PlanValue':
            if (sortFilter.sortColumn === 'PlanValue' || sortFilter.sortColumn === 'PlanValueStatus' || sortFilter.sortColumn === 'PlanAllocation' || sortFilter.sortColumn === 'PlanTiming') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Metrics':
            if (sortFilter.sortColumn === 'MetricCount' || sortFilter.sortColumn === 'MetricPlanTiming' || sortFilter.sortColumn === 'MetricStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Milestones':
            if (sortFilter.sortColumn === 'MilestoneCount' || sortFilter.sortColumn === 'MilestonePlanTiming' || sortFilter.sortColumn === 'MilestoneStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Decision':
            if (sortFilter.sortColumn === 'DecisionGo' || sortFilter.sortColumn === 'DecisionNoGo' || sortFilter.sortColumn === 'CurrentGroupDecisionStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Title':
            if (sortFilter.sortColumn === 'Title' || sortFilter.sortColumn === 'ImplementationStatus' || sortFilter.sortColumn === 'IdeaNumber') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'GroupName':
            if (sortFilter.sortColumn === 'GroupName') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'IsFavourite':
            if (sortFilter.sortColumn === 'IsFavourite') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        default:
            if (sortColumnName === sortFilter.sortColumn) {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
    }
}

export const setActiveSortingIconAfterSortingDefaultTabIdeas2 = (sortColumnName, sortColumn, sortAscending) => {
    var sortingIcon = 'ion-arrow-down-c';
    var commonClass = 'column-header-icon icon v-gray-darkest ';
    var defaultIconClass = 'column-header-icon ion-minus-round size-12 v-gray-darkest  col-phone-hidden';
    if (!sortAscending) {
        sortingIcon = 'ion-arrow-up-c';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortColumn === 'FocusArea') {
                return commonClass + sortingIcon;
            }
            else if (sortColumn === 'FocusAreaNumber') {
                return commonClass + 'ion-stats-bars';
            }
            else {
                return defaultIconClass;
            }
        case 'Value':
            if (sortColumn === 'CurrentGroupValue' || sortColumn === 'ValueStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Risk':
            if (sortColumn === 'Risk' || sortColumn === 'RiskStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'PlanValue':
            if (sortColumn === 'PlanValue' || sortColumn === 'PlanValueStatus' || sortColumn === 'PlanAllocation' || sortColumn === 'PlanTiming') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Metrics':
            if (sortColumn === 'MetricCount' || sortColumn === 'MetricPlanTiming' || sortColumn === 'MetricStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Milestones':
            if (sortColumn === 'MilestoneCount' || sortColumn === 'MilestonePlanTiming' || sortColumn === 'MilestoneStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Decision':
            if (sortColumn === 'DecisionGo' || sortColumn === 'DecisionNoGo' || sortColumn === 'CurrentGroupDecisionStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Title':
            if (sortColumn === 'Title' || sortColumn === 'IdeaNumber') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'GroupName':
            if (sortColumn === 'GroupName') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'IsFavourite':
            if (sortColumn === 'IsFavourite') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Notes':
            if (sortColumn === 'ContextBased' || sortColumn === 'IdeaNumber' || sortColumn === 'ModifiedOn') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        default:
            if (sortColumnName === sortColumn) {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
    }
}

export const setActiveSortingDefaultTab = (sortColumnName, sortFilter) => {
    var sortingIcon = ' ';
    if (!sortFilter.sortAscending) {
        sortingIcon = ' ';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortFilter.sortColumn === 'FocusArea') {
                return 'v-active-sorting-column ' + sortingIcon;
            }
            else if (sortFilter.sortColumn === 'FocusAreaNumber') {
                return 'v-active-sorting-column ';
            }
            else {
                return '';
            }
        case 'Value':
            if (sortFilter.sortColumn === 'CurrentGroupValue' || sortFilter.sortColumn === 'ValueStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            }
            else {
                return '';
            }
        case 'Risk':
            if (sortFilter.sortColumn === 'Risk' || sortFilter.sortColumn === 'RiskStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'PlanValue':
            if (sortFilter.sortColumn === 'PlanValue' || sortFilter.sortColumn === 'PlanValueStatus' || sortFilter.sortColumn === 'PlanAllocation' || sortFilter.sortColumn === 'PlanTiming') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Metrics':
            if (sortFilter.sortColumn === 'MetricCount' || sortFilter.sortColumn === 'MetricPlanTiming' || sortFilter.sortColumn === 'MetricStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Milestones':
            if (sortFilter.sortColumn === 'MilestoneCount' || sortFilter.sortColumn === 'MilestonePlanTiming' || sortFilter.sortColumn === 'MilestoneStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Decision':
            if (sortFilter.sortColumn === 'DecisionGo' || sortFilter.sortColumn === 'DecisionNoGo' || sortFilter.sortColumn === 'CurrentGroupDecisionStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Title':
            if (sortFilter.sortColumn === 'Title' || sortFilter.sortColumn === 'ImplementationStatus' || sortFilter.sortColumn === 'IdeaNumber') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'GroupName':
            if (sortFilter.sortColumn === 'GroupName') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'IsFavourite':
            if (sortFilter.sortColumn === 'IsFavourite') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        default:
            if (sortFilter.sortColumn === sortColumnName) {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
    }
}

export const setActiveSortingDefaultTabIdeas2 = (sortColumnName, sortColumn, sortAscending) => {
    var sortingIcon = ' ';
    if (!sortAscending) {
        sortingIcon = ' ';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortColumn === 'FocusArea') {
                return 'v-active-sorting-column ' + sortingIcon;
            }
            else if (sortColumn === 'FocusAreaNumber') {
                return 'v-active-sorting-column ';
            }
            else {
                return '';
            }
        case 'Value':
            if (sortColumn === 'CurrentGroupValue' || sortColumn === 'ValueStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            }
            else {
                return '';
            }
        case 'Risk':
            if (sortColumn === 'Risk' || sortColumn === 'RiskStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'PlanValue':
            if (sortColumn === 'PlanValue' || sortColumn === 'PlanValueStatus' || sortColumn === 'PlanAllocation' || sortColumn === 'PlanTiming') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Metrics':
            if (sortColumn === 'MetricCount' || sortColumn === 'MetricPlanTiming' || sortColumn === 'MetricStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Milestones':
            if (sortColumn === 'MilestoneCount' || sortColumn === 'MilestonePlanTiming' || sortColumn === 'MilestoneStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Decision':
            if (sortColumn === 'DecisionGo' || sortColumn === 'DecisionNoGo' || sortColumn === 'CurrentGroupDecisionStatus') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Title':
            if (sortColumn === 'Title' || sortColumn === 'IdeaNumber') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'GroupName':
            if (sortColumn === 'GroupName') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'IsFavourite':
            if (sortColumn === 'IsFavourite') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        case 'Notes':
            if (sortColumn === 'Context' || sortColumn === 'IdeaNumber' || sortColumn === 'ModifiedOn') {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
        default:
            if (sortColumn === sortColumnName) {
                return 'v-active-sorting-column ' + sortingIcon;
            } else {
                return '';
            }
    }
}

export const setSortingToolTip = (sortColumnName, sortAscending) => {
    if (sortAscending === undefined) sortAscending = true;  // default to true
    switch (sortColumnName) {
        case 'Title':
        case 'GroupName':
        case 'FocusArea':
        case 'Details':
            if (sortAscending) {
                return <View>{translateKey('Sort')} {translateKey('AtoZ')} </View>;
            } else {
                return <View>{translateKey('Sort')} {translateKey('ZtoA')}  </View>;
            }
        case 'IdeaNumber':
        case 'CurrentGroupValue':
        case 'RoughValue':
        case 'PlanValue':
        case 'PlanTiming':
        case 'MetricCount':
        case 'MilestoneCount':
        case 'MetricPlanTiming':
        case 'MilestonePlanTiming':
        case 'PlanAllocation':
        case 'PlanTiming':
            if (sortAscending) {
                return <View>{translateKey('Sort')} {translateKey('LowestFirst')} </View>;
            } else {
                return <View>{translateKey('Sort')} {translateKey('HighestFirst')} </View>;
            }
        case 'Risk':
            if (sortAscending) {
                return <View>{translateKey('Sort')} {translateKey('LowToHigh')} </View>;
            } else {
                return <View>{translateKey('Sort')} {translateKey('HighToLow')} </View>;
            }
        case 'FocusAreaNumber':
            return <View>{translateKey('Sort')} {translateKey('SteeringCommitteeReportOrder')} </View>;
        case 'ValueStatus':
        case 'RiskStatus':
        case 'CurrentGroupDecisionStatus':
        case 'PlanValueStatus':
        case 'MetricStatus':
        case 'MilestoneStatus':
            if (sortAscending) {
                return <View>{translateKey('Sort')} {translateKey('LeastCompleteFirst')} </View>;
            } else {
                return <View>{translateKey('Sort')} {translateKey('MostCompleteFirst')} </View>;
            }
        case 'DecisionGo':
            return <View>{translateKey('Sort')} {translateKey('GoIdeasFirst')} </View>;
        case 'DecisionNoGo':
            return <View>{translateKey('Sort')} {translateKey('NOGoIdeasFirst')} </View>;
        case 'IsFavourite':
            if (sortAscending) {
                return <View>{translateKey('Sort')} {translateKey('NotStarredFirst')} </View>;
            } else {
                return <View>{translateKey('Sort')} {translateKey('StarredFirst')} </View>;
            }
        case 'ImplementationStatus':
            if (sortAscending) {
                return <View>{translateKey('Sort')} {translateKey('NotStartedFirst')} </View>;
            } else {
                return <View>{translateKey('Sort')} {translateKey('CompletedFirst')} </View>;
            }
        default:
            return <View>{translateKey('Sort')}</View>;
    }

}

export const setSortingIconCustomViews = (sortColumnName, sortFilter) => {
    var sortingIcon = 'ion-arrow-down-c';
    var commonClass = 'column-header-icon icon v-gray-darkest ';
    var defaultIconClass = 'column-header-icon icon ion-chevron-down plus-color';
    if (!sortFilter.sortAscending) {
        sortingIcon = 'ion-arrow-up-c';
    }
    switch (sortColumnName) {
        case 'FocusArea':
            if (sortFilter.sortColumn === 'FocusArea') {
                return commonClass + sortingIcon;
            }
            else {
                return defaultIconClass;
            }
        case 'IdeaNumber':
            if (sortFilter.sortColumn === 'IdeaNumber') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Title':
            if (sortFilter.sortColumn === 'Title' || sortFilter.sortColumn === 'ImplementationStatus') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'Description':
            if (sortFilter.sortColumn === 'Description') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }

        case 'RoughRiskRatingType':
            if (sortFilter.sortColumn === 'RoughRiskRatingType') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'GLRiskRatingType':
            if (sortFilter.sortColumn === 'GLRiskRatingType') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        case 'RoughValue':
            if (sortFilter.sortColumn === 'RoughValue') {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
        default:
            if (sortColumnName === sortFilter.sortColumn) {
                return commonClass + sortingIcon;
            } else {
                return defaultIconClass;
            }
    }
}

export const placeCaretAtEnd = (el) => {
    el.focus();
    if (typeof window.getSelection !== "undefined"
        && typeof document.createRange !== "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

export const getElementPosition = (el) => {
    var xPos = 0;
    var yPos = 0;
    while (el) {
        if (el.tagName === "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

export const sortArrOfObjectsByParam = (arrToSort /* array */, sortColumnName /* string */, sortAscending /* bool(optional, defaults to true) */) => {
    let sortedObj = [];
    if (sortAscending === undefined) sortAscending = true;  // default to true
    if (sortAscending) {
        switch (sortColumnName) {
            case 'Risk':
            case 'PrimaryRisk':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || null }], ['asc']);
                break;
            case 'GLRating':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['GLRiskRatingType'] || -1 }], ['asc']);
                break;
            case 'RiskStatus':
            case 'PrimaryRiskStatus':
            case 'ValueStatus':
            case 'ITValueStatus':
            case 'IsValidationNotRequired':
            case 'DecisionType':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || -1 }], ['asc']);
                break;
            case 'CompanyValue':
            case 'IdeaGroupValue':
            case 'CurrentGroupDecisionStatus':
            case 'PrimaryGroupDecisionStatus':
            case 'PlanValue':
            case 'ActualValue':
            case 'MetricCount':
            case 'MilestoneCount':
            case 'LineItemAmount':
            case 'LineItemPlanAmount':
            case 'LineItemActualAmount':
            case 'LineItemPlanValue':
            case 'LineItemActualValue':
            case 'CompRange':
            case 'AmortizationPeriod':
            case 'PlanAmortizationPeriod':
            case 'Value':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || 0 }], ['asc']);
                break;
            case 'PlanTiming':
            case 'ActualTiming':
            case 'MetricPlanTiming':
            case 'MetricActualTiming':
            case 'MilestonePlanTiming':
            case 'MilestoneActualTiming':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || '' }], ['asc']);
                break;
            case 'ImplementationStatus':
                sortedObj = _.orderBy(arrToSort, [(o) => { return (o['ImplementationStatusOverride'] ? o['ImplementationStatusOverride'] : o['ImplementationStatus']) || 0 }], ['asc']);
                break;
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName]
                        }
                    }
                    ], ['asc']);
                break;
        }
    }
    else {
        switch (sortColumnName) {
            case 'RiskStatus':
            case 'PrimaryRiskStatus':
            case 'ValueStatus':
            case 'ITValueStatus':
            case 'IsValidationNotRequired':
            case 'DecisionType':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || -1 }], ['desc']);
                break;
            case 'CompanyValue':
            case 'IdeaGroupValue':
            case 'CurrentGroupDecisionStatus':
            case 'PrimaryGroupDecisionStatus':
            case 'PlanValue':
            case 'ActualValue':
            case 'MetricCount':
            case 'MilestoneCount':
            case 'LineItemAmount':
            case 'LineItemPlanAmount':
            case 'LineItemActualAmount':
            case 'LineItemPlanValue':
            case 'LineItemActualValue':
            case 'CompRange':
            case 'AmortizationPeriod':
            case 'PlanAmortizationPeriod':
            case 'Value':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || 0 }], ['desc']);
                break;
            case 'GLRating':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['GLRiskRatingType'] || 0 }], ['desc']);
                break;
            case 'PlanTiming':
            case 'ActualTiming':
            case 'MetricPlanTiming':
            case 'MetricActualTiming':
            case 'MilestonePlanTiming':
            case 'MilestoneActualTiming':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || '' }], ['desc']);
                break;
            case 'ImplementationStatus':
                sortedObj = _.orderBy(arrToSort, [(o) => { return (o['ImplementationStatusOverride'] ? o['ImplementationStatusOverride'] : o['ImplementationStatus']) || 0 }], ['desc']);
                break;
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName]
                        }
                    }
                    ], ['desc']);
                break;
        }
    }
    return sortedObj;
}

export const sortArrOfObjectsByParamNew = (arrToSort /* array */, sortColumnName /* string */, sortAscending /* bool(optional, defaults to true) */) => {
    let sortedObj = [];
    if (sortAscending === undefined) sortAscending = true;  // default to true
    if (sortAscending) {
        switch (sortColumnName) {
            case 'CurrentGroupDecisionStatus':
            case 'PrimaryGroupDecisionStatus':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['DecisionStage'] || -1 }], ['asc']);
                break;
            case 'Risk':
            case 'PrimaryRisk':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['RiskRatingType'] || null }], ['asc']);
                break;
            case 'GLRating':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['GLRiskRatingType'] || -1 }], ['asc']);
                break;
            case 'RiskStatus':
            case 'PrimaryRiskStatus':
            case 'ValueStatus':
            case 'ITValueStatus':
            case 'IsValidationNotRequired':
            case 'DecisionType':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || -1 }], ['asc']);
                break;
            case 'IdeaGroupValue':
            case 'PlanValue':
            case 'ActualValue':
            case 'MetricCount':
            case 'MilestoneCount':
            case 'LineItemAmount':
            case 'LineItemPlanAmount':
            case 'LineItemActualAmount':
            case 'LineItemPlanValue':
            case 'LineItemActualValue':
            case 'CompRange':
            case 'AmortizationPeriod':
            case 'PlanAmortizationPeriod':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || 0 }], ['asc']);
                break;
            case 'PlanTiming':
            case 'ActualTiming':
            case 'MetricPlanTiming':
            case 'MetricActualTiming':
            case 'MilestonePlanTiming':
            case 'MilestoneActualTiming':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || '' }], ['asc']);
                break;
            case 'FocusArea':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o['FocusAreaName'] === 'string') {
                            return o['FocusAreaName'].toLowerCase() || ''
                        } else {
                            return o['FocusAreaName'] || ''
                        }

                    }
                    ], ['asc']);
                break;
            case 'IsFavourite':
            case 'Title':
            case 'IdeaNumber':
            case 'Description':
            case 'RoughRiskRatingType':
            case 'PrimaryGroupName':
            case 'ITStatus':
            case 'Status':
            case 'ModifiedOn':
            case 'ModifiedByName':
            case 'HRiskCount':
            case 'MRiskCount':
            case 'LRiskCount':
            case 'RiskRatersCount':
            case 'RoughRiskRatingType':
            case 'RoughRiskRatingNote':
            case 'AttachmentCount':
            case 'LinkedGroups':
            case 'IdeaLeadersName':
            case 'CompanyValue':
            case 'Scratchpad':
            case 'CurrentState':
            case 'RecommendedApproach':
            case 'ValuationSummary':
            case 'RiskSummary':
            case 'MetricsAndMilestones':
            case 'SCDecisionDate':
            case 'SCDecisionNote':
            case 'IdeaLineItemCount':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (o.Idea && typeof o.Idea[sortColumnName] === 'string') {
                            return o.Idea[sortColumnName].toLowerCase() || ''
                        } else {
                            return (o.Idea && o.Idea[sortColumnName] || '')
                        }
                    }
                    ], ['asc']);
                break;
            case 'GroupName':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (o.Idea && typeof o.Idea['PrimaryGroupName'] === 'string') {
                            return o.Idea['PrimaryGroupName'].toLowerCase() || ''
                        } else {
                            return (o.Idea && o.Idea['PrimaryGroupName'] || '')
                        }
                    }
                    ], ['asc']);
                break;
            case 'IdeaLeaders':
            case 'IdeaICs':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        let namesArray = [];
                        if (o.Idea[sortColumnName]) {
                            if (o.Idea[sortColumnName].length > 0) {
                                namesArray = _.map(o.Idea[sortColumnName], 'Name');
                            }
                        }
                        const namesString = namesArray.length > 0 ? namesArray.join(' ,') : '';
                        if (o.Idea && typeof namesString === 'string') {
                            return namesString.toLowerCase() || ''
                        } else {
                            return (o.Idea && namesString || '')
                        }
                    }
                    ], ['asc']);
                break;
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName] || ''
                        }
                    }
                    ], ['asc']);
                break;
        }
    }
    else {
        switch (sortColumnName) {
            case 'CurrentGroupDecisionStatus':
            case 'PrimaryGroupDecisionStatus':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['DecisionStage'] || -1 }], ['desc']);
                break;
            case 'RiskStatus':
            case 'PrimaryRiskStatus':
            case 'ValueStatus':
            case 'ITValueStatus':
            case 'IsValidationNotRequired':
            case 'DecisionType':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || -1 }], ['desc']);
                break;
            case 'IdeaGroupValue':
            case 'PlanValue':
            case 'ActualValue':
            case 'MetricCount':
            case 'MilestoneCount':
            case 'LineItemAmount':
            case 'LineItemPlanAmount':
            case 'LineItemActualAmount':
            case 'LineItemPlanValue':
            case 'LineItemActualValue':
            case 'CompRange':
            case 'AmortizationPeriod':
            case 'PlanAmortizationPeriod':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || 0 }], ['desc']);
                break;
            case 'GLRating':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o['GLRiskRatingType'] || 0 }], ['desc']);
                break;
            case 'PlanTiming':
            case 'ActualTiming':
            case 'MetricPlanTiming':
            case 'MetricActualTiming':
            case 'MilestonePlanTiming':
            case 'MilestoneActualTiming':
                sortedObj = _.orderBy(arrToSort, [(o) => { return o[sortColumnName] || '' }], ['desc']);
                break;
            case 'FocusArea':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o['FocusAreaName'] === 'string') {
                            return o['FocusAreaName'].toLowerCase() || ''
                        } else {
                            return o['FocusAreaName'] || ''
                        }

                    }
                    ], ['desc']);
                break;
            case 'Risk':
            case 'PrimaryRisk':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o['RiskRatingType'] === 'string') {
                            return o['RiskRatingType'].toLowerCase() || ''
                        } else {
                            return o['RiskRatingType'] || ''
                        }

                    }
                    ], ['desc']);
                break;
            case 'IsFavourite':
            case 'Title':
            case 'IdeaNumber':
            case 'Description':
            case 'RoughRiskRatingType':
            case 'PrimaryGroupName':
            case 'ITStatus':
            case 'Status':
            case 'ModifiedOn':
            case 'ModifiedByName':
            case 'HRiskCount':
            case 'MRiskCount':
            case 'LRiskCount':
            case 'RiskRatersCount':
            case 'RoughRiskRatingType':
            case 'RoughRiskRatingNote':
            case 'AttachmentCount':
            case 'LinkedGroups':
            case 'IdeaLeadersName':
            case 'CompanyValue':
            case 'ScratchpadPreview':
            case 'CurrentStatePreview':
            case 'RecommendedApproachPreview':
            case 'ValuationSummaryPreview':
            case 'RiskSummaryPreview':
            case 'MetricsAndMilestonesPreview':
            case 'SCDecisionDate':
            case 'SCDecisionNote':
            case 'IdeaLineItemCount':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (o.Idea && typeof o.Idea[sortColumnName] === 'string') {
                            return o.Idea[sortColumnName].toLowerCase() || ''
                        } else {
                            return (o.Idea && o.Idea[sortColumnName] || '')
                        }
                    }
                    ], ['desc']);
                break;
            case 'GroupName':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (o.Idea && typeof o.Idea['PrimaryGroupName'] === 'string') {
                            return o.Idea['PrimaryGroupName'].toLowerCase() || ''
                        } else {
                            return (o.Idea && o.Idea['PrimaryGroupName'] || '')
                        }
                    }
                    ], ['desc']);
                break;
            case 'IdeaLeaders':
            case 'IdeaICs':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        let namesArray = [];
                        if (o.Idea[sortColumnName]) {
                            if (o.Idea[sortColumnName].length > 0) {
                                namesArray = _.map(o.Idea[sortColumnName], 'Name');
                            }
                        }
                        const namesString = namesArray.length > 0 ? namesArray.join(' ,') : '';
                        if (o.Idea && typeof namesString === 'string') {
                            return namesString.toLowerCase() || ''
                        } else {
                            return (o.Idea && namesString || '')
                        }
                    }
                    ], ['desc']);
                break;
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName] || ''
                        }
                    }
                    ], ['desc']);
                break;
        }
    }
    return sortedObj;
}

export const sortSessions = (arrToSort /* array */, sortColumnName /* string */, sortAscending /* bool(optional, defaults to true) */) => {
    let sortedObj = [];
    if (sortAscending === undefined) sortAscending = true;  // default to true
    if (sortAscending) {
        switch (sortColumnName) {
            case 'FocusArea':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o['FocusAreaName'] === 'string') {
                            return o['FocusAreaName'].toLowerCase() || ''
                        } else {
                            return o['FocusAreaName'] || ''
                        }
                    }
                    ], ['asc']);
                break;
            case 'SessionUsers':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        let namesArray = [];
                        if (o[sortColumnName]) {
                            if (o[sortColumnName].length > 0) {
                                namesArray = _.map(o[sortColumnName], 'Name');
                            }
                        }
                        const namesString = namesArray.length > 0 ? namesArray.join(' ,') : '';
                        if (o && typeof namesString === 'string') {
                            return namesString.toLowerCase() || ''
                        } else {
                            return (o && namesString || '')
                        }
                    }
                    ], ['asc']);
                break;
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName] || ''
                        }
                    }
                    ], ['asc']);
                break;
        }
    }
    else {
        switch (sortColumnName) {
            case 'FocusArea':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o['FocusAreaName'] === 'string') {
                            return o['FocusAreaName'].toLowerCase() || ''
                        } else {
                            return o['FocusAreaName'] || ''
                        }
                    }
                    ], ['desc']);
                break;
            case 'SessionUsers':
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        let namesArray = [];
                        if (o[sortColumnName]) {
                            if (o[sortColumnName].length > 0) {
                                namesArray = _.map(o[sortColumnName], 'Name');
                            }
                        }
                        const namesString = namesArray.length > 0 ? namesArray.join(' ,') : '';
                        if (o && typeof namesString === 'string') {
                            return namesString.toLowerCase() || ''
                        } else {
                            return (o && namesString || '')
                        }
                    }
                    ], ['desc']);
                break;
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName] || ''
                        }
                    }
                    ], ['desc']);
                break;
        }
    }
    return sortedObj;
}

export const getUtcDate = (dt) => {
    if (!dt) {
        dt = new Date();
    } else {
        dt = new Date(dt);
    }

    return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), 'dt.getUTCDate()', dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
};

export const getTiming = (dt) => {
    if (dt === ' ' || dt === '') {
        return null;
    }
    if (!dt) {
        dt = new Date();
    } else {
        var sDate = dt.split(' ');
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        dt = new Date(Date.parse((monthNames.indexOf(sDate[1]) + 1) + " 1, " + sDate[0]));
        //dt = new Date(dt);
        var monthNumber = monthNames.indexOf(sDate[1]) + 1;
        var timing = (sDate[0] + '-' + (monthNumber < 10 ? '0' : '') + monthNumber + '-' + '01T00:00:00.000Z')
        return timing;
    }
    return (dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + '01T00:00:00.000Z');
};

export const formatAmountTooltip = (value, isShowSign, allowZero, showDecimal) => {
    if (!isShowSign) { isShowSign = false; }
    // if (value === null) {
    //     return '';
    // }
    if (value === null || value === undefined || value === 0 || value === '0' || value === '') {
        return allowZero ? (isShowSign ? '$0' : 0) : '';
    }
    else {
        if (showDecimal) {
            return (isShowSign ? (numeral(value).format('$0,0.[00]')) : (numeral(value).format('0,0.[00]')));
        } else {
            var value2 = value < 0 ? (Math.round(Math.abs(value)) * Math.sign(value)) : value;
            return (isShowSign ? (numeral(value2).format('$0,0')) : (numeral(value2).format('0,0')));
            //return amount + 'k';
        }
    }
};

export const formatAmount = (value, isShowSign, allowZero, showDecimal) => {
    if (!isShowSign) { isShowSign = false; }
    if (value === null) {
        return '';
    }
    if (value === 0 || value === '0' || value === '') {
        return allowZero ? (isShowSign ? '$0' : 0) : '';
    }
    else {
        if (showDecimal) {
            return (isShowSign ? (numeral(value).format('$0,0.[00]')) : (numeral(value).format('0,0.[00]')));
        } else {
            var value2 = value < 0 ? (Math.round(Math.abs(value)) * Math.sign(value)) : value;
            return (isShowSign ? (numeral(value2).format('$0,0')) : (numeral(value2).format('0,0')));
            //return amount + 'k';
        }
    }
};
/*Formatted amount: use for showing dash(-) instead of zero(0) */
export const formatAmount2 = (value, isShowSign, allowZero, showDecimal) => {
    if (!isShowSign) { isShowSign = false; }

    if (value === null || value === undefined || value === 0 || value === '0' || value === '' || isNaN(value)) {
        return allowZero ? (isShowSign ? '$0' : 0) : '-';
    }
    else {
        if (showDecimal) {
            return (isShowSign ? (numeral(value).format('$0,0.[00]')) : (numeral(value).format('0,0.[00]')));
        } else {
            var value2 = value < 0 ? (Math.round(Math.abs(value)) * Math.sign(value)) : value;
            if (Math.round(value2) === 0) {
                return (isShowSign ? numeral(Math.round(value2)).format('$0,0') : (numeral(value2).format('0,0')));
            } else {
                return (isShowSign ? numeral(value2).format('$0,0') : (numeral(value2).format('0,0')));
            }
        }
    }
};
/*Formatted amount: use for showing dash(-) instead of zero(0) + use if more than 2 decimal places are required*/
export const formatAmount3 = (value, isShowSign, allowZero, showDecimal, decimalPlaces) => {
    if (!isShowSign) { isShowSign = false; }

    if (value === null || value === undefined || value === 0 || value === '0' || value === '' || isNaN(value)) {
        return allowZero ? (isShowSign ? '$0' : 0) : '-';
    }
    else {
        if (showDecimal) {
            switch (decimalPlaces) {
                case 2: return (isShowSign ? (numeral(value).format('$0,0.[00]')) : (numeral(value).format('0,0.[00]')));
                case 4: return (isShowSign ? (numeral(value).format('$0,0.[0000]')) : (numeral(value).format('0,0.[0000]')));
            }
        } else {
            var value2 = value < 0 ? (Math.round(Math.abs(value)) * Math.sign(value)) : value;
            return (isShowSign ? (numeral(value2).format('$0,0')) : (numeral(value2).format('0,0')));
        }
    }
};
/*To be removed later (Use formatAmount2 instead)*/
export const formatDashboardAmount = (value, isShowSign, allowZero, showDecimal) => {
    if (!isShowSign) { isShowSign = false; }
    if (value === null) {
        return '';
    }
    if (value === null || value === undefined || value === 0 || value === '0' || value === '' || isNaN(value)) {
        return allowZero ? '-' : '';
    }
    else {
        if (showDecimal) {
            return (isShowSign ? (numeral(value).format('$0,0.[00]')) : (numeral(value).format('0,0.[00]')));
        } else {
            var value2 = value < 0 ? (Math.round(Math.abs(value)) * Math.sign(value)) : value;
            return (isShowSign ? (numeral(value2).format('$0,0')) : (numeral(value2).format('0,0')));
            //return amount + 'k';
        }
    }
};

export const formatCount = (value) => {
    if (!value || value === null || value === 0 || value === '0' || value === '') {
        return '-';
    }
    return value;
};

export const formatCountZero = (value) => {
    if (!value || value === null || value === 0 || value === '0' || value === '') {
        return 0;
    }
    return value;
};

export const formatPercentage = (value, allowZero, showDecimal, showBracket) => {
    if (value === null || value === 0 || value === '0') {
        return allowZero ? (showBracket ? '(0.0%)' : '0.0%') : '';
    }
    else {
        if (showBracket) {
            return '(' + (showDecimal ? numeral(value).format('0.0%') : numeral(value).format('0%')) + ')';
        } else {
            return showDecimal ? numeral(value).format('0.0%') : numeral(value).format('0%');
        }
    }
};
export const formatPercentage2 = (value, allowZero, showDecimal, decimalPlaces) => {
    if (value === null || value === 0 || value === '0') {
        return allowZero ? '0.0%' : '';
    }
    else {
        if (showDecimal) {
            switch (decimalPlaces) {
                case 1: return numeral(value).format('0,0.[0]%');
                case 2: return numeral(value).format('0,0.[00]%');
                case 4: return numeral(value).format('0,0.[0000]%');
            }
        }
        else {
            return numeral(value).format('0%');
        }
    }
};

export const formatPercentage3 = (value, allowZero, showDecimal, decimalPlaces) => {
    if (value === null || value === '' || value === ' ') {
        return '';
    } if (value === 0 || value === '0') {
        return numeral(value).format('0%');
    }
    else {
        if (showDecimal) {
            switch (decimalPlaces) {
                case 1: return numeral(value).format('0,0.[0]%');
                case 2: return numeral(value).format('0,0.[00]%');
                case 4: return numeral(value).format('0,0.[0000]%');
            }
        }
        else {
            return numeral(value).format('0%');
        }
    }
};

export const getRoughValue = function (isShowZero, value, ValueStatus, ActualValue) {
    if (ValueStatus > 1) return numeral(ActualValue).format('$0,0');
    if (value === null || !isShowZero && value === 0 && ValueStatus <= 1) return ' ';
    return numeral(value).format('$0,0');
    //return (value < 0) ? '(' + numeral(value * (-1)).format('$0,0') + ')' : numeral(value).format('$0,0');
};
export const getValue = (value) => {
    if (!value || value === undefined) return 0;
    return parseFloat(numeral(value).format('0.0000'));
};

export const getStartAndEndPageForPagination = (currentPage, totalPages, middlePage, maxPages) => {
    var startPage = (currentPage <= middlePage) ? 1 : currentPage - middlePage;
    var endPage = maxPages + startPage;
    endPage = (totalPages < endPage) ? totalPages : endPage;
    var diff = startPage - endPage + maxPages;
    startPage -= (startPage - diff > 0) ? diff : 0;
    return { startPage: startPage, endPage: endPage }
};


export const getDecisionGo = (decisionType) => {
    //var decision = decisionType ? decisionType : recommendationType;
    return decisionType === 1 ? 0 : (decisionType === 2 ? 1 : (decisionType === 3 ? 2 : 3));
};

export const getDecisionNoGo = (decisionType) => {
    //var decision = decisionType ? decisionType : recommendationType;
    return decisionType === 2 ? 3 : (decisionType === 1 ? 2 : (decisionType === 3 ? 1 : 0));
};

export const sortByKey = (array, key) => {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

export const sortByMultipleKey = (array, keys) => {
    return array.sort(function (a, b) {
        var o1 = a[keys[0]];
        var o2 = b[keys[0]];

        var p1 = a[keys[1]];
        var p2 = b[keys[1]];

        if (o1 < o2) return -1;
        if (o1 > o2) return 1;
        if (p1 < p2) return -1;
        if (p1 > p2) return 1;
        return 0;
    });
};


export const convertStringToDictionary = (string) => {
    var stringArray = Object.assign([], string.split(","))
    var obj = {};
    for (var i = 0; i < stringArray.length; i++) {
        obj[stringArray[i]] = i + 1;
    }
    return obj;

};

export const convertArrayToDictionary = (array, id) => {
    var obj = {};
    for (var i = 0; i < array.length; i++) {
        if (id) {
            obj[array[i][id]] = array[i];
        } else {
            obj[array[i]] = array[i];
        }
    }
    return obj;

};

export const filterByValues = (collection, key, values) => {
    return _.filter(collection, function (o) {
        return contains(values, resolveKey(o, key));
    });
};

export const excludeByValues = (collection, key, values) => {
    return _.filter(collection, function (o) {
        return !contains(values, resolveKey(o, key));
    });
};

export const containsValue = (array, searchArray) => {
    var isFound = false;
    array.map(item => {
        if (searchArray.indexOf(item) > -1) {
            isFound = true;
            return isFound;
        }
    });
    return isFound;
};

export const resolveKey = (obj, key) => {
    if (obj === null || key === null) {
        return undefined;
    }
    var resolved = undefined;
    if (typeof key === 'function') {
        resolved = key(obj);
    } else if (typeof key === 'string') {
        resolved = obj[key];
        if (resolved === null && key.indexOf(".") !== -1) {
            resolved = _.deepGet(obj, key);
        }
    }
    return resolved;
};

export const getSplitedArray = (values, type) => {
    var result = [];
    if (values === null) {
        result.push(values);
    }
    else if (typeof values === 'number') {
        result.push(values)
    }
    else if (typeof values === 'boolean') {
        if (values) {
            result.push(values)
        } else {
            result.push(values)
            result.push(null);
        }
    }
    else {
        var splitedArray = values.split(',');
        for (var i = 0; i < splitedArray.length; i++) {
            if (type === 2) {
                result.push(splitedArray[i])
            }
            else if (splitedArray[i] === 'false' || splitedArray[i] === 'true') {
                if (splitedArray[i] === 'true') {
                    result.push(true);
                } else {
                    result.push(false);
                    result.push(null);
                }
            }
            else if (splitedArray[i] === 'null') {
                result.push(null);
            } else {
                result.push(parseInt(splitedArray[i]));
            }
        }
    }
    return result;
};

export const getSplitedArrayForBooleans = (values, type) => {
    var result = [];
    if (values === null) {
        result.push(values);
    }
    else if (typeof values === 'number') {
        result.push(values)
    }
    else if (typeof values === 'boolean') {
        if (values) {
            result.push(values)
        } else {
            result.push(values)
        }
    }
    else {
        var splitedArray = values.split(',');
        for (var i = 0; i < splitedArray.length; i++) {
            if (type === 2) {
                result.push(splitedArray[i])
            }
            else if (splitedArray[i] === 'false' || splitedArray[i] === 'true') {
                if (splitedArray[i] === 'true') {
                    result.push(true);
                } else {
                    result.push(false);
                }
            }
            else if (splitedArray[i] === 'null') {
                result.push(null);
            } else {
                result.push(parseInt(splitedArray[i]));
            }
        }
    }
    return result;
};

export const removeValue = (commaSeperatedValues, value, separator) => {
    separator = separator || ",";
    var values = commaSeperatedValues.toLowerCase().split(separator);
    var index = values.indexOf(value.toLowerCase());
    if (index > -1) {
        values.splice(index, 1);
    }
    return values.join(separator);
}

export const removeValueWithoutLower = (commaSeperatedValues, value, separator) => {
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value);
    if (index > -1) {
        values.splice(index, 1);
    }
    return values.join(separator);
}

export const removeValue2 = (commaSeperatedValues, value, separator) => {
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value);
    if (index > -1) {
        values.splice(index, 1);
    }
    return values.join(separator);
}

export const addValue = (commaSeperatedValues, value, separator) => {
    if (isEmpty(commaSeperatedValues)) {
        return value;
    }
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value);
    if (index === -1) {
        values.push(value);
    }

    return values.join();
}

export const removeLabel = (commaSeperatedValues, value, separator) => {
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value);
    if (index > -1) {
        values.splice(index, 1);
    }
    return values.join(separator);
}

export const addLabel = (commaSeperatedValues, value, separator) => {
    if (isEmpty(commaSeperatedValues)) {
        return value;
    }
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value);
    if (index === -1) {
        values.push(value);
    }

    return values.join();
}


export const isValueExists = (commaSeperatedValues, value, separator) => {
    if (isEmpty(commaSeperatedValues)) {
        return false;
    }
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value.toLowerCase());
    if (index > -1) {
        return true
    }
    return false;
}

export const isValueExists2 = (commaSeperatedValues, value, separator) => {
    if (!commaSeperatedValues || isEmpty(commaSeperatedValues)) {
        return false;
    }
    separator = separator || ",";
    var values = commaSeperatedValues.split(separator);
    var index = values.indexOf(value);
    if (index > -1) {
        return true
    }
    return false;
}

export const findItemIndex = (array, attr, value) => {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

export const getLineItemDirection = () => {
    let uniqueDirection = [];
    let groupType = "0";
    const lastGroupDetail = getLastGroupDetail();
    groupType = lastGroupDetail.groupType;
    let labelCost = i18n.t('CostOrMarginDecrease');
    let labelSaving = i18n.t('SavingsOrMarginIncrease');
    if (groupType === "1") {
        labelCost = i18n.t('MarginDecrease');
        labelSaving = i18n.t('MarginIncrease');
    } else if (groupType === "2") {
        labelCost = i18n.t('Cost');
        labelSaving = i18n.t('Savings');
    }

    uniqueDirection.push({ filterType: 'Direction', value: 'Direction_1', orderId: 485, showCount: true, fieldName: 'Direction', fieldValue: 1, isChecked: false, label: labelSaving });
    uniqueDirection.push({ filterType: 'Direction', value: 'Direction_2', orderId: 486, showCount: true, fieldName: 'Direction', fieldValue: -1, isChecked: false, label: labelCost });
    return uniqueDirection;
};

export const arrRemove = (objArray, value) => {
    if (objArray.indexOf(value) != -1) {
        objArray.splice(objArray.indexOf(value), 1);
    }
};

export const getLineItemTiming = (date) => {
    if (!date) return '';
    var sDate = date.split(/[- : T]/);
    var time = new Date(Date.UTC(sDate[0], sDate[1] - 1, sDate[2])); //, sDate[3], sDate[4], sDate[5]
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (time) {
        var dateNew = new Date(Date.parse(time));
        return dateNew.getFullYear() + ' ' + monthNames[dateNew.getMonth()];
    } else {
        return '';
    }
};

export const getLineItemTimingFull = (date) => {
    if (!date) return '';
    var sDate = date.split(/[- : T]/);
    var time = new Date(Date.UTC(sDate[0], sDate[1] - 1, sDate[2])); //, sDate[3], sDate[4], sDate[5]
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (time) {
        var dateNew = new Date(Date.parse(time));
        return dateNew.getUTCFullYear() + ' ' + monthNames[dateNew.getUTCMonth()];
    } else {
        return '';
    }
};



/*******************************************
P E R M I S S I O N S
********************************************/

/*******************************************
C H E C K   I D E A S   S C  D E C I S I O N
********************************************/
export const getIdeaSCDecision = (scDecisionState, ideaId) => {
    if (scDecisionState.length > 0) {
        var scDecisionForIdea = scDecisionState.filter(function (el) { return el.IdeaId.toLowerCase() === ideaId.toLowerCase() });
        if (scDecisionForIdea.length > 0) {
            return scDecisionForIdea[0].DecisionType;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const getIdeaFieldsStausForRecomm = (ideaGroups, idea) => {
    if (ideaGroups.length > 0) {
        var ideaGroupForIdea = ideaGroups.filter(function (el) { return el.IdeaId.toLowerCase() === idea.IdeaId.toLowerCase() && el.GroupId.toLowerCase() === idea.GroupId.toLowerCase() });
        if (ideaGroupForIdea.length > 0) {
            var ideasWithIncompleteStatus = [];
            for (var i = 0; i < ideaGroupForIdea.length; i++) {
                if (ideaGroupForIdea[i].ValueStatus < 3 || isEmpty(ideaGroupForIdea[i].FocusAreaId)
                    || ideaGroupForIdea[i].FocusAreaId === "00000000-0000-0000-0000-000000000000" || ideaGroupForIdea[i].FocusAreaId === " " || isEmpty(idea.Description) || idea.RiskStatus < 4) {
                    if (isEmpty(ideaGroupForIdea[i].FocusAreaId) || ideaGroupForIdea[i].FocusAreaId === "00000000-0000-0000-0000-000000000000" || ideaGroupForIdea[i].FocusAreaId === " ") {
                        ideasWithIncompleteStatus.push(i18n.t('FocusArea'));
                    }
                    if (isEmpty(idea.Description)) {
                        ideasWithIncompleteStatus.push(i18n.t('Description'));
                    }
                    if (idea.RiskStatus < 4) {
                        ideasWithIncompleteStatus.push(i18n.t('RiskStatus'));
                    }
                    if (ideaGroupForIdea[i].ValueStatus < 3) {
                        ideasWithIncompleteStatus.push(i18n.t('ValueStatus'));
                    }
                }
            }
            return ideasWithIncompleteStatus;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export const getIdeaGroupDecisionStatus = (ideaGroups, ideaId, groupId) => {
    if (ideaGroups.length > 0) {
        var ideaGroupForIdea = ideaGroups.filter(function (el) { return el.IdeaId.toLowerCase() === ideaId.toLowerCase() && el.GroupId.toLowerCase() === groupId.toLowerCase() });
        if (ideaGroupForIdea.length > 0) {
            return ideaGroupForIdea[0].DecisionStatus;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const getIdeaGroupValueStatus = (ideaGroups, ideaId, groupId) => {
    if (ideaGroups.length > 0) {
        var ideaGroupForIdea = ideaGroups.filter(function (el) { return el.IdeaId.toLowerCase() === ideaId.toLowerCase() && el.GroupId.toLowerCase() === groupId.toLowerCase() });
        if (ideaGroupForIdea.length > 0) {
            return ideaGroupForIdea[0].ValueStatus;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const getIdeasWithIncompleteDecesionStatus = (ideaGroups, ideaRecommendations, ideaSCMReviews, groups, ideaId) => {
    var ideaGroupsRecomm = [];
    var ideaGroupsReview = [];
    if (ideaGroups.length > 0) {
        var ideaGroupForIdea = ideaGroups.filter(function (el) { return el.IdeaId.toLowerCase() === ideaId.toLowerCase() && el.LinkedGroupStatus === 3 });
        if (ideaGroupForIdea.length > 0) {
            for (var i = 0; i < ideaGroupForIdea.length; i++) {
                var ideaGroupsRecommFiltered = Object.assign([], ideaRecommendations.filter(function (el) { return el.IdeaId.toLowerCase() === ideaId.toLowerCase() && el.GroupId.toLowerCase() === ideaGroupForIdea[i].GroupId.toLowerCase() }));
                var ideaGroupsReviewFiltered = Object.assign([], ideaSCMReviews.filter(function (el) { return el.IdeaId.toLowerCase() === ideaId.toLowerCase() && el.GroupId.toLowerCase() === ideaGroupForIdea[i].GroupId.toLowerCase() }));
                if (ideaGroupsRecommFiltered.length > 0) {
                    ideaGroupForIdea[i]["RecommendationType"] = ideaGroupsRecommFiltered[0].RecommendationType;
                    ideaGroupsRecomm.push(ideaGroupForIdea[i]);
                } else {
                    ideaGroupForIdea[i]["RecommendationType"] = null;
                    ideaGroupsRecomm.push(ideaGroupForIdea[i]);
                }

                if (ideaGroupsReviewFiltered.length > 0) {
                    ideaGroupForIdea[i]["IsReviewed"] = ideaGroupsReviewFiltered[0].IsReviewed;
                    ideaGroupForIdea[i]["SCMReviewNotRequired"] = ideaGroupsReviewFiltered[0].SCMReviewNotRequired;
                    ideaGroupsReview.push(ideaGroupForIdea[i]);
                } else {
                    ideaGroupForIdea[i]["IsReviewed"] = null;
                    ideaGroupForIdea[i]["SCMReviewNotRequired"] = null;
                    ideaGroupsReview.push(ideaGroupForIdea[i]);
                }

            }
        }
    }
    var ideasWithIncompleteStatus = [];
    var msgType = 1;
    if (ideaGroupsRecomm.length > 0) {
        for (var i = 0; i < ideaGroupsRecomm.length; i++) {
            if (!ideaGroupsRecomm[i].RecommendationType || ideaGroupsRecomm[i].RecommendationType === " ") {
                if (groups[ideaGroupsRecomm[i].GroupId.toLowerCase()]) {
                    ideasWithIncompleteStatus.push(groups[ideaGroupsRecomm[i].GroupId.toLowerCase()].Name);
                }
            }
        }
    }

    if (ideasWithIncompleteStatus.length === 0) {
        if (ideaGroupsReview.length > 0) {
            for (var i = 0; i < ideaGroupsReview.length; i++) {
                if (!ideaGroupsReview[i].IsReviewed && !ideaGroupsReview[i].SCMReviewNotRequired) {
                    if (groups[ideaGroupsReview[i].GroupId.toLowerCase()]) {
                        ideasWithIncompleteStatus.push(groups[ideaGroupsReview[i].GroupId.toLowerCase()].Name);
                        msgType = 2;
                    }
                }
            }
        }
    }
    return { ideasWithIncompleteStatus: ideasWithIncompleteStatus, msgType: msgType };
}

export const getPermissionByIdeaSCDecision = (ideaSCDecisions, ideaId) => {
    var scDecisionForIdea = getIdeaSCDecision(Object.assign([], ideaSCDecisions), ideaId);
    if (scDecisionForIdea) {
        if (scDecisionForIdea > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const getPermissionForCustomFields = (allState, idea, currentGroupId, isIdeaReadOnly, notHavingEditingPermission, isCurrentGroup, isDecisionComplete) => {
    var obj = constants.defaultFieldsPermission();
    if (isIdeaReadOnly) {
        obj.Title = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.Description = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.Scratchpad = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.CurrentState = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RecommendedApproach = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.ValuationSummary = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RiskSummary = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.MetricsAndMilestones = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.IdeaLeaders = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.FocusArea = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.IdeaLeader = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RoughRisk = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RoughRiskNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GLRating = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GLRatingNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GroupRoughValue = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.ValidationRequired = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.FinanceValidated = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.PrimaryGLRecommendation = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GLRecommendationNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.SCMReviewNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.SCDecision = { status: false, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
    } else if (notHavingEditingPermission) {
        obj.Title = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.Description = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.Scratchpad = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.CurrentState = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RecommendedApproach = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.ValuationSummary = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RiskSummary = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.MetricsAndMilestones = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.IdeaLeaders = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.FocusArea = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.IdeaLeader = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RoughRisk = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.RoughRiskNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GLRating = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GLRatingNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GroupRoughValue = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.ValidationRequired = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.FinanceValidated = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.PrimaryGLRecommendation = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.GLRecommendationNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.SCMReviewNote = { status: true, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
        obj.SCDecision = { status: false, message: i18n.t('AddLinkGroupPermissionDisableTooltip') };
    } else {
        if (isDecisionComplete) {
            obj.Title = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.Description = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.Scratchpad = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.CurrentState = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.RecommendedApproach = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.ValuationSummary = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.RiskSummary = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.MetricsAndMilestones = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.IdeaLeaders = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.FocusArea = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.IdeaLeader = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.RoughRisk = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.RoughRiskNote = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.GLRating = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.GLRatingNote = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.GroupRoughValue = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.ValidationRequired = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.FinanceValidated = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.PrimaryGLRecommendation = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.GLRecommendationNote = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.SCMReviewNote = { status: true, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.SCDecision = { status: false, message: '' };
            return obj;
        } else if (!isCurrentGroup) {
            obj.Title = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.Description = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.Scratchpad = { status: isDecisionComplete ? true : false, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.CurrentState = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.RecommendedApproach = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.ValuationSummary = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.RiskSummary = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.MetricsAndMilestones = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.IdeaLeaders = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.FocusArea = { status: isDecisionComplete ? true : false, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.IdeaLeader = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.RoughRisk = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.RoughRiskNote = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.GLRating = { status: isDecisionComplete ? true : false, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.GLRatingNote = { status: isDecisionComplete ? true : false, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.GroupRoughValue = { status: isDecisionComplete ? true : false, message: i18n.t('SCDecisionCompletedDisabledTooltip') };
            obj.ValidationRequired = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.FinanceValidated = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.PrimaryGLRecommendation = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.GLRecommendationNote = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.SCMReviewNote = { status: true, message: i18n.t('PrimaryGroupPermissionWarning') };
            obj.SCDecision = { status: false, message: i18n.t('PrimaryGroupPermissionWarning') };
        } else {
            if (idea.RiskStatus) {
                if (idea.RiskStatus === 4) {
                    obj.RoughRisk = { status: true, message: i18n.t('RiskCompletedDisabledTooltip') };
                    obj.RoughRiskNote = { status: true, message: i18n.t('RiskCompletedDisabledTooltip') };
                    obj.GLRating = { status: true, message: i18n.t('RiskCompletedDisabledTooltip') };
                    obj.GLRatingNote = { status: true, message: i18n.t('RiskCompletedDisabledTooltip') };
                }
            }

            var ideaGroupValueStatus = getIdeaGroupValueStatus(Object.assign([], allState.ideas.ideaGroups), idea.IdeaId, idea.GroupId)
            if (ideaGroupValueStatus) {
                if (ideaGroupValueStatus === 4) {
                    obj.GroupRoughValue = { status: true, message: i18n.t('ValueValidatedDisabledTooltip') };
                }
            }

            var ideaFieldsStausForRecomm = getIdeaFieldsStausForRecomm(Object.assign([], allState.ideas.ideaGroups), idea);
            var ideaGroupDecisionStatus = getIdeaGroupDecisionStatus(Object.assign([], allState.ideas.ideaGroups), idea.IdeaId, idea.GroupId);
            if (ideaFieldsStausForRecomm.length > 0) {
                obj.PrimaryGLRecommendation = { status: true, message: i18n.t('GLRecommCompleteWarning') + ideaFieldsStausForRecomm.join(', ') };
            } else {
                if (ideaGroupDecisionStatus) {
                    if (ideaGroupDecisionStatus > 1) {
                        obj.PrimaryGLRecommendation = { status: true, message: i18n.t('DecisionSCReviewedDisabledTooltip') };
                        obj.GLRecommendationNote = { status: true, message: i18n.t('DecisionSCReviewedDisabledTooltip') };
                    }

                }
            }

            if (ideaGroupDecisionStatus > 2) {
                obj.SCMReviewNote = { status: true, message: i18n.t('DecisionSCDecidedDisabledTooltip') };
            }

            if (idea.ValueStatus < 3 || (idea.ValueStatus === 4 && !idea.IsValidationNotRequired)) {
                obj.ValidationRequired = { status: true, message: i18n.t('ValueNotCompletedDisabledTooltip') };
            }

            if (idea.ValueStatus < 3 || idea.IsValidationNotRequired) {
                obj.FinanceValidated = { status: true, message: i18n.t('ValueNotCompletedDisabledTooltip') };
            }

            var ideasWithIncompleteDecesionStatus = getIdeasWithIncompleteDecesionStatus(Object.assign([], allState.ideas.ideaGroups), Object.assign([],
                allState.ideas.ideaRecommendations), Object.assign([], allState.ideas.ideaSCMReviews),
                Object.assign({}, allState.masterData.groups), idea.IdeaId)
            if (ideasWithIncompleteDecesionStatus.ideasWithIncompleteStatus.length > 0) {
                if (ideasWithIncompleteDecesionStatus.msgType === 1) {
                    obj.SCDecision = { status: true, message: i18n.t('IncompleteGLRecommWarning') + ': ' + ideasWithIncompleteDecesionStatus.ideasWithIncompleteStatus.join(', ') };

                } else {
                    obj.SCDecision = { status: true, message: i18n.t('IncompleteGLRecommWarning') + ': ' + ideasWithIncompleteDecesionStatus.ideasWithIncompleteStatus.join(', ') };

                }
            }

        }
    }


    return obj;
}

export const getSortingOrFilterObject = (view, sortingOrFilterObjectArray) => {
    switch (view) {
        case 1:
            return Object.assign({}, sortingOrFilterObjectArray.defaultView);
        case 2:
            return Object.assign({}, sortingOrFilterObjectArray.customView);
        case 3:
            return Object.assign({}, sortingOrFilterObjectArray.ideaGenrationView);
        case 4:
            return Object.assign({}, sortingOrFilterObjectArray.archiveView);
        case 5:
            return Object.assign({}, sortingOrFilterObjectArray.archivePendingView);
        case 6:
            return Object.assign({}, sortingOrFilterObjectArray.ideasForAcceptanceView);
        case 7:
            return Object.assign({}, sortingOrFilterObjectArray.planningView);
        case 8:
            return Object.assign({}, sortingOrFilterObjectArray.trackingView);
        case 9:
            return Object.assign({}, sortingOrFilterObjectArray.implementationCustomView);
        case 10:
            return Object.assign({}, sortingOrFilterObjectArray.shareView);
        case 11:
            return Object.assign({}, sortingOrFilterObjectArray.transferView);
        case 12:
            return Object.assign({}, sortingOrFilterObjectArray.ideasSentForAcceptanceView);
        case 13:
            return Object.assign({}, sortingOrFilterObjectArray.sentForShareView);
        case 14:
            return Object.assign({}, sortingOrFilterObjectArray.sentForTransferView);
        default:
            return Object.assign({}, sortingOrFilterObjectArray.defaultView);
    }
}

export const getCheckedIdeas = (view, filteredIdeas) => {
    switch (view) {
        case 1:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedDefault === true });
        case 2:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedCustom === true });
        case 3:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedSimplified === true });
        case 4:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedArchive === true });
        case 5:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedArchivePending === true });
        case 6:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedIdeasForAcceptance === true });
        case 7:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedPlanning === true });
        case 8:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedTracking === true });
        case 9:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedImplementationCustom === true });
        case 10:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedShare === true });
        case 11:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedTransfer === true });
        case 12:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedIdeasSentForAcceptance === true });
        case 13:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedsentForShare === true });
        case 14:
            return filteredIdeas.filter(function (el) { return el.isIdeaCheckedsentForTransfer === true });
        default:
            return [];
    }
}

export const getCheckedIdeaGroups = (view, filteredIdeaGroups) => {
    return filteredIdeaGroups.filter(function (el) { return isCheckBoxChecked(view, el.IsChecked) });
}

export const getCustomFieldName = (fieldNumber) => {
    switch (fieldNumber) {
        case 1: return 'ProjectCustomField1';
        case 2: return 'ProjectCustomField2';
        case 3: return 'ProjectCustomField3';
        case 4: return 'ProjectCustomField4';
        case 5: return 'ProjectCustomField5';
        case 11: return 'GroupCustomField1';
        case 12: return 'GroupCustomField2';
        case 13: return 'GroupCustomField3';
        case 14: return 'GroupCustomField4';
        case 15: return 'GroupCustomField5';
    }
}

/*********************Start Dashboard utils*************************************/
export const getWeekDateRange = (config) => {
    const week0Date = config['ClientSetting_Week0Date'] ? new Date(config['ClientSetting_Week0Date'].Value) : new Date();
    const currDate = new Date();

    var start = new Date(week0Date.getUTCFullYear(), week0Date.getUTCMonth(), week0Date.getUTCDate(), 0, 0, 0);
    var end = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate(), 0, 0, 0);
    var sDate;
    var eDate;
    var dateArr = [];

    while (start <= end) {
        if (start.getDay() == 1 || (dateArr.length == 0 && !sDate)) {
            sDate = new Date(start.getTime());
        }
        if ((sDate && start.getDay() == 0) || start.getTime() == end.getTime()) {
            eDate = new Date(start.getTime());
        }
        if (sDate && eDate) {
            dateArr.push({ 'startDate': moment(sDate).format('MM/DD/YYYY'), 'endDate': moment(eDate).format('MM/DD/YYYY') });
            sDate = undefined;
            eDate = undefined;
        }
        start.setDate(start.getDate() + 1);
    }
    return dateArr;
};

export const getFormattedDateDiff = (date1, date2, intervals) => {
    //var date2 = new Date();
    var out = [];
    var b = moment(date1),
        a = moment(date2);
    //intervals = ['weeks', 'days'];

    for (var i = 0; i < intervals.length; i++) {
        var diff = a.diff(b, intervals[i]);
        b.add(diff, intervals[i]);
        out[intervals[i]] = diff;
        //out.push( diff + ' ' + intervals[i]);
    }
    return out;
};

export const getCurrentPhase = (config) => {
    var daysDiff;
    var currentPhase = 1;
    var scr1Date = config['ClientSetting_SCR1Date'] ? config['ClientSetting_SCR1Date'].Value : new Date();
    var scrDate = scr1Date;
    //daysDiff = this.getFormattedDateDiff("2017-08-22T12:00:00.000Z", ['days']);
    daysDiff = getFormattedDateDiff(new Date(), scr1Date, ['days']);
    if (config) {
        if (daysDiff.days < 0) {
            currentPhase = 2;
            var scr2Date = config['ClientSetting_SCR2Date'] ? config['ClientSetting_SCR2Date'].Value : new Date();
            scrDate = scr2Date;
            daysDiff = getFormattedDateDiff(new Date(), scr2Date, ['days']);
            if (daysDiff.days < 0) {
                var scr3Date = config['ClientSetting_SCR3Date'] ? config['ClientSetting_SCR3Date'].Value : new Date();
                scrDate = scr3Date;
                currentPhase = 3;
                daysDiff = getFormattedDateDiff(new Date(), scr3Date, ['days']);
                if (daysDiff.days < 0) {
                    var scr4Date = config['ClientSetting_SCR4Date'] ? config['ClientSetting_SCR4Date'].Value : new Date();
                    scrDate = scr4Date;
                    currentPhase = 4;
                }
            }
        }
    }
    return { currentPhase: currentPhase, scrDate: scrDate };
};

export const getCurrentPhaseDetails = (config, isMobile) => {
    var phaseDetail = { currentPhase: 1, scrDate: '', weekNumber: 0 };
    if (_.size(config) > 0) {
        var week0Date = config['ClientSetting_Week0Date'] ? config['ClientSetting_Week0Date'].Value : new Date();
        week0Date = new Date(moment(week0Date).add(-1, 'days'));
        var weekDiff = getFormattedDateDiff(week0Date, new Date(), ['weeks', 'days']);
        if (weekDiff) {
            phaseDetail.weekNumber = weekDiff.weeks;
        }

        var currentPhaseDetail = getCurrentPhase(config);
        phaseDetail.currentPhase = currentPhaseDetail.currentPhase;

        phaseDetail.scrDate = isMobile ? (currentPhaseDetail.scrDate === '' ? '' : moment(currentPhaseDetail.scrDate).format('L')) : (currentPhaseDetail.scrDate === '' ? '' : moment(currentPhaseDetail.scrDate).format('LL'));
    }
    return phaseDetail;
};
/*********************End Dashboard utils*************************************/
export const getDeviceType = (deviceType) => {
    if (deviceType === 'mobile') {
        return 1;
    } else {
        return 2;
    }
};

export const checkIdeaViewRolePermission = (permissions, groupId, isCompanyView, locationPath, locationState, isItCostingGroup, clientSettingIdeaGenerationSessions, majorMenuName) => {
    const permission = { view: 1 };
    const organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId').toLowerCase() : AppConfig.env('organizationId').toLowerCase();
    const permissionGroupId = isCompanyView ? organizationId : (groupId);
    const permissionComprehensiveView = checkRole(permissions, permissionGroupId, null, null, COMPREHENSIVE_VIEW);
    const permissionSimplifiedView = isItCostingGroup ? false : checkRole(permissions, permissionGroupId, null, null, IDEA_SIMPLIFIED_VIEW);
    const permissionCustomView = checkRole(permissions, permissionGroupId, null, null, CUSTOM_VIEW);
    const permissionIdeaGenerationView =
        (clientSettingIdeaGenerationSessions && clientSettingIdeaGenerationSessions.Value) !== '0' ?
            (isCompanyView ? checkRole(permissions, organizationId, null, null, IDEA_GENERATION_VIEW) :
                (checkRole(permissions, groupId, null, null, IDEA_GENERATION_VIEW) || isLessThanGroupAccess(permissions, groupId)))
            : false;
    const ideaViewRolePermissions = {
        view: 1, permissionComprehensiveView: false, permissionSimplifiedView: false,
        permissionCustomView: false, permissionIdeaGenerationView: false, groupId: groupId, isCompanyView: isCompanyView
    };
    if (permissionComprehensiveView) {
        permission.view = 1;
    }
    else if (permissionSimplifiedView) {
        permission.view = 3;
    }
    else if (permissionCustomView) {
        permission.view = 2;
    }
    else if (permissionIdeaGenerationView) {
        permission.view = 4;
    }

    const selectedMenu = { view: 1 };
    const pathname = getPathName(locationPath);
    switch (pathname) {
        case 'comprehensive':
            selectedMenu.view = 1; break;
        case 'ideageneration':
            selectedMenu.view = 4; break;
        case 'simplified':
            selectedMenu.view = 3; break;
        case 'custom':
            selectedMenu.view = 2; break;
        default:
            if (majorMenuName === MajorMenu.START) {
                selectedMenu.view = 3; break;
            } else {
                selectedMenu.view = 1; break;
            }
    }

    switch (selectedMenu.view) {
        case 1: if (permissionComprehensiveView) { permission.view = 1 } break;
        case 2: if (permissionCustomView) { permission.view = 2 } break;
        case 3: if (permissionSimplifiedView) { permission.view = 3 } break;
        case 4: if (permissionIdeaGenerationView) { permission.view = 4 } break;
    }
    if (locationState && locationState.view && permissionCustomView) {
        permission.view = locationState.view;
    }

    ideaViewRolePermissions.view = permission.view;
    ideaViewRolePermissions.permissionComprehensiveView = permissionComprehensiveView;
    ideaViewRolePermissions.permissionSimplifiedView = permissionSimplifiedView;
    ideaViewRolePermissions.permissionCustomView = permissionCustomView;
    ideaViewRolePermissions.permissionIdeaGenerationView = permissionIdeaGenerationView;
    return ideaViewRolePermissions;
}

export const checkImplementationViewRolePermission = (permissions, groupId, isCompanyView, locationPath, mainMenuName) => {
    const permission = { view: (mainMenuName === 'Planning' ? 7 : 8) };
    const organizationId = getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId').toLowerCase() : AppConfig.env('organizationId').toLowerCase();
    const permissionComprehensiveView = checkRole(permissions, isCompanyView ? organizationId : groupId, null, null, COMPREHENSIVE_VIEW_IMPLEMENTATION);
    const permissionLineItemsView = checkRole(permissions, isCompanyView ? organizationId : groupId, null, null, VIEW_LINE_ITEMS);
    const permissionMetricsView = checkRole(permissions, isCompanyView ? organizationId : groupId, null, null, VIEW_METRICS);
    const permissionMilestonesView = checkRole(permissions, isCompanyView ? organizationId : groupId, null, null, VIEW_MILESTONES);
    const permissionIdeaView = checkRole(permissions, isCompanyView ? organizationId : groupId, null, null, IDEA_VIEW);
    const implementationViewRolePermissions = {
        view: (mainMenuName === 'Planning' ? 7 : 8), permissionComprehensiveView: false, permissionLineItemsView: false,
        permissionMetricsView: false, permissionMilestonesView: false, permissionIdeaView: false, groupId: groupId
    };
    if (permissionComprehensiveView) {
        permission.view = (mainMenuName === 'Planning' ? 7 : 8);
    }
    else if (permissionLineItemsView) {
        permission.view = 10;
    }
    else if (permissionMetricsView) {
        permission.view = 11;
    }
    else if (permissionMilestonesView) {
        permission.view = 12;
    }
    else if (permissionIdeaView) {
        permission.view = 9;
    }

    const selectedMenu = { view: 1 };
    const pathname = getPathName(locationPath);
    switch (pathname) {
        case 'comprehensive':
            selectedMenu.view = (mainMenuName === 'Planning' ? 7 : 8);
            break;
        case 'lineitems':
            selectedMenu.view = 10; break;
        case 'metrics':
            selectedMenu.view = 11; break;
        case 'milestones':
            selectedMenu.view = 12; break;
        case 'ideas':
            selectedMenu.view = 9; break;
        default:
            if (mainMenuName === 'Planning') {
                selectedMenu.view = 7; break;
            } else {
                selectedMenu.view = 8; break;
            }
    }

    switch (selectedMenu.view) {
        case 7: if (permissionComprehensiveView) { permission.view = 7 } break;
        case 8: if (permissionComprehensiveView) { permission.view = 8 } break;
        case 10: if (permissionLineItemsView) { permission.view = 10 } break;
        case 11: if (permissionMetricsView) { permission.view = 11 } break;
        case 12: if (permissionMilestonesView) { permission.view = 12 } break;
        case 9: if (permissionIdeaView) { permission.view = 9 } break;

    }
    implementationViewRolePermissions.view = permission.view;
    implementationViewRolePermissions.permissionComprehensiveView = permissionComprehensiveView;
    implementationViewRolePermissions.permissionLineItemsView = permissionLineItemsView;
    implementationViewRolePermissions.permissionMetricsView = permissionMetricsView;
    implementationViewRolePermissions.permissionMilestonesView = permissionMilestonesView;
    implementationViewRolePermissions.permissionIdeaView = permissionIdeaView;
    return implementationViewRolePermissions;
}

export const getBaselinePercentageValue = (value, totalBaseline, showBracket) => {
    if (showBracket === undefined) { showBracket = true; }

    if (value === 0 || !value) return formatPercentage(value, true, true, showBracket);
    return formatPercentage((value / totalBaseline), true, true, showBracket);
};

export const getPathName = (pathname) => {
    if (getPathName) {
        var path = pathname.split('/');
        if (path.length > 0) {
            return path[path.length - 1].toLowerCase()
        }
    }
    return '';
};

export const getRelativePath = (locationPath) => {
    if (window.location.hostname !== 'localhost') {
        locationPath = locationPath.replace(locationPath.split('/').splice(0, 2).join('/'), '');
    } else {
        locationPath = locationPath;
    }

    locationPath = _.trimEnd(_.trimStart(locationPath, '/'), '#').toLowerCase();

    return locationPath;
};

export const getMajorMenuName = (pathname) => {
    const path = pathname.split('/');
    if (path.length > 0) {
        return path[0].toLowerCase()
    }
    return '';
};


export const getCurrentLocation = () => {
    var currentLocation = '';
    var splitLocation = window.location.href.split('/');
    if (splitLocation) {
        currentLocation = splitLocation[splitLocation.length - 1];
    }
    if (currentLocation.indexOf("?") >= 0) {
        currentLocation = (currentLocation.split('?'))[0];
    }
    return currentLocation;
};

export const getPersonnelName = (personnel, userId) => {
    const personnelItem = personnel.filter((el) => el.UserId.toLowerCase() === userId.toLowerCase());
    return (personnelItem.length > 0 && personnelItem[0].Name) ? personnelItem[0].Name : '';
};

export const getUserName = (masterDataUsers, userId) => {
    if (!userId) return '';
    return masterDataUsers[userId.toLowerCase()].Name;
};

export const getGroupType = (groups, groupId) => {
    if (!groupId) return 0;
    return groups[groupId.toLowerCase()] ? groups[groupId.toLowerCase()].GroupType : 0;
};

export const getGroupName = (groups, groupId) => {
    if (!groupId) return '';
    var group = groups[groupId];
    if (group) {
        return group.Name;
    } else {
        return '';
    }
};

export const getGroupNumber = (groups, groupId) => {
    return groups[groupId.toLowerCase()].GroupNumber;
};

export const getReportProjectName = (projects, projectId) => {
    if (!projects || (projects && _.size(projects) < 2)) return '';
    return getProjectName(projects, projectId);
};

export const getProjectName = (projects, projectId) => {
    if (!projectId) return '';
    var project = projects[projectId];
    if (project) {
        return project.Name;
    } else {
        return '';
    }
};

export const getFiscalYear = (fiscalYearStartingMonth, lineItemTiming) => {
    fiscalYearStartingMonth = parseInt(fiscalYearStartingMonth);
    var month = moment.utc(lineItemTiming).month() + 1;
    var year = moment.utc(lineItemTiming).year();
    var fiscalYear = 0;
    switch (fiscalYearStartingMonth) {
        case 10:
            if (month >= fiscalYearStartingMonth) {
                fiscalYear = year + 1;
            }
            else {
                fiscalYear = moment.utc(lineItemTiming).add(3, 'M');
            }
            break;
        default:
            if (month < fiscalYearStartingMonth) {
                fiscalYear = year - 1;
            }
            else {
                fiscalYear = year;
            }
            break;
    }
    return fiscalYear;
};

export const redirectTo = (pageName) => {
    window.location.href = AppConfig.baseUrl + pageName;
};

export const getGroupCTMs = (leadershipState, personnelState, groupId) => {
    if (!groupId) return '';
    var ctmsArray = Object.assign([], _.filter(getArrayFromObject(leadershipState), { 'GroupId': groupId, 'LeadershipType': 3 }));
    var ctmNameArray = [];
    if (ctmsArray.length > 0) {
        for (var i = 0; i < ctmsArray.length; i++) {
            var ctmName = getRiskRaterName(personnelState, ctmsArray[i].UserId);
            if (ctmName !== '') {
                ctmNameArray.push(ctmName);
            }
        }
        if (ctmNameArray.length > 0) {
            return ctmNameArray.sort().join(", ")
        } else {
            return '';
        }
    } else {
        return '';
    }
}

export const getRiskRaterName = (personnelState, userId) => {
    if (!userId) return '';
    var user = _.filter(personnelState, { 'UserId': userId });
    if (user.length > 0) {
        return user[0].Name;
    } else {
        return 'Unknown';
    }
}

export const fireAndForget = (url) => {
    var img = new Image();
    function remove() { img = null; }
    img.onerror = remove;
    img.onload = remove;
    img.src = url;
};

export const getLineTypeLabel = (lineItemtype, lineItemSubType) => {
    var lineType = '';
    switch (lineItemtype) {
        case 1:
            switch (lineItemSubType) {
                case 11:
                case 12: lineType = 'Margin Recurring'; break;
                case 13:
                case 14: lineType = 'Margin One-Time'; break;
            }
            break;
        case 2:
            lineType = 'Personnel';
            break;
        case 3:
            switch (lineItemSubType) {
                case 31:
                case 32:
                case 42: lineType = 'NPE Recurring'; break;
                case 35:
                case 36: lineType = 'NPE WC'; break;
                case 33:
                case 34:
                case 41: lineType = 'NPE One-Time'; break;
            }
            break;
    }
    return lineType;
}

export const getLineDirection = (lineItemSubType) => {
    switch (lineItemSubType) {
        case 11:
        case 13:
        case 22:
        case 31:
        case 33:
        case 35:
            return 1;
        case 12:
        case 14:
        case 21:
        case 25:
        case 32:
        case 34:
        case 36:
        case 41:
        case 42:
            return -1;

    }
}
export const getLineItemSubType = (lineTypeLabel) => {
    switch (lineTypeLabel) {
        case 'Margin Recurring':
            return [11, 12];
        case 'Margin One-Time':
            return [13, 14];
        case 'Personnel':
            return [21, 22, 25];
        case 'NPE Recurring':
            return [31, 32, 42];
        case 'NPE WC':
            return [35, 36];
        case 'NPE One-Time':
            return [33, 34, 41];
    }
}

export const getDirectionTypeLabel = (direction, isRevenue) => {
    var directionType = '';
    switch (direction) {
        case 1:
            directionType = isRevenue ? 'Increase' : 'Savings';
            break;
        case -1:
            directionType = isRevenue ? 'Decrease' : 'Cost';
            break;
        default:
            directionType = '';
    }
    return directionType;
};

export const getLineItemDataRange = (implementationTimingDuration, implementationStartDate) => {
    implementationTimingDuration = parseInt(implementationTimingDuration);
    var startDate = moment(implementationStartDate);
    var endDate = new Date(moment(startDate).add(implementationTimingDuration, 'months'));
    endDate = moment(endDate).subtract(1, "days");
    return { startDate: startDate, endDate: endDate }
};

export const getFormattedTiming = (time) => {
    if (!time) return '';
    return moment.utc(time).format('MM/DD/YYYY');
};

export const getPlanningDashboardTranslationValue = (key) => {
    switch (key) {
        case 'TargetAnnualized':
        case 'TargetAnnualizedCumulative':
        case 'TargetPL':
        case 'TargetPLCumulative':
        case 'TargetCF':
        case 'TargetCFCumulative':
            return 'Target$';

        case 'PlanAnnualized':
        case 'PlanAnnualizedCumulative':
        case 'PlanPL':
        case 'PlanPLCumulative':
        case 'PlanCF':
        case 'PlanCFCumulative':
            return 'Plan$';

        case 'ActualAnnualized':
        case 'ActualAnnualizedCumulative':
        case 'ActualPL':
        case 'ActualPLCumulative':
        case 'ActualCF':
        case 'ActualCFCumulative':
            return 'EstActual$';

        case 'VarianceAnnualized':
        case 'VarianceAnnualizedCumulative':
        case 'VariancePL':
        case 'VariancePLCumulative':
        case 'VarianceCF':
        case 'VarianceCFCumulative':
            return 'Variance$';

        case 'VariancePercentAnnualized':
        case 'VariancePercentAnnualizedCumulative':
        case 'VariancePercentPL':
        case 'VariancePercentPLCumulative':
        case 'VariancePercentCF':
        case 'VariancePercentCFCumulative':
            return 'Variance%';
        default: return key;
    }
}

export const getCurrentCulture = () => {
    return getLocalStorageKey('CurrentCulture') === null ? 'en' : getLocalStorageKey('CurrentCulture')
}

export const getIdeaDropdownOptions = (goIdeas) => {
    var ideaDropdownOptions = [];
    if (goIdeas.length > 0) {
        var ideas = _.orderBy(_.map(goIdeas,
            _.partialRight(_.pick, ['IdeaId', 'IdeaNumber', 'Title', 'Description', 'IdeaGroupId', 'FocusAreaId', 'PlanLockedException'])), ['IdeaNumber'], ['asc']);

        ideaDropdownOptions = ideas.map(item => {
            return {
                ...item,
                value: item.IdeaId,
                label: item.IdeaNumber + (!_.isEmpty(_.trim(item.Title)) ? ' - ' + _.trim(item.Title) : '')
            }
        });
    }
    return ideaDropdownOptions;
}

export const getIdeaDropdownOptionsByGoIdeaGroups = (goIdeaGroups) => {
    var ideaDropdownOptions = [];
    if (goIdeaGroups) {
        const ideas = _.uniqBy(_.map(goIdeaGroups, 'Ideas'), 'IdeaId');
        const ideaGroups = _.orderBy(_.map(goIdeaGroups,
            _.partialRight(_.pick, ['IdeaId', 'Idea.IdeaNumber', 'Idea.Title', 'Idea.Description', 'IdeaGroupId', 'FocusAreaId', 'Idea.PlanLockedException'])), ['Idea.IdeaNumber'], ['asc']);

        ideaDropdownOptions = ideaGroups.map(item => {
            return {
                ...item,
                value: item.IdeaId,
                label: item.Idea.IdeaNumber + (!_.isEmpty(_.trim(item.Idea.Title)) ? ' - ' + _.trim(item.Idea.Title) : '')
            }
        });
    }
    return ideaDropdownOptions;
}

export const formatAmountOrCount = (value, isShowSign, allowZero, allowNull, showDecimal) => {
    if (!isShowSign) { isShowSign = false; }
    if (value === null) {
        return allowNull ? '-' : '';
    }
    if (value === 0 || value === '0' || value === '') {
        return allowZero ? '-' : (numeral(value).format('$0,0'));
    }
    else {
        if (showDecimal) {
            return (isShowSign ? (numeral(value).format('$0,0.[00]')) : (numeral(value).format('0,0.[00]')));
        } else {
            return (isShowSign ? (numeral(value).format('$0,0')) : (numeral(value).format('0,0')));
            //return amount + 'k';
        }
    }
}

export const ideaColumnOptions = () => [
    { inputProps: { checked: true, name: 'IdeaNumber', disabled: true, sequence: 10 }, label: 'Idea Number' },
    { inputProps: { checked: false, name: 'GroupName', disabled: false, sequence: 20 }, label: 'Group' },
    { inputProps: { checked: false, name: 'FocusArea', disabled: false, sequence: 30 }, label: 'Focus Area' },
    { inputProps: { checked: false, name: 'Title', disabled: false, sequence: 40 }, label: 'Title' },
    { inputProps: { checked: false, name: 'Description', disabled: false, sequence: 50 }, label: 'Description' },
    { inputProps: { checked: false, name: 'RiskName', disabled: false, sequence: 60 }, label: 'Risk' },
    { inputProps: { checked: false, name: 'Value', disabled: false, sequence: 70 }, label: 'Value' },
    { inputProps: { checked: false, name: 'DecisionName', disabled: false, sequence: 80 }, label: 'Decision' }
];

export const riskRatingColumnOptions = () => [
    { inputProps: { checked: true, name: 'IdeaNumber', disabled: true, sequence: 10 }, label: 'Idea Number' },
    { inputProps: { checked: false, name: 'GroupName', disabled: false, sequence: 20 }, label: 'Group' },
    { inputProps: { checked: false, name: 'RoleName', disabled: false, sequence: 30 }, label: 'Role' },
    { inputProps: { checked: false, name: 'UserName', disabled: false, sequence: 40 }, label: 'Name' },
    { inputProps: { checked: false, name: 'RiskRatingLabel', disabled: false, sequence: 50 }, label: 'Risk Rating' },
    { inputProps: { checked: false, name: 'Notes', disabled: false, sequence: 60 }, label: 'Notes' }
];

export const lineItemColumnOptions = () => [
    { inputProps: { checked: true, name: 'IdeaNumber', disabled: true, sequence: 10 }, label: 'Idea Number' },
    { inputProps: { checked: false, name: 'GroupName', disabled: false, sequence: 20 }, label: 'Group' },
    { inputProps: { checked: false, name: 'LineItemType', disabled: false, sequence: 30 }, label: 'Line Item Type' },
    { inputProps: { checked: false, name: 'IsIT', disabled: false, sequence: 40 }, label: 'IT' },
    { inputProps: { checked: false, name: 'Value', disabled: false, sequence: 50 }, label: 'Value' },
    { inputProps: { checked: false, name: 'Direction', disabled: false, sequence: 60 }, label: 'Direction' },
    { inputProps: { checked: false, name: 'FunctionalTitle', disabled: false, sequence: 70 }, label: 'Functional Title' },
    { inputProps: { checked: false, name: 'SalaryRange', disabled: false, sequence: 80 }, label: 'Comp Range' },
    { inputProps: { checked: false, name: 'PersonnelCount', disabled: false, sequence: 90 }, label: 'People' },
    { inputProps: { checked: false, name: 'Category', disabled: false, sequence: 100 }, label: 'Category' },
    { inputProps: { checked: false, name: 'Type', disabled: false, sequence: 110 }, label: 'Type' },
    { inputProps: { checked: false, name: 'AmortizationPeriod', disabled: false, sequence: 120 }, label: 'Amortization Period' },
    { inputProps: { checked: false, name: 'Amount', disabled: false, sequence: 130 }, label: 'NPE Amount' },
    { inputProps: { checked: false, name: 'RevenueChange', disabled: false, sequence: 140 }, label: 'Revenue Change' },
    { inputProps: { checked: false, name: 'MarginChange', disabled: false, sequence: 150 }, label: 'Margin Change' },
    { inputProps: { checked: false, name: 'Timing', disabled: false, sequence: 160 }, label: 'Timing' },
    { inputProps: { checked: false, name: 'Notes', disabled: false, sequence: 170 }, label: 'Notes' }
];

export const filterByValuesIdea = (collection, key, values) => {
    return _.filter(collection, function (o) {
        return contains(values, resolveKeyIdea(o, key));
    });
};

export const excludeByValuesIdea = (collection, key, values) => {
    return _.filter(collection, function (o) {
        return !contains(values, resolveKeyIdea(o, key));
    });
};

export const resolveKeyIdea = (obj, key) => {
    if (obj.Idea === null || key === null) {
        return undefined;
    }
    var resolved = undefined;
    if (typeof key === 'function') {
        resolved = key(obj.Idea);
    } else if (typeof key === 'string') {
        resolved = obj.Idea[key];
        if (resolved === null && key.indexOf(".") !== -1) {
            resolved = _.deepGet(obj.Idea, key);
        }
    }
    return resolved;
};

export const isCheckBoxChecked = (view, isChecked) => {
    if (isChecked > 0) {
        return (isChecked & view) != 0
    } else {
        return false;
    }
}

export const getDashboardPahse = (config, selectedPhase) => {
    if (selectedPhase && selectedPhase !== '') {
        return selectedPhase;
    } else {
        return config['ClientSetting_DefaultDashboardPhase'] ? parseInt(config['ClientSetting_DefaultDashboardPhase'].Value) : 1;
    }
};

const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export const numberInWords = (num) => {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
};

export const getFieldTotal = function (json, fieldName) {
    var output = _.reduce(json, function (s, entry) {
        return Number((s + parseFloat(isEmpty2(entry[fieldName]) ? 0 : entry[fieldName])).toFixed(2));
    }, 0);
    return output;
};

export const getExportDetailsFields = () => {
    return [
        { Value: 'FileName', Text: i18n.t('FileName') },
        { Value: 'CreatedBy', Text: i18n.t('CreatedBy') },
        { Value: 'CreatedOn', Text: i18n.t('CreatedOn') },
        { Value: 'Group', Text: i18n.t('Group') }];
}
export const getPersonnelCols = () => {
    return [
        { Value: 'JobTitle', Text: i18n.t('JobTitle') },
        { Value: 'FunctionalTitle', Text: i18n.t('FunctionalTitle') },
        { Value: 'FirstName', Text: i18n.t('FirstName') },
        { Value: 'LastName', Text: i18n.t('LastName') },
        { Value: 'CostCenter', Text: i18n.t('CostCenter') },
        //{ Value: 'WorkLocation', Text: i18n.t('WorkLocation') },
        { Value: 'PayType', Text: i18n.t('PayType') },
        { Value: 'FTE', Text: i18n.t('FTE') },
        { Value: 'PositionId', Text: i18n.t('PositionId') },
        { Value: 'EmployeeId', Text: i18n.t('EmployeeId') },
        { Value: 'ManagerPositionId', Text: i18n.t('ManagerPositionId') },
        { Value: 'IsManualFT', Text: i18n.t('MappingExceptionLabel') },
        { Value: 'Exempt', Text: i18n.t('Exempt') },
        { Value: 'EmpUnion', Text: i18n.t('EmpUnion') },
        { Value: 'IsOpen', Text: i18n.t('IsOpen') },
        { Value: 'DivisionId', Text: i18n.t('DivisionId') },
        { Value: 'OtherId1', Text: i18n.t('OtherId1') },
        { Value: 'OtherId2', Text: i18n.t('OtherId2') },
        { Value: 'Email', Text: i18n.t('Email') },
        { Value: 'City', Text: i18n.t('City') },
        { Value: 'StateRegion', Text: i18n.t('StateRegion') },
        { Value: 'Country', Text: i18n.t('Country') },
        { Value: 'ServiceDate', Text: i18n.t('ServiceDate') }];
}

export const validateAuth0Token = function (token) {
    if (!token) {
        return true;
    }
    if (token === '') {
        return true;
    } else {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var jwt = JSON.parse(window.atob(base64));

        var dt = new Date();
        var utcNow = new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds());
        if (parseFloat(jwt.exp) < parseFloat(utcNow.getTime() / 1000)) {
            return true;
        }
    }
    return false;
};

export const checkIsITCostingGroup = (groups, groupId) => {
    if (Object.keys(groups).length > 0) {
        const groupInfo = groups[groupId];
        if (groupInfo) {
            return groupInfo.IsITCosting;
        } else {
            return false;
        }
    }
};

export const getFocusAreaDropdownOptions = (options) => {
    const index = _.findIndex(options, { 'FocusAreaId': null });
    if (index === -1) {
        let emptyOption = { FocusAreaId: null, Name: <Text>&nbsp;</Text> };
        options.unshift(emptyOption);
    }
    return options;
};

export const isValidEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const isEqualString = (string1, string2) => {
    return !isEmpty2(string1) && !isEmpty2(string2) && (string1.toUpperCase() === string2.toUpperCase());
};

//const menus = ["Dashboard", "Ideas", "Tasks", "Reports", "Implementation", "GroupAdmin", "Baseline", "Org", "Admin", "UserAdmin", "ViciAdmin", "Settings", "Analytics"];
const menus = ["Start", "Ideas", "Planning", "Tracking", "Org", "Calendar", "GroupAdmin", "Baseline", "Admin", "UserAdmin", "ViciAdmin", "Settings", "Analytics", "Help"];
const subMenus = [
    ["Simplified", "IdeaGeneration", "FocusAreas", "FunctionalTitles", "BaselineCube", "Reports"],
    ["Dashboard", "Comprehensive", "Custom", "Simplified", 'IdeaGeneration', "SCR", "ResolveReview", "Reports"],
    ["Dashboard", "Comprehensive", "Ideas", "LineItems", "Metrics", "Milestones", "Reports"],
    ["Dashboard", "Comprehensive", "Ideas", "LineItems", "Metrics", "Milestones", "Reports"],
    [""],
    ["WeeklyTasks", "TaskList", "ManageTasks"],
    ["FocusAreas", "GroupSummary", "Leadership", "GroupDefinedFields", "GroupSCRManager", "Settings", "Sessions"],
    ["Summary", "NPECube", "PECube"],
    ["ProjectSettings", "ClientSettings", "Groups", "ProjectValueReport", "SCRManager"],
    ["Users", "AdminUsers", "UserPermissions", "Connections"],
    ["CompRanges", "ProjectDefinedFields", "RolePermissions", "BaselineData", "AppStats"],
    ["Profile", "Security", "UserSettings"],
    ["Module1", "Module2"],
    [""]
];
// const subMenus = [
//     ["Summary", "ResolveReview", "SCRReport"],
//     ["Comprehensive", "Simplified", "Custom", 'IdeaGeneration'],
//     ["WeeklyTasks", "TaskList", "ManageTasks"],
//     [""],
//     ["Comprehensive", "Ideas", "LineItems", "Metrics", "Milestones"],
//     ["FocusAreas", "GroupSummary", "Leadership", "GroupDefinedFields", "GroupSCRManager", "Settings", "Sessions"],
//     ["Summary", "NPECube", "PECube", "AssignFunctionalTitle"],
//     [""],
//     ["ClientSettings", "Groups", "ProjectValueReport", "SCRManager"],
//     ["Users", "AdminUsers", "UserPermissions", "Connections"],
//     ["CompRanges", "ProjectDefinedFields", "RolePermissions", "BaselineData", "AppStats"],
//     ["Profile", "Security", "UserSettings"],
//     ["Module1", "Module2"]
// ];
export const getLastPageCookie = (projectId) => {
    if (!projectId) {
        projectId = getLastProjectId();
    }
    let cookie = /* (Cookies && Cookies.getJSON("LastPage-" + projectId)) || */ [0, 0]; // Array.from({length: menus.length}, () => 0);
    return cookie;
}
export const writeLastPageCookie = (menuIndex, subMenuIndex) => {
    const projectId = getLastProjectId();
    let cookie = getLastPageCookie(projectId);
    cookie[menuIndex] = subMenuIndex;
    setCookies("LastPage-" + projectId, JSON.stringify(cookie), { expires: 14 });
    setCookies("LastActivePage-" + projectId, menuIndex, { expires: 14 });
}

export const getCompanySubMenuIndex = (menuIndex, subMenuIndex) => {
    let startSubMenuIndex = 0;
    switch (menuIndex) {
        case 0:
            switch (subMenuIndex) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 5:
                    startSubMenuIndex = 4; break;
            }
            break;
        case 1:
            switch (subMenuIndex) {
                case 3:
                    startSubMenuIndex = 0; break;
            }
            break;
        case 5: startSubMenuIndex = 1;
            switch (subMenuIndex) {
                case 0:
                    startSubMenuIndex = 1; break;
            }
            break;
    }
    return startSubMenuIndex;
};

export const getIndexBasedUrl = (isCompanyView, menuIndex, subMenuIndex, clientSettingIdeaGenerationSessions) => {
    if (isCompanyView && (menuIndex === 0 || menuIndex === 1 || menuIndex === 5)) {
        subMenuIndex = getCompanySubMenuIndex(menuIndex, subMenuIndex);
    }

    let url = '';
    if (menuIndex === MajorMenu.GROUPADMIN && (isEmpty2(subMenuIndex) || subMenus[MajorMenu.GROUPADMIN][subMenuIndex] === 'Sessions')) {
        url = menus[menuIndex] + '/' + (clientSettingIdeaGenerationSessions && clientSettingIdeaGenerationSessions.Value !== '0' ? subMenus[menuIndex][6] : subMenus[menuIndex][0]);
    } else {
        if (subMenuIndex && subMenuIndex !== 0) {
            url = menus[menuIndex] + '/' + subMenus[menuIndex][subMenuIndex];
        } else {
            url = menus[menuIndex] + '/' + subMenus[menuIndex][0];
        }
    }
    url = url.replace("/undefined", "");
    return url;
}

export const getLastSubMenu = (majorMenu, cookieLastValue, isCompanyView, clientSettingIdeaGenerationSessions) => {
    return AppConfig.baseUrl + getIndexBasedUrl(isCompanyView, majorMenu, cookieLastValue, clientSettingIdeaGenerationSessions);
};

/***********reducer section********/
export const getEntityPayload = (payload, entityType) => {
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

/* export const getFooterHTML = () => {
    const htmlString = ReactDOMServer.renderToString(
        <View style={{ paddingLeft: 50, width: 1300, paddingRight: 20 }}>
            <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i' rel='stylesheet' />
            <table style={{ maxWidth: 1250, fontSize: 12.5, height: 36, marginBottom: 0, fontFamily: 'Source Sans Pro', color: '#4e5561' }}>
                <tr style={{ valign: 'basline', height: 4 }} ><td colSpan='5' style={{ textAlign: 'left', width: 1250, borderBottom: '1px solid #4e5561' }}></td></tr>
                <tr style={{ valign: 'top' }}><td><Text id="spnClientName"></Text></td><td>CONFIDENTIAL</td><td> &#169; Vici Partners</td><td><Text id="spnClientTime"></Text></td></tr>
            </table>
        </View>
    );
    return htmlString;
}; */

export const closeModalMessage = () => {
    return (
        <Text>
            {i18n.t('ReportGeneratingPDFNotification')}
            <Text> {"\n"} </Text>
            <Text style={{ fontSize: 12 }}>It will be downloaded automatically. You can close this dialog.</Text>
        </Text>
    )
}

export const getMFATypeName = (type) => {
    switch (type) {
        case 'pn': return i18n.t('MFAAuth0Guardian');
        case 'sms': return i18n.t('MFASMS');
        case 'authenticator': return i18n.t('MFAAuthenticator');
        default: return <Text style={{ textTransform: 'capitalize' }}>{type}</Text>;
    }
};

export const getMFASource = (objMfaSetup) => {
    switch (objMfaSetup.type) {
        case 'pn': return objMfaSetup.name;
        case 'sms': return i18n.t('MFAPhone') + ": " + objMfaSetup.phone_number;
        case 'authenticator': return "";
        default: return <Text style={{ textTransform: 'capitalize' }}>{objMfaSetup.type}</Text>;
    }
};
export const getAnnualVariances = (ideaGroups) => {
    let variances = {
        PL: { PlanPL: [0, 0, 0, 0, 0], ActualPL: [0, 0, 0, 0, 0], VariancePL: [0, 0, 0, 0, 0], VariancePercentPL: [0, 0, 0, 0, 0] },
        CF: {
            PlanCF: [0, 0, 0, 0, 0], ActualCF: [0, 0, 0, 0, 0], VarianceCF: [0, 0, 0, 0, 0], VariancePercentCF: [0, 0, 0, 0, 0]
        },
    }
    variances.PL.PlanPL = _.map(_.unzip(_.map(ideaGroups, 'PlanPLYearlyValues')), _.sum);
    variances.PL.ActualPL = _.map(_.unzip(_.map(ideaGroups, 'ActualPLYearlyValues')), _.sum);
    variances.PL.VariancePL = _.map(variances.PL.ActualPL, (item, i) => { return (item === 0 && variances.PL.PlanPL[i] === 0) ? null : _.subtract(item, variances.PL.PlanPL[i]); });
    variances.PL.VariancePercentPL = variancePercentage(variances.PL.VariancePL, variances.PL.PlanPL);

    variances.CF.PlanCF = _.map(_.unzip(_.map(ideaGroups, 'PlanCFYearlyValues')), _.sum);
    variances.CF.ActualCF = _.map(_.unzip(_.map(ideaGroups, 'ActualCFYearlyValues')), _.sum);
    variances.CF.VarianceCF = _.map(variances.CF.ActualCF, (item, i) => { return (item === 0 && variances.CF.PlanCF[i] === 0) ? null : _.subtract(item, variances.CF.PlanCF[i]); });
    variances.CF.VariancePercentCF = variancePercentage(variances.CF.VarianceCF, variances.CF.PlanCF);
    return variances;
};
const variancePercentage = (array1, array2) => {
    return array1.map(function (item, index) {
        // In this case item correspond to currentValue of array a, 
        // using index to get value from array b
        if ((!item || item === 0) && (!array2[index] || array2[index] === 0)) return null;
        else {
            return (item ? (_.divide(item, array2[index] ? Math.abs(array2[index]) : 1)) : 0) * 100;
        }
    });
};

export const getReferenceText = (referenceType, ItemNumber) => {
    switch (referenceType) {
        case 100:
        case 200:
        case 210:
            return '';
        case 211: return (ItemNumber ? ('R' + ItemNumber) : '');
        case 212: return (ItemNumber ? ('L' + ItemNumber) : '');
        case 213: return (ItemNumber ? ('L' + ItemNumber) : '');
        case 214: return (ItemNumber ? ('L' + ItemNumber) : '');
        case 215: return (ItemNumber ? ('ME' + ItemNumber) : '');
        case 216: return (ItemNumber ? ('MI' + ItemNumber) : '');
        default: return '';
    }
};

export const getReferenceLabel = (referenceType, ItemNumber) => {
    switch (referenceType) {
        case 100:
        case 200:
        case 210:
            return '';
        case 211: return (ItemNumber ? (translateKey('Risk') + ': ' + ItemNumber) : '');
        case 212: return (ItemNumber ? (translateKey('Line') + ': ' + ItemNumber) : '');
        case 213: return (ItemNumber ? (translateKey('Line') + ': ' + ItemNumber) : '');
        case 214: return (ItemNumber ? (translateKey('Line') + ': ' + ItemNumber) : '');
        case 215: return (ItemNumber ? (translateKey('Metric') + ': ' + ItemNumber) : '');
        case 216: return (ItemNumber ? (translateKey('Milestone') + ': ' + ItemNumber) : '');
        default: return '';
    }
};

export const getTabNameByReferenceText = (referenceType) => {
    switch (referenceType) {
        case 100:
        case 200:
            return '';
        case 210:
            return 'Title';
        case 211: return 'RiskRating';
        case 212: return 'DollarImpact';
        case 213: return 'DollarImpact';
        case 214: return 'DollarImpact';
        case 215: return 'Metric';
        case 216: return 'Milestone';
        default: return '';
    }
};

export const filterArrayDataById = (dataArray, fieldName, fieldValue) => {
    if (isEmpty2(dataArray) || dataArray.length === 0) return [];
    const filteredDataArray = dataArray.filter(function (el) { return el[fieldName].toLowerCase() === fieldValue.toLowerCase() });
    return filteredDataArray;
};

export const translateKey = (key, param) => {
    if (!param) {
        return i18n.t(key, { wait: true });
    } else {
        return i18n.t(key, param, { wait: true });
    }
};

export const sortNotesArrayByParams = (arrToSort /* array */, sortColumnName /* string */, sortAscending /* bool(optional, defaults to true) */) => {
    let sortedObj = [];
    if (sortAscending === undefined) sortAscending = true;  // default to true
    if (sortAscending) {
        switch (sortColumnName) {
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (o[sortColumnName] && typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName] && o[sortColumnName] || ''
                        }
                    }
                    ], ['asc']);
                break;
        }
    }
    else {
        switch (sortColumnName) {
            default:
                sortedObj = _.orderBy(arrToSort,
                    [(o) => {
                        if (o[sortColumnName] && typeof o[sortColumnName] === 'string') {
                            return o[sortColumnName].toLowerCase() || ''
                        } else {
                            return o[sortColumnName] && o[sortColumnName] || ''
                        }
                    }
                    ], ['desc']);
                break;
        }
    }
    return sortedObj;
}

export const isNotesSortingRequired = (sortObj) => {
    let isSortingRequired = false;
    if (isEmpty2(sortObj.sortColumn)) {
        isSortingRequired = true;
    } else if (sortObj.sortColumn === 'Context') {
        isSortingRequired = true;
    }
    return isSortingRequired;
}

export const getIdeaView = (locationPath) => {
    let ideaView = 1;
    switch (locationPath) {
        case 'ideas/comprehensive':
            ideaView = 1; break;
        case 'ideas/custom':
            ideaView = 2; break;
        case 'start':
        case 'start/simplified':
            ideaView = 3; break;
        case 'ideas/ideageneration':
        case 'start/ideageneration':
            ideaView = 4; break;
        case 'planning/comprehensive':
            ideaView = 7; break;
        case 'tracking/comprehensive':
            ideaView = 8; break;
        case 'tracking/ideas':
        case 'planning/ideas':
            ideaView = 9; break;
        case 'planning/lineitems':
        case 'tracking/lineitems':
            ideaView = 10; break;
        case 'planning/metrics':
        case 'tracking/metrics':
            ideaView = 11; break;
        case 'planning/milestones':
        case 'tracking/milestones':
            ideaView = 12; break;


        default: ideaView = 1; break;
    }
    return ideaView;
};

export const getEventDetails = (selectedPhase, selectedView, value, type) => {
    const component = selectedPhase == 2 ? 'SCR2/Filter' : 'SCR3/Filter';
    const path = selectedView === 1 ? Path.DashboardSummary : (selectedView === 2 ? Path.DashboardResolveReview : Path.DashboardSCRReport);
    let action = '';
    let name = '';
    switch (value) {
        case "1":
            name = (type === "Value" ? "Value/" + Names.All : (type == "Recommendation" ? "Recommendation/" + Names.All : "Decision/" + Names.All));
            action = Events.Selected;
            break;
        case "2":
            name = (type === "Value" ? "Value/" + Names.Rough : (type == "Recommendation" ? "Recommendation/" + Names.Go : "Decision/" + Names.Go));
            action = Events.Selected;
            break;
        case "3":
            name = (type === "Value" ? "Value/" + Names.Detailed : (type == "Recommendation" ? "Recommendation/" + Names.NoGo : "Decision/" + Names.NoGo));
            action = Events.Selected;
            break;
        case "4":
            name = (type === "Recommendation" ? "Recommendation/" + Names.NoRecommendation : "Decision/" + Names.NoDecision);
            action = Events.Selected;
            break;
        default:
            break;
    }
    return { path: path, component: component, name: name, action: action };
};

export const getMajorNavbarMenuList = (projectConfig, selectedProjectId) => {
    const majorNavbarMenuConfig = projectConfig[selectedProjectId + '-ClientSetting_MajorNavbarMenu'] ? projectConfig[selectedProjectId + '-ClientSetting_MajorNavbarMenu'].Value : '';
    return _.split(majorNavbarMenuConfig.replace(/\s/g, ''), ',');
};

export const getReportHeaderHTML = (reportName, groupName, description, isCompanyView, projectName, orgProjectName) => {
    var groupHeader = ': ' + description + ' (' + groupName + ')';
    var _this = this;
    return (
        <View id="pageHeader" className="pageHeader" style={{ display: 'none' }}>
            <View className="summary-inner">
                <View id="divReportHeader" className="report-title-header left" style={{ maxWidth: '1250px' }}>
                    <View className="report-col-header wd33pc">
                        <Text>{reportName}</Text>
                    </View>
                    <View className="report-col-header wd33pc text-center">
                        <Text>
                            {isCompanyView &&
                                translateKey('Company')}
                            {!isCompanyView &&
                                translateKey('Group')}
                            {!isCompanyView &&
                                groupHeader
                            }
                        </Text>
                    </View>
                    <View className="report-col-header text-right wd34pc">
                        <Text>
                            <Text>
                                {projectName}
                                {orgProjectName &&
                                    <Text> - {orgProjectName}</Text>
                                }
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const isIpad = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.phone() || md.mobile() || md.tablet() || md.is('iPad')) {
        return true;
    } else {
        return false;
    }
};

export const isSimplifiedBaseline = (projectConfig, selectedProjectId) => {
    const isSimplifiedBL = projectConfig[selectedProjectId + '-ClientSetting_BaselineMode'] ? projectConfig[selectedProjectId + '-ClientSetting_BaselineMode'].Value === '2' : false;
    return isSimplifiedBL;
};

export const getMonthDiff = (dateFrom, dateTo) => {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
};

const urlSource = "";

export const setCookies = (key, value, expireTime) => {

    let expires = moment().add(expireTime.expire, 'days').format();

    if (Platform.OS === "ios") {
        CookieManager.set({
            name: key,
            value: value,
            domain: urlSource,
            origin: urlSource,
            path: '/',
            version: '1',
            expiration: expires
        }).then((res) => {
            console.log('CookieManager.set =>', res);
        });

    } else {
        CookieManager.setFromResponse(
            urlSource,
            `${key} = ${value} ; path=/; expires=${expires}; secure;`)
            .then((res) => {
                // `res` will be true or false depending on success.
                //  console.log('CookieManager.setFromResponse =>', res);
            });
    }
};

export const getBaselineModeOptions = () => {
    return [{ value: 1, label: i18n.t('WorkshopBaseline') },
    { value: 2, label: i18n.t('SimpleBaseline') },
    { value: 3, label: i18n.t('DetailedBaseline') }];
};

export const getMinWidthForMonth = (fiscalYearsLength) => {
    const viewPortHeight = Math.max(document.documentElement.clientWidth, window.innerWidth  || 0);
    switch (fiscalYearsLength) {
        case 10: return (viewPortHeight < 1200 ? (5 - 2) : 5);
        case 9: return (viewPortHeight < 1200 ? (5 - 2) : 5);
        case 8: return (viewPortHeight < 1200 ? (6 - 2) : 6);
        case 7: return (viewPortHeight < 1200 ? (7 - 2) : 7);
        case 6: return (viewPortHeight < 1200 ? (8 - 2) : 8);
        case 5: return (viewPortHeight < 1200 ? (10 - 2) : 10);
        case 4: return (viewPortHeight < 1200 ? (12 - 2) : 12);
        case 3: return (viewPortHeight < 1200 ? (16 - 2) : 16);
        case 2: return (viewPortHeight < 1200 ? (25 - 2) : 25);
        case 1: return (viewPortHeight < 1200 ? (50 - 2) : 50);
        default: return 0;
    }
}

export const getCostAndSavingFromSubType = (lineItemSubType) => {
    switch (lineItemSubType) {
        case 11:
        case 13:
        case 22:
        case 31:
        case 33:
        case 35:
            return 1;
        case 12:
        case 14:
        case 21:
        case 25:
        case 32:
        case 34:
        case 36:
        case 41:
        case 42:
            return -1;
        default: return 1;
    }
}

export const getIsOneTime = (lineItemSubType) => {
    switch (lineItemSubType) {
        case 13:
        case 14:
        case 33:
        case 34:
        case 41:
            return true;
        default: return false;
    }
}

export const getCookies = (key) => {

    if (Platform.OS === "ios") {
        CookieManager.getAll()
            .then((res) => {
                return res[key];
            });
    }
    // Android
    CookieManager.get(urls)
        .then((res) => {
            // console.log('CookieManager.get =>', res[key]); // => 'user_session=abcdefg; path=/;'
            return res[key];
        });
}

export const getAllCookies = key => {

    if (Platform.OS === "ios") {
        CookieManager.getAll()
            .then((res) => {
                //  console.log('CookieManager.getAll =>', res);
                return res;
            });
    }
    // Android
    CookieManager.get(urls)
        .then((res) => {
            // console.log('CookieManager.get =>', res[key]); // => 'user_session=abcdefg; path=/;'
            return res;
        });

}

export const clearAllCookies = () => {

    if (Platform.OS === "ios") {
        //
    }

    CookieManager.clearAll()
        .then((res) => {
            //   console.log('CookieManager.clearAll =>', res);
        });
}
