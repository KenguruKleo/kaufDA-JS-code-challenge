import React from 'react';
import Offers from './parents';
import { Navbar, Panel, Row, Col } from 'react-bootstrap'

class App extends React.Component{
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand><a href="#">Code Challenge</a></Navbar.Brand>

                    </Navbar.Header>
                </Navbar>
                <Row>
                    <Col lg = {8} lgOffset = {2}>
                        <Offers />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;