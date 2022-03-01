import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CasesService } from './cases.service';
import { Case, ReviewDetails } from './schemas/case.schema';

@UseGuards(JwtAuthGuard)
@Controller('cases')
export class CasesController {
    constructor(
        private readonly casesService: CasesService
    ) {}

    @Get('/next')
    getNextCase(@Request() req): Promise<Case> {
        return this.casesService.getNextCase(req.user);
    }

    @Post('/review/:id')
    submitCaseReview(
        @Param('id') caseId: string,
        @Body() reviewDetails: ReviewDetails,
        @Request() req
    ): Promise<Case> {
        return this.casesService.submitCaseReview({
            caseId,
            conditionId: reviewDetails.conditionId,
            user: req.user
        });
    }
}
