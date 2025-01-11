import { remark } from "remark";
import html from "remark-html";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const convertMarkdowToHtmlString = async (rawHtml: string | undefined) => {
  const processedContent = await remark().use(html).process(rawHtml);
  const stringHtml = processedContent.toString();
  return stringHtml;
};

export { cn, convertMarkdowToHtmlString };
