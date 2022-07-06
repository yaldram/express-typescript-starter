import { Router } from 'express';

import { asyncHandler } from '../../middlewares/asyncHandler';
import { BaseRouter } from '../../utils/BaseRouter';
import { todosController } from './todos.controller';

class TodosRouter extends BaseRouter {
  constructor() {
    super();
  }

  addRoutes(): void {
    this.router.get('/', asyncHandler(todosController.getAllTodos));
    this.router.post('/', asyncHandler(todosController.createTodo));
    this.router.get('/:todoId', asyncHandler(todosController.getTodoById));
  }

  returnApiEndpointRouter(): Router {
    this.addRoutes();
    return this.router;
  }
}

export const todosRouter = new TodosRouter().returnApiEndpointRouter();
