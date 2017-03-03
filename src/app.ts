import * as path from 'path';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import loginRouter from './routes/loginRouter';

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
  private startDb():void{

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
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/',loginRouter)
  }

}

export default new App().express;