import {Module} from '@nestjs/common';
import {PrismaModule} from 'src/database/prisma.module';
import {DashboardController} from './dashboard.controller';
import {DashboardService} from './dashboard.service';
import {CloudinaryModule} from 'src/cloudinary/cloudinary.module';

@Module({
	imports: [PrismaModule, CloudinaryModule],
	controllers: [DashboardController],
	providers: [DashboardService],
})
export class DashboardModule {}
