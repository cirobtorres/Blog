function collectAnchorsContents(html: string) {
  const regex = /<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi;

  const matches = html.match(regex);
  if (!matches) return [];

  let h2Index = 0;
  let h3Index = 0;
  let h4Index = 0;

  return matches.map((match) =>
    match.replace(/<h([2-4])(.*?)<\/h([2-4])/g, (match, level) => {
      if (level === "2") {
        h2Index++;
        h3Index = 0;
        h4Index = 0;
        return `anchor-${h2Index}-${h3Index}-${h4Index}+${match}`;
      } else if (level === "3") {
        h3Index++;
        h4Index = 0;
        return `anchor-${h2Index}-${h3Index}-${h4Index}+${match}`;
      } else if (level === "4") {
        h4Index++;
        return `anchor-${h2Index}-${h3Index}-${h4Index}+${match}`;
      }
      return match;
    })
  );

  //   return matches;
  //   return matches.map((match) => {
  //     return match.replace(/<\/?h[2-4][^>]*>/gi, "").trim();
  //   });
}

export default collectAnchorsContents;
