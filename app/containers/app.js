import React from 'react';
import Offers from '../containers/offers';
import { Navbar, Panel } from 'react-bootstrap'

class App extends React.Component{
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand><a href="#">Code Challenge</a></Navbar.Brand>

                    </Navbar.Header>
                </Navbar>
                <div>
                    <Offers />
                </div>
            </div>
        );
    }
}

export default App;