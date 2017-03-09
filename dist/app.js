"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const loginRouter_1 = require("./routes/loginRouter");
const cors = require("cors");
const rethinkdb = require("rethinkdb");
var connection;
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
        let uri = 'mongodb://localhost/FAP_dev';
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
    startReThinkDb() {
        rethinkdb.connect({
            db: "rethinkdb_ex",
            port: 28015
        }, (err, conn) => {
            if (err) {
                console.log("Could not open a connection to initialize the database");
                console.log(err.message);
                process.exit(1);
            }
            else {
                connection = conn;
                console.log('Started Db');
            }
        });
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(cors());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        this.express.use('/', loginRouter_1.default);
    }
}
exports.Conn = connection;
exports.default = new App().express;
