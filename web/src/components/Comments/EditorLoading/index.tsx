import { Skeleton } from "@/components/Shadcnui/skeleton";

const EditorLoading = () => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-2">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
      <Skeleton className="w-full h-16 rounded-2xl" />
      <div className="flex items-center gap-1">
        <Skeleton className="w-full h-6 rounded-2xl" />
        <Skeleton className="max-w-28 w-full h-6 rounded-2xl" />
      </div>
    </div>
  );
};

export default EditorLoading;
