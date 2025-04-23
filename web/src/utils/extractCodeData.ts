function extractCodeData(htmlString: string) {
  // [!code filepath:<path/to/file/filename.extension>]
  const fileRegex = /[\/#*\-]{1,2}\s*\[!code\s+filepath:([^\]]+)\]/;
  const match = htmlString.match(fileRegex);
  const filepath = match ? match[1] : null;
  const htmlToRender = htmlString.replace(fileRegex, "");

  return {
    filepath,
    htmlToRender,
  };
}

export { extractCodeData };
