"use client";

import { useActionState, useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
  type Editor as EditorProps,
} from "@tiptap/react";
import { Skeleton } from "../../../Shadcnui/skeleton";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import { saveComment } from "../../../../lib/comments";

const limit = 255;

const initialState = {
  message: null,
};

const initialContent = "";

const Editor = ({
  articleDocumentId,
  user,
}: {
  articleDocumentId: string;
  user: User;
}) => {
  const [content, setContent] = useState(initialContent);
  const [submitCount, setSubmitCount] = useState(0);

  const [, formAction] = useActionState<{ message: string | null }, FormData>(
    (prevState, formData) => {
      formData.append("editor-content", content);
      formData.append("article-id", articleDocumentId);
      formData.append("user-id", user.data?.documentId || "");
      const result = saveComment(prevState, formData);
      setSubmitCount((count) => count + 1);
      return result;
    },
    initialState
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      CharacterCount.configure({
        limit,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "outline-none [&_*:not(:last-child)]:mb-2 [&_h4]:text-2xl [&_h4]:font-extrabold",
      },
    },
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    editor?.commands.clearContent();
  }, [submitCount, editor]);

  if (!editor) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton className="w-full h-16 rounded-2xl" />
        <div className="flex items-center gap-1">
          <Skeleton className="w-full h-6 rounded-2xl" />
          <Skeleton className="max-w-28 w-full h-6 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    user.data && <EditableContent formAction={formAction} editor={editor} />
  );
};

export default Editor;

const EditableContent = ({
  formAction,
  editor,
}: {
  formAction: (payload: FormData) => void;
  editor: EditorProps;
}) => {
  return (
    <form action={formAction} className="flex flex-col gap-1">
      <EditorContent
        editor={editor}
        id="content"
        name="content"
        className="relative w-full h-full [scrollbar-width:none] [-ms-overflow-style:none] pb-2 mb-0 overflow-y-auto group"
      >
        <div className="absolute top-[calc(100%_-_2px)] w-full h-[1px] bg-blog-border" />
        <div className="absolute top-[calc(100%_-_2px)] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blog-foreground-highlight group-focus-within:w-full group-focus-within:duration-200" />
      </EditorContent>
      <div className="h-8 flex">
        <div className="flex-1 flex items-center gap-4 px-4">
          <p className="text-sm">
            Caracteres: {editor.storage.characterCount.characters()} / {limit}
          </p>
          <p className="text-sm">
            Palavras: {editor.storage.characterCount.words()}
          </p>
        </div>
        <button
          type="submit"
          className={`w-28 rounded-2xl px-3 ${
            editor.getHTML() === "<p></p>"
              ? "bg-[#747474] text-[#b3b3b3]"
              : "bg-blog-foreground-highlight hover:bg-[hsl(30,93%,71%)] text-blog-background-3"
          }`}
          disabled={editor.getHTML() === "<p></p>"}
        >
          Comentar
        </button>
      </div>
    </form>
  );
};
