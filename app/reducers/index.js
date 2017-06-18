import { combineReducers } from 'redux';
import parentsReducer from './parents';
import offerDetails from './offer_details';

export default combineReducers({
    parentsReducer,
    offerDetails
});