import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop()
  userId: number;

  @Prop()
  caseId: number;

  @Prop()
  conditionId: number;

  @Prop()
  timeReviewing: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
