import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    locate: {
        status: 'INIT',
        items: [],
        isLast: false
    }
};

export default function locate(state, action){
    if(typeof state === 'undefined'){
        state = initialState;
    }
    
    switch(action.type){
        case types.SEARCH_LOCATE:
            return update(state, {
                locate: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.SEARCH_LOCATE_SUCCESS:
            if(action.isInitial){
                return update(state, {
                    locate: {
                        status: {$set: 'SUCCESS'},
                        items: {$set: action.data},
                        isLast: {$set: action.data.length < 20}
                    }
                });
            }else{
                return update(state, {
                    locate: {
                        status: {$set: 'SUCCESS'},
                        items: {$push: action.data},
                        isLast: {$set: action.data.length < 20}
                    }
                });
            }
        case types.SEARCH_LOCATE_FAILURE:
            return update(state, {
                locate: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}