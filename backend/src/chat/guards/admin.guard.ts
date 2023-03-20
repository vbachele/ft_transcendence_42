import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PrismaLobbyService} from '../../database/lobby/prismaLobby.service';
import {WsException} from '@nestjs/websockets';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private readonly prismaLobbyService: PrismaLobbyService) {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
		const args = context.getArgs();
		try {
			const admin = await this.prismaLobbyService.fetchAdminInLobby(args[1].lobbyId);
			if (!admin) return true;
			if (admin.adminName === args[0].data.name) return true;
		} catch (e) {
			console.log(e);
			throw new WsException(`Admin right violation: ` + e);
		}
		return false;
	}
}