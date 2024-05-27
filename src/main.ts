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
      forbidNonWhitelisted: true, // * verifica que el objeto tiene que ser la misma data que se espera en nuestro DTO
      transform: true, //* Tranformar la data que llega por Query segun lo especificado en los DTO
      transformOptions: {
        enableImplicitConversion: true, //* Esto permite convertir la data enviada o recibida segun lo que declaremos en TS
      },
    }), // *, Aca declararias despues de la coma mas news pipes
  );

  //* Global Prefix Rute
  app.setGlobalPrefix('api/v2');
  await app.listen(process.env.PORT);
  console.log(`application is running on port ${process.env.PORT}`);
}
bootstrap();
