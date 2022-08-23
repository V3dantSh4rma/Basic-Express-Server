import {Request, Response} from 'express';

export class Route {
	path: string;
	method: string;

	constructor(method: string, path: string) {
		this.method = method;
		this.path = path;
	}

	getPath(): string {
		return this.path;
	}

	getMethod(): string {
		return this.method;
	}

	handler(req: Request, res: Response) {}
}
