import { DataSource } from 'typeorm';

import { dbConfig } from './config/dbConfig';

const environment = (process.env.NODE_ENV ||
  'development') as keyof typeof dbConfig;

const credentials = dbConfig[environment];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: credentials.host,
  port: 5432,
  username: credentials.username,
  password: credentials.password,
  database: credentials.database,
  logging: true,
  synchronize: false,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
});
