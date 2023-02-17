import { Body, Controller, Delete, Get, Patch, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { Request } from "express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
const express = require("express");
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService
  ) {}
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
  @Get(":name")
  async getUserByName(@Req() req: Request) {
    console.log(req.body.image);
    return this.userService.getUserByName(req);
  }
  @Patch(":name")
  async PatchUser(@Req() req: Request) {
    if (req.body.image) {
      const user = this.cloudinaryService.uploadImage(req);
      return user;
    }
    return this.userService.updateUser(req);
  }
  @Delete("deleteall")
  async DeleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
