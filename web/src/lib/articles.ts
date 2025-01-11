const getArticles = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/articles?populate=cover", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch articles");
  }
  const data = await res.json();
  return data;
};

const getArticle = async (id: string) => {
  const res = await fetch(
    `http://127.0.0.1:1337/api/articles/${id}?populate=*`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch article");
  }
  const data = await res.json();
  return data;
};

const getCover = async (id: string) => {
  const res = await fetch(`http://127.0.0.1:1337/api/upload/files/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch cover");
  }
  const data = await res.json();
  return data;
};

export { getArticles, getArticle, getCover };
