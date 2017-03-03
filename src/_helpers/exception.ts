export class Error {
    name: string;
    message: string;
    stack: string;
    constructor(message?: string){
        
    }
}


export  default class Exception extends Error {

    constructor(public message: string) {
        super(message);
        this.name = 'Exception';
        this.message = message;
        this.stack = (<any>new Error()).stack;
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}