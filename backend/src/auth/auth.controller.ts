import { Body, Controller, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("signup")
  async signup() {
    return this.authService.signup();
  }
}
