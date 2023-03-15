import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {FriendController} from './friends.controller';
import {FriendService} from './friends.service';

@Module({
	imports: [PrismaModule],
	controllers: [FriendController],
	providers: [FriendService],
})
export class FriendModule {}
