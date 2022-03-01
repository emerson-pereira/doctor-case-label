import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Case, CaseDocument, ReviewDetails } from './schemas/case.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCaseDto } from './dto/case.dto';

@Injectable()
export class CasesService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  async create(caseData: CreateCaseDto): Promise<Case> {
    const newCase = new this.caseModel(caseData);
    return newCase.save();
  }

  async findOldestReviewableCase(): Promise<Case> | null {
    const query = { isReviewed: false };
    const sort = { createdAt: 1 };

    const oldestCase = await this.caseModel
      .findOne(query, {}, { sort })
      .lean()
      .exec();

    if (!oldestCase) return null;

    const { _id, ...rest } = oldestCase;

    return {
      ...rest,
      caseId: _id.toString(),
    };
  }

  async getNextCase(): Promise<Case> | null {
    const nextCase: Case = await this.findOldestReviewableCase();

    if (!nextCase) return null;

    return await this.setCaseStartTime(nextCase.caseId);
  }

  async setCaseStartTime(caseId: string): Promise<Case> | null {
    const caseData = await this.caseModel.findById(caseId);
  
    caseData.reviewDetails = {
      startTime: new Date()
    };

    return await caseData.save();
  }

  async submitCaseReview(
    caseId: string,
    reviewDetails: ReviewDetails,
  ): Promise<Case> | null {
    const caseData = await this.caseModel.findById(caseId);

    caseData.isReviewed = true;
    caseData.reviewDetails = {
      ...caseData.reviewDetails,
      ...reviewDetails,
      endTime: new Date()
    };

    return await caseData.save();
  }
}
