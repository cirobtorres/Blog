"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const SafeHTML = ({ html }: { html: string }) => {
  const [sanitizedHTML, setSanitizedHTML] = useState("");

  useEffect(() => {
    if (DOMPurify) {
      setSanitizedHTML(DOMPurify.sanitize(html));
    }
  }, [html]);

  return (
    <div
      className="text-sm"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default SafeHTML;
