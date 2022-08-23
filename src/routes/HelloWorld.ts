import { Request, Response } from "express";
import {Route} from "../handlers/route";

export class HelloWorld extends Route {
	constructor() {
		super("get", "/hello");
	}

	handler(req: Request, res: Response): void {
		res.send({ hello: 'world' });
	}
}
