"use server";

import ArticleTitle from "./ArticleTitle";
import ArticleImage from "./ArticleImage";

interface HeroProps {
  article: Article;
  commentLength: number;
}

const Hero = async (props: HeroProps) => {
  const { article, commentLength } = props;
  return (
    <>
      <ArticleTitle article={article} commentLength={commentLength} />
      <ArticleImage cover={article.cover} />
    </>
  );
};

export default Hero;
