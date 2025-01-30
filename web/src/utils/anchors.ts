const extractAnchors = (htmlString: string): { [key: string]: string }[] => {
  const anchorList: { [key: string]: string }[] = [];
  const regex = /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi;

  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    const [, tag, attributes, content] = match;

    // Verifica se o conteúdo do heading contém APENAS texto, sem tags HTML internas
    if (/<[^>]+>/.test(content)) continue;

    // Obtém o ID do heading ou gera um baseado no texto
    const idMatch = attributes.match(/id="([^"]*)"/);
    const id = idMatch
      ? idMatch[1]
      : content
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]/g, "");

    anchorList.push({ [id]: `<${tag}>${content}</${tag}>` });
  }

  return anchorList;
};

const addIdsToHeadings = (htmlString: string) => {
  return htmlString.replace(/<(h[1-6])>(.*?)<\/\1>/g, (match, tag, content) => {
    const id = content
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") // replace whitespaces for "-"
      .replace(/[^\w\-]/g, ""); // Remove special characters
    return `<${tag} id="${id}">${content}</${tag}>`;
  });
};

export { addIdsToHeadings, extractAnchors };
