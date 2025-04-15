import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Shadcnui/tooltip";
import { DotBackground } from "../Backgrounds";
import Image from "next/image";

const TagsRelated = ({
  topic,
  tools,
  tags,
}: {
  topic: Topic;
  tools?: Tool[];
  tags?: Tag[];
}) => {
  return (
    <section className="mb-10">
      <DotBackground className="relative grid grid-rows-[repeat(3,minmax(20px,1fr))] justify-center pt-20 pb-[81px]">
        <div className="absolute top-0 h-20 left-0 right-0 opacity-90 bg-blog-fade-dot-up" />
        {topic && <Topic topic={topic} />}
        {tools && tools.length > 0 && <Tools tools={tools} />}
        {tags && tags.length > 0 && <Tags tags={tags} />}
        <div className="absolute bottom-0 h-20 left-0 right-0 opacity-90 bg-blog-fade-dot-down" />
      </DotBackground>
    </section>
  );
};

const Topic = ({ topic }: { topic: Topic }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto flex items-center"
      role="region"
      data-testid="article-topic"
      aria-label={`Tópico: ${topic.name}`}
    >
      <div className="flex justify-center flex-wrap gap-6 col-start-2 max-lg:col-start-1 px-4">
        <div className="w-full flex justify-center">
          <h2
            id={`topic-title-${topic.documentId}`}
            className="text-[2.5rem] font-extrabold text-center max-[800px]:text-[2rem]"
          >
            {topic.name}
          </h2>
        </div>
      </div>
    </article>
  );
};

const Tools = ({ tools }: { tools: Tool[] }) => {
  return (
    <article
      data-testid="article-tools"
      aria-label="Ferramentas e tecnologias"
      className="max-w-screen-2xl mx-auto flex items-center"
    >
      <ul
        data-testid="article-tools-list"
        role="list"
        aria-label="Lista das ferramentas e tecnologias abordadas neste artigo"
        className="max-w-[500px] mx-auto flex flex-wrap gap-6 justify-center items-center px-4"
      >
        {tools.map((tool) => (
          <li
            key={tool.documentId}
            data-testid={tool.documentId}
            role="listitem"
            className="flex items-center gap-2"
          >
            <Image
              src={
                tool.file
                  ? process.env.NEXT_PUBLIC_BACKEND_IP + tool.file.url
                  : "https://placehold.co/32x32/171717/FFFFFF/png"
              }
              alt={
                tool.file ? tool.file.alternativeText : `Logo do ${tool.name}`
              }
              width={32}
              height={32}
              // className="rounded-full border-2 border-blog-border bg-black"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir nova aba com site oficial de ${tool.name}`}
                    className="text-blog-foreground-readable hover:text-blog-foreground-readable-hover rounded focus-within:outline focus-within:outline-2 focus-within:outline-blog-foreground-readable-hover"
                  >
                    {tool.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tool.link}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>
    </article>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <article data-testid="article-tags" aria-label="Tags" className="">
      <div className="max-w-screen-lg mx-auto">
        <ul
          role="list"
          data-testid="article-tags-list"
          aria-label="Lista de tags"
          className="flex justify-center flex-wrap gap-x-4 gap-y-2 blog-heading col-start-2 max-lg:col-start-1 px-40 max-[800px]:px-4"
        >
          {tags.map((tag, index) => (
            <li
              data-testid={tag.documentId}
              key={tag.documentId}
              role="listitem"
              aria-labelledby={`Tag-${index + 1}`}
              className="flex items-center gap-2"
            >
              <span className="text-[#808080] italic">{tag.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default TagsRelated;
