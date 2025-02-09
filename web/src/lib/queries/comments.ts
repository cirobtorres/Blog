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
      users_permissions_user {
        documentId
        confirmed
        blocked
        username
      }
    }
  }
}`;

export { POST_COMMENT, GET_COMMENTS };
