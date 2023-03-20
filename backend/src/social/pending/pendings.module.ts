import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {NotificationGateway} from 'src/notification/notification.gateway';
import {PendingController} from './pendings.controller';
import {PendingService} from './pendings.service';

@Module({
	imports: [PrismaModule],
	controllers: [PendingController],
	providers: [PendingService, NotificationGateway],
})
export class PendingModule {}
