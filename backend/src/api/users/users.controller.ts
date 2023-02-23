import { Body, Controller, Delete, Get, Patch, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { Request } from "express";
const express = require("express");
const app = express();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
  @Get(":id")
  async getOneUser(@Req() req: Request) {
    const { id } = req.params;
    return this.userService.getOneUser(req);
  }
  @Get(":name")
  async getUserByName(@Req() req: Request) {
    return this.userService.getUserByName(req.params.name);
  }
  @Patch(":id")
  async PatchUser(@Req() req: Request) {
    return this.userService.updateUser(req);
  }
  @Delete("deleteall")
  async DeleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
