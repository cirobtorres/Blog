import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  clientCountComments,
  clientDeleteComment,
  clientGetComment,
  clientGetComments,
  clientSaveComment,
  clientUpdateComment,
  useAsync,
  useAsyncFn,
} from "../../../service/comments/client";
import { useComment } from "../../../hooks/useComment";
import { toast } from "../../../hooks/useToast";
import { Avatar, CommentAvatar } from "../Avatar";
import { CommentLoadingSpinning } from "../CommentLoading";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";
import CommentOptions from "./CommentOptions";
import Editor from "../Editor";
import HiddenReplies from "./HiddenReplies";
import ShowRepliesButton from "./ShowRepliesButton";

const CommentRow = ({
  comment,
  currentUser,
  isChild,
  isTempChild,
  setParentChildsLength,
  setParentChilds,
  setExistsTempChildsOnParent,
  setTemporaryChildsOnParent,
}: {
  comment: CommentProps;
  currentUser: User;
  isChild?: boolean;
  isTempChild?: boolean;
  setParentChilds?: Dispatch<SetStateAction<CommentProps[] | []>>;
  setParentChildsLength?: Dispatch<SetStateAction<boolean>>;
  setExistsTempChildsOnParent?: Dispatch<SetStateAction<boolean>>;
  setTemporaryChildsOnParent?: Dispatch<SetStateAction<CommentProps[] | []>>;
}) => {
  // CommentRow has three comment entities:
  //    1. currentComment;
  //    2. childs (currentComment childs);
  //    3. tempChilds (childs already saved but not yet queried from the database).
  // childs are assigned when "Respostas" is opened (areChildrenHidden = false).
  // tempChilds are comments immediatly created (exists only within the same session they've been created).
  // tempChilds are only rendered when "Respostas" is hidden (areChildrenHidden = true).

  // Comment----------------------------------------------------------------------
  const [currentComment, setCurrentComment] = useState<CommentProps | null>(
    comment
  );
  const [currentCommentChildsLength, setCurrentCommentChildsLength] = useState(
    comment.comments.length > 0
  );
  // Childs--------------------------------------------------------------------------------
  const [currentChilds, setCurrentChilds] = useState<CommentProps[]>([]);
  // Temporary Childs----------------------------------------------------------------------
  const [tempChilds, setTempChilds] = useState<CommentProps[]>([]); // Temporary childs
  const [existsTempChilds, setExistsTempChilds] = useState(false); // Whether they're visible or not
  // Params--------------------------------------------------------------------------------
  const params: { documentId: string; slug: string } = useParams();
  const { documentId }: { documentId: string } = params;
  // Page----------------------------------------------------------------------------------
  const [page, setPage] = useState(0);
  const pageSize = 5;
  // useComment---------------------------------------------------------------------
  const commentContext = useComment();
  const createReplyFn = useAsyncFn(clientSaveComment, [], false);
  const [createReplyFnLoading, setCreateReplyFnLoading] = useState(false);
  const updateCommentFn = useAsyncFn(clientUpdateComment, [], false);
  const deleteCommentFn = useAsyncFn(clientDeleteComment, [], false);
  const createLocalReply = commentContext?.createLocalReply;
  const updateLocalComment = commentContext?.updateLocalComment;
  const deleteLocalComment = commentContext?.deleteLocalComment;
  // Interacting---------------------------------------------------------------------------
  const [isChildrenHidden, setIsChildrenHidden] = useState(true);
  const [isChildrenOnDb, setIsChildrenOnDb] = useState(false); // Controls whether "Carregar Mais" button is visible or not.
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Visibility----------------------------------------------------------------------------
  function toggleRepliesVisibility() {
    setTempChilds([]);
    setIsChildrenHidden(!isChildrenHidden);
    if (page < 1) loadMore(); // When clicking for the first time (first query to db).
  }

  // Loading more childs-------------------------------------------------------------------
  const loadMore = () => setPage((prev) => prev + 1);

  const { loading } = useAsync(async () => {
    if (page === 0) return;
    const [moreChilds, total]: [CommentProps[], number] = await Promise.all([
      // clientGetComments retrieves the comments.
      clientGetComments(
        documentId as string, // Article documentId
        { page, pageSize },
        currentComment?.documentId,
        ["createdAt:asc"]
      ),
      clientCountComments(
        documentId as string, // Article documentId
        {
          documentId: { eq: currentComment?.documentId },
        }
      ),
    ]);
    setCurrentChilds((prevChilds) => {
      const newChilds = moreChilds.filter(
        (newChild) =>
          !prevChilds.some(
            // Avoiding duplicated elements.
            // If newChild is already in prevChild, does not insert it into childs state.
            (prevChild) => prevChild.documentId === newChild.documentId
          )
      );
      return [...prevChilds, ...newChilds];
    });
    setIsChildrenOnDb(total > moreChilds.length);
  }, [page]);

  // Create--------------------------------------------------------------------------------
  async function onReplyCreate(body: string) {
    setCreateReplyFnLoading(true);
    return createReplyFn
      .execute({
        documentId, // Article documentId
        body,
        userId: currentUser.data?.documentId,
        parentId: currentComment?.documentId, // This comment's document id
      })
      .then(async (comment) => {
        setIsReplying(false);
        createLocalReply(comment as CommentProps);
        const { data: newComment } = await clientGetComment({
          documentId: (comment as CommentProps).documentId,
        });
        setExistsTempChilds(true);
        if (isChildrenHidden)
          setTempChilds((prevChilds) => [...prevChilds, newComment]);
        setCurrentChilds((prevChilds) => [
          ...prevChilds,
          newComment as CommentProps,
        ]);
      })
      .then(() => {
        toast({ description: "Comentário criado!" });
      })
      .catch((error: unknown) => {
        console.error(error);
        toast({ description: "Erro ao criar comentário" });
      })
      .finally(() => setCreateReplyFnLoading(false));
  }

  // Update--------------------------------------------------------------------------------
  async function onCommentUpdate(body: string): Promise<void> {
    return updateCommentFn
      .execute({ documentId: currentComment?.documentId, body })
      .then((updatedComment) => {
        return updatedComment as CommentProps;
      })
      .then((updatedComment: CommentProps) => {
        setIsEditing(false);
        updateLocalComment(updatedComment);
        setCurrentComment(() => updatedComment);
        toast({ description: "Comentário editado!" });
      })
      .catch((error: unknown) => {
        toast({ description: "Erro ao editar comentário" });
        console.error(error);
      });
  }

  // Delete--------------------------------------------------------------------------------
  async function onCommentDelete(): Promise<void> {
    return deleteCommentFn
      .execute({ documentId: currentComment?.documentId })
      .then((documentId) => {
        // parents
        deleteLocalComment(documentId as string);
        setCurrentComment(null);
        // childs
        if (isChild && setParentChilds && setParentChildsLength) {
          setParentChilds((prev) => {
            const childs = prev.filter(
              (child) => child.documentId !== documentId
            );
            if (childs.length === 0) {
              setParentChildsLength(false);
              if (setExistsTempChildsOnParent)
                setExistsTempChildsOnParent(false);
            }
            return childs;
          });
        }
        // tempChilds
        if (isTempChild && setParentChilds && setParentChildsLength) {
          setParentChilds((prev) => {
            const childs = prev.filter(
              (child) => child.documentId !== documentId
            );
            if (childs.length === 0) {
              setParentChildsLength(false);
              if (setExistsTempChildsOnParent)
                setExistsTempChildsOnParent(false);
            }
            return childs;
          });
          if (setTemporaryChildsOnParent && setExistsTempChildsOnParent)
            setTemporaryChildsOnParent((prev) => {
              const parentChilds = prev.filter(
                (child) => child.documentId !== documentId
              );
              if (parentChilds.length === 0) setExistsTempChildsOnParent(false);
              return parentChilds;
            });
        }
      })
      .then(() => {
        toast({ description: "Comentário excluído" });
        return;
      })
      .catch((error: unknown) => {
        toast({ description: "Erro ao excluir comentário" });
        console.error(error);
        return;
      });
  }

  return (
    currentComment && (
      <div
        key={currentComment.documentId}
        id={currentComment.documentId}
        className="flex flex-col"
      >
        <div className="py-4 grid grid-cols-[48px_repeat(10,_1fr)_48px]">
          <CommentAvatar currentUser={currentUser} />
          <div className="col-span-10 flex flex-col gap-2 mt-2">
            <CommentHeader comment={currentComment} currentUser={currentUser} />
            <CommentBody
              comment={currentComment}
              isEditing={isEditing}
              currentUser={currentUser}
              setIsEditing={setIsEditing}
              onUpdate={onCommentUpdate}
            />
            <CommentFooter
              comment={currentComment}
              currentUser={currentUser}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
            />
          </div>
          <CommentOptions
            currentComment={currentComment}
            isEditing={isEditing}
            currentUser={currentUser}
            setIsEditing={setIsEditing}
            setChilds={setCurrentChilds}
            onDelete={onCommentDelete}
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
        {(currentCommentChildsLength || existsTempChilds) && (
          <div className="pl-12">
            <ShowRepliesButton
              isChildrenHidden={isChildrenHidden}
              alternateHidden={toggleRepliesVisibility}
            />
            {loading && page === 1 && <CommentLoadingSpinning />}
            <HiddenReplies
              isChildrenHidden={isChildrenHidden}
              currentUser={currentUser}
              currentChilds={currentChilds}
              isChildrenOnDb={isChildrenOnDb}
              loading={loading}
              loadMore={loadMore}
              setParentChilds={setCurrentChilds}
              setParentChildsLength={setCurrentCommentChildsLength}
            />
            {createReplyFnLoading && <CommentLoadingSpinning />}
            {tempChilds &&
              tempChilds.map((child) => (
                <CommentRow
                  key={child.documentId}
                  comment={child}
                  currentUser={currentUser}
                  setExistsTempChildsOnParent={setExistsTempChilds}
                  isTempChild={existsTempChilds}
                  setParentChilds={setCurrentChilds}
                  setParentChildsLength={setCurrentCommentChildsLength}
                  setTemporaryChildsOnParent={setTempChilds}
                />
              ))}
          </div>
        )}
      </div>
    )
  );
};

export default CommentRow;
