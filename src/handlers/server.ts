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

		return new Promise(async (resolve, reject) => {
			const fileList = await fs.readdir(routesDir);

			const filteredFileList = fileList.filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'));
			if (!filteredFileList.length) return reject('No routes here...');

			filteredFileList.forEach(async ( file : string, index : number ) => {
				const routeFile = await import(path.join(routesDir, file));
				let route;
				for(let c in routeFile) {
					route = new routeFile[c]();
				}
				this.routes.push({ path: route.getPath(), route });

				if (index === filteredFileList.length - 1) {
					resolve();
				}
			});
		});
	}

	public registerRoutesToServer() : Promise<any> {
		const buildRouter = this.routes.map(( r: any ) => {

			// this is so you choose to either add a / or not when defining a route
			const path = (r.route.getPath()[0] === '/') ? r.route.getPath() : '/' + r.route.getPath();
			
			this.router[r.route.getMethod()].apply(this.router, [path, r.route.handler]);
			console.log('adding route:', r.route.getPath());
		});

		return Promise.all(buildRouter);
	}

	public getRouter(): Router {
		return <Router>this.router;
	}
}
