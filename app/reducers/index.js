import { combineReducers } from 'redux';
import offers from './offers';
import offerDetails from './offer_details';

export default combineReducers({
    offers,
    offerDetails
});