import * as actionTypes from './actionTypes';
import { postAxios } from './axiosActions';


export const advancedSearchResultLoader = () => {
    return {
        type: actionTypes.ADVANCED_SEARCH_RESULT_LOADER,
        payload: null
    }
}

export const fetchAdvancedSearchResults = (advancedSearch) => {
    const url = 'Ideas/AdvancedSearch';
    const request = postAxios(url, { params: advancedSearch });
    return {
        type: advancedSearch.GoIdea ? actionTypes.FETCH_ADVANCED_SEARCH_GO_IDEA_RESULT : actionTypes.FETCH_ADVANCED_SEARCH_RESULT,
        payload: request,
    }
};

export const clearAdvancedResultData = (goIdea) => {
    return {
        type: actionTypes.CLEAR_ADVANCED_RESULTS_DATA,
        payload: null,
        params: goIdea
    }
}