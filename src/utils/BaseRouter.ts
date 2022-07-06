import { Router } from 'express';

interface IRouter {
  router: Router;
  addRoutes(): void;
  returnApiEndpointRouter(): Router;
}

export abstract class BaseRouter implements IRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  abstract addRoutes(): void;

  abstract returnApiEndpointRouter(): Router;
}
