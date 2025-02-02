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
  const [state, setState] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const highlighterRef = useRef<Highlighter>(null);

  const updateState = useCallback(
    (state: boolean) => {
      setState(() => {
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
        className={`[grid-column-start:1] [grid-row-start:1] relative grid blog-code [&_pre]:scrollbar [&_pre]:max-h-[600px] [&_code]:py-1 ${
          state
            ? "grid-rows-1 [&_pre]:overflow-y-auto [&_pre_code]:mb-10 [&_pre_code]:border-b [&_pre_code]:border-blog-border"
            : "grid-rows-[150px] [&_pre]:overflow-y-hidden before:absolute before:left-0 before:right-0 before:bottom-0 before:h-20 before:z-10 before:opacity-90 before:bg-blog-collapsible-code"
        }`}
      />
      <button
        onClick={() => updateState(!state)}
        className="[grid-column-start:1] [grid-row-start:1] absolute left-1/2 -translate-x-1/2 bottom-[26px] z-20 text-sm px-4 rounded border border-blog-border transition-all duration-500 bg-blog-background-1 hover:bg-blog-background-2 hover:text-blog-foreground-readable-hover"
      >
        {state && "Colapsar"}
        {!state && "Expandir"}
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
