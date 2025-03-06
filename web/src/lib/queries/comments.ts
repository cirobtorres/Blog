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
      liked_by {
        documentId
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
    liked_by {
      documentId
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

export {
  GET_COMMENTS,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  COUNT_COMMENTS,
};
