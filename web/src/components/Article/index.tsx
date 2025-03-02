"use server";

import AnchorTracker from "./AnchorTracker";
import { BackToTopButton } from "./BackToTopButton";
import ArticleContent from "./ArticleContent";

const Article = ({ documentId, content }: ArticleContent) => {
  return (
    <section className="relative pb-12 px-4">
      <div className="max-w-screen-2xl mx-auto grid gap-4 grid-cols-article max-lg:grid-cols-article-1024 max-[800px]:grid-cols-article-800">
        <AnchorTracker documentId={documentId} />
        <ArticleContent documentId={documentId} content={content} />
        <div className="max-lg:hidden mx-auto col-start-3 max-lg:col-start-auto">
          <BackToTopButton documentId={documentId} />
        </div>
      </div>
    </section>
  );
};

export default Article;
