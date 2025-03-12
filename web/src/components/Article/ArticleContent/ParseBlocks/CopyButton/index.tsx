"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../Shadcnui/tooltip";
import { Check, Copy } from "lucide-react";
import { toast } from "../../../../../hooks/useToast";
import { ToasterProvider } from "../../../../../providers/ToasterProvider";

const CopyButton = ({ htmlToRender }: { htmlToRender: string }) => {
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCopy = () => {
    const codeContent = new DOMParser().parseFromString(
      htmlToRender,
      "text/html"
    ).body.innerText;

    if (codeContent) {
      navigator.clipboard.writeText(codeContent);
      toast({ description: "Código copiado!" });
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
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg transition-colors duration-500 dark text-blog-foreground-readable border border-blog-border ${
                !copied
                  ? "hover:bg-blog-border hover:text-blog-foreground-readable-hover"
                  : "bg-blog-border"
              }`}
              onClick={handleCopy}
              disabled={disable}
            >
              <div
                className={`z-50 h-6 absolute -top-[105%] left-1/2 -translate-x-1/2 overflow-hidden rounded-md bg-blog-border px-2 py-1 text-blog-foreground-readable transition-all duration-200 ${
                  copied
                    ? "visible scale-110 opacity-100"
                    : "invisible scale-100 opacity-0"
                }`}
              >
                <p className="text-xs">Copiado!</p>
              </div>
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
          {!copied && (
            <TooltipContent>
              <p>Copiar</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <ToasterProvider />
    </>
  );
};

export default CopyButton;
