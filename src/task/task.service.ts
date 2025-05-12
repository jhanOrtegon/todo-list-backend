import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    try {
      return await this.prisma.task.create({ data: dto });
    } catch (error) {
      console.error("[CREATE TASK ERROR]", error);
      throw new BadRequestException(
        "No se pudo crear la tarea. Verifica los datos enviados."
      );
    }
  }

  async findByListId(listId: number) {
    try {
      return await this.prisma.task.findMany({ where: { listId } });
    } catch (error) {
      console.error("[FIND TASKS BY LIST ID ERROR]", error);
      throw new BadRequestException(
        "No se pudieron obtener las tareas para la lista especificada."
      );
    }
  }

  async toggleDone(taskId: number) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${taskId} no encontrada.`);
    }

    try {
      return await this.prisma.task.update({
        where: { id: taskId },
        data: { done: !task.done },
      });
    } catch (error) {
      console.error("[TOGGLE TASK ERROR]", error);
      throw new BadRequestException(
        "No se pudo actualizar el estado de la tarea."
      );
    }
  }

  async delete(id: number) {
    const result = await this.prisma.task.deleteMany({ where: { id } });
    return result.count > 0;
  }
}
