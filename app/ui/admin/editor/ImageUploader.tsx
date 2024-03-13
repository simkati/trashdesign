import { FaTrashCan } from "react-icons/fa6";
import NextImage from "next/image";
import { ChangeEvent, useState } from "react";

type ImageUploadProp = {
  setFiles: (files: File[]) => void;
};

export default function ImageUpload({ setFiles }: ImageUploadProp) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);

  const handleUploadFiles = (files: File[]) => {
    setError(false);
    const uploaded = [...uploadedFiles];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        console.log("size " + file.size);
        if (file.size > 3000000) {
          setError(true);
        } else {
          uploaded.push(file);
        }
      }
    });
    setUploadedFiles(uploaded);
    setFiles(uploaded);
  };

  const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const removeImage = (fileRemoved: File) => {
    const files = uploadedFiles.filter(
      (file) => file.name !== fileRemoved.name
    );

    setUploadedFiles(files);
    setFiles(files);
  };

  return (
    <>
      <input
        id="fileUpload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileEvent}
      />
      <label
        htmlFor="fileUpload"
        className="my-5 inline-block px-4 py-3 rounded bg-gray-200 cursor-pointer "
      >
        <a>Képek kiválasztása</a>
      </label>
      {error && (
        <p className="text-red-800 font-bold">A maximális képméret 3 MB!</p>
      )}
      <div className="uploaded-files-list">
        {uploadedFiles.map((file, index) => (
          <div
            key={file.name}
            className="inline-block mx-4 relative rounded overflow-hidden"
          >
            <button
              className="absolute p-1 right-2 top-2 bg-slate-50"
              onClick={() => removeImage(file)}
              type="button"
            >
              <FaTrashCan />
            </button>
            <NextImage
              src={URL.createObjectURL(file)}
              width={0}
              height={0}
              alt="gallery"
              className="inline w-[200px] h-auto"
            />
          </div>
        ))}
      </div>
    </>
  );
}
