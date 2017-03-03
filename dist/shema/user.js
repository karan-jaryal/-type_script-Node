"use strict";
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    userName: String,
    password: String
});
exports.UserSchema.pre("save", next => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.User = mongoose_1.model("User", exports.UserSchema);
