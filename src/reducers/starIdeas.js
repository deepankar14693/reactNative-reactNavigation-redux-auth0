import _ from 'lodash';

const findItemIndex = (array, value) => {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

const StarIdeasReducer = (state = [], action) => {
    var parsedData;
    switch (action.type) {
        case 'GET_STAR_IDEAS':
            var parsedData = action.payload.data;
            var stateObj = Object.assign([], state);
            var newState = _.unionBy(parsedData, stateObj);
            return Object.assign([], ...state, newState);
        case 'STAR_UNSTAR_IDEA':
            var configData = JSON.parse(action.payload.config.data);
            var stateObj = Object.assign([], state);
            switch (configData.fieldName) {
                case 'Star_Idea':
                    stateObj.push(configData.ideaId)
                    return stateObj;
                case 'Unstar_Idea':
                    var index = findItemIndex(stateObj, configData.ideaId)
                    if (index > -1) {
                        stateObj.splice(index, 1);
                    }
                    return stateObj;
                default:
                    return Object.assign({}, stateObj);
            }
        default:
            return state;
    }
};

export default StarIdeasReducer;