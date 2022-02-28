import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

@Schema({ timestamps: true })
export class Case {
  @Prop()
  caseId: number;

  @Prop()
  content: string;

  @Prop()
  isReviewed: boolean;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
