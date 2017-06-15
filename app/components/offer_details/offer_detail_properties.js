import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import InputText from './input_text';

const OfferDetailProperties = ( props ) => {

    return (
        <Row>
            <Col xs={6}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={4}>
                            Category
                        </Col>
                        <Col xs={8}>
                            <InputText type="text" fieldName="category" {...props}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={4}>
                            Description
                        </Col>
                        <Col xs={8}>
                            <InputText type="textarea" fieldName="description" {...props}/>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
};

export default OfferDetailProperties;