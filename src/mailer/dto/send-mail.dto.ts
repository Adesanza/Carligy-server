export class SendMailDto {
  mailTo: string | string[];
  mailFrom: string;
  mailSubject: string;
  mailText: string;
  mailTemplate: string;
  mailContext: {
    [name: string]: any;
  };
}
