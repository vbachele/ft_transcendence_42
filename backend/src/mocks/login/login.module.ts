import { Module } from "@nestjs/common";
import { UserService } from "src/api/users/users.service";
import { FakeLoginController } from "./login.controller";

@Module({
    imports: [],
    controllers: [FakeLoginController],
    providers: [UserService],
  })
  export class FakeLoginModule {}