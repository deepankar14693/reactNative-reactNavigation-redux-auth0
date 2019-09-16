import _ from 'lodash';

const FunctionalTitles = (state = [], action) => {
    var parsedData;

    switch (action.type) {
        case 'GET_FUNCTIONALTITLES':
            parsedData = action.payload.data.List;
            //var stateObj = Object.assign([], state);
            //var newState = _.unionBy(parsedData, stateObj, 'FunctionalTitleId');
            return Object.assign([], ...state, parsedData);

        default: return state;
    }
}

export default FunctionalTitles;