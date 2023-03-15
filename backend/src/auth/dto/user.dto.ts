import {IsString} from "class-validator";

export class UserDto {
  name?: string;
  isRegistered?: boolean;
}

export class FindOneParams {
  @IsString()
  name?: string;
}


