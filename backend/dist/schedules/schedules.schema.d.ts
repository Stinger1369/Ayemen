import { Document } from 'mongoose';
export type ScheduleDocument = Schedule & Document;
export declare class Schedule {
    employeeId: string;
    task: string;
    date: Date;
    status: string;
    message?: string;
}
export declare const ScheduleSchema: import("mongoose").Schema<Schedule, import("mongoose").Model<Schedule, any, any, any, Document<unknown, any, Schedule> & Schedule & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Schedule, Document<unknown, {}, import("mongoose").FlatRecord<Schedule>> & import("mongoose").FlatRecord<Schedule> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
