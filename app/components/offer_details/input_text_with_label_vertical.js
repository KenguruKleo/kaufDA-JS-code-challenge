import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';
import InputText from './input_text';

export default function InputTextWithLabelVertical( props ) {
    const {label, ...restProps} = props;

    return(
        <FormGroup>
            <ControlLabel> { label } </ControlLabel>
            <InputText {...restProps}/>
        </FormGroup>
    );
}