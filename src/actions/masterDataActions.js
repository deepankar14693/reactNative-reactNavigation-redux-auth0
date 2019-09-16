import AppConfig from '../appConfig';
import { getAxios } from './axiosActions';
import { getMomentTimeStamp, isEmpty2, getLastProjectId, setCookies, setLocalStorageKey, getLocalStorageKey } from '../common/utils';
import { getStarIdeas, getFunctionalTitles, getPersonnel } from './index';
import { getSessionData } from './sessionActions';
import { getTimingScenarioData } from './timingScenarioActions';
import * as actionTypes from './actionTypes';
//import * as Cookies from 'js-cookie';

export const getOrganizationMasterData = () => {
    let timeStamp = getMomentTimeStamp();
    let params = { callTime: new Date() };
    let organizationId = AppConfig.organizationId;// getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId');

    const url = 'CachedData/OrganizationMasterData/' + organizationId + '-' + timeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_ORGANIZATION_MASTERDATA,
        payload: request
    }
};

export const getUserProjects = () => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetUserProjects';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_USER_PROJECTS,
        payload: request
    },
    (dispatch, getState) => {
        const curProjectId = getLastProjectId();
        const userProjects = getState().permissions.userProjects;
        // if ((isEmpty2(curProjectId) || !userProjects[curProjectId]) && Object.keys(userProjects).length > 0) {
        //     setLocalStorageKey('projectId', Object.keys(userProjects)[0]);
        //     setLocalStorageKey('projectId', Object.keys(userProjects)[0]);
        //     setCookies("LastActiveProjectId", Object.keys(userProjects)[0], { expires: 14 });
        // }
        dispatch(getTimeStamps());
    }]
};

export const getTimeStamps = () => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_TIMESTAMPS,
        payload: request
    },
    (dispatch, getState) => {
        var timeStamps = getState().timeStamps;
        const projectId = getLastProjectId();

        dispatch(getMasterData(timeStamps, projectId));
        dispatch(getSessionData());
        dispatch(getPermissionsMasterData(projectId));
        dispatch(getStarIdeas(timeStamps, projectId));
        dispatch(getFunctionalTitles(timeStamps, projectId));
        dispatch(getPersonnel(timeStamps, projectId));
        dispatch(getTimingScenarioData());
    }]
};

export const getMasterData = () => {
    const projectId = AppConfig.env('projectId');
    let masterTimeStamp = getMomentTimeStamp(new Date()); //getMomentTimeStamp(timeStamps.Master);
    let params = { callTime: new Date() };
    const url = 'CachedData/MasterData/' + projectId + '-' + masterTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_MASTERDATA,
        payload: request
    }
};

export const getPermissionsMasterData = (projectId) => {
    let permissionMasterTimeStamp = getMomentTimeStamp(); 
    let params = { callTime: new Date() };

    const url = 'CachedData/PermissionMasterData/' + projectId + '-' + permissionMasterTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_PERMISSION_MASTER_DATA,
        payload: request
    }
};

export const onProjectChange = (projectId) => {
    return [{
        type: actionTypes.PROJECT_CHANGE,
        payload: projectId
    }, (dispatch) => {
        dispatch(getTimeStamps());
    }]
};
