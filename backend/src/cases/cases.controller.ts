import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
    constructor(
        private readonly casesService: CasesService
    ) {}

    @Get('/next')
    getNextCase() {
        return this.casesService.getNextCase();
    }

    @Patch('/:id')
    update(
        @Param('id') id,
        @Body() payload
    ) {
        return this.casesService.update(id, payload);
    }
}
