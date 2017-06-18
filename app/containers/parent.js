import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, PageHeader } from 'react-bootstrap';
import Offer from '../components/offers/offer';

export default class Parent extends React.Component{

    render() {

        return (

            <Row>
                <Col mdOffset = {1} md = {10}>
                    <h3>
                        {`Parent #${this.props.id}`}
                    </h3>
                    {this.props.offers && this.props.offers.map(
                        offer => (
                            <Offer
                                {...offer}
                                key={offer.id}
                                toggleShowDetails={this.props.toggleShowDetails}
                                parentId={this.props.id}
                            />
                        )
                    )}
                </Col>
            </Row>
        );
    }
}
