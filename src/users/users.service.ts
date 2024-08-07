import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	async create(email: string, password: string) {
		const user = this.repo.create({ email, password });

		return await this.repo.save(user);
	}

	async findOne(id: string) {
		if (!id) {
			throw new NotFoundException('user not found');
		}
		return await this.repo.findOneBy({ id: parseInt(id) });
	}

	async find(email: string) {
		return await this.repo.find({ where: { email } });
	}

	async update(id: string, attrs: Partial<User>) {
		const user = await this.repo.findOneBy({ id: parseInt(id) });
		if (!user) {
			throw new NotFoundException('user not found');
		}

		Object.assign(user, attrs);

		return this.repo.save(user);
	}

	async remove(id: string) {
		const user = await this.repo.findOneBy({ id: parseInt(id) });
		if (!user) {
			throw new NotFoundException('user not found');
		}

		return this.repo.remove(user);
	}
}