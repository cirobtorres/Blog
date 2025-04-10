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
import { clientDeleteComment, useAsyncFn } from "@/service/comments/client";
import { useToast } from "@/hooks/useToast";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { Dispatch, SetStateAction, useState } from "react";
import { useComment } from "../../../../hooks/useComment";

const CommentOptions = ({
  currentComment,
  currentUser,
  isEditing,
  setIsEditing,
  setMyChilds,
  setTemporaryChilds,
  setTotalChilds,
}: {
  currentComment: CommentProps;
  currentUser: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setMyChilds?: Dispatch<SetStateAction<CommentProps[]>>;
  setTemporaryChilds?: Dispatch<SetStateAction<CommentProps[]>>;
  setTotalChilds: Dispatch<SetStateAction<number>>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const commentContext = useComment();
  const deleteLocalComment = commentContext?.deleteLocalComment;
  const deleteCommentFn = useAsyncFn(clientDeleteComment, [], false);
  const { toast } = useToast();

  async function onCommentDelete() {
    return deleteCommentFn
      .execute({ documentId: currentComment.documentId })
      .then((documentId) => {
        if (setMyChilds) {
          // If parent_id !== null
          setMyChilds((prev: CommentProps[]) =>
            prev.filter(
              (child: CommentProps) => child.documentId !== documentId
            )
          );
          setTotalChilds((prev) => prev--); // TODO (BUG): Not working
        } else {
          // If parent_id === null
          deleteLocalComment(documentId as string);
        }
        if (setTemporaryChilds) {
          setTemporaryChilds((prev: CommentProps[]) =>
            prev.filter(
              (child: CommentProps) => child.documentId !== documentId
            )
          );
        }
      })
      .then(() => toast({ description: "Comentário excluído" }))
      .catch((error) => {
        toast({ description: "Erro ao excluir comentário" });
        console.error(error);
      });
  }

  return (
    currentComment.users_permissions_user &&
    currentUser.data?.documentId ===
      currentComment.users_permissions_user.documentId && (
      <div className="col-span-1 ml-auto mt-1.5">
        <Popover>
          <PopoverTrigger>
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
                className="p-2 justify-center cursor-pointer transition-colors duration-500 hover:bg-blog-background-backdrop-hover"
              >
                Editar
              </button>
              <button
                onClick={() => setOpenDialog(true)}
                className="p-2 justify-center cursor-pointer transition-colors duration-500 hover:bg-blog-background-backdrop-hover"
              >
                Excluir
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="p-8 pb-6 top-1/2 -translate-y-1/2 data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:slide-in-from-top-[50%]">
            <DialogHeader>
              <DialogTitle>Deseja excluir esse comentário?</DialogTitle>
              <DialogDescription className="flex items-center h-24">
                Após confirmada, essa ação não poderá ser desfeita!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className="w-24 rounded-full py-1 hover:text-blog-foreground-readable-hover hover:bg-blog-border">
                Cancelar
              </DialogClose>
              <DialogClose
                onClick={onCommentDelete}
                className="w-24 rounded-full py-1 hover:text-blog-foreground-readable-hover hover:bg-blog-border"
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
