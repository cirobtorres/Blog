import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";

export const createTagMock = () => ({
  documentId: faker.string.uuid(),
  name: faker.lorem.sentence(randomInt(1, 4)),
});

export const createTagsMock = () =>
  Array.from({ length: randomInt(5, 15) }, () => createTagMock());
