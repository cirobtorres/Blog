"use server";

import graphqlClient, { graphqlCommentClient } from "./graphQlClient";
import { revalidatePath } from "next/cache";
import {
  COUNT_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENTS,
  GET_NESTED_COMMENTS,
  LIKE_COMMENT,
  POST_COMMENT,
  POST_REPLY,
} from "./queries/comments";
import sanitizer from "../utils/sanitizer";

const saveComment = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  try {
    const content = formData.get("editor-content") as string;
    const articleId = formData.get("article-id");
    const userId = formData.get("user-id");
    if (articleId && articleId !== "" && userId && userId !== "") {
      const sanitizedBody = sanitizer(content);
      await graphqlCommentClient.request(POST_COMMENT, {
        data: {
          body: sanitizedBody,
          article: articleId,
          users_permissions_user: userId,
        },
      });
      revalidatePath("/", "layout");
      return { message: "success" };
    }
  } catch (error) {
    console.error("Failed to save comment", error);
    // return { message: "error" };
  }
  return { message: "error" };
};

const deleteComment = async (commentDocumentId: string) => {
  try {
    await graphqlCommentClient.request(DELETE_COMMENT, {
      documentId: commentDocumentId,
    });
    revalidatePath("/", "layout");
    return { message: "success" };
  } catch (error) {
    console.error("Failed do delete comment", error);
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
    const articleId = formData.get("article-id");
    const userId = formData.get("user-id");
    const userParentId = formData.get("replied-user-id");
    if (
      articleId &&
      articleId !== "" &&
      userId &&
      userId !== "" &&
      userParentId &&
      userParentId !== ""
    ) {
      const sanitizedBody = sanitizer(content);
      await graphqlCommentClient.request(POST_REPLY, {
        data: {
          article: articleId,
          body: sanitizedBody,
          parent_id: userParentId,
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

const getComments = async (documentId: string, page: number) => {
  try {
    const {
      comments_connection,
    }: {
      comments_connection: {
        nodes: CommentProps[];
        pageInfo: {
          page: number;
          pageCount: number;
          pageSize: number;
          total: number;
        };
      };
    } = await graphqlClient.request(GET_COMMENTS, {
      filters: {
        article: {
          documentId: {
            eq: documentId,
          },
        },
      },
      pagination: {
        page,
        pageSize: 10,
      },
      sort: "createdAt:desc",
    });
    return { data: comments_connection };
  } catch (error) {
    console.error("Failed to fetch get comments:", error);
    // throw new Error("Failed to fetch get comments");
  }
  return {
    data: {
      nodes: [],
      pageInfo: {
        page: null,
        pageCount: null,
        pageSize: null,
        total: null,
      },
    },
  };
};

const getNestedComments = async (documentId: string | null, page: number) => {
  try {
    const {
      comments_connection,
    }: {
      comments_connection: {
        nodes: CommentProps[];
        pageInfo: {
          page: number;
          pageCount: number;
          pageSize: number;
          total: number;
        };
      };
    } = await graphqlClient.request(GET_NESTED_COMMENTS, {
      filters: {
        parent_id: {
          documentId: {
            eq: documentId,
          },
        },
      },
      pagination: {
        page: page,
        pageSize: 5,
      },
    });
    return { data: comments_connection };
  } catch (error) {
    console.error("Failed to fetch get nested comments:", error);
    // throw new Error("Failed to fetch get nested comments");
  }
  return {
    data: {
      nodes: [],
      pageInfo: {
        page: null,
        pageCount: null,
        pageSize: null,
        total: null,
      },
    },
  };
};

const countComments = async (documentId: string) => {
  try {
    const {
      comments_connection,
    }: { comments_connection: { pageInfo: { total: number } } } =
      await graphqlClient.request(COUNT_COMMENTS, {
        filters: {
          article: {
            documentId: {
              eq: documentId,
            },
          },
        },
      });
    return { data: comments_connection.pageInfo.total };
  } catch (error) {
    console.error("Failed to fetch count comments:", error);
    // throw new Error("Failed to fetch get comments");
  }
  return { data: null };
};

const likeComment = async (
  prevState: { message: boolean | null },
  formData: FormData
): Promise<{ message: boolean | null }> => {
  try {
    const documentId = formData.get("liked-comment-document-id");
    const liked_by = formData.get("user-like-document-id");
    await graphqlClient.request(LIKE_COMMENT, {
      documentId,
      data: {
        liked_by,
      },
    });
    return { message: true };
  } catch (error) {
    console.error("Failed to fetch like comments:", error);
    // throw new Error("Failed to fetch like comments");
  }
  return { message: null };
};

export {
  saveComment,
  deleteComment,
  saveReply,
  getComments,
  getNestedComments,
  likeComment,
  countComments,
};
