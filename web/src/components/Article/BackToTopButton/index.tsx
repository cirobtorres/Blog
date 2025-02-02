"use client";

import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../Shadcnui/tooltip";

const BackToTopButton = ({
  documentId,
  diameter = 75,
  strokeWidth = 7,
}: {
  documentId?: string;
  diameter?: number;
  strokeWidth?: number;
}) => {
  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - strokeWidth * 2;
  const circunference = useRef(2 * Math.PI * innerRadius);

  useEffect(() => {
    const returnToTopListener = () => {
      const headerHeight = documentId ? 400 + 480 + 80 + 16 : 0;
      const scrollTop = window.scrollY;
      const correctedScrollTop =
        scrollTop - headerHeight < 0 ? 0 : scrollTop - headerHeight;
      const elementHeight = document.getElementById(
        documentId || "body"
      )?.scrollHeight;
      const progressCircle = document.getElementById("progress-circle");
      const progressCircleBlur = document.getElementById(
        "progress-circle-blur"
      );
      if (elementHeight && progressCircle && progressCircleBlur) {
        const percentage =
          correctedScrollTop < elementHeight
            ? (correctedScrollTop / elementHeight) * 100
            : 100;
        progressCircle.style.strokeDashoffset = `${
          circunference.current - (circunference.current * percentage) / 100
        }`;
        progressCircleBlur.style.strokeDashoffset =
          progressCircle.style.strokeDashoffset;
      }
    };

    window.addEventListener("scroll", returnToTopListener);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", returnToTopListener);
    };
  }, [documentId]);

  return (
    <div
      className={`self-start sticky mx-auto top-1/2 -translate-y-1/2`}
      style={{
        marginTop: `calc(50vh - ${diameter}px)`,
        marginBottom: `calc(50vh - ${diameter}px)`,
      }}
    >
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
                  <circle
                    id="progress-circle-blur"
                    cx={outerRadius}
                    cy={outerRadius}
                    r={`${innerRadius}px`}
                    strokeWidth={`${strokeWidth}px`}
                    strokeDasharray={circunference.current}
                    style={{ strokeDashoffset: circunference.current }}
                    className="w-fit h-fit fill-none stroke-blog-foreground-highlight blur-sm"
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
};

export { BackToTopButton };
