import _ from 'lodash';
import { isEmpty } from '../common/utils';

const PersonnelFTsReducer = (state = [], action) => {
    var parsedData;
    switch (action.type) {
        case 'GET_PERSONNEL':
            parsedData = action.payload.data.List;
            var personnelList = [];
            if (parsedData && parsedData.length > 0) {
                _.map(parsedData, (item) => {
                    personnelList.push({
                        FunctionalTitleId: item.FunctionalTitleId,
                        GroupId: item.GroupId,
                        UserId: item.UserId,
                        Exclude: item.Exclude
                    })
                });
            }
            return personnelList;
        default:
            return state;
    }
};

export default PersonnelFTsReducer;