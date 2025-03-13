import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../Shadcnui/pagination";

const ArticlesPages = ({
  page,
  articlesCount,
}: {
  page: number;
  articlesCount: number;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {page > 2 && (
          <PaginationItem>
            <PaginationLink href="?page=1" className="max-[800px]:text-xs">
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page - 1 > 0 && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${page - 1}`}
              className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href={`?page=${page}`}
            isActive
            className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {page + 1 < articlesCount && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${page + 1}`}
              className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page + 2 < articlesCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < articlesCount && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${articlesCount}`}
              className="size-9 max-[800px]:size-8 max-[800px]:text-xs"
            >
              {articlesCount}
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlesPages;
