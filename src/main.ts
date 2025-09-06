import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 없는 속성은 제거되어 저장
      forbidNonWhitelisted: true, // dto에 없는 속성이 있으면 HttpException 에러 던짐
      transform: true, // 파라미터 타입을 dto에 맞게 변환
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('영화 API')
    .setDescription('영화 정보 API입니다.')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
