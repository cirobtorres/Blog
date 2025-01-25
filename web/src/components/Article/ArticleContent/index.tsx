"use server";

import Image from "next/image";
import {
  ParseRichTextBlocks,
  ParseFeaturedBlocks,
  ComponentSharedSlider,
} from "./ParseBlocks";
import highlightPreBlocks from "../../../utils/highlight";
import convertMarkdowToHtmlString from "../../../utils/markdown";
import { addIdsToHeadings } from "../../../utils/anchors";

const convertToHTML = async (blocks: string) => {
  const contentHtml = await convertMarkdowToHtmlString(blocks);
  const processedHtml = highlightPreBlocks(contentHtml);
  const htmlToRender = addIdsToHeadings(processedHtml);
  return htmlToRender;
};

const ArticleContent = async ({ documentId, content }: ArticleContent) => {
  const toRender = await Promise.all(
    content.map(async (block) => {
      switch (block.__typename) {
        case "ComponentSharedRichText":
          const richTextToRender = await convertToHTML(block.body);
          return (
            <ParseRichTextBlocks
              key={`shared.rich-text-${block.id}`}
              html={richTextToRender}
            />
          );
        case "ComponentSharedFeatured":
          const featuredToRender = await convertToHTML(block.featured);
          return (
            <ParseFeaturedBlocks
              key={`shared.featured-${block.id}`}
              html={featuredToRender}
            />
          );
        case "ComponentSharedQuote":
          return (
            <article
              key={`shared.quote-${block.id}`}
              className="w-full blog-margin blog-text blog-blockquote [&_strong]:ml-24 max-[500px]:[&_strong]:ml-4" // blog-center-content
            >
              <blockquote>
                <p>{block.body}</p>
              </blockquote>
              <strong>— {block.title}</strong>
            </article>
          );
        case "ComponentSharedMedia":
          if (block.file) {
            return (
              <article key={`shared.media-${block.id}`} className="mb-4">
                <figure className={"flex flex-col gap-3"}>
                  <Image
                    src={`http://127.0.0.1:1337${block.file.url}`}
                    alt={block.file.alternativeText}
                    width={block.file.width}
                    height={block.file.height}
                  />
                  <figcaption className="text-xs">
                    {block.file.caption}
                  </figcaption>
                </figure>
              </article>
            );
          }
        case "ComponentSharedSlider":
          return (
            <ComponentSharedSlider
              key={`shared.slider-${block.id}`}
              block={block as SharedSlider}
            />
          );
        default:
          return null;
      }
    })
  );

  return (
    <div
      id={documentId}
      className="flex flex-col col-start-2 max-[800px]:col-start-auto" // relative
    >
      {toRender}
    </div>
  );
};

export default ArticleContent;
