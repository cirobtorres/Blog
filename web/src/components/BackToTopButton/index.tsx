"use client";

import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcnui/tooltip";

export default function BackToTopButton({
  contentId,
  diameter = 75,
  strokeWidth = 7,
}: {
  contentId: string;
  diameter?: number;
  strokeWidth?: number;
}) {
  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - strokeWidth * 2;
  const circunference = useRef(2 * Math.PI * innerRadius);

  const returnToTopListener = () => {
    const headerHeight = 400 + 480 + 80;
    const scrollTop = window.scrollY;
    const correctedScrollTop =
      scrollTop - headerHeight < 0 ? 0 : scrollTop - headerHeight;
    const elementHeight = document.getElementById(contentId)?.scrollHeight;
    const progressCircle = document.getElementById("progress-circle");
    if (elementHeight && progressCircle) {
      const percentage =
        correctedScrollTop < elementHeight
          ? (correctedScrollTop / elementHeight) * 100
          : 100;
      progressCircle.style.strokeDashoffset = `${
        circunference.current - (circunference.current * percentage) / 100
      }`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", returnToTopListener);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", returnToTopListener);
    };
  }, []);

  return (
    <div className="self-start sticky top-1/2 -translate-y-1/2 mt-10 mx-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="relative flex group"
              style={{ height: `${diameter}px` }}
            >
              <div className="relative">
                <svg
                  className="relative -rotate-90"
                  style={{ width: `${diameter}px`, height: `${diameter}px` }}
                >
                  <circle
                    cx={outerRadius}
                    cy={outerRadius}
                    r={`${innerRadius}px`}
                    strokeWidth={`${strokeWidth}px`}
                    strokeDasharray={circunference.current}
                    className="w-fit h-fit fill-none stroke-blog-background-2"
                    style={{ strokeDashoffset: 0 }}
                  />
                  <circle
                    id="progress-circle"
                    cx={outerRadius}
                    cy={outerRadius}
                    r={`${innerRadius}px`}
                    strokeWidth={`${strokeWidth}px`}
                    strokeDasharray={circunference.current}
                    style={{ strokeDashoffset: circunference.current }}
                    className="w-fit h-fit fill-none stroke-blog-foreground-highlight"
                  />
                </svg>
                <FaArrowUp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xl group-hover:animate-bouncing-arrow-up" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voltar ao topo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
