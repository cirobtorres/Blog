// import Image from "next/image";
import { formatDateToYouTubeLikeFormat } from "../../../utils/dates";
import SafeHTML from "./SafeHTML";

const CommentRow = ({
  // documentId,
  body,
  createdAt,
  updatedAt,
  users_permissions_user: {
    // documentId: userDocumentId,
    confirmed,
    blocked,
    username,
  },
}: CommentProps) => {
  if (confirmed && !blocked) {
    return (
      <div className="max-w-5xl mx-auto grid grid-cols-12 my-6">
        <div className="col-span-1">
          {/* <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={`http://127.0.0.1:1337${article.author.avatar.url}`}
            alt={article.author.avatar.alternativeText}
            fill
            sizes="(max-width: 40px) 100vw"
            className="transition-all duration-500 absolute object-cover group-hover:brightness-50"
          />
        </div> */}
        </div>
        <div className="col-span-11 flex flex-col gap-2">
          <p className="text-sm text-[#808080]">
            <button className="text-base transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover">
              @{username}
            </button>{" "}
            {formatDateToYouTubeLikeFormat(createdAt)}{" "}
            {updatedAt > createdAt && "(editado)"}
          </p>
          <SafeHTML html={body} />
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              6
            </button>
            <button className="text-sm transition-colors duration-500 text-blog-foreground-readable hover:text-blog-foreground-readable-hover">
              Responder
            </button>
          </div>
          <button className="flex items-center w-fit text-blog-foreground-highlight">
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
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    );
  } else if (confirmed && blocked) {
    return <div>Usuário suspenso</div>;
  } else {
    // User not confirmed
    return null;
  }
};

export default CommentRow;
