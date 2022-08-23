"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
class Route {
    constructor(method, path) {
        this.method = method;
        this.path = path;
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    handler(req, res) { }
}
exports.Route = Route;
