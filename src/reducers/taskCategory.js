import update from 'immutability-helper';
import _ from 'lodash';
import { PROJECT_CHANGE } from '../actions/actionTypes';
import { taskCategory } from '../store/configureStoreData';
import { getLocalStorageKey, setLocalStorageKey } from '../common/utils';

const generateWeekData = (categoryData) => {
    let weekOptions = [];
    let category = _.cloneDeep(categoryData);
    if (!getLocalStorageKey('categoryId')) {
        setLocalStorageKey("categoryId", 1);
    }
    const categoryId = getLocalStorageKey('categoryId');
    category = category.filter((c) => parseInt(c.Category) === parseInt(categoryId))[0];
    if (category) {
        let startPoint = category.StartPoint;
        let endPoint = category.EndPoint;
        weekOptions.push({ value: -999, label: '-' });
        for (let i = startPoint; i <= endPoint; i++) {
            weekOptions.push({ value: i, label: category.CategoryType + i });
        }
    }
    return weekOptions;
}

const categoryReducer = (state = [], action, entireState) => {
    let categoryData = {};
    switch (action.type) {
        case PROJECT_CHANGE:
            return update(state, { $set: taskCategory });
        case 'GET_TASK_CATEGORYDATA':
            const parsedData = action.payload.data;
            return update(state, {
                category: { $set: parsedData },
                weeks: { $set: generateWeekData(parsedData) },
                isLoading: { $set: false }
            });
        case 'CATEGORY_CHANGE':
            categoryData["category"] = entireState.taskCategory.category;
            categoryData["weeks"] = generateWeekData(entireState.taskCategory.category);
            return update(state, { $set: categoryData });
        default: return state;
    }
};

export default categoryReducer;