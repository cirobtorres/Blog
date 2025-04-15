const GET_ABOUT = `
query About {
  about {
    documentId
    title
    display_name
    github_link
    github_blog_link
    media {
      documentId
      url
      alternativeText
    }
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
