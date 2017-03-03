"use strict";
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const loginRouter_1 = require('./routes/loginRouter');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.startDb();
        this.middleware();
        this.routes();
    }
    //Start MongoDb
    startDb() {
        let uri = 'mongodb://localhost/Employee_DB';
        mongoose.connect(uri, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log('Connected to MongoDb');
            }
        });
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        this.express.use('/', loginRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
