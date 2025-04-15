import { convertToHTML } from "@/utils/convertToHtml";
import { ParseRichTextBlocks } from "../Article/ArticleContent/ParseBlocks";

export default async function AboutContent({ about }: { about: About }) {
  return about.blocks.map(async (block) => {
    const richTextToRenderA = await convertToHTML(block.body);
    return (
      <ParseRichTextBlocks
        key={`shared.rich-text-${block.id}`}
        body={richTextToRenderA}
      />
    );
  });
}
