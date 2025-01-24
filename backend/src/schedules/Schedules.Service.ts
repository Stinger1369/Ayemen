import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedules.schema';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<ScheduleDocument>,
  ) {}

  // Création d'un planning
  async create(schedule: Partial<Schedule>): Promise<Schedule> {
    const newSchedule = new this.scheduleModel(schedule);
    return newSchedule.save();
  }

  // Création de plannings multiples avec messages
  async createMultiple(
    employeeId: string,
    tasks: { task: string; date: Date; message?: string }[],
  ): Promise<Schedule[]> {
    const schedules = tasks.map((task) => ({
      ...task,
      employeeId,
    }));

    const createdSchedules = await this.scheduleModel.insertMany(schedules);

    return createdSchedules.map((doc) => doc.toObject() as Schedule);
  }

  // Récupération de tous les plannings
  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().exec();
  }

  // Mise à jour d'un planning
  async update(id: string, updateData: Partial<Schedule>): Promise<Schedule> {
    return this.scheduleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Suppression d'un planning
  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.scheduleModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
