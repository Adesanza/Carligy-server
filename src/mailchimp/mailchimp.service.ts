import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mailchimp from '@mailchimp/mailchimp_marketing';
import * as mailchimpTransactional from '@mailchimp/mailchimp_transactional';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailchimpService implements OnModuleInit {
  mailchimpTransactionalClient: mailchimpTransactional.ApiClient;
  constructor(private readonly configService: ConfigService) {}
  async addMemeberToAudience(audienceListId: string, email: string) {
    try {
      const checkIfExisting = await mailchimp.lists.getListMember(
        audienceListId,
        email,
      );
      if (checkIfExisting && checkIfExisting.status === 'unsubscribed') {
        await mailchimp.lists.updateListMember(audienceListId, email, {
          status: 'subscribed',
        });
        return {
          success: true,
          message: 'User successfully re-subscribed',
        };
      }
      return {
        success: true,
        message: 'User is already a subscriber',
      };
    } catch (err) {
      if (err.status === 404) {
        await mailchimp.lists.addListMember(audienceListId, {
          email_address: email,
          status: 'subscribed',
        });
        return {
          success: true,
          message: 'User successfully subscribed',
        };
      }
      console.log(
        'somewthing went wrong @ MailchimpService.addMemeberToAudience',
        err,
      );
      return null;
    }
  }
  // async run() {
  //   const response =
  //     await this.mailchimpTransactionalClient.messages.sendTemplate({
  //       template_name: 'carligy-subscription',
  //       template_content: [{ name: '', content: 'jerry' }],
  //       message: {
  //         from_name: 'Carligy',
  //         subject: 'Subby',
  //         to: [
  //           {
  //             email: 'badmusadeshinna@gmail.com',
  //             type: 'to',
  //           },
  //         ],
  //       },
  //     });
  //   console.log(response);
  // }
  async onModuleInit() {
    mailchimp.setConfig({
      apiKey: this.configService.get('MAILCHIMP_API_KEY'),
      server: this.configService.get('MAILCHIMP_SERVER'),
    });
    // this.mailchimpTransactionalClient = mailchimpTransactional(
    //   'gWqpFTIdYSWzIXxuQ',
    // );
    // const result = await this.addMemeberToAudience(
    //   '067429',
    //   'badmusadeshinna@gmail.com',
    // );
    // console.log('result', result);
    // try {
    //   await this.run();
    // } catch (error) {
    //   console.log('trans', error);
    // }
  }
}
