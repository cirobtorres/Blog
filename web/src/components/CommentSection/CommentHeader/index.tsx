import { Suspense } from "react";
import CountComments from "../CountComments";
import { Skeleton } from "../../Shadcnui/skeleton";

const CommentHeader = ({
  articleDocumentId,
}: {
  articleDocumentId: string;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-12">
      <Suspense fallback={<Skeleton className="h-6 w-32" />}>
        <h2 className="text-2xl font-extrabold">
          <CountComments articleId={articleDocumentId} />
        </h2>
      </Suspense>
      <button className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-down-wide-narrow"
        >
          <path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <path d="M11 4h10" />
          <path d="M11 8h7" />
          <path d="M11 12h4" />
        </svg>
        Ordenar por:
      </button>
      <span>mais recente</span>
    </div>
  );
};

export default CommentHeader;
