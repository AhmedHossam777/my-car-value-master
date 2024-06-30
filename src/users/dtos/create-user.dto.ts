import { IsEmail, IsString, isString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
