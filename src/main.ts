import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = 3000;

  await app.listen(port);

  logger.log(`server running on ${await app.getUrl()} : ` + new Date());
}
bootstrap();
