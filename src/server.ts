import express from 'express';

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
    this.app.get('/', (req, res) => {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success',
      });
    });
  }
}

const expressServer = new HttpServer();
export default expressServer.app;
