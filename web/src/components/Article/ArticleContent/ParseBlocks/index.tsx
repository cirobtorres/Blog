import * as cheerio from "cheerio";
import Image from "next/image";
import CopyButton from "./CopyButton";
import SliderCarousel from "../../../Shadcnui/thumbCarousel";
import QuizObjects from "./QuizObject";
import { FaQuestion } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Shadcnui/accordion";
import { extractCodeData } from "@/utils/extractCodeData";
import CodeBlock from "./CodeBlock";

const ParseRichTextBlocks = ({ body }: { body: string }) => {
  const $ = cheerio.load(body);

  const allowedTags = [
    // It is not allowed heading 1 on article content
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "P",
    "A",
    "PRE",
    "UL",
    "OL",
    "BLOCKQUOTE",
    "IMG",
  ];
  const blocks: {
    id: string;
    htmlToRender: string;
    tagType?: string;
  }[] = [];
  let index = 0;

  $("body")
    .children()
    .each((_, element) => {
      // Check if element is a node of type `Element`.
      if (
        element.type === "tag" &&
        allowedTags.includes(element.tagName.toUpperCase())
      ) {
        blocks.push({
          id: `block-${index}`,
          htmlToRender: $.html(element),
          tagType: element.tagName.toUpperCase(),
        });
        index++;
      }
    });

  return blocks.map((finalBlock) => {
    // Adds arrow-up-right to any external links
    const domain = process.env.NEXT_PUBLIC_REGEX_DOMAIN || /localhost/;
    const blockHtml = cheerio.load(finalBlock.htmlToRender);
    blockHtml("a").each((_, element) => {
      const href = blockHtml(element).attr("href") || "";
      if (!href.match(domain)) {
        const text = blockHtml(element).text();
        const newAnchor =
          `<a href="${href}" target="_blank" class="external-link"><span>${text}</span>` +
          `<svg` +
          ` xmlns="http://www.w3.org/2000/svg"` +
          ` width="24"` +
          ` height="24"` +
          ` viewBox="0 0 24 24"` +
          ` fill="none"` +
          ` stroke="currentColor"` +
          ` stroke-width="2"` +
          ` stroke-linecap="round"` +
          ` stroke-linejoin="round"` +
          ` class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right inline-block align-top w-[14px] h-[14px]"` +
          `>` +
          `<path` +
          ` d="M7 7h10v10"` +
          `/>` +
          `<path d="M7 17 17 7"/></svg>` +
          `</a>`;
        blockHtml(element).replaceWith(newAnchor); // Replace old <a> tag by the new one
      }
    });

    // Updates HTML
    finalBlock.htmlToRender = blockHtml.html();

    if (finalBlock.tagType === "PRE") {
      const { filepath, htmlToRender } = extractCodeData(
        finalBlock.htmlToRender
      );

      return (
        <article key={finalBlock.id} className="w-full relative mb-4">
          <div className="flex items-center relative w-full h-12 pl-6 pr-12 border-t border-x border-blog-border rounded-t-xl bg-blog-background-2">
            {filepath && (
              <span className="text-sm text-[#808080] transition-all duration-500 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {filepath}
              </span>
            )}
            <CopyButton htmlToRender={htmlToRender} />
          </div>
          <CodeBlock htmlToRender={htmlToRender} />
        </article>
      );
    }

    if (finalBlock.tagType === "BLOCKQUOTE") {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="relative w-full blog-margin blog-text blog-blockquote border-y-4 border-blog-border p-4 before:h-1 before:w-20 before:bg-blog-foreground-highlight before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-1 after:h-1 after:w-20 after:bg-blog-foreground-highlight after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1"
        />
      );
    }

    if (finalBlock.tagType === "IMG") {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="w-full blog-center-content blog-margin"
        />
      );
    }

    if (finalBlock.tagType?.match(/H[1-3]/g)) {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="w-full blog-center-content blog-heading blog-margin blog-text border-t border-blog-border"
        />
      );
    }

    if (finalBlock.tagType?.match(/H[4-6]/g)) {
      return (
        <article
          key={finalBlock.id}
          dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
          className="w-full blog-center-content blog-heading blog-margin blog-text"
        />
      );
    }

    return (
      <article
        key={finalBlock.id}
        dangerouslySetInnerHTML={{ __html: finalBlock.htmlToRender }}
        className="w-full blog-center-content blog-heading blog-margin blog-text blog-lists"
        style={{
          marginBottom: finalBlock.tagType === "A" ? "1rem" : "",
        }}
      />
    );
  });
};

const ParseSliderBlocks = ({ block }: { block: SharedSlider }) => {
  return (
    <article key={`shared.slider-${block.id}`} className="flex mb-6">
      <SliderCarousel files={block.files} options={{ loop: true }} />
    </article>
  );
};

const ParseQuizBlocks = ({ block }: { block: SharedQuiz }) => {
  return (
    <article className="relative max-w-[700px] mx-auto mt-20">
      <FaQuestion className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 p-2 rounded-full outline outline-2 outline-offset-4 outline-blog-foreground-highlight ring-2 ring-offset-[16px] ring-offset-blog-background-1 ring-blog-foreground-highlight bg-blog-foreground-highlight text-blog-foreground-readable-hover" />
      <div className="mb-4">
        <h2
          id={`momento-quiz-${block.id}`}
          className="text-4xl font-extrabold pt-12 text-center"
        >
          Momento Quiz!
        </h2>
      </div>
      <div className="text-sm text-[#808080] mx-20 mb-4">
        <p>
          Vamos testar seus conhecimentos a respeito de tudo que foi abordado
          até agora.
        </p>
      </div>
      {Object.values(block.questions).map((quiz: Question) => (
        <QuizObjects key={quiz.uuid} quiz={quiz} />
      ))}
    </article>
  );
};

const ParseMediaBlocks = ({ block }: { block: SharedMedia }) => {
  if (block.file) {
    return (
      <article className="mb-4">
        <figure className={"flex flex-col gap-3"}>
          <Image
            src={
              block.file
                ? process.env.NEXT_PUBLIC_BACKEND_IP + block.file.url
                : "https://placehold.co/1920x1080/171717/FFFFFF/png"
            }
            alt={
              block.file
                ? block.file.alternativeText
                : `Imagem de id nº ${block.id}`
            }
            width={block.file.width}
            height={block.file.height}
          />
          <figcaption className="text-xs">{block.file.caption}</figcaption>
        </figure>
      </article>
    );
  }
};

const ParseDetails = ({
  id,
  collapsible,
  title,
  body,
}: {
  id: string;
  collapsible: boolean;
  title: string;
  body: string;
}) => {
  return (
    <article className="border border-blog-border w-full blog-center-content blog-heading blog-margin blog-text blog-lists bg-blog-background-2 mb-4">
      {collapsible ? (
        <Accordion type="single" collapsible defaultValue="">
          <AccordionItem
            value="item-1"
            className="[&_h3]:pt-0 [&_h3]:mb-0 [&_h3_button_p]:mb-0"
          >
            <AccordionTrigger className="p-4">
              {title && (
                <p className="text-2xl font-extrabold text-blog-foreground-highlight">
                  {title}
                </p>
              )}
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <ParseRichTextBlocks
                key={`shared.rich-text-details-${id}`}
                body={body}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div>
          {title && (
            <p className="text-2xl font-extrabold text-blog-foreground-highlight">
              {title}
            </p>
          )}
          <ParseRichTextBlocks
            key={`shared.rich-text-details-${id}`}
            body={body}
          />
        </div>
      )}
    </article>
  );
};

export {
  ParseRichTextBlocks,
  ParseSliderBlocks,
  ParseQuizBlocks,
  ParseMediaBlocks,
  ParseDetails,
};
