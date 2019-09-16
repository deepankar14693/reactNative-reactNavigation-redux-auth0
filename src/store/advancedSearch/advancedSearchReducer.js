import update from 'immutability-helper';
import * as actionTypes from '../../actions/actionTypes';

const advancedSearchReducer = (state = [], action) => {

    try {

        switch (action.type) {

            case actionTypes.ADVANCED_SEARCH_RESULT_LOADER:
                return update(state, {
                    isLoading: { $set: true },
                });

            case actionTypes.FETCH_ADVANCED_SEARCH_RESULT:
                if (!action.payload.data) return state;
                else {
                    let params = JSON.parse(action.payload.config.data)
                    return update(state, {
                        isLoading: { $set: false },
                        ideaResult: {
                            ideaData: { $set: action.payload.data },
                            ideaSearchState: { $set: params.SearchText },
                            ideaGroupState: { $set: params.Groups.split(',') },
                            ideaItemState: { $set: params.EntityTypes.split(',') },
                            ideaFieldState: { $set: params.FieldName.split(',') },
                        }
                    });
                }

            case actionTypes.FETCH_ADVANCED_SEARCH_GO_IDEA_RESULT:
                if (!action.payload.data) return state;
                else {
                    let params = JSON.parse(action.payload.config.data)
                    return update(state, {
                        isLoading: { $set: false },
                        goIdeaResult: {
                            goIdeaData: { $set: action.payload.data },
                            goIdeaSearchState: { $set: params.SearchText },
                            goIdeaGroupState: { $set: params.Groups.split(',') },
                            goIdeaItemState: { $set: params.EntityTypes.split(',') },
                            goIdeaFieldState: { $set: params.FieldName.split(',') },
                        }
                    });
                }

            case actionTypes.CLEAR_ADVANCED_RESULTS_DATA:
                if (action.params) {
                    return update(state, {
                        goIdeaResult: {
                            goIdeaData: { $set: [] },
                            goIdeaSearchState: { $set: '' },
                            goIdeaGroupState: { $set: [] },
                            goIdeaItemState: { $set: [] },
                            goIdeaFieldState: { $set: [] },
                        }
                    });
                }
                else {
                    return update(state, {
                        ideaResult: {
                            ideaData: { $set: [] },
                            ideaSearchState: { $set: '' },
                            ideaGroupState: { $set: [] },
                            ideaItemState: { $set: [] },
                            ideaFieldState: { $set: [] },
                        }
                    });
                }
                
            case actionTypes.PROJECT_CHANGE:
            case actionTypes.GROUP_CHANGE:
            return update(state, {
                ideaResult: {
                    ideaData: { $set: [] },
                    ideaSearchState: { $set: '' },
                    ideaGroupState: { $set: [] },
                    ideaItemState: { $set: [] },
                    ideaFieldState: { $set: [] },
                },
                goIdeaResult: {
                    goIdeaData: { $set: [] },
                    goIdeaSearchState: { $set: '' },
                    goIdeaGroupState: { $set: [] },
                    goIdeaItemState: { $set: [] },
                    goIdeaFieldState: { $set: [] },
                }
            });
            default: return state;

        }
    }

    catch (err) { }

    finally {
    }

};

export default advancedSearchReducer;
