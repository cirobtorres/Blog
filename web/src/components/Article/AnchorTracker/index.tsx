"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Shadcnui/accordion";
import { extractAnchors } from "../../../utils/anchors";

const AnchorTracker = ({ documentId }: { documentId: string }) => {
  const [anchorList, setAnchorList] = useState<{ [key: string]: string }[]>([]);
  const anchorListRef = useRef<HTMLDivElement>(null);

  const generatePaddingForSessions = (text: { [x: string]: string }) => {
    return Object.values(text)[0].match(/<h[1][^>]*>(.*?)<\/h[1]>/gi)
      ? "pl-0"
      : Object.values(text)[0].match(/<h[2][^>]*>(.*?)<\/h[2]>/gi)
      ? "pl-3"
      : Object.values(text)[0].match(/<h[3][^>]*>(.*?)<\/h[3]>/gi)
      ? "pl-6"
      : Object.values(text)[0].match(/<h[4][^>]*>(.*?)<\/h[4]>/gi)
      ? "pl-9"
      : Object.values(text)[0].match(/<h[5][^>]*>(.*?)<\/h[5]>/gi)
      ? "pl-12"
      : "pl-[3.75rem]";
  };

  useEffect(() => {
    const linkAnchorsListener = () => {
      // Select article content
      const contentElement = document.getElementById(documentId);
      if (!contentElement) return;

      // Retrieve all sections
      const allSections: NodeListOf<HTMLHeadingElement> =
        contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6");

      // Get rid of sections with children, like shadcn/ui accordion buttons nested within h3 tags. These are not supposed to be anchors
      const sections = Array.from(allSections).filter(
        (section) => !section.querySelector("*")
      );

      let currentSectionIndex = 0;

      if (sections && sections.length > 0) {
        sections.forEach((section, index) => {
          const sectionRect = section.getBoundingClientRect();
          const sectionTop = sectionRect.top + window.scrollY;
          if (window.scrollY >= sectionTop - 1) {
            currentSectionIndex = index;
          }
        });
        const links = anchorListRef.current?.querySelectorAll("li a");

        links?.forEach((link, index) => {
          console.log(index, currentSectionIndex);
          if (index === currentSectionIndex) {
            link.setAttribute("aria-current", "page");
          } else {
            link.setAttribute("aria-current", "false");
          }
        });
      }
    };

    window.addEventListener("scroll", linkAnchorsListener);
    return () => {
      window.removeEventListener("scroll", linkAnchorsListener);
    };
  }, [documentId]);

  useEffect(() => {
    const contentElement = document.getElementById(documentId);
    if (contentElement) {
      const anchors = extractAnchors(contentElement.innerHTML);
      setAnchorList(anchors);
    }
  }, [documentId]);

  return (
    anchorList &&
    anchorList.length > 0 && (
      <nav>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className={
            "w-full" +
            " self-start max-w-72 sticky top-12 mb-4 col-start-1 max-[800px]:col-start-auto" +
            " max-[800px]:self-auto max-[800px]:max-w-full max-[800px]:static max-[800px]:pt-0"
          }
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Conteúdo</AccordionTrigger>
            <AccordionContent
              ref={anchorListRef}
              className="relative max-h-[50vh] pb-0 pt-0 before:absolute before:top-0 before:bottom-0 before:w-0.5 before:bg-blog-border"
            >
              {anchorList.map((text, index) => (
                <li key={index} className="mb-1">
                  <Link
                    href={`#${Object.keys(text)}`}
                    aria-label={`Ir para ${Object.values(text)[0]}`}
                    aria-current={index === 0 ? "page" : "false"} // When pages load, the first anchor is supposed to be the colored one
                    className={
                      `flex text-sm transition-colors duration-500 break-words aria-current:text-blog-foreground-highlight` +
                      ` aria-current:hover:text-blog-foreground-readable-hover hover:text-blog-foreground-readable-hover ${generatePaddingForSessions(
                        text
                      )} after:w-0.5 after:h-6 after:bg-transparent after:transition-all after:duration-500 after:absolute after:left-0 aria-current:after:bg-blog-foreground-highlight`
                    }
                  >
                    {
                      Object.values(text)[0].replace(/<\/?h[1-6][^>]*>/gi, "")
                      // Replaces <h2>Example Title</h2> to Example Title
                    }
                  </Link>
                </li>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    )
  );
};

export default AnchorTracker;
