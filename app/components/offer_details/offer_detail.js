import React from 'react';
import { Panel, ProgressBar, Button, Navbar, Alert } from 'react-bootstrap';
import OfferDetailProperties from './offer_detail_properties';

const OfferDetail = ( props ) => {
    const {
        id, offer, changeOfferFieldValue, loading, saving, error, createdAt,
        fetchOfferDetails, saveOfferDetails, deleteOfferDetails, resetErrorOfferDetails, createNewOfferDetails
    } = props;

    if( loading || saving ){
        return(
            <Panel>
                <ProgressBar active now={100} />
            </Panel>
        );
    }

    let haveOfferDetails = true;
    let isNew = true;
    let offerDetails = null;

    if( !offer || offer.length === 0 ){
        haveOfferDetails = false;
        offerDetails = <h3>No details</h3>;
    } else {
        offerDetails = offer.map( (item, index) =>
            <OfferDetailProperties
                { ...item}
                key = {id}
                id = {id}
                index = {index}
                changeOfferFieldValue = {changeOfferFieldValue}
            />
        );
        isNew = createdAt === undefined;
    }

    const handleAlertDismiss = () => resetErrorOfferDetails(id);
    let alert = null;
    if( error ){
        alert = (
            <Alert bsStyle="danger" onDismiss={handleAlertDismiss}>
                <h4>Error</h4>
                <p>{ error }</p>
                <p>
                    <Button onClick={handleAlertDismiss}>Hide Alert</Button>
                </p>
            </Alert>
        );
    }

    const save = () => saveOfferDetails(id);
    const refresh = () => fetchOfferDetails(id);
    const del = () => deleteOfferDetails(id);
    const create = () => createNewOfferDetails(id);

    return (
        <Panel>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a>Offer details</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        {' '}
                        <Button disabled = {haveOfferDetails} onClick={create}>Create</Button>
                        <Button disabled = { ! haveOfferDetails} onClick={save}>Save</Button>
                        <Button disabled = { ! haveOfferDetails || isNew} onClick={del}>Delete</Button>
                        <Button disabled = {isNew} onClick={refresh}>Refresh</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>

            { alert }

            { offerDetails }

        </Panel>
    );
};

export default OfferDetail;