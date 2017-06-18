import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import Offer from '../offer/offer';

const Parent = (props) => {

    const {id, offers, toggleShowDetails} = props;

    return (

        <Row>
            <Col md = {12}>
                <h3>
                    {`Parent #${id}`}
                </h3>
                {offers && offers.map(
                    offer => (
                        <Offer
                            {...offer}
                            key={offer.id}
                            toggleShowDetails={toggleShowDetails}
                            parentId={id}
                        />
                    )
                )}
            </Col>
        </Row>
    );
}

export default Parent;
