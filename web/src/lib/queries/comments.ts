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
query Article($documentId: ID!) {
  article(documentId: $documentId) {
    comments {
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
      comments {
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
      users_permissions_user {
        documentId
        confirmed
        blocked
        username
      }
    }  
  }
}`;

const LIKE_COMMENT = `
mutation UpdateComment($documentId: ID!, $data: CommentInput!) {
  updateComment(documentId: $documentId, data: $data) {
    documentId
    like
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

export { POST_COMMENT, POST_REPLY, GET_COMMENTS, LIKE_COMMENT, COUNT_COMMENTS };
