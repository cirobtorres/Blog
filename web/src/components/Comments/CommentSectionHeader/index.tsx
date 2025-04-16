import { useState } from "react";
import CommentCount from "./CommentCount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Shadcnui/select";
import { useComment } from "@/hooks/useComment";

type SelectValueProps = "Mais recentes" | "Mais antigos" | "Maior likes";

const CommentSectionHeader = ({ articleId }: { articleId: string }) => {
  const { changeSorting } = useComment();
  const [selectValue, setSelectValue] =
    useState<SelectValueProps>("Mais recentes");
  function handleSort(label: string) {
    switch (label) {
      case "antigos":
        changeSorting(["createdAt:asc"]);
        setSelectValue("Mais antigos");
        break;
      case "likes":
        changeSorting([
          // "comment_likes:users_permissions_user:count",
          "createdAt:desc",
        ]);
        setSelectValue("Maior likes");
        break;
      default: // Mais recentes
        changeSorting(["createdAt:desc"]);
        setSelectValue("Mais recentes");
        break;
    }
  }
  return (
    <div
      id="comment-session-header"
      className="pt-20 flex justify-center items-center mx-auto gap-2 mb-12 max-[600px]:flex-col"
      tabIndex={-1}
    >
      <h3 className="flex items-center h-12 px-2 text-3xl font-extrabold">
        <CommentCount articleId={articleId} />
      </h3>
      <Select
        onValueChange={(value: SelectValueProps) => {
          handleSort(value);
        }}
      >
        <p className="flex pr-2">Ordenar por:</p>
        <SelectTrigger className="w-[180px] [&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:text-left [&>*:nth-child(2)]:pl-2">
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
          <SelectItem value="recentes">Mais recentes</SelectItem>
          <SelectItem value="antigos">Mais antigos</SelectItem>
          <SelectItem value="likes">Maior likes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CommentSectionHeader;
