import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Condition, ConditionDocument } from './schemas/condition.schema';

@Injectable()
export class ConditionsService {
    constructor(
        @InjectModel(Condition.name) private conditionModel: Model<ConditionDocument>
    ) {}
    
    async getConditions(): Promise<Condition[]> | null {
        const conditions = await this.conditionModel.find().lean().exec();

        if (!conditions) return null;

        return conditions.map(({ _id, ...condition }) => ({
            ...condition,
            conditionId: _id.toString()
        }));
    }
}
