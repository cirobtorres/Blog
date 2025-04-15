const GET_COMMENTS = `
query Nodes($pagination: PaginationArg, $filters: CommentFiltersInput, $sort: [String]) {
  comments_connection(pagination: $pagination, filters: $filters, sort: $sort) {
    nodes {
      documentId
      body
      createdAt
      updatedAt
      parent_id {
        documentId
      }
      comment_likes {
        documentId
        users_permissions_user {
          documentId
        }
      }
      users_permissions_user {
        documentId
        confirmed
        blocked
        username
      }
      comments {
        documentId
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}`;

const GET_COMMENT = `
query GetComment($documentId: ID!) {
  comment(documentId: $documentId) {
    documentId
    body
    createdAt
    updatedAt
    parent_id {
      documentId
    }
    comment_likes {
      documentId
      users_permissions_user {
        documentId
      }
    }
    users_permissions_user {
      documentId
      confirmed
      blocked
      username
    }
    comments {
      documentId
    }
  }
}`;

const POST_COMMENT = `
mutation CreateComment($data: CommentInput!) {
  createComment(data: $data) {
    documentId
    body
    createdAt
    updatedAt
    parent_id {
      documentId
    }
    comment_likes {
      documentId
      users_permissions_user {
        documentId
      }
    }
    users_permissions_user {
      documentId
      confirmed
      blocked
      username
    }
    comments {
      documentId
    }
  }
}`;

const UPDATE_COMMENT = `
mutation UpdateComment($documentId: ID!, $data: CommentInput!) {
  updateComment(documentId: $documentId, data: $data) {
    documentId
    body
    createdAt
    updatedAt
    parent_id {
      documentId
    }
    comment_likes {
      documentId
      users_permissions_user {
        documentId
      }
    }
    users_permissions_user {
      documentId
      confirmed
      blocked
      username
    }
    comments {
      documentId
    }
  }
}`;

const DELETE_COMMENT = `
mutation DeleteComment($documentId: ID!) {
  deleteComment(documentId: $documentId) {
    documentId
  }
}`;

const COUNT_COMMENTS = `
query PageInfo($filters: CommentFiltersInput) {
  comments_connection(filters: $filters) {
    pageInfo {
      total
    }
  }
}`;

const COUNT_COMMENT_LIKES = `
query CommentLikes($filters: CommentLikeFiltersInput) {
  commentLikes(filters: $filters) {
    documentId
    users_permissions_user {
      documentId
    }
  }
}`;

const LIKE_COMMENT = `
mutation CreateCommentLike($data: CommentLikeInput!) {
  createCommentLike(data: $data) {
    documentId
    users_permissions_user {
      documentId
    }
  }
}`;

const DISLIKE_COMMENT = `
mutation DeleteCommentLike($documentId: ID!) {
  deleteCommentLike(documentId: $documentId) {
    documentId
  }
}`;

export {
  GET_COMMENTS,
  GET_COMMENT,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  COUNT_COMMENTS,
  COUNT_COMMENT_LIKES,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
};
