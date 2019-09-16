/* import combineSectionReducers from 'combine-section-reducers';

import organizationMasterData from '../reducers/organizationMasterData';
import BaselineSummaryReducer from '../reducers/baselineSummary';
import completionTracker from '../reducers/completionTracker';
import centers from '../reducers/costCenters';
import dashboardFilter from '../reducers/dashboardFilter';
import DashboardPersists from '../reducers/dashboardPersists';
import events from '../reducers/events';
import filter from '../reducers/filter';
import functionalTitles from '../reducers/functionalTitles';
import ideaAttachments from '../reducers/ideaAttachments';
import ideaGroupFilter from '../reducers/ideaGroupfilter';
import ideaGroupSorting from '../reducers/ideaGroupSorting';
import ideaHistory from '../reducers/ideaHistory';
import ideaTexts from '../reducers/ideaTexts';
import masterData from '../reducers/masterData';
import notesData from '../reducers/userNotes';
import newIdeas from '../reducers/newIdeas';
import notify from '../reducers/notify';
import multiNotify from '../reducers/multiNotify';
import openIdeas from '../reducers/openIdeas';
import permissionMasterData from '../reducers/permissionMasterData';
import personnel from '../reducers/personnel';
import personnelFT from '../reducers/personnelFT';
import personnelSearch from '../reducers/personnelSearch';
import reportNotify from '../reducers/reportNotify';
import reports from '../reducers/reports';
import riskRatersReport from '../reducers/riskRatersReport';
import scrReports from '../reducers/scrReports';
import selectedIdea from '../reducers/selectedIdea';
import sessionSorting from '../reducers/sessionSorting';
import sessionIdeasSorting from '../reducers/sessionIdeasSorting';
import sorting from '../reducers/sorting';
import starIdeas from '../reducers/starIdeas';
import summaryText from '../reducers/summaryText';
import taskAttachments from '../reducers/taskAttachments';
import taskCategory from '../reducers/taskCategory';
import timeStamps from '../reducers/timeStamps';
import userSearch from '../reducers/userSearch';
import admin from '../store/admin/adminReducer';
import baseline from '../store/baseline/baselineReducer';
import dashboard from '../store/dashboard/dashboardReducer';
import groupAdmin from '../store/groupAdmin/groupAdminReducer';
import LineItemMonthlyValueReducer from '../store/lineItemMonthlyValues/lineItemMonthlyValueReducer';
import tasks from '../store/tasks/taskReducer';
import updatedTasks from '../store/tasks/updatedTaskReducer';
import { default as userAdmin, default as userHistory } from '../store/userAdmin/userAdminReducer';
import ideaGroupScratchpads from './ideaGroupScratchpads/ideaGroupScratchpadReducer';
import ideaData from './ideas2/ideaReducer';
import sessionIdeaData from './sessionIdeas/sessionIdeasReducer';
import annualValues from '../reducers/annualValues';
import advancedSearchReducer from './advancedSearch/advancedSearchReducer';
import sessionsData from '../reducers/sessions';
import timingScenarioData from '../reducers/timingScenarios';
import timeScenarioProformaData from '../store/timingScenarios/proformaValueReducer';

const allReducer =
    combineSectionReducers({
        organizationMasterData: organizationMasterData,
        masterData: masterData,
        notesData: notesData,
        permissions: permissionMasterData,
        filter: filter,
        sorting: sorting,
        ideaGroupFilter: ideaGroupFilter,
        ideaGroupSorting: ideaGroupSorting,
        sessionSorting: sessionSorting,
        sessionIdeasSorting: sessionIdeasSorting,
        notify: notify,
        multiNotify: multiNotify,
        reportNotify: reportNotify,
        timeStamps: timeStamps,
        events: events,
        ideaTexts: ideaTexts,
        ideaAttachments: ideaAttachments,
        personnel: personnel,
        personnelFT: personnelFT,
        personnelSearch: personnelSearch,
        userSearch: userSearch,
        functionalTitles: functionalTitles,
        starIdeas: starIdeas,
        ideaGroupScratchpads: ideaGroupScratchpads,
        dashboardFilter: dashboardFilter,
        tasks: tasks,
        taskAttachments: taskAttachments,
        taskCategory: taskCategory,
        updatedTasks: updatedTasks,
        baselineSummary: BaselineSummaryReducer,
        dashboardPersists: DashboardPersists,
        lineItemMonthlyValueData: LineItemMonthlyValueReducer,
        summaryText: summaryText,
        openIdeas: openIdeas,
        selectedIdea: selectedIdea,
        riskRatersReport: riskRatersReport,
        ideaHistory: ideaHistory,
        userHistory: userHistory,
        completionTracker: completionTracker,
        centers: centers,
        dashboardData: dashboard,
        adminData: admin,
        userAdminData: userAdmin,
        ideaData: ideaData,
        groupAdminData: groupAdmin,
        newIdeas: newIdeas,
        baseline: baseline,
        reports: reports,
        scrReports: scrReports,
        sessionIdeaData: sessionIdeaData,
        annualValues: annualValues,
        advancedSearchData: advancedSearchReducer,
        sessionsData: sessionsData,
        timingScenarioData: timingScenarioData,
        timeScenarioProformaData: timeScenarioProformaData
    })


export default allReducer;
 */

import combineSectionReducers from 'combine-section-reducers';
//import ideaData from './ideas/ideaReducer'
import ideaData from '../store/ideas2/ideaReducer';
import organizationMasterData from '../reducers/organizationMasterData';
import masterData from '../reducers/masterData';
import dashboardFilter from '../reducers/dashboardFilter';
import ideaGroupFilter from '../reducers/ideaGroupfilter';
import dashboard from '../store/dashboard/dashboardReducer'

const allReducers = combineSectionReducers({
    // ideas: ideaData,
    organizationMasterData: organizationMasterData,
    ideaData: ideaData,
    masterData: masterData,
    dashboardFilter: dashboardFilter,
    ideaGroupFilter: ideaGroupFilter,
    dashboardData: dashboard,
})

export default allReducers;