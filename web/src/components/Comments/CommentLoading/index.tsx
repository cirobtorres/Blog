import { Skeleton } from "@/components/Shadcnui/skeleton";

const CommentEditorSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-2">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 w-28 rounded-full" />
      </div>
      <Skeleton className="w-full h-16 rounded-2xl" />
      <div className="flex items-center justify-between gap-1">
        <Skeleton className="w-72 h-4 rounded-2xl" />
        <div className="flex justify-end gap-1 shrink-0 flex-1">
          <Skeleton className="max-w-28 w-full h-4 rounded-2xl" />
          <Skeleton className="max-w-28 w-full h-4 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

const CommentLoadingSkeleton = ({ rows }: { rows?: number }) => {
  return (
    <div className="mb-12">
      <div className="max-w-5xl mx-auto mb-8 px-40">
        <CommentEditorSkeleton />
      </div>
      {Array.from({ length: rows || 1 }, (v) => v).map((v, index) => (
        <div
          key={index}
          id="comment-session"
          className="flex gap-2 max-w-5xl mx-auto mb-8 px-40"
        >
          <Skeleton className="shrink-0 size-12 rounded-full" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-32 h-4" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-full h-14" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-5" />
              <Skeleton className="size-5" />
              <Skeleton className="w-[25%] h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// TODO: https://www.radix-ui.com/themes/docs/components/spinner
const CommentLoadingSpinning = () => {
  return (
    <div className="w-fit mx-auto animate-spin">
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
        className="lucide lucide-loader"
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    </div>
  );
};

export {
  CommentEditorSkeleton,
  CommentLoadingSkeleton,
  CommentLoadingSpinning,
};
