"use client";

import { useState } from "react";
import Flag from "./Flag";
import clsx from "clsx";

export default function LangSelector() {
  const [languages, setLanguages] = useState(["De", "Hu", "Gb"]);
  const setLang = (index: number) => {
    if (index === 1) return;
    if (index === 0) setLanguages([languages[2], languages[0], languages[1]]);
    if (index === 2) setLanguages([languages[1], languages[2], languages[0]]);
  };

  const langList = languages.map((lang, index) => {
    return (
      <p
        key={lang}
        className={clsx(
          "flex flex-col items-center px-3 py-2 rounded cursor-pointer transition",
          {
            "border border-orange-600": index === 1,
          }
        )}
        onClick={() => setLang(index)}
      >
        <Flag lang={lang} />
        {lang}
      </p>
    );
  });

  return <div className="float-right text-xs flex">{langList}</div>;
}
