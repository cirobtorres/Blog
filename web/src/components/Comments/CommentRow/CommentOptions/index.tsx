import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Shadcnui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Shadcnui/popover";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { Dispatch, SetStateAction, useState } from "react";

const CommentOptions = ({
  currentComment,
  currentUser,
  isEditing,
  setIsEditing,
  onDelete,
}: {
  currentComment: CommentProps;
  currentUser: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setChilds?: Dispatch<SetStateAction<CommentProps[]>>;
  onDelete: (documentId: string) => Promise<void>;
}) => {
  const [released, setReleased] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    currentComment.users_permissions_user &&
    currentUser.data?.documentId ===
      currentComment.users_permissions_user.documentId && (
      <div className="col-span-1 mx-auto">
        <Popover>
          <PopoverTrigger
            onPointerDown={() => setReleased(false)}
            onPointerUp={() => setReleased(true)}
            onPointerLeave={() => setReleased(true)}
            className={`p-2 rounded-full border ${
              released
                ? "transition-[border-color] duration-700 ease-in border-transparent"
                : "border-blog-border bg-blog-border"
            }`}
          >
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
              className="lucide lucide-ellipsis-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </PopoverTrigger>
          <PopoverContent
            className={
              `w-28 p-0 overflow-hidden` +
              ` backdrop-blur-sm bg-blog-background-backdrop`
            }
          >
            <div className="flex flex-col">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 justify-center cursor-pointer transition-colors duration-300 hover:text-blog-foreground-readable-hover hover:bg-blog-background-backdrop-hover"
              >
                Editar
              </button>
              <button
                onClick={() => setOpenDialog(true)}
                className="p-2 justify-center cursor-pointer transition-colors duration-300 hover:text-blog-foreground-readable-hover hover:bg-blog-background-backdrop-hover"
              >
                Excluir
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-blog-background-2 p-8 pb-6 top-1/2 -translate-y-1/2 data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:slide-in-from-top-[50%]">
            <DialogHeader className="flex flex-col gap-10">
              <div className="grid grid-cols-[1fr_calc(20px_+_8px_*_2)] relative">
                <DialogTitle className="line-clamp-2">
                  Deseja excluir esse comentário?
                </DialogTitle>
                <DialogClose
                  className={
                    `absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded` +
                    ` border border-blog-border` +
                    ` transition-colors duration-200` +
                    ` text-blog-foreground-highlight bg-blog-background-1` +
                    ` hover:text-blog-foreground-readable-hover hover:bg-blog-border`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </DialogClose>
              </div>
              <DialogDescription className="flex items-center box-border text-sm max-h-[calc(20px_*_4)] line-clamp-4">
                Após confirmada, essa ação não poderá ser desfeita!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-10">
              <DialogClose
                className={
                  `w-24 py-2 rounded` + // Layout
                  ` border border-blog-border` + // Border
                  ` transition-colors duration-200` + // Transition
                  ` text-blog-foreground-highlight hover:text-blog-foreground-readable-hover` + // Text
                  ` bg-blog-background-1 hover:bg-blog-border` // Background
                }
              >
                Cancelar
              </DialogClose>
              <DialogClose
                onClick={() => onDelete(currentComment.documentId)}
                className={
                  `w-24 py-2 rounded` + // Layout
                  ` transition-colors duration-200` + // Transition
                  ` hover:text-blog-foreground-readable-hover` + // Text
                  ` hover:bg-blog-border` // Background
                }
              >
                Excluir
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ToasterProvider />
      </div>
    )
  );
};

export default CommentOptions;
