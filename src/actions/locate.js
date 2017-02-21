import {
    SEARCH_LOCATE,
    SEARCH_LOCATE_SUCCESS,
    SEARCH_LOCATE_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function searchLocateRequest(isInitial, id){
    return (dispatch) => {
        dispatch(searchLocate());
        
        let url = '/api/locate'
        url = isInitial ? url : `${url}/${id}`;
        
        return axios.get(url)
                    .then((response) => {
                        dispatch(searchListSuccess(isInitial, response.data));
                    })
                    .catch((error) => {
                        dispatch(searchListFailure());
                    });
    };
}

export function searchLocate(){
    return {
        type: SEARCH_LOCATE
    };
}

export function searchListSuccess(isInitial, data){
    return {
        type: SEARCH_LOCATE_SUCCESS,
        isInitial,
        data
    };
}

export function searchListFailure(){
    return {
        type: SEARCH_LOCATE_FAILURE
    }
}