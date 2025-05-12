import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/task.dto";

@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: "Crear nueva tarea" })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateTaskDto, @Request() req: any) {
    const userId = req.user?.userId || req.user?.sub;
    return this.taskService.create({ ...dto });
  }

  @Get("list/:listId")
  @ApiOperation({ summary: "Obtener tareas de una lista" })
  findByList(@Param("listId", ParseIntPipe) listId: number) {
    return this.taskService.findByListId(listId);
  }

  @Patch(":id/toggle")
  @ApiOperation({ summary: "Cambiar estado de completado de una tarea" })
  toggle(@Param("id", ParseIntPipe) id: number) {
    return this.taskService.toggleDone(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar una tarea por ID" })
  async delete(@Param("id", ParseIntPipe) id: number) {
    const deleted = await this.taskService.delete(id);
    if (!deleted)
      throw new NotFoundException("Tarea no encontrada o ya eliminada");
    return { message: "Tarea eliminada correctamente" };
  }
}
