"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Article } from "@/common/constants";
import { ArticleCardMain } from "@/components/ui/ArticleCardMain";
import { fetchPublicArticle } from "@/api";
import PageWrapperWithError from "@/components/ui/PageWrapper";
import PageMainContent from "@/components/ui/MainContentWrapper";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id;
  const {
    refetch,
    data: article,
    error,
    isLoading,
  } = useQuery<Article, Error>({
    queryKey: ["articles", id],
    queryFn: () =>
      id ? fetchPublicArticle(id as string) : Promise.reject("No ID"),
    enabled: !!id,
  });

  return (
    <PageWrapperWithError error={error}>
      <PageMainContent
        isLoading={isLoading}
        contentData={article!}
        isOwner={false}
        mainContent={(article, isOwner) => (
          <ArticleCardMain
            article={article as Article}
            isOwner={isOwner}
            triggerRefetch={refetch}
            isPublic
          />
        )}
        asideContent={undefined}
      />
    </PageWrapperWithError>
  );
}
