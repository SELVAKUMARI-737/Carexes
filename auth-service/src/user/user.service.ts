import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,

    ){}

    async create(registerDto: RegisterDto){
        return this.userModel.create(registerDto);
    }

    async findByEmail(email: string){
        return this.userModel.findOne({email});
    }
}
