import React from 'react';
import { Panel, Label } from 'react-bootstrap';
import OfferProperties from './offer_properties';

const Offer = ( {id, createdAt, properties} ) => {
    return (
        <Panel>
            <h3><Label>Offer:</Label> {id} <Label>created:</Label> {createdAt}</h3>
            <OfferProperties {...properties}/>
        </Panel>
    );
};

export default Offer;