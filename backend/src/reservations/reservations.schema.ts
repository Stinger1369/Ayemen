import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @Prop()
  userId?: string;

  @Prop({ required: true })
  serviceType: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  timeSlot: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  notes?: string;

  @Prop()
  assignedEmployeeId?: string;

  @Prop({ type: Object })
  clientInfo: {
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
  };
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
