import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { ConfigService } from '@nestjs/config';
import { UserRegisterDto } from './dtos/user-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: UserRegisterDto) {
    console.log(dto);
    const salt = await bcrypt.genSalt(1043);
    const hash = await bcrypt.hash(dto.password, salt);
    const user = await this.User.create({
      email: dto.email,
      userName: dto.username,
      password: hash,
      phoneNumber: dto.phoneNumber,
      fullName: dto.fullName,
    });
    console.log(user);
    return user;
  }

  async getUserByUsername(username: string) {
    return this.User.findOne({ userName: username });
  }

  async getAllUsers() {
    const users = await this.User.find({});
    console.log(users);
    console.log('life is so good');
    return users;
  }
}
