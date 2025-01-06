"use client";

import { useState, useEffect, useRef, useMemo } from "react";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
import savePublication from "../../lib/publication";
import "../../styles/ckeditor.css";

export default function EditorComponent() {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorWordCountRef = useRef<HTMLDivElement | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "44.1.0" });

  // ------------------------------=====Data-sent-to-database=====------------------------------
  const [title, setTitle] = useState(""); // TITLE
  const [titleWords, setTitleWords] = useState(0);
  const [titleCharacters, setTitleCharacters] = useState(0);

  const [subTitle, setSubtitle] = useState(""); // SUBTITLE
  const [subTitleWords, setSubTitleWords] = useState(0);
  const [subTitleCharacters, setSubTitleCharacters] = useState(0);

  const [bodyContent, setBodyContent] = useState(""); // CONTENT

  const handleSave = async () => {
    if (title !== "" && subTitle !== "" && bodyContent !== "") {
      const publication = await savePublication({
        title,
        sub_title: subTitle,
        content: bodyContent,
      });
      console.log(publication); // TODO: DELETE ME
    }
    // revalidatePath("/", "layout");
    // redirect("/painel");
  };

  // ----------------------------------------===========----------------------------------------

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Base64UploadAdapter,
      BlockQuote,
      BlockToolbar,
      Bold,
      // Bookmark,
      CodeBlock,
      Essentials,
      FindAndReplace,
      // FontBackgroundColor,
      FontColor,
      FullPage,
      GeneralHtmlSupport,
      Heading,
      HeadingButtonsUI,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      // Indent,
      // IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      ParagraphButtonUI,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      RemoveFormat,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      // Undo,
      WordCount,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY,
        ui: { viewportOffset: { top: 48 } },
        placeholder: "",
        initialData: "",
        toolbar: {
          items: [
            "findAndReplace",
            // "undo",
            // "redo",
            "|",
            "paragraph",
            "heading2",
            "heading3",
            "heading4",
            "|",
            "fontColor",
            // "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "|",
            "subscript",
            "superscript",
            "specialCharacters",
            "link",
            // "bookmark",
            "horizontalLine",
            "|",
            "uploadImage",
            "insertImageViaUrl",
            "mediaEmbed",
            "|",
            "insertTable",
            "blockQuote",
            "codeBlock",
            "htmlEmbed",
            "|",
            "alignment",
            // "alignment:left",
            // "alignment:right",
            // "alignment:center",
            // "alignment:justify",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            // "outdent",
            // "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          Base64UploadAdapter,
          BlockQuote,
          BlockToolbar,
          Bold,
          // Bookmark,
          CodeBlock,
          Essentials,
          FindAndReplace,
          // FontBackgroundColor,
          FontColor,
          FullPage,
          GeneralHtmlSupport,
          Heading,
          HeadingButtonsUI,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          // Indent,
          // IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Markdown,
          MediaEmbed,
          ParagraphButtonUI,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          RemoveFormat,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          // Undo,
          WordCount,
        ],
        balloonToolbar: [
          "paragraph",
          "heading2",
          "heading3",
          "heading4",
          "|",
          "fontColor",
          // "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "strikethrough",
          "removeFormat",
          "|",
          "subscript",
          "superscript",
          "|",
          "link",
          "blockquote",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          // "|",
          // "undo",
          // "redo",
        ],
        blockToolbar: [
          "paragraph",
          "heading2",
          "heading3",
          "heading4",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
          ],
        },
        fontColor: {
          colors: [
            {
              color: "hsl(285, 11%, 7%)",
              label: "Black",
            },
            {
              color: "hsl(278, 8%, 80%)",
              label: "White",
            },
            {
              color: "hsl(81, 82%, 55%)",
              label: "Green",
            },
            {
              color: "hsl(251, 100%, 68%)",
              label: "Purple",
            },
            {
              color: "hsl(350, 81%, 58%)",
              label: "Pink",
            },
            // ...
          ],
        },
        // fontBackgroundColor: {
        //   colors: [
        //     {
        //       color: "hsl(285, 11%, 7%)",
        //       label: "Black",
        //     },
        //     {
        //       color: "hsl(278, 8%, 80%)",
        //       label: "White",
        //     },
        //     {
        //       color: "hsl(81, 82%, 55%)",
        //       label: "Green",
        //     },
        //     {
        //       color: "hsl(251, 100%, 68%)",
        //       label: "Purple",
        //     },
        //     {
        //       color: "hsl(350, 81%, 58%)",
        //       label: "Pink",
        //     },
        //     // ...
        //   ],
        // },
        codeBlock: {
          languages: [
            { language: "typescript", label: "TypeScript" }, // The first is the default one
            { language: "python", label: "Python" },
            { language: "kotlin", label: "Kotlin" },
            { language: "java", label: "Java" },
            { language: "html", label: "HTML" },
            { language: "css", label: "CSS" },
            { language: "sql", label: "SQL" },
            // ...
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [cloud, isLayoutReady]);

  return (
    <form className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-word-count"
        ref={editorContainerRef}
      >
        <div className="mb-2">
          <input
            id="publication-title"
            placeholder="Título"
            maxLength={125}
            value={title}
            type="text"
            autoComplete="off"
            onChange={(event) => {
              const words = event.target.value;
              const numberOfWords = words.match(/[\w-]+/g)?.length;
              const numberOfCharacters = words.length;
              setTitle(words);
              setTitleWords(numberOfWords || 0);
              setTitleCharacters(numberOfCharacters || 0);
            }}
            className="w-full p-2 text-blog-silver bg-[var(--ck-color-base-background)] border border-[var(--ck-custom-border)] focus:border-[var(--ck-color-focus-border)] outline-none focus:[box-shadow:var(--ck-inner-shadow),_0_0] placeholder:text-blog-placeholder"
          />
          <div className="editor_container__word-count">
            <div className="ck ck-word-count">
              <div className="ck-word-count__words">Words: {titleWords}</div>
              <div className="ck-word-count__characters">
                Characters: {titleCharacters}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <textarea
            id="publication-subtitle"
            placeholder="Subtítulo"
            rows={3}
            maxLength={255}
            value={subTitle}
            onChange={(event) => {
              const words = event.target.value;
              const numberOfWords = words.match(/[\w-]+/g)?.length;
              const numberOfCharacters = words.length;
              setSubtitle(words);
              setSubTitleWords(numberOfWords || 0);
              setSubTitleCharacters(numberOfCharacters || 0);
            }}
            className="w-full p-2 text-blog-silver bg-[var(--ck-color-base-background)] border border-[var(--ck-custom-border)] focus:border-[var(--ck-color-focus-border)] outline-none focus:[box-shadow:var(--ck-inner-shadow),_0_0] placeholder:text-blog-placeholder resize-none scrollbar"
          />
          <div className="editor_container__word-count">
            <div className="ck ck-word-count">
              <div className="ck-word-count__words">Words: {subTitleWords}</div>
              <div className="ck-word-count__characters">
                Characters: {subTitleCharacters}
              </div>
            </div>
          </div>
        </div>
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {ClassicEditor && editorConfig && (
              <CKEditor
                onReady={(editor) => {
                  const wordCount = editor.plugins.get("WordCount");
                  editorWordCountRef.current?.appendChild(
                    wordCount.wordCountContainer
                  );
                }}
                onChange={(event, editor) => setBodyContent(editor.getData())} // IMPORTANT
                onAfterDestroy={() => {
                  if (editorWordCountRef.current)
                    Array.from(editorWordCountRef.current.children).forEach(
                      (child) => child.remove()
                    );
                }}
                editor={ClassicEditor}
                config={editorConfig as EditorConfig}
              />
            )}
          </div>
        </div>
        <div
          className="editor_container__word-count"
          ref={editorWordCountRef}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="w-1/4 py-1 font-extrabold border border-[#59565d] text-[#aef726] bg-[#4a494b]"
        >
          Publicar!
        </button>
      </div>
    </form>
  );
}
