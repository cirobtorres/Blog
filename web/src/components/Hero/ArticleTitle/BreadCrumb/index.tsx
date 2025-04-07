import { Slash } from "lucide-react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../Shadcnui/breadcrumb";
import slugify from "@/utils/slugify";

const BreadCrumb = ({ title, topic }: { title: string; topic: Topic }) => {
  return (
    <BreadcrumbRoot id="breadcrumb" data-testid="breadcrumb" className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            id="breadcrumb-home"
            data-testid="breadcrumb-home"
            href="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            id="breadcrumb-article"
            data-testid="breadcrumb-article"
            href="/artigos"
          >
            Artigos
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbPage>
          <BreadcrumbLink
            id="breadcrumb-article-topic"
            data-testid="breadcrumb-article-topic"
            href={`/artigos?topic=${slugify(topic.name)}`}
          >
            {topic.name}
          </BreadcrumbLink>
        </BreadcrumbPage>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage
            id="breadcrumb-article-title"
            data-testid="breadcrumb-article-title"
            className="relative text-blog-foreground-highlight after:absolute after:top-[calc(100%_+_4px)] after:left-0 after:w-full after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-transparent after:to-blog-foreground-highlight"
          >
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export default BreadCrumb;
