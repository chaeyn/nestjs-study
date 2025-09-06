import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @ApiProperty({ type: [String] })
  @IsString({ each: true }) // each는 모든 요소를 하나씩 검사
  @IsOptional()
  readonly genres: string[];
}
