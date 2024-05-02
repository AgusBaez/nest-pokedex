import { join } from 'path'; //Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(
      `mongodb+srv://agus_baez:1JSwskSS0qUGTSGf@pokemon.z4xmwae.mongodb.net/`,
    ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
