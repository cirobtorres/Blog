import { faker } from "@faker-js/faker";
import { randomInt } from "./randomInt";

export const randomRelativeURL = () => ({
  url:
    "/" +
    faker.word.words(randomInt(3, 5)).replace(/ /g, "/") +
    "/" +
    faker.system.commonFileName("png"),
});
