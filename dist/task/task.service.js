"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TaskService = class TaskService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.task.create({ data: dto });
        }
        catch (error) {
            console.error("[CREATE TASK ERROR]", error);
            throw new common_1.BadRequestException("No se pudo crear la tarea. Verifica los datos enviados.");
        }
    }
    async findByListId(listId) {
        try {
            return await this.prisma.task.findMany({ where: { listId } });
        }
        catch (error) {
            console.error("[FIND TASKS BY LIST ID ERROR]", error);
            throw new common_1.BadRequestException("No se pudieron obtener las tareas para la lista especificada.");
        }
    }
    async toggleDone(taskId) {
        const task = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!task) {
            throw new common_1.NotFoundException(`Tarea con ID ${taskId} no encontrada.`);
        }
        try {
            return await this.prisma.task.update({
                where: { id: taskId },
                data: { done: !task.done },
            });
        }
        catch (error) {
            console.error("[TOGGLE TASK ERROR]", error);
            throw new common_1.BadRequestException("No se pudo actualizar el estado de la tarea.");
        }
    }
    async delete(id) {
        const result = await this.prisma.task.deleteMany({ where: { id } });
        return result.count > 0;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map