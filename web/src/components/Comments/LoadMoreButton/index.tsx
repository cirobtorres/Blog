import { CommentLoadingSpinning } from "../CommentLoading";

const LoadMoreButton = ({
  func,
  loadFunc,
}: {
  func: () => void;
  loadFunc: boolean;
}) => {
  return (
    <button
      onClick={func}
      disabled={loadFunc}
      className="w-44 h-10 mx-auto flex justify-center items-center"
    >
      {loadFunc ? (
        <CommentLoadingSpinning />
      ) : (
        <p
          className={
            `flex justify-center items-center gap-2` + // Positioning
            ` rounded-full` + // Layout
            ` py-2 px-3` + // Box sizing
            ` transition-colors duration-100` + // Transition
            ` text-blog-foreground-highlight` + // Colors
            ` hover:text-blog-foreground-readable-hover` // Hovers
          }
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-cloud-download"
          >
            <path d="M12 13v8l-4-4" />
            <path d="m12 21 4-4" />
            <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
          </svg> */}
          Carregar mais
        </p>
      )}
    </button>
  );
};

export default LoadMoreButton;
