import React from 'react';
import { connect } from 'react-redux';
import OfferDetail from '../components/offer_details/offer_detail';
import { changeOfferFieldValue } from '../reducers/offer_details';

function mapStateToProps( state, ownProps ){
    const item = state.offerDetails.filter(  item => item.id === ownProps.id );
    const offerDetail = item.length ? item : {};

    return {
        ...offerDetail[0]
    }
}

export default connect(
    mapStateToProps, { changeOfferFieldValue }
)(OfferDetail)
