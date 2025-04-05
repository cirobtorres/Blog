import { faker } from "@faker-js/faker";
import sanitizer from "../../src/utils/sanitizer";
import { randomInt } from "../../__mocks__/utilities/randomInt";

const h1 = faker.lorem.sentence(randomInt(6, 12));
const h2 = faker.lorem.sentence(randomInt(6, 12));
const p1 = faker.lorem.sentence(randomInt(10, 25));
const p2 = faker.lorem.sentence(randomInt(20, 45));
const p3 = faker.lorem.sentence(randomInt(2, 5));
const href = faker.internet.url();

describe("Sanitizer", () => {
  it("sanitize the html tags", () => {
    // Tiptap adds paragraphs to each line (<p>)
    // These empty <p> tags are removed by other functions/components
    // Sanitizer is being used on Comment component to remove not allowed tags from user's comments
    const rawString =
      `<p><div><h1>${h1}</div></p>` + // Headers and divs (mannually created) are not allowed
      `<p style="color:red">${p1}</p>` + // Applying styles mannually is not allowed
      `<p>${p2}</p>` +
      `<p><h2>${h2}</h2></p>` + // Headers are not allowed
      `<p><a href="${href}">${p3}</a></p>`; // Links are not allowed
    const toTest = sanitizer(rawString);
    const expected =
      `<p></p>` +
      `${h1}` +
      `<p></p>` +
      `<p>${p1}</p>` +
      `<p>${p2}</p>` +
      `<p></p>` +
      `${h2}` +
      `<p></p>` +
      `<p>${p3}</p>`;
    expect(toTest).toEqual(expected);
  });
});
