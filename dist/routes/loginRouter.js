"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../schema/user");
const exception_1 = require("../_helpers/exception");
class UserRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getUsers(req, res, next) {
        //find user
        user_1.User.find().then((users) => {
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
        }).catch((err) => res.json(new exception_1.default(err)));
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/users', this.getUsers);
    }
}
exports.UserRouter = UserRouter;
// Create the User, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;
