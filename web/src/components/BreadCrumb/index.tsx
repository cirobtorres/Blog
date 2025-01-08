import { Slash } from "lucide-react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../shadcnui/breadcrumb";

const BreadCrumb = ({ slug }: { slug: string }) => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Artigos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">{slug}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export default BreadCrumb;
