import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import slugify from "../src/utils/slugify";

export const createToolMock = () => ({
  documentId: faker.string.uuid(),
  ...(() => {
    const name = faker.lorem.sentence(randomInt(5, 12));
    const slug = slugify(name);
    return { name, slug };
  })(),
  link: faker.system.directoryPath() + faker.system.commonFileName("png"),
  file: {
    documentId: faker.string.uuid(),
    url: faker.system.directoryPath() + faker.system.commonFileName("png"),
    alternativeText: faker.lorem.sentence(randomInt(5, 15)),
    caption: faker.lorem.sentence(randomInt(9, 20)),
    width: 30,
    height: 30,
  },
});

export const createToolsMock = () =>
  Array.from({ length: randomInt(5, 15) }, () => createToolMock());
