"use client";

import { useState } from "react";
import { useEditor, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const TiptapEditor = () => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const editor = useEditor({
    extensions: [
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
          class: "underline text-blue-900",
        },
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-4" },
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-4" },
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        console.log("kati");
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focused-input max-w-full mx-auto h-full border mt-3 min-h-28 p-1",
      },
    },
  });

  return editor;
};

export default TiptapEditor;
