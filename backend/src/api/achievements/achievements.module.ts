import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/prisma/prisma.module';
import {UserController} from './achievements.controller';
import {UserService} from './achievements.service';

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
