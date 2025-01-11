"use server";

import Link from "next/link";
import BodyComponent from "../components/Body";
import { getArticles } from "../lib/articles";
import Image from "next/image";
import { formatDateToCustomFormat } from "../functions/dates";

type Article = {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: {
    id: string;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      large: object;
      small: object;
      medium: object;
      thumbnail: object;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export default async function HomePage() {
  const { data: articles }: { data: Article[] } = await getArticles();
  const articleInEvidence = articles.shift();
  return (
    <BodyComponent>
      <main className="h-full">
        {articleInEvidence && (
          <div className="max-w-screen-2xl mx-auto flex items-center mb-10">
            <Link
              href={`artigos/${articleInEvidence.documentId}/${articleInEvidence.slug}`}
              className="w-full"
            >
              <div className="relative h-[500px]">
                <Image
                  src={`http://127.0.0.1:1337${articleInEvidence.cover.url}`}
                  alt={articleInEvidence.cover.alternativeText}
                  fill
                  className="absolute object-cover"
                />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-10">
                  <p className="text-white text-5xl font-extrabold">
                    {articleInEvidence.title}
                  </p>
                  <p className="text-white">{articleInEvidence.description}</p>
                  <time className="text-white text-xs">
                    {formatDateToCustomFormat(articleInEvidence.createdAt)}
                  </time>
                </div>
              </div>
            </Link>
          </div>
        )}
        <div className="max-w-screen-2xl mx-auto flex items-center mb-10">
          <ul className="grid grid-cols-3 gap-4">
            {articles.map((article: Article) => (
              <li key={article.documentId}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </BodyComponent>
  );
}

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link
      href={`artigos/${article.documentId}/${article.slug}`}
      className="w-full"
    >
      <div className="relative h-[200px]">
        <Image
          src={`http://127.0.0.1:1337${article.cover.url}`}
          alt={article.cover.alternativeText}
          fill
          className="absolute object-cover"
        />
      </div>
      <p>{article.title}</p>
      <p className="text-[#686868]">{article.description}</p>
      <time className="text-xs">
        {formatDateToCustomFormat(article.createdAt)}
      </time>
    </Link>
  );
};
