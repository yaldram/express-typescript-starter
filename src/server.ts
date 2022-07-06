import express from 'express';

// Import our endpoint routers
import { todosRouter } from './api/todos/todos.router';

export class HttpServer {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.addMiddlewares();
    this.addRoutes();
  }

  // configure middlewares for express
  private addMiddlewares() {
    // for parsing application/json
    this.app.use(express.json());
    // for parsing application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));
  }

  // configure routes for express
  private addRoutes() {
    this.app.use('/api/todos', todosRouter);
  }
}

const expressServer = new HttpServer();
export default expressServer.app;
