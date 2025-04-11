"use server";

import Image from "next/image";

const ArticleImage = ({ cover }: { cover: Cover }) => {
  const URL = process.env.NEXT_PUBLIC_BACKEND_IP ?? "http://127.0.0.1:1337";
  return (
    <section
      data-testid="hero-article-image"
      className={
        "grid grid-cols-article" +
        " max-lg:grid-cols-article-1024" +
        " max-w-screen-2xl mx-auto mb-20"
      }
    >
      <figure
        className={
          "flex flex-col h-[25rem] col-start-2 max-[800px]:col-start-1 max-[800px]:col-span-2 max-lg:mx-4 max-lg:pl-4 max-[800px]:pl-0"
        }
        aria-labelledby={`image-caption-${cover.documentId}`}
      >
        <div className="shrink-0 relative h-full">
          <Image
            data-testid="hero-article-image-cover"
            role="img"
            src={`${URL}${cover.url}`}
            alt={cover.alternativeText || "Imagem principal do artigo"}
            fill
            sizes={
              `(max-width: ${cover.width}) 100vw` +
              `, (max-width: ${cover.width / 2}) 50vw` +
              `, 33vw`
            }
            className="absolute object-cover"
          />
        </div>
        {cover.caption && (
          <figcaption
            data-testid="hero-article-image-caption"
            role="doc-figure"
            className="mx-2 mt-3 text-xs"
          >
            {cover.caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default ArticleImage;
