import { Body, Controller, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService
    ) {}

    @Post()
    async submitReview(@Body() review) {
        return await this.reviewsService.create(review);
    }
}
