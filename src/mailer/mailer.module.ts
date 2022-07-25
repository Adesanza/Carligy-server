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
          host: 'smtp.mandrillapp.com',
          port: 587,
          secure: false,
          auth: {
            // type: 'OAuth2',
            user: 'velociteeafrica',
            pass: 'CNLG-gWqpFTIdYSWzIXxuQ',
            // clientId: configService.get('MAIL_OAUTH_CLIENTID'),
            // clientSecret: configService.get('MAIL_OAUTH_CLIENT_SECRET'),
            // refreshToken: configService.get('MAIL_OAUTH_REFRESH_TOKEN'),
            // accessToken: configService.get('MAIL_OAUTH_ACCESS_TOKEN'),
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
