import { createHighlighter, type Highlighter } from "shiki";

const blogTheme = {
  name: "blog-theme",
  colors: {
    "editor.background": "var(--blog-pre)",
  },
  settings: [
    {
      scope: [
        "comment",
        "comment.line.double-slash",
        "comment.block.documentation",
        "comment.block",
        "punctuation.definition.quote.begin.markdown",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-comment))",
      },
    },
    {
      scope: [
        "support.class",
        "support.type",
        "entity.name.type",
        "entity.name.namespace",
        "entity.other.attribute",
        "entity.name.scope-resolution",
        "entity.name.class",
        "storage.type.numeric.go",
        "storage.type.byte.go",
        "storage.type.boolean.go",
        "storage.type.string.go",
        "storage.type.uintptr.go",
        "storage.type.error.go",
        "storage.type.rune.go",
        "storage.type.cs",
        "storage.type.generic.cs",
        "storage.type.modifier.cs",
        "storage.type.variable.cs",
        "storage.type.annotation.java",
        "storage.type.generic.java",
        "storage.type.java",
        "storage.type.object.array.java",
        "storage.type.primitive.array.java",
        "storage.type.primitive.java",
        "storage.type.token.java",
        "storage.type.groovy",
        "storage.type.annotation.groovy",
        "storage.type.parameters.groovy",
        "storage.type.generic.groovy",
        "storage.type.object.array.groovy",
        "storage.type.primitive.array.groovy",
        "storage.type.primitive.groovy",
        "meta.type.cast.expr",
        "meta.type.new.expr",
        "support.constant.math",
        "support.constant.dom",
        "support.constant.json",
        "entity.other.inherited-class",
        "punctuation.separator.namespace.ruby",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-type))",
      },
    },
    {
      scope: ["string", "string.quoted.single", "string.quoted.double"],
      settings: { foreground: "hsl(var(--blog-code-string))" },
    },
    {
      scope: [
        "constant.language",
        "constant.character",
        "constant.other.option",
        "entity.name.tag", // HTML tags
        "entity.name.tag.html",
        "entity.name.tag.xml",
        "entity.name.tag.svg",
        "entity.name.tag.json",
        "entity.name.tag.yaml",
        "entity.name.tag.yaml",
        "entity.name.function.preprocessor",
        "keyword", // Keywords that don't fall in another category, like CSS units (px, em, rem, etc.)
        "keyword.control",
        "keyword.operator",
        "keyword.operator.noexcept",
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.cast",
        "keyword.operator.sizeof",
        "keyword.operator.alignof",
        "keyword.operator.typeid",
        "keyword.operator.alignas",
        "keyword.operator.instanceof",
        "keyword.operator.logical.python",
        "keyword.operator.wordlike",
        "markup.bold",
        "markup.heading",
        "markup.changed",
        "meta.diff.header",
        "meta.preprocessor",
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
        "punctuation.section.embedded.begin.php",
        "punctuation.section.embedded.end.php",
        "storage",
        "storage.type",
        "storage.modifier",
        "variable.language",
        "entity.other.attribute-name", // CSS classes
        "keyword.operator.quantifier.regexp", // +, *, ?, {, }
        "keyword.operator.assignment",
        "keyword.operator.comparison",
        "keyword.operator.bitwise",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-keyword))",
      },
    },
    {
      scope: [
        "constant.regexp",
        "constant.character.character-class.regexp",
        "keyword.operator.negation.regexp",
        "keyword.operator.or.regexp",
        "punctuation.definition.group.regexp",
        "string.regexp", // Everything between / ... /
        "support.other.parenthesis.regexp",
        "constant.character.set.regexp",
        "constant.other.character-class.regexp",
        "punctuation.character.set.begin.regexp",
        "punctuation.character.set.end.regexp",
        "punctuation.definition.character-class.regexp",
        "keyword.control.anchor.regexp", // ^, $, \b, \B
      ],
      settings: {
        foreground: "hsl(var(--blog-code-regexp))",
      },
    },
    {
      scope: [
        "punctuation.definition.group.assertion.regexp", // (?:), (?=), (?<=), (?!), (?<=)
      ],
      settings: {
        foreground: "hsl(var(--blog-code-regexp-darker))",
      },
    },
    {
      scope: [
        "constant.other.character-class.set.regexp", // Characters between [ ... ]
      ],
      settings: {
        foreground: "hsl(var(--blog-code-regexp-lighter))",
      },
    },
    {
      scope: [
        "constant.other.placeholder",
        "entity.name.variable",
        "meta.definition.variable.name",
        "meta.object-literal.key",
        "meta.structure.dictionary.key.python",
        "source.coffee.embedded",
        "support.function.git-rebase",
        "support.type.vendored.property-name",
        "support.variable",
        "constant.numeric",
        // "constant.other", // Alters the color of numbers in regex
      ],
      settings: {
        foreground: "hsl(var(--blog-code-class))",
      },
    },
    {
      scope: [
        "variable", // Variables, React components and arguments/parameters
        "variable.other.object", // Objects
        "variable.other.constant", // Constants
        "variable.other.readwrite", // Variables that are being written to
        "source.css variable", // CSS variables
        "entity.name.tag.less", // CSS tags
        "entity.name.tag.css", // CSS tags
        "entity.name.tag.scss", // CSS tags
      ],
      settings: {
        foreground: "hsl(var(--blog-code-readable))",
      },
    },
    {
      scope: [
        "entity.name.function",
        "entity.name.function.js",
        "entity.name.function.python",
        "entity.name.function.java",
        "variable.other.local",
        "entity.name.operator.custom-literal",
        "source.powershell variable.other.member",
        "support.constant.handlebars",
        "support.function",
        "entity.name.tag.jsx",
        "entity.name.tag.tsx",
        "keyword.operator.jsx",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-function))",
      },
    },
    {
      scope: [
        "support.type.property-name", // CSS properties
      ],
      settings: {
        foreground: "hsl(var(--blog-code-tag-css))",
      },
    },
    {
      scope: [
        "punctuation.section.embedded.begin.tsx",
        "punctuation.section.embedded.end.tsx",
        "variable.other.constant.tsx",
        "punctuation.section.embedded.begin.jsx",
        "punctuation.section.embedded.end.jsx",
        "variable.parameter",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-parameter))",
      },
    },
    {
      scope: [],
      settings: {},
    },
  ],
};

let highlighter: Highlighter | null = null;

const getHighlighter = async () => {
  if (!highlighter) {
    // Creating a new highlighter instance
    highlighter = await createHighlighter({
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
  }
  // Using an existing highlighter instance
  return highlighter;
};

export default getHighlighter;
export { blogTheme };
