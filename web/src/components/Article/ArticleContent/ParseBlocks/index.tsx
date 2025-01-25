"use client";

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

const ComponentSharedSlider = ({ block }: { block: SharedSlider }) => {
  return (
    <article key={`shared.slider-${block.id}`} className="flex mb-6">
      <SliderCarousel files={block.files} options={{ loop: true }} />
    </article>
  );
};

export { ParseRichTextBlocks, ParseFeaturedBlocks, ComponentSharedSlider };
