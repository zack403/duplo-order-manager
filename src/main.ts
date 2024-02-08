import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors();

  app.use(compression());

  const configService = app.get(ConfigService);

  app.use(morgan('tiny', { stream: logStream }));

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  logger.log(`server running on ${await app.getUrl()} : ` + new Date());
}
bootstrap();
