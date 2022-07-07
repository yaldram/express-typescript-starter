import { z } from 'zod';

import { TodoStatus } from './todos.entity';

export const todosSchema = z.object({
  text: z.string({
    invalid_type_error: 'todo text should be a string',
    required_error: 'todo text is required',
  }),
  status: z.enum([TodoStatus.PENDING, TodoStatus.DONE], {
    errorMap() {
      return {
        message: 'todo status must be pending | done',
      };
    },
  }),
});

export const todoGetSchema = z.object({
  todoId: z
    .string({
      required_error: 'todoId is required',
    })
    .uuid({
      message: 'todo id should be uuid',
    }),
});
