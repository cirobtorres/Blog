import { Highlighter } from "shiki";
import highlightPreBlocks from "../src/utils/highlight";

// Mock da função `codeToHtml` do Shiki
const mockHighlighter: Partial<Highlighter> = {
  codeToHtml: jest.fn(
    (code) => `<pre><code class="highlighted">${code}</code></pre>`
  ),
};

describe("highlightPreBlocks", () => {
  it("must highlight blocks <pre><code></code></pre>", () => {
    const htmlInput = `<pre><code class="language-js">console.log("Hello, world!");</code></pre>`;
    const expectedOutput = `<pre><code class="highlighted">console.log("Hello, world!");</code></pre>`;

    const result = highlightPreBlocks(
      htmlInput,
      mockHighlighter as Highlighter
    );
    expect(result).toContain(expectedOutput);
  });

  it("converts to plain text (no class) if no language is passed as an argument", () => {
    const htmlInput = `<pre><code>console.log("Hello, world!");</code></pre>`;
    const expectedOutput = `<pre><code>console.log("Hello, world!");</code></pre>`;

    const result = highlightPreBlocks(
      htmlInput,
      mockHighlighter as Highlighter
    );
    expect(result).toContain(expectedOutput);
  });

  // TODO it('add highlight background through class="line highlight" classes', () => {});

  it("is able to handle multiple lines of code", () => {
    const htmlInput = `
      <pre><code class="language-js">console.log("Hello");</code></pre>
      <pre><code class="language-python">print("Hello")</code></pre>
    `;
    const expectedJsOutput = `<pre><code class="highlighted">console.log("Hello");</code></pre>`;
    const expectedPythonOutput = `<pre><code class="highlighted">print("Hello")</code></pre>`;

    const result = highlightPreBlocks(
      htmlInput,
      mockHighlighter as Highlighter
    );
    expect(result).toContain(expectedJsOutput);
    expect(result).toContain(expectedPythonOutput);
  });

  it("leaves untouched tags which are not blocks of code <pre><code></code></pre>", () => {
    const htmlInput = `<p>Isso é um parágrafo normal.</p>`;
    const result = highlightPreBlocks(
      htmlInput,
      mockHighlighter as Highlighter
    );
    expect(result).toBe(htmlInput);
  });

  it("can handle error when highlightning code", () => {
    const htmlInput = `<pre><code class="language-js">console.log("Erro");</code></pre>`;

    // Forçar erro no mock do highlighter
    mockHighlighter.codeToHtml = jest.fn(() => {
      throw new Error("Falha no destaque");
    });

    console.error = jest.fn(); // Mock para suprimir erro no console

    const result = highlightPreBlocks(
      htmlInput,
      mockHighlighter as Highlighter
    );
    expect(result).toBe(htmlInput);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Erro ao destacar código com Shiki")
    );
  });
});
