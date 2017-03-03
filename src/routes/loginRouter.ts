import {Router, Request, Response, NextFunction} from 'express';
import {UserSchema} from '../schema/user'
import { IUser } from "../_interfaces/user";
import Exception from "../_helpers/exception";
export class UserRouter {
  router: Router
  exception: Exception
  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
   
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public register(req: Request, res: Response, next: NextFunction) {
  
  //find user
 
    UserSchema.methods.create({"password":"dgfftyu98&*8"}).then((user: IUser) => {
      //verify user was saved or not
      if (user === null) {
        res.sendStatus(404);
        next();
        return;
      }
      else{
        res.json(new Exception("err"));
      }
    }).catch((err)=>res.json(new Exception(err)));

  }
 

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/register', this.register);
  }

}

// Create the User, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;