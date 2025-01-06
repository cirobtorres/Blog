"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import AnchorTracker from "../AnchorTracker";
import { generateHeadersId } from "../../functions/anchors";
import BackToTopButton from "../BackToTopButton";

// Format publication content to highlight code blocks with Highlight.js and creates anchor ids for page navigation
const PublicationContent = ({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) => {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="relative flex gap-8 mx-auto max-w-screen-2xl">
      <AnchorTracker bodyId={slug} content={content} />
      <Publication slug={slug} content={content} />
      <BackToTopButton bodyId={slug} />
    </div>
  );
};

const Publication = ({ slug, content }: { slug: string; content: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHeadersId(content),
      }}
      id={slug}
      className="w-full mb-20 blog blog-center-content blog-heading blog-text blog-blockquote blog-code blog-lists blog-todo-list blog-table blog-hr"
    />
  );
};

export default PublicationContent;
