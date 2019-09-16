import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import uuid from 'uuid';
import AppConfig from '../appConfig';
import * as privateSettings from '../privateSettings';

const cache = setupCache({
    maxAge: 15 * 60 * 60 * 1000,
    exclude: {
        paths: [
            // /Controler\/Action$/,
        ]
    }
});

const api = axios.create({
    adapter: cache.adapter
});

export const getAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        // organizationId: localStorage.getItem('organizationId') || AppConfig.env('organizationId'),
        organizationId: AppConfig.env('organizationId'),
        // userId: localStorage.getItem('userId') || AppConfig.env('userId'),
        userId: AppConfig.env('userId'),
        // connectionId: sessionStorage.getItem('tabId') || AppConfig.env('connectionId'),
        // connectionId: AppConfig.env('connectionId'),
        // tokenId: sessionStorage.getItem('tokenId') ? sessionStorage.getItem('tokenId') : (privateSettings && privateSettings.AuthenticationToken),
        // tokenId: privateSettings && privateSettings.AuthenticationToken,
        tokenId: AppConfig.env('tokenId'),
        'Content-Type': 'application/json',
        // projectId: sessionStorage.getItem('projectId') || localStorage.getItem('projectId') || '',
         projectId: AppConfig.env('projectId'),
        // BrowserSessionId: getCookie('BrowserSessionId'),
        // 'JsMessageId': uuid.v4(),
        // 'TimeStart': getUtcDate().getTime(),
        // 'Url': url,
        // 'Step': 'DataCall',
        // 'IsWebService': '0',
        // 'elapsedTime': 0
    };
    url = AppConfig.env('url') + url;
    var resp = api({
        method: 'get',
        url: url,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            if (response.response && response.response.status) {
                switch (response.response.status) {
                    case 400:
                        window.location.reload();
                        break;
                    case 401:
                        window.parent.redirectUnauthorized();
                        break;
                    case 403: break;
                }
            }
            console.log(response);
        });
    return resp;
};

export const postAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        // organizationId: localStorage.getItem('organizationId') || AppConfig.env('organizationId'),
        organizationId: AppConfig.env('organizationId'),
        // userId: localStorage.getItem('userId') || AppConfig.env('userId'),
        userId: AppConfig.env('userId'),
        // connectionId: sessionStorage.getItem('tabId') || AppConfig.env('connectionId'),
        connectionId: AppConfig.env('connectionId'),
        tokenId: privateSettings && privateSettings.AuthenticationToken,
        // projectId: sessionStorage.getItem('projectId') || localStorage.getItem('projectId') || '',
        projectId: '',
        // BrowserSessionId: getCookie('BrowserSessionId'),
        'JsMessageId': uuid.v4(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0',
        'elapsedTime': 0
    };
    url = AppConfig.env('url') + url;
    if (!axiosRequestConfig.params.callTime) {
        axiosRequestConfig.params = { ...axiosRequestConfig.params, callTime: new Date() }
    }
    var resp = api({
        method: 'post',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            // if (response.response && response.response.status) {
            //     switch (response.response.status) {
            //         case 400:
            //             window.location.reload();
            //             break;
            //         case 401:
            //             window.parent.redirectUnauthorized();
            //             break;
            //         case 403: break;
            //     }
            // }
            console.log(response);
        });
    return resp;
};

var getUtcDate = function () {
    var dt = new Date();
    return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
};


// import axios from 'axios';
// import { setupCache } from 'axios-cache-adapter';
// import moment from 'moment';
// import uuid from 'uuid';
// import AppConfig from '../appConfig';
// import * as loghelper from '../common/loghelper';
// import { isEmpty2, validateAuth0Token } from '../common/utils';
// import * as privateSettings from '../privateSettings';
// //import { createUser } from './userAdminActions';

// import { getLocalStorageKey, setLocalStorageKey} from '../common/utils';


// /* const appCenterUrl = document.location.hostname === 'localhost' ? 'http://localhost:55459/' : 'https://appcenter.vicicentral.com/';
// const perfLogUrl = (document.location.host.indexOf('vicicentral.com') === -1) ? 'http://localhost:55459/api/performancelog' : 'https://appcenter.vicicentral.com/api/performancelog';
// const organizationName = (document.location.host.indexOf('vicicentral.com') === -1) ? 'localhost' : document.location.host.replace('.vicicentral.com', ''); */

// const appCenterUrl = 'https://qa.vicicentral.com/apiv5201' ; //https://qa.vicicentral.com/apiv5201
// const perfLogUrl = ''; // 'http://localhost:55459/api/performancelog';
// const organizationName = "qa"; //document.location.host.replace('.vicicentral.com', '');

// const cache = setupCache({
//     maxAge: 15 * 60 * 60 * 1000,
//     exclude: {
//         paths: [/CachedData\/GetCachedTimeStamp$/,
//             /UserAdmin\/GetOrganizationUsers$/,
//             /UserAdmin\/GetAdminUsers$/,
//             /EventStore\/GetBaselineDataUploadHistory$/,
//             /Auth0\/CreateVpUser$/,
//             /UserAdmin\/CreateUser$/,
//             /ViciAdmin\/ManageOrganizationUsers$/,
//             /UserAdmin\/GetPermissionAllData$/,
//             /Ideas\/GetArchivedIdeaData$/,
//             /UserNotes\/TimeStamp$/,
//             /Admin\/GetProjectValueReport$/
//         ]
//         ///Admin\/GetBaselineData$/
//     }
// });

// const api = axios.create({
//     adapter: cache.adapter
// });
// var timer;
// var timeTakenGetCachedTimeStamp;
// var slowNetworkWarningShown = false;
// var warnSlowNetwork = function (isDownload) {
//     slowNetworkWarningShown = true;
//     if (isDownload) {
//         window.parent.showMessage('SlowDownloadWarningText', '#f7e7cd', '#1d3f77', true);
//     } else {
//         window.parent.showMessage('SlowNetworkWarningText', '#f7e7cd', '#1d3f77', true);
//     }
// }
// api.interceptors.request.use(request => {
//     if (/api\/performancelog$/.test(request.url)) return request;

//     if (AppConfig.slowNetworkWarning && !slowNetworkWarningShown) {
//         if (/CachedData\/GetCachedTimeStamp$/.test(request.url)) {
//             if (timer === undefined) {
//                 timer = setTimeout(warnSlowNetwork, AppConfig.slowNetworkThreshold);
//             }
//         }
//     }
//     if (AppConfig.axiosLogger) {
//         loghelper.consoleTime('ajax ' + request.method + ' ' + loghelper.formatUrl(request.url), 0, 3);
//     }
//     return request;
// });

// api.interceptors.response.use(response => {
//     setLocalStorageKey('LastActiveTime', new Date().getTime());
//     if (/api\/performancelog$/.test(response.config.url)) return response;

//     if (AppConfig.axiosLogger) {
//         loghelper.consoleTimeEnd('ajax ' + response.config.method + ' ' + loghelper.formatUrl(response.config.url), 0, 3);
//     }

//     let receivedTime = new Date().getTime() - new Date(response.config.callTime).getTime();
//     if (response.config.headers.JsMessageId !== response.headers.jsmessageid) {
//         response.headers.elapsedtime = 0;
//     }
//     let transferTime = receivedTime - parseFloat(response.headers.elapsedtime);

//     if (AppConfig.slowNetworkWarning && !slowNetworkWarningShown) {
//         if (/CachedData\/GetCachedTimeStamp$/.test(response.config.url)) {
//             clearTimeout(timer);
//             timeTakenGetCachedTimeStamp = transferTime;
//         }
//         if (/\bCachedData\/MasterData\b/.test(response.config.url)) {
//             let timeTaken = (transferTime - timeTakenGetCachedTimeStamp);
//             if (timeTaken > 0) {
//                 let contentSize = (JSON.stringify(response).length) / (transferTime - timeTakenGetCachedTimeStamp); //bytes per milliseconds
//                 if (contentSize < AppConfig.slowDownloadThreshold) {
//                     warnSlowNetwork(true);
//                 }
//             }
//         }
//     }
//     if (AppConfig.performanceLogger) {
//         let urlParts = response.config.headers.Url.split('/');
//         let urlAction = '';
//         if (urlParts.length >= 2) {
//             if (urlParts[1].indexOf('?') === -1) {
//                 urlAction = [urlParts[0], urlParts[1]].join('/');
//             } else {
//                 urlAction = [urlParts[0], urlParts[1].substring(0, urlParts[1].indexOf('?'))].join('/');
//             }
//         }
//         let params = {
//             LogDateTime: moment(response.config.callTime).utc(),
//             LogType: 1, UserId: response.config.headers.userId, OrganizationId: response.config.headers.organizationId, OrganizationName: organizationName, LoginSessionId: ''/*getCookies('BrowserSessionId')*/,
//             ConnectionId: getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
//             MessageId: response.config.headers.JsMessageId, RawUrl: response.config.headers.Url, GroupId: getLocalStorageKey('GroupId'), Action: urlAction,
//             Time1: transferTime, Time2: parseFloat(response.headers.elapsedtime), ProjectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId')
//         };
//         postAxiosPerformanceLog(perfLogUrl, { params: params });
//     }
//     return response;
// });

// export const logUIActions = (path, component, name, action, ideaNumber) => {
//     switch (name) {
//         case 'Start/IdeaGeneration':
//             name = 'Start/Idea Generation'
//             break;
//         case 'Start/FocusAreas':
//             name = 'Start/Focus Areas'
//             break;
//         case 'Start/FunctionalTitles':
//             name = 'Start/Functional Titles'
//             break;
//         case 'Start/BaselineCube':
//             name = 'Start/Baseline Cube'
//             break;

//         case 'Ideas/ResolveReview':
//             name = 'Ideas/Resolve & Review'
//             break;
//         case 'Ideas/IdeaGeneration':
//             name = 'Ideas/Idea Generation'
//             break;
//         case 'Calendar/WeeklyTasks':
//             name = 'Calendar/Weekly Tasks'
//             break;
//         case 'Calendar/TaskList':
//             name = 'Calendar/Task List'
//             break;
//         case 'Calendar/ManageTasks':
//             name = 'Calendar/Manage Tasks'
//             break;

//         case 'Planning/LineItems':
//             name = 'Planning/Line Items'
//             break;
//         case 'Tracking/LineItems':
//             name = 'Tracking/Line Items'
//             break;
//         case '.../GroupAdmin/Sessions':
//             name = 'Group Admin/Sessions';
//             break;
//         case '.../GroupAdmin/FocusAreas':
//             name = '.../Group Admin/Focus Areas'
//             break;
//         case '.../GroupAdmin/GroupSummary':
//             name = '.../Group Admin/Group Summary'
//             break;
//         case '.../GroupAdmin/Leadership':
//             name = '.../Group Admin/Leadership'
//             break;
//         case '.../GroupAdmin/GroupDefinedFields':
//             name = '.../Group Admin/Group-Defined Fields'
//             break;
//         case '.../GroupAdmin/SCRManager':
//             name = '.../Group Admin/SCR Manager'
//             break;
//         case '.../GroupAdmin/Settings':
//             name = '.../Group Admin/Settings'
//             break;
//         case '.../Baseline/NPECube':
//             name = '.../Baseline/Non-Personnel'
//             break;
//         case '.../Baseline/PECube':
//             name = '.../Baseline/Personnel'
//             break;
//         case '.../Baseline/FunctionalTitles':
//             name = '.../Baseline/Functional Titles'
//             break;
//         case '.../Org':
//             name = '.../Org Chart/'
//             break;
//         case '.../Admin/ClientSettings':
//             name = '.../Administration/Client Settings'
//             break;
//         case 'Admin/ProjectSettings':
//             name = 'Administration/Project Settings'
//             break;
//         case '.../Admin/Groups':
//             name = '.../Administration/Groups'
//             break;
//         case '.../Admin/SCRManager':
//             name = '.../Administration/SCR Manager'
//             break;
//         case '.../Admin/ProjectValueReport':
//             name = '.../Administration/Project Value Report'
//             break;
//         case '.../UserAdmin/Users':
//             name = '.../User Administration/Users'
//             break;
//         case '.../UserAdmin/AdminUsers':
//             name = '.../User Administration/Admin Users'
//             break;
//         case '.../UserAdmin/UserPermissions':
//             name = '.../User Administration/User Permissions'
//             break;
//         case '.../UserAdmin/Connections':
//             name = '.../User Administration/Connections'
//             break;
//         case '.../ViciAdmin/CompRanges':
//             name = '.../Vici Administration/Comp Ranges'
//             break;
//         case '.../ViciAdmin/ProjectDefinedFields':
//             name = '.../Vici Administration/Project-Defined Fields'
//             break;
//         case '.../ViciAdmin/RolePermissions':
//             name = '.../Vici Administration/Role Permissions'
//             break;
//         case '.../ViciAdmin/BaselineData':
//             name = '.../Vici Administration/Baseline Data'
//             break;
//         case '.../ViciAdmin/AppStats':
//             name = '.../Vici Administration/App Stats'
//             break;
//         case '.../ViciAdmin/AppStats/Performance':
//             name = '.../Vici Administration/App Stats/Performance'
//             break;
//         case '.../ViciAdmin/AppStats/AppLog':
//             name = '.../Vici Administration/App Stats/App Log'
//             break;
//         case '.../ViciAdmin/AppStats/ConnectionLog':
//             name = '.../Vici Administration/App Stats/Connection Log'
//             break;
//         case 'Settings/UserSettings':
//             name = 'Settings/User Settings'
//             break;
//         default: break;
//     }

//     let params = {
//         LogDateTime: moment().utc(),
//         UserId: getLocalStorageKey('userId'),
//         OrganizationId: getLocalStorageKey('organizationId'),
//         OrganizationName: organizationName,
//         LoginSessionId: ''/*getCookies('BrowserSessionId')*/,
//         ConnectionId: getLocalStorageKey('tabId') ? getLocalStorageKey('tabId') : AppConfig.env('connectionId'),
//         RawUrl: window.location.href,
//         GroupId: getLocalStorageKey('GroupId'),
//         Component: component,
//         Path: path,
//         Action: action,
//         IdeaNumber: ideaNumber,
//         Name: name,
//         ProjectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId')
//     };
//     let existingLogs = (getLocalStorageKey('uiActionsLog') && JSON.parse(getLocalStorageKey('uiActionsLog'))) || [];
//     existingLogs.push(params);

//     if (existingLogs.length > 20) {
//         postAxiosPerformanceLog(appCenterUrl + 'api/SaveUIActionLogs', { params: existingLogs });
//         existingLogs = [];
//     }
//     setLocalStorageKey('uiActionsLog', JSON.stringify(existingLogs));

// }

// export const getAxios = (url, axiosRequestConfig) => {

//     const organizationId = (async () => {   await getLocalStorageKey('organizationId') })();

// const userId= (async () => {   await getLocalStorageKey('userId') })()

//     axiosRequestConfig.headers = {
//        /*  organizationId: getLocalStorageKey('organizationId').then((value)=>{ 
//             const returnValue = (value !== undefined && value !== null)? value : AppConfig.env('organizationId');
//             console.log("organizationId " , returnValue);
//             return returnValue;
//         }).catch((error)=>{ 
//             AppConfig.env('organizationId') }),  // || AppConfig.env('organizationId'),
//         userId: getLocalStorageKey('userId').then((value)=>{
//             const returnValue = (value !== undefined && value !== null)? value : AppConfig.env('userId');
//             console.log("userId ", returnValue);
//             return returnValue;
//         }).catch((error)=>{ 
//                  AppConfig.env('userId') }), // getLocalStorageKey('userId') || AppConfig.env('userId'),
//         connectionId: getLocalStorageKey('tabId').then((value)=>{
//             const returnValue = (value !== undefined && value !== null)? value : AppConfig.env('tabId') || '' ;
//             console.log("connectionId", returnValue);
//             return returnValue;
//             }).catch((error)=>{
//                   AppConfig.env('tabId') }),// getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
//         tokenId: getLocalStorageKey('tokenId').then((value)=>{
//             const returnValue = (value !== undefined && value !== null)? value : AppConfig.env('tokenId');
//             console.log("tokenId ", returnValue);
//             return returnValue;
//             }).catch((error)=>{ 
//                  AppConfig.env('tokenId') }), // getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : AppConfig.env('tokenId'),//(privateSettings && privateSettings.AuthenticationToken),
//         projectId: getLocalStorageKey('projectId').then((value)=>{ 
//             const returnValue = (value !== undefined && value !== null)? value : AppConfig.env('projectId');
//             console.log("projectId ", returnValue);
//             return returnValue;
//             }).catch((error)=>{
//                  AppConfig.env('projectId') }), // getLocalStorageKey('projectId') || AppConfig.env('projectId') || '', */
//         organizationId: AppConfig.env('organizationId'),
//         userId: AppConfig.env('userId'),
//         connectionId: AppConfig.env('connectionId') || '',
//         tokenId: AppConfig.env('tokenId'),
//         projectId: AppConfig.env('projectId'),
//     //    BrowserSessionId: ''/*getCookies('BrowserSessionId')*/,
//         'JsMessageId': uuid.v4(),
//         'TimeStart': getUtcDate().getTime(),
//         'Url': url,
//         'Step': 'DataCall',
//         'IsWebService': '0',
//         'elapsedTime': 0
//     };
//     url = AppConfig.env('url') + url;
//     var resp = api({
//         method: 'get',
//         url: url,
//         headers: axiosRequestConfig.headers,
//         callTime: axiosRequestConfig.params.callTime,
//         view: axiosRequestConfig.params.view ? axiosRequestConfig.params.view : null
//     })
//         .then(function (response) {
//             return response;
//         })
//         .catch(function (response) {
//             /* if (response.response && response.response.status) {
//                 switch (response.response.status) {
//                     case 400:
//                         window.location.reload();
//                         break;
//                     case 401:
//                         window.parent.redirectUnauthorized();
//                         break;
//                     case 403: break;
//                 }
//             } */
//             console.log(response);
//         });
//     return resp;
// };

// export const postAxios = (url, axiosRequestConfig) => {
//     axiosRequestConfig.headers = {
//         organizationId: getLocalStorageKey('organizationId') || AppConfig.env('organizationId'),
//         userId: getLocalStorageKey('userId') || AppConfig.env('userId'),
//         connectionId: getLocalStorageKey('tabId') || AppConfig.env('connectionId'),
//         tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken),
//         projectId: getLocalStorageKey('projectId') || getLocalStorageKey('projectId') || '',
//         BrowserSessionId: ''/*getCookies('BrowserSessionId')*/,
//         'JsMessageId': uuid.v4(),
//         'TimeStart': getUtcDate().getTime(),
//         'Url': url,
//         'Step': 'DataCall',
//         'IsWebService': '0',
//         'elapsedTime': 0
//     };
//     url = AppConfig.env('url') + url;
//     if (!axiosRequestConfig.params.callTime) {
//         axiosRequestConfig.params = { ...axiosRequestConfig.params, callTime: new Date() }
//     }
//     var resp = api({
//         method: 'post',
//         url: url,
//         data: axiosRequestConfig.params,
//         headers: axiosRequestConfig.headers,
//         callTime: axiosRequestConfig.params.callTime,
//     })
//         .then(function (response) {
//             return response;
//         })
//         .catch(function (response) {
//             if (response.response && response.response.status) {
//                 switch (response.response.status) {
//                     case 400:
//                         window.location.reload();
//                         break;
//                     case 401:
//                         window.parent.redirectUnauthorized();
//                         break;
//                     case 403: break;
//                 }
//             }
//             console.log(response);
//         });
//     return resp;
// };
// var getUtcDate = function () {
//     var dt = new Date();
//     return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
// };

// export const getCookies = (c_name) => {
//   /*   if (document.cookie.length > 0) {
//         var c_start = document.cookie.indexOf(c_name + "=");
//         if (c_start !== -1) {
//             c_start = c_start + c_name.length + 1;
//             var c_end = document.cookie.indexOf(";", c_start);
//             if (c_end === -1) {
//                 c_end = document.cookie.length;
//             }
//             return unescape(document.cookie.substring(c_start, c_end));
//         }
//     } */
//     return "";
// };

// export const postAxiosPerformanceLog = (url, requestConfig) => {
//     if (AppConfig.performanceLogger) {
//         axios({
//             method: 'post',
//             url: url,
//             data: requestConfig.params,
//         }).catch(function (response) { console.log(response); });
//     }
// }


// export const postAxiosToAuth0Api = (url, axiosRequestConfig) => {
//     const auth0TokenId = AppConfig.auth0TokenId;
//     const isTokenExpired = validateAuth0Token(auth0TokenId);

//     if (!isEmpty2(auth0TokenId) && isTokenExpired === false) {
//         axiosRequestConfig.headers = {
//             'Authorization': "Bearer " + auth0TokenId,
//         };
//         url = AppConfig.env('auth0Url') + url;
//         if (!axiosRequestConfig.params.callTime) {
//             axiosRequestConfig.params = { ...axiosRequestConfig.params, callTime: new Date() }
//         }
//         var resp = axios({
//             method: 'post',
//             url: url,
//             data: axiosRequestConfig.params,
//             headers: axiosRequestConfig.headers,
//             callTime: axiosRequestConfig.params.callTime,
//         })
//             .then(function (response) {
//                 return response;
//             })
//             .catch(function (response) {
//                 console.log(response);
//             });
//         return resp;
//     }
// };

// /**
//  * To be used for anonymous method only
//  */
// export const getAxiosFromAuth0Api = (url, axiosRequestConfig) => {
//     var resp = axios({
//         method: 'get',
//         url: AppConfig.env('auth0Url') + url,
//         data: axiosRequestConfig.params,
//     })
//         .then(function (response) {
//             return response;
//         })
//         .catch(function (response) {
//             console.log(response);
//         });
//     return resp;
// };




