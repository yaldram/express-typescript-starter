import express, { Request, Response, NextFunction } from 'express';

// Import our endpoint routers
import { todosRouter } from './api/todos/todos.router';
import { NotFoundError } from './utils/NotFoundError';

export class HttpServer {
  public app: express.Application;

  constructor() {
    // Initialize express application
    this.app = express();
    // add express middlewares
    this.addMiddlewares();
    // add our routes
    this.addRoutes();
    // handle 404 not found routes
    this.globalNotFoundHandler();
    // handle all global errors
    this.globalErrorHandler();
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

  private globalNotFoundHandler() {
    this.app.use((req, res, next) => {
      const error = new NotFoundError('Resource not found', 404);
      next(error);
    });
  }

  private globalErrorHandler() {
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log('Error (Global Error Handler)', error.stack);
        if (error instanceof NotFoundError) {
          return res.status(error.status).json({
            status: false,
            statusCode: error.status,
            message: error.message,
          });
        }

        // Handling internal server errors
        return res.status(500).json({
          status: false,
          statusCode: 500,
          message: 'Something unusual Happened',
        });
      }
    );
  }
}

const expressServer = new HttpServer();
export default expressServer.app;
