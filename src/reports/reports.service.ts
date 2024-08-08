import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/users.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
	constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

	createEstimate(estimateDto: GetEstimateDto) {
		return this.repo
			.createQueryBuilder()
			.select('AVG(price), price')
			.where('make = :make', { make: estimateDto.make })
			.andWhere('model = :model', { model: estimateDto.model })
			.andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng })
			.andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat })
			.andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year })
			.andWhere('approved IS TRUE')
			.orderBy('ABS(mileage - :mileage)', 'DESC')
			.setParameters({ mileage: estimateDto.mileage })
			.limit(3)
			.getRawOne();
	}

	create = async (reportDto: CreateReportDto, user: User) => {
		const report = this.repo.create(reportDto);
		report.user = user;
		// when we make save on report it's going to save just the userId
		return await this.repo.save(report);
	};

	changeApproval = async (id: string, approved: boolean) => {
		const report = await this.repo.findOneBy({ id: parseInt(id) });
		if (!report) {
			throw new NotFoundException('report not found');
		}

		report.approved = approved;
		return await this.repo.save(report);
	};
}