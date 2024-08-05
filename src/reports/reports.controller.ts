import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guard/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
	constructor(private reportsService: ReportsService) {}

	@Post('')
	@Serialize(ReportDto)
	@UseGuards(AuthGuard)
	createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
		return this.reportsService.create(body, user);
	}
}