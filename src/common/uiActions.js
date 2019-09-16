import { logUIActions } from '../actions/axiosActions';
import { StartMenu, IdeasMenu, PlanningMenu, TrackingMenu, MajorMenu } from './menuTypes';

export const Path = {
    Start: '/Start',
    StartSimplified: '/Start/Simplified',
    StartIdeaGeneration: '/Start/IdeaGeneration',
    StartFocusAreas: '/Start/FocusAreas',
    StartFunctionalTitles: '/Start/FunctionalTitles',
    StartBaselineCube: '/Start/BaselineCube',
    StartReports: '/Start/Reports',

    Ideas: '/Ideas',
    IdeasDashboard: '/Ideas/Dashboard',
    IdeasComprehensive: '/Ideas/Comprehensive',
    IdeasCustom: '/Ideas/Custom',
    IdeasSimplified: '/Ideas/Simplified',
    IdeasIdeaGeneration: '/Ideas/IdeaGeneration',
    IdeasSCR: '/Ideas/SCR',
    IdeasResolveReview: '/Ideas/ResolveReview',
    IdeasReports: '/Ideas/Reports',

    Planning: '/Planning',
    PlanningDashboard: '/Planning/Dashboard',
    PlanningComprehensive: '/Planning/Comprehensive',
    PlanningIdeas: '/Planning/Ideas',
    PlanningLineItems: '/Planning/LineItems',
    PlanningMetrics: '/Planning/Metrics',
    PlanningMilestones: '/Planning/Milestones',
    PlanningReports: '/Planning/Reports',

    Tracking: '/Tracking',
    TrackingDashboard: '/Tracking/Dashboard',
    TrackingComprehensive: '/Tracking/Comprehensive',
    TrackingIdeas: '/Tracking/Ideas',
    TrackingLineItems: '/Tracking/LineItems',
    TrackingMetrics: '/Tracking/Metrics',
    TrackingMilestones: '/Tracking/Milestones',
    TrackingReports: '/Tracking/Reports',

    Org: '/Org',
    
    Calendar: '/Calendar',
    CalendarWeekly: '/Calendar/WeeklyTasks',
    CalendarList: '/Calendar/TaskList',
    CalendarManage: '/Calendar/ManageTasks',

    Dashboard: '/Dashboard',
    DashboardSummary: '/Dashboard/Summary',
    DashboardResolveReview: '/Dashboard/ResolveReview',
    DashboardSCRReport: '/Dashboard/SCRReport',
    IdeasComprehensive: '/Ideas/Comprehensive',
    Simplified: '/Ideas/Simplified',
    IdeaGeneration: '/Ideas/IdeaGeneration',
    IdeasCustom: '/Ideas/Custom',
    Tasks: '/Calendar',
    TasksWeekly: '/Calendar/WeeklyTasks',
    TasksList: '/Calendar/TaskList',
    TasksManage: '/Calendar/ManageTasks',
    Reports: '/Reports',
    Implementation: '/Implementation',
    ImplementationComprehensive: '/Implementation/Comprehensive',
    ImplementationIdeas: '/Implementation/Ideas',
    ImplementationLineItems: '/Implementation/LineItems',
    ImplementationMetrics: '/Implementation/Metrics',
    ImplementationMilestones: '/Implementation/Milestones',
    AppStatsPerformance: '/AppStats/Performance',
    AppStatsAppLog: '/AppStats/AppLog',
    AppStatsConnectionLog: '/AppStats/ConnectionLog',
};

export const Events = {
    Clicked: 'Clicked',
    Checked: 'Checked',
    UnChecked: 'UnChecked',
    Selected: 'Selected',
    Expanded: 'Expanded',
    Collapsed: 'Collapsed',
    On: 'On',
    Off: 'Off',
};

export const Names = {
    Start: 'Start',
    Ideas: 'Ideas',
    Planning: 'Planning',
    Tracking: 'Tracking',
    Tasks: 'Calendar',
    All: 'All',
    Rough: 'Rough',
    Detailed: 'Detailed',
    Go: 'Go',
    NoGo: 'NoGo',
    NoRecommendation: 'NoRecommendation',
    NoDecision: 'NoDecision',
    TripleDot: '.../',
    Sessions: 'GroupAdmin/Sessions',
    FocusArea: 'GroupAdmin/FocusAreas',
    GroupSummary: 'GroupAdmin/GroupSummary',
    Leadership: 'GroupAdmin/Leadership',
    GroupDefinedFields: 'GroupAdmin/GroupDefinedFields',
    GroupSCRManager: 'GroupAdmin/SCRManager',
    Settings: 'GroupAdmin/Settings',
    NonPersonnelRevenue: 'Baseline/Non-Personnel/Revenue',
    NonPersonnel: 'Baseline/Non-Personnel',
    Personnel: 'Baseline/Personnel',
    Summary: 'Baseline/Summary',
    AssignFunctionalTitles: 'Baseline/AssignFunctionalTitles',
    Revenue: 'Baseline/Revenue',
    ClientSettings: 'Admin/ClientSettings',
    Groups: 'Admin/Groups',
    SCRManager: 'Admin/SCRManager',
    ProjectValueReport: 'Admin/ProjectValueReport',
    Users: 'UserAdmin/Users',
    AdminUsers: 'UserAdmin/AdminUsers',
    UserPermissions: 'UserAdmin/UserPermissions',
    Connections: 'UserAdmin/Connections',
    CompRanges: 'ViciAdmin/CompRanges',
    ProjectDefinedFields: 'ViciAdmin/ProjectDefinedFields',
    RolePermissions: 'ViciAdmin/RolePermissions',
    BaselineData: 'ViciAdmin/BaselineData',
    AppStats: 'ViciAdmin/AppStats',
    ProjectSettings: 'Admin/ProjectSettings',
};


export const Components = {
    Close: 'btnClose',
    CancelFilter: 'CancelFilter',
    MajorMenu: 'Menu',
    MinorMenu: 'Menu',
    BoxDetailsButton: 'BoxDetailsButton',
    BoxViewIdeasButton: 'BoxViewIdeasButton',
    ResolveTab: 'ResolveTab',
    ReviewTab: 'ReviewTab',
    PlanningTab: 'PlanningTab',
    TrackingTab: 'TrackingTab',
    CostCentersTab: 'CostCentersTab',
    CategoriesTab: 'CategoriesTab',
    FinanceDataTab: 'FinanceDataTab',
    HRDataTab: 'HRDataTab',
    DetailsLink: 'DetailsLink',
    PhaseDropdown: 'PhaseDropdown',
    GroupDropdown: 'GroupDropdown',
    SCRDropdown: 'SCRDropdown',
    GoToLink: 'GoToLink',
    NextButton: 'NextButton',
    PreviousButton: 'PreviousButton',
    ViewIdeasLink: 'ViewIdeasLink',
    ViewIssuesLink: 'ViewIssuesLink',
    ViewInBaselineLink: 'ViewInBaselineLink',
    Filter: 'Filter',
    DownloadExcelButton: 'DownloadExcelButton',
    DownloadPDFButton: 'DownloadPDFButton',
    DetailDialogCloseButton: 'DetailDialogCloseButton',
    DialogLinkCloseButton: 'DialogLinkCloseButton',
    VarianceDetailsLink: 'VarianceDetailsLink',
    VarianceDialogCloseButton: 'VarianceDialogCloseButton',
    AddNewIdea: 'AddNewIdea',
    MoveIdea: 'MoveIdea',
    MyNotes: 'MyNotes',
    AddNotes: 'AddNotes',
    FilterNotes: 'FilterNotes',
    SortNotes: 'SortNotes',
    NotesQuickView: 'Notes/QuickView',
    AdvancedSearchQuickView: 'AdvancedSearch/AdvancedSearchQuickView',
    NotesGoToIdea: 'Notes/GoToIdea',
    AdvancedSearchGoToIdea: 'AdvancedSearch/AdvancedSearchGoToIdea',
    UserNoteArchiveDeleteConfirmModal: 'UserNoteArchiveDeleteConfirmModal',
    CloseUserNoteArchiveDeleteConfirmModal: 'CloseUserNoteArchiveDeleteConfirmModal',
    DialogCreateIdeaAddExit: 'DialogCreateIdeaAddExit',
    DialogCreateAndAddAnotherIdea: 'DialogCreateAndAddAnotherIdea',
    FilterIdeas: 'FilterIdeas',
    ChangeTiming: 'ChangeTiming',
    ApplySCRSort: 'ApplySCRSort',
    More: 'More',
    IdeaTab: "IdeaTab",
    CustomizeTable: 'CustomizeTable',
    EditAndOrderFocusAreas: "EditAndOrderFocusAreasLink",
    DialogAddNewIdeaClose: 'DialogAddNewIdeaClose',
    IdeaListPDFExport: 'IdeaListPDFExport',
    IdeaListExcelExport: 'IdeaListExcelExport',
    Export: 'Export',
    AddNewLineItem: 'AddNewLineItem',
    AddNewMetric: 'AddNewMetric',
    AddNewMilestone: 'AddNewMilestone',
    DialogAddNewLineItemClose: 'DialogAddNewLineItemClose',
    DialogAddNewMetricClose: 'DialogAddNewMetricClose',
    DialogAddNewMilestoneClose: 'DialogAddNewMilestoneClose',
    DialogCreateLineItemAddExit: 'DialogCreateLineItemAddExit',
    DialogCreateAndAddAnotherLineItem: 'DialogCreateAndAddAnotherLineItem',
    DialogCreateMetricAddExit: 'DialogCreateMetricAddExit',
    DialogCreateAndAddAnotherMetric: 'DialogCreateAndAddAnotherMetric',
    DialogCreateMilestoneAddExit: 'DialogCreateMilestoneAddExit',
    DialogCreateAndAddAnotherMilestone: 'DialogCreateAndAddAnotherMilestone',
    DialogMoveIdeaClose: 'DialogMoveIdeaClose',
    Delete: 'Delete',
    DeleteSelectedIdea: 'DeleteSelectedIdea',
    DialogDeleteSelectedIdeaClose: 'DialogDeleteSelectedIdeaClose',
    DialogMyNotesClose: 'DialogMyNotesClose',
    IncludeArchivedIdeas: 'IncludeArchivedIdeas',
    PromptConfirmButton: 'PromptConfirmButton',
    PromptCloseButton: 'PromptCloseButton',
    UploadSCRButton: 'UploadSCRButton',
    DialogUploadSCRButton: 'DialogUploadSCRButton',
    DialogUploadSCRCloseButton: 'DialogUploadSCRCloseButton',
    DownloadSCRButton: 'DownloadSCRButton',
    DeleteSCRButton: 'DeleteSCRButton',
    LockReportsButton: 'LockReportsButton',
    UnLockReportsButton: 'UnLockReportsButton',
    OrderGroupsButton: 'OrderGroupsButton',
    DialogOrderGroupsDoneButton: 'DialogOrderGroupsDoneButton',
    DialogOrderGroupsCloseButton: 'DialogOrderGroupsCloseButton',
    AdvancedSearchDialog: 'AdvancedSearchDialog',
    CloseAdvancedSearchDialog: 'CloseAdvancedSearchDialog',
    SearchAdvancedSearch: 'SearchAdvancedSearch',
    ResetAdvancedSearch: 'ResetAdvancedSearch',
};


export const logClickActions = (view, activeMajorMenu) => {
    let path = '';
    let component = '';
    let name = '';
    let action = '';
    if (activeMajorMenu === MajorMenu.START) {
        switch (view) {
            case StartMenu.SIMPLIFIED:
                path = Path.StartSimplified;
                component = Components.MinorMenu;
                name = Names.Start + "/Simplified";
                action = Events.Clicked;
                break;
            case StartMenu.IDEAGENERATION:
                path = Path.StartIdeaGeneration;
                component = Components.MinorMenu;
                name = Names.Start + "/IdeaGeneration";
                action = Events.Clicked;
                break;
            case StartMenu.FOCUSAREAS:
                path = Path.StartFocusAreas;
                component = Components.MinorMenu;
                name = Names.Start + "/FocusAreas";
                action = Events.Clicked;
                break;
            case StartMenu.FUNCTIONALTITLES:
                path = Path.StartFunctionalTitles;
                component = Components.MinorMenu;
                name = Names.Start + "/FunctionalTitles";
                action = Events.Clicked;
                break;
            case StartMenu.BASELINECUBE:
                path = Path.StartBaselineCube;
                component = Components.MinorMenu;
                name = Names.Start + "/BaselineCube";
                action = Events.Clicked;
                break;
            case StartMenu.REPORTS:
                path = Path.StartReports;
                component = Components.MinorMenu;
                name = Names.Start + "/Reports";
                action = Events.Clicked;
                break;
            default:
                break;
        }
    }

    if (activeMajorMenu === MajorMenu.IDEAS) {
        switch (view) {
            case IdeasMenu.DASHBOARD:
                path = Path.IdeasDashboard;
                component = Components.MinorMenu;
                name = Names.Ideas + "/Dashboard";
                action = Events.Clicked;
                break;
            case IdeasMenu.COMPREHENSIVE:
                path = Path.IdeasComprehensive;
                component = Components.MinorMenu;
                name = Names.Ideas + "/Comprehensive";
                action = Events.Clicked;
                break;
            case IdeasMenu.CUSTOM:
                path = Path.IdeasCustom;
                component = Components.MinorMenu;
                name = Names.Ideas + "/Custom";
                action = Events.Clicked;
                break;
            case IdeasMenu.Simplified:
                path = Path.IdeasSimplified;
                component = Components.MinorMenu;
                name = Names.Ideas + "/Simplified";
                action = Events.Clicked;
                break;
            case IdeasMenu.IDEAGENERATION:
                path = Path.IdeasIdeaGeneration;
                component = Components.MinorMenu;
                name = Names.Ideas + "/IdeaGeneration";
                action = Events.Clicked;
                break;
            case IdeasMenu.SCR:
                path = Path.IdeasSCR;
                component = Components.MinorMenu;
                name = Names.Ideas + "/SCR";
                action = Events.Clicked;
                break;
            case IdeasMenu.RESOLVEREVIEW:
                path = Path.IdeasResolveReview;
                component = Components.MinorMenu;
                name = Names.Ideas + "/ResolveReview";
                action = Events.Clicked;
                break;
            case IdeasMenu.REPORTS:
                path = Path.IdeasReports;
                component = Components.MinorMenu;
                name = Names.Ideas + "/Reports";
                action = Events.Clicked;
                break;
            default:
                break;
        }
    }

    if (activeMajorMenu === MajorMenu.PLANNING) {
        switch (view) {
            case PlanningMenu.DASHBOARD:
                path = Path.PlanningDashboard;
                component = Components.MinorMenu;
                name = Names.Planning + "/Dashboard";
                action = Events.Clicked;
                break;
            case PlanningMenu.COMPREHENSIVE:
                path = Path.PlanningComprehensive;
                component = Components.MinorMenu;
                name = Names.Planning + "/Comprehensive";
                action = Events.Clicked;
                break;
            case PlanningMenu.IDEAS:
                path = Path.PlanningIdeas;
                component = Components.MinorMenu;
                name = Names.Planning + "/Ideas";
                action = Events.Clicked;
                break;
            case PlanningMenu.LINEITEMS:
                path = Path.PlanningLineItems;
                component = Components.MinorMenu;
                name = Names.Planning + "/LineItems";
                action = Events.Clicked;
                break;
            case PlanningMenu.METRICS:
                path = Path.PlanningMetrics;
                component = Components.MinorMenu;
                name = Names.Planning + "/Metrics";
                action = Events.Clicked;
                break;
            case PlanningMenu.MILESTONES:
                path = Path.PlanningMilestones;
                component = Components.MinorMenu;
                name = Names.Planning + "/Milestones";
                action = Events.Clicked;
                break;
            case PlanningMenu.REPORTS:
                path = Path.PlanningReports;
                component = Components.MinorMenu;
                name = Names.Planning + "/Reports";
                action = Events.Clicked;
                break;

            default:
                break;
        }
    }

    if (activeMajorMenu === MajorMenu.TRACKING) {
        switch (view) {
            case TrackingMenu.DASHBOARD:
                path = Path.TrackingDashboard;
                component = Components.MinorMenu;
                name = Names.Tracking + "/Dashboard";
                action = Events.Clicked;
                break;
            case TrackingMenu.COMPREHENSIVE:
                path = Path.TrackingComprehensive;
                component = Components.MinorMenu;
                name = Names.Tracking + "/Comprehensive";
                action = Events.Clicked;
                break;
            case TrackingMenu.IDEAS:
                path = Path.TrackingIdeas;
                component = Components.MinorMenu;
                name = Names.Tracking + "/Ideas";
                action = Events.Clicked;
                break;
            case TrackingMenu.LINEITEMS:
                path = Path.TrackingLineItems;
                component = Components.MinorMenu;
                name = Names.Tracking + "/LineItems";
                action = Events.Clicked;
                break;
            case TrackingMenu.METRICS:
                path = Path.TrackingMetrics;
                component = Components.MinorMenu;
                name = Names.Tracking + "/Metrics";
                action = Events.Clicked;
                break;
            case TrackingMenu.MILESTONES:
                path = Path.TrackingMilestones;
                component = Components.MinorMenu;
                name = Names.Tracking + "/Milestones";
                action = Events.Clicked;
                break;
            case TrackingMenu.REPORTS:
                path = Path.TrackingReports;
                component = Components.MinorMenu;
                name = Names.Tracking + "/Reports";
                action = Events.Clicked;
                break;

            default:
                break;
        }
    }

    logUIActions(path, component, name, action);
}
