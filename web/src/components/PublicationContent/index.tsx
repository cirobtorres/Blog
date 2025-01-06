"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import PublicationContentAnchorTracker from "../PublicationContentAnchorTracker";
import { generateHeadersId } from "../../functions/anchors";
// import typescript from "highlight.js/lib/languages/typescript";
// import python from "highlight.js/lib/languages/python";
// import kotlin from "highlight.js/lib/languages/kotlin";
// import java from "highlight.js/lib/languages/java";
// import css from "highlight.js/lib/languages/css";
// import sql from "highlight.js/lib/languages/sql";

// Format publication content to highlight code blocks with Highlight.js and creates anchor ids for page navigation
const PublicationContent = ({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) => {
  useEffect(() => {
    // hljs.registerLanguage("typescript", typescript);
    // hljs.registerLanguage("python", python);
    // hljs.registerLanguage("kotlin", kotlin);
    // hljs.registerLanguage("java", java);
    // hljs.registerLanguage("css", css);
    // hljs.registerLanguage("sql", sql);
    hljs.highlightAll();
  });

  return (
    <div className="relative flex mx-auto max-w-screen-2xl">
      <PublicationContentAnchorTracker bodyId={slug} content={content} />
      <div
        dangerouslySetInnerHTML={{
          __html: generateHeadersId(content),
        }}
        id={slug}
        className="w-full mb-20 blog blog-center-content blog-heading blog-text blog-blockquote blog-code blog-lists blog-todo-list blog-table blog-hr"
      />
    </div>
  );
};

export default PublicationContent;
