/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { graphqlCommentClient } from "../../lib/graphQlClient";
import {
  COUNT_COMMENT_LIKES,
  COUNT_COMMENTS,
  DELETE_COMMENT,
  DISLIKE_COMMENT,
  GET_COMMENT,
  GET_COMMENTS,
  LIKE_COMMENT,
  POST_COMMENT,
  UPDATE_COMMENT,
} from "../../lib/queries/comments";
import sanitizer from "../../utils/sanitizer";

export const useAsync = (
  func: (
    ...args: any[]
  ) => Promise<CommentProps | CommentProps[] | number | string | void>,
  // getComments => Promise<CommentProps[]>
  // createComment => Promise<CommentProps>
  // updateComment => Promise<CommentProps>
  // countComments => Promise<number>
  // deleteComment => Promise<string>
  dependencies: any[] = []
) => {
  const { execute, ...state } = useAsyncFn(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
};

export const useAsyncFn = (
  func: (
    ...args: any[]
  ) => Promise<CommentProps | CommentProps[] | number | string | void>,
  // getComments => Promise<CommentProps[]>
  // createComment => Promise<CommentProps>
  // updateComment => Promise<CommentProps>
  // countComments => Promise<number>
  // deleteComment => Promise<string>
  dependencies: any[] = [],
  initialLoading: boolean = false
) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<
    CommentProps | CommentProps[] | number | string | void | null
  >(null);

  const execute = useCallback(async (...params: any[]) => {
    setLoading(true);
    return func(...params)
      .then((data) => {
        setValue(data);
        setError(null);
        return data;
      })
      .catch((error: unknown) => {
        setValue(null);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  return { loading, error, value, execute };
};

export const clientCountComments = async (
  documentId: string,
  parent_id: {
    documentId: {
      eq: string | null;
    };
  } | null = null
) => {
  return graphqlCommentClient
    .request(COUNT_COMMENTS, {
      filters: {
        article: {
          documentId: {
            eq: documentId,
          },
        },
        parent_id,
      },
    })
    .then((res: { comments_connection: { pageInfo: { total: number } } }) => {
      const typedRes = res;
      return typedRes.comments_connection.pageInfo.total;
    })
    .catch((error: unknown) => {
      console.error(error);
      return Promise.reject(new Error("Failed to fetch count comments"));
    });
};

export const clientGetComments = async (
  documentId: string,
  pagination: {
    page?: number | null;
    pageSize?: number | null;
    limit?: number | null;
    start?: number | null;
  } = {
    page: null,
    pageSize: null,
    limit: null,
    start: null,
  },
  parentId: string | null = null,
  sort: string[] | null = ["createdAt:desc"]
) => {
  return graphqlCommentClient
    .request(GET_COMMENTS, {
      filters: {
        article: {
          documentId: {
            eq: documentId,
          },
        },
        parent_id: {
          documentId: {
            eq: parentId,
          },
        },
      },
      pagination,
      sort,
    })
    .then(
      (res: {
        comments_connection: { nodes: CommentProps[]; pageInfo: PageInfo };
      }) => {
        const typedRes = res;
        return typedRes.comments_connection.nodes;
      }
    )
    .catch((error: unknown) => {
      console.error(error);
      return Promise.reject(new Error("Failed to fetch get comments"));
    });
};

export const clientGetComment = async ({
  documentId,
}: {
  documentId: string;
}) => {
  return graphqlCommentClient
    .request(GET_COMMENT, { documentId })
    .then((res: { comment: CommentProps }) => {
      const { comment } = res;
      return { data: comment };
    })
    .catch((error: unknown) => {
      console.error(error);
      return Promise.reject(new Error("Failed to fetch get comment"));
    });
};

export const clientSaveComment = async ({
  documentId,
  body,
  userId,
  parentId: parent_id,
}: {
  documentId: string;
  body: string;
  userId: string;
  parentId?: string | null;
}) => {
  const sanitizedBody = sanitizer(body);
  return graphqlCommentClient
    .request(POST_COMMENT, {
      data: {
        body: sanitizedBody,
        article: documentId,
        users_permissions_user: userId,
        parent_id,
      },
    })
    .then((res: { createComment: CommentProps }) => {
      const typedRes = res;
      return typedRes.createComment;
    })
    .catch((error: unknown) => {
      console.error(error);
      return Promise.reject(new Error("Failed to fetch save comment"));
    });
};

export const clientUpdateComment = async ({
  documentId,
  body,
}: {
  documentId: string;
  body: string;
}) => {
  const sanitizedBody = sanitizer(body);
  return graphqlCommentClient
    .request(UPDATE_COMMENT, {
      documentId,
      data: {
        body: sanitizedBody,
      },
    })
    .then((res: { updateComment: CommentProps }) => {
      const typedRes = res;
      return typedRes.updateComment;
    })
    .catch((error: unknown) => {
      console.error(error);
      return Promise.reject(new Error("Failed to fetch update comment"));
    });
};

export const clientDeleteComment = async ({
  documentId,
}: {
  documentId: string;
}) => {
  return graphqlCommentClient
    .request(DELETE_COMMENT, {
      documentId,
    })
    .then((res: { deleteComment: { documentId: string } }) => {
      const typedRes = res;
      return typedRes.deleteComment.documentId;
    })
    .catch((error: unknown) => {
      console.error(error);
      return Promise.reject(new Error("Failed to fetch delete comment"));
    });
};

export const countCommentLikes = async (commentDocumentId: string) => {
  try {
    const filters = {
      comment: {
        documentId: {
          eq: commentDocumentId,
        },
      },
    };
    const {
      commentLikes,
    }: {
      commentLikes: {
        documentId: string;
        users_permissions_user: {
          documentId: string;
        };
      }[];
    } = await graphqlCommentClient.request(COUNT_COMMENT_LIKES, {
      filters,
    });
    return { data: commentLikes };
  } catch (error) {
    console.error("Failed to count comment likes:", error);
    throw new Error("Failed to count comment likes");
  }
};

export const likeComment = async (
  commentDocumentId: string,
  userDocumentId: string
) => {
  try {
    const data = {
      comment: commentDocumentId,
      users_permissions_user: userDocumentId,
    };
    const {
      createCommentLike,
    }: {
      createCommentLike: {
        documentId: string;
        users_permissions_user: { documentId: string }[];
      };
    } = await graphqlCommentClient.request(LIKE_COMMENT, {
      documentId: commentDocumentId,
      data,
    });
    return { data: createCommentLike };
  } catch (error) {
    console.error("Failed to like comment:", error);
    throw new Error("Failed to like comment");
  }
};

export const dislikeComment = async (commentDocumentId: string) => {
  try {
    const {
      deleteCommentLike,
    }: {
      deleteCommentLike: {
        documentId: string;
        users_permissions_user: {
          documentId: string;
        };
      };
    } = await graphqlCommentClient.request(DISLIKE_COMMENT, {
      documentId: commentDocumentId,
    });
    return { data: deleteCommentLike };
  } catch (error) {
    console.error("Failed to dislike comment:", error);
    throw new Error("Failed to dislike comment");
  }
};
