import { faker } from "@faker-js/faker";

export const randomInt = (min: number, max: number) =>
  faker.number.int({ min, max });
