import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
	let service: AuthService;
	let fakeUserService: Partial<UsersService>;

	beforeEach(async () => {
		// create a fake copy of users service
		fakeUserService = {
			find: () => Promise.resolve([]),

			create: (email: string, password: string) =>
				Promise.resolve({ id: 1, email, password } as User),
		};

		const module = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: fakeUserService,
				},
			],
		}).compile();

		service = module.get(AuthService);
	});

	it('can create an instance of auth service', async () => {
		expect(service).toBeDefined();
	});

	it('should create a new user with salted and hashed password', async () => {
		const user = await service.signUp('asdf@asdf.com', 'asdf');
		expect(user.password).not.toEqual('asdf');
		const [salt, hash] = user.password.split('.');
		expect(salt).toBeDefined();
		expect(hash).toBeDefined();
	});

	it('should throw an error if the user with email that is in use try to signup', async () => {
		fakeUserService.find = () =>
			Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

		await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
			BadRequestException,
		);
	});

	it('should throw an error if the user is try to signin with unused email', async () => {
		await expect(service.signIn('asdf@asdf.com', 'asdf')).rejects.toThrow(
			NotFoundException,
		);
	});

	it('should throw an error if the user entered a wrong password', async () => {
		fakeUserService.find = () =>
			Promise.resolve([
				{ email: 'asdf@asdf.com', password: 'salt.hash' } as User,
			]);

		await expect(
			service.signIn('asdf@asdf.com', 'wrongpassword'),
		).rejects.toThrow(BadRequestException);
	});
});