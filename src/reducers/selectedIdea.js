
const selectedIdeaReducer = (state = [], action) => {
    switch (action.type) {
        case 'IDEA_TABCHANGE':
            return action.payload;
        default:
            return state;
    }
}

export default selectedIdeaReducer;
