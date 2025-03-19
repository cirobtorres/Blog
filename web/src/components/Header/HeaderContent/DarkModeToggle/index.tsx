"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../Shadcnui/tooltip";
import { useEffect, useState } from "react";
import { Skeleton } from "../../../Shadcnui/skeleton";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {!mounted && (
        <Skeleton
          aria-label="Carregando botão de modo noturno"
          className="size-8 rounded-full"
        />
      )}
      {mounted && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              asChild
              className="outline-blog-foreground-highlight focus:outline-blog-foreground-highlight"
            >
              <button
                data-testid="dark-mode-toggle"
                aria-label="Alternar entre tema claro e escuro"
                role="button"
                className="relative"
                tabIndex={0}
                onClick={(event) => {
                  event?.preventDefault();
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                <div className="flex shrink-0 justify-center items-center rounded-full size-8 cursor-pointer bg-blog-background-1 dark:bg-[hsl(0,0%,14.9%,0.75)]">
                  <div
                    data-testid="moon-button"
                    tabIndex={-1}
                    className="absolute duration-500 transition-all pointer-events-none p-1"
                    style={{
                      opacity: theme === "dark" ? 1 : 0,
                      scale: theme === "dark" ? 1 : 0,
                      transform:
                        theme === "dark" ? "rotate(360deg)" : "rotate(0deg)",
                    }}
                  >
                    <FaMoon className="text-xl text-[#40b88c]" />
                  </div>
                  <div
                    data-testid="sun-button"
                    tabIndex={-1}
                    className="absolute duration-500 transition-all pointer-events-none p-1"
                    style={{
                      opacity: theme !== "dark" ? 1 : 0,
                      scale: theme !== "dark" ? 1 : 0,
                      transform:
                        theme !== "dark" ? "rotate(0deg)" : "rotate(360deg)",
                    }}
                  >
                    <IoSunny className="text-xl text-[#fbbf24]" />
                  </div>
                  <span
                    data-testid="dark-mode-toggle-span"
                    role="status"
                    aria-live="polite"
                    className="sr-only"
                  >
                    Tema {theme === "dark" ? "escuro" : "claro"}
                  </span>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent role="tooltip">
              <p data-testid="dark-mode-toggle-tooltip-text">Alternar tema</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
