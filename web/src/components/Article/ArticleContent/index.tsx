"use server";

import Image from "next/image";
import highlightPreBlocks from "../../../utils/highlight";
import { addIdsToHeadings } from "../../../utils/anchors";
import convertMarkdowToHtmlString from "../../../utils/markdown";
import ParseHtmlBlocks from "./ParseHtmlBlocks";
import ComponentSharedSlider from "./ComponentSharedSlider";

const ArticleContent = async ({ documentId, content }: ArticleContent) => {
  const toRender = await Promise.all(
    content.map(async (block) => {
      switch (block.__typename) {
        case "ComponentSharedRichText":
          const contentHtml = await convertMarkdowToHtmlString(block.body);
          const processedHtml = highlightPreBlocks(contentHtml);
          const htmlToRender = addIdsToHeadings(processedHtml);
          return (
            <ParseHtmlBlocks
              key={`shared.rich-text-${block.id}`}
              html={htmlToRender}
            />
          );
        case "ComponentSharedQuote":
          return (
            <article
              key={`shared.quote-${block.id}`}
              className="w-full blog blog-text blog-blockquote" // blog-center-content
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
              <article key={`shared.media-${block.id}`}>
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
