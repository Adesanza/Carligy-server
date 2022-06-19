import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService as MailingService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dto';

@Injectable()
export class MailerService {
  constructor(private readonly mailingService: MailingService) {}
  async sendMail(dto: SendMailDto) {
    try {
      await this.mailingService.sendMail({
        to: dto.mailTo,
        from: dto.mailFrom,
        subject: dto.mailSubject,
        text: dto.mailText,
        template: dto.mailTemplate,
        context: dto.mailContext,
      });
      return true;
    } catch (err) {
      console.log('err', err);
      throw new InternalServerErrorException(
        'Could not send the mail at the moment. Try again later.',
      );
    }
  }
}
