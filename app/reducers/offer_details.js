import Api from '../transport/api';

const FETCH_OFFER_DETAILS = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS';
const FETCH_OFFER_DETAILS_SUCCESS = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS_SUCCESS';
const FETCH_OFFER_DETAILS_ERROR = 'kaufDA/offerDetails/FETCH_OFFER_DETAILS_ERROR';
const CHANGE_OFFER_FIELD_VALUE = 'kaufDA/offerDetails/CHANGE_OFFER_FIELD_VALUE';

export default function reducer(state=[], action={}){
    switch (action.type){
        case FETCH_OFFER_DETAILS:
            return state.filter( item => item.id !== action.id );
        case FETCH_OFFER_DETAILS_SUCCESS: {
            const newState = state.slice();
            action.data.forEach( item => { newState.push( item ) });
            return newState;
        }
        case FETCH_OFFER_DETAILS_ERROR: {
            const newState = state.slice();
            return newState.push({id: action.id, error: action.error});
        }
        case CHANGE_OFFER_FIELD_VALUE:
            return state.map( item => {
                if( item.id === action.id  ){
                    //TODO add clone function for deep cloning
                    const newItem = {
                        ...item,
                        offer: item.offer.slice()
                    };
                    let properties = { ...newItem.offer[ action.index ].properties};
                    properties[ action.fieldName ]  = action.value;

                    newItem.offer[ action.index ].properties = properties;
                    return newItem;
                } else {
                    return item;
                }
            });
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

export function changeOfferFieldValue( id, index, fieldName, value ){
    return {
        type: CHANGE_OFFER_FIELD_VALUE,
        id, index, fieldName, value
    }
}