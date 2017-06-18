import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import InputText from './input_text';

export default function InputPriceOffer( props ) {
    const {label, changeOfferFieldValue, fieldName, properties, ...restProps} = props;
    const value = properties[fieldName];

    const handleChangeAmount = ( id, index, fieldNameInt, newValue ) => {
        changeOfferFieldValue( id, index, fieldName, {...value, amount: +newValue} );
    };
    const handleChangeCurrencyCode = ( id, index, fieldNameInt, newValue ) => {
        changeOfferFieldValue( id, index, fieldName, {...value, currencyCode: newValue} );
    };

    return(
        <FormGroup>
            <Col componentClass={ControlLabel} xs={4}>
                { label }
            </Col>
            <Col xs={4}>
                <InputText
                    {...restProps}
                    changeOfferFieldValue = {handleChangeAmount}
                    fieldName="amount"
                    properties = {value}
                    type="number"
                />
            </Col>
            <Col xs={4}>
                <InputText
                    {...restProps}
                    changeOfferFieldValue = {handleChangeCurrencyCode}
                    fieldName="currencyCode"
                    properties = {value}
                />
            </Col>
        </FormGroup>
    );
}