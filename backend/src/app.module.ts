import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseController} from './database/database.controller';
import {DatabaseService} from './database/database.service';
import { AuthModule } from "./auth/auth.module";
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from './database/prisma.module';
import {UserModule} from './api/users/users.module';
import {CloudinaryModule} from './cloudinary/cloudinary.module';
import {GameModule} from './game/game.module';
import {WebsocketModule} from './websocket/websocket.module';
import {LobbyModule} from './lobby/lobby.module';
import {DoubleAuthModule} from './doubleAuth/doubleAuth.module';
import {APP_FILTER} from '@nestjs/core';
import {AllExceptionsFilter} from './errors/all-exceptions.filter';
import {FriendModule} from './social/friends/friends.module';
import {PendingModule} from './social/pending/pendings.module';
import {BlockedModule} from './social/blocked/blocked.module';
import {ChatModule} from "./chat/chat.module";


@Module({
	imports: [
		ConfigModule.forRoot(),
		GameModule,
		LobbyModule,
		AuthModule,
		UserModule,
		FriendModule,
		PendingModule,
		BlockedModule,
		PrismaModule,
		CloudinaryModule,
		WebsocketModule,
		DoubleAuthModule,
    ChatModule
	],
	controllers: [AppController, DatabaseController],
	providers: [
		AppService,
		DatabaseService,
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
