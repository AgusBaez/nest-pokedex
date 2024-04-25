import { MinLength, IsString, IsInt, IsPositive, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString({ message: 'El nombre no es valido' })
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
}
