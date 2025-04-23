const ShowRepliesButton = ({
  isChildrenHidden,
  alternateHidden,
}: {
  isChildrenHidden: boolean;
  alternateHidden: () => void;
}) => {
  return (
    <button
      onClick={alternateHidden}
      className="flex items-center gap-2 mb-2 text-sm transition-colors duration-100 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
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
        style={{ rotate: isChildrenHidden ? "0deg" : "180deg" }}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
};

export default ShowRepliesButton;
