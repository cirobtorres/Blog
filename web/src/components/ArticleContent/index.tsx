import AnchorTracker from "../AnchorTracker";
// import BackToTopButton from "../BackToTopButton";
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
    <div className="relative flex gap-8 pb-12 mx-auto max-w-screen-2xl">
      <AnchorTracker contentId={id} />
      <Article id={id} content={content} />
      {/* <BackToTopButton id={id} /> */}
    </div>
  );
};

export default ArticleContent;
