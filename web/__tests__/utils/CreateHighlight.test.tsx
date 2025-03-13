import getHighlighter, { blogTheme } from "../../src/utils/createHighlight";
import { createHighlighter } from "shiki";

jest.mock("shiki", () => ({
  createHighlighter: jest.fn(),
}));

describe("createHighlight", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a correct instance of highlighter", async () => {
    const mockHighlighter = {
      codeToHtml: jest.fn().mockReturnValue("<div>Highlighted code</div>"),
    };
    (createHighlighter as jest.Mock).mockResolvedValue(mockHighlighter);
    const highlighter = await getHighlighter();
    expect(createHighlighter).toHaveBeenCalledWith({
      themes: [blogTheme],
      langs: [
        "html",
        "css",
        "java",
        "javascript",
        "typescript",
        "python",
        "kotlin",
        "sql",
        "regex",
        "plaintext",
      ],
    });

    expect(highlighter).toBe(mockHighlighter);
  });

  it("deve criar uma nova instância de highlighter apenas na primeira chamada", async () => {
    const mockedHighlighter = { someMethod: jest.fn() };
    (createHighlighter as jest.Mock).mockResolvedValue(mockedHighlighter);

    const highlighter1 = await getHighlighter();
    expect(createHighlighter).toHaveBeenCalledTimes(1); // Verifica que createHighlighter foi chamado uma vez
    expect(highlighter1).toBe(mockedHighlighter); // Verifica se a instância foi criada corretamente

    const highlighter2 = await getHighlighter();
    expect(createHighlighter).toHaveBeenCalledTimes(1); // Verifica que createHighlighter ainda foi chamado uma vez
    expect(highlighter2).toBe(mockedHighlighter);

    expect(highlighter1).toBe(highlighter2); // Verifica que a mesma instância foi reutilizada
  });
});
