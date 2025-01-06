"use server";

import dynamic from "next/dynamic";
import Link from "next/link";

const EditorComponent = dynamic(() => import("@/components/Editor"), {
  ssr: true,
});

export default async function DashboardCreatePublicationPage() {
  return (
    <main className="max-w-full flex flex-col">
      <div className="flex">
        <div className="shrink-0 w-72 bg-blog-dark-widgets border-r border-[var(--ck-custom-border)]">
          <div className="z-10 sticky top-0 w-full h-12 bg-blog-dark-widgets border-b border-[var(--ck-custom-border)]" />
          <div className="sticky top-12 max-h-svh overflow-y-auto [&_div:not(:last-child)]:border-b [&_div:not(:last-child)]:border-[var(--ck-custom-border)] scrollbar">
            {Array.from({ length: 1 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 p-8">
                <p className="text-xs text-[#444444] text-[var(--blog-placeholder)]">
                  Publicações:
                </p>
                <ul className="ml-4 hover:[&_li]:text-white [&_li]:transition-colors [&_li]:duration-300 [&_li]:w-fit [&_li]:text-sm">
                  <li>
                    <Link href="/">Todas</Link>
                  </li>
                  <li>
                    <Link href="/">Criar Publicação</Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full z-10 sticky top-0 h-12 bg-blog-dark-widgets border-b border-[var(--ck-custom-border)]" />
          <div className="mx-auto w-full max-w-7xl mt-2 px-10 mb-10">
            <EditorComponent />
          </div>
        </div>
        <div className="shrink-0 w-72 bg-blog-dark-widgets border-l border-[var(--ck-custom-border)]">
          <div className="w-full z-10 sticky top-0 h-12 bg-blog-dark-widgets border-b border-[var(--ck-custom-border)]" />
        </div>
      </div>
      <div className="shrink-0 w-full h-60 bg-blog-dark-widgets border-t border-[var(--ck-custom-border)]" />
    </main>
  );
}
