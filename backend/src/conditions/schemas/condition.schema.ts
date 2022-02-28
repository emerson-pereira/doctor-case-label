import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConditionDocument = Condition & Document;

@Schema()
export class Condition {
  @Prop()
  conditionId: string;

  @Prop()
  code: string;

  @Prop()
  description: string;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);
