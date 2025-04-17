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
      const elementHeight =
        document.documentElement.scrollHeight - window.innerHeight; // Page total height

      const progressCircle = document.getElementById("progress-circle");
      const progressCircleBlur = document.getElementById(
        "progress-circle-blur"
      );

      const scrollTop = window.scrollY; // Current Y coord height (pixels)

      if (elementHeight && progressCircle && progressCircleBlur) {
        const percentage =
          scrollTop < elementHeight ? (scrollTop / elementHeight) * 100 : 100; // Current Y coord (percentage)

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
      id="btt-btn-container"
      data-testid="btt-btn-container"
      className="self-start sticky mx-auto top-1/2 -translate-y-1/2"
      style={{
        marginTop: `calc(50vh - ${diameter}px)`,
        marginBottom: `calc(50vh - ${diameter}px)`,
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              id="btt-btn"
              data-testid="btt-btn"
              type="button"
              aria-label="Voltar ao topo da página"
              title="Voltar ao topo da página"
              style={{ height: `${diameter}px` }}
              onClick={() => window.scrollTo(0, 0)}
              className="relative flex group rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blog-foreground-readable-hover"
            >
              <svg
                className="relative -rotate-90"
                role="presentation"
                aria-hidden="true"
                focusable="false"
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
                  data-testid="progress-circle"
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
                  data-testid="progress-circle-blur"
                  cx={outerRadius}
                  cy={outerRadius}
                  r={`${innerRadius}px`}
                  strokeWidth={`${strokeWidth}px`}
                  strokeDasharray={circunference.current}
                  style={{ strokeDashoffset: circunference.current }}
                  className="w-fit h-fit fill-none stroke-blog-foreground-highlight blur-sm"
                />
              </svg>
              <FaArrowUp
                id="btt-arrow-up"
                data-testid="btt-arrow-up"
                aria-hidden="true"
                focusable="false"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xl group-hover:animate-bouncing-arrow-up"
              />
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
