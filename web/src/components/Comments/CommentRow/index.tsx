import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  clientCountComments,
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
  setMyChilds,
}: {
  comment: CommentProps;
  currentUser: User;
  setMyChilds?: Dispatch<SetStateAction<CommentProps[]>>;
}) => {
  // Exists three type of comment entities on CommentRow:
  //    1. currentComment
  //    2. childs (currentComment childs)
  //    3. temporaryChilds (childs already saved but not yet queried from the database)
  // childs are only rendered when "Respostas" is opened (areChildrenHidden = false)
  // temporaryChilds are these childs immediatly rendered when the user creates a new reply
  // They're intended to give the user some responsiveness/feedback immediatly after creating a reply
  // temporaryChilds are only rendered when "Respostas" is hidden (areChildrenHidden = true)
  const [currentComment, setCurrentComment] = useState(comment);

  // Params--------------------------------------------------------------------------------
  const params: { documentId: string; slug: string } = useParams();
  const { documentId }: { documentId: string } = params;

  // Page----------------------------------------------------------------------------------
  const [page, setPage] = useState(0);
  const pageSize = 5;

  function loadMore() {
    // Page is being mapped by useAsync: line 63 (page is a dependency).
    // As soon as page state changes, useAsync kicks in and request server for more comments.
    setPage((prev) => prev + 1);
  }

  // Interacting---------------------------------------------------------------------------
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleChildComments() {
    // Opens/closes "Respostas" (show/hide replies).
    setTemporaryChilds([]);
    setAreChildrenHidden(!areChildrenHidden);
    if (page < 1) {
      // If user opens "Respostas" for the first time,
      // it makes its first requests so the list does not come empty.
      loadMore();
    }
  }

  // Childs--------------------------------------------------------------------------------
  const [childs, setChilds] = useState<CommentProps[]>([]);
  const [totalChilds, setTotalChilds] = useState<number>(0);

  // childsOnDb controls whether "Carregar Mais" button is visible or not.
  const [childsOnDb, setChildsOnDb] = useState(false);

  const { loading } = useAsync(async () => {
    if (page === 0) return;
    // Array Destructuring
    const [moreChilds, total] = await Promise.all([
      // clientGetComments retrieves the comments.
      clientGetComments(
        documentId as string, // Article documentId
        { page, pageSize },
        currentComment.documentId, // Comment documentId
        "createdAt:asc"
      ),
      // clientCountComments retrieves how many comments there are in total.
      clientCountComments(documentId as string, {
        documentId: { eq: currentComment.documentId },
      }),
    ]);

    // .some = is any of it true (at least one is true)? Then true, false otherwise.
    // All assertions must be false for "some" to be false.
    setChilds((prevChilds) => {
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

    // setTotalChilds stores this total in a state.
    setTotalChilds(total);
    setChildsOnDb(totalChilds > childs.length);
  }, [page]);

  // Temporary Childs----------------------------------------------------------------------
  const [temporaryChilds, setTemporaryChilds] = useState<CommentProps[]>([]);
  const [current, setCurrent] = useState(false);

  // Accessing Context---------------------------------------------------------------------
  const commentContext = useComment();
  const createReplyFn = useAsyncFn(clientSaveComment, [], false);
  const [createReplyFnLoading, setCreateReplyFnLoading] = useState(false);
  const updateCommentFn = useAsyncFn(clientUpdateComment, [], false);
  const updateLocalComment = commentContext?.updateLocalComment;
  const createLocalReply = commentContext?.createLocalReply;

  // Create--------------------------------------------------------------------------------
  async function onReplyCreate(body: string) {
    setCreateReplyFnLoading(true);
    return createReplyFn
      .execute({
        documentId, // Article's document id
        body,
        userId: currentUser.data?.documentId,
        parentId: currentComment.documentId, // This comment's document id
      })
      .then(async (comment) => {
        setIsReplying(false);
        createLocalReply(comment as CommentProps);
        const { data: newComment } = await clientGetComment({
          documentId: (comment as CommentProps).documentId,
        });
        setCurrent(true);
        if (areChildrenHidden)
          setTemporaryChilds((prevChilds) => [...prevChilds, newComment]);
        setChilds((prevChilds) => [...prevChilds, newComment as CommentProps]);
      })
      .then(() => {
        toast({ description: "Comentário criado!" });
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Erro ao criar comentário" });
      })
      .finally(() => setCreateReplyFnLoading(false));
  }

  // Update--------------------------------------------------------------------------------
  async function onCommentUpdate(body: string): Promise<void> {
    return updateCommentFn
      .execute({ documentId: currentComment.documentId, body })
      .then((updatedComment) => {
        return updatedComment as CommentProps;
      })
      .then((updatedComment) => {
        setIsEditing(false);
        updateLocalComment(updatedComment);
        setCurrentComment(() => updatedComment);
        toast({ description: "Comentário editado!" });
      })
      .catch((error) => {
        toast({ description: "Erro ao editar comentário" });
        console.error(error);
      });
  }

  /*
  TODO (BUG):
    Alterações em temporaryChilds não refletem no banco de dados. 
       - Reprodução:
        1. Crie um novo comentário;
        2. NÃO aperte "Respostas" (não transforme temporaryChilds em childs);
        3. Delete o comentário (a mudança não afeta o banco de dados);
    OBS: NÃO ESCONDA os comentário, pois ao trazer os comentários escondidos de volta, 
    esses virão por meio de uma nova request ao database (não serão temporaryChilds, serão Childs). 
    Qualquer edição/delete ao temporaryChilds é perdido.
  TODO (BUG):
    HiddenReplies está aparecendo quando não deveria
  TODO: 
    Mudar esse nome "HiddenReplies"
  */

  return (
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
          setMyChilds={setMyChilds}
          setTemporaryChilds={setTemporaryChilds}
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
      {(currentComment.comments?.length > 0 || current) && (
        <div className="pl-12">
          <ShowRepliesButton
            isHidden={areChildrenHidden}
            alternateHidden={handleChildComments}
          />
          {loading && page === 1 && <CommentLoadingSpinning />}
          <HiddenReplies
            isHidden={areChildrenHidden}
            currentUser={currentUser}
            childs={childs}
            setChilds={setChilds}
            childsOnDb={childsOnDb}
            loading={loading}
            loadMore={loadMore}
          />
          {createReplyFnLoading && <CommentLoadingSpinning />}
          {temporaryChilds &&
            temporaryChilds.map((child) => (
              <CommentRow
                key={child.documentId}
                comment={child}
                currentUser={currentUser}
                setMyChilds={setChilds}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CommentRow;
