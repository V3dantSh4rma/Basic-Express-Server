import {Route} from "../handlers/route";

export class HelloWorld extends Route {
	public Route: string = '/hello';

	public async handle( req: any, res: any ) : Promise<any>{
		res.render({
			"hello":"world"
		});
	}

}
