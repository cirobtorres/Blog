"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import { MdKeyboardArrowDown } from "react-icons/md";
import collectAnchorsContents from "../../functions/anchors";
import { MdKeyboardArrowDown } from "react-icons/md";

const PublicationContentAnchorTracker = ({
  bodyId,
  content,
}: {
  bodyId: string;
  content: string;
}) => {
  const [hide, setHide] = useState(true);
  const anchorList = collectAnchorsContents(content);

  const linkAnchorsListener = () => {
    const sections: NodeListOf<HTMLHeadingElement> | undefined = document
      .getElementById(bodyId)
      ?.querySelectorAll("h2, h3, h4");

    let currentSectionIndex = 0;

    if (sections) {
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const headerHeight = -376;
        if (window.scrollY >= sectionTop - headerHeight) {
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

  useEffect(() => {
    window.addEventListener("scroll", linkAnchorsListener);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", linkAnchorsListener);
    };
  }, []);

  return (
    <nav className="self-start w-full max-w-72 sticky top-0 mt-3">
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
              href={`#${text.split("+")[0]}`}
              aria-current={
                text.split("+")[0].split("anchor-")[1] === "1.0.0"
                  ? "page"
                  : "false"
              }
              className={`text-sm transition-all duration-300 aria-current:text-blog-toxic-green aria-current:font-extrabold ${
                text.split("+")[1].match(/<h[2][^>]*>(.*?)<\/h[2]>/gi)
                  ? "pl-3"
                  : text.split("+")[1].match(/<h[3][^>]*>(.*?)<\/h[3]>/gi)
                  ? "pl-6"
                  : "pl-9"
              }`}
            >
              {text
                .split("+")[1]
                .replace(/<\/?h[2-4][^>]*>/gi, "")
                .trim()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PublicationContentAnchorTracker;
