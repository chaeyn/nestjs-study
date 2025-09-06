import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('영화 API에 오신 것을 환영합니다.');
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: '영화 제목', year: 2023, genres: ['액션', '모험'] })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
      // DELETE는 존재하지 않으므로 404 에러 반환
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: '업데이트된 영화 제목' })
        .expect(200);
    });
    it('PATCH 404', () => {
      return request(app.getHttpServer()).patch('/movies/999').expect(404);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/999').expect(404);
    });
  });
});
