import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedules.schema';
export declare class SchedulesService {
    private readonly scheduleModel;
    constructor(scheduleModel: Model<ScheduleDocument>);
    create(schedule: Partial<Schedule>): Promise<Schedule>;
    createMultiple(employeeId: string, tasks: {
        task: string;
        date: Date;
        message?: string;
    }[]): Promise<Schedule[]>;
    findAll(): Promise<Schedule[]>;
    update(id: string, updateData: Partial<Schedule>): Promise<Schedule>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
