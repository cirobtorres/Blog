"use server";

import graphqlClient, { graphqlCommentClient } from "./graphQlClient";
import { revalidatePath } from "next/cache";
import { GET_COMMENTS, POST_COMMENT, POST_REPLY } from "./queries/comments";
import sanitizer from "../utils/sanitizer";

const saveComment = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  try {
    const content = formData.get("tiptap-editor-content") as string;
    const articleId = formData.get("tiptap-article-id");
    const userId = formData.get("tiptap-user-id");
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
    console.error("Failed to save comment", error);
    // return { message: "error" };
  }
  return { message: "error" };
};

const saveReply = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  try {
    const content = formData.get("tiptap-editor-content") as string;
    const articleId = formData.get("articleDocumentId");
    const userToReplyId = formData.get("userRepliedToId");
    const userId = formData.get("userDocumentId");
    if (
      articleId &&
      articleId !== "" &&
      userToReplyId &&
      userToReplyId !== "" &&
      userId &&
      userId !== ""
    ) {
      const sanitizedBody = sanitizer(content);
      await graphqlCommentClient.request(POST_REPLY, {
        data: {
          article: articleId,
          body: sanitizedBody,
          parent_id: userId,
          users_permissions_user: userToReplyId,
        },
      });
      revalidatePath("/");
      return { message: "success" };
    }
  } catch (error) {
    console.error("Failed to save comment", error);
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
    console.error("Failed to fetch get comments:", error);
    // throw new Error("Failed to fetch get comments");
  }
  return { data: { comments: [] } };
};

const likeComment = async () => {
  try {
    // const
  } catch (error) {
    console.error("Failed to fetch like comments:", error);
    // throw new Error("Failed to fetch like comments");
  }
};

export { saveComment, saveReply, getComments, likeComment };
