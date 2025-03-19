import { requestBackEndNextImage } from "@/utils/mountNextImage";
import Author, { AuthorSkeleton } from "../../src/components/Author";
import { render, screen, waitFor } from "@testing-library/react";

describe("Author (has avatar)", () => {
  const authorMock = {
    documentId: "123",
    name: "John Doe",
    avatar: {
      documentId: "1133445",
      url: "/path/to/avatar.jpg",
      alternativeText: "Avatar de John Doe",
    },
  };

  it("renders author's name inside link", () => {
    render(<Author author={authorMock} />);

    const authorLink = screen.getByRole("link", { name: /@John Doe/i });

    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute("href", "/sobre");
  });

  it("renders author's avatar inside link", async () => {
    render(<Author author={authorMock} />);

    const avatarImage = screen.getByAltText(/Avatar de John Doe/i);

    const nextOptimizedImage = requestBackEndNextImage(
      "avatar",
      "jpg",
      "/path/to/",
      3840,
      75
    );

    await waitFor(() =>
      // next Image loads components lazily
      // Without waitFor, nextOptimizedImage would be null
      // Either use waitFor or set Image in the component as priority
      expect(avatarImage.getAttribute("src")).toBe(nextOptimizedImage)
    );
  });

  it("checks if link points towards /sobre", () => {
    render(<Author author={authorMock} />);

    const avatarLink = screen.getAllByRole("link");

    avatarLink.forEach((link) =>
      expect(link).toHaveAttribute("href", "/sobre")
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Author author={authorMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Author (has no avatar)", () => {
  const authorMock = {
    documentId: "12345",
    name: "John Doe",
    avatar: null,
  };

  it("renders author placeholder image", async () => {
    render(<Author author={authorMock} />);
    const authorAvatarImage = screen.getByAltText(
      /Avatar de John Doe/i
    ) as HTMLImageElement;

    const PLACEHOLDER_IMAGE_NAME = "not-authenticated";
    const PLACEHOLDER_IMAGE_FILE_EXTENSION = "png";
    const PATH = "/images/";
    const URL = `${PATH}${PLACEHOLDER_IMAGE_NAME}.${PLACEHOLDER_IMAGE_FILE_EXTENSION}`;
    const encodedURL = encodeURIComponent(URL);
    const width = "w=3840";
    const quality = "q=75";
    const nextOptimizedImage = `/_next/image?url=${encodedURL}&${width}&${quality}`;

    await waitFor(() =>
      // next Image loads components lazily
      // Without waitFor, nextOptimizedImage would be null
      // Either use waitFor or set Image in the component as priority
      expect(authorAvatarImage.getAttribute("src")).toBe(nextOptimizedImage)
    );
  });

  it("renders author image alt text", () => {
    render(<Author author={authorMock} />);
    const authorAvatarImage = screen.getByAltText(/Avatar de John Doe/i);
    expect(authorAvatarImage).toHaveAttribute("alt", "Avatar de John Doe");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Author author={authorMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("AuthorSkeleton", () => {
  it("renders successfully", () => {
    const { container } = render(<AuthorSkeleton />);
    expect(container).toBeInTheDocument();
  });

  it("renders each skeleton, one for the avatar and the other one for the username", () => {
    const { container } = render(<AuthorSkeleton />);

    const avatarSkeleton = container.querySelector(".size-10");
    const nameSkeleton = container.querySelector(".w-20");

    expect(avatarSkeleton).toBeInTheDocument();
    expect(nameSkeleton).toBeInTheDocument();
  });
});
