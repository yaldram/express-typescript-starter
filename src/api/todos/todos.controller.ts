import { Request, Response } from 'express';

import { todosService } from './todos.service';

class TodoController {
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await todosService.getAllTodos();
      return res.status(200).json({
        status: true,
        statusCode: 200,
        todos,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Something unusual Happened',
      });
    }
  }

  async getTodoById(req: Request, res: Response) {
    try {
      const { id: todoId } = req.params;
      const todo = await todosService.getTodoById(todoId);
      if (!todo) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: `todo not found for id - ${todoId}`,
        });
      }

      return res.status(200).json({
        status: true,
        statusCode: 200,
        todo,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Something unusual Happened',
      });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { text, status } = req.body;
      const newTodo = await todosService.createTodo(text, status);
      return res.status(201).json({
        status: true,
        statusCode: 201,
        todo: newTodo.raw,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Something unusual Happened',
      });
    }
  }
}

export const todosController = new TodoController();
