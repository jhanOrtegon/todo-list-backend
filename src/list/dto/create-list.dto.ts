import { IsNotEmpty, IsString } from "class-validator";

export class CreateListDto {
  @IsNotEmpty({ message: "El título es obligatorio." })
  @IsString({ message: "El título debe ser una cadena de texto." })
  title!: string;
}
