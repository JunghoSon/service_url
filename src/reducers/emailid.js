import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    emailid: {
        status: 'INIT',
        items: []
    }
};

export default function emailid(state, action){
    if(typeof state === 'undefined'){
        state = initialState;
    }
    
    switch(action.type){
        case types.SEARCH_EMAILID:
            return update(state, {
                emailid: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.SEARCH_EMAILID_SUCCESS:
            return update(state, {
                emailid: {
                    status: {$set: 'SUCCESS'},
                    items: {$set: action.data}
                }
            });
        case types.SEARCH_EMAILID_FAILURE:
            return update(state, {
                emailid: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}