"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
      Bookmark,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
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
      Indent,
      IndentBlock,
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
      Undo,
      WordCount,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY,
        ui: { viewportOffset: { top: 48 } },
        placeholder: "",
        initialData:
          '<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum aspernatur perferendis at omnis, qui ex, maiores in, eos veniam nobis corrupti harum quo! Blanditiis, excepturi? Possimus voluptates nemo officiis expedita.</p><figure class="table" style="width:100%;"><table class="ck-table-resized"><colgroup><col style="width:25%;"><col style="width:25%;"><col style="width:25%;"><col style="width:25%;"></colgroup><tbody><tr><td>Example 1</td><td>Example 2</td><td>Example 3</td><td>Example 4</td></tr><tr><td>abc</td><td>ABC</td><td>12</td><td>123</td></tr><tr><td>xyz</td><td>XYZ</td><td>X</td><td>Y</td></tr></tbody></table></figure><div class="raw-html-embed"><h2>Hello World!</h2></div><p>&lt;h2&gt;Hello World!&lt;/h2&gt;</p><pre><code class="language-typescript">const helloWorld = () =&gt; {\t    console.log("Hello World");\n}</code></pre><h2>Hello World!</h2><hr><h3>Congratulations on setting up CKEditor 5! 🎉</h3><p>You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing capabilities that are customizable and easy to use.</p><h3>What\'s next?</h3><ol><li><strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your application.</li><li><strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.</li><li><strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even write your plugin!</li></ol><p>Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us as we strive to improve and evolve. Happy editing!</p><h3>Helpful resources</h3><ul><li>📝 <a target="_blank" rel="noopener noreferrer" href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li><li>📕 <a target="_blank" rel="noopener noreferrer" href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li><li>⭐️ <a target="_blank" rel="noopener noreferrer" href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li><li>🏠 <a target="_blank" rel="noopener noreferrer" href="https://ckeditor.com">CKEditor Homepage</a>,</li><li>🧑‍💻 <a target="_blank" rel="noopener noreferrer" href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li></ul><h3>Need help?</h3><ul class="todo-list"><li><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description">First example</span></label></li><li><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description">Second Example</span></label></li><li><label class="todo-list__label"><input type="checkbox" checked="checked" disabled="disabled"><span class="todo-list__label__description">Third Example</span></label></li></ul><p>See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we will help as soon as possible!</p><blockquote><p>See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we will help as soon as possible!</p></blockquote>',
        toolbar: {
          items: [
            "findAndReplace",
            "undo",
            "redo",
            "|",
            "paragraph",
            "heading2",
            "heading3",
            "heading4",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "|",
            "subscript",
            "superscript",
            "specialCharacters",
            "link",
            "bookmark",
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
            "alignment:left",
            "alignment:right",
            "alignment:center",
            "alignment:justify",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "outdent",
            "indent",
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
          Bookmark,
          CodeBlock,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
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
          Indent,
          IndentBlock,
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
          Undo,
          WordCount,
        ],
        balloonToolbar: [
          "paragraph",
          "heading2",
          "heading3",
          "heading4",
          "|",
          "fontColor",
          "fontBackgroundColor",
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
          "|",
          "undo",
          "redo",
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
        fontBackgroundColor: {
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
        codeBlock: {
          languages: [
            { language: "typescript", label: "TypeScript" },
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
