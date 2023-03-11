import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {BlockedController} from './blocked.controller';
import {BlockedService} from './blocked.service';
import {CloudinaryModule} from 'src/cloudinary/cloudinary.module';

@Module({
	imports: [PrismaModule, CloudinaryModule],
	controllers: [BlockedController],
	providers: [BlockedService],
})
export class BlockedModule {}
