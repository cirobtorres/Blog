const CommentHeader = ({ commentLength }: { commentLength: number }) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-12">
      <h2 className="text-2xl font-extrabold">
        {commentLength <= 1
          ? `${commentLength} comentário`
          : `${commentLength} comentários`}
      </h2>
      <button className="flex">
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
          className="lucide lucide-arrow-down-wide-narrow"
        >
          <path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <path d="M11 4h10" />
          <path d="M11 8h7" />
          <path d="M11 12h4" />
        </svg>
        Ordenar por:
      </button>
      <span>mais recente</span>
    </div>
  );
};

export default CommentHeader;
