import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Image, form } from 'react-bootstrap';
import InputText from './input_text';
import InputTextWithLabel from './input_text_with_label';
import InputTextWithLabelVertical from './input_text_with_label_vertical';
import InputPriceOffer from './input_price_offer';
import InputImagePointer from './input_image_pointer';

const OfferDetailProperties = ( props ) => {

    return (
        <Row>
            <Col xs={6}>
                <Form horizontal>

                    <InputTextWithLabel type="text" fieldName="name" label="Name" {...props}/>
                    <InputTextWithLabel type="text" fieldName="category" label="Category" {...props}/>
                    <InputTextWithLabel type="text" fieldName="productName" label="Product name" {...props}/>
                    <InputTextWithLabel type="text" fieldName="retailerUrl" label="Related URL" {...props}/>
                    <InputTextWithLabel type="text" fieldName="productBrand" label="Product Brand" {...props}/>
                    <InputPriceOffer type="text" fieldName="reducedPrice" label="Reduced price" {...props}/>
                    <InputPriceOffer type="text" fieldName="originalPrice" label="Original price" {...props}/>
                    <InputImagePointer type="text" fieldName="productImagePointer" label="Image pointer" {...props}/>

                </Form>
            </Col>
            <Col xs={6}>
                <form>
                    <InputTextWithLabelVertical type="textarea" fieldName="description" label="Description" {...props}/>
                </form>
            </Col>
        </Row>
    );
};

export default OfferDetailProperties;