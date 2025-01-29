const GET_ARTICLES = `
query Articles($sort: [String], $filters: ArticleFiltersInput, $pagination: PaginationArg) {
  articles(sort: $sort, filters: $filters, pagination: $pagination) {
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
      ... on ComponentSharedFeatured {
        __typename
        id
        title
        featured
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
      ... on ComponentSharedQuiz {
        __typename
        id
        json
      }
      ... on ComponentSharedCodeblock {
        __typename
        id
        filename
        language
        code
      }
    }
  }
}`;

const COUNT_ARTICLES = `
query($filters: ArticleFiltersInput) {
  articles_connection(filters: $filters) {
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

export { GET_ARTICLES, GET_ARTICLE, COUNT_ARTICLES };
