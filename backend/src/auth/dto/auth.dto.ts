import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class AuthDto {
  // @MinLength(2)
  // @MaxLength(8)
  // // @IsNotEmpty()
  name: string;
}
