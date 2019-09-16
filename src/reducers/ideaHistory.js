import AppConfig from '../appConfig';
const ideaHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_IDEA_HISTORY_DATA':
        case 'GET_IDEA_HISTORY':
            if (!action.payload.data) return state;
            var data = [];
            data = action.payload.data;
            return { ...state, ideaHistory: data };
        case 'CLEAR_IDEA_HISTORY_DATA':
        case 'CLEAR_IDEA_HISTORY':
            return { ...state, ideaHistory: [] };
        default:
            return state;
    }
}

export default ideaHistoryReducer;
