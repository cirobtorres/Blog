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
      caption
      width
      height
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
      documentId
      url
      alternativeText
      caption
      width
      height
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

const COUNT_ARTICLES = `
query {
  articles_connection {
    __typename
    pageInfo {
      __typename
      page
      pageCount
      pageSize
      total
    }
  }
}`;

const QUERY_ARTICLES = `
query Articles($filters: ArticleFiltersInput) {
  articles(filters: $filters) {
    documentId
    title
    slug
    cover {
      documentId
      url
      alternativeText
    }
  }
}`;

export { GET_ARTICLES, GET_ARTICLE, COUNT_ARTICLES, QUERY_ARTICLES };
