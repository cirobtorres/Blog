"use client";

import Link from "next/link";
import { useEffect } from "react";
import { generateAnchors } from "../../functions/anchors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../shadcnui/accordion";
// import { remark } from "remark";
// import html from "remark-html";

// const sanitize = async (
//   content: { __component: string; id: number; title?: string; body?: string }[]
// ) => {
//   const onlyRichText = content
//     .filter((block) => block.__component === "shared.rich-text" && block.body)
//     .map((block) => block.body)
//     .join("\n");
//   const processedContent = await remark().use(html).process(onlyRichText);
//   const contentHtml = processedContent.toString();
//   return contentHtml;
// };

const AnchorTracker = ({
  contentId,
  content,
}: {
  contentId: string;
  content: { __component: string; id: number; title?: string; body?: string }[];
}) => {
  generateAnchors(
    content.filter((block) => block.__component === "shared.rich-text")
  );

  const linkAnchorsListener = () => {
    const sections: NodeListOf<HTMLHeadingElement> | undefined = document
      .getElementById(contentId)
      ?.querySelectorAll("h1, h2, h3, h4");

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
        const headerHeight = 80 * 3 + 136 - 1;

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
    return Object.values(text)[0].match(/<h[2][^>]*>(.*?)<\/h[2]>/gi)
      ? "pl-3"
      : Object.values(text)[0].match(/<h[3][^>]*>(.*?)<\/h[3]>/gi)
      ? "pl-6"
      : "pl-9";
  };

  useEffect(() => {
    window.addEventListener("scroll", linkAnchorsListener);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", linkAnchorsListener);
    };
  }, []);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="self-start w-full max-w-72 sticky top-3 pt-14"
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
                  `flex text-sm transition-all duration-150 aria-current:text-blog-toxic-green break-words` +
                  ` ${generatePaddingForSessions(text)}`
                }
              >
                {/* 
                Replaces <h2>Example Title</h2> to Example Title
              */}
                {Object.values(text)[0].replace(/<\/?h[2-4][^>]*>/gi, "")}
              </Link>
            </li>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AnchorTracker;
