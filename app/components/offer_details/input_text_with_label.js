import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import InputText from './input_text';

export default function InputTextWithLabel( props ) {
    const {label, ...restProps} = props;

    return(
        <FormGroup>
            <Col componentClass={ControlLabel} xs={4}>
                { label }
            </Col>
            <Col xs={8}>
                <InputText {...restProps}/>
            </Col>
        </FormGroup>
    );
}