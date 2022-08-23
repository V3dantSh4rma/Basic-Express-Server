"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = __importStar(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(app) {
        this.routes = []; // This is the container where we will store the routes (/).
        this.app = app;
        this.router = (0, express_1.Router)();
    }
    startServer(port) {
        if (port.toString().length > 4) {
            throw new Error("The port must be of at least 4 numbers.");
        }
        this.app.listen(Number(port), () => {
            console.log(`Server started. Listening it on port ${port}.`);
        });
    }
    registerRoutes() {
        const routesDir = path_1.default.join(__dirname, "..", "routes");
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const files = yield fs.readdir(routesDir);
            files.filter((f) => f.endsWith(".ts" || ".js"))
                .forEach((file, index) => __awaiter(this, void 0, void 0, function* () {
                const routeFile = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(routesDir, file))));
                let route;
                for (let c in routeFile) {
                    route = new routeFile[c]();
                }
                this.routes.push({ path: route.getPath(), route });
                if (index === files.length - 1) {
                    resolve();
                }
            }));
        }));
    }
    registerRoutesToServer() {
        const buildRouter = this.routes.map((r) => {
            this.router[r.route.getMethod()].apply(this.router, [r.route.getPath(), r.route.handler]);
            console.log('adding route:', r.route.getPath());
        });
        return Promise.all(buildRouter);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = Server;