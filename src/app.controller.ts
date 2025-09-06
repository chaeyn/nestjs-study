import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return '영화 API에 오신 것을 환영합니다.';
  }
}
