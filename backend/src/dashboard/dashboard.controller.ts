import {Controller, Get, Req} from '@nestjs/common';
import {DashboardService} from './dashboard.service';
import {Request} from 'express';

@Controller('dashboard')
export class DashboardController {
	constructor(private dashboardService: DashboardService) {}
	@Get(':name')
	async getUserByName(@Req() req: Request) {
		return this.dashboardService.getUserByName(req.params.name);
	}
}
