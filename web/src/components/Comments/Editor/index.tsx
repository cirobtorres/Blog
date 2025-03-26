import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
// import LoadingEditor from "../EditorLoading";
import { useState } from "react";
import {
  Popover,
  PopoverLoginContent,
  PopoverTrigger,
} from "@/components/Shadcnui/popover";

const limit = 255;

const Editor = ({
  currentUser,
  autoFocus = false,
  initialContent = "",
  onSubmit,
  cancel,
}: {
  currentUser: User;
  autoFocus?: boolean;
  initialContent?: string | undefined;
  onSubmit: (body: string) => Promise<void>;
  cancel?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        Document,
        Paragraph,
        Text,
        Placeholder.configure({
          placeholder: "Contribua com um comentário...",
          // placeholder: ({ editor }) => {
          //   return editor.isFocused ? "" : "Contribua com um comentário...";
          // },
          emptyEditorClass: "is-editor-empty",
          showOnlyCurrent: true,
        }),
        CharacterCount.configure({
          limit,
        }),
      ],
      autofocus: autoFocus,
      editable: currentUser.ok,
      editorProps: {
        attributes: {
          class:
            "outline-none [&_*:not(:last-child)]:mb-2 [&_h4]:text-2xl [&_h4]:font-extrabold",
        },
      },
      content: initialContent,
    },
    [currentUser.ok]
  );

  function handleOpenDialog() {
    if (!currentUser.ok) return setDialog((prevDialog) => !prevDialog);
    setDialog(false);
  }

  if (!editor) {
    // return <LoadingEditor />;
    return;
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
      <Popover open={dialog} onOpenChange={handleOpenDialog}>
        <PopoverTrigger className="cursor-text">
          <EditorContent
            key={currentUser.ok ? "logged-in" : "logged-out"}
            editor={editor}
            autoFocus={autoFocus}
            id="content"
            name="content"
            onFocus={() => setIsOpen(true)}
            className="relative text-left w-full h-full text-sm [scrollbar-width:none] [-ms-overflow-style:none] pb-2 mb-2 group"
          >
            <div className="absolute top-[calc(100%)] w-full h-[1px] bg-blog-border" />
            <div className="absolute top-[calc(100%)] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blog-foreground-highlight group-focus-within:w-full group-focus-within:duration-200" />
          </EditorContent>
        </PopoverTrigger>
        <PopoverLoginContent />
      </Popover>
      <div className="h-8 flex shrink-0">
        <div className="flex-1 flex items-center gap-4">
          <p className="text-sm">
            Caracteres: {editor.storage.characterCount.characters()} / {limit}
          </p>
          <p className="text-sm">
            Palavras: {editor.storage.characterCount.words()}
          </p>
        </div>
        {isOpen && currentUser.ok && (
          <div className="flex gap-1">
            <button
              type="button"
              className="shrink-0 w-28 rounded-2xl px-3 border border-blog-border text-blog-foreground-readable"
              onClick={() => {
                editor.commands.clearContent();
                editor.commands.blur();
                setIsOpen(false);
                if (cancel) cancel();
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`shrink-0 w-28 rounded-2xl px-3 ${
                editor.isEmpty
                  ? "bg-[#747474] text-[#b3b3b3]"
                  : "bg-blog-foreground-highlight hover:bg-[hsl(30,93%,71%)] text-blog-background-3"
              }`}
              disabled={editor.getHTML() === "<p></p>"}
            >
              Comentar
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Editor;
