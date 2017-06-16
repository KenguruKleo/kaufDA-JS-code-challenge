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
server_json.use(router_json);

server_json.use(jsonServer.bodyParser);
server_json.use((req, res, next) => {
    if (req.method === 'POST') {
        //req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
});

const db_port = options.db_port || 3000;
server_json.listen(db_port, function () {
  console.log('JSON Server is running on port: ' + db_port);
});
