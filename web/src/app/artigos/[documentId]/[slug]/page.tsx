import { getArticle } from "../../../../service/articles";
import { DynamicBody } from "../../../../components/Body";
import Hero from "../../../../components/Hero";
import Article from "../../../../components/Article";
import TagsRelated from "../../../../components/TagsRelated";
import RelatedArticles from "../../../../components/RelatedArticles";
import { getUserMeLoader } from "@/service/user-me-loader";
import { getGlobal } from "../../../../service/global";
import Comments from "@/components/Comments";
import { CommentProvider } from "@/providers/CommentProvider";

export async function generateMetadata({ params }: Params) {
  const { documentId } = await params;
  const { data: global } = await getGlobal();
  const { data: article } = await getArticle(documentId);

  return {
    title: `${global.siteName} | ${article.title}`,
    description: article.title,
  };
}

interface Params {
  params: {
    documentId: string;
    slug: string;
  };
}

export default async function ArticlesPage({ params }: Params) {
  const { documentId } = await params;
  const { data: article } = await getArticle(documentId);
  const user = await getUserMeLoader();

  if (article) {
    return (
      <DynamicBody>
        <Hero article={article} />
        <Article documentId={documentId} content={article.blocks} />
        <TagsRelated
          topic={article.topic}
          tools={article.tools}
          tags={article.tags}
        />
        <RelatedArticles />
        <CommentProvider>
          <Comments currentUser={user} />
        </CommentProvider>
      </DynamicBody>
    );
  }
}
