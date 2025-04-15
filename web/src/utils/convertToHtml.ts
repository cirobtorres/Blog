import { addIdsToHeadings } from "./anchors";
import convertMarkdowToHtmlString from "./markdown";

const convertToHTML = async (blocks: string) => {
  const contentHtml = await convertMarkdowToHtmlString(blocks);
  const htmlToRender = addIdsToHeadings(contentHtml);
  return htmlToRender;
};

export { convertToHTML };
