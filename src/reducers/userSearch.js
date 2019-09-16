import _ from 'lodash';
import { isEmpty } from '../common/utils';
import { GET_USER_SEARCH, CLEAR_USER_SEARCH } from '../actions/actionTypes';

const UserSearchReducer = (state = [], action) => {
    let parsedData;
    switch (action.type) {
        case GET_USER_SEARCH:
            parsedData = action.payload.data;
            let userList = [];
            if (parsedData && parsedData.length > 0) {
                userList = _.filter(parsedData, (item) => {
                    return !isEmpty(item.Name)
                });
            }
            return userList;
        case CLEAR_USER_SEARCH:
            return [];
        default:
            return state;
    }
};

export default UserSearchReducer;