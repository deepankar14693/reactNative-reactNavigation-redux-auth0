import { GET_ANNUAL_VALUES } from '../actions/actionTypes';

const AnnualValues = (state = [], action) => {
    switch (action.type) {
        case GET_ANNUAL_VALUES:
            var payloadData = action.payload.data;
            return payloadData;
        default: return state;
    }
}

export default AnnualValues;