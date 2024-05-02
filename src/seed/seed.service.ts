import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './inferfaces/poke-response.interfaces';

@Injectable()
export class SeedService {
  protected readonly axios: AxiosInstance = axios;
  // * adaptador de proovedores

  async executeSeed() {
    // * despus del get lo que esta en <_> es para especificar como tiene que ser la data que me llega de la respuesta http, tambien me permite usar las propiedades de la interface, interactuando mejor con los tipos de datos que quiero obtener
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
    });
    return data;
  }
}
