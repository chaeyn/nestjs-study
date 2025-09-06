import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  // url을 가져오고 함수를 실행
  providers: [AppService],
})
// 모듈은 @Module 데코레이터로 주석이 달린 클래스
// 모듈은 Nest가 애플리케이션 구조를 구성하는데 사용되는 메타데이터 제공
export class AppModule {}
