import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";
import { createAuthorMock } from "../../__mocks__/mockAuthor";
import { requestBackEndImage } from "../../__mocks__/utilities/mountNextImage";
import Author, { AuthorSkeleton } from "../../src/components/Author";
import { render, screen, waitFor } from "@testing-library/react";

faker.seed(1); // Snapshot

interface AuthorHasAvatar {
  documentId: string;
  name: string;
  avatar: {
    alternativeText: string;
    url: string;
    documentId: string;
  };
}

interface AuthorHasNoAvatar {
  documentId: string;
  name: string;
  avatar: null;
}

const authorMock = createAuthorMock() as AuthorHasAvatar;
const authorMockNoAvatar = createAuthorMock(false) as AuthorHasNoAvatar;

describe("Author (has avatar)", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_IP = "http://127.0.0.1:1337";
  });

  it("renders author-container component", () => {
    render(<Author author={authorMock} />);
    const mainContainer = screen.getByTestId("author-container");
    expect(mainContainer).toBeInTheDocument();
  });

  it("renders author-avatar-link component", () => {
    render(<Author author={authorMock} />);
    const authorLink = screen.getByTestId("author-avatar-link");
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute("href", "/sobre");
    expect(authorLink).toHaveClass("group");
  });

  it("renders author-avatar-container component", () => {
    render(<Author author={authorMock} />);
    const authorLink = screen.getByTestId("author-avatar-container");
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveClass(
      "relative flex size-10 shrink-0 rounded-full overflow-hidden"
    );
  });

  it("renders author-avatar-image component", async () => {
    render(<Author author={authorMock} />);
    const avatarImage = screen.getByTestId("author-avatar-image");
    const avatarImageSrc = avatarImage.getAttribute("src");
    const avatarImageAlt = avatarImage.getAttribute("alt");
    const nextOptimizedImage = requestBackEndImage(authorMock.avatar.url);
    await waitFor(() => {
      // next Image loads components lazily
      // Either use waitFor or set Image in the component as priority
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveClass("absolute object-cover");
      expect(avatarImage).toHaveAttribute("data-nimg", "fill");
      expect(avatarImageAlt).toBe(authorMock.avatar?.alternativeText);
      expect(avatarImageSrc).toBe(nextOptimizedImage);
    });
  });

  it("render author-username-link component", () => {
    render(<Author author={authorMock} />);
    const avatarLink = screen.getByTestId("author-username-link");
    expect(avatarLink).toBeInTheDocument();
    expect(avatarLink).toHaveAttribute("href", "/sobre");
    const avatarParagraph = avatarLink.querySelector("p");
    expect(avatarParagraph).toBeInTheDocument();
    expect(avatarParagraph).toHaveClass(
      "transition-colors duration-500 text-blog-foreground-highlight hover:text-blog-foreground-readable-hover"
    );
    const avatarStrong = avatarParagraph?.querySelector("strong");
    expect(avatarStrong).toBeInTheDocument();
    expect(avatarStrong).toHaveTextContent(`@${authorMock.name}`);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Author author={authorMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Author (has no avatar)", () => {
  it("renders author-avatar-image component (placeholder image)", async () => {
    render(<Author author={authorMockNoAvatar} />);
    const avatarImage = screen.getByTestId("author-avatar-image");
    const avatarImageSrc = avatarImage.getAttribute("src");
    const avatarImageAlt = avatarImage.getAttribute("alt");
    const nextOptimizedImage = requestBackEndImage();
    await waitFor(() => {
      // next Image loads components lazily
      // Either use waitFor or set Image in the component as priority
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveClass("absolute object-cover");
      expect(avatarImage).toHaveAttribute("data-nimg", "fill");
      expect(avatarImageAlt).toBe(`Avatar de ${authorMockNoAvatar.name}`);
      expect(avatarImageSrc).toBe(nextOptimizedImage);
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Author author={authorMockNoAvatar} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("AuthorSkeleton", () => {
  it("renders each skeleton, one for the avatar and the other one for the username", () => {
    const { container } = render(<AuthorSkeleton />);
    const avatarSkeleton = container.querySelector(".size-10");
    const nameSkeleton = container.querySelector(".w-20");
    expect(container).toBeInTheDocument();
    expect(avatarSkeleton).toBeInTheDocument();
    expect(nameSkeleton).toBeInTheDocument();
  });
});
