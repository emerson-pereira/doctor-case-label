import { Controller, Get } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
    constructor(
        private readonly medicalCasesService: CasesService
    ) {}

    @Get('/next')
    getNextCase() {
        return this.medicalCasesService.getNextCase();
    }
}
