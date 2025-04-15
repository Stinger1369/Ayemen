import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  firstName: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  quote: string;

  @Prop({ required: true })
  query: string;

  @Prop()
  image: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
