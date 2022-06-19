import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule as MailingModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    MailingModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_OUTGOING_SERVER'),
          port: 465,
          secure: true,
          auth: {
            user: configService.get('MAIL_INCOMING_USERNAME'),
            pass: configService.get('MAIL_INCOMING_PASSWORD'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: 'Carligy <support@carligy.app>',
        },
        template: {
          dir: process.cwd() + '/src/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
