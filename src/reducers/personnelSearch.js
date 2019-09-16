import _ from 'lodash';
import { isEmpty } from '../common/utils';
import { GET_PERSONNEL_SEARCH, CLEAR_PERSONNEL_SEARCH } from '../actions/actionTypes';

const PersonnelSearchReducer = (state = [], action) => {
    var parsedData;
    switch (action.type) {
        case GET_PERSONNEL_SEARCH:
            parsedData = action.payload.data;
            var personnelList = [];
            if (parsedData && parsedData.length > 0) {
                personnelList = _.filter(parsedData, (item) => {
                    return !isEmpty(item.Name)
                });
            }
            return personnelList;
        case CLEAR_PERSONNEL_SEARCH:
            return [];
        default:
            return state;
    }
};

export default PersonnelSearchReducer;