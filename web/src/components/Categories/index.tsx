import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Shadcnui/tooltip";
import { DotBackground } from "../Backgrounds";
import Image from "next/image";

const Categories = ({
  category,
  technologies,
  tags,
}: {
  category: Category;
  technologies?: Technology[];
  tags?: Tag[];
}) => {
  return (
    <section className="mb-10">
      <DotBackground className="relative grid grid-rows-[80px] justify-center pt-20 pb-[81px]">
        <div className="absolute top-0 h-20 left-0 right-0 opacity-90 bg-blog-fade-dot-up" />
        {category && <Category category={category} />}
        {technologies && technologies.length > 0 && (
          <Technologies technologies={technologies} />
        )}
        {tags && tags.length > 0 && <Tags tags={tags} />}
        <div className="absolute bottom-0 h-20 left-0 right-0 opacity-90 bg-blog-fade-dot-down" />
      </DotBackground>
    </section>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto flex items-center"
      role="region"
      data-testid="article-category"
      aria-label={`Categoria: ${category.name}`}
    >
      <div className="flex justify-center flex-wrap gap-6 col-start-2 max-lg:col-start-1 px-4">
        <div className="w-full flex justify-center">
          <h2
            id={`category-title-${category.documentId}`}
            className="text-[2.5rem] font-extrabold text-center max-[800px]:text-[2rem]"
          >
            {category.name}
          </h2>
        </div>
      </div>
    </article>
  );
};

const Technologies = ({ technologies }: { technologies: Technology[] }) => {
  return (
    <article
      data-testid="article-technologies"
      aria-label="Tecnologias"
      className="max-w-screen-2xl mx-auto flex items-center"
    >
      <ul
        data-testid="article-technologies-list"
        role="list"
        aria-label="Lista das tecnologias abordadas neste artigo"
        className="max-w-[500px] mx-auto flex flex-wrap gap-6 justify-center items-center px-4"
      >
        {technologies.map((tech) => (
          <li
            key={tech.documentId}
            data-testid={tech.documentId}
            role="listitem"
            className="h-20 flex items-center gap-2"
          >
            <Image
              src={`http://127.0.0.1:1337` + tech.file.url}
              alt={tech.file.alternativeText}
              width={30}
              height={30}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir nova aba com site oficial de ${tech.name}`}
                    className="text-blog-foreground-readable hover:text-blog-foreground-readable-hover rounded focus-within:outline focus-within:outline-2 focus-within:outline-blog-foreground-readable-hover"
                  >
                    {tech.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tech.link}</p>
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
          className="flex justify-center flex-wrap gap-6 blog-heading col-start-2 max-lg:col-start-1 px-40 max-[800px]:px-4"
        >
          {tags.map((tag, index) => (
            <li
              data-testid={tag.documentId}
              key={tag.documentId}
              role="listitem"
              aria-labelledby={`Tag-${index + 1}`}
              className="h-20 flex items-center gap-2"
            >
              <span className="text-[#808080] italic">{tag.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Categories;
