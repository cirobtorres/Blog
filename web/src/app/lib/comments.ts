"use server";

import graphqlClient, { graphqlCommentClient } from "./graphQlClient";
import { revalidatePath } from "next/cache";
import { GET_COMMENTS, POST_COMMENT } from "./queries/comments";
import sanitizer from "../utils/sanitizer";

const saveComment = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  try {
    const content = formData.get("tiptap-editor-content") as string;
    const articleId = formData.get("tiptap-article-id");
    const userId = formData.get("tiptap-user-id");
    // {
    //   "data": {
    //      "createComment": {
    //        "documentId": "..."
    //     }
    //   }
    // }
    if (articleId && articleId !== "" && userId && userId !== "") {
      const sanitizedBody = sanitizer(content);
      await graphqlCommentClient.request(POST_COMMENT, {
        data: {
          body: sanitizedBody,
          article: articleId,
          users_permissions_user: userId,
        },
      });
      revalidatePath("/");
      return { message: "success" };
    }
  } catch (error) {
    console.error("Failed to post comment", error);
    // return { message: "error" };
  }
  return { message: "error" };
};

const getComments = async (documentId: string) => {
  try {
    const { article }: { article: { comments: CommentProps[] } } =
      await graphqlClient.request(GET_COMMENTS, {
        documentId,
      });

    return { data: article };
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw new Error("Failed to fetch comments");
  }
};

export { saveComment, getComments };
