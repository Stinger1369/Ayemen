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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedules_schema_1 = require("./schedules.schema");
let SchedulesService = class SchedulesService {
    constructor(scheduleModel) {
        this.scheduleModel = scheduleModel;
    }
    async create(schedule) {
        const newSchedule = new this.scheduleModel(schedule);
        return newSchedule.save();
    }
    async createMultiple(employeeId, tasks) {
        const schedules = tasks.map((task) => ({
            ...task,
            employeeId,
        }));
        const createdSchedules = await this.scheduleModel.insertMany(schedules);
        return createdSchedules.map((doc) => doc.toObject());
    }
    async findAll() {
        return this.scheduleModel.find().exec();
    }
    async update(id, updateData) {
        return this.scheduleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async delete(id) {
        const result = await this.scheduleModel.findByIdAndDelete(id).exec();
        return { deleted: !!result };
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedules_schema_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map