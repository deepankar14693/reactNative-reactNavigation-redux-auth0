import axios from 'axios';
import { getAxios, postAxios } from './axiosActions';
 import i18n from '../i18n';
import { getFooterHTML, getUTCTimingLabel, getLocalStorageKey } from '../common/utils';
import uuid from 'uuid';
import { setupCache } from 'axios-cache-adapter';
import * as privateSettings from '../privateSettings';
import _ from 'lodash';
import AppConfig from '../appConfig';
import { showPdfNotification, hidePdfNotification, changeMessagePdfNotification, showNotification2, hideNotification2, } from './notification';
let counter = 0;
const cache = setupCache({
    maxAge: 15 * 60 * 60 * 1000,
    exclude: {
        paths: [/CachedData\/GetCachedTimeStamp$/,
            /UserAdmin\/GetOrganizationUsers$/,
            /UserAdmin\/GetAdminUsers$/,
            /EventStore\/GetBaselineDataUploadHistory$/,
            /Auth0\/CreateVpUser$/,
            /UserAdmin\/CreateUser$/,
            /ViciAdmin\/ManageOrganizationUsers$/,
            /UserAdmin\/GetPermissionAllData$/,
        ]
        ///Admin\/GetBaselineData$/
    }
});
export const downloadSCRReports = (organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, reportMessage) => {
    counter++;
    return [(dispatch, getState) => {

        dispatch(showPdfNotification(i18n.t('ReportPreparingReportNotification'), (id + counter)));
    }, (dispatch, getState) => {
        // dispatch(printPdf(organization, reportName, groupId, groupName, html, headerHTML, reportType, toc, (id + counter), reportMessage))
        dispatch(AppConfig.appMode !== 'local' ? checkPdfTimeStamp(organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, (id + counter), getState().reports.timeStamp, reportMessage) :
        generatePdf(organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, (id + counter), reportMessage)
    )
    }];
}

export const printPdf = (organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, reportMessage) => {
    counter++;
    let params = { callTime: new Date() };
    let url = 'CachedData/GetGroupTimeStamp?groupId=' + groupId;

    const request = getAxios(url, { params: params });
    return [
        {
            type: 'GET_GROUP_TIMESTAMP',
            payload: request
        }
        , (dispatch, getState) => {
            dispatch(AppConfig.appMode !== 'local' ? checkPdfTimeStamp(organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, getState().reports.timeStamp, reportMessage) :
                generatePdf(organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, reportMessage)
            )
        }
    ]
}

const checkPdfTimeStamp = (organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, timeStamp, reportMessage) => {
    let params = { timeStamp: timeStamp };
    let url = 'Pdf/CheckPdfTimeStamp';
    const request = postPdfAxios(url, { params: params });
    return [(dispatch, getState) => {

        dispatch(changeMessagePdfNotification(reportMessage, id));
    },
    {
        type: 'GET_REPORTS_PDF_CHECK_TIMESTAMP_DATA',
        payload: request
    }
        , (dispatch, getState) => {
            if (getState().reports.isChangedFile) {
                dispatch(generatePdf(organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, reportMessage))
            }
        }
    ]
}
const generatePdf = (organization, reportName, projectName, groupId, groupName, html, headerHTML, reportType, toc, id, reportMessage) => {
    let params = {
        hdnGridData: html, hdnFooter: escape(getFooterHTML()), hdnHeader: headerHTML, hdnReportName: reportName, groupId: groupId,
        organization: organization, projectName: projectName,
        hdnGroupName: groupName, reportType: reportType, tocLabels: (toc ? toc.TOCLabels : null), tocSearchText: toc ? toc.TOCSearchText : '',
    };
    let url = 'Pdf/GeneratePdf';

    const request = postPdfAxios(url, { params: params });
    return [
        (dispatch, getState) => {

            dispatch(changeMessagePdfNotification(reportMessage, id));
        }, {
            type: 'GET_REPORTS_PDF_DATA',
            payload: request
        }
        , (dispatch, getState) => {
            dispatch(hidePdfNotification(id)
            )
        }
    ]
}
export const getPdfFile = (fileUrl) => {
    counter++;
    let params = {fileUrl: fileUrl};
    let url = 'Pdf/GetPdfFile';

    const request = postPdfAxios(url, { params: params });
    return [ (dispatch, getState) => {
        dispatch(showPdfNotification(i18n.t('Downloading'), counter));},
        {
            type: 'GET_REPORTS_PDF_DATA',
            payload: request
        }, 
        (dispatch, getState) => { dispatch( hidePdfNotification(counter))}
        ]
}
export const getPdfReportLogs = (organization) => {
    counter++;
    var user = window.parent.email ? window.parent.email : '';
    var date = new Date();
    date.setDate(date.getUTCDate() - 7);
    let params = {
        organizationName: organization, actionName: 'GeneratePdf', dateStart: null, dateEnd: getUTCTimingLabel(date, 'YYYY-MM-DD'), locationType: 0, locationCode: "", logType: 5,
        locationRequired: false, user: user
    };
    let url = 'AppCenter/GetApplicationLog?';
    var contentKeys = Object.keys(params);
    _.map(contentKeys, (key) => {
        url += key + "=" + params[key] + "&";
    })
    url = url.substring(0, url.length - 1);
    const request = getAxios(url, { params: params });
    return [(dispatch, getState) => {

        dispatch(showPdfNotification(i18n.t('Loading'),counter));
    },
    {
        type: 'GET_REPORTS_PDF_LOG',
        payload: request
    }
        , (dispatch, getState) => {
            dispatch(hidePdfNotification(counter)
            )
        }
    ]
}
const api = axios.create({
    adapter: cache.adapter
});
export const getCookies = (c_name) => {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};

export const getPdfAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId'),
        connectionId: getLocalStorageKey('tabId') ? getLocalStorageKey('tabId') : AppConfig.env('connectionId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken),
        BrowserSessionId: ''/*getCookies('BrowserSessionId')*/,
        'JsMessageId': uuid.v4(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0',
        'elapsedTime': 0
    };
    url = AppConfig.pdfServiceUrl + url;
    var resp = api({
        method: 'get',
        url: url,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
        view: axiosRequestConfig.params.view ? axiosRequestConfig.params.view : null
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

var getUtcDate = function () {
    var dt = new Date();
    return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
};
export const postPdfAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        organizationId: getLocalStorageKey('organizationId') ? getLocalStorageKey('organizationId') : AppConfig.env('organizationId'),
        userId: getLocalStorageKey('userId') ? getLocalStorageKey('userId') : AppConfig.env('userId'),
        connectionId: getLocalStorageKey('tabId') ? getLocalStorageKey('tabId') : AppConfig.env('connectionId'),
        tokenId: getLocalStorageKey('tokenId') ? getLocalStorageKey('tokenId') : (privateSettings && privateSettings.AuthenticationToken),
        BrowserSessionId: ''/*getCookies('BrowserSessionId')*/,
        'JsMessageId': uuid.v4(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0',
        'elapsedTime': 0
    };
    url = AppConfig.pdfServiceUrl + url;
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
