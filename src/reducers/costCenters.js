import update from 'immutability-helper';

const CostCenters = (state = [], action) => {
    var parsedData;

    switch (action.type) {
        case 'GET_CENTERS':
            parsedData = action.payload.data;
            //return Object.assign({}, ...state, parsedData);
            return update(state, { $set: parsedData } );
        default: return state;
    }
}

export default CostCenters;