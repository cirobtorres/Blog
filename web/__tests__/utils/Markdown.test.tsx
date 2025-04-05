import { faker } from "@faker-js/faker";
import { randomInt } from "../../__mocks__/utilities/randomInt";
import convertMarkdowToHtmlString from "../../src/utils/markdown";

const h1 = faker.lorem.sentence(randomInt(6, 12));
const h2 = faker.lorem.sentence(randomInt(6, 12));
const h3 = faker.lorem.sentence(randomInt(6, 12));
const h4 = faker.lorem.sentence(randomInt(6, 12));
const h5 = faker.lorem.sentence(randomInt(6, 12));
const h6 = faker.lorem.sentence(randomInt(6, 12));
const href = faker.internet.url();

describe("convertMarkdowToHtmlString", () => {
  it("receives undefined data and returns empty string", async () => {
    const inputData = undefined;
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = "";
    expect(toTest).toEqual(expected);
  });

  it("receives valid data and returns html string", async () => {
    // h1 is not allowed in Article Section.
    // h1 are converted to h2, h2 to h3 and so on.
    // h6 is converted to h6 (no change).
    const inputData1 = `# ${h1}`;
    const inputData2 = `## ${h2}`;
    const inputData3 = `### ${h3}`;
    const inputData4 = `#### ${h4}`;
    const inputData5 = `##### ${h5}`;
    const inputData6 = `###### ${h6}`;
    const toTest1 = await convertMarkdowToHtmlString(inputData1);
    const toTest2 = await convertMarkdowToHtmlString(inputData2);
    const toTest3 = await convertMarkdowToHtmlString(inputData3);
    const toTest4 = await convertMarkdowToHtmlString(inputData4);
    const toTest5 = await convertMarkdowToHtmlString(inputData5);
    const toTest6 = await convertMarkdowToHtmlString(inputData6);
    const expected1 = `<h2>${h1}</h2>\n`; // Remark adds a line-break at the end of any tag by default.
    const expected2 = `<h3>${h2}</h3>\n`; // Remark adds a line-break at the end of any tag by default.
    const expected3 = `<h4>${h3}</h4>\n`; // Remark adds a line-break at the end of any tag by default.
    const expected4 = `<h5>${h4}</h5>\n`; // Remark adds a line-break at the end of any tag by default.
    const expected5 = `<h6>${h5}</h6>\n`; // Remark adds a line-break at the end of any tag by default.
    const expected6 = `<h6>${h6}</h6>\n`; // Remark adds a line-break at the end of any tag by default.
    expect(toTest1).toEqual(expected1);
    expect(toTest2).toEqual(expected2);
    expect(toTest3).toEqual(expected3);
    expect(toTest4).toEqual(expected4);
    expect(toTest5).toEqual(expected5);
    expect(toTest6).toEqual(expected6);
  });

  it("preserves underline content", async () => {
    // Strapi uses wysiwyg markdown for richtext,
    // but the underline code is sent with HTML tags,
    // which is cleared by remark during decode process.
    // convertMarkdowToHtmlString depends on remark to convert wysiwyg string to html string.
    const inputData = `<u>${h1}</u>`;
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = `<p><u>${h1}</u></p>\n`; // Remark adds a line-break at the end of any tag.
    expect(toTest).toEqual(expected);
  });

  it("preserves strikethrough content", async () => {
    // Strapi uses wysiwyg markdown for richtext,
    // but the strikethrough code is sent with HTML tags,
    // which is cleared by remark during decode process.
    // convertMarkdowToHtmlString depends on remark to convert wysiwyg string to html string.
    const inputData = `~~${h1}~~`;
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = `<p><strike>${h1}</strike></p>\n`; // Remark adds a line-break at the end of any tag.
    expect(toTest).toEqual(expected);
  });

  it("removes <a> and <img> tags from content", async () => {
    const inputData = `<a href="${href}">${h1}<a/><img src="${href}" alt="${h2}"/>`;
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = `<p>${h1}</p>\n`; // Remark adds a line-break at the end of any tag.
    expect(toTest).toEqual(expected);
  });
});
