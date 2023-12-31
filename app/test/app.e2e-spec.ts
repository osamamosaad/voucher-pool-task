import { Test, TestingModule } from 'app/node_modules/@nestjs/testing';
import { INestApplication } from 'app/node_modules/@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
