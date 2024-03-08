"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="text-right">
      <button
        type="submit"
        className="bg-green-800 text-white px-3 py-2 rounded mt-3 inline-block"
        aria-disabled={pending}
      >
        Mentés
      </button>
    </div>
  );
}
