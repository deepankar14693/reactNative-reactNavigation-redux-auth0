const filterReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TIMESTAMPS':
            return action.payload.data;
        default:
            return state;
    }
}

export default filterReducer;
