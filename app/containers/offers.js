import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Navbar } from 'react-bootstrap';
import { fetchOffers, toggleShowDetails } from '../reducers/offers';
import Offer from '../components/offers/offer';

class Offers extends React.Component{
    componentDidMount(){
        this.props.fetchOffers();
    }

    render() {
        return (

            <Row>
                <Col mdOffset = {1} md = {10}>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a>Offers</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                    {this.props.offers.map(
                        offer => <Offer {...offer} key={offer.id} toggleShowDetails={this.props.toggleShowDetails}/>
                    )}
                </Col>
            </Row>
        );
    }
}

export default connect(
    state => ({
        ...state.offers
    }),
    { fetchOffers, toggleShowDetails }
)(Offers);