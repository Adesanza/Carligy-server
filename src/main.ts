import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set Global Prefix / Base URL for all endpoints

  const BASE_PATH = '/api/v1';
  app.setGlobalPrefix(BASE_PATH, { exclude: ['health'] });

  // Cors configuration

  app.enableCors({
    origin: [
      process.env.CLIENT_BASE_LOCAL_URL,
      process.env.CLIENT_BASE_PRODUCTION_URL,
      process.env.CLIENT_BASE_STAGING_URL,
    ],
  });

  // Request validation setup

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Swagger setup

  const config = new DocumentBuilder()
    .setTitle('Carligy API Docs')
    .setDescription('The Carligy API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${BASE_PATH}/docs`, app, document);

  // Port to listen on
  await app.listen(parseInt(process.env.PORT) || 4900);
}
bootstrap();
