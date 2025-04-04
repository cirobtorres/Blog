import ArticleTitle from "./ArticleTitle";
import ArticleImage from "./ArticleImage";

interface HeroProps {
  article: Article;
  currentUser: User;
}

const Hero = async (props: HeroProps) => {
  const { article, currentUser } = props;
  return (
    <>
      <ArticleTitle article={article} currentUser={currentUser} />
      <ArticleImage cover={article.cover} />
    </>
  );
};

export default Hero;
