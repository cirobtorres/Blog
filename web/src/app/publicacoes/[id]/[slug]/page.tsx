"use server";

import { createClient } from "../../../../utils/supabase/server";
import PublicationContent from "../../../../components/PublicationContent";

interface Params {
  params: {
    id: string;
    slug: string;
  };
}

export default async function PublicationsPage({ params }: Params) {
  const { id, slug } = await params;
  const supabase = await createClient();
  const { data: publication, error } = await supabase
    .from("publication")
    .select("*")
    .eq("id", id)
    .eq("slug", slug)
    .neq("private", true)
    .single<Publication>();

  if (
    error?.code === "PGRST116" &&
    error?.details === "The result contains 0 rows"
  )
    return (
      <main className="blog-center-content flex justify-center items-center h-full">
        <h1 className="text-7xl font-extrabold">Not Found</h1>
      </main>
    );

  if (publication) {
    return (
      <main>
        <div className="py-20 mb-20 bg-blog-publication-hero">
          <div className="blog-center-content flex flex-col gap-4">
            <h1 className="text-5xl font-extrabold">{publication.title}</h1>
            <p className="text-2xl">{publication.sub_title}</p>
            <div className="flex gap-4">
              <p>Autor</p>
              <time>{publication.updated_at}</time>
              <time>{publication.created_at}</time>
            </div>
          </div>
        </div>
        <PublicationContent
          slug={publication.slug}
          content={publication.content}
        />
        <div className="h-40 bg-blog-dark-background" />
      </main>
    );
  }
}
