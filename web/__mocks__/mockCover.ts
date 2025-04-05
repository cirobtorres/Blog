import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import { randomRelativeURL } from "./utilities/randomRelativeURL";

export const createCoverMock = (width = 512, height = 512) => ({
  documentId: faker.string.uuid(),
  ...randomRelativeURL(),
  alternativeText: faker.lorem.sentence(randomInt(5, 10)),
  caption: faker.lorem.sentence(randomInt(10, 20)),
  width,
  height,
});
