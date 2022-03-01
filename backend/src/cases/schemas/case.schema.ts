import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

export class ReviewDetails {
  @Prop()
  userId?: string;

  @Prop()
  conditionId?: string;

  @Prop()
  startTime?: Date;

  @Prop()
  endTime?: Date;
}

@Schema({ timestamps: true })
export class Case {
  @Prop()
  caseId: string;

  @Prop()
  content: string;

  @Prop()
  isAssigned: boolean;

  @Prop()
  isReviewed: boolean;

  @Prop()
  reviewDetails?: ReviewDetails;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
