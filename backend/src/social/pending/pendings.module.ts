import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {PendingController} from './pendings.controller';
import {PendingService} from './pendings.service';

@Module({
	imports: [PrismaModule],
	controllers: [PendingController],
	providers: [PendingService],
})
export class PendingModule {}
