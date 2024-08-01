import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
	let controller: UsersController;
	let fakeUserService: Partial<UsersService>;
	let fakeAuthService: Partial<AuthService>;

	beforeEach(async () => {
		// create a fake copy of users service
		fakeUserService = {
			findOne: (id: number) => {
				return Promise.resolve({
					id,
					email: 'asdf@asdf.com',
					password: 'asdf',
				} as User);
			},
			find: (email: string) => {
				return Promise.resolve([
					{
						id: 1,
						email,
						password: 'asdf',
					} as User,
				]);
			},
			remove: (id: number) => {
				return Promise.resolve({
					id,
					email: 'asdf@asdf.com',
					password: 'asdf',
				} as User);
			},
			update: (id: number, attrs: Partial<User>) => {
				return Promise.resolve({
					id,
					email: attrs.email ?? 'asdf@asdf.com',
					password: attrs.password ?? 'asdf',
				} as User);
			},
		};

		// Create a fake copy of the auth service
		fakeAuthService = {
			signIn: (email: string, password: string) => {
				return Promise.resolve({
					id: 1,
					email,
					password,
				} as User);
			},
			// signUp: (email, password) => {},
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: fakeUserService,
				},
				{
					provide: AuthService,
					useValue: fakeAuthService,
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('get all users should returns list of users of a given email', async () => {
		const users = await controller.getAllUsers('asdf@asdf.com');
		expect(users.length).toEqual(1);
		expect(users[0].email).toEqual('asdf@asdf.com');
	});

	it('get user should throw an error if user with given id not found', async () => {
		fakeUserService.findOne = () => null;
		await expect(controller.getUser('1')).rejects.toThrow(NotFoundException);
	});

	it('sign in updated session object and return a user', async () => {
		const session = { userId: -10 };
		const user = await controller.signin(
			{
				email: 'asdf@asdf.com',
				password: 'asdf',
			},
			session,
		);
		expect(user.id).toEqual(1); // as at the top the user the signin will produce has id=1
		expect(session.userId).toEqual(1);
	});
});