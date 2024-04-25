import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonModule } from './pokemon.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    //* inyeccion de dependencias va aca
    @InjectModel(Pokemon.name)
    private readonly PokemonModule: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.PokemonModule.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const pokemon = await this.PokemonModule.find();
    return pokemon;
  }

  async findOne(term: string) {
    let pokemon: Pokemon; //** this variable is equals to my entity

    //* is not a number the id?
    if (!isNaN(+term)) {
      pokemon = await this.PokemonModule.findOne({ no: term });
    }

    //*? Otro metodo de buscqueda puede ser por mongoID o por Name
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.PokemonModule.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.PokemonModule.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    //* CONTROL DE ERROR: if not exist the pokimon?
    // eslint-disable-next-line prettier/prettier
    if (!pokemon) throw new NotFoundException('Pokemon not found whit this metod');
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // * aca estoy usando la desestructuracion para "DeleteOne" que me esta devolviendo ese objeto con la propiedad "deletedCount" si es 0, manda error
    const { deletedCount } = await this.PokemonModule.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`pokemon whith id "${id}" not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon alerdy exists in database`);
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
