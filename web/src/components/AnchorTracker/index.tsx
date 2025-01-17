"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../shadcnui/accordion";
import { extractAnchors } from "../../utils/anchors";

const AnchorTracker = ({ documentId }: { documentId: string }) => {
  const [anchorList, setAnchorList] = useState<{ [key: string]: string }[]>([]);

  const linkAnchorsListener = () => {
    const sections: NodeListOf<HTMLHeadingElement> | undefined = document
      .getElementById(documentId)
      ?.querySelectorAll("h1, h2, h3, h4, h5, h6");

    let currentSectionIndex = 0;

    if (sections) {
      sections.forEach((section, index) => {
        // Collects offsetTop of each header, if exists
        const sectionTop = section.offsetTop;

        // headerHeight = measurement from blog-content to the top of the page
        // 80 pixels top padding
        // 80 pixels bottom padding
        // 80 pixels bottom margin
        // 136 pixels blog-content-hero

        // Minus 1 because we want the anchor color to update even when we click on it
        // An anchor-link redirects to the exact section top
        // With offsetTop lower by 1 pixel we make sure the section is actually lower than it really is
        // With that the link redirects to within the actual section, not to the top of it
        const headerHeight = 48 + 400 + 480 + 80 - 1;

        // Update currentSectionIndex when changing sections
        // Every index is a heading of any type
        if (window.scrollY >= sectionTop + headerHeight) {
          currentSectionIndex = index;
        }
      });

      const links = document
        .getElementById("link-anchor-tracker")
        ?.querySelectorAll("li a");

      links?.forEach((link, index) => {
        if (index === currentSectionIndex) {
          link.setAttribute("aria-current", "page");
        } else {
          link.setAttribute("aria-current", "false");
        }
      });
    }
  };

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
      : "pl-15";
  };

  useEffect(() => {
    window.addEventListener("scroll", linkAnchorsListener);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", linkAnchorsListener);
    };
  }, []);

  useEffect(() => {
    const contentElement = document.getElementById(documentId);
    if (contentElement) {
      const anchors = extractAnchors(contentElement.innerHTML);
      setAnchorList(anchors);
    }
  }, [documentId]);

  return (
    <nav>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className={
          "w-full" +
          " self-start max-w-72 sticky top-12" +
          " max-[800px]:self-auto max-[800px]:max-w-full max-[800px]:static max-[800px]:pt-0"
        }
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Conteúdo</AccordionTrigger>
          <AccordionContent>
            {anchorList?.map((text, index) => (
              <li key={index} className="mb-1">
                <Link
                  href={`#${Object.keys(text)}`}
                  aria-current={index === 0 ? "page" : "false"} // When pages load, the first anchor is supposed to be the colored one
                  className={
                    `flex text-sm transition-colors duration-500 break-words aria-current:text-blog-foreground-highlight` +
                    ` aria-current:hover:text-blog-foreground-readable-hover hover:text-blog-foreground-readable-hover ${generatePaddingForSessions(
                      text
                    )}`
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
  );
};

export default AnchorTracker;
