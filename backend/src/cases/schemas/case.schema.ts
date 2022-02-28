import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

class ReviewDetails {
  @Prop()
  userId: number;

  @Prop()
  conditionId: number;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;
}

@Schema({ timestamps: true })
export class Case {
  @Prop()
  caseId: number;

  @Prop()
  content: string;

  @Prop()
  isReviewed: boolean;

  @Prop()
  reviewDetails: ReviewDetails
}

export const CaseSchema = SchemaFactory.createForClass(Case);
