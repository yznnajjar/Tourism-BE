import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum BookingType {
  TOUR = 'tour',
  HOTEL = 'hotel',
}

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ enum: BookingType, required: true })
  type: BookingType;

  @Prop({ enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  numberOfGuests?: number;

  @Prop()
  checkInDate?: Date;

  @Prop()
  checkOutDate?: Date;

  @Prop()
  tourDate?: Date;

  @Prop()
  specialRequests?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tour' })
  tourId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Hotel' })
  hotelId?: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
