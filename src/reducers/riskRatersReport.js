
const riskRatersReportReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_RISK_RATERS_REPORT':
            if (action.payload.data) {
                return action.payload.data.Table;
            } else {
                return state;
            }
        default:
            return state;
    }
}

export default riskRatersReportReducer;
