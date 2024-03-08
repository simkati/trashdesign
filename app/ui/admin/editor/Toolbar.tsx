import { FC } from "react";
import { Editor } from "@tiptap/react";
import { AiFillCaretDown } from "react-icons/ai";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
  BsLink45Deg,
  BsYoutube,
} from "react-icons/bs";

import ToolbarButton from "./ToolbarButton";
import InsertLink from "./InsertLink";
import { linkOption } from "./LinkForm";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

interface Props {
  editor: Editor | null;
}

const ToolBar: FC<Props> = ({ editor }): JSX.Element | null => {
  if (!editor) return null;

  const handleLinkSubmit = ({ url, openInNewTab }: linkOption) => {
    const { commands } = editor;
    if (openInNewTab) commands.setLink({ href: url, target: "_blank" });
    else commands.setLink({ href: url });
  };

  // "bold" "italic" "underline" "strike" "quote" "insert-link" "lists (ol and ul)"

  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-3 ml-12">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BsTypeBold />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <BsTypeItalic />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <BsTypeUnderline />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <BsTypeStrikethrough />
        </ToolbarButton>
      </div>

      <div className="h-4 w-[1px] bg-gray-800 mx-8" />

      <div className="flex items-center space-x-3">
        <InsertLink onSubmit={handleLinkSubmit} />

        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <BsListOl />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <BsListUl />
        </ToolbarButton>
      </div>
    </div>
  );
};

export default ToolBar;
