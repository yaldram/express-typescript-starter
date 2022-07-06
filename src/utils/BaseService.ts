import { EntityTarget, Repository } from 'typeorm';

import { AppDataSource } from '../datasource';

export class BaseService<T> {
  repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity);
  }
}
