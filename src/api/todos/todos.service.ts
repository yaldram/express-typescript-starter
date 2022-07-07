import { BaseService } from '../../utils/BaseService';

import { Todos, TodoStatus } from './todos.entity';

export class TodosService extends BaseService<Todos> {
  constructor() {
    super(Todos);
  }

  getAllTodos() {
    return this.repository.createQueryBuilder('todos').getMany();
  }

  getTodoById(todoId: string) {
    return this.repository
      .createQueryBuilder('todos')
      .where('todos.id = :id', { id: todoId })
      .getOne();
  }

  createTodo(text: string, status: TodoStatus) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Todos)
      .values({
        text,
        status,
      })
      .returning('*')
      .execute();
  }
}

export const todosService = new TodosService();
