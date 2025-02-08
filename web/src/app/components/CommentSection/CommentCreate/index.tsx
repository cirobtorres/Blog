import Editor from "./Editor";

const ComentCreate = ({ articleDocumentId }: { articleDocumentId: string }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        Fulano de Tal
        {/* <Author author={article.author} /> */}
      </div>
      <Editor
        articleDocumentId={articleDocumentId}
        // userDocumentId="l093asnt7pt0lqgm0sqiy9ds"
        userDocumentId="lyfhxhlrpoaz1h4q3yycenhb"
      />
    </div>
  );
};

export default ComentCreate;
