/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { graphqlCommentClient } from "../../lib/graphQlClient";
import {
  COUNT_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENTS,
  POST_COMMENT,
  POST_EDIT_COMMENT,
} from "../../lib/queries/comments";
import sanitizer from "../../utils/sanitizer";

export const useAsync = (
  func: (
    ...args: any[]
  ) => Promise<CommentProps | CommentProps[] | number | string>,
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
  ) => Promise<CommentProps | CommentProps[] | number | string>,
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
    CommentProps | CommentProps[] | number | string | null
  >(null);

  const execute = useCallback(async (...params: any[]) => {
    setLoading(true);
    return func(...params)
      .then((data) => {
        setValue(data);
        setError(null);
        return data;
      })
      .catch((error) => {
        setValue(null);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
    .then((res) => {
      const typedRes = res as {
        comments_connection: { pageInfo: { total: number } };
      };
      return typedRes.comments_connection.pageInfo.total;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(
        error?.response?.data?.message ?? "Failed to fetch count comments"
      );
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
  parentId: string | null = null
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
      sort: "createdAt:desc",
    })
    .then((res) => {
      const typedRes = res as {
        comments_connection: { nodes: CommentProps[]; pageInfo: PageInfo };
      };
      return typedRes.comments_connection.nodes;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(
        error?.response?.data?.message ?? "Failed to fetch get comments"
      );
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
    .then((res) => {
      const typedRes = res as { createComment: CommentProps };
      return typedRes.createComment;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(
        error?.response?.data?.message ?? "Failed to fetch save comment"
      );
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
    .request(POST_EDIT_COMMENT, {
      documentId,
      data: {
        body: sanitizedBody,
      },
    })
    .then((res) => {
      const typedRes = res as {
        updateComment: CommentProps;
      };
      return typedRes.updateComment;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(
        error?.response?.data?.message ?? "Failed to fetch update comment"
      );
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
    .then((res) => {
      const typedRes = res as { deleteComment: { documentId: string } };
      return typedRes.deleteComment.documentId;
    })
    .catch((error) => {
      return Promise.reject(
        error?.response?.data?.message ?? "Failed to fetch delete comment"
      );
    });
};
