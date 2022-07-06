import 'dotenv/config';

export const dbConfig = {
  development: {
    host: process.env.RDS_POSTGRES_HOST,
    username: process.env.RDS_POSTGRES_USERNAME,
    password: process.env.RDS_POSTGRES_PASSWORD,
    database: process.env.RDS_DATABASE_DEV,
  },
  test: {
    host: process.env.RDS_POSTGRES_HOST,
    username: process.env.RDS_POSTGRES_USERNAME,
    password: process.env.RDS_POSTGRES_PASSWORD,
    database: process.env.RDS_DATABASE_TEST,
  },
  production: {
    host: process.env.RDS_POSTGRES_HOST,
    username: process.env.RDS_POSTGRES_USERNAME,
    password: process.env.RDS_POSTGRES_PASSWORD,
    database: process.env.RDS_DATABASE_PROD,
  },
};
