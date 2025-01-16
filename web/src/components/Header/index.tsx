"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import DarkModeToggle from "../DarkModeToggle";
import ProgressBar from "./ProgressBar";

const FloatingHeader = ({ documentId }: { documentId: string }) => {
  const headerRef = useRef<HTMLElement>(null);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 400 + 480 + 80; // threshold to maintain header on top, beyond which it is allowed to hide

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (currScrollPos < threshold || currScrollPos < prevScrollPos) {
        if (headerRef.current) headerRef.current.style.top = "0";
      } else {
        if (headerRef.current) headerRef.current.style.top = "-48px"; // 48px = header height
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
  }, []);

  return (
    <header
      ref={headerRef}
      id="floating-header"
      className="fixed h-12 w-full backdrop-blur-sm shrink-0 [z-index:10] top-0 transition-[top] duration-300 bg-blog-background-backdrop"
    >
      <HeaderContent />
      <ProgressBar documentId={documentId} />
    </header>
  );
};

const StaticHeader = () => {
  return (
    <header
      id="floating-header"
      className="h-12 w-full backdrop-blur-sm shrink-0 bg-blog-background-backdrop"
    >
      <HeaderContent />
    </header>
  );
};

const HeaderContent = () => {
  return (
    <div className="h-full max-w-screen-2xl px-4 mx-auto">
      <nav className="w-full h-full flex items-center justify-between">
        <div className="h-full flex items-center justify-center gap-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center justify-between text-sm uppercase font-extrabold h-full transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
            >
              HOME
            </Link>
          </div>
          <ul
            className={
              "flex gap-4 items-center justify-between" +
              " [&_li]:flex [&_li]:items-center [&_li]:justify-between" +
              " [&_li_a]:transition-colors [&_li_a]:duration-500 [&_li_a]:text-sm" +
              " [&_li_a]:text-blog-foreground-readable [&_li_a]:font-[500] hover:[&_li_a]:text-blog-foreground-readable-hover"
            }
          >
            <li>
              <Link href="/sobre-mim">Sobre mim</Link>
            </li>
          </ul>
        </div>
        <ul className="h-full flex items-center justify-between gap-2">
          <li className="flex justify-center items-center h-full">
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { FloatingHeader, StaticHeader };
