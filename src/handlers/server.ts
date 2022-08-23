import express   from "express";
import { Route } from "./route";
import * as fs   from "fs";
import path      from "path";

export default class Server {
	private app : express.Express;
	public routes : Map<string, Route> = new Map(); // This is the container where we will store the routes (/).

	constructor( app : express.Express ){
		this.app = app;
	}


	public async startServer( port : number ) : Promise<void>{
		if ( port.toString().length > 4 ) {
			throw new Error("The port must be of at least 4 numbers.");
		}

		this.app.listen(Number(port), async () => {
			console.log(`Server started. Listening it on port ${ port }.`);
		});
	}

	public async registerRoutes() : Promise<void>{
		fs.readdirSync(path.join(__dirname, "..", "routes"))
		  .filter(( f : string ) => f.endsWith(".ts" || ".js"))
		  .forEach(( file : string ) => {
			  const routeFile : Route = require(file);
			  this.routes.set(routeFile.Route, routeFile);
		  });
		return;
	}

	public async registerRoutesToServer() : Promise<void>{
		this.routes.forEach(( route : Route, value : string ) => {
			this.app.get(route.Route, ( req, res ) => {
				return route.handle(req, res);
			});
		});
	}
}
