"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../Shadcnui/tooltip";
import { toast } from "../../../../../hooks/useToast";

function cleanCodeBeforeCopy(code: string) {
  return code
    .replace(
      /^(?:\/\/|#|--|\*)\s*\[!code\s+(?:filepath|highlight)(?::[^\]]+)?\]\s*\r?\n?/gm,
      ""
      /*
      // → JS, TS, C, Java
      # → Python, Shell Script, Ruby
      -- → SQL, Lua
      * → JSDoc, JavaDoc
    */
    )
    .trim();
}

const CopyButton = ({ htmlToRender }: { htmlToRender: string }) => {
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCopy = () => {
    const codeContent = new DOMParser().parseFromString(
      htmlToRender,
      "text/html"
    ).body.innerText;

    if (codeContent) {
      navigator.clipboard.writeText(cleanCodeBeforeCopy(codeContent));
      toast({ description: "Código copiado!" });
      setCopied(true); // Variable to control layout
      setDisable(true); // Disable user to click on it for the duration of the effect (3 seconds)

      // Return to initial state after times out
      // They are different so the user doesn't notice TooltipContent paragraph changing its content before closing
      setTimeout(() => setCopied(false), 3200);
      setTimeout(() => setDisable(false), 3000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip open={disable ? true : undefined}>
        <TooltipTrigger asChild>
          <button
            className={`absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg transition-colors duration-500 text-blog-foreground-readable border border-blog-border ${
              !copied
                ? "hover:bg-blog-border hover:text-blog-foreground-readable-hover"
                : "bg-blog-border"
            }`}
            onClick={handleCopy}
            disabled={disable}
          >
            <div className="relative w-full">
              <Check
                className={`absolute size-4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${
                  copied
                    ? " visible animate-clip-pop-up-and-bounce"
                    : " invisible"
                }`}
              />
              <Copy
                className={`absolute size-4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${
                  !copied ? "visible" : "invisible"
                }`}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Copiado!" : "Copiar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
