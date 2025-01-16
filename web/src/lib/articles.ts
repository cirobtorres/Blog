const getArticles = async () => {
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    "http://127.0.0.1:1337/api/articles?populate=cover&sort=createdAt:desc",
    {
      method: "GET",
      ...options,
    }
  );
  if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch articles");
  }
  const data = await res.json();
  return data;
};

const getArticle = async (documentId: string) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `http://127.0.0.1:1337/api/articles/${documentId}?populate=*`,
    {
      method: "GET",
      ...options,
    }
  );
  if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch article");
  }
  const data = await res.json();
  return data;
};

// const getCover = async (documentId: string) => {
//   console.log("getCover------------------------------>", documentId);
//   const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
//   const options = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const res = await fetch(
//     `http://127.0.0.1:1337/api/upload/files/${documentId}`,
//     {
//       method: "GET",
//       ...options,
//     }
//   );
//   if (!res.ok) {
//     console.error(`${res.status} ${res.statusText}`);
//     throw new Error("Failed to fetch cover");
//   }
//   const data = await res.json();
//   return data;
// };

export { getArticles, getArticle };
