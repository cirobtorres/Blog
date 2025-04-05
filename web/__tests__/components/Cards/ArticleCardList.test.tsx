import { faker } from "@faker-js/faker";
import { act, render, screen } from "@testing-library/react";
import {
  ArticleCard,
  ArticleCardList,
} from "../../../src/components/Cards/ArticleCardList";
import { requestBackEndImage } from "../../../__mocks__/utilities/mountNextImage";
import { formatDateToCustomFormat } from "@/utils/dates";
import { axe, toHaveNoViolations } from "jest-axe";
import slugify from "@/utils/slugify";

faker.seed(1); // Snapshots

const randomInt = (max = 10, min = 1) => {
  return faker.number.int({ min, max });
};

const title = faker.lorem.sentence(randomInt());
const slug = slugify(faker.lorem.text());
// const datetime = String(faker.date.anytime()); // Inconsistent
const datetime = "2025-03-10T23:11:17.381Z";
const url =
  faker.system.directoryPath() + "/" + faker.system.commonFileName("png");

const mockedArticleList = Array.from({ length: randomInt() }).map(() => {
  return {
    documentId: faker.string.uuid(),
    title: title,
    slug: slug,
    description: faker.lorem.paragraph(),
    createdAt: datetime,
    updatedAt: datetime,
    publishedAt: datetime,
    cover: {
      documentId: faker.string.uuid(),
      url: url,
      alternativeText: faker.lorem.sentence(randomInt(12)),
      caption: faker.lorem.sentence(randomInt(20)),
      width: 1920,
      height: 1080,
    },
  };
});

describe("ArticleCardList", () => {
  it("is in the document", () => {
    render(<ArticleCardList articles={mockedArticleList} />);
    const list = screen.getByTestId("article-card-list");
    expect(list).toBeInTheDocument();
  });

  it("is NOT in the document (article list is empty)", () => {
    render(<ArticleCardList articles={[]} />);
    const list = screen.queryByTestId("article-card-list");
    expect(list).not.toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <ArticleCardList articles={mockedArticleList} />
    );
    await act(async () => {
      const results = await axe(container);
      expect.extend(toHaveNoViolations);
      expect(results).toHaveNoViolations();
    });
  });

  // TODO: test article with no image (no src and no alt)

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <ArticleCardList articles={mockedArticleList} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ArticleCard", () => {
  it("is in the document", () => {
    render(<ArticleCard article={mockedArticleList[0]} />);
    const link = screen.getByTestId("article-card-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/artigos/${mockedArticleList[0].documentId}/${mockedArticleList[0].slug}`
    );
  });

  it("renders an image", () => {
    render(<ArticleCard article={mockedArticleList[0]} />);

    const imageContainer = screen.getByTestId("article-card-image");
    const image = imageContainer.querySelector("img");

    const nextJsImage = requestBackEndImage(mockedArticleList[0].cover.url);

    const alt = mockedArticleList[0].cover.alternativeText;

    expect(imageContainer).toHaveClass("relative h-[200px] shrink-0");
    expect(image).toHaveClass("absolute object-cover");
    expect(image).toHaveAttribute("src", nextJsImage);
    expect(image).toHaveAttribute("alt", alt);
  });

  it("renders title, description and datetime correctly", () => {
    render(<ArticleCard article={mockedArticleList[0]} />);

    const title = screen.getByTestId("article-card-title");
    const description = screen.getByTestId("article-card-description");
    const datetime = screen.getByTestId("article-card-datetime");

    const renderedDatetime = formatDateToCustomFormat(
      mockedArticleList[0].createdAt
    );

    expect(title).toHaveTextContent(mockedArticleList[0].title);
    expect(title).toHaveClass("max-h-[calc(1.5rem_*_3)] line-clamp-3");
    expect(description).toHaveTextContent(mockedArticleList[0].description);
    expect(description).toHaveClass("max-h-[calc(1.25rem_*_3)] line-clamp-3");
    expect(datetime).toHaveTextContent(renderedDatetime);
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <ArticleCard article={mockedArticleList[0]} />
    );
    await act(async () => {
      const results = await axe(container);
      expect.extend(toHaveNoViolations);
      expect(results).toHaveNoViolations();
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <ArticleCard article={mockedArticleList[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
