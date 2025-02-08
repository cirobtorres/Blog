import sanitizeHtml from "sanitize-html";

const sanitizer = (comment: string) => {
  return sanitizeHtml(comment, {
    allowedTags: ["p"],
    // allowedAttributes: {
    //   a: ["href", "target"],
    // },
  });
};

export default sanitizer;
