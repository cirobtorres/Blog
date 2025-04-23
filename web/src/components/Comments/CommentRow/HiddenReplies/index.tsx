import { Dispatch, SetStateAction } from "react";
import CommentRow from "..";
import LoadMoreButton from "../../LoadMoreButton";

const HiddenReplies = ({
  currentUser,
  currentChilds,
  isChildrenOnDb,
  isChildrenHidden,
  loading,
  loadMore,
  setParentChilds,
  setParentChildsLength,
}: {
  currentUser: User;
  currentChilds: CommentProps[];
  isChildrenOnDb: boolean;
  isChildrenHidden: boolean;
  loading: boolean;
  loadMore: () => void;
  setParentChilds: Dispatch<SetStateAction<CommentProps[] | []>>;
  setParentChildsLength: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${
        isChildrenHidden ? "hidden" : "block"
      } flex flex-col justify-center`}
    >
      {currentChilds.map((currentChild: CommentProps) => (
        <CommentRow
          key={currentChild.documentId}
          comment={currentChild}
          currentUser={currentUser}
          isChild={!!currentChild.parent_id}
          setParentChilds={setParentChilds}
          setParentChildsLength={setParentChildsLength}
        />
      ))}
      {isChildrenOnDb && <LoadMoreButton func={loadMore} loadFunc={loading} />}
    </div>
  );
};

export default HiddenReplies;
