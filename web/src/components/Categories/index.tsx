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
      <Tags tags={tags} />
    </section>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto mb-12" // grid grid-cols-article max-lg:grid-cols-article-800 items-center
    >
      <div className="flex justify-center flex-wrap gap-6 col-start-2 max-lg:col-start-1 px-4">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] max-[800px]:grid-cols-1 items-center">
          <hr className="w-full border border-blog-border max-[800px]:hidden" />
          <div className="px-4">
            <h2 className="text-[2.5rem] font-extrabold text-center max-[800px]:text-[2rem]">
              {category.name}
            </h2>
          </div>
          <hr className="w-full border border-blog-border max-[800px]:hidden" />
        </div>
      </div>
    </article>
  );
};

const Subcategories = ({ subCategories }: { subCategories: SubCategory[] }) => {
  return (
    <article
      className="max-w-screen-2xl mx-auto mb-10" // grid grid-cols-article max-lg:grid-cols-article-800 items-center
    >
      <ul className="flex justify-center flex-wrap gap-6 col-start-2 max-lg:col-start-1 px-40">
        {subCategories.map((subCategory) => (
          <li
            key={subCategory.documentId}
            className="flex items-center gap-2 h-6"
          >
            <div dangerouslySetInnerHTML={{ __html: subCategory.svg }} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={subCategory.link}
                    target="_blank"
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
    <article className="mb-10">
      <div
        className="max-w-screen-lg mx-auto" // grid grid-cols-article max-lg:grid-cols-article-800 items-center
      >
        <div className="flex justify-center flex-wrap gap-6 blog-heading col-start-2 max-lg:col-start-1 px-40 max-[800px]:px-4">
          {tags.map((tag) => (
            <div key={tag.documentId} className="flex items-center gap-2 h-6">
              <span className="text-[#808080] italic">{tag.name}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Categories;
