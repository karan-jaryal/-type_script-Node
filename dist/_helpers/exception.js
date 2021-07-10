"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(message) {
    }
}
exports.Error = Error;
class Exception extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'Exception';
        this.message = message;
        this.stack = new Error().stack;
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
exports.default = Exception;
