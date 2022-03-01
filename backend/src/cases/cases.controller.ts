import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Case, ReviewDetails } from './schemas/case.schema';

@Controller('cases')
export class CasesController {
    constructor(
        private readonly casesService: CasesService
    ) {}

    @Get('/next')
    getNextCase(): Promise<Case> {
        return this.casesService.getNextCase();
    }

    @Post('/review/:id')
    submitCaseReview(
        @Param('id') id: string,
        @Body() reviewDetails: ReviewDetails
    ): Promise<Case> {
        return this.casesService.submitCaseReview(id, reviewDetails);
    }
}
