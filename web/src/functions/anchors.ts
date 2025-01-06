const generateHeadersId = (content: string) => {
  let h2Index = 0;
  let h3Index = 0;
  let h4Index = 0;

  return content.replace(/<h([2-4])/g, (match, level) => {
    if (level === "2") {
      h2Index++;
      h3Index = 0;
      h4Index = 0;
      return `<h2 id="anchor-${h2Index}-${h3Index}-${h4Index}"`;
    } else if (level === "3") {
      h3Index++;
      h4Index = 0;
      return `<h3 id="anchor-${h2Index}-${h3Index}-${h4Index}"`;
    } else if (level === "4") {
      h4Index++;
      return `<h4 id="anchor-${h2Index}-${h3Index}-${h4Index}"`;
    }
    return match;
  });
};

const generateAnchors = (html: string) => {
  const regex = /<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi;

  // Captures only the headers h2, h3 and h4
  const matches = html.match(regex);

  if (!matches) return [];

  let h2Index = 0;
  let h3Index = 0;
  let h4Index = 0;

  /*
  Returns an array of objects like:
  const imExample = [
    { 'anchor-1-0-0': '<h2>Main Session 1</h2>' },
    { 'anchor-1-1-0': '<h3>Subsession 1 level deep</h3>' },
    { 'anchor-1-1-1': '<h4>Subsession 2 levels deep</h4>' },
    { 'anchor-2-0-0': '<h2>Main Session 2</h2>' },
    // ...
  ]
  */
  return matches.map((match) => {
    const levelMatch = match.match(/<h([2-4])/i);
    const level = levelMatch ? levelMatch[1] : null;

    if (level === "2") {
      h2Index++;
      h3Index = 0;
      h4Index = 0;
    } else if (level === "3") {
      h3Index++;
      h4Index = 0;
    } else if (level === "4") {
      h4Index++;
    }

    const anchor = `anchor-${h2Index}-${h3Index}-${h4Index}`;
    return { [anchor]: match.trim() };
  });
};

export { generateHeadersId, generateAnchors };
