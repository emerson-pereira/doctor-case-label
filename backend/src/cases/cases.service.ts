import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Case, CaseDocument } from './schemas/case.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CasesService {
    constructor(
        @InjectModel(Case.name) private caseModel: Model<CaseDocument>
    ) {}

    async create(newCase): Promise<Case> {
        const createdCase = new this.caseModel(newCase);
        return createdCase.save();
    }

    async getNextCase() {
        const query = {};
        const projection = { _id: 0, __v: 0 };
        const sort = { createdAt: 1 };

        const nextCase = await this.caseModel.findOne(query, projection, { sort }).exec();

        return nextCase || null;
    }

    async update(id, payload) {
        const query = { caseId: id };

        const updated = await this.caseModel.findOneAndUpdate(query, { ...payload, isReviewed: true });

        return updated || null;
    }
}
