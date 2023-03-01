import { Module } from "@nestjs/common";
import { Oauth42Service } from "./Oauth42.service";
@Module({
  providers: [Oauth42Service],
  exports: [Oauth42Service],
})
export class Oauth42Module {}
