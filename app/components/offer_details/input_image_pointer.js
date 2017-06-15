import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import InputText from './input_text';

export default function InputImagePointer( props ) {
    const {label, changeOfferFieldValue, fieldName, properties, ...restProps} = props;
    const value = properties[fieldName];

    const handleChangeImageName = ( id, index, fieldNameInt, newValue ) => {
        changeOfferFieldValue( id, index, fieldName, {...value, itemName: newValue} );
    };

    return(
        <FormGroup>
            <Col componentClass={ControlLabel} xs={4}>
                { label }
            </Col>
            <Col xs={8}>
                <InputText
                    {...restProps}
                    changeOfferFieldValue = {handleChangeImageName}
                    fieldName="itemName"
                    properties = {value}
                />
            </Col>
        </FormGroup>
    );
}