import { combineReducers } from 'redux';
import parentsReducer from './parents';
import offerDetails from './offer_details';
import common from './common';

export default combineReducers({
    parentsReducer,
    offerDetails,
    common
});