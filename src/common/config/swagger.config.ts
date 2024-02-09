import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Duplo-Order-Manager API')
    .setDescription(
      'API that helps to curate and manage orders from duplo businesses',
    )
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Duplo-Order-Manager API Docs',
  };

  SwaggerModule.setup('api/v1/docs', app, document, customOptions);
}
