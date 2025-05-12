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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ListService = class ListService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        if (!userId || typeof userId !== "number" || isNaN(userId)) {
            throw new common_1.BadRequestException("userId inválido");
        }
        try {
            return await this.prisma.list.create({
                data: {
                    title: dto.title,
                    userId,
                },
            });
        }
        catch (error) {
            console.error("[CREATE LIST ERROR]", error);
            throw new common_1.BadRequestException("No se pudo crear la lista. Verifica los datos.");
        }
    }
    async findAll(userId) {
        if (!userId || typeof userId !== "number" || isNaN(userId)) {
            throw new common_1.BadRequestException("userId inválido");
        }
        try {
            return await this.prisma.list.findMany({
                where: { userId },
                include: { tasks: true },
            });
        }
        catch (error) {
            console.error("[FIND LISTS ERROR]", error);
            throw new common_1.InternalServerErrorException("No se pudieron obtener las listas.");
        }
    }
    async delete(id, userId) {
        const list = await this.prisma.list.findUnique({ where: { id } });
        if (!list || list.userId !== userId)
            return null;
        await this.prisma.list.delete({ where: { id } });
        return true;
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListService);
//# sourceMappingURL=list.service.js.map