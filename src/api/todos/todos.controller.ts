import { Request, Response } from 'express';

const todos = [
  {
    id: '1',
    text: 'Run daily for 15 minutes',
  },
  {
    id: '2',
    text: 'Buy coffe',
  },
];

class TodoController {
  getAllTodos(req: Request, res: Response) {
    return res.status(200).json({
      status: true,
      statusCode: 200,
      todos,
    });
  }

  getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: `todo not found for id - ${id}`,
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      todo,
    });
  }
}

export const todosController = new TodoController();
