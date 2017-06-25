import Api from '../transport/api';
import { combineReducers } from 'redux';
import { fetchParents } from './parents';

const INIT_DATABASE = 'kaufDA/common/INIT_DATABASE';
const INIT_DATABASE_SUCCESS = 'kaufDA/common/INIT_DATABASE_SUCCESS';
const INIT_DATABASE_ERROR = 'kaufDA/common/INIT_DATABASE_ERROR';
const CLEAR_INIT_DATABASE_MESSAGE = 'kaufDA/common/CLEAR_INIT_DATABASE_MESSAGE';

function succuessReducer( state = '', action={} ){
    switch (action.type){
        case INIT_DATABASE:
        case CLEAR_INIT_DATABASE_MESSAGE:
            return '';
        case INIT_DATABASE_SUCCESS:
            return 'Success init database';
        default:
            return state;
    }
}

function errorReducer( state = '', action={} ){
    switch (action.type){
        case INIT_DATABASE:
        case CLEAR_INIT_DATABASE_MESSAGE:
            return '';
        case INIT_DATABASE_ERROR:
            return 'Error init database: '+action.error.message;
        default:
            return state;
    }
}


export default combineReducers({
    successMessage: succuessReducer,
    errorMessage: errorReducer
})

export function initDatabase(){
    return dispatch => {
        dispatch( {type: INIT_DATABASE} );

        Api.initDatabase()
            .then( () => {
                dispatch( {type: INIT_DATABASE_SUCCESS} );
                dispatch( fetchParents() );
            })
            .catch( error => dispatch( {type: INIT_DATABASE_ERROR, error } ) )
    }
}

export function clearInitDatabaseMessage() {
    return {
        type: CLEAR_INIT_DATABASE_MESSAGE
    }
}
