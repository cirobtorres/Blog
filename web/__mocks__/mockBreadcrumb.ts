import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import slugify from "@/utils/slugify";

export const createBreadcrumbMock = () => ({
  documentId: faker.string.uuid(),
  ...(() => {
    const name = faker.lorem.words(randomInt(2, 5));
    const slug = slugify(name);
    return { name, slug };
  })(),
  description: faker.lorem.sentence(randomInt(5, 12)),
});
