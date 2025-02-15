"use server";

import ArticleTitle from "./ArticleTitle";
import ArticleImage from "./ArticleImage";

interface HeroProps {
  article: Article;
}

const Hero = async (props: HeroProps) => {
  const { article } = props;
  return (
    <>
      <ArticleTitle article={article} />
      <ArticleImage cover={article.cover} />
    </>
  );
};

export default Hero;
