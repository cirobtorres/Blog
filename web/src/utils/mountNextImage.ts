interface ToEncodeURIAttributes {
  imageFilename: string;
  imageFileExtension: string;
  path: string;
  width: number;
  quality: number;
}

function mountNextImage({
  imageFilename,
  imageFileExtension,
  path,
  width,
  quality,
}: ToEncodeURIAttributes) {
  const URL = `${path}${imageFilename}.${imageFileExtension}`;
  const encodedURL = encodeURIComponent(URL);
  const nextOptimizedImage = `/_next/image?url=${encodedURL}&w=${width}&q=${quality}`;
  return nextOptimizedImage;
}

function requestBackEndNextImage(
  imageFilename: string,
  imageFileExtension: string,
  path: string,
  width: number,
  quality: number,
  options?: {
    PROTOCOL?: string;
    IP?: string;
    PORT?: string;
  }
) {
  const URL = `${options ? options.PROTOCOL : "http"}://${
    options ? options.IP : "127.0.0.1"
  }:${
    options ? options.PORT : "1337"
  }${path}${imageFilename}.${imageFileExtension}`;
  const encodedURL = encodeURIComponent(URL);
  const nextOptimizedImage = `/_next/image?url=${encodedURL}&w=${width}&q=${quality}`;

  return nextOptimizedImage;
}

export { mountNextImage, requestBackEndNextImage };
