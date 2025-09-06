import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies') // entry point -> /movies
export class MoviesController {
  @Get()
  getAll(): string {
    return '모든 영화를 가져옵니다.';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `${searchingYear}년 이후의 영화를 검색합니다`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    // id를 파라미터로 받아옴
    return `${movieId}번 영화를 가져옵니다.`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `${movieId}번 영화를 삭제합니다.`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}

// Put은 전체 업데이트
// Patch는 부분 업데이트
