import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { setupSwagger } from './common/config/swagger.config';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a',
});

async function bootstrap() {
  const logger = new Logger('MAIN');

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(compression());

  const configService = app.get(ConfigService);

  app.use(morgan('tiny', { stream: logStream }));

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  logger.log(`server running on ${await app.getUrl()} : ` + new Date());
}
bootstrap();
