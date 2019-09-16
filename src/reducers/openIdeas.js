const openIdeasReducer = (state = [], action) => {
    switch (action.type) {
        case 'PUSH_OPEN_IDEAS':
            if (!action.payload) return state;
            var payloadData = JSON.parse(action.payload);
            if (!payloadData) return state;
            var stateObj = Object.assign({}, state);
            stateObj = payloadData;
            return stateObj
        default:
            return state;
    }
}

export default openIdeasReducer;
