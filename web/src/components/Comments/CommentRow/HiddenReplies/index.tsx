import { Dispatch, SetStateAction } from "react";
import CommentRow from "..";
import LoadMoreButton from "../../LoadMoreButton";

const HiddenReplies = ({
  currentUser,
  childs,
  childsOnDb,
  isHidden,
  loadMore,
  loading,
  setParentChilds,
  setParentChildsLength,
}: {
  currentUser: User;
  childs: CommentProps[];
  childsOnDb: boolean;
  isHidden: boolean;
  loading: boolean;
  loadMore: () => void;
  setParentChilds: Dispatch<SetStateAction<CommentProps[] | []>>;
  setParentChildsLength: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${
        isHidden ? "hidden" : "block"
      } flex flex-col justify-center`}
    >
      {childs.map((child: CommentProps) => (
        <CommentRow
          key={child.documentId}
          comment={child}
          setParentChilds={setParentChilds}
          isChild={!!child.parent_id}
          setParentChildsLength={setParentChildsLength}
          currentUser={currentUser}
        />
      ))}
      {childsOnDb && <LoadMoreButton func={loadMore} loadFunc={loading} />}
    </div>
  );
};

export default HiddenReplies;
