"use server";

import hljs from "highlight.js";

function decodeHtmlEntities(str: string) {
  // Highlight.js escapes some HTML tag characters and replace it with its unicode format.
  // This code format it back
  return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  // return decodeURIComponent(str);
}

function highlightPreBlocks(htmlContent: string) {
  // Captures <pre><code class="language-<linguagem>"> and its content and apply it code highlight
  const preCodeRegex =
    /<pre>\s*<code\s+class="language-([\w-]+)">([\s\S]*?)<\/code>\s*<\/pre>/gi;

  const processedHtml = htmlContent.replace(
    preCodeRegex,
    (match, language, codeContent) => {
      try {
        const highlightedCode = hljs.highlight(codeContent.trim(), {
          language,
        }).value;

        const decodedCode = decodeHtmlEntities(highlightedCode);

        const lines = decodedCode.split("\n");

        const numberedLines = lines
          .map((_, index) => {
            return `<div class="line">${index + 1}</div>`;
          })
          .join("");

        const lineWrapper = `<div class="line-wrapper">${numberedLines}</div>`;

        const content = `<code class="language-${language}">${decodedCode}</code>`;

        return `<pre><div class="code-content">${lineWrapper}${content}</div></pre>`;
      } catch (error) {
        // Returns original non formated codeblock in case there is an error
        console.error(
          `Error while trying to highlight codeblock with Highlight.js: ${error}`
        );
        return match;
      }
    }
  );

  return processedHtml;
}

export default highlightPreBlocks;
