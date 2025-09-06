import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // controller는 url을 가져오고 함수를 실행하는 역할
  // service는 비즈니스 로직을 처리하는 역할 -> 실제로 함수를 가지는 부분

  @Get('/hello')
  sayHello(): string {
    // return 'Hello Nest!';
    return this.appService.getHi();
  }
  // 데코레이터와 함수는 띄어쓰기가 없어야 한다
  // express.js의 app.get()
}
