import React from 'react';
import { Panel, Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import OfferDetailProperties from './offer_detail_properties';

const OfferDetail = ( props ) => {
    const {id, offer, changeOfferFieldValue} = props;

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