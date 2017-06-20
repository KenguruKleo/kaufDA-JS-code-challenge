"use strict";
const commandLineArgs = require('command-line-args');
const path = require('path');

const optionDefinitions = [
    { name: 'db_port', alias: 'd', type: Number }
];
const options = commandLineArgs(optionDefinitions);
console.log(options);

//*****************************
//*		 json-server.js
//***************************
const jsonServer = require('json-server');
const server_json = jsonServer.create();
const pathToData = path.join(__dirname, './db.json');
const router_json = jsonServer.router(pathToData);
const middlewares_json = jsonServer.defaults();

server_json.use(middlewares_json);
server_json.use(jsonServer.rewriter({
    '/api/': '/',
}));

const db = router_json.db;

server_json.use(jsonServer.bodyParser);
server_json.use('/offer_details/:id', (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        //update parents parents collection
        const parents = db.get('parents').value();
        if(parents) {

            parents.forEach( parent => {
                let parentId = undefined;

                const newOffers = parent.offers.map( offer => {

                    if( offer.id === req.params.id){
                        parentId = parent.id;
                        const newOffer = Object.assign({}, offer);
                        const offerDetails = req.body.offer[0];

                        newOffer.properties.name = offerDetails.properties.name;
                        newOffer.properties.reducedPrice = offerDetails.properties.reducedPrice;
                        newOffer.properties.originalPrice = offerDetails.properties.originalPrice;
                        newOffer.properties.productImagePointer = offerDetails.properties.productImagePointer;
                        return newOffer;
                    } else {
                        return offer;
                    }
                } );
                if( parentId ){
                    const newParent = Object.assign({}, parent);
                    newParent.offers = newOffers;
                    db.get('parents')
                        .find({ id: parentId })
                        .assign(newParent)
                        .write();
                    console.log('updated parent: '+parentId);
                }
            } )
        }
    }
    next();
});

server_json.use(router_json);

const db_port = options.db_port || 3000;
server_json.listen(db_port, function () {
  console.log('JSON Server is running on port: ' + db_port);
});
