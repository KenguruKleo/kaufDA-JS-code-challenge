import Api from '../transport/api';
import { fetchOfferDetails } from './offer_details';

const FETCH_OFFERS = 'kaufDA/parents/FETCH_OFFERS';
const FETCH_OFFERS_SUCCESS = 'kaufDA/parents/FETCH_OFFERS_SUCCESS';
const FETCH_OFFERS_ERROR = 'kaufDA/parents/FETCH_OFFERS_ERROR';
const FETCH_DETAILS = 'kaufDA/parents/FETCH_DETAILS';
const FETCH_DETAILS_SUCCESS = 'kaufDA/parents/FETCH_DETAILS_SUCCESS';
const TOGGLE_SHOW_DETAILS = 'kaufDA/parents/TOGGLE_SHOW_DETAILS';


function reduceItemsById(state, id, itemReducer){
    return state.map( item => {
        if( item.id === id ){
            return itemReducer( item );
        } else {
            return item;
        }
    });
}

function offers(state={}, action){
    switch (action.type) {
        case FETCH_DETAILS:
            return {
                ...state,
                loading: true
            };
        case FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case TOGGLE_SHOW_DETAILS:
            return {
                ...state,
                showDetails: !state.showDetails
            };
        default:
            return {
                ...state,
                showDetails: false,
                loading: false
            };
    }
}

const parentInitialState = {
    offers: [],
    showDetails: false,
    haveDetails: false
};

function parent(state=parentInitialState, action={}){
    switch (action.type) {
        case FETCH_DETAILS:
        case FETCH_DETAILS_SUCCESS:
        case TOGGLE_SHOW_DETAILS:
            return {
                ...state,
                //offers: state.offers.map( item => offers(item, action) )
                offers: reduceItemsById( state.offers, action.offerId, item => offers(item, action) )
            };
        default:
            return {...state};
    }
}

const parentsInitialState = {
    parents: [],
    loading: false,
    error: '',
    loaded: false
};

export default function reducer(state=parentsInitialState, action={}){
    switch (action.type) {
        case FETCH_OFFERS:
            return {
                ...state,
                parents: [],
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
                parents: action.parents
            };
        case FETCH_OFFERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error.message,
                loaded: true,
                parents: []
            };
        case FETCH_DETAILS:
        case FETCH_DETAILS_SUCCESS:
        case TOGGLE_SHOW_DETAILS:
            return {
                ...state,
                parents: reduceItemsById( state.parents, action.parentId, item => parent(item, action) )
            };
        default:
            return {
                ...state
            };
    }
}

export function fetchParents(){
    return dispatch => {
        dispatch( {type: FETCH_OFFERS} );

        return Api.fetchOffers()
            .then( data => {
                dispatch({
                    type: FETCH_OFFERS_SUCCESS,
                    parents: data
                });
            })
            .catch( error => {
                dispatch({
                    type: FETCH_OFFERS_ERROR,
                    error: error
                });
            })
        ;
    }
}

export function fetchDetails(parentId, offerId){
    return dispatch => {
        dispatch( {type: FETCH_DETAILS, parentId, offerId} );

        dispatch( fetchOfferDetails( offerId ) )
            .then( ()=>{
                dispatch( {type: FETCH_DETAILS_SUCCESS, parentId, offerId} );
            } );
    };
}

export function toggleShowDetails(parentId, offerId) {
    return (dispatch, getState) => {
        const state = getState().parentsReducer;
        const parent = state.parents.filter( parent => parent.id === parentId )[0];
        const items = parent.offers.filter( item => item.id === offerId );

        dispatch( {type: TOGGLE_SHOW_DETAILS, parentId, offerId} );

        //fetch data if closed
        if( items.length && ! items[0].showDetails ){
            dispatch( fetchDetails(parentId, offerId) );
        }

    };
}



