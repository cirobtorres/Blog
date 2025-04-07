import { faker } from "@faker-js/faker";

export const mockTopic = () => ({
  documentId: faker.string.uuid(),
  name: faker.lorem.word(),
  slug: faker.lorem.slug(),
  description: faker.lorem.sentence(),
});
