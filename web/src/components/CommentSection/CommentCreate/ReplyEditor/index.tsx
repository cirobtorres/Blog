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
import { saveReply } from "../../../../lib/comments";

const limit = 255;

const initialState = {
  message: null,
};

const initialContent = "";

const ReplyEditor = ({
  articleDocumentId,
  userRepliedTo,
  user,
  close,
}: {
  articleDocumentId: string;
  userRepliedTo: string;
  user: User;
  close: (value: boolean) => void;
}) => {
  const [content, setContent] = useState(initialContent);
  const [submitCount, setSubmitCount] = useState(0);

  const [, formAction] = useActionState<{ message: string | null }, FormData>(
    (prevState, formData) => {
      formData.append("article-id", articleDocumentId);
      formData.append("replied-user-id", userRepliedTo);
      formData.append("user-id", user.data?.documentId || "");
      const result = saveReply(prevState, formData);
      setSubmitCount((count) => count + 1);
      close(false);
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
    user.data && (
      <EditableReplyContent
        formAction={formAction}
        editor={editor}
        content={content}
      />
    )
  );
};

export default ReplyEditor;

const EditableReplyContent = ({
  formAction,
  editor,
  content,
}: {
  formAction: (payload: FormData) => void;
  editor: EditorProps;
  content: string;
}) => {
  return (
    <form action={formAction} className="flex flex-col gap-1 max-h-72">
      <EditorContent
        editor={editor}
        id="content"
        name="content"
        className="relative w-full h-full [scrollbar-width:none] [-ms-overflow-style:none] pb-2 mb-0 overflow-y-auto group"
      >
        <div className="absolute top-[calc(100%_-_2px)] w-full h-[1px] bg-blog-border" />
        <div className="absolute top-[calc(100%_-_2px)] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blog-foreground-highlight group-focus-within:w-full group-focus-within:duration-200" />
      </EditorContent>
      <input
        type="hidden"
        id="tiptap-editor-content"
        name="tiptap-editor-content"
        value={content}
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
