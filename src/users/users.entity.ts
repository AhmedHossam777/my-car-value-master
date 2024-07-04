import { log } from 'console';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    log(`new user added with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    log(`user with ${this.id} id has been updated`);
  }

  @AfterRemove()
  logDelete() {
    log(`user with ${this.id} id has been deleted`);
  }
}
