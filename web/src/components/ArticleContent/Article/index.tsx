"use server";

import { addIdsToHeadings } from "../../../utils/anchors";
import Image from "next/image";
import highlightPreBlocks from "../../../utils/highlight";
import convertMarkdowToHtmlString from "../../../utils/markdown";
import ParseHtmlBlocks from "./ParseHtmlBlocks";
// import { BackToTopButtonSmallScreens } from "../../BackToTopButton";

const Article = async ({
  id,
  content,
}: {
  id: string;
  content: { __component: string; id: number; title?: string; body?: string }[];
}) => {
  console.log(content);
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
              key={`shared.rich-text-${block.id}`}
              className="w-full blog blog-center-content blog-heading blog-text blog-blockquote blog-code blog-lists blog-todo-list blog-table blog-hr"
            >
              <blockquote>
                <p>{block.body}</p>
              </blockquote>
              <strong>— {block.title}</strong>
            </div>
          );
        case "shared.media":
          console.log(block);
          // const sharedMediaResponse = await fetch(
          //   `http://127.0.0.1:1337/api/upload/files/${block.id}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          //     },
          //   }
          // );
          // if (!sharedMediaResponse.ok)
          //   throw new Error(
          //     `${sharedMediaResponse.status} ${sharedMediaResponse.statusText}`
          //   );
          // const data = await sharedMediaResponse.json();
          // console.log(data);
          return (
            <div key={`shared.slider-${block.id}`}>
              {/* <Image
                src={`http://127.0.0.1:1337${data.url}`}
                alt={data.alternativeText}
                width={data.width}
                height={data.height}
              /> */}
            </div>
          );
        case "shared.slider":
          // const sharedSliderResponse = await fetch(
          //   `http://127.0.0.1:1337/files/${block.id}`,
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
          // console.log("Slider", sharedSlider);
          return (
            <div key={`shared.slider-${block.id}`}>
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
