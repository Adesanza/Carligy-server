import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailchimpModule } from '../mailchimp/mailchimp.module';
import { MailerModule } from '../mailer/mailer.module';
import { WaitlistUser, WaitlistUserSchema } from './schema';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WaitlistUser.name, schema: WaitlistUserSchema },
    ]),
    MailerModule,
    MailchimpModule,
  ],
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
