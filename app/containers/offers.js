import React from 'react';
import { connect } from 'react-redux';
import { Panel, Label } from 'react-bootstrap';
import { fetchOffers } from '../reducers/offers';
import Offer from '../components/offer';

class Offers extends React.Component{
    componentDidMount(){
        this.props.fetchOffers();
    }

    render() {
        return (
            <Panel>
                <h2><Label>Offers:</Label></h2>
                { this.props.offers.map( offer => <Offer {...offer} key={offer.id}/> ) }
            </Panel>
        );
    }
}

export default connect(
    state => ({
        ...state.offers
    }),
    { fetchOffers }
)(Offers);