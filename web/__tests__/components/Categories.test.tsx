import Categories from "@/components/Categories";
import { render, screen } from "@testing-library/react";

describe("Categories", () => {
  const categoryMocked = { documentId: "123", name: "Ciência da Computação" };

  const subcategoriesMocked = [
    {
      documentId: "123",
      name: "Next.js",
      link: "https://nextjs.org/",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="18"><mask height="180" id=":r8:mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style="mask-type: alpha;"><circle cx="90" cy="90" fill="black" r="90"></circle></mask><g mask="url(#:r8:mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:r8:paint0_linear_408_134)"></path><rect fill="url(#:r8:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient></defs></svg>',
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

  // describe("Category", () => {
  //   test("", () => {});
  // });

  // describe("Subcategories", () => {
  //   test("", () => {});
  // });

  describe("Tags", () => {
    test("Tags to not be in the document if tags article has no tag", () => {
      render(
        <Categories
          category={categoryMocked}
          subCategories={subcategoriesMocked}
          tags={[]}
        />
      );

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeNull();
      expect(tags).not.toBeInTheDocument();
    });

    test("Tags to be in the document if tags article has tags", () => {
      render(
        <Categories
          category={categoryMocked}
          subCategories={subcategoriesMocked}
          tags={tagsMocked}
        />
      );

      const tags = screen.queryByTestId("article-tags");
      expect(tags).toBeInTheDocument();

      tagsMocked.forEach((tag) => {
        const listItem = screen.getByTestId(tag.documentId);
        expect(listItem).toBeInTheDocument();
      });
    });

    test("Tags accessibility attributes are rendered", () => {
      render(
        <Categories
          category={categoryMocked}
          subCategories={subcategoriesMocked}
          tags={tagsMocked}
        />
      );

      const tagsList = screen.queryByTestId("article-tags-list");
      expect(tagsList).toHaveAttribute("role", "list");
      expect(tagsList).toHaveAttribute("aria-labelledby", "tags-list");

      const listItems = tagsList?.getElementsByTagName("li");
      expect(listItems?.length).toBe(tagsMocked.length);

      Array.from(listItems || []).forEach((listItem, index) => {
        const tag = tagsMocked[index];
        expect(listItem).toHaveAttribute("data-testid", tag.documentId);
        expect(listItem).toHaveAttribute("role", "listitem");
      });
    });
  });
});
