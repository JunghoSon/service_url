import {
    SEARCH_LOCATE,
    SEARCH_LOCATE_SUCCESS,
    SEARCH_LOCATE_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function searchLocateRequest(isInitial, id, emailId, isSort){
    return (dispatch) => {
        dispatch(searchLocate());
        
        let url = '/api/locate'
        
        if(isInitial){
            if(typeof emailId !== 'undefined') url = `${url}/${emailId}`;
        }else{
            url = `${url}/${emailId}/${id}`;
        }
        
        return axios.get(url)
                    .then((response) => {
                        dispatch(searchListSuccess(isInitial, response.data, emailId, isSort));
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

export function searchListSuccess(isInitial, data, emailId, isSort){
    return {
        type: SEARCH_LOCATE_SUCCESS,
        isInitial,
        data,
        emailId,
        isSort
    };
}

export function searchListFailure(){
    return {
        type: SEARCH_LOCATE_FAILURE
    }
}