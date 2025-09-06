import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'Test Movie',
      year: 2020,
      genres: ['test'],
    });
  });

  afterAll(() => {
    service['movies'] = [];
  }); // 모든 테스트가 끝난 후 영화 목록 초기화

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('영화를 생성해야 합니다', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getAll', () => {
    it('영화 목록 배열을 가져와야 합니다', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('영화 하나를 가져와야 합니다', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('404 에러를 던져야 합니다', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`999번 영화를 찾을 수 없습니다.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('영화 하나를 삭제해야 합니다', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('404 에러를 던져야 합니다', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`999번 영화를 찾을 수 없습니다.`);
      }
    });
  });

  describe('update', () => {
    it('영화 하나를 업데이트 해야 합니다', () => {
      service.update(1, { title: 'Updated Test Movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test Movie');
    });

    it('NotFoundException 에러를 던져야 합니다', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`999번 영화를 찾을 수 없습니다.`);
      }
    });
  });
});
