import update from 'immutability-helper';
import * as actionTypes from '../../actions/actionTypes';
import { isEmpty2 } from '../../common/utils';
import * as groupAdminUpdater from './groupAdminUpdater';
import _ from 'lodash';

const groupAdminReducer = (state = [], action, entireState) => {
    switch (action.type) {
        case actionTypes.GET_GROUPADMIN_LEADERSHIP:
            const groupAdminData = Object.assign([], action.payload.data);
            //var leaderships = Object.assign({}, state.leaderships);
            const leaderships = Object.assign({}, state.leaderships);

            if (entireState.filter.ideaView === 'Ideas') {
                if (groupAdminData && Object.keys(groupAdminData).length > 0) {
                    var groupId = entireState.filter.groupId;
                    
                    leaderships[groupId] = { GroupLeadership: [], FocusAreaLeadership: [], IdeaLeadership: [] };
                    //leaderships[groupId] = groupAdminData;
                    leaderships[groupId].GroupLeadership = groupAdminData.GroupLeadership;
                    leaderships[groupId].FocusAreaLeadership = groupAdminData.FocusAreaLeadership;
                    leaderships[groupId].IdeaLeadership = groupAdminData.IdeaLeadership;
                }
            }
            if (leaderships) {
                return update(state, { leaderships: { $set: leaderships } });
            } else {
                return state;
            }
        case actionTypes.SAVE_LEADERSHIP_ROLE_PERMISSION:
            if (action.payload && action.payload.data !== 0) {
                const configData = JSON.parse(action.payload.config.data);
                const groupId = configData.groupId;

                if (state.leaderships && state.leaderships[groupId]) {
                    const leaderships = Object.assign({}, state.leaderships);

                    switch (configData.entityType) {
                        case 1:
                            let groupLeadership = leaderships[groupId].GroupLeadership;
                            leaderships[groupId].GroupLeadership = groupAdminUpdater.updateGroupPermission(groupLeadership, configData);
                            break;
                        case 2:
                            let faLeadership = leaderships[groupId].FocusAreaLeadership;
                            leaderships[groupId].FocusAreaLeadership = groupAdminUpdater.updateFocusAreaPermission(faLeadership, configData);
                            break;
                        case 3:
                             let ideaLeadership = leaderships[groupId].IdeaLeadership;
                             const roles = entireState.masterData.roles;
                            leaderships[groupId].IdeaLeadership = groupAdminUpdater.updateIdeaPermission(ideaLeadership, configData, roles);
                            break;
                    }
                    return update(state, { leaderships: { $set: leaderships } });
                } else {
                    return state;
                }
            } else {
                return state;
            }
        case actionTypes.REMOVE_LEADERSHIP_ROLE_PERMISSION:
            if (action.payload && action.payload.data !== 0) {
                let configData = JSON.parse(action.payload.config.data);
                configData.RoleId = null;
                configData.selectedUserId = configData.userId;
                const groupId = configData.groupId;
                
                if (state.leaderships && state.leaderships[groupId]) {
                    const leaderships = Object.assign({}, state.leaderships);

                    switch (configData.entityType) {
                        case 1:
                            let groupLeadership = leaderships[groupId].GroupLeadership;
                            leaderships[groupId].GroupLeadership = groupAdminUpdater.updateGroupPermission(groupLeadership, configData);
                            break;
                        case 2:
                            let faLeadership = leaderships[groupId].FocusAreaLeadership;
                            leaderships[groupId].FocusAreaLeadership = groupAdminUpdater.updateFocusAreaPermission(faLeadership, configData);
                            break;
                        case 3:
                            let ideaLeadership = leaderships[groupId].IdeaLeadership;
                            leaderships[groupId].IdeaLeadership = groupAdminUpdater.updateIdeaPermission(ideaLeadership, configData, null);
                            break;
                    }
                    return update(state, { leaderships: { $set: leaderships } });
                } else {
                    return state;
                }
            } else {
                return state;
            }
        default:
            return state;
    }
}
export default groupAdminReducer;
