import * as actionTypes from '../../actions/actionTypes';
import _ from 'lodash';
import update from 'immutability-helper';
import {adminData} from '../../store/configureStoreData';
import * as adminUpdater from './adminUpdater';

const updateCostCenterMappedCount = (countChangeCostCenterObj, type, sourceObject, center) => {
    //Update cost center mapping count
    if (type === 'Personnel') {
        const costCenterIndex = _.findIndex(countChangeCostCenterObj, { 'Center': center });
        if (costCenterIndex !== -1) {
            const mappedPersonnelCount = _.filter(sourceObject, { 'CostCenter': center }).length;
            countChangeCostCenterObj = update(countChangeCostCenterObj, { [costCenterIndex]: { MappedPersonnelCount: { $set: mappedPersonnelCount } } });
        }
    } else if (type === 'CenterData') {
        const costCenterIndex = _.findIndex(countChangeCostCenterObj, { 'Center': center });
        if (costCenterIndex !== -1) {
            const mappedGLNumberCount = _.filter(sourceObject, { 'Center': center }).length;
            countChangeCostCenterObj = update(countChangeCostCenterObj, { [costCenterIndex]: { MappedGLNumberCount: { $set: mappedGLNumberCount } } });
        }
    }
    return countChangeCostCenterObj;
};

const updateCategoryMappedGLNumberCount = (countChangeCategoryObj, updatedCategoryMapObj, updatedCategoryMap) => {
    if (updatedCategoryMap.Category) {
        const oldMappedGLNumberCount = _.filter(updatedCategoryMapObj, { 'Category': updatedCategoryMap.Category, 'GLType': updatedCategoryMap.GLType }).length;
        //Update old category mapping count
        const oldCategoryIndex = _.findIndex(countChangeCategoryObj, { 'Category': updatedCategoryMap.Category, 'GLType': updatedCategoryMap.GLType });
        if (oldCategoryIndex !== -1) {
            countChangeCategoryObj = update(countChangeCategoryObj, { [oldCategoryIndex]: { MappedGLNumberCount: { $set: oldMappedGLNumberCount } } });
        }
    }
    if (updatedCategoryMap.NewCategory) {
        //Update new category mapping count
        const newMappedGLNumberCount = _.filter(updatedCategoryMapObj, { 'Category': updatedCategoryMap.NewCategory, 'GLType': updatedCategoryMap.GLType }).length;
        const newCategoryIndex = _.findIndex(countChangeCategoryObj, { 'Category': updatedCategoryMap.NewCategory, 'GLType': updatedCategoryMap.GLType });
        if (newCategoryIndex !== -1) {
            countChangeCategoryObj = update(countChangeCategoryObj, { [newCategoryIndex]: { MappedGLNumberCount: { $set: newMappedGLNumberCount } } });
        }
    }
    return countChangeCategoryObj;
};

const adminReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
            return update(state, { $set: adminData });

        case actionTypes.GET_GROUPS:
            if (action.payload.data) {
                return { ...state, groups: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_GROUP_HISTORY:
            if (action.payload.data) {
                return { ...state, groupHistory: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.CLEAR_GROUP_HISTORY:
            return { ...state, groupHistory: [] };

        case actionTypes.GET_COMPRANGES:
            if (action.payload.data) {
                return { ...state, compRanges: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_SALARY_RANGES:
            if (action.payload.data) {
                var data = JSON.parse(action.payload.config.data).salaryRanges.salaryRangeList;
                return { ...state, compRanges: data }
            } else {
                return state;
            }

        // case actionTypes.PUSH_DATA:
        //     //console.log('PUSH_DATA admin:', action.payload);

        //     return state;

        case actionTypes.GET_PROJECT_DEFINED_FIELDS:
            if (action.payload.data) {
                return { ...state, projectDefinedFields: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_ROLES:
            if (action.payload.data) {
                return { ...state, roles: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_ROLE_PERMISSIONS:
            if (action.payload.data) {
                return { ...state, rolePermissions: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_CLIENT_SETTINGS:
            if (action.payload.data) {
                return { ...state, clientSettings: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_PROJECT_VALUE_REPORT:
            if (action.payload.data) {
                return { ...state, projectValueReport: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.GET_BASELINE_DATA:
            if (action.payload.data) {
                const payloadData = action.payload.data;
                const baselineData = Object.assign({}, state.baselineData);
                baselineData.isLoading = false;
                switch (payloadData.FileNumber) {
                    case 2:
                        baselineData.CenterMap = payloadData.CenterMap;
                        break;
                    case 3:
                        baselineData.CategoryMap = payloadData.CategoryMap;
                        baselineData.Categories = payloadData.Categories;
                        break;
                    case 4:
                        baselineData.FinanceData = payloadData.FinanceData;
                        baselineData.CategoryMap = payloadData.CategoryMap;
                        baselineData.CenterMap = payloadData.CenterMap;
                        break;
                    case 5:
                        baselineData.HrData = payloadData.HrData;
                        baselineData.CenterMap = payloadData.CenterMap;
                        baselineData.OrgUsers = payloadData.OrgUsers;
                        break;
                }
                return { ...state, baselineData: baselineData }
            } else {
                return state;
            }
        case actionTypes.CLEAR_BASELINE_DATA:
            if (action.payload.data) {
                return { ...state, baselineData: { isLoading: true, CenterMap: [], CategoryMap: [], FinanceData: [], HrData: [], OrgUsers: [] } }
            } else {
                return state;
            }
        case actionTypes.GET_BASELINE_UPLOAD_HISTORY:
            if (action.payload.data) {
                return { ...state, baselineUploadHistory: action.payload.data }
            } else {
                return state;
            }
        case actionTypes.CLEAR_BASELINE_UPLOAD_HISTORY:
            return { ...state, baselineUploadHistory: [] };

        case actionTypes.UPDATE_COST_CENTER:
            if (action.payload.data === null) return state;
            const updatedCenter = action.payload.data;

            const baselineDataObj = Object.assign([], state.baselineData);
            const updatedBaselineDataObj = adminUpdater.updateCenterMap(baselineDataObj, updatedCenter);

            let centerStateObj = updatedBaselineDataObj.centerStateObj;
            let hrDataStateObj = updatedBaselineDataObj.hrDataStateObj;
            let financeDataStateObj = updatedBaselineDataObj.financeDataStateObj;

            return update(state, {
                baselineData:
                {
                    CenterMap: { $set: centerStateObj }, HrData: { $set: hrDataStateObj }, FinanceData: { $set: financeDataStateObj }
                }
            });

        case actionTypes.CREATE_COST_CENTER:
            if (action.payload.data === null) return state;

            let newStateObj = Object.assign([], state.baselineData.CenterMap);
            const createdCenter = action.payload.data;
            const tempIndex = _.findIndex(newStateObj, { 'Center': createdCenter.NewCenter });
            if (tempIndex === -1) {
                newStateObj = update(newStateObj, {
                    $splice: [[0, 0, {
                        GroupId: createdCenter.GroupId, Team: createdCenter.Team, CenterType: createdCenter.CenterType,
                        Center: createdCenter.NewCenter, Exclude: createdCenter.Exclude, MappedPersonnelCount: 0
                    }]]
                });
                return update(state, { baselineData: { CenterMap: { $set: newStateObj } } });
            } else
                return state;
        case actionTypes.DELETE_COST_CENTER:
            if (action.payload.data === null) return state;
            let centerMapStateObj = Object.assign([], state.baselineData.CenterMap);
            const deletedCenterMap = action.payload.data;

            if (deletedCenterMap && deletedCenterMap.DeletedCenters && deletedCenterMap.DeletedCenters.length > 0) {
                _.map(deletedCenterMap.DeletedCenters.split(','), (center) => {
                    const deletedCenterIndex = _.findIndex(centerMapStateObj, { 'Center': center });
                    if (deletedCenterIndex > -1) {
                        centerMapStateObj = update(centerMapStateObj, { $splice: [[deletedCenterIndex, 1]] });
                    }
                });
                return update(state, { baselineData: { CenterMap: { $set: centerMapStateObj } } });
            } else {
                return state;
            }
        case actionTypes.UPDATE_FINANCE_DATA:
            if (action.payload.data === null) return state;

            let stateFdObj = Object.assign([], state.baselineData.FinanceData);
            let updateFdCenterObj = Object.assign([], state.baselineData.CenterMap);

            const updatedFd = action.payload.data;
            const updatedFdIndex = _.findIndex(stateFdObj, { 'CenterDataId': updatedFd.CenterDataId });
            if (updatedFdIndex !== -1) {
                switch (updatedFd.EventType) {
                    case 'Center':
                        let oldCostCenter = '';
                        const filteredFd = _.filter(stateFdObj, { 'CenterDataId': updatedFd.CenterDataId });
                        stateFdObj = update(stateFdObj, { [updatedFdIndex]: { Center: { $set: updatedFd.Center } } });

                        //Update old cost center mapping count
                        if (filteredFd && filteredFd.length > 0) {
                            oldCostCenter = filteredFd[0].Center;
                            updateFdCenterObj = updateCostCenterMappedCount(updateFdCenterObj, 'CenterData', stateFdObj, oldCostCenter);
                        }
                        //Update new cost center mapping count
                        updateFdCenterObj = updateCostCenterMappedCount(updateFdCenterObj, 'CenterData', stateFdObj, updatedFd.Center);
                        break;
                    case 'GLNumber':
                        stateFdObj = update(stateFdObj, { [updatedFdIndex]: { GLNumber: { $set: updatedFd.GLNumber } } });
                        break;
                    case 'GLAmount':
                        stateFdObj = update(stateFdObj, { [updatedFdIndex]: { GLAmount: { $set: updatedFd.GLAmount } } });
                        break;
                    case 'Period':
                        stateFdObj = update(stateFdObj, { [updatedFdIndex]: { Period: { $set: updatedFd.Period } } });
                        break;
                    case 'Exclude':
                        stateFdObj = update(stateFdObj, { [updatedFdIndex]: { Exclude: { $set: updatedFd.Exclude } } });
                        break;
                }
            }
            return update(state, { baselineData: { FinanceData: { $set: stateFdObj }, CenterMap: { $set: updateFdCenterObj } } });
        case actionTypes.CREATE_FINANCE_DATA:
            if (action.payload.data === null) return state;

            let newFdStateObj = Object.assign([], state.baselineData.FinanceData);
            let newFdStateCenterObj = Object.assign([], state.baselineData.CenterMap);

            const createdFd = action.payload.data;
            const tempFdIndex = _.findIndex(newFdStateObj, { 'CenterDataId': createdFd.CenterDataId });
            if (tempFdIndex === -1) {
                newFdStateObj = update(newFdStateObj, {
                    $splice: [[0, 0, {
                        CenterDataId: createdFd.CenterDataId, Center: createdFd.Center, GLNumber: createdFd.GLNumber,
                        GLAmount: createdFd.GLAmount, Period: createdFd.Period, Exclude: createdFd.Exclude
                    }]]
                });
                //Update cost center mapping count
                newFdStateCenterObj = updateCostCenterMappedCount(newFdStateCenterObj, 'CenterData', newFdStateObj, createdFd.Center);
                return update(state, { baselineData: { FinanceData: { $set: newFdStateObj }, CenterMap: { $set: newFdStateCenterObj } } });
            } else
                return state;
        case actionTypes.DELETE_FINANCE_DATA:
            if (action.payload.data === null) return state;
            let deletedFdStateObj = Object.assign([], state.baselineData.FinanceData);
            let deletedFdStateCenterObj = Object.assign([], state.baselineData.CenterMap);
            const deletedFd = action.payload.data;

            if (deletedFd && deletedFd.DeletedCenterDataIds && deletedFd.DeletedCenterDataIds.length > 0) {
                _.map(deletedFd.DeletedCenterDataIds.split(','), (centerDataId) => {
                    const deletedFdIndex = _.findIndex(deletedFdStateObj, { 'CenterDataId': centerDataId });
                    if (deletedFdIndex > -1) {
                        const deletedFdItem = _.filter(deletedFdStateObj, { 'CenterDataId': centerDataId });
                        const deletedFdItemCenter = deletedFdItem && deletedFdItem.length > 0 ? deletedFdItem[0].Center : '';
                        deletedFdStateObj = update(deletedFdStateObj, { $splice: [[deletedFdIndex, 1]] });
                        //Update cost center mapping count
                        deletedFdStateCenterObj = updateCostCenterMappedCount(deletedFdStateCenterObj, 'CenterData', deletedFdStateObj, deletedFdItemCenter);
                    }
                });
                return update(state, { baselineData: { FinanceData: { $set: deletedFdStateObj }, CenterMap: { $set: deletedFdStateCenterObj } } });
            } else {
                return state;
            }
        case actionTypes.UPDATE_PERSONNEL:
            if (action.payload.data === null) return state;

            let updatedHrDataStateObj = Object.assign([], state.baselineData.HrData);
            let costCentersData = Object.assign([], state.baselineData.CenterMap);


            const updatedPersonnel = action.payload.data;
            const updatedPersonnelIndex = _.findIndex(updatedHrDataStateObj, { 'PersonnelId': updatedPersonnel.PersonnelId });
            if (updatedPersonnelIndex !== -1) {
                switch (updatedPersonnel.EventType) {
                    case 'PositionId': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { PositionId: { $set: updatedPersonnel.PositionId } } });
                        break;
                    case 'FirstName': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { FirstName: { $set: updatedPersonnel.FirstName } } });
                        break;
                    case 'LastName': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { LastName: { $set: updatedPersonnel.LastName } } });
                        break;
                    case 'EmployeeId': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { EmployeeId: { $set: updatedPersonnel.EmployeeId } } });
                        break;
                    case 'ManagerPositionId': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { ManagerPositionId: { $set: updatedPersonnel.ManagerPositionId } } });
                        break;
                    case 'CostCenter':
                        let oldCostCenter = '';
                        let newCostCenter = updatedPersonnel.CostCenter;
                        const filteredPersonnel = _.filter(updatedHrDataStateObj, { 'PersonnelId': updatedPersonnel.PersonnelId });

                        updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { CostCenter: { $set: newCostCenter }, GroupId: { $set: updatedPersonnel.GroupId } } });

                        //Update old cost center mapping count
                        if (filteredPersonnel && filteredPersonnel.length > 0) {
                            oldCostCenter = filteredPersonnel[0].CostCenter;
                            costCentersData = updateCostCenterMappedCount(costCentersData, 'Personnel', updatedHrDataStateObj, oldCostCenter);
                        }
                        //Update new cost center mapping count
                        costCentersData = updateCostCenterMappedCount(costCentersData, 'Personnel', updatedHrDataStateObj, newCostCenter);
                        break;
                    case 'JobTitle': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { JobTitle: { $set: updatedPersonnel.JobTitle } } });
                        break;
                    case 'PayType': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { PayType: { $set: updatedPersonnel.PayType } } });
                        break;
                    case 'FTE': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { FTE: { $set: updatedPersonnel.FTE } } });
                        break;
                    case 'Exempt': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { Exempt: { $set: updatedPersonnel.Exempt } } });
                        break;
                    case 'EmpUnion': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { EmpUnion: { $set: updatedPersonnel.EmpUnion } } });
                        break;
                    case 'OpenPosition': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { IsOpen: { $set: updatedPersonnel.IsOpen } } });
                        break;
                    case 'WorkLocation': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { WorkLocation: { $set: updatedPersonnel.WorkLocation } } });
                        break;
                    case 'DivisionId': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { DivisionId: { $set: updatedPersonnel.DivisionId } } });
                        break;
                    case 'OtherId1': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { OtherId1: { $set: updatedPersonnel.OtherId1 } } });
                        break;
                    case 'OtherId2': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { OtherId2: { $set: updatedPersonnel.OtherId2 } } });
                        break;
                    case 'Email': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { Email: { $set: updatedPersonnel.Email } } });
                        break;
                    case 'City': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { City: { $set: updatedPersonnel.City } } });
                        break;
                    case 'StateRegion': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { StateRegion: { $set: updatedPersonnel.StateRegion } } });
                        break;
                    case 'Country': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { Country: { $set: updatedPersonnel.Country } } });
                        break;
                    case 'ServiceDate': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { ServiceDate: { $set: updatedPersonnel.ServiceDate } } });
                        break;
                    case 'Exclude': updatedHrDataStateObj = update(updatedHrDataStateObj, { [updatedPersonnelIndex]: { Exclude: { $set: updatedPersonnel.Exclude } } });
                        break;
                }
            }
            return update(state, { baselineData: { HrData: { $set: updatedHrDataStateObj }, CenterMap: { $set: costCentersData } } });
        case actionTypes.CREATE_PERSONNEL:
            if (action.payload.data === null) return state;

            let newStateHrDataObj = Object.assign([], state.baselineData.HrData);
            let costCentersDataOnNewHRData = Object.assign([], state.baselineData.CenterMap);
            let orgUsersDataObj = Object.assign([], state.baselineData.OrgUsers);

            const createdPersonnel = action.payload.data;
            const tempCreatedIndex = _.findIndex(newStateHrDataObj, { 'PersonnelId': createdPersonnel.PersonnelId });
            if (tempCreatedIndex === -1) {
                newStateHrDataObj = update(newStateHrDataObj, {
                    $splice: [[0, 0, {
                        PersonnelId: createdPersonnel.PersonnelId, PositionId: createdPersonnel.PositionId,
                        LastName: createdPersonnel.LastName, FirstName: createdPersonnel.FirstName,
                        CostCenter: createdPersonnel.CostCenter, GroupId: createdPersonnel.GroupId,
                        FTE: createdPersonnel.FTE, Exclude: createdPersonnel.Exclude,
                        JobTitle: createdPersonnel.JobTitle, Email: createdPersonnel.Email, IsOpen: createdPersonnel.IsOpen
                    }]]
                });
                //Update cost center mapping count
                costCentersDataOnNewHRData = updateCostCenterMappedCount(costCentersDataOnNewHRData, 'Personnel', newStateHrDataObj, createdPersonnel.CostCenter);
                //Update added user IsExistsPersonnel in org users list
                const updatedUserIndex = _.findIndex(orgUsersDataObj, { 'Email': createdPersonnel.Email });
                if (updatedUserIndex !== -1) {
                    orgUsersDataObj = update(orgUsersDataObj, { [updatedUserIndex]: { IsExistsPersonnel: { $set: true } } });
                }
                return update(state, { baselineData: { HrData: { $set: newStateHrDataObj }, CenterMap: { $set: costCentersDataOnNewHRData }, OrgUsers: { $set: orgUsersDataObj } } });
            } else
                return state;
        case actionTypes.DELETE_PERSONNEL:
            if (action.payload.data === null) return state;
            let personnelStateObj = Object.assign([], state.baselineData.HrData);
            let costCentersDataOnDeletedHRData = Object.assign([], state.baselineData.CenterMap);
            let orgUsersDataDeletedPersonnel = Object.assign([], state.baselineData.OrgUsers);

            const deletedPersonnels = action.payload.data;

            if (deletedPersonnels && deletedPersonnels.DeletedPersonnelIds && deletedPersonnels.DeletedPersonnelIds.length > 0) {
                _.map(deletedPersonnels.DeletedPersonnelIds.split(','), (personnelId) => {
                    const deletedPersonnelIndex = _.findIndex(personnelStateObj, { 'PersonnelId': personnelId });
                    if (deletedPersonnelIndex > -1) {
                        const deletedPersonnelItem = _.filter(personnelStateObj, { 'PersonnelId': personnelId });
                        const deletedPersonnelItemCostCenter = deletedPersonnelItem && deletedPersonnelItem.length > 0 ? deletedPersonnelItem[0].CostCenter : '';
                        personnelStateObj = update(personnelStateObj, { $splice: [[deletedPersonnelIndex, 1]] });
                        //Update cost center mapping count
                        costCentersDataOnDeletedHRData = updateCostCenterMappedCount(costCentersDataOnDeletedHRData, 'Personnel', personnelStateObj, deletedPersonnelItemCostCenter);
                        //Update added user IsExistsPersonnel in org users list
                        const deletedPersonnelEmail = deletedPersonnelItem && deletedPersonnelItem.length > 0 ? deletedPersonnelItem[0].Email : '';
                        const updatedUserIndex = _.findIndex(orgUsersDataDeletedPersonnel, { 'Email': deletedPersonnelEmail });
                        if (updatedUserIndex !== -1) {
                            orgUsersDataDeletedPersonnel = update(orgUsersDataDeletedPersonnel, { [updatedUserIndex]: { IsExistsPersonnel: { $set: false } } });
                        }
                    }
                });
                return update(state, { baselineData: { HrData: { $set: personnelStateObj }, CenterMap: { $set: costCentersDataOnDeletedHRData }, OrgUsers: { $set: orgUsersDataDeletedPersonnel } } });
            } else {
                return state;
            }
        case actionTypes.UPDATE_CATEGORY:
            if (action.payload.data === null) return state;

            let categoryObj = Object.assign([], state.baselineData.Categories);
            let categoryMapObj = Object.assign([], state.baselineData.CategoryMap);

            const updatedCategory = action.payload.data;
            const updatedCategoryIndex = _.findIndex(categoryObj, { 'Category': updatedCategory.Category, 'GLType': updatedCategory.GLType });

            if (updatedCategoryIndex !== -1) {
                switch (updatedCategory.EventType) {
                    case 'Category':
                        categoryObj = update(categoryObj, { [updatedCategoryIndex]: { Category: { $set: updatedCategory.NewCategory } } });
                        break;
                    case 'IsWorkingCapital':
                        categoryObj = update(categoryObj, { [updatedCategoryIndex]: { IsWorkingCapital: { $set: updatedCategory.IsWorkingCapital } } });
                        break;
                    case 'Exclude':
                        categoryObj = update(categoryObj, { [updatedCategoryIndex]: { Exclude: { $set: updatedCategory.Exclude } } });
                        break;
                }
            }
            //Update category map data
            _.map(categoryMapObj, (categoryMap, index) => {
                if (categoryMap.Category === updatedCategory.Category && categoryMap.GLType === updatedCategory.GLType) {
                    switch (updatedCategory.EventType) {
                        case 'Category':
                            categoryMapObj = update(categoryMapObj, { [index]: { Category: { $set: updatedCategory.NewCategory } } });
                            break;
                        case 'IsWorkingCapital':
                            categoryMapObj = update(categoryMapObj, { [index]: { IsWorkingCapital: { $set: updatedCategory.IsWorkingCapital } } });
                            break;
                        case 'Exclude':
                            categoryMapObj = update(categoryMapObj, { [index]: { Exclude: { $set: updatedCategory.Exclude } } });
                            break;
                    }
                }
                return;
            });
            return update(state, { baselineData: { Categories: { $set: categoryObj }, CategoryMap: { $set: categoryMapObj } } });
        case actionTypes.CREATE_CATEGORY:
            if (action.payload.data === null) return state;

            let newStateCategoryObj = Object.assign([], state.baselineData.Categories);
            const createdCategory = action.payload.data;
            const createdCategoryIndex = _.findIndex(newStateCategoryObj, { 'Category': createdCategory.NewCategory, 'GLType': createdCategory.GLType });
            if (createdCategoryIndex === -1) {
                newStateCategoryObj = update(newStateCategoryObj, {
                    $splice: [[0, 0, {
                        Category: createdCategory.NewCategory, GLType: createdCategory.GLType,
                        IsWorkingCapital: createdCategory.IsWorkingCapital,
                        Exclude: createdCategory.Exclude, MappedGLNumberCount: 0
                    }]]
                });
                return update(state, { baselineData: { Categories: { $set: newStateCategoryObj } } });
            } else
                return state;
        case actionTypes.DELETE_CATEGORY:
            if (action.payload.data === null) return state;
            let deletedCategoriesObj = Object.assign([], state.baselineData.Categories);
            const deletedCategory = action.payload.data;

            if (deletedCategory && deletedCategory.DeletedCategories && deletedCategory.DeletedCategories.length > 0) {
                _.map(deletedCategory.DeletedCategories.split(','), (category_type) => {
                    const categoryData = category_type.split('-');
                    const category = categoryData[0];
                    const categoryType = categoryData[1];
                    const deletedCategoryIndex = _.findIndex(deletedCategoriesObj, { 'Category': category, 'GLType': categoryType });
                    if (deletedCategoryIndex > -1) {
                        deletedCategoriesObj = update(deletedCategoriesObj, { $splice: [[deletedCategoryIndex, 1]] });
                    }
                });
                return update(state, { baselineData: { Categories: { $set: deletedCategoriesObj } } });
            } else {
                return state;
            }
        case actionTypes.UPDATE_CATEGORY_MAP:
            if (action.payload.data === null) return state;

            let updateCountChangeCategoryObj = Object.assign([], state.baselineData.Categories);
            let updatedCategoryMapObj = Object.assign([], state.baselineData.CategoryMap);

            const updatedCategoryMap = action.payload.data;
            const updatedCategoryMapIndex = _.findIndex(updatedCategoryMapObj, { 'Category': updatedCategoryMap.Category, 'GLNumber': updatedCategoryMap.GLNumber });

            if (updatedCategoryMapIndex !== -1) {
                switch (updatedCategoryMap.EventType) {
                    case 'Category':
                        updatedCategoryMapObj = update(updatedCategoryMapObj, { [updatedCategoryMapIndex]: { Category: { $set: updatedCategoryMap.NewCategory } } });
                        updateCountChangeCategoryObj = updateCategoryMappedGLNumberCount(updateCountChangeCategoryObj, updatedCategoryMapObj, updatedCategoryMap);
                        break;
                    case 'GLNumber':
                        updatedCategoryMapObj = update(updatedCategoryMapObj, { [updatedCategoryMapIndex]: { GLNumber: { $set: updatedCategoryMap.NewGLNumber } } });
                        break;
                    case 'Description':
                        updatedCategoryMapObj = update(updatedCategoryMapObj, { [updatedCategoryMapIndex]: { Description: { $set: updatedCategoryMap.Description } } });
                        break;
                    case 'Exclude':
                        updatedCategoryMapObj = update(updatedCategoryMapObj, { [updatedCategoryMapIndex]: { Exclude: { $set: updatedCategoryMap.Exclude } } });
                        break;
                }
            }
            return update(state, {
                baselineData: {
                    Categories: { $set: updateCountChangeCategoryObj },
                    CategoryMap: { $set: updatedCategoryMapObj }
                }
            });
        case actionTypes.CREATE_CATEGORY_MAP:
            if (action.payload.data === null) return state;

            let newStateCategoryMapObj = Object.assign([], state.baselineData.CategoryMap);
            let newCountChangeCategoryObj = Object.assign([], state.baselineData.Categories);

            const createdCategoryMap = action.payload.data;
            const createdCategoryMapIndex = _.findIndex(newStateCategoryMapObj, { 'Category': createdCategoryMap.NewCategory, 'GLNumber': createdCategoryMap.NewGLNumber });
            if (createdCategoryMapIndex === -1) {
                newStateCategoryMapObj = update(newStateCategoryMapObj, {
                    $splice: [[0, 0, {
                        Category: createdCategoryMap.NewCategory, GLNumber: createdCategoryMap.NewGLNumber,
                        GLType: createdCategoryMap.GLType, Description: createdCategoryMap.Description,
                        IsWorkingCapital: createdCategoryMap.IsWorkingCapital,
                        Exclude: createdCategoryMap.Exclude
                    }]]
                });
                return update(state, {
                    baselineData: {
                        Categories: { $set: updateCategoryMappedGLNumberCount(newCountChangeCategoryObj, newStateCategoryMapObj, { 'NewCategory': createdCategoryMap.NewCategory, 'GLType': createdCategoryMap.GLType }) },
                        CategoryMap: { $set: newStateCategoryMapObj }
                    }
                });

            } else
                return state;
        case actionTypes.DELETE_CATEGORY_MAP:
            if (action.payload.data === null) return state;
            let deletedCategoryMapObj = Object.assign([], state.baselineData.CategoryMap);
            let deletedCountChangeCategoryObj = Object.assign([], state.baselineData.Categories);

            const deletedCategoryMap = action.payload.data;

            if (deletedCategoryMap && deletedCategoryMap.DeletedCategoryMapIds && deletedCategoryMap.DeletedCategoryMapIds.length > 0) {
                _.map(deletedCategoryMap.DeletedCategoryMapIds.split(','), (category_glNumber_type) => {
                    const categoryMapData = category_glNumber_type.split('-');
                    const category = categoryMapData[0];
                    const glNumber = categoryMapData[1];
                    const glType = categoryMapData[2];
                    const deletedCategoryMapIndex = _.findIndex(deletedCategoryMapObj, { 'Category': category, 'GLNumber': glNumber });
                    if (deletedCategoryMapIndex > -1) {
                        deletedCategoryMapObj = update(deletedCategoryMapObj, { $splice: [[deletedCategoryMapIndex, 1]] });
                        deletedCountChangeCategoryObj = updateCategoryMappedGLNumberCount(deletedCountChangeCategoryObj, deletedCategoryMapObj, { 'Category': category, 'GLType': glType })
                    }
                });
                return update(state, {
                    baselineData: {
                        Categories: { $set: deletedCountChangeCategoryObj },
                        CategoryMap: { $set: deletedCategoryMapObj }
                    }
                });
            } else {
                return state;
            }
            case actionTypes.GET_PROJECT_CONFIG_HISTORY:
                    if (action.payload.data) {
                        return { ...state, projectConfigHistory: action.payload.data }
                    } else {
                        return state;
                    }
            case actionTypes.CLEAR_PROJECT_CONFIG_HISTORY:
                    return { ...state, projectConfigHistory: [] };
        default:
            return state;
    }
}



export default adminReducer;
