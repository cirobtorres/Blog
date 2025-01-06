"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { generateAnchors } from "../../functions/anchors";

const PublicationContentAnchorTracker = ({
  bodyId,
  content,
}: {
  bodyId: string;
  content: string;
}) => {
  const [hide, setHide] = useState(true);
  const anchorList = generateAnchors(content);

  const linkAnchorsListener = () => {
    const sections: NodeListOf<HTMLHeadingElement> | undefined = document
      .getElementById(bodyId)
      ?.querySelectorAll("h2, h3, h4");

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
    <nav className="self-start w-full max-w-72 sticky top-3 mt-3">
      <button
        onClick={() => setHide(!hide)}
        className="flex items-center font-extrabold uppercase text-base pr-1"
      >
        Conteúdo
        <MdKeyboardArrowDown
          className="text-3xl transition-transform"
          style={{ transform: hide ? "" : "rotate(-180deg)" }}
        />
      </button>
      <ul
        id="link-anchor-tracker"
        className={`transition-colors duration-300 overflow-auto scrollbar ${
          hide ? "h-auto" : "h-0"
        }`}
      >
        {anchorList?.map((text, index) => (
          <li key={index} className="mb-1">
            <Link
              href={`#${Object.keys(text)}`}
              aria-current={index === 0 ? "page" : "false"} // When pages load, the first anchor is supposed to be the colored one
              className={
                `text-sm transition-all duration-150 aria-current:text-blog-toxic-green aria-current:font-extrabold` +
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
      </ul>
    </nav>
  );
};

export default PublicationContentAnchorTracker;
