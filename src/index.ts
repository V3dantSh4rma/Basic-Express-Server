import Server  from "./handlers/server";
import express from "express";

const app : express.Express   = express();
const serverInstance : Server = new Server(app);
serverInstance.startServer(6969).catch(error => console.error(error));
serverInstance.registerRoutes().catch(e => console.error(e));
serverInstance.registerRoutesToServer().catch(e => console.error(e));
