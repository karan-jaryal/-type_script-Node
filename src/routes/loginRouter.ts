import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../schema/user'
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
  public getUsers(req: Request, res: Response, next: NextFunction) {

    //find user

    User.find().then((users) => {
      //verify user was saved or not
      if (users === null) {
        res.sendStatus(404);
        next();
        return;
      }
      else {
        // rethinkdb.db('rethinkdb_ex').tableCreate('user').run(Conn, function (err, result) {
        //   if (err) throw err;
        //   res.json(JSON.stringify(result, null, 2));
        // });
        res.json(users);
      }
    }).catch((err) => res.json(new Exception(err)));

  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/users', this.getUsers);
  }

}

// Create the User, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;