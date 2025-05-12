import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsNotEmpty()
  @IsInt()
  listId!: number;
}
