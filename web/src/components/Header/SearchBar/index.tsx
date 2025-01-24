"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import slugify from "../../../utils/slugify";
import { queryArticles } from "../../../lib/articles";
import Link from "next/link";
import Image from "next/image";

type ArticleList = {
  documentId: string;
  title: string;
  slug: string;
  cover: {
    documentId: string;
    url: string;
    alternativeText: string;
  };
}[];

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const [sortedList, setSortedList] = useState<ArticleList | null>(null);

  const handleSearch = useDebouncedCallback(async (queryText: string) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const params = new URLSearchParams(searchParams);

    // Delete user's input if it is empty
    if (queryText) {
      params.set("query", queryText);
    } else {
      params.delete("query");
    }

    const sortBySlugfied = slugify(params.get("query") || "");
    const { data: articleList } = await queryArticles(sortBySlugfied);
    setSortedList(articleList);
  }, 500);

  return (
    <form
      action="/artigos"
      className="min-h-10 w-full relative rounded-t-3xl border border-blog-border bg-blog-background-1"
      style={{
        marginBottom: sortedList ? (sortedList.length > 0 ? "1px" : "") : "", // To avoid button movements when bottom border is set to zero
        borderBottom: sortedList
          ? sortedList.length > 0
            ? "0px none"
            : ""
          : "",
        borderBottomLeftRadius: sortedList
          ? sortedList.length > 0
            ? "0px"
            : "24px"
          : "24px",
        borderBottomRightRadius: sortedList
          ? sortedList.length > 0
            ? "0px"
            : "24px"
          : "24px",
      }}
    >
      <label htmlFor="search" className="sr-only">
        Buscador de artigos
      </label>
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <Search className="size-4 transition-all duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover" />
      </button>
      <input
        ref={inputRef}
        id="search"
        type="search"
        name="search"
        autoComplete="off"
        placeholder="Pesquisar artigos..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // value vs defaultValue (controlled vs uncontrolled)
        defaultValue={searchParams.get("query")?.toString()}
        className="h-full text-sm w-full border-transparent border-none border-0 outline-none outline-0 px-10 bg-transparent"
      />
      {sortedList && sortedList.length > 0 && (
        <div className="absolute -left-[1px] -right-[1px] overflow-y-hidden border-b border-x border-blog-border bg-blog-background-1 rounded-b-3xl pt-1 pb-4">
          <ul className="flex flex-col">
            {sortedList.slice(0, 7).map((article) => (
              <li key={article.documentId}>
                <Link
                  href={`/artigos/[documentId]/[slug]`}
                  as={`/artigos/${article.documentId}/${article.slug}`}
                  className="flex items-center gap-3 py-1.5 px-5 rounded transition-all duration-500 hover:bg-blog-background-2 group"
                >
                  <div className="shrink-0 relative size-8">
                    <Image
                      src={`http://127.0.0.1:1337${article.cover.url}`}
                      alt={article.cover.alternativeText}
                      fill
                      sizes="(min-width: 16px) 100vw"
                      className="absolute object-cover"
                    />
                  </div>
                  <p className="text-sm truncate text-blog-foreground-readable group-hover:text-blog-foreground-readable-hover">
                    {article.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
