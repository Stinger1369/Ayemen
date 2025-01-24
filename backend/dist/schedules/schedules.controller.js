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
exports.SchedulesController = void 0;
const common_1 = require("@nestjs/common");
const schedules_service_1 = require("./schedules.service");
let SchedulesController = class SchedulesController {
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
        this.ADMIN_KEY = 'superAdmin123';
    }
    async create(schedule) {
        if (schedule.adminKey !== this.ADMIN_KEY) {
            throw new common_1.UnauthorizedException('Access denied: Invalid admin key');
        }
        delete schedule.adminKey;
        return this.schedulesService.create(schedule);
    }
    async createMultiple(data) {
        if (data.adminKey !== this.ADMIN_KEY) {
            throw new common_1.UnauthorizedException('Access denied: Invalid admin key');
        }
        const { employeeId, tasks } = data;
        return this.schedulesService.createMultiple(employeeId, tasks);
    }
    async findAll() {
        return this.schedulesService.findAll();
    }
    async update(id, updateData) {
        if (updateData.adminKey !== this.ADMIN_KEY) {
            throw new common_1.UnauthorizedException('Access denied: Invalid admin key');
        }
        delete updateData.adminKey;
        return this.schedulesService.update(id, updateData);
    }
    async delete(id, body) {
        if (body.adminKey !== this.ADMIN_KEY) {
            throw new common_1.UnauthorizedException('Access denied: Invalid admin key');
        }
        return this.schedulesService.delete(id);
    }
};
exports.SchedulesController = SchedulesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "createMultiple", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "delete", null);
exports.SchedulesController = SchedulesController = __decorate([
    (0, common_1.Controller)('schedules'),
    __metadata("design:paramtypes", [schedules_service_1.SchedulesService])
], SchedulesController);
//# sourceMappingURL=schedules.controller.js.map