"use server";

import ArticleTitle from "./ArticleTitle";
import ArticleImage from "./ArticleImage";

const Hero = async (article: Article) => {
  return (
    <>
      <ArticleTitle article={article} />
      <ArticleImage cover={article.cover} />
    </>
  );
};

export default Hero;
