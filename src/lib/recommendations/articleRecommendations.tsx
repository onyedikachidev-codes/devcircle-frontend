import { Article } from "@/common/constants";

const recommendArticles = ({
  currentUser,
  articles,
}: {
  currentUser: any;
  articles: Article[];
}): Article[] => {
  const { profile: userProfile } = currentUser;
  const today = new Date();

  return (
    articles
      // .filter((article) => new Date(article.article_created_at) >= today)
      .map((article) => {
        let score = 0;

        // const similarArticle = attendedArticles.some(
        //   (attended) =>
        //     attended.title === article.title ||
        //     attended.description.includes(article.description)
        // );
        // if (similarArticle) score += 4;

        //  Mark article as will attend
        // const popularityScore = Math.min(article.attendees?.length || 0, 100) / 10;
        // score += popularityScore;

        return { article, score };
      })
      .sort((a, b) => b.score - a.score)
      .map((result) => result.article)
  );
};

export default recommendArticles;
