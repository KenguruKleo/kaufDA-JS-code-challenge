import Api from '../transport/api';
import { fetchOfferDetails } from './offer_details';

const FETCH_OFFERS = 'kaufDA/offers/FETCH_OFFERS';
const FETCH_OFFERS_SUCCESS = 'kaufDA/offers/FETCH_OFFERS_SUCCESS';
const FETCH_OFFERS_ERROR = 'kaufDA/offers/FETCH_OFFERS_ERROR';
const FETCH_DETAILS = 'kaufDA/offers/FETCH_DETAILS';
const FETCH_DETAILS_SUCCESS = 'kaufDA/offers/FETCH_DETAILS_SUCCESS';
const TOGGLE_SHOW_DETAILS = 'kaufDA/offers/TOGGLE_SHOW_DETAILS';

const initialState = {
    loading: false,
    error: '',
    loaded: false,
    offers: [],
    showDetails: false,
    haveDetails: false
};

function detail(state={}, action){
    switch (action.type) {
        case FETCH_DETAILS:
            if (action.id === state.id){
                return {
                    ...state,
                    loading: true
                }
            } else {
                return {...state}
            }
        case FETCH_DETAILS_SUCCESS:
            if (action.id === state.id){
                return {
                    ...state,
                    loading: false
                }
            } else {
                return {...state}
            }
        case TOGGLE_SHOW_DETAILS:
            if (action.id === state.id){
                return {
                    ...state,
                    showDetails: !state.showDetails
                }
            } else {
                return {...state}
            }
        default:
            return {
                ...state,
                showDetails: false,
                loading: false
            };
    }
}

export default function reducer(state=initialState, action={}){
    switch (action.type) {
        case FETCH_OFFERS:
            return {
                ...state,
                loading: true,
                error: '',
                loaded: false
            };
        case FETCH_OFFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                loaded: true,
                offers: action.offers.map( item => detail(item, action) )
            };
        case FETCH_DETAILS:
            return {
                ...state,
                offers: state.offers.map( item => detail(item, action) )
            };
        case FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                offers: state.offers.map( item => detail(item, action) )
            };
        case TOGGLE_SHOW_DETAILS:
            return {
                ...state,
                offers: state.offers.map( item => detail(item, action) )
            };
        default:
            return {
                ...state
            };
    }
}

export function fetchOffers(){
    return dispatch => {
        dispatch( {type: FETCH_OFFERS} );

        return Api.fetchOffers()
            .then( data => {
                dispatch({
                    type: FETCH_OFFERS_SUCCESS,
                    offers: data.offers
                });
            })
            .catch( error => {
                dispatch({
                    type: FETCH_OFFERS_SUCCESS,
                    offers: error
                });
            })
        ;
    }
}

export function fetchDetails(id){
    return dispatch => {
        dispatch( {type: FETCH_DETAILS, id} );

        dispatch( fetchOfferDetails( id ) )
            .then( ()=>{
                dispatch( {type: FETCH_DETAILS_SUCCESS, id} );
            } );
    };
}

export function toggleShowDetails(id) {
    return (dispatch, getState) => {
        const state = getState().offers;
        const items = state.offers.filter( item => item.id === id );

        dispatch( {type: TOGGLE_SHOW_DETAILS, id} );

        //fetch data if closed
        if( items.length && ! items[0].showDetails ){
            dispatch( fetchDetails(id) );
        }

    };
}


