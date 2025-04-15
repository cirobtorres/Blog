import { Dispatch, SetStateAction } from "react";
import CommentRow from "..";
import LoadMoreButton from "../../LoadMoreButton";

const HiddenReplies = ({
  currentUser,
  childs,
  childsOnDb,
  setChilds,
  isHidden,
  loadMore,
  loading,
}: {
  currentUser: User;
  childs: CommentProps[];
  childsOnDb: boolean;
  setChilds: Dispatch<SetStateAction<CommentProps[]>>;
  isHidden: boolean;
  loadMore: () => void;
  loading: boolean;
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
          setMyChilds={setChilds}
          currentUser={currentUser}
        />
      ))}
      {childsOnDb && <LoadMoreButton func={loadMore} loadFunc={loading} />}
    </div>
  );
};

export default HiddenReplies;
