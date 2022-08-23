import { Request, Response } from "express";
import { Route } from "../handlers/route";

export class Another extends Route {
  constructor() {
    super('post', 'another');
  }

  handler(req: Request, res: Response): void {
    res.send({hello: 'from post'});
  }
}