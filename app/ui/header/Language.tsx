"use client";

import { useState } from "react";
import clsx from "clsx";

export default function LangSelector() {
  const [languages, setLanguages] = useState(["DE", "HU", "GB"]);
  const setLang = (index: number) => {
    if (index === 1) return;
    if (index === 0) setLanguages([languages[2], languages[0], languages[1]]);
    if (index === 2) setLanguages([languages[1], languages[2], languages[0]]);
  };

  const langList = languages.map((lang, index) => {
    return (
      <p
        key={lang}
        className={clsx("items-center px-2 cursor-pointer inline-block", {
          "border-x border-gray-600 text-orange-600": index === 1,
        })}
        onClick={() => setLang(index)}
      >
        {lang}
      </p>
    );
  });

  return <>{langList}</>;
}
