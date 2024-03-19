"use client";

import { HU, GB, DE } from "country-flag-icons/react/3x2";
import { FaTrashCan } from "react-icons/fa6";
import { EditorContent } from "@tiptap/react";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import TiptapEditor from "@/app/ui/admin/productForm/editor/TipTapEditor";
import createProduct from "@/app/lib/actions/createProduct";
import updateProduct from "@/app/lib/actions/updateProduct";
import ToolBar from "@/app/ui/admin/productForm/editor/Toolbar";
import SubmitButton from "@/app/ui/common/SubmitButton";
import SelectInput from "@/app/ui/common/SelectInput";
import SavePopup from "@/app/ui/admin/productForm/SavePopup";
import ImageUploader from "@/app/ui/admin/productForm/ImageUploader";
import { statusOptions, categoryOptions } from "@/app/util/commonUtils";
import { Product } from "@/app/util/types";

type ProductFormProp = {
  product?: Product;
};

export default function ProductForm({ product }: ProductFormProp) {
  const [error, setError] = useState("");
  // img files uploaded now
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  // keep img urls what is already saved in the database and uploaded cloudinary
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [deletedUrls, setDeletedUrls] = useState<string[]>([]);

  const handleUploadedFileState = (newValue: File[]) => {
    setUploadedFiles(newValue);
  };

  // rich text editors for description fields
  const editorHu = TiptapEditor();
  const editorDe = TiptapEditor();
  const editorGb = TiptapEditor();

  useEffect(() => {
    if (product) {
      if (editorHu?.isEmpty) {
        editorHu.commands.insertContent(product.description_hu);
      }
      if (editorDe?.isEmpty) {
        editorDe?.commands.insertContent(product.description_de);
      }
      if (editorGb?.isEmpty) {
        editorGb?.commands.insertContent(product.description_gb);
      }
      setGalleryUrls(product.gallery);
    }
  }, [product, editorHu, editorDe, editorGb]);

  const submitForm = async (form: FormData) => {
    if (editorHu) form.append("description_hu", editorHu.getHTML());
    if (editorDe) form.append("description_de", editorDe.getHTML());
    if (editorGb) form.append("description_gb", editorGb.getHTML());

    if (product) {
      form.append("id", product.id);
      form.append("gallery_folder", product.gallery_folder);
      form.append("gallery", galleryUrls.toString());

      if (deletedUrls.length > 0) {
        form.append("deletedImages", deletedUrls.toString());
      }
    }

    uploadedFiles.forEach((file, index) => {
      form.append("file", file);
    });

    const { error, fieldErrors } = product
      ? await updateProduct(form)
      : await createProduct(form);

    if (error) {
      setError(error);
      if (fieldErrors) {
        setError(
          `${error} ${Object.keys(fieldErrors)[0]} ${
            Object.values(fieldErrors)[0]
          }`
        );
      }
    }
  };

  const removeImage = (url: string) => {
    setDeletedUrls([...deletedUrls, url]);
    setGalleryUrls(galleryUrls.filter((galleryUrl) => galleryUrl != url));
  };

  return (
    <>
      {error && (
        <div className="w-60 min-h-40 border border-red-800 rounded bg-white z-10  fixed top-1/2 left-1/2 justify-center flex">
          <button
            className="absolute top-1 right-2"
            onClick={() => setError("")}
          >
            x
          </button>
          <p className="m-2 pr-2 text-red-800">{error}</p>
        </div>
      )}
      <form className="mt-10" action={submitForm}>
        <SavePopup />
        <fieldset>
          <legend>Termék neve</legend>
          <div className="my-2">
            <HU title="Magyar" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="title_hu"
              required
              className="border w-[calc(100%-44px)] focused-input"
              defaultValue={product ? product.title_hu : ""}
            />
          </div>
          <div className="my-2">
            <DE title="Német" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="title_de"
              className="border w-[calc(100%-44px)] focused-input"
              defaultValue={product ? product.title_de : ""}
            />
          </div>
          <div className="my-2">
            <GB title="Angol" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="title_gb"
              className="border w-[calc(100%-44px)] focused-input"
              defaultValue={product ? product.title_gb : ""}
            />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-3 mt-8">
          <div className="my-2">
            <label>
              Ár:
              <input
                type="number"
                name="price"
                className="border ml-4 w-20"
                defaultValue={product ? product.price : ""}
              />
            </label>
            <span className="pl-2">Euro</span>
          </div>
          <SelectInput
            label="Kategória"
            options={categoryOptions}
            name="category"
            defaultValue={product ? product.category : ""}
            className="justify-self-center"
          />
          <SelectInput
            label="Státusz"
            options={statusOptions}
            name="status"
            defaultValue={product ? product.status : ""}
            className="justify-self-end"
          />
        </fieldset>
        <fieldset className="mt-8">
          <legend className="mb-4">Termék leírása</legend>
          <div className="relative">
            <HU title="Magyar" className="mr-3 w-8 inline absolute mt-2" />
          </div>
          <ToolBar editor={editorHu} />
          <EditorContent editor={editorHu} />
          <div className="relative mt-4">
            <DE title="Német" className="mr-3 w-8 inline absolute mt-2" />
          </div>
          <ToolBar editor={editorDe} />
          <EditorContent editor={editorDe} />
          <div className="relative mt-4">
            <GB title="Angol" className="mr-3 w-8 inline absolute mt-2" />
          </div>
          <ToolBar editor={editorGb} />
          <EditorContent editor={editorGb} />
        </fieldset>
        <ImageUploader setFiles={handleUploadedFileState} />
        {galleryUrls.length > 0 &&
          galleryUrls.map((url) => (
            <div key={url} className="inline-block mx-2 relative bg-black">
              <button
                className="absolute p-1 right-2 top-2 bg-slate-50"
                onClick={() => removeImage(url)}
                type="button"
              >
                <FaTrashCan />
              </button>
              <NextImage
                width={200}
                height={200}
                alt="termék"
                src={url}
                className="inline rounded object-contain w-[200px] h-[200px]"
              />
            </div>
          ))}
        <SubmitButton />
      </form>
    </>
  );
}
