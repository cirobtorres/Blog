import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Shadcnui/tooltip";

const Categories = ({
  category,
  subCategories,
  tags,
}: {
  category: Category;
  subCategories: SubCategory[];
  tags: Tag[];
}) => {
  return (
    <section className="mb-10">
      <Category category={category} />
      {subCategories.length > 0 && (
        <Subcategories subCategories={subCategories} />
      )}
      {tags.length > 0 && <Tags tags={tags} />}
    </section>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto mb-12"
      role="region"
      aria-labelledby="category-title"
    >
      <div className="flex justify-center flex-wrap gap-6 col-start-2 max-lg:col-start-1 px-4">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] max-[800px]:grid-cols-1 items-center">
          <hr className="w-full h-[1px] bg-blog-border max-[800px]:hidden" />
          <div className="px-4">
            <h2 className="text-[2.5rem] font-extrabold text-center max-[800px]:text-[2rem]">
              {category.name}
            </h2>
          </div>
          <hr className="w-full h-[1px] bg-blog-border max-[800px]:hidden" />
        </div>
      </div>
    </article>
  );
};

const Subcategories = ({ subCategories }: { subCategories: SubCategory[] }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto mb-10"
      aria-labelledby="subcategories-title"
    >
      <ul
        role="list"
        aria-label="Lista de tecnologias empregadas no artigo"
        className="max-w-[500px] mx-auto flex flex-wrap gap-6 justify-center items-center px-4"
      >
        {subCategories.map((subCategory) => (
          <li
            key={subCategory.documentId}
            className="flex items-center gap-2 h-6"
          >
            <div
              aria-hidden="true" // Accessibility: decorative element
              dangerouslySetInnerHTML={{ __html: subCategory.svg }}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={subCategory.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir nova aba com site oficial de ${subCategory.name}`}
                    className="transition-all duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
                  >
                    {subCategory.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{subCategory.link}</p>
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
    <article data-testid="article-tags" className="mb-10">
      <div className="max-w-screen-lg mx-auto">
        <ul
          role="list"
          data-testid="article-tags-list"
          aria-labelledby="tags-list"
          aria-label="Lista de tags"
          className="flex justify-center flex-wrap gap-6 blog-heading col-start-2 max-lg:col-start-1 px-40 max-[800px]:px-4"
        >
          {tags.map((tag) => (
            <li
              data-testid={tag.documentId}
              key={tag.documentId}
              role="listitem"
              className="flex items-center gap-2 h-6"
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
