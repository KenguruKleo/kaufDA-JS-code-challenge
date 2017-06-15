import React from 'react';
import { Button, Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import PriceProposal from './price_proposal';

const OfferProperties = ( props) => {
    const {
        reducedPrice, originalPrice, productImagePointer, toggleShowDetails,
        showDetails, id
    } = props;

    const click = () => {
        toggleShowDetails(id);
    };

    return (
        <Row>
            <Col xs = {4}>
                <Form horizontal>
                    <PriceProposal priceName="Reduced price" {...reducedPrice} />
                    <PriceProposal priceName="Original price" {...originalPrice} />

                    <Button onClick={click}>{ !showDetails ? "Show details":"Hide details" }</Button>
                </Form>
            </Col>
            <Col xs = {8}>
                <Image src={`/images/${productImagePointer.itemName}`} rounded />
            </Col>
        </Row>
    );
};

export default OfferProperties;