import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Condition, ConditionDocument } from './schemas/condition.schema';

@Injectable()
export class ConditionsService {
    constructor(
        @InjectModel(Condition.name) private conditionModel: Model<ConditionDocument>
    ) {}
    
    async getConditions() {
        const query = {};
        const projection = { _id: 0, __v: 0 };

        const conditions = await this.conditionModel.find(query, projection).exec();

        return conditions || null;
    }
}
