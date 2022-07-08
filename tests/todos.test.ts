import supertest from 'supertest';

import expressApp from '../src/server';
import { AppDataSource } from '../src/datasource';
import { Todos } from '../src/api/todos/todos.entity';
import { TodosService } from '../src/api/todos/todos.service';

describe('test todos endpoint with db connection', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    // await AppDataSource.createEntityManager().query(
    //   'truncate table todos cascade'
    // );
    await AppDataSource.destroy();
  });

  it('should fetch todos successfully', async () => {
    const response = await supertest(expressApp).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('todos');
  });

  it('should create a todo successfully', async () => {
    const response = await supertest(expressApp).post('/api/todos').send({
      text: 'setup testing',
      status: 'done',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('todo');
  });
});

const getTodoByIdMock = jest
  .spyOn(TodosService.prototype, 'getTodoById')
  .mockImplementation(async () => {
    return {} as Todos;
  });

describe('test todos endpoint with mocks', () => {
  it('should fetch todo successfully', async () => {
    const response = await supertest(expressApp).get(
      '/api/todos/0d853566-fe0d-11ec-92c2-0214694f2400'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('todo');
    expect(getTodoByIdMock).toHaveBeenCalled();
  });
});
