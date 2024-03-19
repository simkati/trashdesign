import cloudinary from "../cludinary-config";
import { createDataURI } from "@/app/util/imageUtil";
import { slugify } from "@/app/util/commonUtils";

export async function uploadImage(
  image: string,
  prodFolder: string,
  fileName: string
) {
  try {
    const { secure_url: url, public_id: public_id } =
      await cloudinary.uploader.upload(image, {
        folder: prodFolder,
        public_id: fileName,
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
      const file = files[i] as File;
      const dataURI = await createDataURI(file);
      const fileName = slugify(file.name.split(".")[0]);
      const resp = await uploadImage(dataURI, folder, fileName);
      if (resp.url) {
        imageUrls.push(resp.url);
      }
    }
    return { urls: imageUrls };
  } catch (error) {
    return { error: error };
  }
}

export async function deleteImages(urls: string[]) {
  try {
    for (let i = 0; i < urls.length; i++) {
      const public_id = urls[i].split("/").slice(-2).join("/").split(".")[0];

      cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    return { error: error };
  }
}
