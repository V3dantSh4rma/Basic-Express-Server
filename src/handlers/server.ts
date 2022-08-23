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


	public startServer( port : number ) : void {
		if ( port.toString().length > 4 ) {
			throw new Error("The port must be of at least 4 numbers.");
		}

		this.app.listen(Number(port), () => {
			console.log(`Server started. Listening it on port ${ port }.`);
		});
	}

	public registerRoutes() : void {
		fs.readdirSync(path.join(__dirname, "..", "routes"))
			.filter(( f : string ) => f.endsWith(".ts" || ".js"))
			.forEach(( file : string ) => {
				const routeFile : Route = require(file);
				this.routes.set(routeFile.getPath(), routeFile);
				console.log('setting route:', routeFile.getPath());
			});
	}

	public registerRoutesToServer() : void {
		this.routes.forEach(( route : Route ) => {
			// @ts-ignore
			this.app[route.getMethod()].apply(route.getPath(), route.handler);
			console.log('adding route:', route.getPath());
		});
	}
}
