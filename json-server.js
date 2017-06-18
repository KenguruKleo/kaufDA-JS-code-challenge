"use strict";
const commandLineArgs = require('command-line-args');

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
const router_json = jsonServer.router('./data/json-server/db.json');
const middlewares_json = jsonServer.defaults();

server_json.use(middlewares_json);
server_json.use(jsonServer.rewriter({
    '/api/': '/',
}));

const db = router_json.db;

server_json.use(jsonServer.bodyParser);
server_json.use('/offer_details/:id', (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log(req.params.id);
        //update parents parents collection
        const offers = db.get('parents').value();
        console.log(offers);
    }
    next();
});

server_json.use(router_json);

const db_port = options.db_port || 3000;
server_json.listen(db_port, function () {
  console.log('JSON Server is running on port: ' + db_port);
});
