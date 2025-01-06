"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import PublicationContentAnchorTracker from "../PublicationContentAnchorTracker";
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
  const returnBodyWithAnchorHeading = (content: string) => {
    let h2Index = 0;
    let h3Index = 0;
    let h4Index = 0;

    return content.replace(/<h([2-4])/g, (match, level) => {
      if (level === "2") {
        h2Index++;
        h3Index = 0;
        h4Index = 0;
        return `<h2 id="anchor-${h2Index}-${h3Index}-${h4Index}"`;
      } else if (level === "3") {
        h3Index++;
        h4Index = 0;
        return `<h3 id="anchor-${h2Index}-${h3Index}-${h4Index}"`;
      } else if (level === "4") {
        h4Index++;
        return `<h4 id="anchor-${h2Index}-${h3Index}-${h4Index}"`;
      }
      return match;
    });
  };

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
          __html: returnBodyWithAnchorHeading(content),
        }}
        id={slug}
        className="w-full blog-center-content mb-20 blog-heading blog-text blog-blockquote blog-code blog-lists blog-todo-list blog-table blog-hr"
      />
    </div>
  );
};

export default PublicationContent;
