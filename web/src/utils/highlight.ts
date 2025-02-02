import he from "he";
import { transformerNotationHighlight } from "@shikijs/transformers";
import { type Highlighter } from "shiki";

function decodeHtmlEntities(str: string) {
  return he.decode(str);
}

const highlightPreBlocks = (htmlContent: string, highlighter: Highlighter) => {
  const preCodeRegex =
    /<pre>\s*<code\s+class="language-([\w-]+)">([\s\S]*?)<\/code>\s*<\/pre>/gi;

  const matches = [...htmlContent.matchAll(preCodeRegex)];

  let processedHtml = htmlContent;

  for (const match of matches) {
    const [fullMatch, language, codeContent] = match;
    try {
      const decodedHtml = decodeHtmlEntities(codeContent.trim());

      const highlightedCode = highlighter.codeToHtml(decodedHtml, {
        theme: "blog-theme",
        lang: language || "plaintext",
        transformers: [
          transformerNotationHighlight({
            matchAlgorithm: "v3",
            /*
            https://shiki.style/packages/transformers
  
            // [!code highlight]
            // [!code highlight:<numbers_of_lines>]
  
            Python code:
              # [!code highlight]
              # [!code highlight:<numbers_of_lines>]
              
            outputs: 
              <span class="line highlighted">
            */
          }),
        ],
      });

      processedHtml = processedHtml.replace(fullMatch, highlightedCode);
    } catch (error) {
      console.error(`Erro ao destacar código com Shiki: ${error}`);
    }
  }

  return processedHtml;
};

export default highlightPreBlocks;
