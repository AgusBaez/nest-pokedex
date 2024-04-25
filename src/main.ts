import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* global configuration pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // * valida los endpoints
      whitelist: true, // * remueve la data basura en los body rescibidos
      forbidNonWhitelisted: true, // * verifica que el objeto tiene que ser la misma data que se espera
    }), // *, Aca declararias despues de la coma, mas news pipes
  );

  //* Global Prefix Rute
  app.setGlobalPrefix('api/v2');
  await app.listen(3000);
}
bootstrap();
