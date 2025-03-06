import { Skeleton } from "../../Shadcnui/skeleton";

const CommentLoading = ({ rows }: { rows?: number }) => {
  return (
    <div className="mb-12">
      {Array.from({ length: rows || 3 }, (v) => v).map((v, index) => (
        <div
          key={index}
          id="comment-session"
          className="flex gap-2 max-w-5xl mx-auto mb-8 px-4"
        >
          <Skeleton className="shrink-0 size-12 rounded-full" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-48 h-6" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-[85%] h-3" />
              <Skeleton className="w-[85%] h-3" />
              <Skeleton className="w-[65%] h-3" />
              <Skeleton className="w-[75%] h-3" />
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

export default CommentLoading;
