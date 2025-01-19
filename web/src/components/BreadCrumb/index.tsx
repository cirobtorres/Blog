import { Slash } from "lucide-react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../Shadcnui/breadcrumb";

const BreadCrumb = ({
  title,
  category,
}: {
  title: string;
  category: Category;
}) => {
  return (
    <BreadcrumbRoot className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/artigos">Artigos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbPage>
          <BreadcrumbLink href={`/artigos?category=${category.name}`}>
            {category.name}
          </BreadcrumbLink>
        </BreadcrumbPage>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="relative text-blog-foreground-highlight after:absolute after:top-[calc(100%_+_4px)] after:left-0 after:w-full after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-transparent after:to-blog-foreground-highlight">
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export default BreadCrumb;
