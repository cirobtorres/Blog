const GET_GLOBAL = `
query Global {
  global {
    documentId
    siteName
    siteDescription
    footer
    createdAt
    updatedAt
    publishedAt
    favicon {
      documentId
      url
      alternativeText
      caption
      createdAt
      updatedAt
      publishedAt
      width
      height
    }
  }
}`;

export { GET_GLOBAL };
