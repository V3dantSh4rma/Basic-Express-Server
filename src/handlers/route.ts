export abstract class Route {
	abstract Route : string;

	abstract handle( req: any, res : any ) : Promise<any>;
}
