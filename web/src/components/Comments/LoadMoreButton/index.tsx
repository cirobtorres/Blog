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
          Carregar mais
        </p>
      )}
    </button>
  );
};

export default LoadMoreButton;
