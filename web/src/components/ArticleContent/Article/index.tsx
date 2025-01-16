"use server";

import { addIdsToHeadings } from "../../../functions/anchors";
import Image from "next/image";
import highlightPreBlocks from "../../../functions/highlight";
import convertMarkdowToHtmlString from "../../../functions/markdown";
import ParseHtmlBlocks from "./ParseHtmlBlocks";
// import { BackToTopButtonSmallScreens } from "../../BackToTopButton";

const Article = async ({
  id,
  content,
}: {
  id: string;
  content: { __component: string; id: number; title?: string; body?: string }[];
}) => {
  const toRender = await Promise.all(
    content.map(async (block) => {
      switch (block.__component) {
        case "shared.rich-text":
          const contentHtml = await convertMarkdowToHtmlString(block.body);
          const processedHtml = highlightPreBlocks(contentHtml);
          const htmlToRender = addIdsToHeadings(processedHtml);
          return <ParseHtmlBlocks key={block.id} html={htmlToRender} />;
        case "shared.quote":
          return (
            <div
              key={block.id}
              className="w-full blog blog-center-content blog-heading blog-text blog-blockquote blog-code blog-lists blog-todo-list blog-table blog-hr"
            >
              <blockquote>
                <p>{block.body}</p>
              </blockquote>
              <strong>— {block.title}</strong>
            </div>
          );
        case "shared.media":
          const sharedMediaResponse = await fetch(
            `http://127.0.0.1:1337/api/upload/files/${block.id}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
              },
            }
          );
          if (!sharedMediaResponse.ok)
            throw new Error(
              `${sharedMediaResponse.status} ${sharedMediaResponse.statusText}`
            );
          const data = await sharedMediaResponse.json();
          return (
            <Image
              src={`http://127.0.0.1:1337${data.url}`}
              alt={data.alternativeText}
              key={data.documentId}
              width={data.width}
              height={data.height}
            />
          );
        case "shared.slider":
          // const sharedSliderResponse = await fetch(
          //   `http://127.0.0.1:1337/api/shared-sliders/${block.id}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          //     },
          //   }
          // );
          // if (!sharedSliderResponse.ok)
          //   throw new Error(
          //     `${sharedSliderResponse.status} ${sharedSliderResponse.statusText}`
          //   );
          // const sharedSlider = await sharedSliderResponse.json();
          // console.log(sharedSlider);
          return (
            <div key={block.id}>
              <p>Slider Component (ID: {block.id})</p>
            </div>
          );
        default:
          return null;
      }
    })
  );

  return (
    <div
      id={id}
      className="flex flex-col" // relative
    >
      {/* <BackToTopButtonSmallScreens /> */}
      {toRender}
    </div>
  );
};

export default Article;
