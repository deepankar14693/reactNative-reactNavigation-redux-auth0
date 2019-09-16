import update from 'immutability-helper';
import { map, property, sortBy, uniq } from 'lodash';
import uuid from 'uuid';
import { PROJECT_CHANGE } from '../../actions/actionTypes';
import i18n from '../../i18n';
import { tasks } from '../configureStoreData';
import { getLocalStorageKey } from '../../common/utils';

const rowSelection = (task, taskId, prevTaskId) => {
    if (task.TaskId !== taskId && task.TaskId !== prevTaskId) return task;
    if (task.TaskId === prevTaskId) {
        return Object.assign({}, task, { IsSelected: !task.IsSelected });
    }
    if (task.TaskId === taskId) {
        return Object.assign({}, task, { IsSelected: !task.IsSelected });
    }
};

const updateTaskFields = (task, updatedTask) => {
    if (task.TaskId === updatedTask.TaskId) {
        task.Phase = updatedTask.Phase;
        task.TaskNumber = updatedTask.TaskNumber;
        task.Name = updatedTask.Name;
        task.Description = updatedTask.Description;
        task.DeliverableNotes = updatedTask.DeliverableNotes;
        task.AttachmentCount = updatedTask.AttachmentCount;
        task.Role = updatedTask.Role;
        task.StartWeek = updatedTask.StartWeek;
        task.EndWeek = updatedTask.EndWeek;
        task.DueDay = updatedTask.DueDay;
        task.DropWeek = updatedTask.DropWeek;
        task.ReportingType = updatedTask.ReportingType;
        task.IsSelected = false;
    }
};

const updateTask = (task, taskId) => {
    if (task.TaskId !== taskId) return task;
    return Object.assign({}, task, { IsVisible: !task.IsVisible });
};

const generateWeekData = (categoryData) => {
    var categoryId = 1;
    if (getLocalStorageKey('categoryId')) {
        categoryId = parseInt(getLocalStorageKey('categoryId'));
    }
    var category = categoryData.filter((c) => c.Category === categoryId)[0];
    var weeks = [];
    if (category) {
        var startWeek = category.StartPoint;
        var endWeek = category.EndPoint;
        for (startWeek; startWeek <= endWeek; startWeek++) {
            let wk = new Object({
                Name: (category.CategoryType === 'W' ? i18n.t("Week") + ' ' : i18n.t("Month") + ' ') + startWeek,
                TaskId: uuid.v4(), IsVisible: true, StartWeek: startWeek, EndWeek: startWeek, ChildCount: 0, IsParentWeek: 1
            });
            weeks.push(wk);
        }
    }
    return weeks;
}

const tasksActions = (state, action, entireState) => {
    switch (action.type) {
        case 'SHOWHIDETASK':
            return Object.assign([], ...state, state.map(item => updateTask(item, action.payload.taskId)));
        case 'SHOWHIDETASK_WEEKS':
            return Object.assign([], ...state, state.map(item => updateTask(item, action.payload.taskId)));
        case 'ROW_SELECT':
            var prevSelection = state.filter(function (t) {
                return t.IsSelected === true;
            });
            return Object.assign([], ...state, state.map(item => rowSelection(item, action.payload.taskId, prevSelection.length > 0 ? prevSelection[0].TaskId : null)));
        case 'CREATE_TASK':
            return [...state, action.payload.data];
        case 'UPDATE_TASK':
            var configData = JSON.parse(action.payload.config.data);
            if (state.map != undefined) {
                for (var i = 0; i < entireState.updatedTasks.length; i++) {
                    var updatedTask = entireState.updatedTasks[i];
                    Object.assign({}, ...state, state.map(item => updateTaskFields(item, updatedTask)))
                }
                return state;
            }
        case 'DELETE_TASK':
            if (!action.payload || action.payload.data == '' || action.payload.statusText !== "OK") return state;
            var stateObj = Object.assign([], state);
            var deletedTaskId = action.payload.data;
            var deletedTask = entireState.tasks.tasks.filter((t) => t.TaskId === deletedTaskId);
            if (deletedTask.length > 0) {
                var index = stateObj.indexOf(deletedTask[0])
                stateObj.splice(index, 1);
            }
            return stateObj;
        default:
            return state;
    }
};

const taskReducer = (state = [], action, entireState) => {
    var parsedData;
    switch (action.type) {
        case PROJECT_CHANGE:
            return update(state, { $set: tasks });

        case 'GET_TASKDATA':
            parsedData = action.payload.data;
            var distinctPhases = Object.assign([], sortBy(uniq(map(parsedData.Tasks, property('Phase')))));
            parsedData.Tasks.forEach(function (item) { item["IsSelected"] = false; item["IsVisible"] = true });
            distinctPhases.forEach(function (phase) {
                parsedData.Tasks.push(new Object({ Name: i18n.t("SCR") + ' ' + phase, TaskId: uuid.v4(), IsVisible: true, IsParentPhase: 1, Phase: phase, IsParent: 0, StartWeek: 0, EndWeek: 0 }));
            });
            return update(state, {
                tasks: { $set: parsedData.Tasks },
                weeks: { $set: generateWeekData(entireState.taskCategory.category) },
                isLoading: { $set: false }
            });

        case 'SHOWHIDETASK':
            return { ...state, tasks: tasksActions(state["tasks"], action, action.payload) };
        case 'SHOWHIDETASK_WEEKS':
            return { ...state, weeks: tasksActions(state["weeks"], action, action.payload) };
        case 'CATEGORY_CHANGE_VIEW':
            var data = {};
            data.Tasks = entireState.tasks.tasks;
            data.Weeks = generateWeekData(entireState.taskCategory.category);
            return { ...state, tasks: data.Tasks, weeks: data.Weeks };
        case 'UPDATE_TASK':
            if (!action.payload || action.payload.data == 0 || action.payload.statusText !== "OK") return state;
            return { ...state, tasks: tasksActions(state["tasks"], action, entireState) };
        case 'CREATE_TASK':
            if (!action.payload || action.payload.data.TaskId == '' || action.payload.statusText !== "OK") return state;
            //action.payload.data["IsVisible"] = true;
            return { ...state, tasks: tasksActions(state["tasks"], action, null) };
        case 'DELETE_TASK':
            if (!action.payload || action.payload.data == '' || action.payload.statusText !== "OK") return state;
            return { ...state, tasks: tasksActions(state["tasks"], action, entireState) };
        case 'ROW_SELECT':
            return { ...state, tasks: tasksActions(state["tasks"], action, null) };

        default: return state;
    }
};
export default taskReducer;
