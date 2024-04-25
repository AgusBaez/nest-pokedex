import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

//* Mira es una clase que extiende de otra clase, los atributos de la clase copiada aca van a ser Opcionales, aunque podrias ponerle que no lo sean
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
