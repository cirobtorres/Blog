const POST_COMMENT = `
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
      likedBy {
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
        body
        createdAt
        updatedAt
        likedBy {
          documentId
        }
        users_permissions_user {
          documentId
          confirmed
          blocked
          username
        }
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

export { POST_COMMENT, GET_COMMENTS, LIKE_COMMENT };
