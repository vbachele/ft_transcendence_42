import { BadRequestException, Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CloudinaryService {
  constructor(private prisma: PrismaService) {}
  async uploadImage(req: Request) {
    const { name } = req.params;
    const image = req.body.image;
    try {
      const uploadedResponse = await v2.uploader.upload(image, {
        upload_preset: "uz3pb2ns",
        allowed_formats: ["jpg", "png"],
      });
      const personalizedUrl = v2.url(uploadedResponse.public_id);
      const user = await this.prisma.user.update({
        where: {
          name,
        },
        data: {
          image: personalizedUrl,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException("Invalidfile", {
        cause: new Error(),
        description: error,
      });
    }
  }
}
