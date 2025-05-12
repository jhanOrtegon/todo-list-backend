import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateListDto } from "./dto/create-list.dto";
import { ListService } from "./list.service";

@ApiTags("Lists")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("lists")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @ApiOperation({ summary: "Crear nueva lista" })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateListDto, @Request() req: any) {
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      throw new BadRequestException("Usuario no autenticado");
    }

    return this.listService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: "Obtener todas las listas del usuario" })
  async findAll(@Request() req: any) {
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      throw new BadRequestException("Usuario no autenticado");
    }

    return this.listService.findAll(userId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar una lista por ID" })
  async delete(@Param("id", ParseIntPipe) id: number, @Request() req: any) {
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      throw new BadRequestException("Usuario no autenticado");
    }

    const deleted = await this.listService.delete(id, userId);
    if (!deleted)
      throw new NotFoundException("Lista no encontrada o no autorizada");
    return { message: "Lista eliminada correctamente" };
  }
}
