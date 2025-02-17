const POST_COMMENT = `
mutation CreateComment($data: CommentInput!) {
  createComment(data: $data) {
    documentId
  }
}`;

const POST_REPLY = `
mutation CreateComment($data: CommentInput!) {
  createComment(data: $data) {
    documentId
  }
}`;

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

const GET_NESTED_COMMENTS = `
query Nodes($filters: CommentFiltersInput, $pagination: PaginationArg) {
  comments_connection(filters: $filters, pagination: $pagination) {
    nodes {
      documentId
      body
      createdAt
      updatedAt
      liked_by {
        documentId
      }
      users_permissions_user {
        documentId
        confirmed
        blocked
        username
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

const LIKE_COMMENT = `
mutation Liked_by($documentId: ID!, $data: CommentInput!) {
  updateComment(documentId: $documentId, data: $data) {
    liked_by {
      documentId
    }
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
  POST_COMMENT,
  POST_REPLY,
  GET_COMMENTS,
  GET_NESTED_COMMENTS,
  LIKE_COMMENT,
  COUNT_COMMENTS,
};
