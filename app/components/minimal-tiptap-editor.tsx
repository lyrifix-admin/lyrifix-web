import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { useEffect } from "react";
import HardBreak from "@tiptap/extension-hard-break";
import Paragraph from "@tiptap/extension-paragraph";

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";

interface MinimalTiptapEditorProps {
  content: Content | Node;
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
  content,
  onChange,
  autofocus = false,
  editable = true,
  name,
  className = "",
  editorContentClassName = "",
  id,
}: MinimalTiptapEditorProps) {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({
        hardBreak: false,
        paragraph: false,
      }),
      Placeholder.configure({
        placeholder: () => {
          return "The the lyric here...";
        },
      }),
      HardBreak.configure({
        HTMLAttributes: {
          class: "line-break",
        },
        keepMarks: false,
      }),
      Paragraph.configure({
        HTMLAttributes: { class: "paragraph" },
      }),
    ],
    editable,
    autofocus,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        editor.commands.setHardBreak();
      }
    };

    const dom = editor.view.dom;
    dom.addEventListener("keydown", handleKeyDown);

    return () => {
      dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

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
        <ToggleGroupItem
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          value="break-line"
        >
          <span className="text-xs">↵</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="overflow-y-auto">
        <EditorContent
          editor={editor}
          className={cn(
            "min-h-[150px] bg-transparent p-4 focus:outline-none",
            editorContentClassName,
          )}
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
