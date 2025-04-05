import { faker } from "@faker-js/faker";
import { randomInt } from "./utilities/randomInt";
import { generateRandomCreatedAt } from "./utilities/randomISOdatetime";

const globalDocumentId = faker.string.uuid();
const globalSiteName = faker.company.name();
const globalSiteDescription = faker.lorem.sentence(randomInt(12, 22));

const faviconDocumentId = faker.string.uuid();
const faviconUrl = faker.image.url();
const faviconAlternativeText = faker.lorem.words(randomInt(1, 3));
const faviconCaption = faker.lorem.words(randomInt(1, 3));

export const mockGlobalData: Global = {
  documentId: globalDocumentId,
  siteName: globalSiteName,
  siteDescription: globalSiteDescription,
  ...generateRandomCreatedAt(),
  favicon: {
    documentId: faviconDocumentId,
    url: faviconUrl,
    alternativeText: faviconAlternativeText,
    caption: faviconCaption,
    width: 24,
    height: 24,
    ...generateRandomCreatedAt(),
  },
};
