import React from 'react';
import { Panel, ProgressBar } from 'react-bootstrap';
import OfferDetailProperties from './offer_detail_properties';

const OfferDetail = ( props ) => {
    const {id, offer, changeOfferFieldValue, loading} = props;
    console.log('loading='+loading);

    if( loading ){
        return(
            <Panel>
                <ProgressBar active now={100} />
            </Panel>
        );
    }

    if( !offer || offer.length === 0 ){
        return (
            <Panel>
                <h3>Have no details</h3>
            </Panel>
        );
    }

    return (
        <Panel>
            { offer.map( (item, index) =>
                <OfferDetailProperties key = {id}
                    { ...item} id = {id} index = {index} changeOfferFieldValue = {changeOfferFieldValue}
                />
            ) }
        </Panel>
    );
};

export default OfferDetail;