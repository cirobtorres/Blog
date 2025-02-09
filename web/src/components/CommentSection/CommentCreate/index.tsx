import { getUserMeLoader } from "../../../service/user-me-loader";
import ProviderLogin from "../../Authentication/Logins";
import LogoutButton from "../../Authentication/Logout";
import Editor from "./Editor";

const ComentCreate = async ({
  articleDocumentId,
}: {
  articleDocumentId: string;
}) => {
  const user = await getUserMeLoader();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {user.ok === true && (
        <>
          <div className="flex justify-between items-center mb-3">
            <p>{user.data.username}</p>
            <LogoutButton />
          </div>
          <Editor
            articleDocumentId={articleDocumentId}
            // userDocumentId="l093asnt7pt0lqgm0sqiy9ds"
            // userDocumentId="lyfhxhlrpoaz1h4q3yycenhb"
            userDocumentId={user.data.documentId}
          />
        </>
      )}
      {user.ok === false && <ProviderLogin />}
    </div>
  );
};

export default ComentCreate;
