"use strict";
const express_1 = require('express');
const user_1 = require('../schema/user');
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
    register(req, res, next) {
        //find user
        user_1.UserSchema.methods.create({ "password": "dgfftyu98&*8" }).then((user) => {
            //verify user was saved or not
            if (user === null) {
                res.sendStatus(404);
                next();
                return;
            }
            else {
                res.json(new exception_1.default("err"));
            }
        }).catch((err) => res.json(new exception_1.default(err)));
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/register', this.register);
    }
}
exports.UserRouter = UserRouter;
// Create the User, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes.router;
