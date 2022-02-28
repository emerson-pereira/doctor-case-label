import { Module } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { ConditionsController } from './conditions.controller';

@Module({
  providers: [ConditionsService],
  controllers: [ConditionsController]
})
export class ConditionsModule {}
