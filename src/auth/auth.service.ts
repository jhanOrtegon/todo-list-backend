import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async login(user: LoginDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    const isPasswordValid =
      existingUser &&
      (await bcrypt.compare(user.password, existingUser.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    try {
      const payload = { username: existingUser.email, sub: existingUser.id };
      return {
        access_token: this.jwtService.sign(payload),
        ...existingUser,
        password: undefined,
      };
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      throw new InternalServerErrorException("Error al generar el token");
    }
  }

  async register(userData: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
        },
      });
      return { user };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // Prisma error: Unique constraint failed
        throw new ConflictException("El correo ya está registrado");
      }

      console.error("[REGISTER ERROR]", error);
      throw new InternalServerErrorException("Error al registrar usuario");
    }
  }
}
