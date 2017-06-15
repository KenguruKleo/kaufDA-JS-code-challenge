import React from 'react';
import { connect } from 'react-redux';
import OfferDetail from '../components/offer_details/offer_detail';
import {
    changeOfferFieldValue, getOfferDetailsById, fetchOfferDetails,
    saveOfferDetails, deleteOfferDetails
} from '../reducers/offer_details';

function mapStateToProps( state, ownProps ){
    const offerDetail = getOfferDetailsById(state.offerDetails, ownProps.id );

    return {
        ...offerDetail
    }
}

export default connect(
    mapStateToProps,
    { changeOfferFieldValue, fetchOfferDetails, saveOfferDetails, deleteOfferDetails }
)(OfferDetail)
