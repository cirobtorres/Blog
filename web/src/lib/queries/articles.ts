const GET_ARTICLES = `
query Articles($sort: [String], $pagination: PaginationArg) {
  articles(sort: $sort, pagination: $pagination) {
    documentId
    title
    slug
    description
    createdAt
    updatedAt
    publishedAt
    cover {
      documentId
      url
      alternativeText
    }
    category {
      documentId
      name
    }
    author {
      name
      avatar {
        documentId
        url
        alternativeText
      }
    }
  }
}`;

const GET_ARTICLE = `
query Blocks($documentId: ID!) {
  article(documentId: $documentId) {
    documentId
    title
    slug
    description
    createdAt
    updatedAt
    publishedAt
    cover {
      url
      alternativeText
      caption
    }
    author {
      name
      avatar {
        url
        alternativeText
      }
    }
    category {
      documentId
      name
    }
    subCategories {
      documentId
      name
      link
      svg
    }
    tags {
      documentId
      name
    }
    blocks {
      ... on ComponentSharedRichText {
        __typename
        id
        body
      }
      ... on ComponentSharedQuote {
        __typename
        id
        body
        title
      }
      ... on ComponentSharedMedia {
        __typename
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
        __typename
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

export { GET_ARTICLES, GET_ARTICLE };
