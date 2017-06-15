import Api from '../transport/api';

const FETCH_OFFER_DETAILS = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS';
const FETCH_OFFER_DETAILS_SUCCESS = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS_SUCCESS';
const FETCH_OFFER_DETAILS_ERROR = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS_ERROR';

export default function reducer(state=[], action={}){
    switch (action.type){
        case FETCH_OFFER_DETAILS:
            return state.filter( item => item.id !== action.id);
        case FETCH_OFFER_DETAILS_SUCCESS: {
            const newState = state.slice();
            action.data.forEach( item => { newState.push( item ) });
            return newState;
        }
        case FETCH_OFFER_DETAILS_ERROR: {
            const newState = state.slice();
            return newState.push({id: action.id, error: action.error});
        }
        default:
            return state;
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