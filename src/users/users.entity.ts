import { log } from 'console';
import {
	AfterInsert,
	AfterRemove,
	AfterUpdate,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Report, (report) => report.user)
	reports: Report[];

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