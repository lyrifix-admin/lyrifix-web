"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

interface MinimalTiptapEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  editorContentClassName?: string;
  placeholder?: string;
  autofocus?: boolean;
  editable?: boolean;
  id?: string;
}

export default function MinimalTiptapEditor({
  value = "",
  onChange,
  autofocus = false,
  editable = true,
  name,
  placeholder = "Type here...",
  className = "",
  editorContentClassName = "",
  id,
  ...props
}: MinimalTiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable,
    autofocus,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const html = editor?.getHTML() ?? value;

  return (
    <div
      className={`rounded-md border border-gray-700 bg-gray-800/50 ${className}`}
    >
      <ToggleGroup type="multiple" className="border-b border-gray-700 p-2">
        <ToggleGroupItem
          aria-pressed={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          value="bold"
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-pressed={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          value="italic"
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-pressed={editor?.isActive("strike")}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          value="strike"
        >
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="max-h-[300px] overflow-y-auto">
        <EditorContent
          editor={editor}
          className={`min-h-[150px] bg-transparent p-4 focus:outline-none ${editorContentClassName}`}
        />
      </div>
      <input
        type="hidden"
        name={name}
        value={editor?.getHTML() ?? ""}
        id={id}
      />{" "}
    </div>
  );
}
