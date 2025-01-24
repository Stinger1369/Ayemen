import { SchedulesService } from './schedules.service';
import { Schedule } from './schedules.schema';
interface ScheduleWithAdminKey extends Partial<Schedule> {
    adminKey?: string;
}
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    private readonly ADMIN_KEY;
    create(schedule: ScheduleWithAdminKey): Promise<Schedule>;
    createMultiple(data: {
        employeeId: string;
        tasks: {
            task: string;
            date: Date;
            message?: string;
        }[];
        adminKey: string;
    }): Promise<Schedule[]>;
    findAll(): Promise<Schedule[]>;
    update(id: string, updateData: ScheduleWithAdminKey): Promise<Schedule>;
    delete(id: string, body: {
        adminKey: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
export {};
