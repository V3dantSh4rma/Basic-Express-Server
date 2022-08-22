import express from "express";
import console from "console";

export default class Server {
	private app: express.Express;
	constructor(app: express.Express){
		this.app = app;
	}


	public async startServer(port: string): Promise<void> {
		if(port.length > 4){
			throw new Error("The port must be of at least 4 numbers.");
		}

		this.app.listen(Number(port), async () => {
			console.log(`Server started. Listening it on port ${port}.`);
		});
	}
}
