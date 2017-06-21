"use strict";
const commandLineArgs = require('command-line-args');
import express from 'express';
import http from 'http';
import bodyParcer from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import loadModels from './models';

const optionDefinitions = [
    { name: 'db_port', alias: 'd', type: Number }
];
const options = commandLineArgs(optionDefinitions);
console.log(options);

// DB Setup
mongoose.Promise = global.Promise;

const db = 'mongodb://localhost:27017/kaufda-js-code-challenge';
const connect = () => {
    mongoose.connect(db, (err) => {
        if (err) {
            console.log(`===>  Error connecting to ${db}`);
            console.log(`Reason: ${err}`);
        } else {
            console.log(`===>  Succeeded in connecting to ${db}`);
        }
    });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

loadModels();

const app = express();

// App Setup
app.use( morgan('combined') );
app.use( bodyParcer.json({type: '*/*'}) );

router(app);

// Server Setup
//const port = process.env.DB_PORT || 3000;
const port = options.db_port || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('DB Server listening on port '+port);