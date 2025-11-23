import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Destination' })
  destinationId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tour' })
  tourId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Hotel' })
  hotelId?: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
