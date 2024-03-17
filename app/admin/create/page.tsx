"use client";

import { IoArrowBackSharp } from "react-icons/io5";
import { HU, GB, DE } from "country-flag-icons/react/3x2";
import Link from "next/link";
import Tooltip from "@/app/ui/common/Tooltip";
import TiptapEditor from "@/app/ui/admin/editor/TipTapEditor";
import { createProduct } from "@/app/lib/action";
import ToolBar from "@/app/ui/admin/editor/Toolbar";
import { EditorContent } from "@tiptap/react";
import { useState } from "react";
import SubmitButton from "../../ui/common/SubmitButton";
import SelectInput from "../../ui/common/SelectInput";
import SavePopup from "../../ui/admin/editor/SavePopup";
import ImageUploader from "../../ui/admin/editor/ImageUploader";
import { statusOptions, categoryOptions } from "../../util/commonUtils";

export default function Page() {
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleUploadedFileState = (newValue: File[]) => {
    setUploadedFiles(newValue);
  };

  // rich text editors for description fields
  const editorHu = TiptapEditor();
  const editorDe = TiptapEditor();
  const editorGb = TiptapEditor();

  const submitForm = async (form: FormData) => {
    if (editorHu) form.append("description_hu", editorHu.getHTML());
    if (editorDe) form.append("description_de", editorDe.getHTML());
    if (editorGb) form.append("description_gb", editorGb.getHTML());

    uploadedFiles.forEach((file, index) => {
      form.append("file", file);
    });

    const { error, fieldErrors } = await createProduct(form);

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

  return (
    <main className="max-w-4xl mx-auto">
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
      <div className="grid grid-cols-3">
        <Tooltip message="vissza">
          <Link href="/admin">
            <IoArrowBackSharp size={30} />
          </Link>
        </Tooltip>
        <h1 className="text-2xl col-span-2">Új termék létrehozása</h1>
      </div>
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
            />
          </div>
          <div className="my-2">
            <DE title="Német" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="title_de"
              className="border w-[calc(100%-44px)] focused-input"
            />
          </div>
          <div className="my-2">
            <GB title="Angol" className="mr-3 w-8 inline" />
            <input
              type="text"
              name="title_gb"
              className="border w-[calc(100%-44px)] focused-input"
            />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-2 mt-8">
          <div className="my-2">
            <label>
              Ár:
              <input type="number" name="price" className="border ml-4 w-20" />
            </label>
            <span className="pl-2">Euro</span>
          </div>
          <SelectInput label="Státusz" options={statusOptions} name="status" />
          <SelectInput
            label="Kategória"
            options={categoryOptions}
            name="category"
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
        <SubmitButton />
      </form>
    </main>
  );
}
