import sanitizeHtml from "sanitize-html";

const allowedTags = ["p"];

const sanitizer = (comment: string) => {
  return sanitizeHtml(comment, {
    allowedTags,
    allowedAttributes: {}, // Allows no tag attributes
    disallowedTagsMode: "discard", // Completely discards texts within unallowed tags
  });
};

export default sanitizer;
