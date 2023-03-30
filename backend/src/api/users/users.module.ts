import {Module} from '@nestjs/common';
import {UserController} from './users.controller';
import {UserService} from './users.service';
import {CloudinaryModule} from 'src/cloudinary/cloudinary.module';
import {BlockedModule} from 'src/social/blocked/blocked.module';
import {BlockedService} from 'src/social/blocked/blocked.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
	imports: [PrismaModule, CloudinaryModule, BlockedModule],
	controllers: [UserController],
	providers: [UserService, BlockedService],
	exports: [UserService],
})
export class UserModule {}
