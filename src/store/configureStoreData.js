import AppConfig from '../appConfig';
import { getLocalStorageKey, getLastProjectId } from '../common/utils';

export const organizationMasterData = {
    isLoading: true, showProject: false, projectConfig: [], config: [], projects: []
};

export const masterData = {
    isLoading: true, groups: [], teams: [], focusAreas: [], crossGroupTopics: [], users: [], salaryRange: [], projectConfig: [], config: [], category: [], timings: [], customFields: [], functionalTitles: [],
    leaderShip: [], leaderShipArray: [], roles: [], sessions: [], userNoteTimestamp: null, snapshotTime: null, IsSnapshotInstance: false, focusAreaUsageCount: 0, isLoadingFocusAreaUsageCount: false
};

export const advancedSearchData = {
    ideaResult: {
        ideaData: [],
        ideaSearchState: '',
        ideaGroupState: [],
        ideaItemState: [],
        ideaFieldState: []
    },
    goIdeaResult: {
        goIdeaData: [],
        goIdeaSearchState: '',
        goIdeaGroupState: [],
        goIdeaItemState: [],
        goIdeaFieldState: []
    },
    isLoading: false
}

export const permissionsData = () => {
    return {
        isLoading: true, rolePermissions: {}, userPermissions: {}, userGroups: {}, userProjects: {}, isCompanyPermission: false, companyPermissionType: 0
    }
};

export const sessionsData = {
    isLoading: true, sessions: []
};

export const timingScenarioData = {
    isLoading: true, timingScenarios: []
};

export const dashboardFilter = () => {
    return {
        currentFilter: { filterArray: [], ideas: [], ideaIds: [] }, phase: AppConfig.defaultDashboardPhase, currentTaskWeekNumber: null,
        valueType: '1', recommendationType: '1', decisionType: '1'
    }
};

export const dahboardData = {
    data: [], details: [], details2: [], baselineData: [], proformaDetails: [], valueComponentDetails: [],
    multiGroupIdeasDetails: [], fteDetails: [], ideasWithVarianceData: []
};

export const lineItemMonthlyValueData = {
    isLoading: true,
    lineItemMonthlyValues: []
};

export const tasks = { isLoading: true, tasks: [], weeks: [] };

export const taskCategory = { isLoading: true, category: [], weeks: [] };

export const ideaData = {
    crossGroupTopics: [],
    ideas: [],
    openIdeas: [],
    ideaGroups: [],
    ideaTeams: [],
    ideaCrossGroupTopics: [],
    ideaNonPersonnelLineItems: [],
    ideaPersonnelLineItems: [],
    ideaRevenueLineItems: [],
    ideaRiskRatings: [],
    ideaRecommendations: [],
    ideaSCDecisions: [],
    ideaSCMReviews: [],
    ideaCustomFields: [],
    teams: [],
    tranferredIdeas: [],
    milestones: [],
    metrics: [],
    isLoading: true,
    isDashboardLoading: true,
    isImplementationDataLoading: true
};

export const sessionIdeaData = {
    sessionIdeas: [],
    isLoading: true
};

export const timeScenarioProformaData = {
    proformaData: { IdeaMonthlyValues: [], LineItemMonthlyValues: [] },
    timingScenarioCurrentPage: 1,
    timingScenarioDraggedAxis: { x: 0, y: 0 },
    isLoading: true
};

export const notesData = {
    isLoading: true, userNotes: [], renderedIdeaNumbers: [], draggedAxis: { x: 0, y: 0 },
    isShowingMyNotes: getLocalStorageKey("isShowingMyNotes") !== null ? getLocalStorageKey("isShowingMyNotes") === "true" ? true : false : false,
    expandedIdeaNumber: null,
    notes: {
        sortColumn: getLocalStorageKey("notesSortColumn") !== null ? getLocalStorageKey("notesSortColumn") : '',
        sortAscending: getLocalStorageKey("notesSortAscending") !== null ? getLocalStorageKey("notesSortAscending") === "true" ? true : false : undefined,
        sortingOn: getLocalStorageKey("notesSortingOn") !== null ? getLocalStorageKey("notesSortingOn") : ''
    }
};

export const completionTracker = {
    isLoading: true, isTrackingLoading: true, planningDashboard: [], trackingDashboard: [], trackingDashboardVariance: [], planningDashboardVariance: []
};

export const adminData = {
    groups: [], groupHistory: [], compRanges: [], projectDefinedFields: [], roles: [],
    rolePermissions: [], clientSettings: [], projectValueReport: [], baselineUploadHistory: [],
    baselineData: { isLoading: true, CenterMap: [], CategoryMap: [], Categories: [], FinanceData: [], HrData: [], OrgUsers: [], projectConfigHistory: [] }
};

export const userAdminData = {
    auth0PasswordUser: '', auth0InvitedUsers: [], auth0NewUser: null, isLoading: false, users: [], adminUsers: [], userPermissions: { Users: [], OrgElements: [], OrgElementsTreeData: {}, Roles: [], permissionView: 1, permissionType: 1 }, connections: [], userHistory: []
};

export const baseline = {
    functionalTitleMapper: { isLoading: true, functionalTitleMapperData: { FunctionalTitleMap: [], FunctionalTitles: [], Personnel: [] } }
};

export const ideaGroupFilter = {
    relativeOpenedIdeaToNote: null,
    deviceType: null,
    projectId: getLastProjectId(),
    groupId: null,
    isTransferModalOpen: false,
    isMultiGroupIdeasModalOpen: false,
    shouldCreatedNewIdea: false,
    isGroupChanged: false,
    singleRowForMultigroupIdea: getLocalStorageKey("singleRowForMultigroupIdea") !== null ? (getLocalStorageKey("singleRowForMultigroupIdea") === 'false' ? false : true) : false,
    implementationLineItemViewCustomizationView: getLocalStorageKey("implementationLineItemViewCustomizationView") !== null ? getLocalStorageKey("implementationLineItemViewCustomizationView") : 'PlanAndActual',
    ideaView: getLocalStorageKey("ideaView") !== null ? getLocalStorageKey("ideaView") : 'ideas',
    isIdeaReadOnly: getLocalStorageKey("ideaView") === null ? false : (getLocalStorageKey("ideaView") === 'CompanyView' ? true : false),
    showCompletedImplementationIdeas: getLocalStorageKey("showCompletedImplementationIdeas") !== null ? (getLocalStorageKey("showCompletedImplementationIdeas") === 'false' ? false : true) : true,
    defaultView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaDefaultView") !== null ? getLocalStorageKey("isShowInactiveIdeaDefaultView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaDefaultView") !== null ? getLocalStorageKey("isShowHighlightedIdeaDefaultView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageDefaultView1') ? getLocalStorageKey('recordsPerPageDefaultView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionDefaultView") !== null ? getLocalStorageKey("isShowRiskDistributionDefaultView") === 'true' ? true : false : true,
    },
    customView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaCustomView") !== null ? getLocalStorageKey("isShowInactiveIdeaCustomView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaCustomView") !== null ? getLocalStorageKey("isShowHighlightedIdeaCustomView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageCustomView1') ? getLocalStorageKey('recordsPerPageCustomView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionIdeaCustomView") !== null ? getLocalStorageKey("isShowRiskDistributionIdeaCustomView") === 'true' ? true : false : true,
    },
    ideaGenrationView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaIdeaGenrationView") !== null ? getLocalStorageKey("isShowInactiveIdeaIdeaGenrationView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaIdeaGenrationView") !== null ? getLocalStorageKey("isShowHighlightedIdeaIdeaGenrationView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageIdeaGenrationView1') ? getLocalStorageKey('recordsPerPageIdeaGenrationView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionIdeaGenrationView") !== null ? getLocalStorageKey("isShowRiskDistributionIdeaGenrationView") === 'true' ? true : false : true,
    },
    archiveView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaArchiveView") !== null ? getLocalStorageKey("isShowInactiveIdeaArchiveView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaArchiveView") !== null ? getLocalStorageKey("isShowHighlightedIdeaArchiveView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageArchiveView1') ? getLocalStorageKey('recordsPerPageArchiveView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionArchiveView") !== null ? getLocalStorageKey("isShowRiskDistributionArchiveView") === 'true' ? true : false : true,
    },
    archivePendingView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaArchivePendingView") !== null ? getLocalStorageKey("isShowInactiveIdeaArchivePendingView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaArchivePendingView") !== null ? getLocalStorageKey("isShowHighlightedIdeaArchivePendingView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageArchivePendingView1') ? getLocalStorageKey('recordsPerPageArchivePendingView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionArchivePendingView") !== null ? getLocalStorageKey("isShowRiskDistributionArchivePendingView") === 'true' ? true : false : true,
    },
    ideasForAcceptanceView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaIdeasForAcceptanceView") !== null ? getLocalStorageKey("isShowInactiveIdeaIdeasForAcceptanceView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaIdeasForAcceptanceView") !== null ? getLocalStorageKey("isShowHighlightedIdeaIdeasForAcceptanceView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageIdeasForAcceptanceView1') ? getLocalStorageKey('recordsPerPageIdeasForAcceptanceView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionIdeasForAcceptanceView") !== null ? getLocalStorageKey("isShowRiskDistributionIdeasForAcceptanceView") === 'true' ? true : false : true,
    },
    ideasSentForAcceptanceView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaIdeasSentForAcceptanceView") !== null ? getLocalStorageKey("isShowInactiveIdeaIdeasSentForAcceptanceView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaIdeasSentForAcceptanceView") !== null ? getLocalStorageKey("isShowHighlightedIdeaIdeasSentForAcceptanceView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageIdeasSentForAcceptanceView1') ? getLocalStorageKey('recordsPerPageIdeasSentForAcceptanceView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionIdeasSentForAcceptanceView") !== null ? getLocalStorageKey("isShowRiskDistributionIdeasSentForAcceptanceView") === 'true' ? true : false : true,
    },
    planningView: {
        isShowInactiveIdea: true,//getLocalStorageKey("isShowInactiveIdeaPlanningView") !== null ? getLocalStorageKey("isShowInactiveIdeaPlanningView") === 'true' ? true : false : true,
        isShowHighlightedIdea: false,//getLocalStorageKey("isShowHighlightedIdeaPlanningView") !== null ? getLocalStorageKey("isShowHighlightedIdeaPlanningView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPagePlanningView1') ? getLocalStorageKey('recordsPerPagePlanningView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionPlanningView") !== null ? getLocalStorageKey("isShowRiskDistributionPlanningView") === 'true' ? true : false : true,
    },
    trackingView: {
        isShowInactiveIdea: true,//getLocalStorageKey("isShowInactiveIdeaTrackingView") !== null ? getLocalStorageKey("isShowInactiveIdeaTrackingView") === 'true' ? true : false : true,
        isShowHighlightedIdea: false,//getLocalStorageKey("isShowHighlightedIdeaTrackingView") !== null ? getLocalStorageKey("isShowHighlightedIdeaTrackingView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageTrackingView1') ? getLocalStorageKey('recordsPerPageTrackingView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionTrackingView") !== null ? getLocalStorageKey("isShowRiskDistributionTrackingView") === 'true' ? true : false : true,
    },
    implementationCustomView: {
        isShowInactiveIdea: true,//getLocalStorageKey("isShowInactiveIdeaImplementationCustomView") !== null ? getLocalStorageKey("isShowInactiveIdeaImplementationCustomView") === 'true' ? true : false : true,
        isShowHighlightedIdea: false,// getLocalStorageKey("isShowHighlightedIdeaImplementationCustomView") !== null ? getLocalStorageKey("isShowHighlightedIdeaImplementationCustomView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageImplementationCustomView1') ? getLocalStorageKey('recordsPerPageImplementationCustomView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionImplementationCustomView") !== null ? getLocalStorageKey("isShowRiskDistributionImplementationCustomView") === 'true' ? true : false : true,
    },
    shareView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaShareView") !== null ? getLocalStorageKey("isShowInactiveIdeaShareView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaShareView") !== null ? getLocalStorageKey("isShowHighlightedIdeaShareView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageShareView1') ? getLocalStorageKey('recordsPerPageShareView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionShareView") !== null ? getLocalStorageKey("isShowRiskDistributionShareView") === 'true' ? true : false : true,
    },
    transferView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaTransferView") !== null ? getLocalStorageKey("isShowInactiveIdeaTransferView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaTransferView") !== null ? getLocalStorageKey("isShowHighlightedIdeaTransferView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageTransferView1') ? getLocalStorageKey('recordsPerPageTransferView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionTransferView") !== null ? getLocalStorageKey("isShowRiskDistributionTransferView") === 'true' ? true : false : true,
    },
    sentForShareView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaSentForShareView") !== null ? getLocalStorageKey("isShowInactiveIdeaSentForShareView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaSentForShareView") !== null ? getLocalStorageKey("isShowHighlightedIdeaSentForShareView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageSentForShareView1') ? getLocalStorageKey('recordsPerPageSentForShareView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionSentForShareView") !== null ? getLocalStorageKey("isShowRiskDistributionSentForShareView") === 'true' ? true : false : true,
    },
    sentForTransferView: {
        isShowInactiveIdea: getLocalStorageKey("isShowInactiveIdeaSentForTransferView") !== null ? getLocalStorageKey("isShowInactiveIdeaSentForTransferView") === 'true' ? true : false : true,
        isShowHighlightedIdea: getLocalStorageKey("isShowHighlightedIdeaSentForTransferView") !== null ? getLocalStorageKey("isShowHighlightedIdeaSentForTransferView") === 'true' ? true : false : true,
        ideaCount: 0, currentPage: 1, perPageIdeaCount: getLocalStorageKey('recordsPerPageSentForTransferView1') ? getLocalStorageKey('recordsPerPageSentForTransferView1') : 25,
        isSelected: false, ideasOnCurrentPage: 0, checkedIdeas: 0, checkedIdeasOnCurrentPage: 0, selectedIdea: null,
        isShowRiskDistribution: getLocalStorageKey("isShowRiskDistributionSentForTransferView") !== null ? getLocalStorageKey("isShowRiskDistributionSentForTransferView") === 'true' ? true : false : true,
    }
};

export const ideaGroupSorting = {
    defaultView: {
        sortColumn: getLocalStorageKey("defaultSortColumn") !== null ? getLocalStorageKey("defaultSortColumn") : '',
        sortAscending: getLocalStorageKey("defaultSortAscending") !== null ? getLocalStorageKey("defaultSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("defaultScr") !== null ? getLocalStorageKey("defaultScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("defaultSortingOn") !== null ? getLocalStorageKey("defaultSortingOn") : ''
    },
    customView: {
        sortColumn: getLocalStorageKey("customSortColumn") !== null ? getLocalStorageKey("customSortColumn") : '',
        sortAscending: getLocalStorageKey("customSortAscending") !== null ? getLocalStorageKey("customSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("customScr") !== null ? getLocalStorageKey("customScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("customSortingOn") !== null ? getLocalStorageKey("customSortingOn") : ''
    },
    ideaGenrationView: {
        sortColumn: getLocalStorageKey("ideaGenrationSortColumn") !== null ? getLocalStorageKey("ideaGenrationSortColumn") : '',
        sortAscending: getLocalStorageKey("ideaGenrationSortAscending") !== null ? getLocalStorageKey("ideaGenrationSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("ideaGenrationScr") !== null ? getLocalStorageKey("ideaGenrationScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("ideaGenrationSortingOn") !== null ? getLocalStorageKey("ideaGenrationSortingOn") : ''
    },
    archiveView: {
        sortColumn: getLocalStorageKey("archiveSortColumn") !== null ? getLocalStorageKey("archiveSortColumn") : '',
        sortAscending: getLocalStorageKey("archiveSortAscending") !== null ? getLocalStorageKey("archiveSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("archiveScr") !== null ? getLocalStorageKey("archiveScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("archiveSortingOn") !== null ? getLocalStorageKey("archiveSortingOn") : ''
    },
    archivePendingView: {
        sortColumn: getLocalStorageKey("archivePendingSortColumn") !== null ? getLocalStorageKey("archivePendingSortColumn") : '',
        sortAscending: getLocalStorageKey("archivePendingSortAscending") !== null ? getLocalStorageKey("archivePendingSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("archivePendingScr") !== null ? getLocalStorageKey("archivePendingScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("archivePendingSortingOn") !== null ? getLocalStorageKey("archivePendingSortingOn") : ''
    },
    ideasForAcceptanceView: {
        sortColumn: getLocalStorageKey("ideasForAcceptanceSortColumn") !== null ? getLocalStorageKey("ideasForAcceptanceSortColumn") : '',
        sortAscending: getLocalStorageKey("ideasForAcceptanceSortAscending") !== null ? getLocalStorageKey("ideasForAcceptanceSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("ideasForAcceptanceScr") !== null ? getLocalStorageKey("ideasForAcceptanceScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("ideasForAcceptanceSortingOn") !== null ? getLocalStorageKey("ideasForAcceptanceSortingOn") : ''
    },
    ideasSentForAcceptanceView: {
        sortColumn: getLocalStorageKey("ideasSentForAcceptanceSortColumn") !== null ? getLocalStorageKey("ideasSentForAcceptanceSortColumn") : '',
        sortAscending: getLocalStorageKey("ideasSentForAcceptanceSortAscending") !== null ? getLocalStorageKey("ideasSentForAcceptanceSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("ideasSentForAcceptanceScr") !== null ? getLocalStorageKey("ideasSentForAcceptanceScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("ideasSentForAcceptanceSortingOn") !== null ? getLocalStorageKey("ideasSentForAcceptanceSortingOn") : ''
    },
    planningView: {
        sortColumn: getLocalStorageKey("planningSortColumn") !== null ? getLocalStorageKey("planningSortColumn") : '',
        sortAscending: getLocalStorageKey("planningSortAscending") !== null ? getLocalStorageKey("planningSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("planningScr") !== null ? getLocalStorageKey("planningScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("planningSortingOn") !== null ? getLocalStorageKey("planningSortingOn") : ''
    },
    trackingView: {
        sortColumn: getLocalStorageKey("trackingSortColumn") !== null ? getLocalStorageKey("trackingSortColumn") : '',
        sortAscending: getLocalStorageKey("trackingSortAscending") !== null ? getLocalStorageKey("trackingSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("trackingScr") !== null ? getLocalStorageKey("trackingScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("trackingSortingOn") !== null ? getLocalStorageKey("trackingSortingOn") : ''
    },
    implementationCustomView: {
        sortColumn: getLocalStorageKey("implementationCustomSortColumn") !== null ? getLocalStorageKey("implementationCustomSortColumn") : '',
        sortAscending: getLocalStorageKey("implementationCustomSortAscending") !== null ? getLocalStorageKey("implementationCustomSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("implementationCustomScr") !== null ? getLocalStorageKey("implementationCustomScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("implementationCustomSortingOn") !== null ? getLocalStorageKey("implementationCustomSortingOn") : ''
    },
    shareView: {
        sortColumn: getLocalStorageKey("shareSortColumn") !== null ? getLocalStorageKey("shareSortColumn") : '',
        sortAscending: getLocalStorageKey("shareSortAscending") !== null ? getLocalStorageKey("shareSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("shareScr") !== null ? getLocalStorageKey("shareScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("shareSortingOn") !== null ? getLocalStorageKey("shareSortingOn") : ''
    },
    transferView: {
        sortColumn: getLocalStorageKey("transferSortColumn") !== null ? getLocalStorageKey("transferSortColumn") : '',
        sortAscending: getLocalStorageKey("transferSortAscending") !== null ? getLocalStorageKey("transferSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("transferScr") !== null ? getLocalStorageKey("transferScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("transferSortingOn") !== null ? getLocalStorageKey("transferSortingOn") : ''
    },
    sentForShareView: {
        sortColumn: getLocalStorageKey("sentForShareSortColumn") !== null ? getLocalStorageKey("sentForShareSortColumn") : '',
        sortAscending: getLocalStorageKey("sentForShareSortAscending") !== null ? getLocalStorageKey("sentForShareSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("sentForShareScr") !== null ? getLocalStorageKey("sentForShareScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("sentForShareSortingOn") !== null ? getLocalStorageKey("sentForShareSortingOn") : ''
    },
    sentForTransferView: {
        sortColumn: getLocalStorageKey("sentForTransferSortColumn") !== null ? getLocalStorageKey("sentForTransferSortColumn") : '',
        sortAscending: getLocalStorageKey("sentForTransferSortAscending") !== null ? getLocalStorageKey("sentForTransferSortAscending") === "true" ? true : false : undefined,
        scr: getLocalStorageKey("sentForTransferScr") !== null ? getLocalStorageKey("sentForTransferScr") === "true" ? true : false : false,
        sortingOn: getLocalStorageKey("sentForTransferSortingOn") !== null ? getLocalStorageKey("sentForTransferSortingOn") : ''
    },
    implementationIdeaView: {
        sortColumn: getLocalStorageKey("implementationIdeaSortColumn") !== null ? getLocalStorageKey("implementationIdeaSortColumn") : '',
        sortAscending: getLocalStorageKey("implementationIdeaSortAscending") !== null ? getLocalStorageKey("implementationIdeaSortAscending") === "true" ? true : false : undefined,
        showCompletionTracking: getLocalStorageKey("showCompletionTrackingIdeas") !== null ? getLocalStorageKey("showCompletionTrackingIdeas") : true,
    },
    implementationLineItemView: {
        sortColumn: getLocalStorageKey("implementationLineItemSortColumn") !== null ? getLocalStorageKey("implementationLineItemSortColumn") : '',
        sortAscending: getLocalStorageKey("implementationLineItemSortAscending") !== null ? getLocalStorageKey("implementationLineItemSortAscending") === "true" ? true : false : undefined,
        showCompletionTracking: getLocalStorageKey("showCompletionTrackingLineItems") !== null ? getLocalStorageKey("showCompletionTrackingLineItems") : true,
    },
    implementationMetricView: {
        sortColumn: getLocalStorageKey("implementationMetricSortColumn") !== null ? getLocalStorageKey("implementationMetricSortColumn") : '',
        sortAscending: getLocalStorageKey("implementationMetricSortAscending") !== null ? getLocalStorageKey("implementationMetricSortAscending") === "true" ? true : false : undefined,
    },
    implementationMileStoneView: {
        sortColumn: getLocalStorageKey("implementationMileStoneSortColumn") !== null ? getLocalStorageKey("implementationMileStoneSortColumn") : '',
        sortAscending: getLocalStorageKey("implementationMileStoneSortAscending") !== null ? getLocalStorageKey("implementationMileStoneSortAscending") === "true" ? true : false : undefined,
    }
};

export const sessionSorting = {
    sortColumn: getLocalStorageKey("sessionSortColumn") !== null ? getLocalStorageKey("sessionSortColumn") : '',
    sortAscending: getLocalStorageKey("sessionSortAscending") !== null ? getLocalStorageKey("sessionSortAscending") === "true" ? true : false : undefined,
    sortingOn: getLocalStorageKey("sessionSortingOn") !== null ? getLocalStorageKey("sessionSortingOn") : '',
    isShowingArchivedSessions: false
};

export const sessionIdeasSorting = {
    sortColumn: getLocalStorageKey("sessionIdeasSortColumn") !== null ? getLocalStorageKey("sessionIdeasSortColumn") : '',
    sortAscending: getLocalStorageKey("sessionIdeasSortAscending") !== null ? getLocalStorageKey("sessionIdeasSortAscending") === "true" ? true : false : undefined,
    sortingOn: getLocalStorageKey("sessionIdeasSortingOn") !== null ? getLocalStorageKey("sessionIdeasSortingOn") : '',
    isShowingAllIdeas: getLocalStorageKey("isShowingAllSessionIdeas") !== null ? getLocalStorageKey("isShowingAllSessionIdeas") === 'true' ? true : false : false
};

export const reports = {
    isChangedFile: true, timeStamp: '', recentPdfData: []
};

export const events = {
    specialEvents: [], specialEventsTimestamp: ''
};

export const dashboardPersists = {
    selectedPhase: AppConfig.defaultDashboardPhase, selectedDashboardMenu: 1, selectedDashboardSubmenu: 1, selectedIdeaView: null
};
