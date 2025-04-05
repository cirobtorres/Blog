import { faker } from "@faker-js/faker";

export function generateRandomCreatedAt() {
  const createdAt = faker.date.past().toISOString();
  const updatedAt = createdAt;
  const publishedAt = createdAt;
  return {
    createdAt,
    updatedAt,
    publishedAt,
  };
}
