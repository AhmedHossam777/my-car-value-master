import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/users.entity';

@Injectable()
export class ReportsService {
	constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

	create = async (reportDto: CreateReportDto, user: User) => {
		const report = this.repo.create(reportDto);
		report.user = user;
		// when we make save on report it's going to save just the userId
		return await this.repo.save(report);
	};
}