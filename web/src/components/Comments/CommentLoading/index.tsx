import { Skeleton } from "../../Shadcnui/skeleton";
import EditorLoading from "../EditorLoading";

const CommentLoading = ({ rows }: { rows?: number }) => {
  return (
    <div className="mb-12">
      <div className="max-w-5xl mx-auto mb-8 px-40">
        <EditorLoading />
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

export default CommentLoading;
