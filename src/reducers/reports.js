var download = require("downloadjs");

const reportsReducer = (state = [], action) => {
    switch (action.type) {
        
        case 'GET_REPORTS_PDF_DATA':
            var payload =action.payload && action.payload.data;
            if (payload && payload.FileContent &&  payload.FileContent !== null) {
                var dataUrl = 'data:' + payload.ContentType + ';base64,' + payload.FileContent;
                download(dataUrl, payload.FileName, payload.ContentType);
            } return state;
        case 'GET_GROUP_TIMESTAMP':
            var payload = action.payload.data;
            return { ...state, timeStamp: payload };
        case 'GET_REPORTS_PDF_CHECK_TIMESTAMP_DATA':
            var payload = action.payload.data;
            if (!payload.IsChangedFile) {
                var file=payload.ReportFile;
                var dataUrl = 'data:' + file.ContentType + ';base64,' + file.FileContent;
                download(dataUrl, file.FileName, file.ContentType);
            } 
            return { ...state, isChangedFile: payload.IsChangedFile };
        case 'GET_REPORTS_PDF_LOG':
            var payload = action.payload.data.Table;
            return { ...state, recentPdfData: payload };
        default: 
        return state;
    }
};

export default reportsReducer;
