import { showNotification2, hideNotification2 } from './notification';
import { getAxios, postAxios } from './axiosActions';
import * as actionTypes from './actionTypes';
import { getOrganizationId, getMomentTimeStamp } from '../common/utils';
import i18n from '../i18n';
import { showLongNotification } from '.';
import { getLocalStorageKey } from '../common/utils';

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

export const onExportMultiSheetBaslineData = (selectedTabs) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2(i18n.t('LoadingMessageExporting')));
    }, (dispatch, getState) => {
        dispatch(exportMultiSheetBaselineData(selectedTabs))
    }]
};

export const exportMultiSheetBaselineData = (selectedTabs) => {
    const language = getLocalStorageKey('CurrentCulture') ? getLocalStorageKey('CurrentCulture') : 'en';
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

export const onCreateCenter = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(createCenter(data))
    }]
};

const createCenter = (data) => {
    let params = data;
    const url = 'BaselineData/CreateCenter';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_COST_CENTER,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateCenter = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(updateCenter(data))
    }]
};

const updateCenter = (data) => {
    let params = data;
    const url = 'BaselineData/UpdateCenter';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_COST_CENTER,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteCenters = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deleteCenters(data))
    }]
};

const deleteCenters = (data) => {
    let params = { eventType: data.EventType, deletedCenters: data.DeletedCenters };
    const url = 'BaselineData/DeleteCenters';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.DELETE_COST_CENTER,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};


export const onCreateFinanceData = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(createFinanceData(data))
    }]
};

const createFinanceData = (data) => {
    let params = data;
    const url = 'BaselineData/CreateFinanceData';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_FINANCE_DATA,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateFinanceData = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(updateFinanceData(data))
    }]
};

const updateFinanceData = (data) => {
    let params = data;
    const url = 'BaselineData/UpdateFinanceData';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_FINANCE_DATA,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteFinanceData = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deleteFinanceData(data))
    }]
};

const deleteFinanceData = (data) => {
    let params = { eventType: data.EventType, deletedCenterDataIds: data.DeletedCenterDataIds };
    const url = 'BaselineData/DeleteFinanceData';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.DELETE_FINANCE_DATA,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};


export const onCreatePersonnel = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(createPersonnel(data))
    }]
};

const createPersonnel = (data) => {
    let params = data;
    const url = 'BaselineData/CreatePersonnel';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_PERSONNEL,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdatePersonnel = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(updatePersonnel(data))
    }]
};

const updatePersonnel = (data) => {
    let params = data;
    
    const url = 'BaselineData/UpdatePersonnel';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_PERSONNEL,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeletePersonnel = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deletePersonnel(data))
    }]
};

const deletePersonnel = (data) => {
    let params = { eventType: data.EventType, deletedPersonnelIds: data.DeletedPersonnelIds };
    const url = 'BaselineData/DeletePersonnel';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.DELETE_PERSONNEL,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};


export const onCreateCategory = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(createCategory(data))
    }]
};

const createCategory = (data) => {
    let params = data;
    const url = 'BaselineData/CreateCategory';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_CATEGORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateCategory = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(updateCategory(data))
    }]
};

const updateCategory = (data) => {
    let params = data;
    
    const url = 'BaselineData/UpdateCategory';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_CATEGORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteCategory = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deleteCategory(data))
    }]
};

const deleteCategory = (data) => {
    let params = { eventType: data.EventType, deletedCategories: data.DeletedCategories };
    const url = 'BaselineData/DeleteCategory';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.DELETE_CATEGORY,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};


export const onCreateCategoryMap = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(createCategoryMap(data))
    }]
};

const createCategoryMap = (data) => {
    let params = data;
    const url = 'BaselineData/CreateCategoryMap';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.CREATE_CATEGORY_MAP,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onUpdateCategoryMap = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving'));
    },
    (dispatch, getState) => {
        dispatch(updateCategoryMap(data))
    }]
};

const updateCategoryMap = (data) => {
    let params = data;
    
    const url = 'BaselineData/UpdateCategoryMap';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.UPDATE_CATEGORY_MAP,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteCategoryMap = (data) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deleteCategoryMap(data))
    }]
};

const deleteCategoryMap = (data) => {
    let params = { eventType: data.EventType, deletedCategoryMapIds: data.DeletedCategoryMapIds };
    const url = 'BaselineData/DeleteCategoryMap';
    const request = postAxios(url, { params: params });

    return [{
        type: actionTypes.DELETE_CATEGORY_MAP,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onSaveGroupCategoryGLDollar = (groupId, groupCategoryGLDollarId, category, categoryType, glDollar) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Saving...'));
    },
    (dispatch, getState) => {
        dispatch(saveGroupCategoryGLDollar(groupId, groupCategoryGLDollarId, category, categoryType, glDollar))
    }]
};

const saveGroupCategoryGLDollar = (groupId, groupCategoryGLDollarId, category, categoryType, glDollar) => {
    let params = { groupId, groupCategoryGLDollarId, category, categoryType, glDollar };
    const url = 'BaselineData/InsertUpdateGroupCategoryGLDollar';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.SAVE_GROUP_CATEGORY_GLDOLLAR,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};

export const onDeleteGroupCategoryGLDollar = (groupId, groupCategoryGLDollarId) => {
    return [(dispatch, getState) => {
        dispatch(showNotification2('Deleting...'));
    },
    (dispatch, getState) => {
        dispatch(deleteGroupCategoryGLDollar(groupId, groupCategoryGLDollarId))
    }]
};

const deleteGroupCategoryGLDollar = (groupId, groupCategoryGLDollarId) => {
    let params = { groupId, groupCategoryGLDollarId };
    const url = 'BaselineData/DeleteGroupCategoryGLDollar';

    const request = postAxios(url, { params: params });
    return [{
        type: actionTypes.DELETE_GROUP_CATEGORY_GLDOLLAR,
        payload: request
    }, (dispatch, getState) => { dispatch(hideNotification2()) }
    ]
};
