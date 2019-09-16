import { GET_BASELINESUMMARY } from '../actions/actionTypes';

const BaselineSummaryReducer = (state = [], action) => {
    switch (action.type) {
        case GET_BASELINESUMMARY:
            var data = {};
            var payloadData = action.payload.data;
            data.Summary = payloadData.BaselineSummary;
            data.FT = payloadData.BaselineSummaryFT;
            data.NPE = payloadData.BaselineSummaryNPE;
            data.Revenue = payloadData.BaselineSummaryRevenue;
            data.CompRange = payloadData.BaselineSummaryCompRange;

            return data;
        default: return state;
    }
}

export default BaselineSummaryReducer;