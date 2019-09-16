import uuid from 'uuid';
import i18n from '../../../i18n';
import { getLocalStorageKey } from '../common/utils';

const generateWeekData = (tasks, categoryData) => {
    var categoryId = 1;
    if (getLocalStorageKey('categoryId')) {
        categoryId = parseInt(getLocalStorageKey('categoryId'));
    }
    var category = categoryData.filter((c) => c.Category === categoryId)[0];
    var startWeek = category.StartPoint;
    var endWeek = category.EndPoint;
    var weeks = [];
    for (startWeek; startWeek <= endWeek; startWeek++) {
        let wk = new Object({ Name: (category.CategoryType === 'W' ? i18n.t("Week") + ' ' : i18n.t("Month") + ' ') + startWeek, TaskId: uuid.v4(), IsVisible: true, StartWeek: startWeek, EndWeek: startWeek, ChildCount: 0, IsParentWeek: 1 });
        weeks.push(wk);
    }
    return weeks;
}

export const prepareTaskListData = (state) => {
    if (state.tasks.tasks.length <= 0) return { tasks: [], weeks: [] };

    //return Object.assign([], tasks.weeks, generateWeekData(tasks.tasks, taskCategory.category));
    var weeks = generateWeekData(state.tasks.tasks, state.taskCategory.category)
    Object.assign({ ...state, weeks: weeks });
    return weeks;

};