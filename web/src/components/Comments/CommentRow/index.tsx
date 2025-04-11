import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
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
  }, [page]);

  // Accessing Context---------------------------------------------------------------------
  const commentContext = useComment();
  const [temporaryChilds, setTemporaryChilds] = useState<CommentProps[]>([]);
  const [current, setCurrent] = useState(false);

  // childPageLength controls whether "Carregar Mais" button is visible or not.
  const childPageLength = totalChilds > childs.length + temporaryChilds.length;

  // Create--------------------------------------------------------------------------------
  const createReplyFn = useAsyncFn(clientSaveComment, [], false);
  const updateCommentFn = useAsyncFn(clientUpdateComment, [], false);
  const updateLocalComment = commentContext?.updateLocalComment;
  const createLocalReply = commentContext?.createLocalReply;

  async function onReplyCreate(body: string) {
    return createReplyFn
      .execute({
        documentId, // Article's document id
        body,
        userId: currentUser.data?.documentId,
        parentId: currentComment.documentId, // This comment's document id
      })
      .then((comment) => {
        setIsReplying(false);
        setChilds((prevChilds) => [...prevChilds, comment as CommentProps]);
        if (!currentComment.parent_id) {
          setCurrent(true);
          if (areChildrenHidden)
            setTemporaryChilds((prevChilds) => [
              ...prevChilds,
              comment as CommentProps,
            ]);
        }
        createLocalReply(comment as CommentProps);
        toast({ description: "Comentário criado!" });
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Erro ao criar comentário" });
      });
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
       - Reprodução:
        1. Crie um novo comentário;
        2. NÃO aperte "Respostas";
        3. Edite o comentário;
    EXPLICAÇÃO: O comentário não será deletado. NÃO ESCONDA os comentário, 
    pois ao trazer os comentários escondidos de volta, 
    esses virão por meio de uma nova request ao database 
    (não serão temporaryChilds, serão Childs). 
    Qualquer edição/delete ao temporaryChilds é perdido.
    SOLUÇÃO: edições em temporaryChilds precisam ser enviadas ao database.
  
  TODO (BUG):
    childPageLength não funciona bem com CommentOptions (delete). 
    A disfunção entre totalChilds e childs.length faz com que, em certas ocasiões,
    o botão de "carregar mais" apareça (ainda que não exista comentários a serem carregados). 
    "Respostas" e "Carregar mais" devem desaparecer quando não houver mais childs
  */

  return (
    <div
      key={currentComment.documentId}
      id={currentComment.documentId}
      className="flex flex-col"
    >
      <div className="py-4 grid grid-cols-[48px_repeat(10,_1fr)_48px]">
        <CommentAvatar />
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
          setTotalChilds={setTotalChilds}
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
          <button
            onClick={handleChildComments}
            className="flex items-center gap-2 mb-4 text-sm transition-colors duration-100 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
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
              className="lucide lucide-chevron-down duration-100"
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
            {childs.map((child: CommentProps) => (
              <CommentRow
                key={child.documentId}
                comment={child}
                setMyChilds={setChilds}
                currentUser={currentUser}
              />
            ))}
            {childPageLength && (
              <LoadMoreButton func={loadMore} loadFunc={loading} />
            )}
          </div>
          {temporaryChilds &&
            temporaryChilds.map((child) => (
              <CommentRow
                key={child.documentId}
                comment={child}
                currentUser={currentUser}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const CommentAvatar = () => {
  return (
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
  );
};

export default CommentRow;
