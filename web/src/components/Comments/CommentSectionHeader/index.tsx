import { useState } from "react";
import CommentCount from "./CommentCount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Shadcnui/select";

type SelectValueProps = "Mais recente" | "Mais antigo" | "Maior likes";

const CommentSectionHeader = ({
  articleId,
  comments,
}: {
  articleId: string;
  comments: CommentProps[] | null;
}) => {
  const [selectValue, setSelectValue] =
    useState<SelectValueProps>("Mais recente");
  return (
    <div
      id="comment-session-header"
      className="pt-20 flex justify-center items-center mx-auto gap-2 mb-12 max-[600px]:flex-col"
      tabIndex={-1}
    >
      <h3 className="flex items-center h-12 px-2 text-3xl font-extrabold">
        <CommentCount articleId={articleId} comments={comments} />
      </h3>
      <Select>
        <p className="flex pr-2">Ordenar por:</p>
        <SelectTrigger className="w-[180px]">
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
          <SelectValue placeholder={selectValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="Mais recente"
            onSelect={() => setSelectValue("Mais recente")}
          >
            Mais recente
          </SelectItem>
          <SelectItem
            value="Mais antigo"
            onSelect={() => setSelectValue("Mais antigo")}
          >
            Mais antigo
          </SelectItem>
          <SelectItem
            value="Maior likes"
            onSelect={() => setSelectValue("Maior likes")}
          >
            Maior likes
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CommentSectionHeader;
