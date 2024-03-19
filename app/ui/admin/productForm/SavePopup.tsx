"use client";

import { useFormStatus } from "react-dom";
import { BiLoader } from "react-icons/bi";

export default function SavePopup() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-gray-400/75">
          <div className="w-60 h-40 border border-gray-800 rounded bg-white z-20  fixed top-1/2 left-1/2 justify-center flex opacity-100">
            <p className="absolute top-1/3 text-xl">
              Mentés...
              <BiLoader
                className="animate-spin text-blue-900 m-auto"
                size={25}
              />
            </p>
          </div>
        </div>
      )}
    </>
  );
}
