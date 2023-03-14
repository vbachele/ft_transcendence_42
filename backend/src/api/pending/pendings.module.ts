import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {PendingController} from './pendings.controller';
import {PendingService} from './pendings.service';
import {CloudinaryModule} from 'src/cloudinary/cloudinary.module';

@Module({
	imports: [PrismaModule, CloudinaryModule],
	controllers: [PendingController],
	providers: [PendingService],
})
export class PendingModule {}
