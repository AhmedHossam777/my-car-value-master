import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'sqlite',
					database: configService.get<string>('DB_NAME'),
					synchronize: true,
					entities: [User, Report],
				};
			},
		}),
		UsersModule,
		ReportsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
