"use server";

import Image from "next/image";

const ArticleImage = ({
  cover,
}: {
  cover: {
    url: string;
    alternativeText: string;
    caption: string;
  };
}) => {
  return (
    <section
      className={
        "grid grid-cols-article" +
        " max-lg:grid-cols-article-800" +
        " max-w-screen-2xl mx-auto mb-20"
      }
    >
      <figure
        className={
          "flex flex-col gap-3 h-[25rem]" +
          " col-start-2 max-lg:col-start-1" +
          " ml-4 mr-4 pl-4 max-lg:pl-0"
        }
      >
        <div className="shrink-0 relative h-full">
          <Image
            src={`http://127.0.0.1:1337${cover.url}`}
            alt={cover.alternativeText}
            fill
            className="absolute object-cover"
          />
        </div>
        <figcaption className="text-xs">{cover.caption}</figcaption>
      </figure>
    </section>
  );
};

export default ArticleImage;
