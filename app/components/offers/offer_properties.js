import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import PriceProposal from './price_proposal';

const OfferProperties = ( {name, reducedPrice, originalPrice, productImagePointer} ) => {
    return (
        <Row>
            <Col xs = {4}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={4}>
                            Name
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" value={name} disabled/>
                        </Col>
                    </FormGroup>
                    <PriceProposal priceName="Reduced price" {...reducedPrice} />
                    <PriceProposal priceName="Original price" {...originalPrice} />
                </Form>
            </Col>
            <Col xs = {8}>
                <Image src={`/images/${productImagePointer.itemName}`} rounded />
            </Col>
        </Row>
    );
};

export default OfferProperties;