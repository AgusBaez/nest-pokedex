import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { PokeResponse } from './inferfaces/poke-response.interfaces';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  // * adaptador de proovedores
  protected readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModule: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.PokemonModule.deleteMany(); // delete* from pokemon

    // * despus del get lo que esta en <_> es para especificar como tiene que ser la data que me llega de la respuesta http, tambien me permite usar las propiedades de la interface, interactuando mejor con los tipos de datos que quiero obtener
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=5',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      //const pokemon = await this.PokemonModule.create({ name, no });

      pokemonToInsert.push({ name, no });
    });

    await this.PokemonModule.insertMany(pokemonToInsert);

    return 'seed executed';
  }
}
