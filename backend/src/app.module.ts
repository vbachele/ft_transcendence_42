import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseController} from './database/database.controller';
import {DatabaseService} from './database/database.service';
// import { LobbyModule } from "./lobby/lobby.module";
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from './database/prisma.module';
import {UserModule} from './api/users/users.module';
import {CloudinaryModule} from './cloudinary/cloudinary.module';
import {GameModule} from './game/game.module';
import {WebsocketModule} from './websocket/websocket.module';
import {LobbyModule} from './lobby/lobby.module';
import {DashboardController} from './dashboard/dashboard.controller';
import {DashboardModule} from './dashboard/dashboard.module';
import {DashboardService} from './dashboard/dashboard.service';
import {FriendModule} from './api/friends/friends.module';
import {BlockedModule} from './api/blocked/blocked.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GameModule,
		LobbyModule,
		AuthModule,
		UserModule,
		FriendModule,
		BlockedModule,
		DashboardModule,
		PrismaModule,
		CloudinaryModule,
		WebsocketModule,
	],
	controllers: [AppController, DatabaseController, DashboardController],
	providers: [AppService, DatabaseService, DashboardService],
})
export class AppModule {}
