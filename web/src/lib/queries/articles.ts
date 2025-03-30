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
    topic {
      documentId
      name
      slug
      description
    }
    tools {
      documentId
      name
      slug
      link
      file {
        documentId
        url
        alternativeText
        caption
        width
        height
      }
    }
    tags {
      documentId
      name
    }
    author {
      documentId
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
      documentId
      name
      avatar {
        url
        alternativeText
      }
    }
    topic {
      documentId
      name
      slug
      description
    }
    tools {
      documentId
      name
      slug
      link
      file {
        documentId
        url
        alternativeText
        caption
        width
        height
      }
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
      ... on ComponentSharedDetails {
        __typename
        id
        collapsible
        title
        svg
        body
      }
      ... on ComponentSharedQuiz {
        __typename
        id
        questions {
          uuid
          question
          options {
            option
            isCorrect
          }
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
