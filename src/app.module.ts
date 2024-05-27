import { join } from 'path'; //Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // *Configuraciones globales que utilizan ENV, ahora es utilizable en todos los modulos
    ConfigModule.forRoot({
      load: [EnvConfiguration], //Como estan definidos los datos en env.
      validationSchema: JoiValidationSchema, //Valida que exista la data y crea las variables de entorno definidas por defecto, sucede en caso de no entontrar la variable en env
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_CLOUD),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
