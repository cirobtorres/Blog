"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import slugify from "../../../utils/slugify";
import { getArticles } from "../../../lib/articles";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Shadcnui/dialog";

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
  const searchParams = useSearchParams();
  const [sortedList, setSortedList] = useState<ArticleList | null>(null);

  const handleSearch = useDebouncedCallback(async (queryText: string) => {
    const params = new URLSearchParams(searchParams);

    // Delete user's input if it is empty
    if (queryText) {
      params.set("query", queryText);
    } else {
      params.delete("query");
    }

    const sortBySlugfied = slugify(params.get("query") || "");
    if (sortBySlugfied !== "") {
      const { data: articleList } = await getArticles(
        "createdAt:desc",
        sortBySlugfied
      );

      setSortedList(articleList.length === 0 ? [] : articleList.slice(0, 7));
    } else {
      setSortedList(null);
    }
  }, 500);

  return (
    <Dialog>
      <DialogTrigger
        className="w-full rounded-3xl flex-1" // outline-none
      >
        <Trigger />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Buscador de artigos</DialogTitle>
        </DialogHeader>
        <form action="/artigos" className="overflow-x-hidden">
          <InputQuery handleSearch={handleSearch} searchParams={searchParams} />
          <ResultQuery sortedList={sortedList} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Trigger = () => {
  return (
    <div className="relative w-full min-h-10 flex items-center rounded-3xl border border-blog-border bg-blog-background-1 transition-all duration-500 hover:bg-blog-background-2 group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 transition-all duration-500 text-blog-foreground-readable group-hover:text-blog-foreground-readable-hover" />
      <p className="pl-12 w-full text-sm text-start transition-all duration-500 group-hover:text-blog-foreground-readable-hover">
        Buscar artigos...
      </p>
    </div>
  );
};

const InputQuery = ({
  searchParams,
  handleSearch,
}: {
  searchParams: ReadonlyURLSearchParams;
  handleSearch: (queryString: string) => void;
}) => {
  return (
    <div className="relative min-h-10 w-full py-4">
      <div className="flex flex-col justify-center">
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <Search className="size-4 transition-all duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover" />
        </button>
        <input
          id="query"
          type="query"
          name="query"
          autoComplete="off"
          placeholder="Pesquisar artigos..."
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
          className="text-sm w-full border-transparent border-none border-0 outline-none outline-0 pl-12 pr-16 bg-transparent"
        />
      </div>
      <DialogClose className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs font-extrabold rounded border border-blog-border transition-all duration-500 bg-blog-background-2 hover:text-blog-foreground-readable-hover hover:bg-blog-background-1">
        <DialogDescription className="sr-only">
          Fechar buscador
        </DialogDescription>
        ESC
      </DialogClose>
    </div>
  );
};

const ResultQuery = ({ sortedList }: { sortedList: ArticleList | null }) => {
  return (
    <>
      {sortedList && sortedList.length > 0 && (
        <>
          <hr />
          <ul className="flex flex-col py-4">
            {sortedList.map((article) => (
              <li key={article.documentId}>
                <Link
                  href={`/artigos/[documentId]/[slug]`}
                  as={`/artigos/${article.documentId}/${article.slug}`}
                  className="flex items-center gap-3 py-1.5 px-5"
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
                  <p className="text-sm truncate text-blog-foreground-readable">
                    {article.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {sortedList && sortedList.length === 0 && (
        <>
          <hr />
          <div className="py-4">
            <span className="sr-only">Nenhum artigo encontrado</span>
            <p className="text-center text-sm text-blog-foreground-readable">
              Nenhum artigo encontrado
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBar;
