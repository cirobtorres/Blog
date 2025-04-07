import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import { generateRandomCreatedAt } from "./utilities/randomISOdatetime";
import slugify from "@/utils/slugify";
import { createCoverMock } from "./mockCover";
import { createAuthorMock } from "./mockAuthor";
import { mockTopic } from "./mockTopic";

export function createArticleMock() {
  return {
    documentId: faker.string.uuid(),
    ...(() => {
      const title = faker.lorem.sentence(randomInt(5, 12));
      const slug = slugify(title);
      return { title, slug };
    })(),
    description: faker.lorem.sentence(randomInt(14, 28)),
    ...generateRandomCreatedAt(),
    cover: createCoverMock(),
    author: createAuthorMock(),
    topic: mockTopic(),
    tools: [],
    tags: [],
    blocks: [],
  };
}

export const mockArticles = (length = randomInt(5, 10)) =>
  Array.from({ length }, () => ({
    ...createArticleMock(),
  }));

export const mockArticle = createArticleMock();

export const mockArticlesCount = {
  articles_connection: {
    pageInfo: { total: 100, pageCount: 10, pageSize: 10, page: 1 },
  },
};
