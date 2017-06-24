import _ from 'lodash';
import OfferDetails from '../models/offer_details';
import Parents from '../models/parents';
import mongoose from 'mongoose';

export function all(req, res) {
    OfferDetails.find({}).exec((err, result) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(result);
    });
}

export function add(req, res) {
    const omitKeys = ['_id'];
    const data = _.omit(req.body, omitKeys);
    //data.id = req.params.id;
    console.log(data);

    OfferDetails.create(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }
        return res.send(result);
    });
}

export function getOne(req, res) {
    //const query = { _id: mongoose.Types.ObjectId(req.params.id) };
    const query = { id: req.params.id };

    OfferDetails.findOne(query, (err, result) => {
        if (err || !result) {
            console.log('Error on get!');
            return res.status(404).send('We failed to get for some reason');
        }
        return res.status(200).json(result);
    });

}

export function update(req, res) {
    const query = { id: req.params.id };
    const omitKeys = ['id', '_id'];
    const data = _.omit(req.body, omitKeys);

    OfferDetails.findOneAndUpdate(query, data, (err, result) => {
        if (err) {
            console.log('Error on save!');
            return res.status(500).send('We failed to save for some reason');
        }
        Parents.update(
            { offers: { $elemMatch: { id: req.params.id  } } },
            { $set: { "offers.$.properties.name" : data.offer[0].properties.name} },
            (err, resultParents) => {
                if (err) {
                    console.log('Error on save parent!');
                    return res.status(500).send('We failed to save for some reason');
                }
                return res.status(200).json(result);
            }
        );


    });

}

export function remove(req, res) {
    const query = { id: req.params.id };
    OfferDetails.findOneAndRemove(query, (err) => {
        if (err) {
            console.log('Error on delete');
            return res.status(500).send('We failed to delete for some reason');
        }

        return res.status(200).json('Removed Successfully');
    });
}

export default {
    all,
    add,
    update,
    remove,
    getOne
};