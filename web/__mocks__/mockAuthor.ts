import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import { randomRelativeURL } from "./utilities/randomRelativeURL";

export const createAuthorMock = (avatar = true) => ({
  documentId: faker.string.uuid(),
  name: faker.person.firstName(),
  avatar: avatar
    ? {
        documentId: faker.string.uuid(),
        ...randomRelativeURL(),
        alternativeText: faker.lorem.sentence(randomInt(5, 10)),
      }
    : null,
});
