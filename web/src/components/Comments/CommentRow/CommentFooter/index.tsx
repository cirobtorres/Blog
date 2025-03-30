const CommentFooter = ({
  comment,
  currentUser,
  isReplying,
  setIsReplying,
}: {
  comment: CommentProps;
  currentUser: User;
  setIsReplying: (value: boolean) => void;
  isReplying: boolean;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        <button
          type="submit"
          className="flex items-center gap-3 p-1"
          // aria-label={}
          // onClick={}
          // disabled={}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-thumbs-up"
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
        </button>
        <span className="text-sm p-1">{comment.liked_by.length}</span>
      </div>
      {currentUser.ok && (
        <button
          type="button"
          onClick={() => setIsReplying(!isReplying)}
          className={`p-1 text-sm transition-colors duration-500 hover:text-blog-foreground-readable-hover ${
            isReplying
              ? "text-blog-foreground-highlight"
              : "text-blog-foreground-readable"
          }`}
        >
          Responder
        </button>
      )}
    </div>
  );
};

export default CommentFooter;
