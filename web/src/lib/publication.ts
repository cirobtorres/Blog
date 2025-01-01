const savePublication = async ({
  title,
  sub_title,
  content,
}: {
  title: string;
  sub_title: string;
  content: string;
}) => {
  const response = await fetch("http://localhost:8000/api/publication/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, sub_title, content }),
  });
  if (!response.ok) {
    console.log("ERRO ao salvar publicação!");
  }
  return await response.json();
};

const updatePublication = async ({ content }: { content: string }) => {
  const response = await fetch("http://localhost:8000/api/publication/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    console.log("ERRO ao atualizar publicação!");
  }
  return await response.json();
};

export default savePublication;
export { updatePublication };
