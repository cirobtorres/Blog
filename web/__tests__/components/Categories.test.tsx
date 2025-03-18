import Categories from "@/components/Categories";
import { render, screen } from "@testing-library/react";

describe("Categories", () => {
  const categoryMocked = { documentId: "123", name: "Ciência da Computação" };

  const subcategoriesMocked = [
    {
      documentId: "14",
      name: "Next.js",
      link: "https://nextjs.org/",
      svg: "",
    },
    {
      documentId: "16",
      name: "Nest.js",
      link: "https://nestjs.com/",
      svg: "",
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
      <Categories
        category={categoryMocked}
        subCategories={subcategoriesMocked}
        tags={tagsMocked}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Category", () => {
    test("Category to be in the document", () => {
      render(<Categories category={categoryMocked} />);

      const category = screen.queryByTestId("article-category");
      expect(category).toBeInTheDocument();
    });

    test("Category accessibility attributes are rendered", () => {
      render(<Categories category={categoryMocked} />);

      const category = screen.queryByTestId("article-category");
      expect(category).toHaveAttribute("role", "region");
      expect(category).toHaveAttribute(
        "aria-label",
        `Categoria: ${categoryMocked.name}`
      );
      const h2Component = category?.querySelector("h2");
      expect(h2Component).toHaveAttribute(
        "id",
        `category-title-${categoryMocked.documentId}`
      );
      expect(h2Component).toHaveTextContent(categoryMocked.name);
    });
  });

  describe("Subcategories", () => {
    test("Subcategories to not be in the document if article has no subcategories", () => {
      render(<Categories category={categoryMocked} />);

      const subcategories = screen.queryByTestId("article-subcategories");
      expect(subcategories).toBeNull();
      expect(subcategories).not.toBeInTheDocument();
    });

    test("Subcategories to not be in the document if subcategories is an empty array", () => {
      render(<Categories category={categoryMocked} subCategories={[]} />);

      const subcategories = screen.queryByTestId("article-subcategories");
      expect(subcategories).toBeNull();
      expect(subcategories).not.toBeInTheDocument();
    });

    test("Subcategories accessibility attributes are rendered", () => {
      render(
        <Categories
          category={categoryMocked}
          subCategories={subcategoriesMocked}
        />
      );

      // article
      const subcategories = screen.queryByTestId("article-subcategories");
      expect(subcategories).toHaveAttribute("aria-label", "Tecnologias");

      // ul
      const subcategoriesList = screen.queryByTestId(
        "article-subcategories-list"
      );
      expect(subcategoriesList).toHaveAttribute("role", "list");
      expect(subcategoriesList).toHaveAttribute(
        "aria-label",
        "Lista das tecnologias abordadas neste artigo"
      );

      const listItems = subcategoriesList?.getElementsByTagName("li");
      expect(listItems?.length).toBe(subcategoriesMocked.length);

      // li
      Array.from(listItems || []).forEach((listItem, index) => {
        const subcategory = subcategoriesMocked[index];
        expect(listItem).toHaveAttribute("data-testid", subcategory.documentId);
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
      render(
        <Categories
          category={categoryMocked}
          subCategories={subcategoriesMocked}
        />
      );

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeNull();
      expect(tags).not.toBeInTheDocument();
    });

    test("Tags to not be in the document if article is an empty array", () => {
      render(<Categories category={categoryMocked} tags={[]} />);

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeNull();
      expect(tags).not.toBeInTheDocument();
    });

    test("Tags to be in the document if tags is a non empty array of tags", () => {
      render(<Categories category={categoryMocked} tags={tagsMocked} />);

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeInTheDocument();

      tagsMocked.forEach((tag) => {
        const listItem = screen.getByTestId(tag.documentId);
        expect(listItem).toBeInTheDocument();
      });
    });

    test("Tags accessibility attributes are rendered", () => {
      render(<Categories category={categoryMocked} tags={tagsMocked} />);

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
