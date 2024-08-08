import {
	IsNumber,
	IsString,
	Min,
	Max,
	IsLatitude,
	IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
	@IsString()
	make: string;

	@IsString()
	model: string;

	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	@Min(1930)
	@Max(2050)
	year: number;

	@Transform(({ value }) => parseFloat(value))
	@IsLatitude()
	lat: number;

	@Transform(({ value }) => parseFloat(value))
	@IsLongitude()
	lng: number;

	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	@Min(0)
	@Max(1000000)
	mileage: number;
}