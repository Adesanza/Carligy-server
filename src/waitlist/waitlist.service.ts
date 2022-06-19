import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '../mailer/mailer.service';
import { WaitlistUserDto } from './dto';
import { WaitlistUser, WaitlistUserDocument } from './schema';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(WaitlistUser.name)
    private readonly waitlistUserModel: Model<WaitlistUserDocument>,
    private readonly mailerService: MailerService,
  ) {}
  async joinWaitlist(dto: WaitlistUserDto) {
    const existingEmail = await this.waitlistUserModel.findOne({
      email: dto.email,
    });
    if (existingEmail) {
      return true;
    }
    await this.mailerService.sendMail({
      mailTo: dto.email,
      mailFrom: 'Seeooh <support@seeooh.app>',
      mailSubject: 'Join Carligy Waitlist',
      mailText: 'Carligy Waitlist - carligy.seeooh.app',
      mailTemplate: 'waitlist-user',
      mailContext: {
        userEmail: dto.email,
      },
    });
    await this.mailerService.sendMail({
      mailTo: 'support@seeooh.app',
      mailFrom: 'Carligy <support@carligy.app>',
      mailSubject: 'Join Carligy Waitlist',
      mailText: 'Carligy Waitlist - carligy.seeooh.app',
      mailTemplate: 'waitlist-admin',
      mailContext: {
        userEmail: dto.email,
      },
    });
    await this.waitlistUserModel.create(dto);

    return true;
  }
}
