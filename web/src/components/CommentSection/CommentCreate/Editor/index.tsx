"use client";

import { useActionState, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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
  userDocumentId,
}: {
  articleDocumentId: string;
  userDocumentId: string;
}) => {
  const [content, setContent] = useState(initialContent);
  const [submitCount, setSubmitCount] = useState(0); // Novo estado para contar envios

  const [, formAction] = useActionState<{ message: string | null }, FormData>(
    (prevState, formData) => {
      const result = saveComment(prevState, formData);
      setSubmitCount((count) => count + 1); // Incrementa a contagem de submissões
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
          <Skeleton className="w-full h-4 rounded-2xl" />
          <Skeleton className="max-w-28 w-full h-8 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-1 max-h-72">
      <EditorContent
        editor={editor}
        id="content"
        name="content"
        className="w-full h-full [scrollbar-width:none] [-ms-overflow-style:none] rounded-2xl border-2 border-blog-border [&_div]:p-4 mb-0 bg-blog-background-2 overflow-y-auto transition-[border] duration-200 focus-within:border-blog-foreground-highlight"
      />
      <input
        type="hidden"
        id="tiptap-editor-content"
        name="tiptap-editor-content"
        value={content}
      />
      <input
        type="hidden"
        id="tiptap-article-id"
        name="tiptap-article-id"
        value={articleDocumentId}
      />
      <input
        type="hidden"
        id="tiptap-user-id"
        name="tiptap-user-id"
        value={userDocumentId}
      />
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
          className={`rounded-2xl px-3 border-2 ${
            editor.getHTML() === "<p></p>"
              ? "border-transparent bg-[#747474] text-[#b3b3b3]"
              : "border-blog-border bg-blog-background-2 hover:bg-blog-border hover:text-blog-foreground-readable-hover"
          }`}
          disabled={editor.getHTML() === "<p></p>"}
        >
          Comentar
        </button>
      </div>
    </form>
  );
};

export default Editor;
