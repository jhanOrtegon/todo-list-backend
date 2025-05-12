import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateListDto } from "./dto/create-list.dto";

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateListDto, userId: number) {
    if (!userId || typeof userId !== "number" || isNaN(userId)) {
      throw new BadRequestException("userId inválido");
    }

    try {
      return await this.prisma.list.create({
        data: {
          title: dto.title,
          userId,
        },
      });
    } catch (error) {
      console.error("[CREATE LIST ERROR]", error);
      throw new BadRequestException(
        "No se pudo crear la lista. Verifica los datos."
      );
    }
  }

  async findAll(userId: number) {
    if (!userId || typeof userId !== "number" || isNaN(userId)) {
      throw new BadRequestException("userId inválido");
    }

    try {
      return await this.prisma.list.findMany({
        where: { userId },
        include: { tasks: true },
      });
    } catch (error) {
      console.error("[FIND LISTS ERROR]", error);
      throw new InternalServerErrorException(
        "No se pudieron obtener las listas."
      );
    }
  }

  async delete(id: number, userId: number) {
    const list = await this.prisma.list.findUnique({ where: { id } });
    if (!list || list.userId !== userId) return null;

    await this.prisma.list.delete({ where: { id } });
    return true;
  }
}
