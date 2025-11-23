import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  icon?: string;

  @Prop()
  image?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
