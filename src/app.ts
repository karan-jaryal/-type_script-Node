import * as path from 'path';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import loginRouter from './routes/loginRouter';
import * as cors from 'cors';
import * as config from 'config';
import * as rethinkdb from 'rethinkdb';
var connection;
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  
  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.startDb();
    this.middleware();
    this.routes();
  }

  //Start MongoDb
  private startDb(): void {

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

 private startReThinkDb(): void {

   rethinkdb.connect({
           db: "rethinkdb_ex",
           port:28015
   }, (err, conn)=> {
    if (err) {
        console.log("Could not open a connection to initialize the database");
        console.log(err.message);
        process.exit(1);
    }
     else{
        connection = conn;
       console.log('Started Db');
     }
   });

 } 

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/', loginRouter)
  }

}
export  const Conn =connection;
export default new App().express;