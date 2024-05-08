import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional() //* Una cosa es validar si es opcional esta propiedad de la clase..ClassValidator se usa para cuando llega la data....
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit?: number; //* Otra cosa es decirle a TS que esta propiedad puede ser opcional, aca lo usas para tu codigo, class validator se usa en cuanto a recibir la respuesta, lo analiza antes de seguir con el codigo

  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
