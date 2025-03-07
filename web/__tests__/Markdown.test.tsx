import "@testing-library/jest-dom";
import convertMarkdowToHtmlString from "../src/utils/markdown";

describe("convertMarkdowToHtmlString", () => {
  it("receives undefined data and returns empty string", async () => {
    const inputData = undefined;
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = "";
    expect(toTest).toEqual(expected);
  });

  it("receives valid data and returns html string", async () => {
    const inputData = "## Hello World";
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = "<h3>Hello World</h3>\n"; // Remark adds a line-break at the end of any tag
    expect(toTest).toEqual(expected);
  });

  it("receives underline content data and correctly store and rewrite this content", async () => {
    const inputData = "<u>Hello World</u>";
    const toTest = await convertMarkdowToHtmlString(inputData);
    const expected = "<p><u>Hello World</u></p>\n"; // Remark adds a line-break at the end of any tag
    expect(toTest).toEqual(expected);
  });
});
