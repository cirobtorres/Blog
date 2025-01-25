"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../Shadcnui/tooltip";
import { Check, Copy } from "lucide-react";

const CopyButton = ({ htmlToRender }: { htmlToRender: string }) => {
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCopy = () => {
    const codeContent = new DOMParser()
      .parseFromString(htmlToRender, "text/html")
      .querySelector("code")?.textContent;

    if (codeContent) {
      navigator.clipboard.writeText(codeContent);
      setCopied(true); // Variable to control layout
      setDisable(true); // Disable user to click on it for the duration of the effect (3 seconds)

      // Return to initial state after times out
      setTimeout(() => {
        setCopied(false);
        setDisable(false);
      }, 3000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`absolute right-2 top-2 size-10 rounded-xl transition-colors duration-500 dark text-blog-foreground-readable ${
              !copied
                ? "hover:bg-blog-border hover:text-blog-foreground-readable-hover"
                : "bg-blog-border"
            }`}
            onClick={handleCopy}
            disabled={disable}
          >
            <div
              className={`absolute -top-[85%] left-1/2 -translate-x-1/2 z-50 overflow-hidden rounded-md bg-blog-border px-2 py-1 text-sm text-blog-foreground-readable transition-all duration-200 ${
                copied
                  ? "visible scale-110 opacity-100"
                  : "invisible scale-100 opacity-0"
              }`}
            >
              <p>Copiado!</p>
            </div>
            <div className="relative w-full">
              <Check
                className={`absolute size-5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${
                  copied
                    ? " visible animate-clip-pop-up-and-bounce"
                    : " invisible"
                }`}
              />
              <Copy
                className={`absolute size-5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${
                  !copied ? "visible" : "invisible"
                }`}
              />
            </div>
          </button>
        </TooltipTrigger>
        {!copied && (
          <TooltipContent>
            <p>Copiar</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
