import { Module } from '@nestjs/common';
import { Mail2FaGenerateService } from './Generate/mail2FAGenerate.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Mail2FaController } from './mail2FA.controller';
import { Mail2FaValidateService } from './Validate/mail2FAValidate.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
          user: 'versus.transcendence@gmail.com',
          pass: process.env.APIGOOGLE_2FAKEY,
        }
      },
    }),
  ],
  providers: [Mail2FaGenerateService, Mail2FaValidateService],
  controllers: [Mail2FaController],
  
})
export class Mail2FaModule {}
