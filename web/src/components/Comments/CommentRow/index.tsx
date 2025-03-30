import { useParams } from "next/navigation";
import { useState } from "react";
import {
  clientCountComments,
  clientGetComments,
  clientSaveComment,
  clientUpdateComment,
  useAsync,
  useAsyncFn,
} from "../../../service/comments/client";
import { useComment } from "../../../hooks/useComment";
import { toast } from "../../../hooks/useToast";
import Image from "next/image";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";
import CommentOptions from "./CommentOptions";
import Avatar from "../Avatar";
import Editor from "../Editor";
import LoadMoreButton from "../LoadMoreButton";
import { CommentLoadingSpinning } from "../CommentLoading";

const CommentRow = ({
  comment,
  currentUser,
}: {
  comment: CommentProps;
  currentUser: User;
}) => {
  // Params----------
  const params: { documentId: string; slug: string } = useParams();
  const { documentId }: { documentId: string } = params;

  // Page----------
  const [page, setPage] = useState(0);
  const pageSize = 5;

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  // Interacting----------
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleChildComments() {
    setAreChildrenHidden(!areChildrenHidden);
    if (page < 1) {
      loadMore();
    }
  }

  // Childs----------
  const [childs, setChilds] = useState<CommentProps[]>([]);
  const [totalChilds, setTotalChilds] = useState<number>(0);

  const { loading } = useAsync(async () => {
    if (page === 0) return;
    const [moreChilds, total] = await Promise.all([
      clientGetComments(
        documentId as string,
        { page, pageSize },
        comment.documentId,
        "createdAt:asc"
      ),
      clientCountComments(documentId as string, {
        documentId: { eq: comment.documentId },
      }),
    ]);
    setChilds((prevChilds) => {
      const newChilds = moreChilds.filter(
        (newChild) =>
          !prevChilds.some(
            (prevChild) => prevChild.documentId === newChild.documentId
          )
      );
      return [...prevChilds, ...newChilds];
    });

    setTotalChilds(total);
  }, [page]);

  const childPageLength = totalChilds > childs.length;

  // Accessing Context----------
  const commentContext = useComment();

  // Create----------
  const createReplyFn = useAsyncFn(clientSaveComment, [], false);
  const updateCommentFn = useAsyncFn(clientUpdateComment, [], false);
  const updateLocalComment = commentContext?.updateLocalComment;
  const updateLocalReply = commentContext?.updateLocalReply;

  async function onReplyCreate(body: string) {
    return createReplyFn
      .execute({
        documentId, // Article's document id
        body,
        userId: currentUser.data?.documentId,
        parentId: comment.documentId, // This comment's document id
      })
      .then((comment) => {
        setIsReplying(false);
        updateLocalReply(comment as CommentProps);
        toast({ description: "Comentário criado!" });
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Erro ao criar comentário" });
      });
  }

  async function onCommentUpdate(body: string): Promise<void> {
    return updateCommentFn
      .execute({ documentId: comment.documentId, body }) // TODO(BUG): está atualizando apenas os comments(parent_id=null)
      .then((updatedComment) => {
        return updatedComment as CommentProps;
      })
      .then((updatedComment) => {
        const itIsAChild = updatedComment.parent_id === null;
        if (itIsAChild) {
          updateLocalComment(updatedComment);
        } else {
          setChilds((prev) => {
            return prev.map((child) => {
              return child.documentId === updatedComment.documentId
                ? { ...child, body: updatedComment.body }
                : child;
            });
          });
        }
        setIsEditing(false);
        toast({ description: "Comentário editado!" });
      })
      .catch((error) => {
        toast({ description: "Erro ao editar comentário" });
        console.error(error);
      });
  }

  // function onReplyDelete() {}

  return (
    <div
      key={comment.documentId}
      id={comment.documentId}
      className="flex flex-col"
    >
      <div className="py-4 grid grid-cols-[48px_repeat(10,_1fr)_48px]">
        <div className="col-span-1">
          <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={
                "/images/not-authenticated.png"
                // author.avatar
                //   ? `http://127.0.0.1:1337${author.avatar.url}`
                // : "/images/not-authenticated.png"
              }
              alt={
                ""
                // author.avatar
                // ? author.avatar.alternativeText
                // : `Avatar de ${author.name}`
              }
              fill
              sizes="(max-width: 40px) 100vw"
              className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
            />
          </div>
        </div>
        <div className="col-span-10 flex flex-col gap-2 mt-2">
          <CommentHeader comment={comment} currentUser={currentUser} />
          <CommentBody
            comment={comment}
            isEditing={isEditing}
            currentUser={currentUser}
            setIsEditing={setIsEditing}
            onUpdate={onCommentUpdate}
          />
          <CommentFooter
            comment={comment}
            currentUser={currentUser}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
        </div>
        <CommentOptions
          comment={comment}
          isEditing={isEditing}
          currentUser={currentUser}
          setIsEditing={setIsEditing}
        />
      </div>
      {isReplying && (
        <div className="px-12">
          <Avatar currentUser={currentUser as UserOn} />
          <Editor
            autoFocus
            currentUser={currentUser}
            onSubmit={onReplyCreate}
            cancel={() => setIsReplying(false)}
          />
        </div>
      )}
      {comment.comments?.length > 0 && (
        <div className="pl-12">
          <button
            onClick={handleChildComments}
            className="flex items-center gap-2 mb-4 text-sm transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
          >
            Respostas
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
              className="lucide lucide-chevron-down"
              style={{ rotate: areChildrenHidden ? "0deg" : "180deg" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {loading && page === 1 && <CommentLoadingSpinning />}
          <div
            className={`${
              areChildrenHidden ? "hidden" : "block"
            } flex flex-col justify-center`}
          >
            {childs.map((comment: CommentProps) => (
              <CommentRow
                key={comment.documentId}
                comment={comment}
                currentUser={currentUser}
              />
            ))}
            {childPageLength && (
              <LoadMoreButton func={loadMore} loadFunc={loading} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentRow;
