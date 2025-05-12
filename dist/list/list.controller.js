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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_list_dto_1 = require("./dto/create-list.dto");
const list_service_1 = require("./list.service");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    async create(dto, req) {
        const userId = req.user?.userId || req.user?.sub;
        if (!userId) {
            throw new common_1.BadRequestException("Usuario no autenticado");
        }
        return this.listService.create(dto, userId);
    }
    async findAll(req) {
        const userId = req.user?.userId || req.user?.sub;
        if (!userId) {
            throw new common_1.BadRequestException("Usuario no autenticado");
        }
        return this.listService.findAll(userId);
    }
    async delete(id, req) {
        const userId = req.user?.userId || req.user?.sub;
        if (!userId) {
            throw new common_1.BadRequestException("Usuario no autenticado");
        }
        const deleted = await this.listService.delete(id, userId);
        if (!deleted)
            throw new common_1.NotFoundException("Lista no encontrada o no autorizada");
        return { message: "Lista eliminada correctamente" };
    }
};
exports.ListController = ListController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear nueva lista" }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto, Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Obtener todas las listas del usuario" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar una lista por ID" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "delete", null);
exports.ListController = ListController = __decorate([
    (0, swagger_1.ApiTags)("Lists"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("lists"),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
//# sourceMappingURL=list.controller.js.map