import { getExportDetailsFields, getMomentTimeStamp, getOrganizationId, getCurrentCulture } from '../common/utils';
import i18n from '../i18n';
import * as actionTypes from './actionTypes';
import { getAxios, postAxios } from './axiosActions';
import { showLongNotification } from './index';
import { hideNotification2, showNotification2 } from './notification';

export const getGroups = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getGroupsData())
    }]
};

const getGroupsData = () => {
    let params = { callTime: new Date() };
    const url = 'Groups/GetGroupAllData';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_GROUPS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getCompRange = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getCompRangeData())
    }]
};

const getCompRangeData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/GetSalaryRange';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_COMPRANGES,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getFunctionalTitles = (projectId) => {
    return [(dispatch, getState) => {
        dispatch(showLongNotification('Loading'));
    }, (dispatch, getState) => {
        dispatch(getFunctionalTitlesData(projectId))
    }]
};

const getFunctionalTitlesData = (projectId) => {
    let params = { callTime: new Date() };
    const url = 'Groups/GetFunctionalTitles/' + projectId + '-' + getMomentTimeStamp();
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_FUNCTIONAL_TITLES,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getProjectDefinedFields = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getProjectDefinedFieldsData())
    }]
};

const getProjectDefinedFieldsData = () => {
    let params = { callTime: new Date() };
    const url = 'GroupAdmin/GetCustomFields?groupId=';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_PROJECT_DEFINED_FIELDS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getRoles = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getRolesData())
    }]
};

const getRolesData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/GetRoles';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_ROLES,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getRolePermissions = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getRolePermissionsData())
    }]
};

const getRolePermissionsData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/GetRolePermissions?level=1';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_ROLE_PERMISSIONS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getClientSettings = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getClientSettingsData())
    }]
};

const getClientSettingsData = () => {
    let params = { callTime: new Date() };
    let organizationId = getOrganizationId();
    const url = 'Admin/ConfigList/' + organizationId + '-' + getMomentTimeStamp();
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_CLIENT_SETTINGS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getProjectValueReport = () => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    }, (dispatch, getState) => {
        dispatch(getProjectValueReportData())
    }]
};

const getProjectValueReportData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/GetProjectValueReport';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_PROJECT_VALUE_REPORT,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const exportProjectValueReport = (exportData, language) => {
    var exportDetailsFields = getExportDetailsFields()
    var name = window.parent.name;
    var params = { multiSheetData: exportData, language: language, exportName: i18n.t('ProjectValues'), createdBy: name, exportDetailsFields: exportDetailsFields, exportDetailSheetName: i18n.t('ExportDetails') }
    const url = 'Admin/ExportProjectValues';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.EXPORT_EXCEL,
        payload: request
    }
};


export const onSaveGroup = (group) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(saveGroup(group))
    }]
};

export const saveGroup = (group) => {
    const url = 'Groups/SaveGroup';
    const request = postAxios(url, { params: group });

    if (group.IsNew) {
        return {
            type: actionTypes.CREATE_GROUP,
            payload: request
        }
    } else {
        return [{
            type: actionTypes.SAVE_GROUP,
            payload: request
        }, (dispatch, getState) => { dispatch(hideNotification2()) }
        ]
    }
};

export const onDeleteGroup = (groupId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    }, (dispatch, getState) => {
        dispatch(deleteGroup(groupId))
    }]
};

export const deleteGroup = (groupId) => {
    const url = 'Groups/DeleteGroup';
    const request = postAxios(url, { params: { groupId: groupId } });

    return {
        type: actionTypes.DELETE_GROUP,
        payload: request
    }
};

export const onUpdateGroupStatus = (groupId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(updateGroupStatus(groupId))
    }]
};

export const updateGroupStatus = (groupId) => {
    const url = 'Groups/UpdateGroupStatus';
    const request = postAxios(url, { params: { groupId: groupId } });

    return [{
        type: actionTypes.UPDATE_GROUP_STATUS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateGroupLeadership = (groupId, leadershipType, userIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(updateGroupLeadership(groupId, leadershipType, userIds))
    }]
};

export const updateGroupLeadership = (groupId, leadershipType, userIds) => {
    let params = { groupId: groupId, leadershipType: leadershipType, userIds: userIds };
    const url = 'Groups/SaveLeadership';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_GROUP_LEADERSHIP,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onExportGroups = (exportedData, exportedFields, exportedFileName) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')));
    }, (dispatch, getState) => {
        dispatch(exportGroups(exportedData, exportedFields, exportedFileName))
    }]
};

export const exportGroups = (exportedData, exportedFields, exportedFileName) => {
    const language = localStorage.getItem('CurrentCulture') ? localStorage.getItem('CurrentCulture') : 'en';

    let params = { exportData: exportedData, exportedFields: exportedFields, exportName: exportedFileName, language: language };
    const url = 'Groups/ExcelExport';
    const request = postAxios(url, { params: params });

    return {
        type: actionTypes.EXPORT_EXCEL,
        payload: request
    }
};

export const onExportClientSettings = (exportType) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')));
    }, (dispatch, getState) => {
        dispatch(exportClientSettings(exportType))
    }]
};

export const exportClientSettings = (exportType) => {
    const language = localStorage.getItem('CurrentCulture') ? localStorage.getItem('CurrentCulture') : 'en';

    let params = { exportName: exportType, language: language };
    const url = 'Admin/ExportClientSettings';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.EXPORT_EXCEL,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onExportProjectSettings = (exportType) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')));
    }, (dispatch, getState) => {
        dispatch(exportProjectSettings(exportType))
    }]
};

export const exportProjectSettings = (exportType) => {
    const language = localStorage.getItem('CurrentCulture') ? localStorage.getItem('CurrentCulture') : 'en';

    let params = { exportName: exportType, language: language };
    const url = 'Admin/ExportProjectSettings';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.EXPORT_EXCEL,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
export const getBaselineData = (fileNumber) => {
    return [(dispatch, getState) => {
        dispatch(showLongNotification('Loading'));
    }, (dispatch, getState) => {
        dispatch(getBaselineTabsData(fileNumber))
    }]
};

const getBaselineTabsData = (fileNumber) => {
    let params = { callTime: new Date() };
    const url = 'Admin/GetBaselineData?fileNumber=' + fileNumber;
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_BASELINE_DATA,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const clearBaselineData = () => {
    return {
        type: actionTypes.CLEAR_BASELINE_DATA,
        payload: false
    };
};

export const calculateCenterDataCube = () => {
    return [(dispatch, getState) => {
        dispatch(showLongNotification('Calculating...'));
    }, (dispatch, getState) => {
        dispatch(calculateCenterDataCubeData())
    }]
};

const calculateCenterDataCubeData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/CalculateCenterDataCube';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.CALCULATE_CENTERDATA_CUBE,
        payload: request
    }
};

export const calculatePersonnelCube = () => {
    return [(dispatch, getState) => {
        dispatch(showLongNotification('Calculating...'));
    }, (dispatch, getState) => {
        dispatch(calculatePersonnelCubeData())
    }]
};

const calculatePersonnelCubeData = () => {
    let params = { callTime: new Date() };
    const url = 'Admin/CalculatePersonnelCube';
    const request = postAxios(url, { params: params });
    return {
        type: actionTypes.CALCULATE_PERSONNEL_CUBE,
        payload: request
    }
};

export const onExportBaslineData = (fileType) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')));
    }, (dispatch, getState) => {
        dispatch(exportBaselineData(fileType))
    }]
};

export const exportBaselineData = (fileType) => {
    let params = { fileType: fileType };
    const url = 'Admin/ExportBaselineData';
    const request = postAxios(url, { params: params });

    return {
        type: actionTypes.EXPORT_EXCEL,
        payload: request
    }
};

export const onExportMultiSheetBaslineData = (selectedTabs) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')));
    }, (dispatch, getState) => {
        dispatch(exportMultiSheetBaselineData(selectedTabs))
    }]
};

export const exportMultiSheetBaselineData = (selectedTabs) => {
    const language = localStorage.getItem('CurrentCulture') ? localStorage.getItem('CurrentCulture') : 'en';
    let params = { selectedTabs: selectedTabs, language: language };
    const url = 'Admin/ExportMultiSheetBaselineData';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.EXPORT_EXCEL,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }]
};

export const getBaslineUploadHistory = (userId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading'));
    },
    (dispatch, getState) => {
        dispatch(getBaslineUploadHistoryData(userId))
    }]
};

const getBaslineUploadHistoryData = (userId) => {
    let params = {};
    const url = 'EventStore/GetBaselineDataUploadHistory';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_BASELINE_UPLOAD_HISTORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const clearBaslineUploadHistory = () => {
    return {
        type: actionTypes.CLEAR_BASELINE_UPLOAD_HISTORY
    }
};

export const onLockSCRReports = (scrReportIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(lockSCRReports(scrReportIds))
    }]
};

export const lockSCRReports = (scrReportIds) => {
    const url = 'Admin/SCRReportBulkLock?scrReportIds=' + scrReportIds;
    const request = postAxios(url, { params: scrReportIds });

    return [{
        type: actionTypes.LOCK_SCR_REPORTS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUnlockSCRReports = (scrReportIds) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(unlockSCRReports(scrReportIds))
    }]
};

export const unlockSCRReports = (scrReportIds) => {
    const url = 'Admin/SCRReportBulkUnlock?scrReportIds=' + scrReportIds;
    const request = postAxios(url, { params: scrReportIds });

    return [{
        type: actionTypes.UNLOCK_SCR_REPORTS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onArrangingSCRReports = (scrNumber, scrReports) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    }, (dispatch, getState) => {
        dispatch(arrangingSCRReports(scrNumber, scrReports))
    }]
};

export const arrangingSCRReports = (scrNumber, scrReports) => {
    const url = 'Admin/RearrangeSCRReports';
    const params = { scrNumber, scrReports };
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.REARRANGE_SCR_REPORTS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
export const printingSCRReports = (attachmentIds, isDownload) => {
    return [(dispatch, getState) => {
        dispatch(showLongNotification(isDownload ? 'Downloading' : 'Loading'));
    }, (dispatch, getState) => {
        dispatch(printingSCRReportFiles(attachmentIds, isDownload))
    }]
}
export const printingSCRReportFiles = (attachmentIds, isDownload) => {
    const url = 'Attachments/DownloadPDF';
    const params = { attachmentIds, attachmentIds, language: getCurrentCulture() };
    const request = postAxios(url, { params: params });

    return [{
        type: isDownload ? 'DOWNLOAD_EXPORT' : actionTypes.PRINT_SCR_REPORTS,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const getGroupHistory = (groupId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading...'));
    },
    (dispatch, getState) => {
        dispatch(getGroupHistoryData(groupId))
    }]
};

const getGroupHistoryData = (groupId) => {
    let params = {};
    const url = 'EventStore/GetGroupHistory?id=' + groupId;
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_GROUP_HISTORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const clearGroupHistory = () => {
    return {
        type: actionTypes.CLEAR_GROUP_HISTORY
    }
}
export const addSalaryRange = (salaryRangeGuid, salaryRangeId, minSalary, maxSalary, avgSalary, loadFactor) => {
    let params = { salaryRangeGuid, salaryRangeId, minSalary, maxSalary, avgSalary, loadFactor, eventType: 'Create' };
    const url = 'Admin/SaveSalaryRange';
    const request = postAxios(url, { params: params });

    return {
        type: actionTypes.SAVE_SALARY_RANGES,
        payload: request
    }
}
export const updateSalaryRange = (salaryRangeGuid, salaryRangeId, minSalary, maxSalary, avgSalary, loadFactor, eventType) => {
    let params = { salaryRangeGuid, salaryRangeId, minSalary, maxSalary, avgSalary, loadFactor, eventType };
    const url = 'Admin/SaveSalaryRange';
    const request = postAxios(url, { params: params });

    return {
        type: actionTypes.SAVE_SALARY_RANGES,
        payload: request
    }
}
export const deleteSalaryRange = (salaryRangeGuid) => {
    let params = { salaryRangeGuid, eventType: 'Delete' };

    const url = 'Admin/SaveSalaryRange';
    const request = postAxios(url, { params: params });

    return {
        type: actionTypes.DELETE_SALARY_RANGES,
        payload: request
    }
}

export const saveProjectConfig = (projectSettingJson) => {

    let params = { 'configData': projectSettingJson };
    const url = 'Admin/SaveProjectConfig';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.SAVE_PROJECT_CONFIG,
        payload: request
    }, (dispatch, getState) => { 
        window.location.reload(true);
     }
    ]
}

export const getprojectConfigHistory = () => {
    
    return [(dispatch, getState) => {
        dispatch(showNotification2('Loading...'));
    },
    (dispatch, getState) => {
        dispatch(projectConfigHistoryData())
    }]
};

const projectConfigHistoryData = () => {
    let params = {}; 
    const url = 'EventStore/GetProjectConfigHistory';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_PROJECT_CONFIG_HISTORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const clearProjectConfigHistory = () => {
    return {
        type: actionTypes.CLEAR_PROJECT_CONFIG_HISTORY
    }
};
