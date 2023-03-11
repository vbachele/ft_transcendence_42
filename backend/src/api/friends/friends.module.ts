import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {FriendController} from './friends.controller';
import {FriendService} from './friends.service';
import {CloudinaryModule} from 'src/cloudinary/cloudinary.module';

@Module({
	imports: [PrismaModule, CloudinaryModule],
	controllers: [FriendController],
	providers: [FriendService],
})
export class FriendModule {}
