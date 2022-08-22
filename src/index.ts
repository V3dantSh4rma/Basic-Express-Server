import Server  from "./server";
import express from "express";

const app: express.Express = express();
const serverInstance: Server = new Server(app);
serverInstance.startServer("6969").catch(error => console.error(error));
