import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TourDocument = Tour & Document;

@Schema({ timestamps: true })
export class Tour {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  duration?: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  thumbnail?: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  maxParticipants: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  meetingPoint?: string;

  @Prop({ type: [String], default: [] })
  included: string[];

  @Prop({ type: [String], default: [] })
  excluded: string[];

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: true })
  destinationId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories: Types.ObjectId[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);
