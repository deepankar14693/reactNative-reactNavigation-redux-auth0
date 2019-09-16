const ReportNotifyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SHOW_PDF_NOTIFICATION':
        return {  showPdfNotification: true, id: action.id, alertType: 1, reportMessage: action.message, isCreation: false, isReport: true , isChangeMessage: false };
    case  'CHANGE_MESSAGE_PDF_NOTIFICATION':
        return { showPdfNotification: true, isChangeMessage: true, id: action.id, alertType: 1, reportMessage: action.reportMessage, isCreation: false, isReport: true };
    case 'HIDE_PDF_NOTIFICATION':
        return { ...state, showPdfNotification: false, id: action.id, alertType: 1, isCreation: false, isReport: true, isChangeMessage: false  };
        default:
        return state;
    }
}
export default ReportNotifyReducer;