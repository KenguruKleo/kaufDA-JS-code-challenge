import React from 'react';
import { Panel, Label } from 'react-bootstrap';

const Offer = ( {id, createdAt} ) => {
    return (
        <Panel>
            <h3><Label>Offer:</Label> {id} <Label>created:</Label> {createdAt}</h3>
        </Panel>
    );
};

export default Offer;