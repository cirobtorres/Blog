import slugify from "./slugify";

const extractAnchors = (htmlString: string): { [key: string]: string }[] => {
  const anchorList: { [key: string]: string }[] = [];
  const regex = /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi;

  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    const [, tag, attributes, content] = match;

    // Skip if content has HTML tags like <b> <strong> <i> <strike> <u>
    // Ex: <h1>Example <b>1</b></h1>
    if (/<[^>]+>/.test(content)) continue;

    // Get id or generate one
    const idMatch = attributes.match(/id="([^"]*)"/);
    const id = idMatch ? idMatch[1] : slugify(content);

    anchorList.push({ [id]: `<${tag}>${content}</${tag}>` });
  }

  return anchorList;
};

const addIdsToHeadings = (htmlString: string) => {
  return htmlString.replace(/<(h[1-6])>(.*?)<\/\1>/g, (match, tag, content) => {
    const id = slugify(content);
    return `<${tag} id="${id}" tabIndex="0">${content}</${tag}>`;
  });
};

export { addIdsToHeadings, extractAnchors };
