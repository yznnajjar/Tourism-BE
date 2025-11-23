import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum HotelType {
  HOTEL = 'hotel',
  RESORT = 'resort',
  VILLA = 'villa',
  APARTMENT = 'apartment',
  HOSTEL = 'hostel',
}

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ enum: HotelType, default: HotelType.HOTEL })
  type: HotelType;

  @Prop({ required: true })
  address: string;

  @Prop()
  latitude?: number;

  @Prop()
  longitude?: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  thumbnail?: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  totalRooms: number;

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  checkInTime?: string;

  @Prop()
  checkOutTime?: string;

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: true })
  destinationId: Types.ObjectId;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
