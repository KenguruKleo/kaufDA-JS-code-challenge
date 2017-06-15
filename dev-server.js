"use strict";
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number },
    { name: 'db_port', alias: 'd', type: Number }
];
const options = commandLineArgs(optionDefinitions);
console.log(options);

//*************************
//*		webpack-dev-server
//*************************
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require("./webpack.config.js");
const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
	hot: true,
  	inline: true,
	stats: { colors: true },
    contentBase: config.devServer.contentBase,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            pathRewrite: {'^/api' : ''},
            changeOrigin: true,
            secure: false
        }
    },
});
const port = options.port || 8080;
server.listen(port);
console.log('Main Server is running on port: ' + port);

//*****************************
//*		 json-server.js
//***************************
const jsonServer = require('json-server');
const server_json = jsonServer.create();
const router_json = jsonServer.router('./server/json-server/db.json');
const middlewares_json = jsonServer.defaults();

server_json.use(middlewares_json);
server_json.use(router_json);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

const db_port = options.db_port || 3000;
server_json.listen(db_port, function () {
  console.log('JSON Server is running on port: ' + db_port);
});
