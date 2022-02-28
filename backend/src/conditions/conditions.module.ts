import { Module } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { ConditionsController } from './conditions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Condition, ConditionSchema } from './schemas/condition.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Condition.name, schema: ConditionSchema }])],
  providers: [ConditionsService],
  controllers: [ConditionsController],
  exports: [ConditionsService]
})
export class ConditionsModule {}
