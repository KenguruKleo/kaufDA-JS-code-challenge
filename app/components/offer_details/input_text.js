import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';

export default function InputText( props ) {
    const { type, fieldName, properties, id, index, changeOfferFieldValue } = props;
    const value = properties[fieldName];

    const handleChange = event => {
        changeOfferFieldValue( id, index, fieldName, event.target.value );
    };

    return (
        <FormControl type = {type} value = {value} onChange={handleChange}/>
    );
}