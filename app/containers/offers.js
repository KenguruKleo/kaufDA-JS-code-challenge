import React from 'react';
import { connect } from 'react-redux';
import { Panel, Row, Col } from 'react-bootstrap';
import { fetchOffers, toggleShowDetails } from '../reducers/offers';
import Offer from '../components/offer';

class Offers extends React.Component{
    componentDidMount(){
        this.props.fetchOffers();
    }

    render() {
        return (
            <Panel>
                <Row>
                    <Col>
                        <h2>Offers:</h2>
                    </Col>
                    <Col xsOffset = {1}>
                        {this.props.offers.map(
                            offer => <Offer {...offer} key={offer.id} toggleShowDetails={this.props.toggleShowDetails}/>
                        )}
                    </Col>
                </Row>
            </Panel>
        );
    }
}

export default connect(
    state => ({
        ...state.offers
    }),
    { fetchOffers, toggleShowDetails }
)(Offers);