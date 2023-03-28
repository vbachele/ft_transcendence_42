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
			const res = await this.prismaLobbyService.fetchAdminsInLobby(args[1].lobbyId);
			if (!res) return true;
			const found = res.admins.find((admin) => admin.name === args[0].data.name);
			return !!found;
		} catch (e) {
			console.log(e);
			throw new WsException(`Admin right violation: ` + e);
		}
	}
}