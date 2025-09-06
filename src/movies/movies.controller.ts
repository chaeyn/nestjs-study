import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('movies') // entry point -> /movies
export class MoviesController {
  @Get()
  getAll(): string {
    return '모든 영화를 가져옵니다.';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    // id를 파라미터로 받아옴
    return `${movieId}번 영화를 가져옵니다.`;
  }

  @Post()
  create() {
    return '영화를 생성합니다.';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `${movieId}번 영화를 삭제합니다.`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `${movieId}번 영화를 수정합니다.`;
  }
}

// Put은 전체 업데이트
// Patch는 부분 업데이트
