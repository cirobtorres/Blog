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
  subCategories?: SubCategory[];
  tags?: Tag[];
}) => {
  return (
    <section className="mb-10">
      <Category category={category} />
      {subCategories && subCategories.length > 0 && (
        <Subcategories subCategories={subCategories} />
      )}
      {tags && tags.length > 0 && <Tags tags={tags} />}
    </section>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto mb-12"
      role="region"
      data-testid="article-category"
      aria-label={`Categoria: ${category.name}`}
    >
      <div className="flex justify-center flex-wrap gap-6 col-start-2 max-lg:col-start-1 px-4">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] max-[800px]:grid-cols-1 items-center">
          <hr className="w-full h-[1px] bg-blog-border max-[800px]:hidden" />
          <div className="px-4">
            <h2
              id={`category-title-${category.documentId}`}
              className="text-[2.5rem] font-extrabold text-center max-[800px]:text-[2rem]"
            >
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
      data-testid="article-subcategories"
      aria-label="Tecnologias"
      className="max-w-screen-2xl mx-auto mb-10"
    >
      <ul
        data-testid="article-subcategories-list"
        role="list"
        aria-label="Lista das tecnologias abordadas neste artigo"
        className="max-w-[500px] mx-auto flex flex-wrap gap-6 justify-center items-center px-4"
      >
        {subCategories.map((subCategory) => (
          <li
            key={subCategory.documentId}
            data-testid={subCategory.documentId}
            role="listitem"
            className="flex items-center gap-2 h-6"
          >
            <div
              aria-hidden="true" // Decorative element
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
                    className="text-blog-foreground-readable hover:text-blog-foreground-readable-hover rounded focus-within:outline focus-within:outline-2 focus-within:outline-blog-foreground-readable-hover"
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
    <article data-testid="article-tags" aria-label="Tags" className="mb-10">
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
