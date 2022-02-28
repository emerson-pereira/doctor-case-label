import { Controller, Get } from '@nestjs/common';
import { ConditionsService } from './conditions.service';

@Controller('conditions')
export class ConditionsController {
    constructor(
        private readonly conditionsService: ConditionsService
    ) {}

    @Get()
    getConditions() {
        return this.conditionsService.getConditions();
    }
}
