'use strict';
const express = require('express');
const httpProxy = require('http-proxy');

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number }
];
const options = commandLineArgs(optionDefinitions);
console.log(options);

const PORT = options.port || 8080;

const app = express();
const apiProxy = httpProxy.createProxyServer();

app.all("/api/*", function(req, res) {
    //console.log('host='+req.hostname);
    //apiProxy.web(req, res, {target: "http://"+req.hostname+":3000"});
    apiProxy.web(req, res, {target: "http://localhost:3000"});
});

app.use(express.static('public'));

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);