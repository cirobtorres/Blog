import { Highlighter } from "shiki";
import highlightPreBlocks from "../../src/utils/highlight";

const mockHighlighter: Partial<Highlighter> = {
  // Function to mock // [!code highlight:<number_of_lines>] from shiki
  codeToHtml: jest.fn((code) => {
    const lines = code.split("\n");

    let highlightCount = 0;
    const highlightedLines: string[] = [];

    lines.forEach((line) => {
      // Search for [!code highlight:<number_of_lines>]
      const match = line.match(/\/\/ \[!code highlight:(\d+)\]/);
      if (match) {
        highlightCount = parseInt(match[1], 10); // Extract number of lines
        return; // Exclude [!code highlight:<number_of_lines>] line from code block
      }

      // While there are still lines to highlight...
      if (highlightCount > 0) {
        highlightedLines.push(
          `<span class="line highlighted">${line.trim()}</span>`
        );
        highlightCount--;
      } else {
        highlightedLines.push(
          `<span class="highlighted">${line.trim()}</span>`
        );
      }
    });

    return `<pre><code class="highlighted">${highlightedLines.join(
      "\n"
    )}</code></pre>`;
  }),
};

describe("highlightPreBlocks", () => {
  it("must highlight blocks <pre><code></code></pre>", () => {
    const htmlInput = `<pre><code class="language-js">console.log("Hello, world!");</code></pre>`;
    const expectedOutput = `<pre><code class=\"highlighted\"><span class=\"highlighted\">console.log(\"Hello, world!\");</span></code></pre>`;

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

  it('highlights background of the span tags through class="line highlighted" classes', () => {
    const htmlInput = `<pre>
  <code class="language-js">
    // [!code highlight:2]
    const a = 1;
    const b = 2;
    const c = a + b;
  </code>
</pre>`;

    const expectedOutput = `<pre><code class=\"highlighted\"><span class=\"line highlighted\">const a = 1;</span>
<span class=\"line highlighted\">const b = 2;</span>
<span class=\"highlighted\">const c = a + b;</span></code></pre>`;

    const result = highlightPreBlocks(
      htmlInput,
      mockHighlighter as Highlighter
    );
    expect(result).toContain(expectedOutput);
  });

  it("is able to handle multiple lines of code", () => {
    const htmlInput = `
      <pre><code class="language-js">console.log("Hello");</code></pre>
      <pre><code class="language-python">print("Hello")</code></pre>
    `;
    const expectedJsOutput = `<pre><code class=\"highlighted\"><span class=\"highlighted\">console.log(\"Hello\");</span></code></pre>`;
    const expectedPythonOutput = `<pre><code class=\"highlighted\"><span class=\"highlighted\">print(\"Hello\")</span></code></pre>`;

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
      expect.stringContaining("Failed highlighting code with Shiki")
    );
  });
});
