import Server  from "./handlers/server";
import express from "express";

const app : express.Express   = express();
const serverInstance : Server = new Server(app);
serverInstance.registerRoutes().then(() => {
  serverInstance.registerRoutesToServer().then(() => {
    app.use(serverInstance.getRouter());
    serverInstance.startServer(6969);
  }).catch(e => console.log(e));
}).catch(e => console.log(e));
