"use client";

import Image from "next/image";
import { useState } from "react";
import { FaQuestion, FaCheck } from "react-icons/fa";
import * as cheerio from "cheerio";
import CopyButton from "./CopyButton";
import SliderCarousel from "../../../Shadcnui/thumbCarousel";

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
        <div
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="blog-center-content blog-margin blog-text blog-code [&_*]:scrollbar"
        />
        <CopyButton htmlToRender={finalBlock.htmlToRender} />
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

const ParseFeaturedBlocks = ({ html }: { html: string }) => {
  return (
    <article className="blog-featured">
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
  const [checked, setChecked] = useState<[number, boolean] | []>([]); // Option is clicked (selected) but not yet confirmed with a button click
  const [selected, setSelected] = useState<boolean>(false); // Option is confirmed
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // If the correct option was chosen
  const [choosedWrong, setChoosedWrong] = useState<number | null>(null); // Index of the correct option
  const chars = ["A", "B", "C", "D"];

  const handleSelect = () => {
    if (checked.length > 0) {
      setSelected(true);
      setIsCorrect(checked[1] || null);
      const indexOfCorrectOption = block.json.opts
        .map((opt) => opt.alt[1])
        .indexOf(true);
      setChoosedWrong(indexOfCorrectOption);
    }
  };

  return (
    <div className="relative max-w-[700px] mx-auto mt-20">
      <FaQuestion className="size-12 p-2 rounded-full outline outline-offset-4 outline-blog-foreground-highlight absolute -top-6 left-1/2 -translate-x-1/2 bg-blog-foreground-highlight text-blog-foreground-readable-hover" />
      <div className="blog-heading mb-4">
        <h2 id={`shared.quiz-${block.id}`} className="pt-12 text-center">
          Momento Quiz!
        </h2>
      </div>
      <div className="text-sm text-[#808080] mx-20 mb-4">
        <p>
          Vamos testar seus conhecimentos a respeito de tudo que foi abordado
          até agora.
        </p>
      </div>
      <div className="flex flex-col items-center gap-8 border border-blog-border rounded-3xl p-8 bg-blog-background-2 shadow-lg">
        <p className="">{block.json.quiz}</p>
        <ul className="w-full grid grid-cols-1 gap-1">
          {block.json.opts.map((opt, index: number) => (
            <li key={index}>
              <button
                onClick={() => setChecked([index, opt.alt[1]])}
                className={`w-full flex items-center gap-4 px-3 py-2 text-sm border transition-all duration-500 bg-blog-background-2 group${
                  !selected && " hover:bg-blog-background-1"
                }`}
                disabled={selected}
                style={{
                  borderColor:
                    selected && isCorrect && checked[0] === index // Correctly chosen
                      ? "var(--blog-border-green)"
                      : selected && !isCorrect && checked[0] === index // Wrongly chosen
                      ? "var(--blog-border-red)"
                      : selected && !isCorrect && choosedWrong === index // Wrongly chosen (highlight correct option)
                      ? "var(--blog-border-green)"
                      : !selected && checked[0] === index // Highlight borders before confirm
                      ? "var(--blog-foreground-highlight)"
                      : "var(--blog-border)",
                  backgroundColor:
                    selected && isCorrect && checked[0] === index
                      ? "var(--blog-green)"
                      : selected && !isCorrect && checked[0] === index
                      ? "#450a0a"
                      : choosedWrong === index
                      ? "var(--blog-green)"
                      : checked[0] === index
                      ? "var(--blog-background-1)"
                      : "",
                }}
              >
                <p className="flex items-center justify-center shrink-0 rounded-full size-8 font-extrabold text-blog-foreground-readable-hover bg-blog-foreground-highlight">
                  {chars[index]}
                </p>
                <p
                  className="truncate transition-all duration-500 group-hover:text-blog-foreground-readable-hover"
                  style={{
                    color:
                      checked[0] === index
                        ? "var(--blog-foreground-readable-hover)"
                        : "",
                  }}
                >
                  {opt.alt[0]}
                </p>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="w-[205px] flex items-center gap-2 border px-8 py-[9px] transition-all duration-500 bg-blog-background-2 hover:bg-blog-background-1"
          onClick={handleSelect}
          disabled={selected}
          style={{
            borderColor: selected
              ? isCorrect
                ? "var(--blog-border-green)"
                : "var(--blog-border-red)"
              : "var(--blog-border)",
            backgroundColor: selected
              ? isCorrect
                ? "var(--blog-green)"
                : "#450a0a"
              : "",
          }}
        >
          {!selected ? (
            <p className="w-full transition-all duration-500 text-sm hover:text-blog-foreground-readable-hover">
              Responder
            </p>
          ) : isCorrect ? (
            <>
              <FaCheck className="text-green-500" />
              <p className="text-sm text-blog-foreground-readable-hover">
                Resposta correta!
              </p>
            </>
          ) : (
            <>
              <FaCheck className="text-red-500" />
              <p className="text-sm text-blog-foreground-readable-hover">
                Resposta errada
              </p>
            </>
          )}
        </button>
      </div>
    </div>
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
  ParseFeaturedBlocks,
  ParseSliderBlocks,
  ParseQuizBlocks,
  ParseMediaBlocks,
  ParseQuoteBlocks,
};
