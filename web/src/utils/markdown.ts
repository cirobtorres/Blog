import { remark } from "remark";
import html from "remark-html";

const convertMarkdowToHtmlString = async (rawHtml: string | undefined) => {
  if (!rawHtml) return "";

  const adjustedMarkdown = rawHtml
    .replace(/^######\s/gm, "###### ")
    .replace(/^#####\s/gm, "###### ")
    .replace(/^####\s/gm, "##### ")
    .replace(/^###\s/gm, "#### ")
    .replace(/^##\s/gm, "### ")
    .replace(/^#\s/gm, "## ");

  // Strapi uses wysiwyg markdown for richtext, but the underline code is sent with HTML tags, which is cleared by remark during decode process
  // markedHtml captures content between <u></u> tags and mark it with a temporary new tag
  const underlineMarkers: { placeholder: string; content: string }[] = [];
  const markedHtml = adjustedMarkdown.replace(
    /<u>(.*?)<\/u>/g,
    (match, content, index) => {
      const placeholder = `{{u-content-${index}}}`;
      underlineMarkers.push({ placeholder, content });
      return placeholder;
    }
  );

  // Processa o Markdown com remark
  const processedContent = await remark().use(html).process(markedHtml);
  let stringHtml = processedContent.toString();

  // Replace temporary tags by html <u></u> tags
  underlineMarkers.forEach(({ placeholder, content }) => {
    stringHtml = stringHtml.replace(
      new RegExp(placeholder, "g"),
      `<u>${content}</u>`
    );
  });

  // Remark doesn't work for ~~strikethrough-text~~ so it must be done manually by replacing ~~strike~~ for <strike>
  stringHtml = stringHtml.replace(
    /~~(.*?)~~/g,
    (match, content) => `<strike>${content}</strike>`
  );

  // Unwrap <a> and <img> from <p> tags
  stringHtml = stringHtml.replace(
    /<p>(\s*(<a [^>]*>.*?<\/a>|<img [^>]*>)\s*)<\/p>/g,
    "$2"
  );

  return stringHtml;
};

export default convertMarkdowToHtmlString;
