import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';

const OfferDetailes = ( {category, description} ) => {
    return (
        <Row>
            <Col>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={4}>
                            Category
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" value={category}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={4}>
                            Description
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" value={description}/>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
};

export default OfferDetailes;