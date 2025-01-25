"use server";

import {
  ParseRichTextBlocks,
  ParseFeaturedBlocks,
  ParseQuoteBlocks,
  ParseSliderBlocks,
  ParseMediaBlocks,
  ParseQuizBlocks,
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
            <ParseQuoteBlocks key={`shared.quote-${block.id}`} block={block} />
          );
        case "ComponentSharedMedia":
          return (
            <ParseMediaBlocks key={`shared.media-${block.id}`} block={block} />
          );
        case "ComponentSharedSlider":
          return (
            <ParseSliderBlocks
              key={`shared.slider-${block.id}`}
              block={block as SharedSlider}
            />
          );
        case "ComponentSharedQuiz":
          return (
            <ParseQuizBlocks key={`shared.quiz-${block.id}`} block={block} />
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
