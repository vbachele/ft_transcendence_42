import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {Mail2FaController} from './mail2FA.controller';
import {Mail2FaValidateService} from './Validate/validate2FA.service';
import {DisableService} from './disable/disable2Fa.service';
import {PrismaModule} from 'src/database/prisma.module';
import {PrismaService} from 'src/database/prisma.service';
import {Mail2FaGenerateService} from './generate/generate2FA.service';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				port: 465,
				host: 'smtp.gmail.com',
				auth: {
					user: 'versus.transcendence@gmail.com',
					pass: process.env.APIGOOGLE_2FAKEY,
				},
			},
		}),
		PrismaModule,
	],
	providers: [
		Mail2FaGenerateService,
		Mail2FaValidateService,
		DisableService,
		PrismaService,
	],
	controllers: [Mail2FaController],
})
export class Mail2FaModule {}
