import _ from 'lodash';
import * as utils from '../../../common/utils';
import { getLocalStorageKey } from '../common/utils';

export const prepareTaskDashboardData = (tasks, weekNumber) => {
    var taskDashboard = { weekTasks: [], parentTasks: [] };
    if (tasks.length > 0) {
        var categoryId = getLocalStorageKey('categoryIdWeeklyTask') ? parseInt(getLocalStorageKey('categoryIdWeeklyTask')) : 1;
        var weekTasks = _.filter(tasks, (t) => (t.IsParentPhase !== 1) && (t.IsParent !== 1 || t.IsParent === false) &&
            (t.StartWeek !== null && weekNumber >= t.StartWeek && t.EndWeek != null && weekNumber <= t.EndWeek) && t.Category === categoryId);

        var uniqueParentTaskIds = _.map(_.uniqBy(weekTasks, 'ParentTaskId'), 'ParentTaskId');
        //Dictionary of Parent Tasks
        var parentTaskDetails = utils.prepareObjectFromArray(utils.filterByValues(tasks, 'TaskId', uniqueParentTaskIds), ['TaskId']);

        weekTasks.map((item) => {
            if (item.ParentTaskId && parentTaskDetails[item.ParentTaskId.toLowerCase()]) {
                item.ParentTaskName = parentTaskDetails[item.ParentTaskId.toLowerCase()].Name;
                item.ParentTaskNumber = parentTaskDetails[item.ParentTaskId.toLowerCase()].TaskNumber;
            } else {
                item.ParentTaskName = '';
                item.ParentTaskNumber = '';
            }
            return item;
        });

        taskDashboard.weekTasks = _.sortBy(weekTasks, ['ParentTaskNumber', 'TaskNumber']);
    }
    return taskDashboard;
};
