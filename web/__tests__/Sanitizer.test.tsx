import "@testing-library/jest-dom";
import sanitizer from "../src/utils/sanitizer";

describe("Sanitizer", () => {
  it("sanitize the html tags", () => {
    const rawString =
      '<p><div><h1>Hello World TAG h1</h1></div></p><p style="color:red">Hello World 1</p><p>Hello World 2</p><p><h2>Hello World TAG h2</h2></p><p><a href="https://google.com.br">Hello World link</a></p>';
    const toTest = sanitizer(rawString);
    const expected =
      "<p></p>Hello World TAG h1<p></p><p>Hello World 1</p><p>Hello World 2</p><p></p>Hello World TAG h2<p></p><p>Hello World link</p>";
    expect(toTest).toEqual(expected);
  });
});
