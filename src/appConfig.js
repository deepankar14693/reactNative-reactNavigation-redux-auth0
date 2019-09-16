const getBaseUrl = () => {
    var _baseUrl = 'https://qa.vicicentral.com/apiv5201/'; //'/';
    var _isProdution = false ;// document.location.host.indexOf('vicicentral.com') !== -1;
    if (_isProdution) {
        _baseUrl = '/' + window.location.href.split('/')[3] + '/';
    }
    return _baseUrl;
};

const getAppBaseUrl = () => {
    var _baseUrl = '/';
    var _isProdution = false ;//document.location.host.indexOf('vicicentral.com') !== -1;
    if (_isProdution) {
        _baseUrl = '/' + window.location.href.split('/')[3] + '/';
    } else {
        //_baseUrl = window.location.protocol + '//' + window.location.host

        _baseUrl = 'https://qa.vicicentral.com/apiv5201/';
    }
    return _baseUrl;
};

const AppConfig = {
    appMode: 'mobileTest',//['pac', 'pac2', 'demo'].includes(window.location.host.replace('.vicicentral.com', '')) ? 'prod' : 'dev', // local or dev
    env: function (config) {
        if (this.appMode === 'prod') {
            return this.prod[config];
        }
        else if (this.appMode === 'dev') {
            return this.dev[config];
        }else if (this.appMode === 'mobileTest') {
            return this.mobileTest[config];
        } else {
            return this.local[config];
        }
    },
    defaultDashboardPhase: 1,
    refreshDataWaitingTime: 60000,
    renderWaitingTime: 1500,
    dashboardDebounceTime: 1500,
    textAutoSaveDelay: 4000, //in miliseconds
    callGroupWiseData: true,
    modifiedOnDateFormat: 'LLL',
    showRecentEdit: false,
    baseUrl: getBaseUrl(),
    appBaseUrl: getAppBaseUrl(),
    pdfServiceUrl: '',//window.location.host.indexOf('localhost') >= 0 ? 'http://localhost:55132/' : 'https://pdfqa.vicicentral.com/v12/',
    attachmentMaxSize: 20971520,//(in bytes = 20 MB)
    reduxLogger: true,
    axiosLogger: false,
    performanceLogger: false, //((window.parent && window.parent.IsSnapshotInstance) || (window.location.host.indexOf('localhost') >= 0)) ? false : true,
    slowNetworkWarning: false ,//window.location.host.indexOf('localhost') >= 0 ? false : true,
    slowDownloadThreshold: 200,//(window.parent && window.parent.slowDownloadThreshold) || 200, //Bytes per milliseconds
    slowNetworkThreshold: 1000, //(window.parent && window.parent.slowNetworkThreshold) || 1000, // milliseconds
    pageLoadTimeLogger: false, //((window.parent && window.parent.IsSnapshotInstance) || (window.location.host.indexOf('localhost') >= 0)) ? false : true,
    defaultGroupNumber: 100,
    defaultGroupNumberDifference: 1,
    enableDropDownKeyUpDown: false,
    auth0TokenId: 0,//(window.parent && typeof window.parent.getAuth0TokenId === 'function') ? window.parent.getAuth0TokenId() : '',
    local: {
        deviceType: 'desktop', // 'desktop', 'mobile'
        url: '',//(window.parent && window.parent.apiUrl) ? window.parent.apiUrl : 'http://localhost:59435/',
        //auth0Url: 'https://auth0mgmt.vicicentral.com/',
        auth0Url: 'http://localhost:3001/',
        organizationId: 'AD663F6D-2BD6-C538-AA56-ED3F4E9E915E', //QA => 'AD663F6D-2BD6-C538-AA56-ED3F4E9E915E', Demo => '088615BD-5FB6-46EA-B072-3A9FD7CF690A'
        //groupId: '7b4a2d44-d6ba-4fef-93e9-58203628699d',// TechOp
        // groupId: '3f64eaa5-a27c-46aa-8943-78fd9ff8b621',// ITCost
        // groupId: '6d937f4e-b847-471d-a215-b13153f11ee0',// IndSls
        // groupId: '1598a11d-6837-41a0-863b-b3597fd36777',// Growth
        //groupId: '282837a9-cb33-463d-a5f2-b362eba654d4',// G&A
        // groupId: '181796c0-0289-468e-9fde-d049025b3d84',// Price
        // groupId: '35fff390-64d6-4427-9064-dc16d79bce67',// Prcrmt
        // groupId: '00000000-0000-0000-0000-000000000000',//Company
        //groupId: 'cf86013d-b035-4ac2-8b04-f69e42e8ec4e',// DirSls
        groupId: '',
        userId: 'cf1388b4-fe3f-46eb-8d7b-9c86133e597d',
        //userId: '244ce904-174b-4270-82a5-be32956768b2',//IT User
        connectionId: '20A8ED79-831F-4E3A-954C-B6D2601C6122',
        showTabOpenEditMassage: true
    },
    dev: {
        deviceType: 'desktop',
        url: 'https://qa.vicicentral.com/apiv5201/',
        auth0Url: 'https://auth0mgmt.vicicentral.com/',
        organizationId: '',
        groupId: '',
        userId: '',
        connectionId: '',
        showTabOpenEditMassage: true
    },
    prod: {
        deviceType: 'desktop',
        url: '', //window.parent.apiUrl,
        auth0Url: 'https://auth0mgmt.vicicentral.com/',
        organizationId: '',
        groupId: '',
        userId: '',
        connectionId: '',
        showTabOpenEditMassage: true
    },
    mobileTest: {
        deviceType: 'mobile',
        url: 'https://qa.vicicentral.com/apiv5201/', // window.parent.apiUrl,
      //  auth0Url: 'https://auth0mgmt.vicicentral.com/',
        organizationId: 'AD663F6D-2BD6-C538-AA56-ED3F4E9E915E',
        groupId: 'd7fedc8a-ba7f-8c92-1b47-2f3cc5081ddc',
        userId:'1117e8a0-22d5-4e03-9a74-8a7eb6201cea',
        tokenId:'853661C9-11CD-4388-86B5-B399B515B069',
        projectId:'3f3bfed1-aa59-40a5-83c7-720707742df6',
        connectionId: 'cf1388b4-fe3f-46eb-8d7b-9c86133e597d',
        showTabOpenEditMassage: true

    }
}

export default AppConfig;
