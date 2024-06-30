import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body.email, body.password);

    return user;
  }

  @Get('/')
  async getAllUsers() {
    const users = this.userService.getAll();

    return users;
  }
}
