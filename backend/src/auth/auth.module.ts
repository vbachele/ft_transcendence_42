import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PrismaModule} from 'src/database/prisma.module';
import {Oauth42Module} from 'src/api/Oauth42/Oauth42.module';
import {UserModule} from 'src/api/users/users.module';
import {UserService} from 'src/api/users/users.service';
import {BlockedModule} from 'src/social/blocked/blocked.module';
import {BlockedService} from 'src/social/blocked/blocked.service';

@Module({
	imports: [PrismaModule, Oauth42Module, UserModule, BlockedModule],
	controllers: [AuthController],
	providers: [AuthService, UserService, BlockedService],
})
export class AuthModule {}
