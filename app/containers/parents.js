import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { fetchParents, toggleShowDetails } from '../reducers/parents';
import Parent from '../components/parent/parent';

class Parents extends React.Component{
    componentDidMount(){
        this.props.fetchParents();
    }

    render() {

        return (

            <Row>
                <Col mdOffset = {1} md = {10}>
                    {this.props.parents && this.props.parents.map(
                        parent => (
                            <Parent
                                {...parent}
                                key={parent.id}
                                toggleShowDetails={this.props.toggleShowDetails}
                            />
                        )
                    )}
                </Col>
            </Row>
        );
    }
}

export default connect(
    state => ({
        ...state.parentsReducer
    }),
    { fetchParents, toggleShowDetails }
)(Parents);