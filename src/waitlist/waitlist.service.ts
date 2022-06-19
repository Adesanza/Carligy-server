import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaitlistUserDto } from './dto';
import { WaitlistUser, WaitlistUserDocument } from './schema';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(WaitlistUser.name)
    private waitlistUserModel: Model<WaitlistUserDocument>,
  ) {}
  async joinWaitlist(dto: WaitlistUserDto) {
    const existingEmail = await this.waitlistUserModel.findOne({
      email: dto.email,
    });
    if (existingEmail) {
      return true;
    }
    await this.waitlistUserModel.create(dto);
    return true;
  }
}
