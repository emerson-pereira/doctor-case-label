import { Controller, Get } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { Condition } from './schemas/condition.schema';

@Controller('conditions')
export class ConditionsController {
    constructor(
        private readonly conditionsService: ConditionsService
    ) {}

    @Get()
    getConditions(): Promise<Condition[]> {
        return this.conditionsService.getConditions();
    }
}
