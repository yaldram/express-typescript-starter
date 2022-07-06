import { MigrationInterface, QueryRunner } from 'typeorm';

export class todos1657099735622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query(`
           create table todos(
             id uuid primary key not null default uuid_generate_v1(),
             text varchar(255) not null,
             status varchar(125) not null check (status in ('pending', 'done')) default 'pending')
       `);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query('drop table todos');
  }
}
