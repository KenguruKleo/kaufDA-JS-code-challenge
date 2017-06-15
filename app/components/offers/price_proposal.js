import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const PriceProposal = ( {priceName, amount, currencyCode} ) => {
    return (
        <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} xs={4}>
                {priceName}
            </Col>
            <Col componentClass={ControlLabel} xs={4}>
                <FormControl type="text" value={amount} disabled/>
            </Col>
            <Col componentClass={ControlLabel} xs={4}>
                <FormControl type="text" value={currencyCode} disabled/>
            </Col>
        </FormGroup>
    );
};

export default PriceProposal;