"use server";

import he from "he";
import React from "react";
import { createHighlighter } from "shiki";

// https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-themes/themes/dark-plus.json
const blogTheme = {
  name: "blog-theme",
  settings: [
    {
      scope: [
        "comment",
        "punctuation.definition.quote.begin.markdown",
        "source.css variable", // CSS variables
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
      scope: ["string"],
      settings: { foreground: "hsl(var(--blog-code-string))" },
    },
    {
      scope: [
        "constant.language",
        "constant.character",
        "constant.other.option",
        "entity.name.tag",
        "entity.name.function.preprocessor",
        "keyword",
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
      ],
      settings: {
        foreground: "hsl(var(--blog-code-keyword))",
      },
    },
    {
      scope: [
        "constant.regexp", // ., *, +, ?, |, (, ), [, ], {, }, ^, $, \, /, <, >, =, !
        "constant.character.character-class.regexp",
        "constant.other.character-class.set.regexp",
        "keyword.operator.negation.regexp", // ^
        "keyword.operator.or.regexp", // |
        "punctuation.definition.group.regexp",
        "punctuation.definition.group.assertion.regexp", // (?=, (?!, (?<=, (?<!, (?>, (?(, (?(
        "punctuation.definition.character-class.regexp",
        "punctuation.character.set.begin.regexp",
        "punctuation.character.set.end.regexp",
        "string.regexp", // Everything between / ... /
        "support.other.parenthesis.regexp",
        "constant.character.set.regexp", // \b, \B, \d, \D, \s, \S, \w, \W
        "constant.other.character-class.regexp", // \b, \B, \d, \D, \s, \S, \w, \W
      ],
      settings: {
        foreground: "hsl(var(--blog-code-regexp))",
      },
    },
    {
      scope: [
        "keyword.control.anchor.regexp", // ^, $, \b, \B
        "keyword.operator.quantifier.regexp", // +, *, ?, {, }
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
        "support.type.property-name",
        "support.variable",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-class))",
      },
    },
    {
      scope: ["variable"],
      settings: {
        foreground: "hsl(var(--blog-code-readable))",
      },
    },
    {
      scope: [
        "entity.name.function",
        "entity.name.operator.custom-literal",
        "source.powershell variable.other.member",
        "support.constant.handlebars",
        "support.function",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-function))",
      },
    },
    {
      scope: [
        "entity.name.tag.less",
        "entity.name.tag.css",
        "entity.name.tag.scss",
      ],
      settings: {
        foreground: "hsl(var(--blog-code-tag-css))",
      },
    },
  ],
};

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

const getCachedHighlighter = React.cache(async () => {
  if (highlighter === null) {
    highlighter = await await createHighlighter({
      themes: [blogTheme],
      langs: [
        "html",
        "css",
        "java",
        "javascript",
        "typescript",
        "python",
        "plaintext",
      ],
    });
  }

  return highlighter;
});

function decodeHtmlEntities(str: string) {
  return he.decode(str);
}

async function highlightPreBlocks(htmlContent: string) {
  // Captures <pre><code class="language-<linguagem>"> and its content and apply code highlight to it
  const preCodeRegex =
    /<pre>\s*<code\s+class="language-([\w-]+)">([\s\S]*?)<\/code>\s*<\/pre>/gi;

  const highlighter = await getCachedHighlighter();

  const processedHtml = htmlContent.replace(
    preCodeRegex,
    (match, language, codeContent) => {
      try {
        const decodedHtml = decodeHtmlEntities(codeContent.trim());

        const highlightedCode = highlighter.codeToHtml(decodedHtml, {
          theme: "blog-theme",
          lang: language || "plaintext",
        });

        return highlightedCode;
      } catch (error) {
        // Returns original non formated codeblock in case there is an error
        console.error(
          `Error while trying to highlight codeblock with shiki: ${error}`
        );
        return match;
      }
    }
  );

  return processedHtml;
}

export default highlightPreBlocks;
