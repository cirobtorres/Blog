const slugify = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Diacritical marks
    .replace(/[^\w\s-]/g, "") // Special characters
    .trim() // Whitespaces
    .replace(/[\s_-]+/g, "-") // Replace whitespaces and underscores for dashes
    .replace(/^-+|-+$/g, "");
};

export { slugify };
