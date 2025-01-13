import AnchorTracker from "../AnchorTracker";
import BackToTopButton from "../BackToTopButton";
import Article from "./Article";

// Format article content to highlight code blocks with Highlight.js and creates anchor ids for page navigation
const ArticleContent = ({
  id,
  content,
}: {
  id: string;
  content: { __component: string; id: number; title?: string; body?: string }[];
}) => {
  return (
    <div className="relative grid grid-cols-article max-lg:grid-cols-article-1024 max-[800px]:grid-cols-article-800 gap-4 pb-12 mx-auto px-4 max-w-screen-2xl">
      <AnchorTracker contentId={id} />
      <Article id={id} content={content} />
      <div className="max-lg:hidden">
        <BackToTopButton contentId={id} />
      </div>
    </div>
  );
};

export default ArticleContent;
