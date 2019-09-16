import _ from 'lodash';
import { isEmpty } from '../common/utils';

const PersonnelsReducer = (state = [], action) => {
    var parsedData;
    switch (action.type) {
        case 'GET_PERSONNEL':
            parsedData = action.payload.data.List;
            var personnelList = [];
            if (parsedData && parsedData.length > 0) {
                personnelList = _.filter(parsedData, (item) => {
                    return !isEmpty(item.Name)
                });
            }
            return personnelList;
        //var stateObj = Object.assign([], state);
        //var newState = _.unionBy(parsedData, stateObj, 'PersonnelId');
        //return Object.assign([], ...state, newState);
        default:
            return state;
    }
};

export default PersonnelsReducer;
