import Api from '../transport/api';

const FETCH_OFFER_DETAILS = 'kaufDA/offers/FETCH_OFFER_DETAILS';
const FETCH_OFFER_DETAILS_SUCCESS = 'kaufDA/offers/FETCH_OFFER_DETAILS_SUCCESS';
const FETCH_OFFER_DETAILS_ERROR = 'kaufDA/offers/FETCH_OFFER_DETAILS_ERROR';

const initialState = [];

export default function reducer(state=initialState, action={}){
    switch (action.type){
        case FETCH_OFFER_DETAILS:
            return state.filter( item => item.id !== action.id);
        case FETCH_OFFER_DETAILS_SUCCESS:
            return state.push( action.data );
        case FETCH_OFFER_DETAILS_ERROR:
            return state.push( {id: action.id, error: action.error} );
        default:
            return {
                ...state
            }
    }
}

export function fetchOfferDetails( id ){
    return dispatch => {
        dispatch( {type: FETCH_OFFER_DETAILS, id} );

        return Api.fetchOfferDetail( id )
            .then( data => {
                dispatch( {type: FETCH_OFFER_DETAILS_SUCCESS, data} );
            })
            .catch( error => {
                dispatch( {type: FETCH_OFFER_DETAILS_ERROR, error, id} );
            } );
    }
}