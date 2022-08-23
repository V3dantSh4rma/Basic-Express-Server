import express, {Router}   from "express";
import { Route } from "./route";
import * as fs   from "fs/promises";
import path      from "path";

export default class Server {
	private app : express.Express;
	public routes: { path: string, route: Route }[] = []; // This is the container where we will store the routes (/).
	public router: { [n: string]: any };

	constructor( app : express.Express ){
		this.app = app;
		this.router = Router();
	}


	public startServer( port : number ) : void {
		if ( port.toString().length > 4 ) {
			throw new Error("The port must be of at least 4 numbers.");
		}

		this.app.listen(Number(port), () => {
			console.log(`Server started. Listening it on port ${ port }.`);
		});
	}

	public registerRoutes() : Promise<void> {
		const routesDir = path.join(__dirname, "..", "routes");

		return new Promise(async (resolve) => {
			const files = await fs.readdir(routesDir);
			files.filter(( f : string ) => f.endsWith(".ts" || ".js"))
				.forEach(async ( file : string, index : number ) => {
					const routeFile = await import(path.join(routesDir, file));
					let route;
					for(let c in routeFile) {
						route = new routeFile[c]();
					}
					this.routes.push({ path: route.getPath(), route });

					if (index === files.length - 1) {
						resolve();
					}
				});
		});
	}

	public registerRoutesToServer() : Promise<any> {
		const buildRouter = this.routes.map(( r: any ) => {
			this.router[r.route.getMethod()].apply(this.router, [r.route.getPath(), r.route.handler]);
			console.log('adding route:', r.route.getPath());
		});

		return Promise.all(buildRouter);
	}

	public getRouter(): Router {
		return <Router>this.router;
	}
}
