import "@testing-library/jest-dom";
import slugify from "../../src/utils/slugify";

describe("Slugify", () => {
  it("slugify correctly", () => {
    const inputData =
      "   O ;sabIÁ  Ñãô SA::BiA qUE&* __O sÀBiÓ_sa!(BIA   As\\$#soBIa@r   2 1    ";
    const toTest = slugify(inputData);
    const expected = "o-sabia-nao-sabia-que-o-sabio-sabia-assobiar-2-1";
    expect(toTest).toEqual(expected);
  });
});
