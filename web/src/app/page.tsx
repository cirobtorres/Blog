"use server";

import Link from "next/link";
import BodyComponent from "../components/Body";
import { getArticles } from "../lib/articles";

export default async function HomePage() {
  const { data: articles } = await getArticles();
  const article = articles[0];
  return (
    <BodyComponent>
      <main className="h-full flex items-center">
        <div className="w-full blog-center-content">
          <ul>
            <li>
              <Link href={`artigos/${article.documentId}/${article.slug}`}>
                {article.title}
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </BodyComponent>
  );
}
