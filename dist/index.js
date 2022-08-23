"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./handlers/server"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const serverInstance = new server_1.default(app);
serverInstance.registerRoutes().then(() => {
    console.log('registering routes...');
    serverInstance.registerRoutesToServer().then(() => {
        console.log('adding routes to the server...');
        app.use(serverInstance.getRouter());
        serverInstance.startServer(6969);
    }).catch(e => console.log(e));
}).catch(e => console.log(e));
