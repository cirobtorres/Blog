"use client";

import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import HeaderContent from "./HeaderContent";

const FloatingHeader = ({ currentUser }: { currentUser: User }) => {
  const headerRef = useRef<HTMLElement>(null);
  const scrollingDownRef = useRef(0);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 1000; // Header is static for the first 1000 px on top

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (
        currScrollPos < threshold || // Show header when on top
        currScrollPos < prevScrollPos || // Show header when scrolling up
        (currScrollPos > prevScrollPos && scrollingDownRef.current < 1000) // Hide header after scrolling 1000 px down
      ) {
        if (headerRef.current) headerRef.current.style.top = "0"; // Show
      } else {
        if (headerRef.current) headerRef.current.style.top = "-48px"; // Hide
      }
      if (currScrollPos > prevScrollPos) {
        // scrollingDownRef.current keeps header static for a certain amout of scrolling down before hiding it
        scrollingDownRef.current += currScrollPos - prevScrollPos;
      } else {
        // It is restarted when scrolling up
        scrollingDownRef.current = 0;
      }
      prevScrollPos = currScrollPos;
    };
    return handleScroll;
  };

  useEffect(() => {
    const handleScroll = hideNavbarListener();
    window.addEventListener("scroll", handleScroll);
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Calls only once

  return (
    <header
      ref={headerRef}
      id="floating-header"
      data-testid="floating-header"
      className="fixed top-0 [z-index:10] w-full h-12 shrink-0 transition-[top] duration-300 backdrop-blur-sm bg-blog-background-backdrop"
      style={{ top: 0 }}
    >
      <HeaderContent currentUser={currentUser} />
      <ProgressBar />
    </header>
  );
};

const StaticHeader = ({ currentUser }: { currentUser: User }) => {
  return (
    <header
      id="static-header"
      data-testid="static-header"
      className="z-10 h-12 w-full backdrop-blur-sm shrink-0 bg-blog-background-backdrop"
    >
      <HeaderContent currentUser={currentUser} />
    </header>
  );
};

export { FloatingHeader, StaticHeader };
