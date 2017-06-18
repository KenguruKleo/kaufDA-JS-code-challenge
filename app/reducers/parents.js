import Api from '../transport/api';
import { fetchOfferDetails } from './offer_details';

const FETCH_PARENTS = 'kaufDA/parents/FETCH_PARENTS';
const FETCH_PARENTS_SUCCESS = 'kaufDA/parents/FETCH_PARENTS_SUCCESS';
const FETCH_PARENTS_ERROR = 'kaufDA/parents/FETCH_PARENTS_ERROR';
const FETCH_DETAILS = 'kaufDA/parents/FETCH_DETAILS';
const FETCH_DETAILS_SUCCESS = 'kaufDA/parents/FETCH_DETAILS_SUCCESS';
const TOGGLE_SHOW_DETAILS = 'kaufDA/parents/TOGGLE_SHOW_DETAILS';
const FETCH_PARENT = 'kaufDA/parents/FETCH_PARENT';
const FETCH_PARENT_SUCCESS = 'kaufDA/parents/FETCH_PARENT_SUCCESS';
const FETCH_PARENT_ERROR = 'kaufDA/parents/FETCH_PARENT_ERROR';


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
                offers: reduceItemsById( state.offers, action.offerId, item => offers(item, action) )
            };
        case FETCH_PARENT:
            return {
                ...state,
                loading: true
            };
        case FETCH_PARENT_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.parent,
                offers: action.parent.offers.map( offer => {
                    const found = state.offers.filter( offerOld => offerOld.id === offer.id );
                    if( found ){
                        return {...found[0], ...offer};
                    } else {
                        return offer;
                    }
                })
            };
        case FETCH_PARENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error.message
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
        case FETCH_PARENTS:
            return {
                ...state,
                parents: [],
                loading: true,
                error: '',
                loaded: false
            };
        case FETCH_PARENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                loaded: true,
                parents: action.parents
            };
        case FETCH_PARENTS_ERROR:
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
        case FETCH_PARENT:
        case FETCH_PARENT_SUCCESS:
        case FETCH_PARENT_ERROR:
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
        dispatch( {type: FETCH_PARENTS} );

        return Api.fetchParents()
            .then( data => {
                dispatch({
                    type: FETCH_PARENTS_SUCCESS,
                    parents: data
                });
            })
            .catch( error => {
                dispatch({
                    type: FETCH_PARENTS_ERROR,
                    error: error
                });
            })
        ;
    }
}

export function fetchParent( parentId ){
    return dispatch => {
        dispatch( {type: FETCH_PARENT, parentId} );

        return Api.fetchParent( parentId )
            .then( data => {
                dispatch({
                    type: FETCH_PARENT_SUCCESS,
                    parentId,
                    parent: data
                });
            })
            .catch( error => {
                dispatch({
                    type: FETCH_PARENT_ERROR,
                    parentId,
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



