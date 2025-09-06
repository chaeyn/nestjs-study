// import { PartialType } from '@nestjs/mapped-types'; swagger에서 제공하는 PartialType을 써야 docs에 반영된다.
import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
