"use server";

import Link from "next/link";
import BodyComponent from "../components/Body";
import { getArticles } from "../lib/articles";
import Image from "next/image";
import { formatDateToCustomFormat } from "../functions/dates";

export default async function HomePage() {
  const { data: articles } = await getArticles();
  return (
    <BodyComponent>
      <main className="h-full">
        <div className="h-full w-full flex items-center blog-center-content">
          <ul className="grid grid-cols-3 gap-4 my-20">
            {articles.map(
              (article: {
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
              }) => (
                <li key={article.documentId}>
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
                </li>
              )
            )}
          </ul>
        </div>
      </main>
    </BodyComponent>
  );
}
