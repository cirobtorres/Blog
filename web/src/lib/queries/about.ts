const GET_ABOUT = `
query About {
  about {
    documentId
    title
    updatedAt
    createdAt
    publishedAt
    blocks {
      ... on ComponentSharedRichText {
        id
        body
      }
      ... on ComponentSharedMedia {
        id
        file {
          documentId
          url
          alternativeText
          caption
          width
          height
        }
      }
      ... on ComponentSharedQuote {
        id
        body
        title
      }
      ... on ComponentSharedSlider {
        id
        files {
          documentId
          url
          alternativeText
          caption
          width
          height
        }
      }
    }
  }
}`;

export { GET_ABOUT };
