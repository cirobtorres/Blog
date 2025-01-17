"use server";

import AnchorTracker from "../AnchorTracker";
import { BackToTopButton } from "../BackToTopButton";
import ArticleContent from "./ArticleContent";

// Format article content to highlight code blocks with Highlight.js and creates anchor ids for page navigation
const Article = ({ documentId, content }: ArticleContent) => {
  return (
    <div
      className={
        "relative max-w-screen-2xl mx-auto pb-12 px-4" +
        " grid gap-4 grid-cols-article max-lg:grid-cols-article-1024 max-[800px]:grid-cols-article-800"
      }
    >
      <AnchorTracker documentId={documentId} />
      <ArticleContent documentId={documentId} content={content} />
      <div className="max-lg:hidden">
        <BackToTopButton contentId={documentId} />
      </div>
    </div>
  );
};

export default Article;
