import cloudinary from "../cludinary-config";
import { NextApiHandler } from "next";
import { createDataURI } from "@/app/util/imageUtil";

export async function uploadImage(image: string, prodFolder: string) {
  try {
    const { secure_url: url } = await cloudinary.uploader.upload(image, {
      folder: prodFolder,
      use_filename: true,
    });
    return { url: url };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function createFolder(folder: string) {
  cloudinary.api.create_folder(folder);
}

export async function uploadImages(
  files: FormDataEntryValue[],
  folder: string
) {
  try {
    const imageUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const dataURI = await createDataURI(files[i] as File);
      const resp = await uploadImage(dataURI, folder);
      if (resp.url) {
        imageUrls.push(resp.url);
      }
    }
    return { urls: imageUrls };
  } catch (error) {
    return { error: error };
  }
}
