import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 'pending' })
  status: string; // 'pending', 'in-progress', 'completed'

  @Prop()
  message?: string; // Message optionnel pour l'employé
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
