import React from 'react';
import { Panel, Label } from 'react-bootstrap';
import OfferProperties from './offer_properties';
import OfferDetails from '../../containers/offer_details';

const Offer = ( props ) => {
    const {id, properties, toggleShowDetails, showDetails, loading} = props;



    return (
        <Panel >
            <h3><Label>{properties.name}</Label></h3>
            <OfferProperties
                {...properties}
                showDetails = {showDetails}
                toggleShowDetails = {toggleShowDetails}
                id = {id}
            />
            { showDetails ? <OfferDetails id={id} loading={loading}/> : null }
        </Panel>
    );
};

export default Offer;