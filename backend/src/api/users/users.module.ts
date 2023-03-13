import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {UserController} from './users.controller';
import {UserService} from './users.service';
import {CloudinaryModule} from 'src/cloudinary/cloudinary.module';
import {BlockedModule} from '../blocked/blocked.module';
import {BlockedService} from '../blocked/blocked.service';

@Module({
	imports: [PrismaModule, CloudinaryModule, BlockedModule],
	controllers: [UserController],
	providers: [UserService, BlockedService],
})
export class UserModule {}
