import { Controller, Post, Req, Res } from "@nestjs/common";
import { UserService } from "src/api/users/users.service";
import { Request, Response } from "express";
// import {SessionData} from 'express-session'

interface SessionData {
  cookie: string;
}

@Controller("/fake_login")
export class FakeLoginController {
  constructor(private readonly userService: UserService) {}
  private sessions: SessionData[];

  @Post()
  async postLogin(@Req() request: Request, @Res() response: Response) {
    try {
        const user = await this.userService.getUserByName(request.body.username);
        const session = request.session;
        console.log(session);
        console.log(`Session = ${request.session.id}`);
    } catch {
        throw new Error(`User ${request.body.username} doesn't exist`);
    }
  }
}
