import update from 'immutability-helper';
import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';
import * as loghelper from '../common/loghelper';
import { filterByValues, getLastProjectId, prepareObjectFromArray } from '../common/utils';
import { masterData } from '../store/configureStoreData';
import * as updater from './updater/functionalTitleUpdater'; 

let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getFiscalYear = (fiscalYearStartingMonth, dt) => {
    var fiscalYear = 0;
    switch (fiscalYearStartingMonth) {
        case 10:
            if (dt.getMonth() >= fiscalYearStartingMonth) {
                fiscalYear = dt.getFullYear() + 1;
            }
            else {
                fiscalYear = new Date(moment(dt).add(3, 'months')).getFullYear();
            }
            break;
        default:
            if ((dt.getMonth() + 1) < fiscalYearStartingMonth) {
                fiscalYear = dt.getFullYear() - 1;
            }
            else {
                fiscalYear = dt.getFullYear();
            }
            break;
    }

    return fiscalYear;
};

const getFiscalMonth = (fiscalYearStartingMonth, dt) => {
    var fiscalMonth = 0;
    switch (fiscalYearStartingMonth) {
        case 10:
            if (dt.getMonth() > 9) {
                fiscalMonth = dt.getMonth() - 9;
            }
            else {
                fiscalMonth = dt.getMonth() + 3;
            }
            break;
        case 4:
            if ((dt.getMonth() + 1) < fiscalYearStartingMonth) {
                fiscalMonth = dt.getMonth() + 9;
            }
            else {
                fiscalMonth = dt.getMonth() - 3;
            }
            break;
        default:
            fiscalMonth = dt.getMonth();
            break;
    }

    return fiscalMonth;
};

const getFiscalYearMonthBetweenDates = (configList, projectConfigList) => {
    const from = 'January 2016';
    //var to = 'December 2017';
    let arr = [];

    let implementationTimingDuration = parseInt(projectConfigList['ClientSetting_ImplementationTimingDuration'] ? projectConfigList['ClientSetting_ImplementationTimingDuration'].Value : 28);

    let fiscalYearStartingMonth = configList['ClientSetting_FiscalYearStartingMonth'] ? configList['ClientSetting_FiscalYearStartingMonth'].Value : 1;
    fiscalYearStartingMonth = parseInt(fiscalYearStartingMonth) > 0 ? parseInt(fiscalYearStartingMonth) : 1;

    const startDate = projectConfigList['ClientSetting_ImplementationStartDate'] ? new Date(projectConfigList['ClientSetting_ImplementationStartDate'].Value) : new Date('1 ' + from);
    const implementationEndDate = new Date(moment(startDate).add(parseInt(implementationTimingDuration), 'months'));

    let fiscalMonth = 0;
    let fiscalYear = 0;
    for (let i = implementationTimingDuration; i >= 1; i--) {
        const _date = new Date(moment(implementationEndDate).add(-i, 'months'));
        fiscalMonth = getFiscalMonth(fiscalYearStartingMonth, _date);
        fiscalYear = getFiscalYear(fiscalYearStartingMonth, _date);
        const fiscaldate = new Date(fiscalYear, fiscalMonth, 1);
        arr.push(
            {
                year: fiscalYear, label: fiscalYear + " " + monthNames[fiscalMonth],
                value: moment(fiscaldate).format('YYYYMM'), date: moment(fiscaldate).format('L')
            }
        );
    }
    return arr;
};

const getYearMonthBetweenDates = (configList, projectConfigList) => {
    const from = 'January 2016';
    //var to = 'December 2017';
    var arr = [];
    const implementationTimingDuration = parseInt(projectConfigList['ClientSetting_ImplementationTimingDuration'] ? projectConfigList['ClientSetting_ImplementationTimingDuration'].Value : 28);

    const startDate = projectConfigList['ClientSetting_ImplementationStartDate'] ? new Date(projectConfigList['ClientSetting_ImplementationStartDate'].Value) : new Date('1 ' + from);
    const implementationEndDate = new Date(moment(startDate).add(parseInt(implementationTimingDuration), 'months'));
    const implementationStartDate = startDate;

    let fiscalYearStartingMonth = configList['ClientSetting_FiscalYearStartingMonth'] ? configList['ClientSetting_FiscalYearStartingMonth'].Value : 1;
    fiscalYearStartingMonth = parseInt(fiscalYearStartingMonth) > 0 ? parseInt(fiscalYearStartingMonth) : 1;


    const fromYear = implementationStartDate.getFullYear();
    const toYear = implementationEndDate.getFullYear();
    const diffYear = (12 * (toYear - fromYear)) + implementationEndDate.getMonth();
    let fiscalYear = 0;

    for (let i = implementationStartDate.getMonth(); i < diffYear; i++) {
        const _date = new Date(Math.floor(fromYear + (i / 12)), i % 12, 1);
        fiscalYear = getFiscalYear(fiscalYearStartingMonth, _date);

        arr.push({ fiscalYear: fiscalYear, year: Math.floor(fromYear + (i / 12)), label: Math.floor(fromYear + (i / 12)) + " " + monthNames[i % 12], shortName: Math.floor(fromYear + (i / 12)) + " " + monthShortNames[i % 12], value: moment(new Date(Math.floor(fromYear + (i / 12)), i % 12, 1)).format('YYYYMM'), date: moment(new Date(Math.floor(fromYear + (i / 12)), i % 12, 1)).format('L') });//moment(new Date(Math.floor(fromYear + (i / 12)), i % 12, 1)).format('L')});
    }
    return arr;
};

const updateGroupEntities = (state, data) => {
    let stateObj = Object.assign({}, state.groups);
    if (data[1] && data[1].length > 0) {
        const deletedData = data[1];
        deletedData.map(function (groupId) {
            delete stateObj[groupId];
            return;
        });
    }
    if (data[0] && data[0].length > 0) {
        const newData = data[0];
        if (newData && newData.length > 0) {
            const group = newData[0];
            const groupId = group.GroupId;
            stateObj[groupId] = group;
        }
    }
    return {
        ...state, groups: stateObj
    }
}



const updateSalaryRangeEntities = (state, data) => {

    let changeState = _.clone(state.salaryRange);
    changeState = Object.values(changeState);

    if (data[1] && data[1].length > 0) {
        _.map(data[1], el => {
            if (el) {
                const updatedSalaryIndex = _.findIndex(changeState, { 'SalaryRangeGuid': el });
                if (updatedSalaryIndex !== -1) {
                    changeState = update(changeState, { $splice: [[updatedSalaryIndex, 1]] });

                }
            }
        });
    }

    const getData = data[0];
    if (getData && getData.length > 0) {
        getData.map(getDataGuidData => {
            if (getDataGuidData) {
                const updatedSalaryIndex = _.findIndex(changeState, { 'SalaryRangeGuid': getDataGuidData.SalaryRangeGuid });
                if (updatedSalaryIndex !== -1) {
                    changeState = update(changeState, {
                        [updatedSalaryIndex]: {
                            AvgSalary: { $set: getDataGuidData.AvgSalary },
                            LoadFactor: { $set: getDataGuidData.LoadFactor },
                            MaxSalary: { $set: getDataGuidData.MaxSalary },
                            MinSalary: { $set: getDataGuidData.MinSalary },
                            SalaryRangeId: { $set: getDataGuidData.SalaryRangeId },
                        }
                    });
                } else {
                    changeState = update(changeState, { $push: [getDataGuidData] });
                }
            }

        })
    }

    return update(state, {
        salaryRange: {
            $set: (
                prepareObjectFromArray(changeState, ["SalaryRangeId"])
            )
        },
    })
}

const updateFocusAreaEntities = (state, data, pushedGroupId) => {
    var stateObj = Object.assign({}, state.focusAreas);
    if (data[1] && data[1].length > 0) {
        stateObj = Object.assign([], _.remove(stateObj, function (item) { return data[1].indexOf(item.EntityId) === -1 }));
    }

    if (data[0] && data[0].length > 0) {
        var newData = data[0];
        if (newData && newData.length > 0) {//&& newData[0].length > 0
            const focusAreas = newData[0];
            const tmpStateObj = filterByValues(Object.assign({}, stateObj), 'GroupId', [pushedGroupId]);
            const groupFAIds = _.map(tmpStateObj, 'FocusAreaId');
            const groupNewFAIds = _.map(focusAreas, 'FocusAreaId');
            const deletedFAIds = _.difference(groupFAIds, groupNewFAIds);

            deletedFAIds.map(function (focusAreaId) {
                delete stateObj[focusAreaId];
                return;
            });
            focusAreas.map(function (focusArea) {
                stateObj[focusArea.FocusAreaId] = focusArea;
                return;
            });
        }
    }

    return update(state, { focusAreas: { $set: stateObj } });
    // return update({
    //     ...state, focusAreas: stateObj
    // })
}

const updateFunctionalTitle = (state, data) => {
    let functionalTitlesData = Object.assign([], state.functionalTitles);

    if (data[0] && data[0].length > 0) {
        const newData = data[0];
        if (newData && newData.length > 0) {
            const updatedFunctionalTitle = newData[0].FunctionalTitle;

            functionalTitlesData = updater.updateFunctionalTitleData(functionalTitlesData, updatedFunctionalTitle);
            return update(state, { functionalTitles: { $set: functionalTitlesData } });
        }
    }
    if (data[1] && data[1].length > 0) {
        const deletedData = data[1];
        if (deletedData && deletedData.length > 0) {
            const deletedFunctionalTitleId = deletedData[0];

            functionalTitlesData = updater.deleteFunctionalTitleData(functionalTitlesData, deletedFunctionalTitleId);
            return update(state, { functionalTitles: { $set: functionalTitlesData } });
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
    let newState = [];

    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        const relevantEntityTypes = ['FocusArea', 'Group', 'SalaryRange', 'FunctionalTitle'];
        _.forEach(payloadData, (payloadDataItem) => {
            const relevantPushData = _.filter(payloadDataItem.Data, function (o) { return relevantEntityTypes.indexOf(o.EntityType) > -1; });
            _.forEach(relevantPushData, (item) => {
                const entityType = item ? item.EntityType : '';
                const pushedGroupId = item ? item.EntityId : '';
                newData = getEntityPayload(item, entityType);
                switch (entityType) {
                    case 'FocusArea':
                        newState = Object.assign([], updateFocusAreaEntities(newStateObject, newData, pushedGroupId));
                        newStateObject = Object.assign([], newState);
                        isPushRelevantChange = true;
                        break;
                    case 'Group':
                        newState = Object.assign([], updateGroupEntities(newStateObject, newData));
                        newStateObject = Object.assign([], newState);
                        isPushRelevantChange = true;
                        break;
                    case 'SalaryRange':
                        newState = Object.assign({}, updateSalaryRangeEntities(newStateObject, newData));
                        newStateObject = Object.assign({}, newState);
                        isPushRelevantChange = true;
                        break;
                    case 'FunctionalTitle':
                        newStateObject = Object.assign([], updateFunctionalTitle(newStateObject, newData));
                        isPushRelevantChange = true;
                        break;
                }
            });
        });
        // _.forEach(payloadData, (item) => {
        //     const entityType = item.Data && item.Data.length > 0 ? item.Data[0].EntityType : '';
        //     const pushedGroupId = item.Data && item.Data.length > 0 ? item.Data[0].EntityId : '';

        //     newData = getEntityPayload(item.Data, entityType);
        //     switch (entityType) {
        //         case 'FocusArea':
        //             newState = Object.assign([], updateFocusAreaEntities(newStateObject, newData, pushedGroupId));
        //             newStateObject = Object.assign([], newState);
        //             isPushRelevantChange = true;
        //             break;
        //         case 'Group':
        //             newState = Object.assign([], updateGroupEntities(newStateObject, newData));
        //             newStateObject = Object.assign([], newState);
        //             isPushRelevantChange = true;
        //             break;
        //         case 'SalaryRange':
        //             newState = Object.assign({}, updateSalaryRangeEntities(newStateObject, newData));
        //             newStateObject = Object.assign({}, newState);
        //             isPushRelevantChange = true;
        //             break;
        //         case 'FunctionalTitle':
        //             newState = Object.assign([], updateFunctionalTitle(newStateObject, newData));
        //             newStateObject = Object.assign([], newState);
        //             isPushRelevantChange = true;
        //             break;
        //     }
        // });
        if (isPushRelevantChange) {
            return { ...newStateObject, newState };
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

const masterDataReducer = (state = [], action, entireState) => {
    if (action.type === actionTypes.GET_MASTERDATA) {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        switch (action.type) {
            case actionTypes.PROJECT_CHANGE:
                return update(state, { $set: masterData });

            case actionTypes.GET_MASTERDATA:
                //const configList = prepareObjectFromArray(action.payload.data.ConfigList.List, ["Key"]);
                // return update(state,
                //     {groups : {$set: prepareObjectFromArray(action.payload.data.GroupList.List, ["GroupId"])}},
                //     {teams : {$set: prepareObjectFromArray(action.payload.data.TeamList.List, ["TeamId"])}},
                //     {focusAreas : {$set: prepareObjectFromArray(action.payload.data.FocusAreaList.List, ["FocusAreaId"])}},
                //     {crossGroupTopics : {$set: prepareObjectFromArray(action.payload.data.CrossGroupTopicList.List, ["CrossGroupTopicId"])}},
                //     {users : {$set: prepareObjectFromArray(action.payload.data.UserList.List, ["UserId"])}},
                //     {leaderShip : {$set: prepareObjectFromArray(action.payload.data.LeadershipList.List, ["GroupId", "UserId"])}},
                //     {salaryRange : {$set: prepareObjectFromArray(action.payload.data.SalaryRangeList.List, ["SalaryRangeId"])}},
                //     {config: {$set:configList}},
                //     {timings : {$set: getYearMonthBetweenDates(configList)}},
                //     {fiscalTimings : {$set: getFiscalYearMonthBetweenDates(configList)}},
                //     {category : {$set: action.payload.data.CategoryList.List}},
                //     {customFields : {$set: action.payload.data.CustomFieldList.List}},
                //     {isLoading : {$set: false}}
                // );
                let data = {};
                let parsedData = action.payload.data;
                let leadershiplist = _.uniqBy(_.orderBy(parsedData.LeadershipList.List, ['GroupId', 'UserId', 'LeadershipType'], ['asc', 'asc', 'asc']), (item) => [item.GroupId, item.UserId].join());

                //data.projects = prepareObjectFromArray(parsedData.ProjectList.List, ["ProjectId"]);
                data.groups = prepareObjectFromArray(parsedData.GroupList.List, ["GroupId"]);
                data.teams = prepareObjectFromArray(parsedData.TeamList.List, ["TeamId"]);
                data.focusAreas = prepareObjectFromArray(parsedData.FocusAreaList.List, ["FocusAreaId"]);
                data.crossGroupTopics = prepareObjectFromArray(parsedData.CrossGroupTopicList.List, ["CrossGroupTopicId"]);
                //data.functionalTitles = prepareObjectFromArray(parsedData.FunctionalTitleList.List, ["Id"]);
                data.users = prepareObjectFromArray(parsedData.UserList.List, ["UserId"]);
                data.leaderShip = prepareObjectFromArray(leadershiplist, ["GroupId", "UserId"]);
                data.leaderShipArray = parsedData.LeadershipList.List;
                data.salaryRange = prepareObjectFromArray(parsedData.SalaryRangeList.List, ["SalaryRangeId"]);
                let projectConfigList = prepareObjectFromArray(parsedData.ProjectConfigList.List, ["Key"]);
                data.projectConfig = projectConfigList;
                let configList = prepareObjectFromArray(parsedData.ConfigList.List, ["Key"]);
                data.config = configList;
                data.timings = getYearMonthBetweenDates(configList, projectConfigList);
                data.fiscalTimings = getFiscalYearMonthBetweenDates(configList, projectConfigList);
                data.category = parsedData.CategoryList.List;
                data.customFields = parsedData.CustomFieldList.List;
                data.roles = parsedData.RoleList.List;
                data.sessions = parsedData.SessionList.List ? parsedData.SessionList.List : [];
                data.userNoteTimestamp = parsedData.UserNoteTimestamp;
                data.isLoading = false;
                data.snapshotTime = parsedData.SnapshotTimeStamp;
                data.IsSnapshotInstance = parsedData.IsSnapshotInstance;
                data.focusAreaUsageCount = 0;
                data.isLoadingFocusAreaUsageCount = false;
                //data.filterType = 1;        
                data.functionalTitles = [];
                return data;

            case actionTypes.PUSH_DATA:
                if (!action.payload) return state;
                return updatePushData(state, action, entireState);

            case actionTypes.SAVE_CUSTOMFIELD:
                if (action.payload.data === null) return state;
                let stateObj = Object.assign([], state.customFields);
                const newCustomField = action.payload.data;
                const index = _.findIndex(stateObj, { 'GroupId': newCustomField.GroupId, 'FieldNumber': newCustomField.FieldNumber });
                if (index !== -1) {
                    stateObj[index] = newCustomField;
                } else {
                    stateObj.push(newCustomField);
                }
                return { ...state, customFields: stateObj };

            case actionTypes.DELETE_CUSTOMFIELD:
                if (action.payload.data === null) return state;
                const deletedCustomField = action.payload.data;
                let customFields = Object.assign([], state.customFields);
                const itemIndex = _.findIndex(customFields, { 'GroupId': deletedCustomField.GroupId, 'FieldNumber': deletedCustomField.FieldNumber });
                if (itemIndex !== -1) {
                    customFields.splice(itemIndex, 1);
                }
                return { ...state, customFields: customFields };

            case actionTypes.GET_FOCUSAREA_USAGECOUNT:
                if (action.payload.data === null) return state;
                return update(state, { isLoadingFocusAreaUsageCount: { $set: true }, focusAreaUsageCount: { $set: action.payload.data } });
            case actionTypes.RESET_FOCUSAREA_USAGECOUNT:
                return update(state, { isLoadingFocusAreaUsageCount: { $set: false }, focusAreaUsageCount: { $set: 0 } });

            case actionTypes.SAVE_GROUP_CATEGORY_GLDOLLAR:
                if (action.payload.data === null) return state;
                let categoryGLStateObj = Object.assign([], state.category);
                const categoryData = action.payload.data;
                const categoryIndex = _.findIndex(categoryGLStateObj, { 'GroupCategoryGLDollarId': categoryData.GroupCategoryGLDollarId });
                if (categoryIndex !== -1) {
                    categoryGLStateObj = update(categoryGLStateObj, {
                        [categoryIndex]: {
                            Category: { $set: categoryData.Category },
                            GLDollar: { $set: categoryData.GLDollar }
                        }
                    });
                } else {
                    categoryGLStateObj = update(categoryGLStateObj, {
                        $splice: [[0, 0, {
                            GroupCategoryGLDollarId: categoryData.GroupCategoryGLDollarId, GroupId: categoryData.GroupId,
                            Category: categoryData.Category, CategoryType: categoryData.CategoryType,
                            GLDollar: categoryData.GLDollar, ProjectId: categoryData.ProjectId, IsWorkingCapital: categoryData.IsWorkingCapital
                        }]]
                    });
                }
                return update(state, { category: { $set: categoryGLStateObj } });

            case actionTypes.DELETE_GROUP_CATEGORY_GLDOLLAR:
                if (action.payload.data === null) return state;
                let deletedCategoryGLStateObj = Object.assign([], state.category);
                const deletedCategoryData = action.payload.data;
                const deletedCategoryIndex = _.findIndex(deletedCategoryGLStateObj, { 'GroupCategoryGLDollarId': deletedCategoryData.GroupCategoryGLDollarId });
                if (deletedCategoryIndex > -1) {
                    deletedCategoryGLStateObj = update(deletedCategoryGLStateObj, { $splice: [[deletedCategoryIndex, 1]] });
                }
                return update(state, { category: { $set: deletedCategoryGLStateObj } });

            case actionTypes.UPDATE_CATEGORY:
                if (action.payload.data === null) return state;

                let updatedCategoryGLObj = Object.assign([], state.category);
                const updatedCategory = action.payload.data;

                _.map(updatedCategoryGLObj, (rowData, index) => {
                    if (rowData.Category === updatedCategory.Category && rowData.CategoryType === updatedCategory.GLType) {
                        updatedCategoryGLObj = update(updatedCategoryGLObj, { [index]: { Category: { $set: updatedCategory.NewCategory } } });
                    }
                    return;
                });
                return update(state, { category: { $set: updatedCategoryGLObj } });

            case actionTypes.DELETE_CATEGORY:
                if (action.payload.data === null) return state;

                let deletedCategoriesGLObj = Object.assign([], state.category);
                const deletedCategory = action.payload.data;

                if (deletedCategory && deletedCategory.DeletedCategories && deletedCategory.DeletedCategories.length > 0) {
                    _.map(deletedCategory.DeletedCategories.split(','), (category_type) => {
                        const categoryData = category_type.split('-');
                        const category = categoryData[0];
                        const categoryType = categoryData[1];
                        const deletedCategoryGLIndex = _.findIndex(deletedCategoriesGLObj, { 'Category': category, 'CategoryType': categoryType });
                        if (deletedCategoryGLIndex > -1) {
                            deletedCategoriesGLObj = update(deletedCategoriesGLObj, { $splice: [[deletedCategoryGLIndex, 1]] });
                        }
                    });
                    return update(state, { category: { $set: deletedCategoriesGLObj } });
                } else {
                    return state;
                }
            case actionTypes.GET_FUNCTIONAL_TITLES:
                if (action.payload.data === null) return state;
                return update(state, { functionalTitles: { $set: action.payload.data.FunctionalTitles } });
            default:
                return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === actionTypes.GET_MASTERDATA) {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
}

export default masterDataReducer;
