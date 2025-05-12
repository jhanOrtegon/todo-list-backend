import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Iniciar sesión" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post("register")
  @ApiOperation({ summary: "Registrar nuevo usuario" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
        name: { type: "string" },
      },
    },
  })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
