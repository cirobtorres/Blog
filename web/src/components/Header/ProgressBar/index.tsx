"use client";

import { useEffect } from "react";

const ProgressBar = ({ documentId }: { documentId: string }) => {
  const linearProgressBarOnScroll = () => {
    const elementHeight = document.getElementById(documentId)?.scrollHeight;
    const progressBar = document.getElementById("progress-bar-blur");
    const progressBarBlur = document.getElementById("progress-bar");
    const scrollTop = window.scrollY;
    if (elementHeight && progressBar && progressBarBlur) {
      const percentage =
        scrollTop < elementHeight ? (scrollTop / elementHeight) * 100 : 100;
      progressBarBlur.style.width = `${percentage}%`;
      progressBar.style.width = `${percentage}%`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", linearProgressBarOnScroll);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", linearProgressBarOnScroll);
    };
  }, []);

  return (
    <div className="fixed top-[calc(100%_+_1px)] left-0 h-1 w-full inline-grid">
      <div
        id="progress-bar-blur"
        className="w-0 h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight blur-xl hidden max-lg:block"
      />
      <div
        id="progress-bar"
        className="w-0 h-full col-start-1 row-start-1 bg-gradient-to-r from-transparent to-blog-foreground-highlight hidden max-lg:block"
      />
    </div>
  );
};

export default ProgressBar;
