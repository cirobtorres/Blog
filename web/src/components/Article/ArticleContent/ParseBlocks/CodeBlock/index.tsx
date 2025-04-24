"use client";

import { useEffect, useRef, useState } from "react";
import getHighlighter from "../../../../../utils/createHighlight";
import highlightPreBlocks from "../../../../../utils/highlight";
import { type Highlighter } from "shiki";

const CodeBlock = ({ htmlToRender }: { htmlToRender: string }) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const highlighterRef = useRef<Highlighter>(null);

  useEffect(() => {
    if (!highlighterRef.current) {
      getHighlighter().then((highlighter) => {
        highlighterRef.current = highlighter;
        setHighlightedCode(
          highlightPreBlocks(htmlToRender, highlighterRef.current)
        );
      });
    } else {
      setHighlightedCode(
        highlightPreBlocks(htmlToRender, highlighterRef.current)
      );
    }
  }, [htmlToRender]);

  return <FullCodeBlock code={highlightedCode} />;
};

const FullCodeBlock = ({ code }: { code: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: code,
      }}
      className={`blog-code rounded-b-xl overflow-hidden [&_pre]:scrollbar [&_pre]:overflow-y-auto [&_code]:py-3`}
    />
  );
};

export default CodeBlock;
