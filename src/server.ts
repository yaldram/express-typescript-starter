import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import expressRateLimit from 'express-rate-limit';
import expressPinoLogger from 'express-pino-logger';

// Import our endpoint routers
import { todosRouter } from '@api/todos/todos.router';

// Import our Error classes
import { NotFoundError } from '@utils/NotFoundError';
import { ValidationError } from '@utils/ValidationError';
import { logger } from '@utils/logger';

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
    // add cors
    this.app.use(cors());
    // add security to the server using helmet middleware
    this.app.use(helmet());
    // protect against HTTP Parameter Pollution attacks
    this.app.use(hpp());
    // add rate limit to the whole server
    this.app.use(
      expressRateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      })
    );
    this.app.set('trust proxy', 1);
    // add logger middleware
    this.app.use(this.loggerSetup());
  }

  private loggerSetup() {
    return expressPinoLogger({
      logger: logger,
      autoLogging: false,
    });
  }

  // configure routes for express
  private addRoutes() {
    // route to know the number of proxies
    this.app.get('/ip', (request, response) => response.send(request.ip));
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        logger.fatal(`Error (Global Error Handler) - ${error.stack}`);
        // Handle 404 not found routes
        if (error instanceof NotFoundError) {
          return res.status(error.status).json({
            status: false,
            statusCode: error.status,
            message: error.message,
          });
        }

        // Handle zod request body, params validation
        if (error instanceof ValidationError) {
          return res.status(error.status).json({
            status: false,
            statusCode: error.status,
            message: error.message,
            errors: error.validationErrors,
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
