import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Report {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	price: number;

	@Column()
	make: string;

	@Column()
	model: string;

	@Column()
	year: number;

	@Column()
	lat: number;

	@Column()
	lng: number;

	@Column()
	mileage: number;

	@ManyToOne(() => User, (user) => user.reports)
	user: User;
}