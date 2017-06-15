import Api from '../transport/api';

const FETCH_OFFERS = 'kaufDA/offers/FETCH_OFFERS';
const FETCH_OFFERS_SUCCESS = 'kaufDA/offers/FETCH_OFFERS_SUCCESS';
const FETCH_OFFERS_ERROR = 'kaufDA/offers/FETCH_OFFERS_ERROR';

const initialState = {
    loading: false,
    error: '',
    loaded: false,
    offers: [],
    showDetails: false,
    haveDetails: false
};

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
                offers: action.offers
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

    }
}


