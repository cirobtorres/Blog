import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import { generateRandomCreatedAt } from "./utilities/randomISOdatetime";

export const createAboutMock = () => ({
  documentId: faker.string.uuid(),
  title: faker.lorem.words(randomInt(5, 12)),
  ...(() => {
    const github_link = faker.internet.url();
    const github_blog_link = github_link + "/" + faker.lorem.slug(3);
    return { github_link, github_blog_link };
  })(),
  ...generateRandomCreatedAt(),
  blocks: [],
});
