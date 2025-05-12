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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const task_service_1 = require("./task.service");
const task_dto_1 = require("./dto/task.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(dto, req) {
        const userId = req.user?.userId || req.user?.sub;
        return this.taskService.create({ ...dto });
    }
    findByList(listId) {
        return this.taskService.findByListId(listId);
    }
    toggle(id) {
        return this.taskService.toggleDone(id);
    }
    async delete(id) {
        const deleted = await this.taskService.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException("Tarea no encontrada o ya eliminada");
        return { message: "Tarea eliminada correctamente" };
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear nueva tarea" }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("list/:listId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener tareas de una lista" }),
    __param(0, (0, common_1.Param)("listId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findByList", null);
__decorate([
    (0, common_1.Patch)(":id/toggle"),
    (0, swagger_1.ApiOperation)({ summary: "Cambiar estado de completado de una tarea" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "toggle", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar una tarea por ID" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)("Tasks"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("tasks"),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map