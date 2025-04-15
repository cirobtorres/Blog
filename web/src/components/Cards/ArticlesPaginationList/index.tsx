import Link from "next/link";
import Image from "next/image";
import { formatDateToCustomFormat } from "@/utils/dates";

const ArticlesList = ({ articles }: { articles: ArticleCard[] }) => {
  if (articles.length > 0) {
    return (
      <ul className="w-full max-w-screen-lg mx-auto flex flex-col gap-4">
        {articles.map((article) => (
          <li key={article.documentId}>
            <Link
              href={`/artigos/${article.documentId}/${article.slug}`}
              className={
                `flex items-center max-[650px]:flex-col` +
                ` border border-blog-border` +
                ` transition-all duration-500` +
                ` mx-4 rounded-xl overflow-hidden` +
                ` bg-blog-background-2 hover:shadow-blog-highlight`
              }
            >
              <div className="w-full shrink-0 relative max-w-[40%] max-[650px]:max-w-full aspect-video h-[212px]">
                <Image
                  src={
                    article.cover
                      ? process.env.NEXT_PUBLIC_BACKEND_IP + article.cover.url
                      : "https://placehold.co/1920x1080/171717/FFFFFF/png"
                  }
                  alt={
                    article.cover
                      ? article.cover.alternativeText
                      : `Imagem de destaque da capa do artigo ${article.documentId}`
                  }
                  fill
                  priority
                  sizes={
                    `(max-width: ${article.cover.width}) 100vw` +
                    `, (max-width: ${article.cover.width / 2}) 50vw`
                  }
                  className="absolute object-cover"
                />
              </div>
              <div
                className={
                  `flex-1 flex flex-col justify-center gap-2` +
                  ` w-full h-[212px] py-2 px-3 overflow-hidden`
                }
              >
                {article.topic && (
                  <div className="shrink-0 h-6 flex items-center gap-4">
                    <p className="text-base truncate flex-[0_0_auto]">
                      {article.topic.name}
                    </p>
                    {article.tools && (
                      <ul className="flex gap-x-2 overflow-x-auto blog-hide-scrollbar">
                        {article.tools.map((tool) => (
                          <li
                            key={tool.documentId}
                            className="flex items-center gap-2 text-xs [&_svg]:w-5"
                          >
                            <Image
                              src={
                                tool.file
                                  ? process.env.NEXT_PUBLIC_BACKEND_IP +
                                    tool.file.url
                                  : "https://placehold.co/20x20/171717/FFFFFF/png"
                              }
                              alt={
                                tool.file
                                  ? tool.file.alternativeText
                                  : `Logo do ${tool.name}`
                              }
                              width={20}
                              height={20}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <h2 className="shrink-0 h-14 text-xl font-bold line-clamp-2 transition-all duration-500 group-hover:text-blog-foreground-highlight">
                  {article.title}
                </h2>
                <p className="shrink-0 h-[60px] text-sm text-[#808080] line-clamp-3">
                  {article.description}
                </p>
                <div className="h-8 shrink-0 flex flex-col items-end">
                  {article.updatedAt > article.createdAt ? (
                    <>
                      <p className="h-4 mt-auto text-xs">
                        <small>
                          Criado:{" "}
                          <time>
                            {formatDateToCustomFormat(article.createdAt)}
                          </time>
                        </small>
                      </p>
                      <p className="h-4 mt-auto text-xs">
                        <small>
                          Atualizado:{" "}
                          <time>
                            {formatDateToCustomFormat(article.updatedAt)}
                          </time>
                        </small>
                      </p>
                    </>
                  ) : (
                    <p className="h-4 mb-auto text-xs">
                      <small>
                        Criado:{" "}
                        <time>
                          {formatDateToCustomFormat(article.createdAt)}
                        </time>
                      </small>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div className="w-full h-full max-w-screen-lg mx-auto flex justify-center items-center">
        <h1 className="text-3xl font-extrabold">Nenhum artigo publicado</h1>
      </div>
    );
  }
};

export default ArticlesList;
