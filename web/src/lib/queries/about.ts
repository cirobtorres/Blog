const GET_ABOUT = `
query About {
  about {
    documentId
    title
    github_link
    github_blog_link
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
