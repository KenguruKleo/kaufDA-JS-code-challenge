import Api from '../transport/api';

const CHANGE_OFFER_FIELD_VALUE = 'kaufDA/offerDetails/CHANGE_OFFER_FIELD_VALUE';
const RESET_ERROR_OFFER_DETAILS = 'kaufDA/offerDetails/RESET_ERROR_OFFER_DETAILS';
const FETCH_OFFER_DETAILS = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS';
const FETCH_OFFER_DETAILS_SUCCESS = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS_SUCCESS';
const FETCH_OFFER_DETAILS_ERROR = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS_ERROR';
const SAVE_OFFER_DETAILS = 'kaufDA/offerDetails/SAVE_OFFER_DETAILS';
const SAVE_OFFER_DETAILS_SUCCESS = 'kaufDA/offerDetails/SAVE_OFFER_DETAILS_SUCCESS';
const SAVE_OFFER_DETAILS_ERROR = 'kaufDA/offerDetails/SAVE_OFFER_DETAILS_ERROR';
const DELETE_OFFER_DETAILS = 'kaufDA/offerDetails/DELETE_OFFER_DETAILS';
const DELETE_OFFER_DETAILS_SUCCESS = 'kaufDA/offerDetails/DELETE_OFFER_DETAILS_SUCCESS';
const DELETE_OFFER_DETAILS_ERROR = 'kaufDA/offerDetails/DELETE_OFFER_DETAILS_ERROR';

export default function reducer(state=[], action={}){
    switch (action.type){
        case FETCH_OFFER_DETAILS:
            return state.filter( item => item.id !== action.id );
        case FETCH_OFFER_DETAILS_SUCCESS: {
            const newState = state.slice();
            newState.push( action.data );
            return newState;
        }
        case FETCH_OFFER_DETAILS_ERROR: {
            const newState = state.slice();
            newState.push({id: action.id, error: action.error.message});
            return newState;
        }
        case CHANGE_OFFER_FIELD_VALUE:
            return offerDetailsSelector( state, action.id, item => {
                //TODO add clone function for deep cloning
                const newItem = {
                    ...item,
                    offer: item.offer.slice()
                };
                let properties = { ...newItem.offer[ action.index ].properties};
                properties[ action.fieldName ]  = action.value;

                newItem.offer[ action.index ].properties = properties;
                return newItem;
            });
        case RESET_ERROR_OFFER_DETAILS:
            return offerDetailsSelector( state, action.id, item => ({...item, error: ''}) );
        case SAVE_OFFER_DETAILS:
        case DELETE_OFFER_DETAILS:
            return offerDetailsSelector( state, action.id, item => ({...item, saving: true, error: ''}) );
        case SAVE_OFFER_DETAILS_SUCCESS:
        case DELETE_OFFER_DETAILS_SUCCESS:
            return offerDetailsSelector( state, action.id, item => ({...item, saving: false, saved: true}) );
        case SAVE_OFFER_DETAILS_ERROR:
        case DELETE_OFFER_DETAILS_ERROR:
            return offerDetailsSelector(
                state, action.id, item => ({...item, saving: false, saved: false, error: action.error.message})
            );
        default:
            return state;
    }
}

function offerDetailsSelector(state, id, itemReducer){
    return state.map( item => {
        if( item.id === id ){
            return itemReducer( item );
        } else {
            return item;
        }
    });
}

export function getOfferDetailsById( state, id ){
    const items = state.filter( item => item.id === id );
    if( items.length ){
        return items[0];
    } else {
        return {};
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

export function changeOfferFieldValue( id, index, fieldName, value ){
    return {
        type: CHANGE_OFFER_FIELD_VALUE,
        id, index, fieldName, value
    }
}

export function resetErrorOfferDetails( id ) {
    return {
        type: RESET_ERROR_OFFER_DETAILS, id
    }
}

//to avoid store service information in DB
function extractServiceInformationFromItem( item ){
    const {saving, saved, error, ...dataForDB} = item;
    return dataForDB;
}

export function saveOfferDetails( id ) {
    return (dispatch, getState) => {
        dispatch( {type: SAVE_OFFER_DETAILS, id} );

        const state = getState().offerDetails;
        const item = extractServiceInformationFromItem(getOfferDetailsById( state, id ));

        return Api.saveOfferDetail( id, item )
            .then( () => {
                dispatch( {type: SAVE_OFFER_DETAILS_SUCCESS, id} );
                dispatch( fetchOfferDetails( id ) );
            })
            .catch( error => {
                dispatch( {type: SAVE_OFFER_DETAILS_ERROR, error, id} );
            } );
    }
}

export function deleteOfferDetails( id ) {
    return dispatch => {
        dispatch( {type: DELETE_OFFER_DETAILS, id} );

        return Api.deleteOfferDetail( id )
            .then( () => {
                dispatch( {type: DELETE_OFFER_DETAILS_SUCCESS, id} );
                dispatch( fetchOfferDetails( id ) );
            })
            .catch( error => {
                dispatch( {type: DELETE_OFFER_DETAILS_ERROR, error, id} );
            } );
    }
}