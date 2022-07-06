import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  PENDING = 'pending',
  DONE = 'done',
}

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  })
  status: TodoStatus;
}
