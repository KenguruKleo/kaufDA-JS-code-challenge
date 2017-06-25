import React from 'react';
import Offers from './parents';
import { Navbar, Panel, Row, Col, Nav, NavItem, Alert } from 'react-bootstrap';
import { initDatabase, clearInitDatabaseMessage } from '../reducers/common';
import { connect } from 'react-redux';

class App extends React.Component{

    render() {
        let alert = null;
        if( this.props.errorMessage ){
            alert = (
                <Alert bsStyle="danger" onDismiss={this.props.clearInitDatabaseMessage}>
                    <h4>Init database</h4>
                    <p>{ this.props.errorMessage }</p>
                </Alert>
            );
        }
        if( this.props.successMessage ){
            alert = (
                <Alert bsStyle="success" onDismiss={this.props.clearInitDatabaseMessage}>
                    <h4>Init database</h4>
                    <p>{ this.props.successMessage }</p>
                </Alert>
            );
        }
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand><a href="#">Code Challenge</a></Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick = {this.props.initDatabase}>Init database</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                { alert }
                <Row>
                    <Col lg = {8} lgOffset = {2}>
                        <Offers />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.common
    }), {initDatabase, clearInitDatabaseMessage}
)(App);