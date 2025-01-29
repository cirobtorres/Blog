"use client";

import Image from "next/image";
import { FaQuestion } from "react-icons/fa";
import * as cheerio from "cheerio";
import CopyButton from "./CopyButton";
import SliderCarousel from "../../../Shadcnui/thumbCarousel";
import QuizObjects from "./QuizObject";
import hljs from "highlight.js";
import { PencilLine } from "lucide-react";

const ParseRichTextBlocks = ({ html }: { html: string }) => {
  const $ = cheerio.load(html);

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

    return finalBlock.tagType === "PRE" ? (
      <article key={finalBlock.id} className="w-full relative">
        <div className="flex items-center relative h-12 w-full px-6 border-t border-x border-blog-border bg-[var(--blog-pre)]">
          <span className="text-sm text-[#808080]">Hello World</span>
          <CopyButton htmlToRender={finalBlock.htmlToRender} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="blog-center-content blog-margin blog-text blog-code [&_*]:scrollbar"
        />
      </article>
    ) : (
      <article
        key={finalBlock.id}
        dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
        className="w-full blog-center-content blog-heading blog-margin blog-text blog-lists"
        style={{
          borderTop: finalBlock.tagType?.match(/H[2-6]/g)
            ? "1px solid var(--blog-border)"
            : "",
          marginBottom: finalBlock.tagType === "A" ? "1rem" : "",
        }}
      />
    );
  });
};

const ParseCodeBlocks = ({
  block: { id, filename, language, code },
}: {
  block: CodeBlock;
}) => {
  const highlightedCode = hljs.highlight(code.trim(), {
    language,
  }).value;

  const lines = highlightedCode.split("\n");

  const numberedLines = lines
    .map((_, index) => {
      return `<span className="w-full">${index + 1}</span>`;
    })
    .join("");

  return (
    <article key={id} className="w-full relative">
      <div className="flex items-center relative h-12 w-full px-6 border-t border-x border-blog-border bg-[var(--blog-pre)]">
        <span className="text-sm text-[#808080]">{filename}</span>
        <CopyButton htmlToRender={highlightedCode} />
      </div>
      <pre className="flex flex-row blog-center-content blog-code scrollbar">
        <div
          dangerouslySetInnerHTML={{ __html: numberedLines }}
          className="flex flex-col [&_span]:w-8 py-2 px-4 text-sm text-[#808080] [&_span]:select-none [&_span]:text-right border-r border-blog-border pointer-events-auto"
        />
        <code
          className={`language-${language} w-full text-sm py-2 px-6`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </article>
  );
};

const ParseFeaturedBlocks = ({
  html,
  title,
}: {
  html: string;
  title: string;
}) => {
  return (
    <article className="blog-featured">
      <p className="flex items-center gap-3 text-2xl font-extrabold text-blog-foreground-highlight mb-4">
        <PencilLine />
        {title}
      </p>
      <ParseRichTextBlocks html={html} />
    </article>
  );
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
        <p
          id={`momento-quiz-${block.id}`}
          className="text-4xl font-extrabold pt-12 text-center"
        >
          Momento Quiz!
        </p>
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

const ParseQuoteBlocks = ({ block }: { block: SharedQuote }) => {
  return (
    <article
      className="w-full blog-margin blog-text blog-blockquote [&_strong]:ml-24 max-[500px]:[&_strong]:ml-4" // blog-center-content
    >
      <blockquote>
        <p>{block.body}</p>
      </blockquote>
      <strong>— {block.title}</strong>
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

export {
  ParseRichTextBlocks,
  ParseCodeBlocks,
  ParseFeaturedBlocks,
  ParseSliderBlocks,
  ParseQuizBlocks,
  ParseMediaBlocks,
  ParseQuoteBlocks,
};
