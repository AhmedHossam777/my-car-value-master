import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Authentication system (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		setupApp(app);
		await app.init();
	});

	it('handles signup request', () => {
		const email = 'asdfasd132@asdf.com';

		return request(app.getHttpServer())
			.post('/auth/signup')
			.send({ email, password: '123456' })
			.expect(201)
			.then((res) => {
				const { id, email } = res.body;
				expect(id).toBeDefined();
				expect(email).toEqual(email);
			});
	});
});