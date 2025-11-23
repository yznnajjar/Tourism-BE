import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum FavoriteType {
  DESTINATION = 'destination',
  TOUR = 'tour',
  HOTEL = 'hotel',
}

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Favorite {
  @Prop({ enum: FavoriteType, required: true })
  type: FavoriteType;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Destination' })
  destinationId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tour' })
  tourId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Hotel' })
  hotelId?: Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
