import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {BlockedController} from './blocked.controller';
import {BlockedService} from './blocked.service';

@Module({
	imports: [PrismaModule],
	controllers: [BlockedController],
	providers: [BlockedService],
	exports: [BlockedService],
})
export class BlockedModule {}
