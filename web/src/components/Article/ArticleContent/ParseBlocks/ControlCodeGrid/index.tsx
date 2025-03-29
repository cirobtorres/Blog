"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import getHighlighter from "../../../../../utils/createHighlight";
import highlightPreBlocks from "../../../../../utils/highlight";
import { type Highlighter } from "shiki";

const CodeBlock = ({
  id,
  htmlToRender,
}: {
  id: string;
  htmlToRender: string;
}) => {
  const [collapse, setCollapse] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const highlighterRef = useRef<Highlighter>(null);

  const updateState = useCallback(
    (state: boolean) => {
      setCollapse(() => {
        return state;
      });
      localStorage.setItem(`collapsible-${id}`, JSON.stringify(state));
    },
    [id]
  );

  useEffect(() => {
    const collapsible = localStorage.getItem(`collapsible-${id}`);
    if (collapsible) {
      updateState(JSON.parse(collapsible));
    }
  }, [id, updateState]);

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

  return htmlToRender.split("\n").length > 70 ? (
    <div className="w-full relative inline-grid">
      <div
        dangerouslySetInnerHTML={{
          __html: highlightedCode,
        }}
        className={
          `relative blog-code` +
          ` [&_pre]:scrollbar [&_pre]:max-h-[700px] [&_code]:py-1` +
          ` grid [grid-column-start:1] [grid-row-start:1]` +
          ` transition-all duration-500` +
          ` ${
            collapse
              ? "grid-rows-1 [&_pre]:overflow-y-auto"
              : `grid-rows-[150px] [&_pre]:overflow-y-hidden`
            // + `before:absolute before:left-0 before:right-0 before:bottom-0 before:h-20 before:z-10 before:opacity-90 before:bg-blog-fade-dot-down` // Fade out effect
          }`
        }
      />
      <button
        onClick={() => updateState(!collapse)}
        className="w-fit mx-auto text-sm px-4 rounded border border-blog-border transition-all duration-500 bg-blog-background-1 hover:bg-blog-background-2 hover:text-blog-foreground-readable-hover"
      >
        {collapse && (
          <p className="flex justify-center items-center">
            Colapsar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </p>
        )}
        {!collapse && (
          <p className="flex justify-center items-center">
            Expandir
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </p>
        )}
      </button>
    </div>
  ) : (
    <div
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
      className="blog-code [&_pre]:scrollbar [&_pre]:overflow-y-auto [&_pre]:max-h-[600px] [&_code]:py-1 "
    />
  );
};

export default CodeBlock;
