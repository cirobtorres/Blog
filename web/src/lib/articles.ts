const getArticles = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/articles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
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
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log(data);
  return data;
};

const getCover = async (id: string) => {
  const res = await fetch(`http://127.0.0.1:1337/api/upload/files/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  return data;
};

export { getArticles, getArticle, getCover };
