import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Case, CaseDocument, ReviewDetails } from './schemas/case.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCaseDto } from './dto/case.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class CasesService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  async create(caseData: CreateCaseDto): Promise<Case> {
    const newCase = new this.caseModel(caseData);
    return newCase.save();
  }

  async findOldestAvailableCase(): Promise<Case> | null {
    const query = { isReviewed: false, isAssigned: false };
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

  async getNextCase(user: User): Promise<Case> | null {
    const nextCase: Case = await this.findOldestAvailableCase();

    if (!nextCase) return null;

    return await this.setCaseStartTime(nextCase.caseId, user);
  }

  async setCaseStartTime(caseId: string, user: User): Promise<Case> | null {
    const caseData = await this.caseModel.findById(caseId);

    caseData.isAssigned = true;
    caseData.reviewDetails = {
      userId: user.userId,
      startTime: new Date()
    };

    return await caseData.save();
  }

  async submitCaseReview({
    caseId,
    conditionId,
    user
  }): Promise<Case> | null {
    const caseData = await this.caseModel.findById(caseId);

    if (caseData?.reviewDetails?.userId !== user.userId) {
      throw new UnauthorizedException();
    }

    caseData.isReviewed = true;
    caseData.reviewDetails = {
      ...caseData.reviewDetails,
      conditionId,
      endTime: new Date()
    };

    return await caseData.save();
  }
}
