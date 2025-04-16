import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Popover, PopoverTrigger } from "@/components/Shadcnui/popover";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import PopoverLoginContent from "@/components/Authentication/PopoverLoginContent";

const characterLimit = 512;

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
          limit: characterLimit,
        }),
      ],
      autofocus: autoFocus,
      editable: currentUser.ok,
      editorProps: {
        attributes: {
          class:
            "outline-none [&_*:not(:last-child)]:mb-4 [&_h4]:text-2xl [&_h4]:font-extrabold",
        },
      },
      content: initialContent,
      // onUpdate: ({ editor }) => {
      //   // Prevents user from adding multiple empty paragraphs
      //   const jsonContent = editor.getJSON();
      //   jsonContent.content = jsonContent.content?.filter(
      //     (node, index, arr) => {
      //       if (node.type === "paragraph" && !node.content) {
      //         return (
      //           index === 0 ||
      //           arr[index - 1].type !== "paragraph" ||
      //           arr[index - 1].content
      //         );
      //       }
      //       return true;
      //     }
      //   );
      //   editor.commands.setContent(jsonContent);
      // },
    },
    [currentUser.ok]
  );

  function handleOpenDialog() {
    if (!currentUser.ok) return setDialog((prevDialog) => !prevDialog);
    setDialog(false);
  }

  if (!editor) {
    // return <CommentEditorSkeleton />;
    return;
  }

  const lastCharacterIndex = editor.getHTML().length;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        let contentHTML = editor.getHTML();
        contentHTML = contentHTML.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""); // Remove every empty <p></p> in contentHTML
        if (!contentHTML || contentHTML.trim() === "") {
          setIsOpen(false);
          return; // Safeguard. Prevents saving empty comments
        }
        await onSubmit(contentHTML);
        editor.commands.clearContent();
        setIsOpen(false);
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
            onFocus={() => {
              setIsOpen(true);
              // Cursor on the last element position:
              editor.chain().focus().setTextSelection(lastCharacterIndex).run();
            }}
            className="relative text-left w-full h-full text-sm [scrollbar-width:none] [-ms-overflow-style:none] pb-2 group"
          >
            <div className="absolute top-[calc(100%)] w-full h-[1px] bg-blog-border" />
            <div className="absolute top-[calc(100%)] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blog-foreground-highlight group-focus-within:w-full group-focus-within:duration-200" />
          </EditorContent>
        </PopoverTrigger>
        <PopoverLoginContent />
      </Popover>
      <div className="h-8 flex shrink-0 mt-2">
        <div className="flex-1 flex items-center gap-4">
          <p className="text-sm text-[#808080]">
            Caracteres: {editor.storage.characterCount.characters()} /{" "}
            {characterLimit}
          </p>
          <p className="text-sm text-[#808080]">
            Palavras: {editor.storage.characterCount.words()}
          </p>
        </div>
        {isOpen && currentUser.ok && (
          <div className="flex gap-1">
            <button
              type="button"
              className="shrink-0 w-28 rounded px-3 transition-colors duration-200 border border-blog-border text-blog-foreground-readable hover:text-blog-foreground-readable-hover hover:bg-blog-border"
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
              className={`shrink-0 w-28 rounded px-3 border transition-colors duration-200 ${
                editor.isEmpty
                  ? "bg-[#3a3a3a] text-[#919191] border-[#646464]"
                  : "bg-blog-background-2 border-blog-border text-blog-foreground-highlight hover:text-blog-foreground-readable-hover hover:bg-blog-border"
              }`}
              disabled={editor.isEmpty}
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
