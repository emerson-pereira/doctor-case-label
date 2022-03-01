import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConditionsService } from './conditions.service';
import { Condition } from './schemas/condition.schema';

@Controller('conditions')
export class ConditionsController {
    constructor(
        private readonly conditionsService: ConditionsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getConditions(): Promise<Condition[]> {
        return this.conditionsService.getConditions();
    }
}
