const updatedTasksReducer = (state = [], action, entireState) => {
    var parsedData;

    switch (action.type) {
        case 'BULK_UPDATE_TASKS':
            parsedData = action.payload.data;
            return parsedData;
        case 'UPDATE_TASK':
            return [];
        case 'GET_TASKDATA':
            return [];
        default: return state;
    }
};

export default updatedTasksReducer;
