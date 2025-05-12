import { IsEmail, IsString, MinLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "StrongP@ss123",
    description:
      "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un símbolo.",
  })
  password!: string;

  @ApiProperty({ example: "Juan Pérez" })
  @IsString()
  @MinLength(2)
  name!: string;
}
