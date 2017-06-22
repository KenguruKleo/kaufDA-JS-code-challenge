import _ from 'lodash';
import OfferDetails from '../models/offer_details';
import Parents from '../models/parents';
import fs from 'fs';
import path from 'path';

export function initDatabase(req, res){
    initSchema(OfferDetails, 'offer_details');
    initSchema(Parents, 'parents');

    return res.send('OK');
}

function initSchema(Schema, objectName){
    Schema.remove({}).exec((err, result) => {
        if (err) {
            console.log('Error in cleaning theme');
            return err;
        }

        const contents = fs.readFileSync(path.join(__dirname, "../origin_db.json"));
        const jsonContent = JSON.parse(contents);
        //console.log(jsonContent);
        jsonContent[objectName].forEach( item => {
            Schema.create(item, (err, result) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                return result;
            });
        });

        return result;
    });
}