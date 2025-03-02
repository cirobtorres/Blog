import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import LoadingEditor from "../EditorLoading";

const limit = 255;

const Editor = ({
  autoFocus = false,
  initialContent = "",
  onSubmit,
  cancel,
}: {
  autoFocus?: boolean;
  initialContent?: string | undefined;
  onSubmit: (body: string) => Promise<void>;
  cancel?: () => void;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "Comente…",
        showOnlyWhenEditable: false,
        emptyEditorClass: "is-editor-empty",
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    autofocus: autoFocus,
    editorProps: {
      attributes: {
        class:
          "outline-none [&_*:not(:last-child)]:mb-2 [&_h4]:text-2xl [&_h4]:font-extrabold",
      },
    },
    content: initialContent,
  });

  if (!editor) {
    return <LoadingEditor />;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(editor.getHTML());
        editor.commands.clearContent();
      }}
      className="w-full flex flex-col shrink-0"
    >
      <EditorContent
        editor={editor}
        autoFocus={autoFocus}
        id="content"
        name="content"
        className="relative w-full h-full text-sm [scrollbar-width:none] [-ms-overflow-style:none] pb-2 mb-2 group"
      >
        <div className="absolute top-[calc(100%)] w-full h-[1px] bg-blog-border" />
        <div className="absolute top-[calc(100%)] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blog-foreground-highlight group-focus-within:w-full group-focus-within:duration-200" />
      </EditorContent>
      <div className="h-8 flex shrink-0">
        <div className="flex-1 flex items-center gap-4">
          <p className="text-sm">
            Caracteres: {editor.storage.characterCount.characters()} / {limit}
          </p>
          <p className="text-sm">
            Palavras: {editor.storage.characterCount.words()}
          </p>
        </div>
        {/* {(editor.isFocused || !editor.isEmpty) && ( */}
        <div className="flex gap-1">
          <button
            type="button"
            className="shrink-0 w-28 rounded-2xl px-3 border border-blog-border text-blog-foreground-readable"
            onClick={() => {
              editor.commands.clearContent();
              editor.commands.blur();
              if (cancel) cancel();
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`shrink-0 w-28 rounded-2xl px-3 ${
              editor.getHTML() === "<p></p>"
                ? "bg-[#747474] text-[#b3b3b3]"
                : "bg-blog-foreground-highlight hover:bg-[hsl(30,93%,71%)] text-blog-background-3"
            }`}
            disabled={editor.getHTML() === "<p></p>"}
          >
            Comentar
          </button>
        </div>
        {/* )} */}
      </div>
    </form>
  );
};

export default Editor;
