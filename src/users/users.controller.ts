import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Patch,
	Delete,
	Query,
	Session,
	UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from '../guard/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
	constructor(
		private userService: UsersService,
		private authService: AuthService,
	) {}

	@Get('/whoAmI')
	@UseGuards(AuthGuard)
	whoAmI(@CurrentUser() user: User) {
		return user;
	}

	@Post('/signup')
	async createUser(@Body() body: CreateUserDto, @Session() session: any) {
		const user = await this.authService.signUp(body.email, body.password);
		session.userId = user.id;
		return user;
	}

	@Post('/signin')
	async signin(@Body() body: CreateUserDto, @Session() session: any) {
		const user = await this.authService.signIn(body.email, body.password);
		session.userId = user.id;
		return user;
	}

	@Post('/signout')
	singOut(@Session() session: any) {
		session.userId = null;
	}

	@Get('')
	getAllUsers(@Query('email') email: string) {
		return this.userService.find(email);
	}

	@Get('/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Delete('/:id')
	deleteUser(@Param('id') id: string) {
		return this.userService.remove(id);
	}

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.userService.update(id, body);
	}
}