import TagsRelated from "@/components/TagsRelated";
import { render, screen } from "@testing-library/react";
import { mockTopic } from "../../__mocks__/mockTopic";
import { createToolsMock } from "../../__mocks__/mockTools";
import { createTagsMock } from "../../__mocks__/mockTags";
import { faker } from "@faker-js/faker";

faker.seed(4); // Snapshot

describe("Categories", () => {
  const topicMocked = mockTopic();

  const toolsMocked = createToolsMock();

  const tagsMocked = createTagsMock();

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

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
