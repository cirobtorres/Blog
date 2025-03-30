import TagsRelated from "@/components/TagsRelated";
import { render, screen } from "@testing-library/react";

describe("Categories", () => {
  const topicMocked = {
    documentId: "123",
    name: "Ciência da Computação",
    slug: "ciencia-da-computacao",
    description: "Descrição da categoria",
  };

  const toolsMocked = [
    {
      documentId: "14",
      name: "Next.js",
      slug: "next-js",
      link: "https://nextjs.org/",

      file: {
        documentId: "aabbcd",
        url: "",
        alternativeText: "",
        caption: "",
        width: 24,
        height: 24,
      },
    },
    {
      documentId: "16",
      name: "Nest.js",
      slug: "next-js",
      link: "https://nestjs.com/",

      file: {
        documentId: "aabbcd123as",
        url: "",
        alternativeText: "",
        caption: "",
        width: 24,
        height: 24,
      },
    },
  ];

  const tagsMocked = [
    {
      documentId: "8",
      name: "Programação",
    },
    {
      documentId: "11",
      name: "linguagem de Programação",
    },
    {
      documentId: "19",
      name: "Banco de Dados",
    },
    {
      documentId: "33",
      name: "Diagrama UML",
    },
    {
      documentId: "35",
      name: "Programação",
    },
  ];

  test("Categories component matches the snapshot", () => {
    const { asFragment } = render(
      <TagsRelated topic={topicMocked} tools={toolsMocked} tags={tagsMocked} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Topic", () => {
    test("Topic to be in the document", () => {
      render(<TagsRelated topic={topicMocked} />);

      const topic = screen.queryByTestId("article-topic");
      expect(topic).toBeInTheDocument();
    });

    test("Topic accessibility attributes are rendered", () => {
      render(<TagsRelated topic={topicMocked} />);

      const topic = screen.queryByTestId("article-topic");
      expect(topic).toHaveAttribute("role", "region");
      expect(topic).toHaveAttribute(
        "aria-label",
        `Tópico: ${topicMocked.name}`
      );
      const h2Component = topic?.querySelector("h2");
      expect(h2Component).toHaveAttribute(
        "id",
        `topic-title-${topicMocked.documentId}`
      );
      expect(h2Component).toHaveTextContent(topicMocked.name);
    });
  });

  describe("Tools", () => {
    test("Tools to not be in the document if article has no tools", () => {
      render(<TagsRelated topic={topicMocked} />);

      const tools = screen.queryByTestId("article-tools");
      expect(tools).toBeNull();
      expect(tools).not.toBeInTheDocument();
    });

    test("Subcategories to not be in the document if tools is an empty array", () => {
      render(<TagsRelated topic={topicMocked} tools={[]} />);

      const tools = screen.queryByTestId("article-tools");
      expect(tools).toBeNull();
      expect(tools).not.toBeInTheDocument();
    });

    test("Subcategories accessibility attributes are rendered", () => {
      render(<TagsRelated topic={topicMocked} tools={toolsMocked} />);

      // article
      const tools = screen.queryByTestId("article-tools");
      expect(tools).toHaveAttribute("aria-label", "Ferramentas e tecnologias");

      // ul
      const toolsList = screen.queryByTestId("article-tools-list");
      expect(toolsList).toHaveAttribute("role", "list");
      expect(toolsList).toHaveAttribute(
        "aria-label",
        "Lista das ferramentas e tecnologias abordadas neste artigo"
      );

      const listItems = toolsList?.getElementsByTagName("li");
      expect(listItems?.length).toBe(toolsMocked.length);

      // li
      Array.from(listItems || []).forEach((listItem, index) => {
        const tool = toolsMocked[index];
        expect(listItem).toHaveAttribute("data-testid", tool.documentId);
        expect(listItem).toHaveAttribute("role", "listitem");

        const linklement = listItem.querySelector("a");
        expect(linklement).toHaveAttribute("target", "_blank");
        expect(linklement).toHaveAttribute("rel", "noopener noreferrer");
        expect(linklement).toHaveClass(
          "text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
        );
      });
    });
  });

  describe("Tags", () => {
    test("Tags to not be in the document if article has no tag", () => {
      render(<TagsRelated topic={topicMocked} tools={toolsMocked} />);

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeNull();
      expect(tags).not.toBeInTheDocument();
    });

    test("Tags to not be in the document if article is an empty array", () => {
      render(<TagsRelated topic={topicMocked} tags={[]} />);

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeNull();
      expect(tags).not.toBeInTheDocument();
    });

    test("Tags to be in the document if tags is a non empty array of tags", () => {
      render(<TagsRelated topic={topicMocked} tags={tagsMocked} />);

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeInTheDocument();

      tagsMocked.forEach((tag) => {
        const listItem = screen.getByTestId(tag.documentId);
        expect(listItem).toBeInTheDocument();
      });
    });

    test("Tags accessibility attributes are rendered", () => {
      render(<TagsRelated topic={topicMocked} tags={tagsMocked} />);

      // article
      const tag = screen.queryByTestId("article-tags");
      expect(tag).toHaveAttribute("aria-label", "Tags");

      // ul
      const tagsList = screen.queryByTestId("article-tags-list");
      expect(tagsList).toHaveAttribute("role", "list");
      expect(tagsList).toHaveAttribute("aria-label", "Lista de tags");

      const listItems = tagsList?.getElementsByTagName("li");
      expect(listItems?.length).toBe(tagsMocked.length);

      // li
      Array.from(listItems || []).forEach((listItem, index) => {
        const tag = tagsMocked[index];

        expect(listItem).toHaveAttribute("data-testid", tag.documentId);
        expect(listItem).toHaveAttribute("role", "listitem");

        const spanElement = listItem.querySelector("span");
        expect(spanElement).toHaveClass("text-[#808080] italic");
      });
    });
  });
});
