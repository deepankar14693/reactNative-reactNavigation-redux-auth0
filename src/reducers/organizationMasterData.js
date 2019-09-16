import update from 'immutability-helper';
import { GET_ORGANIZATION_MASTERDATA } from '../actions/actionTypes';
import { prepareObjectFromArray } from '../common/utils';

const organizationMasterDataReducer = (state = [], action) => {
    try {
        switch (action.type) {
            case GET_ORGANIZATION_MASTERDATA:
                let payloadData = action.payload.data;
                const projects = prepareObjectFromArray(payloadData.ProjectList.List, ["ProjectId"]);
                const configList = prepareObjectFromArray(payloadData.ConfigList.List, ["Key"]);
                const projectConfigList = prepareObjectFromArray(payloadData.ProjectConfigList.List, ["ProjectId", "Key"]);
                return update(state, {
                    showProject:{ $set: payloadData.ShowProject},
                    projects: { $set: projects },
                    config: { $set: configList },
                    projectConfig: { $set: projectConfigList },
                    isLoading: { $set: false },
                });
            default:
                return state;
        }
    }
    catch (err) { }
};

export default organizationMasterDataReducer;
