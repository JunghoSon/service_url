import {
    SEARCH_EMAILID,
    SEARCH_EMAILID_SUCCESS,
    SEARCH_EMAILID_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function searchEmailIdRequest(){
    return (dispatch) => {
        dispatch(searchEmailId());
        
        return axios.get('/api/emailid')
                    .then((response) => {
                        dispatch(searchEmailIdSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(searchEmailIdFailure());
                    });
    };
}

export function searchEmailId(){
    return {
        type: SEARCH_EMAILID
    };
}

export function searchEmailIdSuccess(data){
    return {
        type: SEARCH_EMAILID_SUCCESS,
        data
    };
}

export function searchEmailIdFailure(){
    return {
        type: SEARCH_EMAILID_FAILURE
    }
}