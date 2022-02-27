import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createCatDto): Promise<User> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async findOne(email: string): Promise<User | null> {
    const query = { email };
    const projection = { _id: 0, password: 0 };

    const user = await this.userModel.findOne(query, projection).exec();

    return user || null;
  }
}
