import * as actionTypes from '../actions/actionTypes';
 import i18n from '../i18n';
import { isEmpty2 } from '../common/utils';

const NotifyReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_IDEAGROUP':
        case 'UPDATE_IDEAGROUP_DATA':
        case 'ADD_LINEITEM_VALUE_RAMP_DATA':
            if (!action.payload) return state;

            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), isCreation: false };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInSavingData'), isCreation: false };
            }
        case 'GET_IDEA_CUSTOMVIEW_DATA':
            //case 'GET_IDEA_DETAIL_DATA':
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Loading'), isCreation: false };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInLoadingData'), isCreation: false };
            }
        case 'ARRANGE_LINEITEMS':
        case 'ARRANGE_IMPLEMENTATION_LINEITEMS':
        case 'ARRANGE_MILESTONES':
        case 'ARRANGE_METRICS':
        case 'ARRANGE_LINEITEMS_DATA':
        case 'ARRANGE_IMPLEMENTATION_LINEITEMS_DATA':
        case 'ARRANGE_MILESTONES_DATA':
        case 'ARRANGE_METRICS_DATA':
            return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: false };

        case 'CREATE_IDEA_SCDECISION':
        case 'CREATE_IDEA_RECOMMENDATION':
        case 'CREATE_IDEA_SCMREVIEW':
        case 'CREATE_RISKRATING':
        case 'CREATE_RISKRATERS':
        case 'CREATE_LINKEDGROUP':
        case 'CREATE_ITLINKEDGROUP':
        case 'CREATE_PERSONNEL_LINEITEM':
        case 'CREATE_NONPERSONNEL_LINEITEM':
        case 'CREATE_REVENUE_LINEITEM':
        case 'CREATE_IDEA_SCDECISION_DATA':
        case 'CREATE_IDEA_RECOMMENDATION_DATA':
        case 'CREATE_IDEA_SCMREVIEW_DATA':
        case 'CREATE_RISKRATING_DATA':
        case 'CREATE_RISKRATERS_DATA':
        case 'CREATE_LINKEDGROUP_DATA':
        case 'CREATE_ITLINKEDGROUP_DATA':
        //case 'CREATE_PERSONNEL_LINEITEM_DATA':
        //case 'CREATE_NONPERSONNEL_LINEITEM_DATA':
        //case 'CREATE_REVENUE_LINEITEM_DATA':
        case 'UPDATE_IDEAGROUP_LINKEDGROUPSTATUS_DATA':
        case 'CREATE_ITCOSTINGGROUP_DATA':
        case 'UPDATE_IDEA_ITSTATUS_DATA':
            if (!action.payload.data || !action.payload) return state;

            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: true };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: true };
            }
        case 'CREATE_PERSONNEL_LINEITEM_IMPLEMENTATION':
        case 'CREATE_REVENUE_LINEITEM_IMPLEMENTATION':
        case 'CREATE_NONPERSONNEL_LINEITEM_IMPLEMENTATION':
        case 'CREATE_PERSONNEL_LINEITEM_IMPLEMENTATION_DATA':
        case 'CREATE_REVENUE_LINEITEM_IMPLEMENTATION_DATA':
        case 'CREATE_NONPERSONNEL_LINEITEM_IMPLEMENTATION_DATA':
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('LineItemCreatedSuccessfully'), isCreation: true };

        case 'UPDATE_IDEA_SCDECISION':
        case 'UPDATE_IDEA_RECOMMENDATION':
        case 'UPDATE_IDEA_SCMREVIEW':
        case 'UPDATE_RISKRATING':
        case 'UPDATE_PERSONNEL_LINEITEM':
        case 'UPDATE_NONPERSONNEL_LINEITEM':
        case 'UPDATE_REVENUE_LINEITEM':
        case 'UPDATE_IDEATEXTS':
        case 'UPDATE_IDEAGROUP_SCRATCHPAD':
        case 'UPDATE_IDEA':
        case 'UPDATE_MILESTONE':
        case 'UPDATE_METRIC':
        case 'UPDATE_MILESTONE_RESPONSIBLE_PARTY':
        case 'UPDATE_METRIC_RESPONSIBLE_PARTY':

        case 'UPDATE_IDEA_SCDECISION_DATA':
        case 'UPDATE_IDEA_RECOMMENDATION_DATA':
        case 'UPDATE_IDEA_SCMREVIEW_DATA':
        case 'UPDATE_RISKRATING_DATA':
        case 'UPDATE_PERSONNEL_LINEITEM_DATA':
        case 'UPDATE_NONPERSONNEL_LINEITEM_DATA':
        case 'UPDATE_REVENUE_LINEITEM_DATA':
        case 'UPDATE_IDEATEXTS_DATA':
        case 'UPDATE_IDEAGROUP_SCRATCHPAD_DATA':
        case 'UPDATE_IDEA_DATA':
        case 'UPDATE_MILESTONE_DATA':
        case 'UPDATE_METRIC_DATA':
        case 'UPDATE_MILESTONE_RESPONSIBLE_PARTY_DATA':
        case 'UPDATE_METRIC_RESPONSIBLE_PARTY_DATA':
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: false };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            }
        case 'DELETE_IDEAGROUP_DATA':
            if (action.payload.status === 204) {
                return { ...state, showNotification: true, message: i18n.t('Deleting'), savePending: false, isCreation: true };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInDeletingData'), savePending: false, isCreation: true };
            }
        case 'DELETE_ACCEPTED_IDEAGROUP_DATA':
        case 'REMOVE_ITCOSTINGGROUP_DATA':
            if (!action.payload.data || !action.payload) return state;
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Deleting'), savePending: false, isCreation: true };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInDeletingData'), savePending: false, isCreation: true };
            }
        case 'CREATE_IDEACUSTOMFIELD':

        case 'CREATE_IDEACUSTOMFIELD_DATA':
            if (!action.payload.data || !action.payload) return state;

            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: true };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: true };
            }
        case 'UPDATE_IDEACUSTOMFIELD':
        case 'UPDATE_IDEAGROUP_CUSTOMFIELD':

        case 'UPDATE_IDEACUSTOMFIELD_DATA':
        case 'UPDATE_IDEAGROUP_CUSTOMFIELD_DATA':
        case actionTypes.UPDATE_SESSION:
            if (!action.payload.data || !action.payload) return state;

            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: false };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            }
        case actionTypes.UPDATE_SESSION_IDEA:
        case actionTypes.BULK_UPDATE_SESSION_IDEA:
        case actionTypes.MOVE_BULK_SESSION_IDEAS:
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: false };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            }
        case actionTypes.DELETE_BULK_SESSION_IDEAS:
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Deleting'), savePending: false, isCreation: false };
            } else {
                return { ...state, showNotification: true, message: i18n.t('ErrorInDeletingingData'), savePending: false, isCreation: false };
            }
        case 'UPLOAD_ATTACHMENT':
        case 'UPLOAD_TASK_ATTACHMENT':
        case 'REPLACE_ATTACHMENT':
        case 'REPLACE_TASK_ATTACHMENT':

        case 'UPLOAD_ATTACHMENT_DATA':
        case 'UPLOAD_TASK_ATTACHMENT_DATA':
        case 'REPLACE_ATTACHMENT_DATA':
        case 'REPLACE_TASK_ATTACHMENT_DATA':
            if (!action.payload.data) return state;

            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInSavingDocument'), isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('DocumentSavedSuccessfully'), isCreation: false };
            }
        case actionTypes.UPLOAD_SCR_REPORT:
            if (!action.payload.data) return state;

            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInSavingSCR'), isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('SCRSavedSuccessfully'), isCreation: false };
            }
        case 'DELETE_ATTACHMENT':
        case 'DELETE_TASK_ATTACHMENT':

        case 'DELETE_ATTACHMENT_DATA':
        case 'DELETE_TASK_ATTACHMENT_DATA':

            if (!action.payload.data) return state;

            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInDeletingDocument'), isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('DocumentDeletedSuccessfully'), isCreation: false };
            }
        case actionTypes.DELETE_SCR_REPORT:
            if (!action.payload.data) return state;

            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInDeletingSCR'), isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('SCRDeletedSuccessfully'), isCreation: false };
            }
        case 'DOWNLOAD_ATTACHMENT':
        case 'DOWNLOAD_TASK_ATTACHMENT':

        case 'DOWNLOAD_ATTACHMENT_DATA':
        case 'DOWNLOAD_TASK_ATTACHMENT_DATA':
            var payload = action.payload.data;
            if (payload.FileContent === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInDownloadingDocument'), isCreation: false };
            } else {
                return { ...state, showNotification: false, showLong: false, message: i18n.t('Downloading'), isCreation: false };
            }
        case actionTypes.CREATE_GROUP:
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('GroupCreatedSuccessfully'), isCreation: true };
        case actionTypes.DELETE_GROUP:
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('GroupDeletedSuccessfully'), isCreation: true };
        case 'CREATE_METRIC':
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('MetricCreatedSuccessfully'), isCreation: true };
        case 'CREATE_MILESTONE':
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('MilestoneCreatedSuccessfully'), isCreation: true };
        case 'DELETE_MULTIPLE_MILESTONE':
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('Milestone(s)DeletedSuccessfully'), isCreation: false };
        case 'DELETE_MULTIPLE_METRIC':
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('Metric(s)DeletedSuccessfully'), isCreation: false };
        case actionTypes.CREATE_IDEA_SIMPLIFIED_EMPTY_IDEA:
        case 'CREATE_IDEA':
            if (!action.payload.data) return state;

            if (action.payload.data.Idea === null) {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInCreatingIdea'), isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 5, message: 'Idea ' + action.payload.data.Idea.IdeaNumber + ' successfully created', isCreation: true, itemCreated: true };
            }
        case 'CREATE_PERSONNEL_LINEITEM_DATA':
            if (!action.payload.data) return state;
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('PersonnelLineItemCreatedSuccessful'), isCreation: true, itemCreated: true };

        case 'CREATE_NONPERSONNEL_LINEITEM_DATA':
            if (!action.payload.data) return state;
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('NonPersonnelLineItemCreatedSuccessful'), isCreation: true, itemCreated: true };

        case 'CREATE_REVENUE_LINEITEM_DATA':
            if (!action.payload.data) return state;
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('RevenueLineItemCreatedSuccessful'), isCreation: true, itemCreated: true };

        case 'BULK_UPDATE_DATA':
        case 'REQUEST_BULK_ARCHIVE_IDEA_DATA':
        case 'REQUEST_BULK_SHARE_IDEA_DATA':
        case 'REQUEST_BULK_TRANSFER_IDEA_DATA':
        case 'UPDATE_HIGHLIGHTS_DATA':
        case 'BULK_TRANSFER_DATA':
        case 'BULK_UPDATE_IDEAGROUPS_DATA':
            if (!action.payload) return state;
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('ActionPerformedSuccessfully'), isCreation: true, itemCreated: true };

        // case 'IS_SHOW_INACTIVE_IDEA':
        //     return { ...state, showNotification: true, alertType: 5, message: (action.payload ? 'Now showing' : 'Now hiding') + ' inactive' + ' successfully' };
        // case 'IS_SHOW_HIGHLIGHTED_IDEA':
        //     return { ...state, showNotification: true, alertType: 5, message: (action.payload ? 'Now showing' : 'Now hiding') + ' idea highlighting' + ' successfully' };
        // case 'IS_SHOW_IDEA_RISK_DISTRIBUTION':
        //     return { ...state, showNotification: true, alertType: 5, message: (action.payload ? 'Now showing' : 'Now hiding') + ' idea risk distribution' + ' successfully' };
        case actionTypes.EXPORT_EXCEL:
            if (!action.payload.data) return state;

            if (action.payload.data.Idea === null) {
                return { ...state, showNotification: true, alertType: 3, isBulkAction: true, isCallBack: true, message: i18n.t('ErrorInExportingExcel'), isCreation: false };
            } else {
                if (action.payload.data.FileName.indexOf("Project Value Report") != -1) {
                    return { ...state, showNotification: true, isBulkAction: true, isCallBack: true, message: i18n.t('LoadingMessageExporting'), isCreation: false };
                } else {
                    return { ...state, showNotification: true, isBulkAction: true, isCallBack: true, message: i18n.t('Downloading'), isCreation: false };
                }
            }
        case 'STAR_UNSTAR_IDEA':
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            }
        case actionTypes.HIDE_NOTIFICATION:
        case actionTypes.GET_SHAREDANDTRANSFERED_IDEA_DATA:
        case 'GET_ARCHIVED_IDEADATA':
            return { ...state, showNotification: false, showLong: false, alertType: 1, message: '', savePending: false, isCallBack: false, isBulkAction: false, isCreation: false };
        case actionTypes.CALCULATE_CENTERDATA_CUBE:
        case actionTypes.CALCULATE_PERSONNEL_CUBE:
            const retStatus = action.payload.data;
            return { ...state, showNotification: retStatus !== 1, alertType: 1, showLong: true, message: action.message, isCreation: false, isBulkAction: false, isCreation: false };
        //return state;
        case 'SHOW_NOTIFICATION':
            return { ...state, showNotification: true, alertType: 1, message: action.message, isCreation: false };
        // case 'SHOW_PDF_NOTIFICATION':
        //     return {  showPdfNotification: true, id: action.id, alertType: 1, reportMessage: action.message, isCreation: false, isReport: true , isChangeMessage: false };
        // case  'CHANGE_MESSAGE_PDF_NOTIFICATION':
        //     return { showPdfNotification: true, isChangeMessage: true, id: action.id, alertType: 1, reportMessage: action.reportMessage, isCreation: false, isReport: true };
        // case 'HIDE_PDF_NOTIFICATION':
        //     return { ...state, showPdfNotification: false, id: action.id, alertType: 1, isCreation: false, isReport: true, isChangeMessage: false  };
        case actionTypes.SHOW_CREATE_NEW_ITEM_NOTIFICATION:
            return { ...state, showNotification: true, alertType: 5, message: action.message, isCreation: false, itemCreated: false };
        case 'SHOW_LONG_NOTIFICATION':
            return { ...state, showNotification: true, alertType: 1, showLong: true, message: action.message, isCreation: false };
        case 'SHOW_BULKACTION_NOTIFICATION':
            return { ...state, showNotification: true, alertType: 1, isBulkAction: true, message: action.message, isCreation: false };
        case 'EDITING_NOTIFICATION':
            return { ...state, showEditingNotification: action.showEditingNotification, alertType: 4, editingMessage: action.editingMessage, isCreation: false };
        case 'SHOW_LOADING_NOTIFICATION':
            return { ...state, showLoadingNotification: true, alertType: 1, loadingMessage: i18n.t('Loading'), isCreation: false };
        case 'SHOW_REPORT_NOTIFICATION':
            return { ...state, showReportNotification: true, alertType: 1, message: action.message, isCreation: true };
        case 'SHOW_PREPARING_NOTIFICATION':
            return { ...state, showLoadingNotification: true, alertType: 1, loadingMessage: i18n.t('ReportPreparingReportNotification'), isCreation: false };
        case 'GET_RISK_RATERS_EXPORT':
            return { ...state, showReportNotification: false, alertType: 1, lmessage: '', isCreation: false };
        case 'GET_MULTI_GROUP_IDEAS_EXPORT':
            return { ...state, showReportNotification: false, alertType: 1, lmessage: '', isCreation: false };

        case 'GET_IDEAEX2_DATA':
        case 'GET_IDEAS':
            if (action.payload.data) {
                return { ...state, showLoadingNotification: false, alertType: 1, loadingMessage: '', isCreation: false };
            }
        case 'HIDE_PRINT_NOTIFICATION':
            return { ...state, showLoadingNotification: false, alertType: 1, loadingMessage: '', isCreation: false };
        case 'SAVE_FOCUSAREA':
        case 'ARRANGE_FOCUSAREAS':
        case 'SAVE_FOCUSAREA_LEADERS':
        case 'ARRANGE_GROUPSUMMARY':
        case 'UPDATE_GROUP_PLANLOCK':
        case 'UPDATE_GROUP_IDEATIMINGENABLE':
            if (action.payload) {
                return { ...state, showNotification: true, message: i18n.t('Saving'), savePending: false, isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            }
        case 'DELETE_FOCUSAREA':
            if (!action.payload.data) return state;
            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInDeletingFocusArea'), isTranslate: true, isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('FocusAreaDeletedSuccessfully'), isTranslate: true, isCreation: false };
            }
        case actionTypes.DELETE_GROUPSUMMARYTEXT:
            if (!action.payload.data) return state;
            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInDeletingSummary'), isTranslate: true, isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('SummaryDeletedSuccessfully'), isTranslate: true, isCreation: false };
            }
        case actionTypes.DELETE_CUSTOMFIELD:
            if (!action.payload.data) return state;
            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInDeletingField'), isTranslate: true, isCreation: false };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('FieldDeletedSuccessfully'), isTranslate: true, isCreation: false };
            }
        case actionTypes.DELETE_ADMIN_USERS:
            if (!action.payload.data) return state;
            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInRemovingAdminUser'), isTranslate: true, isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('AdminUserRemovedSuccessfully'), isTranslate: true, isCreation: true };
            }
        case actionTypes.REMOVE_USER:
            if (!action.payload.data) return state;
            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInRemovingUser'), isTranslate: true, isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('UserRemovedSuccessfully'), isTranslate: true, isCreation: true };
            }

        // case actionTypes.INVITE_AUTH0_USER:
        //     if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
        //         return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('InvitationSentSuccessfully'), isTranslate: true, isCreation: true };
        //     } else {
        //         return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInSendingInvitation'), isTranslate: true, isCreation: true };
        //     }

        case actionTypes.CHANGE_AUTH0_USER_PASSWORD:
            if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
                return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('PasswordSavedSuccessfully'), isTranslate: true, isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInSavingPassword'), isTranslate: true, isCreation: true };
            }
        case actionTypes.SAVE_ADMIN_USERS:
            return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('UserSavedSuccessfully'), isTranslate: true, isCreation: true };
        // case actionTypes.CREATE_AUTH0_USER:
        //     if (action.payload && action.payload.data && !isEmpty2(action.payload.data)) {
        //         return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('UserCreatedSuccessfully'), isTranslate: true, isCreation: true };
        //     } else {
        //         return { ...state, showNotification: true, alertType: 3, showLong: false, message: i18n.t('ErrorInCreatingUser'), isTranslate: true, isCreation: true };
        //     }
        case actionTypes.ADD_USER:
            return { ...state, showNotification: true, alertType: 5, showLong: false, message: i18n.t('UserAddedSuccessfully'), isTranslate: true, isCreation: true };
        case actionTypes.CREATE_COST_CENTER:
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('CostCenterCreatedSuccessfully'), isCreation: true };
        case actionTypes.DELETE_COST_CENTER:
            return { ...state, showNotification: true, alertType: 5, message: i18n.t('CostCenter(s)DeletedSuccessfully'), isCreation: true };
        /* case 'SAVE_SALARY_RANGES':
            var data = JSON.parse(action.payload.config.data).salaryRanges.salaryRangeList;
            if (action.payload) {
                if (data[0].FieldName == undefined && data[0].FieldValue == undefined) {
                    return { ...state, showNotification: true, alertType: 5, message: i18n.t('PayrollBandSavedSuccessfully'), isCreation: true };
                } else {
                    return { ...state, showNotification: true, alertType: 5, message: i18n.t('PayrollBandUpdatedSuccessfully'), isCreation: true };
                }
            } else {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            }
        case 'DELETE_SALARY_RANGES':
            if (action.payload) {
                return { ...state, showNotification: true, alertType: 5, message: i18n.t('PayrollBandDeletedSuccessfully'), isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInSavingData'), savePending: false, isCreation: false };
            } */
        case actionTypes.CREATE_SESSION:
            if (!action.payload.data) return state;
            if (action.payload.data === null) {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInCreatingSession'), isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 5, message: i18n.t('SessionCreatedSuccessfully'), isCreation: true, itemCreated: true };
            }
        case actionTypes.CREATE_SESSION_IDEA:
            if (action.payload.data.Idea === null) {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInCreatingSessionIdea'), isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 5, message: i18n.t('SessionIdeaCreatedSuccessfully'), isCreation: true, itemCreated: true };
            }
        case actionTypes.DELETE_SESSION_IDEA:
            if (action.payload.data.Idea === null) {
                return { ...state, showNotification: true, alertType: 3, message: i18n.t('ErrorInDeletingSessionIdea'), isCreation: true };
            } else {
                return { ...state, showNotification: true, alertType: 5, message: i18n.t('SessionIdeaDeletedSuccessfully'), isCreation: true, itemCreated: true };
            }
        case 'CREATE_USER_NOTE':
            if (action.payload) {
                const resultCode = action.payload.data;
                let message = '';
                switch (resultCode) {
                    case 1:
                        message = 'InvalidReferenceErrorPrompt';
                        break;
                    case 2:
                        message = 'ReferenceNotFoundErrorPrompt';
                        break;
                    case 3:
                        message = 'NotesInsufficientPermissionErrorPrompt';
                        break;
                    case 4:
                        message = 'LinkedGroupNotAcceptedErrorPrompt';
                        break;
                    case -1: message = 'ErrorInSavingData';
                        break;
                }

                return { ...state, showNotesNotification: (message === '' ? false : true), alertType: message === '' ? 1 : 3, noteMessage: message };
            } else {
                return { ...state, showNotesNotification: true, alertType: 3, noteMessage: i18n.t('ErrorInSavingData') };
            }

        case 'UPDATE_USER_NOTE':
            if (action.payload) {
                const resultCode = action.payload.data;
                let message = '';
                switch (resultCode) {
                    case 1:
                        message = 'InvalidReferenceErrorPrompt';
                        break;
                    case 2:
                        message = 'ReferenceNotFoundErrorPrompt';
                        break;
                    case 3:
                        message = 'NotesInsufficientPermissionErrorPrompt';
                        break;
                    case -1: message = 'ErrorInSavingData';
                        break;
                }

                return { ...state, showNotesNotification: (message === '' ? false : false), alertType: (message === '' ? 1 : 3), noteMessage: message };
            } else {
                return { ...state, showNotesNotification: false, alertType: 3, noteMessage: i18n.t('ErrorInSavingData') };
            }

        case 'DELETE_USER_NOTE':
        case 'REMOVE_USER_REFERENCE_ITEM':
            if (action.payload) {
                return { ...state, showNotesNotification: false, alertType: 1, noteMessage: '' };
            } else {
                return { ...state, showNotesNotification: true, alertType: 3, noteMessage: i18n.t('ErrorInSavingData') };
            }
        case 'SHOW_NOTE_NOTIFICATION':
            return { ...state, showNotesNotification: true, alertType: action.alertType, noteMessage: action.message };

        case 'HIDE_NOTE_NOTIFICATION':
            return { ...state, showNotesNotification: false, alertType: 1, noteMessage: '' };
        default:
            return state;
    }
}

export default NotifyReducer;
