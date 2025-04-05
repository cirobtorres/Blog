const nextOptimizedImage = (filePath: string) => {
  if (filePath) {
    const filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    const extension = filePath.substring(filePath.lastIndexOf(".") + 1);
    const path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
    const URL = `${path}${filename}.${extension}`;
    const encodedURL = encodeURIComponent(URL);
    const width = "w=3840";
    const quality = "q=75";
    const nextOptimizedImage = `/_next/image?url=${encodedURL}&${width}&${quality}`;
    return nextOptimizedImage;
  }
  return null;
};

interface ToEncodeURIAttributes {
  imageFilename: string;
  imageFileExtension: string;
  path: string;
  width: number;
}

function mountLocalImage({
  imageFilename,
  imageFileExtension,
  path,
  width,
}: ToEncodeURIAttributes) {
  // Mock local images
  const quality = 75;
  const URL = `${path}${imageFilename}.${imageFileExtension}`;
  const encodedURL = encodeURIComponent(URL);
  const nextOptimizedImage = `/_next/image?url=${encodedURL}&w=${width}&q=${quality}`;
  return nextOptimizedImage;
}

function requestBackEndImage(
  filePath?: string,
  width: number = 1920,
  options?: {
    PROTOCOL?: string;
    IP?: string;
    PORT?: string;
  }
) {
  // Mock images managed by Strapi
  const quality = 75;

  if (filePath) {
    const filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    const extension = filePath.substring(filePath.lastIndexOf(".") + 1);
    const path = filePath.substring(0, filePath.lastIndexOf("/") + 1);

    const protocol = options ? options.PROTOCOL : "http";
    const ip = options ? options.IP : "127.0.0.1";
    const port = options ? options.PORT : "1337";
    const backendURL = `${protocol}://${ip}:${port}`;

    const URL = `${backendURL}${path}${filename}.${extension}`;

    const encodedURL = encodeURIComponent(URL);
    const nextOptimizedImage = `/_next/image?url=${encodedURL}&w=${
      width * 2
    }&q=${quality}`;

    return nextOptimizedImage;
  }

  const URL = "/images/not-authenticated.png";
  const encodedURL = encodeURIComponent(URL);

  const nextOptimizedImage = `/_next/image?url=${encodedURL}&w=${
    width * 2
  }&q=${quality}`;

  return nextOptimizedImage;
}

export { nextOptimizedImage, mountLocalImage, requestBackEndImage };
