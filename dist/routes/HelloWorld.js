"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorld = void 0;
const route_1 = require("../handlers/route");
class HelloWorld extends route_1.Route {
    constructor() {
        super("get", "/hello");
    }
    handler(req, res) {
        res.send({ hello: 'world' });
    }
}
exports.HelloWorld = HelloWorld;
