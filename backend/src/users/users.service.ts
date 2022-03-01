import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).lean().exec();

    if (!user) return null;

    const { _id, ...rest } = user;

    return {
      ...rest,
      userId: _id.toString()
    };
  }
}
