import Image from "next/image";
import { FaQuestion } from "react-icons/fa";
import * as cheerio from "cheerio";
import CopyButton from "./CopyButton";
import SliderCarousel from "../../../Shadcnui/thumbCarousel";
import QuizObjects from "./QuizObject";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Shadcnui/accordion";
import CodeBlock from "./ControlCodeGrid";

const ParseRichTextBlocks = ({ body }: { body: string }) => {
  const $ = cheerio.load(body);

  const allowedTags = [
    // It is not allowed heading 1 on article content
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "P",
    "A",
    "PRE",
    "UL",
    "OL",
    "BLOCKQUOTE",
    "IMG",
  ];
  const blocks: {
    id: string;
    htmlToRender: string;
    tagType?: string;
  }[] = [];
  let index = 0;

  $("body")
    .children()
    .each((_, element) => {
      // Check if element is a node of type `Element`.
      if (
        element.type === "tag" &&
        allowedTags.includes(element.tagName.toUpperCase())
      ) {
        blocks.push({
          id: `block-${index}`,
          htmlToRender: $.html(element),
          tagType: element.tagName.toUpperCase(),
        });
        index++;
      }
    });

  return blocks.map((finalBlock) => {
    // Search blocks for <a> tag
    const blockHtml = cheerio.load(finalBlock.htmlToRender);
    blockHtml("a").each((_, element) => {
      const href = blockHtml(element).attr("href") || "";
      // <a> tags of external link has a special design
      if (!href.match(/localhost/)) {
        const text = blockHtml(element).text();

        // Rebuild <a> tag
        const newAnchor = `
          <a href="${href}" target="_blank" class="external-link">
            <span>${text}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block align-top w-[14px] h-[14px]">
              <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
              <path d="m21 3-9 9"/>
              <path d="M15 3h6v6"/>
            </svg>
          </a>`;
        blockHtml(element).replaceWith(newAnchor); // Replace old <a> tag by the new one
      }
    });

    // Updates HTML
    finalBlock.htmlToRender = blockHtml.html();

    if (finalBlock.tagType === "PRE") {
      const fileRegex = /\/\/\s*\[!code\s+file:([^\]]+)\]/;
      const match = finalBlock.htmlToRender.match(fileRegex);
      const fileName = match ? match[1] : null;
      const cleanHtmlToRender = finalBlock.htmlToRender.replace(fileRegex, "");

      return (
        <article key={finalBlock.id} className="w-full relative">
          <div className="flex items-center relative h-12 w-full px-6 border-t border-x border-blog-border bg-blog-background-2">
            {fileName && (
              <span className="text-sm text-[#808080]">{fileName}</span>
            )}
            <CopyButton htmlToRender={cleanHtmlToRender} />
          </div>
          <CodeBlock id={finalBlock.id} htmlToRender={cleanHtmlToRender} />
        </article>
      );
    }

    if (finalBlock.tagType === "BLOCKQUOTE") {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="relative w-full blog-margin blog-text blog-blockquote border-y-4 border-blog-border p-4 before:h-1 before:w-20 before:bg-blog-foreground-highlight before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-1 after:h-1 after:w-20 after:bg-blog-foreground-highlight after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1"
        />
      );
    }

    if (finalBlock.tagType === "IMG") {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="w-full blog-center-content blog-margin"
        />
      );
    }

    if (finalBlock.tagType?.match(/H[1-3]/g)) {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="w-full blog-center-content blog-heading blog-margin blog-text border-t border-blog-border"
        />
      );
    }

    if (finalBlock.tagType?.match(/H[4-6]/g)) {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="w-full blog-center-content blog-heading blog-margin blog-text"
        />
      );
    }

    return (
      <article
        key={finalBlock.id}
        dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
        className="w-full blog-center-content blog-heading blog-margin blog-text blog-lists"
        style={{
          marginBottom: finalBlock.tagType === "A" ? "1rem" : "",
        }}
      />
    );
  });
};

const ParseSliderBlocks = ({ block }: { block: SharedSlider }) => {
  return (
    <article key={`shared.slider-${block.id}`} className="flex mb-6">
      <SliderCarousel files={block.files} options={{ loop: true }} />
    </article>
  );
};

const ParseQuizBlocks = ({ block }: { block: SharedQuiz }) => {
  return (
    <article className="relative max-w-[700px] mx-auto mt-20">
      <FaQuestion className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 p-2 rounded-full outline outline-2 outline-offset-4 outline-blog-foreground-highlight ring-2 ring-offset-[16px] ring-offset-blog-background-1 ring-blog-foreground-highlight bg-blog-foreground-highlight text-blog-foreground-readable-hover" />
      <div className="mb-4">
        <h2
          id={`momento-quiz-${block.id}`}
          className="text-4xl font-extrabold pt-12 text-center"
        >
          Momento Quiz!
        </h2>
      </div>
      <div className="text-sm text-[#808080] mx-20 mb-4">
        <p>
          Vamos testar seus conhecimentos a respeito de tudo que foi abordado
          até agora.
        </p>
      </div>
      {Object.values(block.json).map((bl, index: number) => (
        <QuizObjects key={index} block={bl} />
      ))}
    </article>
  );
};

const ParseMediaBlocks = ({ block }: { block: SharedMedia }) => {
  if (block.file) {
    return (
      <article className="mb-4">
        <figure className={"flex flex-col gap-3"}>
          <Image
            src={`http://127.0.0.1:1337${block.file.url}`}
            alt={block.file.alternativeText}
            width={block.file.width}
            height={block.file.height}
          />
          <figcaption className="text-xs">{block.file.caption}</figcaption>
        </figure>
      </article>
    );
  }
};

const ParseDetails = ({
  id,
  collapsible,
  title,
  body,
}: {
  id: string;
  collapsible: boolean;
  title: string;
  body: string;
}) => {
  return (
    <article className="w-full blog-center-content blog-heading blog-margin blog-text blog-lists bg-blog-background-2 p-4 mb-4">
      {collapsible ? (
        <Accordion type="single" collapsible defaultValue="">
          <AccordionItem
            value="item-1"
            className="[&_h3]:pt-0 [&_h3]:mb-0 [&_h3_button_p]:mb-0"
          >
            <AccordionTrigger>
              {title && (
                <p className="text-2xl font-extrabold text-blog-foreground-highlight">
                  {title}
                </p>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <ParseRichTextBlocks
                key={`shared.rich-text-details-${id}`}
                body={body}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div>
          {title && (
            <p className="text-2xl font-extrabold text-blog-foreground-highlight">
              {title}
            </p>
          )}
          <ParseRichTextBlocks
            key={`shared.rich-text-details-${id}`}
            body={body}
          />
        </div>
      )}
    </article>
  );
};

export {
  ParseRichTextBlocks,
  ParseSliderBlocks,
  ParseQuizBlocks,
  ParseMediaBlocks,
  ParseDetails,
};
