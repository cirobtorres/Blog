"use client";

import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcnui/tooltip";

export default function DarkModeToggle() {
  const { setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <div className="flex shrink-0 justify-center items-center rounded-full size-8 duration-700 cursor-pointer bg-blog-background-1">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className="absolute transition-all duration-[600ms] opacity-0 scale-0 dark:opacity-100 dark:scale-100"
              >
                <IoMoon className="text-xl text-[#40b88c]" />
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className="absolute transition-all duration-[600ms] opacity-100 scale-100 dark:opacity-0 dark:scale-0
                "
              >
                <IoSunny className="text-xl text-[#fbbf24]" />
              </button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Alternar tema</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
