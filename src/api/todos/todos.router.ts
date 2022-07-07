import { Router } from 'express';

import { asyncHandler } from '../../middlewares/asyncHandler';
import { BaseRouter } from '../../utils/BaseRouter';
import { todosController } from './todos.controller';
import { todosSchema, todoGetSchema } from './todos.validation';
import {
  validateRequestBody,
  validateRequestParams,
} from '../../middlewares/validate';

class TodosRouter extends BaseRouter {
  constructor() {
    super();
  }

  addRoutes(): void {
    this.router.get('/', asyncHandler(todosController.getAllTodos));
    this.router.post(
      '/',
      validateRequestBody(todosSchema),
      asyncHandler(todosController.createTodo)
    );
    this.router.get(
      '/:todoId',
      validateRequestParams(todoGetSchema),
      asyncHandler(todosController.getTodoById)
    );
  }

  returnApiEndpointRouter(): Router {
    this.addRoutes();
    return this.router;
  }
}

export const todosRouter = new TodosRouter().returnApiEndpointRouter();
