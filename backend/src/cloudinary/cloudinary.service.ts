import { Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";

@Injectable()
export class CloudinaryService {
  async uploadImage(file: string) {
    try {
      const uploadedResponse = await v2.uploader.upload(file, {
        upload_preset: "uz3pb2ns",
      });
      const personalizedUrl = v2.url(uploadedResponse.public_id);
      console.log("Image well uploaded");
      console.log("Personalized URL:", personalizedUrl);

      return personalizedUrl;
    } catch (error) {
      throw error;
    }
  }
}
