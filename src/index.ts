import Server  from "./handlers/server";
import express from "express";

const app : express.Express   = express();
const serverInstance : Server = new Server(app);
serverInstance.registerRoutes();
serverInstance.registerRoutesToServer();

setTimeout(() => {
  serverInstance.startServer(6969);
}, 3000);
